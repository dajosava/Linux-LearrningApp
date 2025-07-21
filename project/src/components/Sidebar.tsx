import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Circle, Book, Terminal } from 'lucide-react';

interface SidebarProps {
  courseData: any[];
  currentModule: number;
  currentChapter: number;
  onNavigate: (moduleId: number, chapterId: number) => void;
  progress: Record<string, boolean>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  courseData,
  currentModule,
  currentChapter,
  onNavigate,
  progress
}) => {
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
    0: true // First module expanded by default
  });

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const isCompleted = (moduleId: number, chapterId: number) => {
    return progress[`${moduleId}-${chapterId}`] || false;
  };

  const getModuleProgress = (moduleId: number) => {
    const module = courseData[moduleId];
    if (!module) return 0;
    
    const completed = module.chapters.filter((_: any, idx: number) => 
      isCompleted(moduleId, idx)
    ).length;
    
    return Math.round((completed / module.chapters.length) * 100);
  };

  return (
    <div className="w-80 bg-slate-800 border-r border-slate-700 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Terminal className="w-8 h-8 text-green-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Linux de 0 a Experto</h1>
            <p className="text-sm text-slate-400">Plataforma Interactiva</p>
          </div>
        </div>
      </div>

      {/* Course Navigation */}
      <div className="p-4">
        {courseData.map((module, moduleIdx) => (
          <div key={moduleIdx} className="mb-4">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(moduleIdx)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Book className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="font-medium text-white">{module.title}</div>
                  <div className="text-xs text-slate-400">
                    {getModuleProgress(moduleIdx)}% completado
                  </div>
                </div>
              </div>
              {expandedModules[moduleIdx] ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Progress Bar */}
            <div className="mt-2 h-1 bg-slate-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                style={{ width: `${getModuleProgress(moduleIdx)}%` }}
              />
            </div>

            {/* Chapters */}
            {expandedModules[moduleIdx] && (
              <div className="mt-3 space-y-1">
                {module.chapters.map((chapter: any, chapterIdx: number) => (
                  <button
                    key={chapterIdx}
                    onClick={() => onNavigate(moduleIdx, chapterIdx)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      currentModule === moduleIdx && currentChapter === chapterIdx
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    {isCompleted(moduleIdx, chapterIdx) ? (
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                    <span className="text-sm">{chapter.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};