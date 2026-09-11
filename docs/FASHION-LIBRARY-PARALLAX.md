# Biblioteca de campañas y secciones Parallax

La campaña Rubia · Lavender day continúa como valor predeterminado. Los archivos originales nunca se borraron: ahora se registran junto con los nuevos en RestaurantMedia y aparecen en el selector compartido. Son 26 piezas incluidas, además de los archivos que se suban desde el panel. Los archivos del repositorio se resuelven por URL estable, sin duplicarlos en IndexedDB.

Studio → Biblioteca muestra dos campañas con imagen de portada. Preparar una campaña rellena el borrador completo del hero; Validar y aplicar pack comprueba y activa sus ocho vídeos y base. Seleccionar el archivo original y recargar lo conserva: se retiró la migración recurrente que lo sustituía por la campaña rubia. Quitar una sección no elimina su archivo de la biblioteca.

El hero ahora identifica sus efectos en español: Escena, Luz, Ropa y Salto. Volver regresa a la base. El salto está también en una sección independiente inmediatamente después del hero, con controles, reproducción automática silenciosa configurable y encuadre completo para ver los pies.

Studio → Parallax permite añadir imágenes o vídeos, subir archivos a la biblioteca compartida, reutilizar ambas campañas, editar título y texto, mostrar/ocultar, ordenar y quitar secciones, ajustar altura, encuadre y posición vertical, activar y graduar parallax y configurar reproducción automática. Oscurecer fondo afecta a las secciones de imagen; los vídeos mantienen los controles sin una capa que los tape. Los vídeos se pausan fuera de pantalla y el parallax se desactiva con reducción de movimiento.

Estado en `fashion.editorialBlocks`, dentro del mismo contrato y guardado local del Studio. Marca y textos siguen editables; el encabezado editorial toma el nombre de la marca del proyecto. La persistencia sigue siendo de este navegador, sin sincronización cloud.

Revisión: http://127.0.0.1:5187/ . Acceso al salto: http://127.0.0.1:5187/#editorial-jump .

Verificación realizada: build TypeScript/Vite; 26 piezas incluidas en biblioteca, 16 miniaturas de vídeo; activación y recarga de campaña original; restauración de rubia; salto y vuelta en ambos heroes; subida de vídeo, selección de archivo anterior y persistencia de textos; movimiento parallax y reducción de movimiento; ordenar y ocultar secciones; vista móvil sin desbordamiento. Sin errores JavaScript durante el recorrido. Capturas en `output/blonde-qa/*v2.png` y recorridos reproducibles en `output/playwright/archive-parallax.js` y `archive-final.js`.
