import { ImageResponse } from 'next/og';
export const alt = 'Atlas del Cultivo Argentino — El cultivo cambia según dónde estés.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', background: '#f2eddf', color: '#25231e', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px' }}><div style={{ display: 'flex', fontSize: 26, letterSpacing: 4 }}>ATLAS DEL CULTIVO ARGENTINO</div><div style={{ display: 'flex', fontSize: 74, maxWidth: 1000, lineHeight: 1.1 }}>El cultivo cambia según dónde estés.</div><div style={{ display: 'flex', color: '#426040', fontSize: 27 }}>Geografía · Clima · Lecturas · Argentina</div></div>, size);
}
