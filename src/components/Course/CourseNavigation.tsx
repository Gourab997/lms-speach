import React from 'react';
import { ChevronRight, BookOpen, CheckCircle } from 'lucide-react';
import type { Course, Milestone, Chapter, Lesson } from '../../types';

interface CourseNavigationProps {
  course: Course;
  currentContent?: string;
  onNavigate: (contentId: string) => void;
  completedContent: Set<string>;
}

export function CourseNavigation({ course, currentContent, onNavigate, completedContent }: CourseNavigationProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
        <p className="text-gray-600 text-sm mt-1">Course Navigation</p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {course.milestones?.map((milestone) => (
          <div key={milestone.id} className="border-b border-gray-50 last:border-b-0">
            <div className="p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>{milestone.title}</span>
              </h3>
            </div>
            
            {milestone.chapters?.map((chapter) => (
              <div key={chapter.id}>
                <div className="px-6 py-3 bg-gray-25">
                  <h4 className="font-medium text-gray-800">{chapter.title}</h4>
                </div>
                
                {chapter.lessons?.map((lesson) => (
                  <div key={lesson.id}>
                    {lesson.content?.map((content) => (
                      <button
                        key={content.id}
                        onClick={() => onNavigate(content.id)}
                        className={`w-full text-left px-8 py-3 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-between ${
                          currentContent === content.id ? 'bg-blue-100 border-r-2 border-blue-600' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {completedContent.has(content.id) ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                          )}
                          <span className={`text-sm ${
                            currentContent === content.id ? 'font-medium text-blue-700' : 'text-gray-600'
                          }`}>
                            {content.title}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}