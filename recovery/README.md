# Recovery para askey RTF3505VW
Reinstala OpenWRT y resetea el router a la configuración de fábrica. Sirve para reparar el router askey RTF3505VW cuando se produce un brick causado por software.

## Procedimiento
1. Apretar el botón reset, encender el router, y mantener el botón apretado durante al menos 30 segundos.
2. Conectar el ordenador al router por ethernet y configurar una IP estática 192.168.1.3 con puerta de enlace 192.168.1.1
3. Desde el ordenador abrir un explorador a http://192.168.1.1/
4. Subir el archivo de recovery. El router se reiniciará automáticamente.
5. Deshacer paso 2 y esperar cinco minutos hasta que el router termine de reiniciarse. El router volverá a funcionar con la configuración de fábrica, y el ordenador recibirá IP por DHCP.

## Archivos
- [ES_s00.00_g003_R3505VWSTD203_n43.bin](/ES_s00.00_g003_R3505VWSTD203_n43.bin): Askey HGU n43 (Movistar) Origen: https://www.forocoches.com/foro/showthread.php?t=6803861