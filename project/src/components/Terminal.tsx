import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { executeCommand } from '../utils/commandExecutor';

export const Terminal: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<Array<{ command: string; output: string; timestamp: Date }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('/home/student');
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome message
    setHistory([{
      command: '',
      output: 'Bienvenido al Terminal Interactivo de Linux\nEscribe "help" para ver los comandos disponibles.\n',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const command = currentCommand.trim();
      const result = await executeCommand(command, currentDirectory);
      
      setHistory(prev => [...prev, {
        command,
        output: result.output,
        timestamp: new Date()
      }]);

      if (result.newDirectory) {
        setCurrentDirectory(result.newDirectory);
      }

      setCurrentCommand('');
    }
  };

  return (
    <div className={`bg-slate-900 border-t border-slate-700 flex flex-col transition-all duration-300 ${
      isExpanded ? 'fixed inset-0 z-50' : 'h-80'
    }`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <TerminalIcon className="w-4 h-4 text-green-400" />
          <span className="text-sm text-slate-300">Terminal Interactivo</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4 text-slate-400" />
          ) : (
            <Maximize2 className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-slate-900"
      >
        {/* Command History */}
        {history.map((entry, idx) => (
          <div key={idx} className="mb-2">
            {entry.command && (
              <div className="flex items-center">
                <span className="text-green-400">student@linux-course:</span>
                <span className="text-blue-400">{currentDirectory}</span>
                <span className="text-white">$ {entry.command}</span>
              </div>
            )}
            <pre className="text-slate-300 whitespace-pre-wrap">{entry.output}</pre>
          </div>
        ))}

        {/* Current Input */}
        <div className="flex items-center">
          <span className="text-green-400">student@linux-course:</span>
          <span className="text-blue-400">{currentDirectory}</span>
          <span className="text-white">$ </span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent text-white outline-none ml-1"
            placeholder="Escribe un comando..."
            autoFocus
          />
        </div>
      </div>

      {/* Quick Commands */}
      <div className="bg-slate-800 p-3 border-t border-slate-700">
        <div className="flex flex-wrap gap-2">
          {['ls -la', 'pwd', 'whoami', 'ps aux', 'df -h', 'free -h'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => setCurrentCommand(cmd)}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-xs transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};