import React from 'react';
import { CourseCard } from './CourseCard';
import type { User, Course } from '../../types';

interface DashboardProps {
  user: User;
  courses: Course[];
  getUserStats: () => any;
  getCourseProgress: (courseId: string) => number;
  onStartCourse: (course: Course) => void;
}

export function Dashboard({ user, courses, getUserStats, getCourseProgress, onStartCourse }: DashboardProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My courses</h1>
        
        <div className="flex space-x-4 mb-8">
          <button className="px-4 py-2 bg-teal-500 text-white rounded-lg font-medium">
            In progress
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            progress={getCourseProgress(course.id)}
            onStart={() => onStartCourse(course)}
          />
        ))}
      </div>
    </div>
  );
}