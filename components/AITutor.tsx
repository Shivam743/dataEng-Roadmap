import React, { useState } from 'react';
import { explainConcept, generateQuiz, ChatMessage } from '../services/geminiService';
import { MessageSquare, BookOpen, HelpCircle, Loader } from 'lucide-react';

const AITutor: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'explain' | 'quiz'>('explain');

  const handleAction = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setResponse(null);

    let result = '';
    if (mode === 'explain') {
        result = await explainConcept(input);
    } else {
        result = await generateQuiz(input);
    }

    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">AI Mentor</h2>
        <p className="text-slate-500 mt-2">Powered by Gemini 2.5. Ask for explanations or generate quizzes.</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
        <div className="flex space-x-4 mb-4">
            <button 
                onClick={() => setMode('explain')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-2 border ${mode === 'explain' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
                <BookOpen size={18} />
                <span>Explain Concept</span>
            </button>
            <button 
                onClick={() => setMode('quiz')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-2 border ${mode === 'quiz' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
                <HelpCircle size={18} />
                <span>Quiz Me</span>
            </button>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {mode === 'explain' ? 'Enter a Data Engineering concept:' : 'Enter a topic to be quizzed on:'}
            </label>
            <div className="flex space-x-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'explain' ? "e.g., Star Schema vs Snowflake" : "e.g., Apache Spark RDD"}
                    className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                />
                <button 
                    onClick={handleAction}
                    disabled={isLoading || !input.trim()}
                    className="bg-indigo-600 text-white px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? <Loader className="animate-spin" size={20} /> : <MessageSquare size={20} />}
                </button>
            </div>
        </div>
      </div>

      {response && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 animate-fade-in">
            <div className="prose prose-slate max-w-none">
                <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <MessageSquare className="text-indigo-600" size={24} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-slate-500 uppercase mb-2">Gemini Response</p>
                        <div className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                            {response}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 text-sm mb-1">Example Prompts</h4>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Explain "ACID properties" in databases</li>
              <li>How does Apache Kafka ensure fault tolerance?</li>
              <li>Quiz me on SQL Window Functions</li>
              <li>Difference between Data Lake and Data Warehouse</li>
          </ul>
      </div>
    </div>
  );
};

export default AITutor;