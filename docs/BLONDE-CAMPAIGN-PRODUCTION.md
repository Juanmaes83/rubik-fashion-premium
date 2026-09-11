# Campaña rubia — Producción y revisión

Encargo: conservar los cuatro efectos del hero original y cambiar el personaje y vestuario por mujeres adultas rubias, sin marcas ni textos en el material audiovisual.

## Producción

- Base y cuatro destinos: GPT Image 2 mediante Higgsfield, 16:9, 2k, calidad alta. Los destinos usan la misma base como referencia de edición.
- Cuatro transiciones: Seedance 2.5 mediante Higgsfield, modo omni_reference, referencias reales start_image y end_image, 1080p y audio desactivado. Ropa y Escena: 4 segundos. Luz y Casting: 6 segundos.
- Dirección ajustada con `Juanmaes83/seedance-2-5-video-director`: roles de cada referencia, invariantes por rama, cronología y causalidad física. Su snapshot de Dreamina menciona 480p/720p; el catálogo actual consultado de Higgsfield admite 1080p. Se utiliza este último contrato para enviar los trabajos.
- Casting: anticipación 0,8–1,5 s, salto breve 1,5–2,1 s, corte al aterrizar, asentamiento hasta 4 s y pausa final hasta 6 s. Se eliminó la trayectoria aérea excesivamente larga del borrador inicial.
- El usuario autorizó expresamente producir e integrar los recursos. La skill se utilizó como guía de redacción; los trabajos se enviaron mediante el MCP de Higgsfield.

Prompts exactos enviados y parámetros: `output/fashion-generation-plan.json`. Identificadores de generación: `output/fashion-generation-jobs.json`.

## Integración

Material publicado localmente en `assets/campaigns/blonde-v1/`. Másteres de vídeo en `output/blonde-masters/`. `scripts/prepare-blonde-videos.mjs` prepara H.264 sin audio, faststart, vueltas literales y hojas de contacto para inspección. No se generan vueltas independientes.

`scripts/activate-blonde-campaign.mjs` comprueba que existan las 13 piezas antes de cambiar las referencias por defecto. La migración del Studio reconoce la familia original completa y conserva packs personalizados, archivos locales y textos. El proyecto y el panel siguen siendo los mismos.

La marca RUBIK SOTA, el teléfono y los logos pertenecen a la capa HTML editable. Las imágenes y vídeos nuevos no incluyen esos elementos.

## Revisión humana

- Web y panel: http://127.0.0.1:5187/
- Galería con vídeos independientes, pausables y vueltas: http://127.0.0.1:5187/campaign-review.html

Comprobar identidad, ropa, manos, pies, estabilidad de cámara, paredes rígidas, iluminación, giro y corte de Casting. Las imágenes destino son referencias de dirección: la calidad final de la transición se juzga en el vídeo. La validación del panel comprueba archivos, proporciones y duración; no certifica la calidad visual.

El panel persiste en este navegador. La revisión local no supone publicación en internet ni sincronización entre dispositivos.

## Resultado de verificación

Completadas cinco imágenes y cuatro vídeos, con cuatro vueltas calculadas. Los vídeos finales son 1920×1080, 24 fps, sin audio; duración 4,041667 s para Ropa/Escena y 6,041667 s para Luz/Casting. Las ocho piezas web suman aproximadamente 18,8 MB. La inspección por hojas de contacto confirma los cuatro efectos y no muestra textos ni marcas visibles. El tiempo exacto del salto generado difiere del guion: el corte ocurre aproximadamente a 3,4 s, junto al aterrizaje, manteniendo el efecto.

Verificación en navegador: cuatro ciclos completos de ida/vuelta en escritorio, validación del pack desde Studio, ciclo adicional de Ropa en móvil de 390×844, cuatro vídeos decodificables en la galería y botón para reproducir la vuelta. Sin errores JavaScript ni desbordamiento horizontal móvil. Se corrigió una solicitud de favicon inexistente en la galería. Capturas y metadatos en `output/blonde-qa/`.
