# askey_RTF3505VW_hacking

Toda la información resultado de trastear con la consola UART del router Askey RTF3505VW que emplea Movistar

## Resumen del estado de cosas actual (03/09/19)

* Hay un acceso directo al sistema principal (chip Broadcom) mediante UART con privilegios de administración
* El cargador de arranque es CFE, con una lista de comandos limitada
* Mediante CFE se está intentando hacer un volcado del contenido de la NAND, pero es un proceso lento (~10h)
* Se ha conseguido remontar el sistema rootfs en modo escritura e interrumpir el init normal del router, evitando que cargue una gran cantidad de basura 
* Se ha identificado un segundo procesador, marca Quantenna que corre otro sistema Linux independiente (!) que se carga mediante TFTP desde el sistema principal (!!)
* Interrumpido el init se ha podido levantar la interfaz de red cableada, configurar ips y tener conectividad al exterior
* Se ha pedido a Askey mediante correo electrónico que facilite el código fuente del SDK para el sistema, sin respuesta aún

## TODO

* Sería interesante conseguir compilar binarios para el sistema, para tener por ejemplo dropbear como acceso SSH
* Está pendiente volcar y subir el código de los scripts de arranque (son basura)
* Averiguar si es posible soldar una cabecera USB al router en algún lugar (no parece)
* Indagar más en el subsistema de Quantenna (WiFi 5G/ac) y su conexión al sistema principal
* Organizar mejor la información
