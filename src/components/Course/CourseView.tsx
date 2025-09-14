import React from 'react';
import { ContentViewer } from './ContentViewer';
import type { Course, Content } from '../../types';

interface CourseViewProps {
  course: Course;
  currentContent: Content | null;
  onComplete: () => void;
  isCompleted: boolean;
}

export function CourseView({ course, currentContent, onComplete, isCompleted }: CourseViewProps) {
  if (!currentContent) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to {course.title}</h2>
          <p className="text-gray-600">Select a lesson from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ContentViewer
        content={currentContent}
        onComplete={onComplete}
        isCompleted={isCompleted}
      />
    </div>
  );
}