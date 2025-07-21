import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentArea } from './components/ContentArea';
import { Terminal } from './components/Terminal';
import { courseData } from './data/courseData';

function App() {
  const [currentModule, setCurrentModule] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  const markAsCompleted = (moduleId: number, chapterId: number) => {
    const key = `${moduleId}-${chapterId}`;
    setProgress(prev => ({ ...prev, [key]: true }));
  };

  const currentContent = courseData[currentModule]?.chapters[currentChapter];

  return (
    <div className="h-screen bg-slate-900 text-white flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        courseData={courseData}
        currentModule={currentModule}
        currentChapter={currentChapter}
        onNavigate={(moduleId, chapterId) => {
          setCurrentModule(moduleId);
          setCurrentChapter(chapterId);
        }}
        progress={progress}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <ContentArea
          content={currentContent}
          onMarkCompleted={() => markAsCompleted(currentModule, currentChapter)}
          isCompleted={progress[`${currentModule}-${currentChapter}`] || false}
        />

        {/* Interactive Terminal */}
        <div className="h-80 border-t border-slate-700">
          <Terminal />
        </div>
      </div>
    </div>
  );
}

export default App;