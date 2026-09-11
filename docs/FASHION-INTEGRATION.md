# RUBIK SOTA — integración de moda

## Resultado de esta entrega

La página `fashion.html` reutiliza el shell público y el Studio de este repositorio. El hero que se construyó desde `video-states-website` vive dentro de la primera sección, encapsulado para no mezclar sus estilos ni las transiciones con los motores de scroll.

Revisión local: http://127.0.0.1:5187/

```sh
node scripts/serve-fashion.mjs
```

El servidor local arranca en el puerto 5187. `/` sirve la web de moda; `/index.html` conserva la entrada de restaurante. No se ha desplegado ni modificado el remoto.

## Dónde editar

- **Studio → Marca:** nombre, paleta, logo principal, teléfono y logo adicional.
- **Studio → Contenido:** título y descripción del hero, marca, editorial, campaña y diseño.
- **Studio → Hero · Moda:** mostrar/ocultar secciones, preparar un pack con imagen base y ocho vídeos, asignar imágenes destino, elegir archivos de la misma biblioteca y validar/aplicar el pack.
- **Studio → Media:** fotos o vídeos de editorial, campaña y diseño.
- **Studio → Prendas:** catálogo existente adaptado; añadir, duplicar, ordenar y editar fichas. Composición/confección/combinaciones/tallas se mapean a los campos heredados del motor, sin segundo catálogo.
- **Studio → Lookbook:** reutiliza el motor Memories y su biblioteca de imágenes/vídeos. Conserva parte del vocabulario heredado del editor; no se ha creado otro motor.
- **Studio → Motion:** catálogo filtrado a Elegant Orbit, Urban Acrobatics y Editorial Flow para esta primera adaptación; los motores gastronómicos siguen en el repositorio para restauración.

Los looks iniciales se indican como demostración, sin precios ni disponibilidad inventados. Sustituir por material real del cliente antes de una publicación comercial.

## Arquitectura reutilizada

- `app-v4.js`: Project State, applyAll, historial, guardado, catálogo, formularios, carga de medios.
- `class4-store.js`: mismo IndexedDB y fallback existentes, con identificador de proyecto y prefijo de medios para separar moda y restaurante.
- `RestaurantStudioConfig`: único camino de escritura para el módulo de moda.
- `restaurant-media.js` y `restaurant-media-picker.js`: misma biblioteca y selector compartidos.
- `fashion-profile.js`: datos iniciales de moda sobre el contrato existente.
- `fashion-studio.js`: una pestaña nueva dentro del mismo Studio, no otro panel ni otro almacén.
- `packages/fashion-hero`: código fuente React/TypeScript del hero. Su build queda en `assets/fashion-hero`.

La capa bilingüe/SEO específica de restaurantes se omite en el perfil de moda para que no sobrescriba los textos de prendas con cocina, reservas o datos de restaurante. No se ha creado una tienda con checkout ni un sistema de gestión de inventario.

## Cambiar los vídeos

Los cambios de archivos se guardan en `fashion.draft`; el hero reproduce `fashion.active`. **Validar y aplicar pack** comprueba decodificación, proporción 16:9, duración y margen de parada antes de reemplazar el conjunto activo. Si un archivo falla, el activo se conserva. La validación NO garantiza continuidad visual: debe revisarse manualmente el encuadre, identidad, color y los cuatro empalmes.

El iframe recibe configuración solo desde el padre del mismo origen. El reproductor conserva sus elementos durante cada ciclo. Se reconstruye únicamente al aplicar un pack multimedia distinto, no al cambiar de escena ni editar textos.

Prompts completos y correspondencia de archivos: [PROMPTS-MODA-RUBIK.md](PROMPTS-MODA-RUBIK.md).

## Compilar el hero

```sh
cd packages/fashion-hero
npm ci
npm run build
```

El resto de la aplicación mantiene la estructura estática existente. No requiere reconstruir el Studio.

## Pruebas realizadas

Chromium, escritorio 1440×900 y móvil 390×844:

- Compilación TypeScript/Vite y sintaxis de los scripts modificados.
- Editar título/descripción del hero y restaurarlos después de recargar.
- Subir logo adicional, mostrarlo y recuperarlo desde IndexedDB tras recargar.
- Subir un vídeo a la biblioteca común; asignarlo al borrador sin cambiar el activo.
- Validar/aplicar el pack y ejecutar las cuatro idas/vueltas.
- Asignar un vídeo ausente: rechazo y conservación del pack activo.
- Ocultar una sección desde el panel y restaurarla.
- Capturas de hero, panel, colección, editorial y contacto.

Evidencias: `output/playwright/`. Los ficheros y medios de QA se usan para comprobación; no se aplican como contenido definitivo.

## Estado real y siguiente integración

El guardado es **local en el navegador**, como la base recibida. No hay login privado, sincronización PC A/PC B, almacenamiento remoto ni publicación desde el Studio en esta entrega. Exportar JSON conserva referencias y configuración; no transporta los Blobs locales. Estas capacidades requieren completar la plataforma compartida, no añadir otro almacén temporal.

Repositorios revisados:

- `Juanmaes83/WEB-RESTAURACI-N-PREMIUM-DIN-MICA`, base 865421457c3622f2191b1c7a7c0d1952a095016b: shell, Studio y motores.
- `Juanmaes83/video-states-website`, base 8e732893ab2367ef64e70fc01878ab70a23bf66e: medios, efectos y prompts.
- `Juanmaes83/Fashion-Studio-SOL`: el README sitúa el contrato de prendas/outfits en el núcleo del producto y declara el Website Builder sin implementar. Es una referencia para alinear el catálogo; no se ha conectado su API ni se han fusionado sus ramas Draft.
- `Juanmaes83/MIRRORA-Style-Studio`: estructura inspeccionada como candidato para la experiencia de catálogo; no integrado en esta entrega.
- `Juanmaes83/Moda`: el README corresponde a búsqueda/recuperación de moda, no a una plantilla de web con panel. No es la base adecuada para esta interfaz.

La siguiente consolidación debe decidir dónde vive canónicamente el Website Builder dentro de Fashion Studio SOL y conectar su contrato de prendas, persistencia y publicación cuando estén verificados. Esta entrega deja una adaptación funcional revisable sobre el repositorio solicitado, sin afirmar que esa plataforma completa ya esté cerrada.
