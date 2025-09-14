import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { CourseView } from './components/Course/CourseView';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { sampleCourses, userProgress } from './data/sampleData';
import type { Course, Content, User } from './types';

// Mock user for the app
const mockUser: User = {
  id: 'user-1',
  email: 'student@example.com',
  full_name: 'John Doe',
  created_at: new Date().toISOString()
};

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'course'>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentContent, setCurrentContent] = useState<Content | null>(null);
  const [completedContent, setCompletedContent] = useState<Set<string>>(
    new Set(userProgress[mockUser.id as keyof typeof userProgress]?.completedContent || [])
  );

  // Stop any ongoing text-to-speech when navigating
  useEffect(() => {
    // Stop speech synthesis when changing views or content
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [currentView, currentContent]);

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course');
    
    // Find first content item
    const firstContent = course.milestones?.[0]?.chapters?.[0]?.lessons?.[0]?.content?.[0];
    if (firstContent) {
      setCurrentContent(firstContent);
    }
  };

  const handleNavigateToContent = (contentId: string) => {
    if (!selectedCourse) return;
    
    // Find content by ID in the course structure
    for (const milestone of selectedCourse.milestones || []) {
      for (const chapter of milestone.chapters || []) {
        for (const lesson of chapter.lessons || []) {
          const content = lesson.content?.find(c => c.id === contentId);
          if (content) {
            setCurrentContent(content);
            return;
          }
        }
      }
    }
  };

  const handleContentComplete = () => {
    if (currentContent) {
      setCompletedContent(prev => new Set([...prev, currentContent.id]));
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCourse(null);
    setCurrentContent(null);
  };

  const getUserStats = () => {
    return userProgress[mockUser.id as keyof typeof userProgress]?.stats || 
           { coursesCompleted: 0, studyHours: 0, currentStreak: 0, certificates: 0 };
  };

  const getCourseProgress = (courseId: string) => {
    return userProgress[mockUser.id as keyof typeof userProgress]?.courseProgress[courseId] || 0;
  };

  const handleSignOut = () => {
    // Mock sign out - in a real app this would handle authentication
    console.log('Sign out clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-50">
        <Header user={mockUser} onSignOut={handleSignOut} />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {currentView === 'course' && selectedCourse && (
          <Sidebar 
            course={selectedCourse}
            currentContent={currentContent?.id}
            onNavigate={handleNavigateToContent}
            completedContent={completedContent}
            onBack={handleBackToDashboard}
          />
        )}
        
        <main className={`flex-1 overflow-y-auto ${currentView === 'course' ? 'ml-80' : ''}`}>
          <div className="p-8 min-h-full">
            {currentView === 'dashboard' ? (
              <Dashboard
                user={mockUser}
                courses={sampleCourses}
                getUserStats={getUserStats}
                getCourseProgress={getCourseProgress}
                onStartCourse={handleStartCourse}
              />
            ) : (
              <CourseView
                course={selectedCourse!}
                currentContent={currentContent}
                onComplete={handleContentComplete}
                isCompleted={currentContent ? completedContent.has(currentContent.id) : false}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;