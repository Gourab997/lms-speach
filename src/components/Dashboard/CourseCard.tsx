import React from 'react';
import { BookOpen } from 'lucide-react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  progress?: number;
  onStart: () => void;
}

export function CourseCard({ course, progress = 0, onStart }: CourseCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <span>Module 2 of 4</span>
            <span>{progress}% Complete</span>
            <span>About 18 minutes remaining</span>
          </div>
          
          {progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end space-y-4">
          <div className="text-right">
            <h4 className="font-semibold text-gray-900 mb-1">License and Registration</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span>Reading (4 minutes)</span>
            </div>
          </div>

          <button
            onClick={onStart}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
              progress > 0 
                ? 'bg-teal-500 text-white hover:bg-teal-600' 
                : 'bg-teal-500 text-white hover:bg-teal-600'
            }`}
          >
            {progress > 0 ? 'Resume' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
}