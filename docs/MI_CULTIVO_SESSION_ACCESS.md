# Mi Cultivo requiere sesión para mostrar el panel

La entrada sin sesión muestra ingreso, creación de cuenta y recuperación de contraseña. La temporada, plantas, bitácora, pestañas, indicadores, selector de cultivos y botón de registro se montan únicamente después de comprobar sesión y resolver la carga/importación de datos de la cuenta. Durante la comprobación no se renderiza el panel. Si falla la carga remota se muestra el error, sin sustituir el panel por registros locales.

Al cerrar sesión el panel desaparece. Los registros locales antiguos se conservan para el flujo de importación que se ofrece después de ingresar; ya no se ofrece edición anónima. Este cambio responde a la nueva indicación de que el dashboard es exclusivo de usuarios autenticados.

La condición de renderizado no reemplaza las autorizaciones existentes en las API ni las políticas de datos. La galería de propuestas sigue siendo una demostración con ejemplos y no contiene datos de cuentas.

Verificación: build de producción; auditoría pública con ingreso/registro visibles y panel ausente, también al recargar con una temporada y observación privadas precargadas en almacenamiento local. Se comprueba que los datos locales se conservan. La auditoría mantiene los controles de respuestas 401 en exportación y eliminación sin sesión y las vistas responsive.
