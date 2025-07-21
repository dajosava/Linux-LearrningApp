interface CommandResult {
  output: string;
  newDirectory?: string;
}

// Simulated file system
const fileSystem: Record<string, any> = {
  '/': {
    type: 'directory',
    children: {
      'home': {
        type: 'directory',
        children: {
          'student': {
            type: 'directory',
            children: {
              'documents': { type: 'directory', children: {} },
              'downloads': { type: 'directory', children: {} },
              'projects': { type: 'directory', children: {} },
              'notes.txt': { type: 'file', content: 'Mis notas de Linux\n1. pwd muestra el directorio actual\n2. ls lista archivos\n3. cd cambia directorio' }
            }
          }
        }
      },
      'etc': {
        type: 'directory',
        children: {
          'passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nstudent:x:1000:1000:Student User:/home/student:/bin/bash' },
          'hosts': { type: 'file', content: '127.0.0.1 localhost\n127.0.1.1 linux-course' }
        }
      },
      'var': {
        type: 'directory',
        children: {
          'log': { type: 'directory', children: {} },
          'www': { type: 'directory', children: {} }
        }
      },
      'usr': {
        type: 'directory',
        children: {
          'bin': { type: 'directory', children: {} },
          'local': { type: 'directory', children: {} }
        }
      }
    }
  }
};

// Simulated processes
const processes = [
  { pid: 1, cmd: 'systemd', user: 'root', cpu: '0.1', mem: '0.5' },
  { pid: 123, cmd: 'bash', user: 'student', cpu: '0.0', mem: '0.2' },
  { pid: 456, cmd: 'sshd', user: 'root', cpu: '0.0', mem: '0.1' },
  { pid: 789, cmd: 'nginx', user: 'www-data', cpu: '0.1', mem: '1.2' }
];

function resolvePath(currentDir: string, path: string): string {
  if (path.startsWith('/')) {
    return path;
  }
  
  if (path === '..') {
    const parts = currentDir.split('/').filter(p => p);
    parts.pop();
    return '/' + parts.join('/');
  }
  
  if (path === '.') {
    return currentDir;
  }
  
  return currentDir === '/' ? `/${path}` : `${currentDir}/${path}`;
}

