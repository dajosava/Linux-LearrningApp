import React from 'react';
import { CheckCircle, Play, BookOpen } from 'lucide-react';

interface ContentAreaProps {
  content: any;
  onMarkCompleted: () => void;
  isCompleted: boolean;
}

export const ContentArea: React.FC<ContentAreaProps> = ({
  content,
  onMarkCompleted,
  isCompleted
}) => {
  if (!content) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl text-slate-400">Selecciona un capítulo para comenzar</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{content.title}</h1>
            <p className="text-slate-400">{content.description}</p>
          </div>
          <button
            onClick={onMarkCompleted}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isCompleted
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? 'Completado' : 'Marcar como completado'}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Theory Section */}
        {content.theory && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
              Teoría
            </h2>
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="prose prose-invert max-w-none">
                {content.theory.map((section: any, idx: number) => (
                  <div key={idx} className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">{section.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{section.content}</p>
                    
                    {section.points && (
                      <ul className="mt-4 space-y-2">
                        {section.points.map((point: string, pointIdx: number) => (
                          <li key={pointIdx} className="flex items-start">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-slate-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Examples Section */}
        {content.examples && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Play className="w-5 h-5 mr-2 text-green-400" />
              Ejemplos Prácticos
            </h2>
            <div className="space-y-4">
              {content.examples.map((example: any, idx: number) => (
                <div key={idx} className="bg-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">{example.title}</h3>
                  <p className="text-slate-300 mb-4">{example.description}</p>
                  
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                    <div className="text-green-400 mb-2">$ {example.command}</div>
                    <div className="text-slate-300 whitespace-pre-line">{example.output}</div>
                  </div>
                  
                  <button className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    Ejecutar en Terminal
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Exercises Section */}
        {content.exercises && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Play className="w-5 h-5 mr-2 text-orange-400" />
              Ejercicios Prácticos
            </h2>
            <div className="space-y-4">
              {content.exercises.map((exercise: any, idx: number) => (
                <div key={idx} className="bg-slate-800 rounded-lg p-6 border-l-4 border-orange-400">
                  <h3 className="text-lg font-medium text-white mb-3">{exercise.title}</h3>
                  <p className="text-slate-300 mb-4">{exercise.description}</p>
                  
                  {exercise.steps && (
                    <ol className="space-y-2 mb-4">
                      {exercise.steps.map((step: string, stepIdx: number) => (
                        <li key={stepIdx} className="flex items-start">
                          <span className="bg-orange-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                            {stepIdx + 1}
                          </span>
                          <span className="text-slate-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  
                  <div className="text-sm text-slate-400 bg-slate-900 rounded p-3">
                    <strong>Prueba en el terminal:</strong> Usa el terminal interactivo abajo para practicar estos comandos
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};