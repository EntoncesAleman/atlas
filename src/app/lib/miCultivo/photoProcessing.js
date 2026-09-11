// Procesamiento de fotos en el navegador, antes de subir (Fase 10C).
//
// Por qué existe: `10_PRIVACY.md` exige eliminar metadatos EXIF (puede traer
// GPS embebido) de toda foto subida, y `09_SECURITY.md` pide validar que el
// archivo sea realmente una imagen, no solo confiar en su `Content-Type`.
// Redibujar la imagen en un <canvas> y reexportarla logra ambas cosas a la
// vez, sin ninguna dependencia nueva: un canvas solo conserva los píxeles, no
// los metadatos del archivo original, y un archivo que no sea una imagen
// real simplemente falla al cargarse en un <img>/`createImageBitmap`.

const MAX_ORIGINAL_BYTES = 20 * 1024 * 1024; // 20MB — techo generoso antes de intentar procesar
const MAX_DIMENSION = 1600; // lado más largo, en píxeles, tras el redimensionado
const JPEG_QUALITY = 0.85;

export class PhotoValidationError extends Error {}

export async function prepareEventPhoto(file) {
  if (!file) {
    throw new PhotoValidationError('No se seleccionó ningún archivo.');
  }
  if (!file.type || !file.type.startsWith('image/')) {
    throw new PhotoValidationError('El archivo tiene que ser una imagen.');
  }
  if (file.size > MAX_ORIGINAL_BYTES) {
    throw new PhotoValidationError('La imagen es demasiado pesada (máximo 20MB).');
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new PhotoValidationError('El archivo no parece ser una imagen válida.');
  }

  try {
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const targetWidth = Math.round(bitmap.width * scale);
    const targetHeight = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error('No se pudo procesar la imagen.'))),
        'image/jpeg',
        JPEG_QUALITY
      );
    });

    return blob;
  } finally {
    bitmap.close?.();
  }
}