function getNode(path: string): any {
  const parts = path.split('/').filter(p => p);
  let current = fileSystem['/'];
  
  for (const part of parts) {
    if (current?.children?.[part]) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  
  return current;
}

function formatFileSize(bytes: number): string {
  const sizes = ['B', 'K', 'M', 'G'];
  let size = bytes;
  let unit = 0;
  
  while (size >= 1024 && unit < sizes.length - 1) {
    size /= 1024;
    unit++;
  }
  
  return `${Math.round(size)}${sizes[unit]}`;
}

export async function executeCommand(command: string, currentDirectory: string): Promise<CommandResult> {
  const parts = command.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
      return {
        output: `Comandos disponibles:
ls [-la] [directorio]     - Lista archivos y directorios
pwd                       - Muestra el directorio actual
cd [directorio]          - Cambia directorio
cat [archivo]            - Muestra contenido de archivo
mkdir [directorio]       - Crea directorio
touch [archivo]          - Crea archivo vacío
rm [archivo]             - Elimina archivo
whoami                   - Muestra usuario actual
ps [aux]                 - Lista procesos
df [-h]                  - Muestra uso de disco
free [-h]                - Muestra uso de memoria
date                     - Muestra fecha y hora
uname [-a]               - Información del sistema
clear                    - Limpia terminal
help                     - Muestra esta ayuda

Ejemplos:
  ls -la
  cd /home/student
  cat notes.txt
  mkdir mi_proyecto
`
      };

    case 'pwd':
      return { output: currentDirectory };

    case 'whoami':
      return { output: 'student' };

    case 'date':
      return { output: new Date().toString() };

    case 'uname':
      if (args.includes('-a')) {
        return { output: 'Linux linux-course 5.15.0-generic #92-Ubuntu SMP x86_64 GNU/Linux' };
      }
      return { output: 'Linux' };

    case 'clear':
      return { output: '\n'.repeat(50) };

    case 'ls':
      const targetPath = args.find(arg => !arg.startsWith('-')) || currentDirectory;
      const fullPath = resolvePath(currentDirectory, targetPath);
      const node = getNode(fullPath);
      
      if (!node) {
        return { output: `ls: cannot access '${targetPath}': No such file or directory` };
      }
      
      if (node.type !== 'directory') {
        return { output: targetPath };
      }

      const showAll = args.includes('-a') || args.includes('-la');
      const longFormat = args.includes('-l') || args.includes('-la');
      
      let files = Object.keys(node.children || {});
      
      if (showAll) {
        files = ['.', '..', ...files];
      }
      
      if (longFormat) {
        let output = `total ${files.length}\n`;
        files.forEach(name => {
          const isDir = name === '.' || name === '..' || node.children?.[name]?.type === 'directory';
          const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
          const size = isDir ? '4096' : '1024';
          const date = 'Dec 15 10:30';
          output += `${permissions}  1 student student ${size.padStart(8)} ${date} ${name}\n`;
        });
        return { output };
      }
      
      return { output: files.join('  ') };

    case 'cd':
      const newPath = args[0] || '/home/student';
      const resolvedPath = resolvePath(currentDirectory, newPath);
      const targetNode = getNode(resolvedPath);
      
      if (!targetNode) {
        return { output: `cd: ${newPath}: No such file or directory` };
      }
      
      if (targetNode.type !== 'directory') {
        return { output: `cd: ${newPath}: Not a directory` };
      }
      
      return { output: '', newDirectory: resolvedPath };

    case 'cat':
      if (!args[0]) {
        return { output: 'cat: missing file operand' };
      }
      
      const filePath = resolvePath(currentDirectory, args[0]);
      const fileNode = getNode(filePath);
      
      if (!fileNode) {
        return { output: `cat: ${args[0]}: No such file or directory` };
      }
      
      if (fileNode.type !== 'file') {
        return { output: `cat: ${args[0]}: Is a directory` };
      }
      
      return { output: fileNode.content || '(archivo vacío)' };

    case 'mkdir':
      if (!args[0]) {
        return { output: 'mkdir: missing operand' };
      }
      return { output: `mkdir: created directory '${args[0]}'` };

    case 'touch':
      if (!args[0]) {
        return { output: 'touch: missing file operand' };
      }
      return { output: '' };

    case 'rm':
      if (!args[0]) {
        return { output: 'rm: missing operand' };
      }
      return { output: `rm: removed '${args[0]}'` };

    case 'ps':
      if (args.includes('aux')) {
        let output = 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\n';
        processes.forEach(proc => {
          output += `${proc.user.padEnd(10)} ${proc.pid.toString().padStart(3)} ${proc.cpu.padStart(4)} ${proc.mem.padStart(4)}   1234  5678 ?        S    10:30   0:00 ${proc.cmd}\n`;
        });
        return { output };
      }
      
      let output = '  PID TTY          TIME CMD\n';
      processes.slice(0, 3).forEach(proc => {
        output += `${proc.pid.toString().padStart(5)} pts/0    00:00:00 ${proc.cmd}\n`;
      });
      return { output };

    case 'df':
      const humanReadable = args.includes('-h');
      let dfOutput = 'Filesystem     1K-blocks    Used Available Use% Mounted on\n';
      
      if (humanReadable) {
        dfOutput = 'Filesystem      Size  Used Avail Use% Mounted on\n';
        dfOutput += '/dev/sda1        20G  8.5G   11G  45% /\n';
        dfOutput += 'tmpfs           2.0G     0  2.0G   0% /dev/shm\n';
      } else {
        dfOutput += '/dev/sda1    20971520 8912896 11534336  45% /\n';
        dfOutput += 'tmpfs         2097152       0  2097152   0% /dev/shm\n';
      }
      
      return { output: dfOutput };

    case 'free':
      const humanReadableMemory = args.includes('-h');
      let memOutput = '';
      
      if (humanReadableMemory) {
        memOutput = `              total        used        free      shared  buff/cache   available
Mem:           4.0G        1.2G        1.8G        50M        1.0G        2.6G
Swap:          2.0G          0B        2.0G`;
      } else {
        memOutput = `              total        used        free      shared  buff/cache   available
Mem:        4194304     1228800     1843200       51200     1024000     2662400
Swap:       2097152           0     2097152`;
      }
      
      return { output: memOutput };

    case 'echo':
      return { output: args.join(' ') };

    case 'ip':
      if (args[0] === 'addr' && args[1] === 'show') {
        return {
          output: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:12:34:56 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0
       valid_lft 86400sec preferred_lft 86400sec`
        };
      }
      if (args[0] === 'route' && args[1] === 'show') {
        return {
          output: `default via 192.168.1.1 dev eth0 proto dhcp metric 100
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 metric 100`
        };
      }
      return { output: 'ip: command requires additional arguments' };

    case 'ss':
      if (args.includes('-tuln')) {
        return {
          output: `Netid  State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port  Process
tcp    LISTEN  0       128           0.0.0.0:22          0.0.0.0:*
tcp    LISTEN  0       128           0.0.0.0:80          0.0.0.0:*
tcp    LISTEN  0       80          127.0.0.1:3306        0.0.0.0:*
tcp    LISTEN  0       128              [::]:22             [::]:*
udp    UNCONN  0       0             0.0.0.0:53          0.0.0.0:*
udp    UNCONN  0       0           127.0.0.1:323         0.0.0.0:*`
        };
      }
      return { output: 'ss: try ss -tuln for listening ports' };

    case 'netstat':
      if (args.includes('-tuln')) {
        return {
          output: `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN
udp        0      0 0.0.0.0:53              0.0.0.0:*`
        };
      }
      return { output: 'netstat: try netstat -tuln for listening ports' };

    case 'ssh-keygen':
      if (args.includes('-t') && args.includes('rsa')) {
        return {
          output: `Generating public/private rsa key pair.
Enter file in which to save the key (/home/student/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/student/.ssh/id_rsa
Your public key has been saved in /home/student/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:abc123def456ghi789jkl012mno345pqr678stu901vwx234yz student@linux-course
The key's randomart image is:
+---[RSA 4096]----+
|        .o.      |
|       . .o      |
|        o  .     |
|       . o.      |
+----[SHA256]-----+`
        };
      }
      return { output: 'ssh-keygen: try ssh-keygen -t rsa -b 4096' };

    case 'last':
      const numLines = args.includes('-n') ? parseInt(args[args.indexOf('-n') + 1]) || 10 : 10;
      let lastOutput = '';
      for (let i = 0; i < Math.min(numLines, 5); i++) {
        lastOutput += `student  pts/0        192.168.1.100    Mon Dec 15 ${10 + i}:30   still logged in\n`;
      }
      lastOutput += 'reboot   system boot  5.15.0-generic   Mon Dec 15 10:00\n';
      return { output: lastOutput };

    case 'who':
      return { output: 'student  pts/0        2024-12-15 10:30 (192.168.1.100)' };

    case 'uptime':
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      return { 
        output: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:23 up 45 min,  1 user,  load average: 0.15, 0.10, 0.05` 
      };

    case 'systemctl':
      if (args[0] === 'status') {
        const service = args[1] || 'ssh';
        return {
          output: `● ${service}.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/${service}.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2024-12-15 10:00:00 UTC; 45min ago
       Docs: man:sshd(8)
    Process: 1234 ExecStartPre=/usr/sbin/sshd -t (code=exited, status=0/SUCCESS)
   Main PID: 1235 (sshd)
      Tasks: 1 (limit: 4915)
     Memory: 2.1M
     CGroup: /system.slice/${service}.service
             └─1235 /usr/sbin/sshd -D`
        };
      }
      return { output: 'systemctl: try systemctl status [service]' };

    case 'history':
      return { output: 'Historial de comandos no disponible en esta simulación' };

    case 'ifconfig':
      return {
        output: `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe12:3456  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:12:34:56  txqueuelen 1000  (Ethernet)
        RX packets 1234  bytes 123456 (120.5 KiB)
        TX packets 567   bytes 56789 (55.4 KiB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)`
      };

    default:
      return { output: `bash: ${cmd}: command not found` };
  }
}