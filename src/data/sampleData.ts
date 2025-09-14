import type { Course } from '../types';

export const users = [
  {
    id: 'user-1',
    email: 'student@example.com',
    full_name: 'John Doe',
    avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const userProgress = {
  'user-1': {
    completedContent: ['1', '4'],
    courseProgress: {
      '1': 25,
      '2': 0,
      '3': 60
    },
    stats: {
      coursesCompleted: 1,
      studyHours: 24,
      currentStreak: 7,
      certificates: 2
    }
  }
};

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Course name goes here',
    description: 'Complete the online Nexus Driver\'s course and pass the final exam.',
    thumbnail_url: 'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_hours: 40,
    difficulty_level: 'beginner',
    created_at: '2024-01-01',
    milestones: [
      {
        id: '1',
        course_id: '1',
        title: 'Welcome to Nexus Driver\'s',
        description: 'Introduction to the course',
        order_index: 1,
        chapters: [
          {
            id: '1',
            milestone_id: '1',
            title: 'Your License to Drive',
            description: 'Understanding licensing requirements',
            order_index: 1,
            lessons: [
              {
                id: '1',
                chapter_id: '1',
                title: 'Your License to Drive',
                description: 'Understanding licensing requirements',
                order_index: 1,
                content: [
                  {
                    id: '1',
                    lesson_id: '1',
                    title: 'Complete the online Nexus Driver\'s course and pass the final exam',
                    type: 'text',
                    order_index: 1,
                    content_data: {
                      text: `<h3>Complete the online Nexus Driver's course and pass the final exam.</h3>
                      <p>Are you <strong>over 18 and younger than 25?</strong></p>
                      <p>Yes?</p>
                      <p>These are the steps to follow to get your driver license!</p>
                      <p>If you're <strong>25 or older</strong>, you're not required to take this course, but still welcome to.</p>
                      <p>You have to score <strong>70% or better on the final</strong> in order to finish the course. Once you finish that, the Aceable team will email you your course certificate. You will bring this certificate with you when you go to get your license at your local DPS office.</p>
                      <h4>Overview</h4>
                      <p>There are <strong>two chapters</strong>:</p>
                      <ul>
                        <li><strong>Lesson 1:</strong> Your License to Drive</li>
                        <li><strong>Lesson 2:</strong> Insurance and Registration</li>
                      </ul>`
                    }
                  },
                  {
                    id: '2',
                    lesson_id: '1',
                    title: 'Vehicle Requirements',
                    type: 'video',
                    order_index: 2,
                    content_data: {
                      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
                    }
                  },
                  {
                    id: '3',
                    lesson_id: '1',
                    title: 'Insurance Quiz',
                    type: 'quiz',
                    order_index: 3,
                    content_data: {
                      questions: [
                        {
                          id: '1',
                          question: 'The state requires all drivers to purchase a minimum amount of liability insurance. Why?',
                          options: [
                            'to make every driver financially responsible for any damage they may cause',
                            'to make every driver financially responsible for damage others may cause',
                            'to make the state responsible for property damage others may cause',
                            'to give insurance robots something extra to do'
                          ],
                          correct_answer: 0,
                          explanation: 'Liability insurance ensures drivers are financially responsible for damages they cause.'
                        }
                      ],
                      passing_score: 70
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '2',
        course_id: '1',
        title: 'License and Registration',
        description: 'Learn about licensing and registration requirements',
        order_index: 2,
        chapters: [
          {
            id: '2',
            milestone_id: '2',
            title: 'License and Registration',
            description: 'Understanding license and registration requirements',
            order_index: 1,
            lessons: [
              {
                id: '2',
                chapter_id: '2',
                title: 'Insurance and Registration',
                description: 'Learn about insurance requirements',
                order_index: 1,
                content: [
                  {
                    id: '4',
                    lesson_id: '2',
                    title: 'Insurance and Registration',
                    type: 'text',
                    order_index: 1,
                    content_data: {
                      text: `<p>In Chapter 2, we'll talk about the laws that govern getting a license and everything you need to do to get behind the wheel. Legal stuff! Let's do it!</p>
                      <h4>Overview</h4>
                      <p>There are <strong>two chapters</strong>:</p>
                      <ul>
                        <li><strong>Lesson 1:</strong> Your License to Drive</li>
                        <li><strong>Lesson 2:</strong> Insurance and Registration</li>
                      </ul>`
                    }
                  },
                  {
                    id: '5',
                    lesson_id: '2',
                    title: 'Vehicle Requirements',
                    type: 'audio',
                    order_index: 2,
                    content_data: {
                      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
                      description: 'In Chapter 2, we\'ll talk about the laws that govern getting a license and everything you need to do to get behind the wheel. Legal stuff! Let\'s do it! Overview: There are two chapters: Lesson 1: Your License to Drive, Lesson 2: Insurance and Registration'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Course name goes here',
    description: 'Complete the online Nexus Driver\'s course and pass the final exam.',
    thumbnail_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_hours: 60,
    difficulty_level: 'advanced',
    created_at: '2024-01-01',
    milestones: []
  },
  {
    id: '3',
    title: 'Course name goes here',
    description: 'Complete the online Nexus Driver\'s course and pass the final exam.',
    thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_hours: 45,
    difficulty_level: 'intermediate',
    created_at: '2024-01-01',
    milestones: []
  }
];