
# Linux de 0 a Experto

Bienvenido a la plataforma **Linux de 0 a Experto**, una guía completa para aprender Linux desde sus fundamentos hasta entornos empresariales avanzados.

---

## Módulo 1: Introducción e Historia de Linux

### Capítulo 1: Historia y contexto de los sistemas UNIX
- ¿Qué es un sistema operativo?
- Historia de UNIX (AT&T, BSD)
- Introducción a sistemas derivados: HP-UX, AIX, Solaris, IRIX
- Evolución hasta GNU/Linux
- POSIX y su importancia
- Linux vs. otros sistemas *nix*

#### Ejercicios:
- Crear una línea de tiempo de la evolución de UNIX a Linux.
- Tabla comparativa entre AIX y Linux.
- Quiz sobre el origen de Linux.

---

## Módulo 2: Primeros pasos con Linux

### Capítulo 2: Instalación de Linux
- Elección de distribución: Ubuntu, CentOS, RHEL, Debian
- Entornos gráficos vs. consola
- Instalación en VM y hardware real

#### Ejercicios:
- Instalar Ubuntu Server en VM.
- Crear snapshots antes/después de actualizar.
- Comparar tiempos de arranque.

### Capítulo 3: Comandos básicos
- Navegación: `cd`, `ls`, `pwd`
- Archivos: `mkdir`, `rm`, `touch`, `cp`, `mv`
- Visualización: `cat`, `less`, `head`, `tail`
- Permisos: `chmod`, `chown`, `umask`
- Redirección y pipes

#### Ejercicios:
- Crear estructura de carpetas para empresa ficticia.
- Gestionar permisos de carpeta compartida.
- Redireccionar logs a archivo.

---

## Módulo 3: Usuarios, procesos y servicios

### Capítulo 4: Gestión de usuarios y grupos
- Creación y administración de usuarios y grupos
- Archivos de configuración del sistema
- Control de acceso

#### Ejercicios:
- Crear usuarios para departamentos.
- Asignar permisos a soporte y desarrollo.
- Cambiar contraseñas desde script.

### Capítulo 5: Procesos y servicios
- Comandos `ps`, `top`, `htop`
- Señales: `kill`, `killall`
- Prioridades: `nice`, `renice`
- Servicios con `systemd`

#### Ejercicios:
- Simular sobrecarga del sistema.
- Automatizar reinicio de servicios.
- Crear servicio custom con logs.

---

## Módulo 4: Administración avanzada

### Capítulo 6: Gestión de paquetes
- `apt`, `yum`, `dnf`, `rpm`
- Repositorios
- Instalación desde fuente

#### Ejercicios:
- Instalar Nginx con gestores de paquetes.
- Crear repositorio local con `.deb`.
- Compilar e instalar `htop`.

### Capítulo 7: Tareas programadas
- `cron`, `crontab`, `anacron`
- Programar tareas y verificar logs

#### Ejercicios:
- Tarea de limpieza semanal.
- Backup diario con `cron`.
- Diagnóstico de errores en `cronjobs`.

---

## Módulo 5: Redes y seguridad

### Capítulo 8: Redes
- Interfaces: `ip`, `ifconfig`
- Configuración de red
- Puertos: `ss`, `netstat`
- Firewalls: `ufw`, `iptables`

#### Ejercicios:
- Configurar IP estática.
- Habilitar/bloquear puertos.
- Auditar servicios en escucha.

### Capítulo 9: Seguridad básica
- SSH y claves
- Fail2ban
- Logs de autenticación
- SELinux, AppArmor (introducción)

#### Ejercicios:
- Configurar SSH por clave.
- Simular ataque con Fail2ban.
- Analizar logs de autenticación.

---

## Módulo 6: Scripting y automatización

### Capítulo 10: Bash scripting
- Variables, condiciones, bucles
- Funciones, scripts reutilizables

#### Ejercicios:
- Script de uso de disco, RAM y CPU.
- Crear usuarios desde CSV.
- Ping masivo a servidores.

---

## Módulo 7: Linux empresarial

### Capítulo 11: Sabores empresariales
- Ubuntu, RHEL, CentOS, SUSE, Oracle Linux
- Ciclos de vida y licenciamiento

#### Ejercicios:
- Estudio de caso para elegir distro.
- Comparar políticas de soporte.
- Ventajas/desventajas de 3 distros.

### Capítulo 12: Despliegues empresariales
- LAMP stack
- FTP/SFTP
- DNS/NTP/syslog
- Monitoreo básico

#### Ejercicios:
- Servidor web con PHP y MariaDB.
- Backups con `rsync` + `cron`.
- Monitoreo con Nagios.

---

## Módulo 8: Cierre

### Capítulo 13: Buenas prácticas y certificaciones
- Documentación
- Gestión de incidentes
- Parches y seguridad
- Certificaciones (LPIC-1, RHCSA)

#### Ejercicios:
- Simular auditoría de seguridad.
- Documentar un servidor ficticio.
- Examen simulado LPIC-1.

---

**¡Gracias por aprender con nosotros!**
