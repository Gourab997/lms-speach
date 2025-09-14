import React from 'react';
import { ChevronLeft, ChevronDown, ChevronRight, Home, User, Shield, HelpCircle, CheckCircle, BookOpen } from 'lucide-react';
import type { Course } from '../../types';

interface SidebarProps {
  course: Course;
  currentContent?: string;
  onNavigate: (contentId: string) => void;
  completedContent: Set<string>;
  onBack: () => void;
}

export function Sidebar({ course, currentContent, onNavigate, completedContent, onBack }: SidebarProps) {
  const [expandedMilestones, setExpandedMilestones] = React.useState<Set<string>>(new Set(['1', '2']));
  const [expandedChapters, setExpandedChapters] = React.useState<Set<string>>(new Set(['1', '2']));

  const toggleMilestone = (milestoneId: string) => {
    const newExpanded = new Set(expandedMilestones);
    if (newExpanded.has(milestoneId)) {
      newExpanded.delete(milestoneId);
    } else {
      newExpanded.add(milestoneId);
    }
    setExpandedMilestones(newExpanded);
  };

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  return (
    <div className="fixed left-0 top-0 w-80 h-full bg-white border-r border-gray-200 overflow-y-auto">
      {/* Back Button */}
      <div className="p-4 border-b border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 text-sm mb-3"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <h2 className="text-lg font-bold text-gray-900">{course.title}</h2>
      </div>

      {/* TO DO Section */}
      <div className="p-4 bg-teal-50 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-600 mb-2">TO DO</h3>
        <p className="text-sm text-gray-800">{course.description}</p>
      </div>

      {/* Navigation Menu - only show when no specific content is selected */}
      {!currentContent && (
        <div className="p-4 space-y-2 border-b border-gray-100">
          <div className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </div>
          
          <div className="flex items-center space-x-3 p-2 bg-teal-100 text-teal-700 rounded-lg">
            <div className="w-4 h-4 bg-teal-500 rounded"></div>
            <span className="text-sm font-medium">My courses</span>
          </div>
          
          <div className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <User className="w-4 h-4" />
            <span className="text-sm">Profile</span>
          </div>
          
          <div className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Security</span>
          </div>
          
          <div className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help centre</span>
          </div>
        </div>
      )}

      {/* Course Structure */}
      <div>
        {course.milestones?.map((milestone) => (
          <div key={milestone.id}>
            <button
              onClick={() => toggleMilestone(milestone.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 border-b border-gray-50"
            >
              <div>
                <p className="text-xs text-gray-500 mb-1">Milestone - {milestone.order_index}</p>
                <p className="text-sm font-medium text-gray-900">{milestone.title}</p>
              </div>
              {expandedMilestones.has(milestone.id) ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedMilestones.has(milestone.id) && milestone.chapters?.map((chapter) => (
              <div key={chapter.id} className="bg-gray-25">
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full flex items-center justify-between p-3 pl-8 text-left hover:bg-gray-50"
                >
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Chapter - {chapter.order_index}</p>
                    <p className="text-sm font-medium text-gray-800">{chapter.title}</p>
                  </div>
                  {expandedChapters.has(chapter.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {expandedChapters.has(chapter.id) && chapter.lessons?.map((lesson) => (
                  <div key={lesson.id}>
                    {lesson.content?.map((content) => (
                      <button
                        key={content.id}
                        onClick={() => onNavigate(content.id)}
                        className={`w-full flex items-center space-x-3 p-3 pl-12 text-left hover:bg-gray-50 transition-colors duration-200 ${
                          currentContent === content.id ? 'bg-teal-50 border-r-2 border-teal-500' : ''
                        }`}
                      >
                        {completedContent.has(content.id) ? (
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                        )}
                        <span className={`text-sm ${
                          currentContent === content.id ? 'text-teal-700 font-medium' : 'text-gray-700'
                        }`}>
                          {content.title}
                        </span>
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