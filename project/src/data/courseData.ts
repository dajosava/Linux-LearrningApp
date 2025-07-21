export const courseData = [
  {
    title: "Módulo 1: Introducción e Historia",
    chapters: [
      {
        title: "Historia y contexto de UNIX",
        description: "Fundamentos históricos y evolución de los sistemas UNIX hasta Linux",
        theory: [
          {
            title: "¿Qué es un sistema operativo?",
            content: "Un sistema operativo es el software fundamental que gestiona los recursos del hardware y proporciona una interfaz entre el usuario y la máquina. Linux es un sistema operativo tipo UNIX, conocido por su estabilidad, seguridad y código abierto."
          },
          {
            title: "Historia de UNIX",
            content: "UNIX fue desarrollado en los laboratorios Bell de AT&T en 1969. Su filosofía de 'hacer una cosa y hacerla bien' influyó en el diseño de Linux.",
            points: [
              "1969: Desarrollo inicial en Bell Labs",
              "1973: Reescrito en lenguaje C",
              "1977: Primera distribución pública",
              "Filosofía UNIX: simplicidad, modularidad, reutilización"
            ]
          },
          {
            title: "Evolución hasta GNU/Linux",
            content: "En 1991, Linus Torvalds creó el kernel Linux, combinándolo con las herramientas GNU de Richard Stallman para formar un sistema operativo completo y libre."
          }
        ],
        examples: [
          {
            title: "Verificar información del sistema",
            description: "Comando para ver información básica del sistema Linux",
            command: "uname -a",
            output: "Linux linux-course 5.15.0-generic #92-Ubuntu SMP x86_64 GNU/Linux"
          }
        ],
        exercises: [
          {
            title: "Exploración inicial del sistema",
            description: "Familiarízate con los comandos básicos de información del sistema",
            steps: [
              "Ejecuta 'uname -a' para ver información del kernel",
              "Usa 'whoami' para verificar tu usuario actual",
              "Ejecuta 'pwd' para ver tu ubicación actual",
              "Lista los archivos con 'ls -la'"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Módulo 2: Primeros pasos",
    chapters: [
      {
        title: "Comandos básicos de navegación",
        description: "Aprende los comandos fundamentales para moverte por el sistema de archivos",
        theory: [
          {
            title: "Navegación en el sistema de archivos",
            content: "El sistema de archivos de Linux tiene una estructura jerárquica que comienza desde la raíz (/). Todo en Linux es un archivo o directorio.",
            points: [
              "/ - Directorio raíz del sistema",
              "/home - Directorios de usuarios",
              "/etc - Archivos de configuración",
              "/var - Archivos variables (logs, cache)",
              "/usr - Programas de usuario"
            ]
          }
        ],
        examples: [
          {
            title: "Navegación básica",
            description: "Comandos esenciales para moverse por directorios",
            command: "pwd && ls -la && cd /home && pwd",
            output: "/home/student\ntotal 12\ndrwxr-xr-x  5 student student 4096 Dec 15 10:30 .\ndrwxr-xr-x  3 root    root    4096 Dec 15 10:00 ..\ndrwxr-xr-x  2 student student 4096 Dec 15 10:30 documents\ndrwxr-xr-x  2 student student 4096 Dec 15 10:30 downloads\ndrwxr-xr-x  2 student student 4096 Dec 15 10:30 projects\n-rw-r--r--  1 student student  156 Dec 15 10:30 notes.txt\n/home"
          },
          {
            title: "Listado detallado",
            description: "Ver información detallada de archivos y directorios",
            command: "ls -la /home/student",
            output: "total 12\ndrwxr-xr-x  5 student student 4096 Dec 15 10:30 .\ndrwxr-xr-x  3 root    root    4096 Dec 15 10:00 ..\ndrwxr-xr-x  2 student student 4096 Dec 15 10:30 documents\ndrwxr-xr-x  2 student student 4096 Dec 15 10:30 downloads\ndrwxr-xr-x  2 student student 4096 Dec 15 10:30 projects\n-rw-r--r--  1 student student  156 Dec 15 10:30 notes.txt"
          }
        ],
        exercises: [
          {
            title: "Práctica de navegación",
            description: "Ejercicios para dominar la navegación básica",
            steps: [
              "Usa 'pwd' para ver tu directorio actual",
              "Lista todos los archivos con 'ls -la'",
              "Navega a tu directorio home con 'cd ~'",
              "Explora el contenido del archivo notes.txt con 'cat notes.txt'",
              "Regresa al directorio raíz con 'cd /'",
              "Lista el contenido del directorio /etc con 'ls /etc'"
            ]
          }
        ]
      },
      {
        title: "Gestión de archivos y directorios",
        description: "Aprende a crear, copiar, mover y eliminar archivos y directorios",
        theory: [
          {
            title: "Operaciones con archivos",
            content: "Linux proporciona comandos específicos para manipular archivos y directorios de forma eficiente.",
            points: [
              "mkdir - Crear directorios",
              "touch - Crear archivos vacíos",
              "cp - Copiar archivos y directorios",
              "mv - Mover/renombrar archivos",
              "rm - Eliminar archivos y directorios"
            ]
          }
        ],
        examples: [
          {
            title: "Creación de estructura de directorios",
            description: "Crear una estructura organizativa para proyectos",
            command: "mkdir -p proyecto/{src,docs,tests} && ls -R proyecto/",
            output: "proyecto/:\ndocs  src  tests\n\nproyecto/docs:\n\nproyecto/src:\n\nproyecto/tests:"
          }
        ],
        exercises: [
          {
            title: "Gestión básica de archivos",
            description: "Practica creando y organizando archivos",
            steps: [
              "Crea un directorio llamado 'mi_practica' con 'mkdir mi_practica'",
              "Navega al directorio con 'cd mi_practica'",
              "Crea un archivo vacío con 'touch archivo_prueba.txt'",
              "Verifica que se creó con 'ls -la'",
              "Regresa al directorio anterior con 'cd ..'",
              "Lista el contenido para confirmar tu trabajo"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Módulo 3: Usuarios y procesos",
    chapters: [
      {
        title: "Gestión de procesos",
        description: "Aprende a monitorear y gestionar procesos del sistema",
        theory: [
          {
            title: "¿Qué son los procesos?",
            content: "Un proceso es un programa en ejecución. Linux puede ejecutar múltiples procesos simultáneamente, cada uno con su propio espacio de memoria y recursos.",
            points: [
              "PID - Identificador único del proceso",
              "Estado del proceso: Running, Sleeping, Zombie",
              "Procesos padre e hijo",
              "Señales para controlar procesos"
            ]
          }
        ],
        examples: [
          {
            title: "Ver procesos activos",
            description: "Comandos para monitorear procesos del sistema",
            command: "ps aux | head -5",
            output: "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.1  0.5   1234  5678 ?        S    10:30   0:00 systemd\nstudent    123  0.0  0.2   1234  5678 ?        S    10:30   0:00 bash\nroot       456  0.0  0.1   1234  5678 ?        S    10:30   0:00 sshd\nwww-data   789  0.1  1.2   1234  5678 ?        S    10:30   0:00 nginx"
          }
        ],
        exercises: [
          {
            title: "Monitoreo de procesos",
            description: "Practica el monitoreo y gestión de procesos",
            steps: [
              "Ejecuta 'ps aux' para ver todos los procesos",
              "Usa 'ps' sin argumentos para ver tus procesos",
              "Ejecuta 'whoami' para confirmar tu usuario",
              "Observa la diferencia en la salida de ambos comandos"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Módulo 4: Administración avanzada",
    chapters: [
      {
        title: "Información del sistema",
        description: "Aprende a obtener información detallada sobre el sistema",
        theory: [
          {
            title: "Monitoreo de recursos",
            content: "Es fundamental saber cómo está funcionando el sistema: uso de memoria, disco y CPU.",
            points: [
              "free - Información de memoria RAM",
              "df - Uso de espacio en disco",
              "du - Uso de espacio por directorio",
              "top/htop - Monitoreo en tiempo real"
            ]
          }
        ],
        examples: [
          {
            title: "Verificar recursos del sistema",
            description: "Comandos para monitorear el estado del sistema",
            command: "free -h && echo '---' && df -h",
            output: "              total        used        free      shared  buff/cache   available\nMem:           4.0G        1.2G        1.8G        50M        1.0G        2.6G\nSwap:          2.0G          0B        2.0G\n---\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        20G  8.5G   11G  45% /\ntmpfs           2.0G     0  2.0G   0% /dev/shm"
          }
        ],
        exercises: [
          {
            title: "Análisis del sistema",
            description: "Obtén información completa sobre el estado del sistema",
            steps: [
              "Ejecuta 'free -h' para ver el uso de memoria",
              "Usa 'df -h' para verificar el espacio en disco",
              "Combina ambos comandos: 'free -h && df -h'",
              "Analiza los resultados y identifica posibles problemas"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Módulo 5: Redes y seguridad",
    chapters: [
      {
        title: "Configuración de redes",
        description: "Aprende a configurar y gestionar interfaces de red en Linux",
        theory: [
          {
            title: "Interfaces de red",
            content: "Linux gestiona las interfaces de red a través de comandos específicos que permiten configurar, monitorear y diagnosticar problemas de conectividad.",
            points: [
              "ip - Comando moderno para gestión de red",
              "ifconfig - Comando tradicional (deprecated)",
              "ss - Información de sockets y conexiones",
              "netstat - Estadísticas de red (legacy)"
            ]
          },
          {
            title: "Configuración de red",
            content: "La configuración de red incluye asignación de direcciones IP, configuración de rutas y gestión de DNS.",
            points: [
              "Configuración estática vs DHCP",
              "Archivos de configuración: /etc/network/interfaces",
              "Gestión de rutas con ip route",
              "Configuración de DNS en /etc/resolv.conf"
            ]
          },
          {
            title: "Monitoreo de puertos y servicios",
            content: "Es crucial saber qué servicios están ejecutándose y en qué puertos para mantener la seguridad del sistema."
          }
        ],
        examples: [
          {
            title: "Ver interfaces de red",
            description: "Comandos para visualizar la configuración de red actual",
            command: "ip addr show",
            output: "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP\n    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0"
          },
          {
            title: "Verificar puertos en escucha",
            description: "Identificar servicios activos y puertos abiertos",
            command: "ss -tuln",
            output: "Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port\ntcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*\ntcp   LISTEN 0      128          0.0.0.0:80         0.0.0.0:*\nudp   UNCONN 0      0            0.0.0.0:53         0.0.0.0:*"
          }
        ],
        exercises: [
          {
            title: "Auditoría de red",
            description: "Realiza un análisis completo de la configuración de red",
            steps: [
              "Ejecuta 'ip addr show' para ver todas las interfaces",
              "Usa 'ss -tuln' para listar puertos en escucha",
              "Verifica la tabla de rutas con 'ip route show'",
              "Analiza qué servicios están expuestos y evalúa la seguridad"
            ]
          }
        ]
      },
      {
        title: "Seguridad básica",
        description: "Fundamentos de seguridad en sistemas Linux",
        theory: [
          {
            title: "SSH y autenticación por claves",
            content: "SSH es el protocolo estándar para acceso remoto seguro. La autenticación por claves es más segura que las contraseñas.",
            points: [
              "Generación de claves SSH con ssh-keygen",
              "Configuración de ~/.ssh/authorized_keys",
              "Deshabilitación de autenticación por contraseña",
              "Configuración en /etc/ssh/sshd_config"
            ]
          },
          {
            title: "Fail2ban y protección contra ataques",
            content: "Fail2ban protege contra ataques de fuerza bruta monitoreando logs y bloqueando IPs maliciosas.",
            points: [
              "Configuración de filtros y acciones",
              "Monitoreo de logs de autenticación",
              "Políticas de bloqueo temporal y permanente",
              "Integración con iptables"
            ]
          },
          {
            title: "Análisis de logs de seguridad",
            content: "Los logs del sistema contienen información valiosa sobre intentos de acceso y actividad sospechosa.",
            points: [
              "/var/log/auth.log - Logs de autenticación",
              "/var/log/secure - Logs de seguridad (RHEL/CentOS)",
              "journalctl para systemd",
              "Patrones de ataques comunes"
            ]
          }
        ],
        examples: [
          {
            title: "Configuración SSH segura",
            description: "Pasos para asegurar el servicio SSH",
            command: "ssh-keygen -t rsa -b 4096 -C 'usuario@servidor'",
            output: "Generating public/private rsa key pair.\nEnter file in which to save the key (/home/student/.ssh/id_rsa):\nEnter passphrase (empty for no passphrase):\nYour identification has been saved in /home/student/.ssh/id_rsa\nYour public key has been saved in /home/student/.ssh/id_rsa.pub"
          }
        ],
        exercises: [
          {
            title: "Implementación de seguridad SSH",
            description: "Configura un acceso SSH seguro",
            steps: [
              "Simula la generación de claves SSH",
              "Revisa los logs de autenticación con 'cat /var/log/auth.log'",
              "Identifica patrones de intentos de acceso fallidos",
              "Documenta las mejores prácticas de seguridad SSH"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Módulo 6: Scripting y automatización",
    chapters: [
      {
        title: "Bash scripting avanzado",
        description: "Domina el scripting en Bash para automatizar tareas del sistema",
        theory: [
          {
            title: "Fundamentos de Bash scripting",
            content: "Bash scripting permite automatizar tareas repetitivas y crear herramientas personalizadas para administración del sistema.",
            points: [
              "Variables y tipos de datos",
              "Estructuras de control: if, for, while",
              "Funciones y modularización",
              "Manejo de argumentos y parámetros"
            ]
          },
          {
            title: "Técnicas avanzadas",
            content: "Técnicas profesionales para crear scripts robustos y mantenibles.",
            points: [
              "Manejo de errores y códigos de salida",
              "Logging y debugging",
              "Procesamiento de archivos CSV/JSON",
              "Integración con herramientas del sistema"
            ]
          },
          {
            title: "Automatización de tareas administrativas",
            content: "Scripts comunes para administración de sistemas Linux en entornos empresariales."
          }
        ],
        examples: [
          {
            title: "Script de monitoreo del sistema",
            description: "Script que reporta uso de recursos del sistema",
            command: "cat system_monitor.sh",
            output: "#!/bin/bash\n\necho \"=== REPORTE DEL SISTEMA ===\"\necho \"Fecha: $(date)\"\necho \"Uptime: $(uptime)\"\necho \"\"\necho \"=== USO DE MEMORIA ===\"\nfree -h\necho \"\"\necho \"=== USO DE DISCO ===\"\ndf -h /"
          },
          {
            title: "Script de gestión de usuarios",
            description: "Automatización para crear múltiples usuarios",
            command: "cat create_users.sh",
            output: "#!/bin/bash\n\nUSERS_FILE=\"users.csv\"\n\nwhile IFS=',' read -r username fullname department; do\n    echo \"Creando usuario: $username\"\n    # useradd -m -c \"$fullname\" -s /bin/bash $username\n    echo \"Usuario $username creado exitosamente\"\ndone < \"$USERS_FILE\""
          }
        ],
        exercises: [
          {
            title: "Desarrollo de scripts administrativos",
            description: "Crea scripts útiles para administración del sistema",
            steps: [
              "Analiza el script de monitoreo con 'cat system_monitor.sh'",
              "Ejecuta comandos individuales: 'free -h', 'df -h', 'uptime'",
              "Crea un script mental que combine múltiples comandos",
              "Diseña un script para verificar servicios críticos",
              "Planifica automatización de backups con cron"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Módulo 7: Linux empresarial",
    chapters: [
      {
        title: "Distribuciones empresariales",
        description: "Conoce las principales distribuciones Linux para entornos empresariales",
        theory: [
          {
            title: "Panorama de distribuciones empresariales",
            content: "Las distribuciones empresariales ofrecen soporte comercial, ciclos de vida extendidos y certificaciones para entornos críticos.",
            points: [
              "Red Hat Enterprise Linux (RHEL) - Líder en el mercado",
              "Ubuntu LTS - Popular en cloud y contenedores",
              "SUSE Linux Enterprise - Fuerte en Europa",
              "Oracle Linux - Optimizado para bases de datos",
              "CentOS/Rocky Linux - Alternativas gratuitas"
            ]
          },
          {
            title: "Criterios de selección",
            content: "Factores clave para elegir la distribución adecuada según las necesidades empresariales.",
            points: [
              "Soporte técnico y SLA",
              "Ciclo de vida y actualizaciones",
              "Certificaciones de hardware/software",
              "Costos de licenciamiento",
              "Ecosistema y herramientas disponibles"
            ]
          },
          {
            title: "Licenciamiento y soporte",
            content: "Modelos de negocio y opciones de soporte para distribuciones empresariales."
          }
        ],
        examples: [
          {
            title: "Comparación de distribuciones",
            description: "Análisis de características principales",
            command: "cat /etc/os-release",
            output: "NAME=\"Ubuntu\"\nVERSION=\"20.04.3 LTS (Focal Fossa)\"\nID=ubuntu\nID_LIKE=debian\nPRETTY_NAME=\"Ubuntu 20.04.3 LTS\"\nVERSION_ID=\"20.04\"\nHOME_URL=\"https://www.ubuntu.com/\"\nSUPPORT_URL=\"https://help.ubuntu.com/\""
          }
        ],
        exercises: [
          {
            title: "Análisis de distribuciones",
            description: "Evalúa diferentes opciones para casos de uso específicos",
            steps: [
              "Revisa la información del sistema con 'cat /etc/os-release'",
              "Identifica la versión y tipo de distribución actual",
              "Compara características de RHEL vs Ubuntu LTS",
              "Evalúa costos de soporte vs beneficios",
              "Documenta recomendaciones para diferentes escenarios"
            ]
          }
        ]
      },
      {
        title: "Despliegues empresariales",
        description: "Implementación de servicios y aplicaciones en entornos empresariales",
        theory: [
          {
            title: "Stack LAMP",
            content: "Linux, Apache, MySQL/MariaDB, PHP - la base de muchas aplicaciones web empresariales.",
            points: [
              "Instalación y configuración de Apache",
              "Gestión de bases de datos MySQL/MariaDB",
              "Configuración de PHP y módulos",
              "Optimización de rendimiento",
              "Seguridad y hardening"
            ]
          },
          {
            title: "Servicios de infraestructura",
            content: "Servicios esenciales para el funcionamiento de la infraestructura empresarial.",
            points: [
              "FTP/SFTP para transferencia de archivos",
              "DNS para resolución de nombres",
              "NTP para sincronización de tiempo",
              "Syslog para centralización de logs",
              "Backup y recuperación"
            ]
          },
          {
            title: "Monitoreo y observabilidad",
            content: "Herramientas para monitorear la salud y rendimiento de sistemas en producción."
          }
        ],
        examples: [
          {
            title: "Verificación de servicios web",
            description: "Comandos para verificar el estado de servicios web",
            command: "ss -tuln | grep :80",
            output: "tcp   LISTEN 0      128          0.0.0.0:80         0.0.0.0:*"
          },
          {
            title: "Monitoreo de base de datos",
            description: "Verificar conectividad y estado de MySQL/MariaDB",
            command: "ss -tuln | grep :3306",
            output: "tcp   LISTEN 0      80         127.0.0.1:3306       0.0.0.0:*"
          }
        ],
        exercises: [
          {
            title: "Implementación de stack web",
            description: "Simula la configuración de un entorno web completo",
            steps: [
              "Verifica puertos web con 'ss -tuln | grep :80'",
              "Simula verificación de base de datos con 'ss -tuln | grep :3306'",
              "Revisa logs del sistema con 'cat /var/log/syslog'",
              "Planifica estrategia de backup con rsync",
              "Diseña esquema de monitoreo básico"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Módulo 8: Certificaciones y cierre",
    chapters: [
      {
        title: "Buenas prácticas y certificaciones",
        description: "Mejores prácticas profesionales y preparación para certificaciones",
        theory: [
          {
            title: "Documentación y procedimientos",
            content: "La documentación adecuada es crucial para el mantenimiento y la continuidad operacional.",
            points: [
              "Documentación de arquitectura y configuraciones",
              "Procedimientos de instalación y actualización",
              "Runbooks para incidentes comunes",
              "Inventario de sistemas y servicios",
              "Políticas de seguridad y acceso"
            ]
          },
          {
            title: "Gestión de incidentes",
            content: "Metodologías para responder eficientemente a problemas en producción.",
            points: [
              "Clasificación y priorización de incidentes",
              "Escalamiento y comunicación",
              "Análisis de causa raíz",
              "Prevención y mejora continua",
              "Post-mortem y lecciones aprendidas"
            ]
          },
          {
            title: "Certificaciones Linux",
            content: "Principales certificaciones que validan conocimientos en Linux.",
            points: [
              "LPIC-1: Linux Professional Institute Certification",
              "RHCSA: Red Hat Certified System Administrator",
              "CompTIA Linux+: Certificación vendor-neutral",
              "LFCS: Linux Foundation Certified System Administrator",
              "Preparación y recursos de estudio"
            ]
          }
        ],
        examples: [
          {
            title: "Auditoría de seguridad básica",
            description: "Comandos para realizar una auditoría rápida del sistema",
            command: "last -n 10 && echo '---' && who",
            output: "student  pts/0        192.168.1.100    Mon Dec 15 10:30   still logged in\nreboot   system boot  5.15.0-generic   Mon Dec 15 10:00\n---\nstudent  pts/0        2024-12-15 10:30 (192.168.1.100)"
          },
          {
            title: "Verificación de integridad del sistema",
            description: "Comandos para verificar el estado general del sistema",
            command: "uptime && echo '---' && df -h / && echo '---' && free -h",
            output: "10:45:23 up 45 min,  1 user,  load average: 0.15, 0.10, 0.05\n---\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        20G  8.5G   11G  45% /\n---\n              total        used        free      shared  buff/cache   available\nMem:           4.0G        1.2G        1.8G        50M        1.0G        2.6G"
          }
        ],
        exercises: [
          {
            title: "Examen práctico final",
            description: "Evaluación integral de conocimientos adquiridos",
            steps: [
              "Realiza auditoría completa con 'last -n 10 && who'",
              "Verifica recursos del sistema con 'uptime && df -h && free -h'",
              "Analiza logs de seguridad en /var/log/auth.log",
              "Documenta hallazgos y recomendaciones",
              "Prepara un reporte de estado del sistema",
              "Identifica áreas de mejora y próximos pasos"
            ]
          }
        ]
      }
    ]
  }
];