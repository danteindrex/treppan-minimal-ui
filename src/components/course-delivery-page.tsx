import { useState } from "react"
import { ChevronRight, Play, Pause, Volume2, Maximize, BookOpen, Download, MessageSquare, Users, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useParams } from "react-router-dom"

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
}

interface CourseInfo {
  title: string
  instructor: string
  rating: number
  totalStudents: string
  description: string
}

const CourseDeliveryPage = () => {
  const { courseId = "ai-fundamentals" } = useParams()
  const navigate = useNavigate()
  const [currentLessonId, setCurrentLessonId] = useState("lesson-1")
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(23)
  const [showNotes, setShowNotes] = useState(false)
  
  const courseInfo: Record<string, CourseInfo> = {
    "ai-fundamentals": {
      title: "AI Fundamentals for Professionals",
      instructor: "Dr. Sarah Chen",
      rating: 4.8,
      totalStudents: "12,847",
      description: "Master the core concepts of artificial intelligence, machine learning, and neural networks through hands-on projects."
    },
    "deep-learning-mastery": {
      title: "Deep Learning Mastery", 
      instructor: "Prof. Marcus Rivera",
      rating: 4.9,
      totalStudents: "8,543",
      description: "Advanced deep learning techniques including CNNs, RNNs, transformers, and generative models."
    },
    "ml-production": {
      title: "Machine Learning in Production",
      instructor: "Alex Thompson", 
      rating: 4.7,
      totalStudents: "6,291",
      description: "Deploy, monitor, and scale machine learning models in production environments."
    }
  }
  
  const currentCourse = courseInfo[courseId] || courseInfo["ai-fundamentals"]

  const lessons: Lesson[] = [
    { id: "lesson-1", title: "Introduction to Machine Learning", duration: "12:30", completed: false },
    { id: "lesson-2", title: "Understanding Neural Networks", duration: "18:45", completed: false },
    { id: "lesson-3", title: "Deep Learning Fundamentals", duration: "25:12", completed: false },
    { id: "lesson-4", title: "Training Your First Model", duration: "32:18", completed: false },
    { id: "lesson-5", title: "Model Evaluation and Metrics", duration: "20:05", completed: false },
    { id: "lesson-6", title: "Deploying AI Solutions", duration: "28:42", completed: false }
  ]

  const currentLesson = lessons.find(lesson => lesson.id === currentLessonId)
  const currentLessonIndex = lessons.findIndex(lesson => lesson.id === currentLessonId)
  const nextLesson = lessons[currentLessonIndex + 1]

  const handleNextLesson = () => {
    if (nextLesson) {
      setCurrentLessonId(nextLesson.id)
      setProgress(0)
      setIsPlaying(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card">
        <div className="container-main">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-text-secondary hover:text-text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Courses
              </Button>
              <div>
                <h1 className="text-title">{currentCourse.title}</h1>
                <p className="text-caption">by {currentCourse.instructor}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-caption">
              <Star className="w-4 h-4 fill-current" />
              <span>{currentCourse.rating}</span>
              <span>•</span>
              <span>{currentCourse.totalStudents} students</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Course Navigation Sidebar */}
        <aside className="w-sidebar bg-card border-r border-border flex-shrink-0">
          <div className="p-6 border-b border-border">
            <h2 className="text-title">Course Content</h2>
            <p className="text-caption mt-2">6 lessons • 2h 17m total</p>
          </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLessonId(lesson.id)}
                className={`w-full text-left p-3 transition-colors hover:bg-accent group ${
                  lesson.id === currentLessonId 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${
                      lesson.id === currentLessonId ? 'text-text-primary' : 'text-text-muted'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className={`font-medium ${
                        lesson.id === currentLessonId ? 'text-text-primary' : 'text-text-secondary'
                      }`}>
                        {lesson.title}
                      </div>
                      <div className="text-caption">{lesson.duration}</div>
                    </div>
                  </div>
                  {lesson.completed && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </nav>
      </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          {/* Video Player Section */}
          <div className="bg-player-bg flex items-center justify-center relative" style={{ height: '60vh' }}>
            <div className="w-full max-w-5xl aspect-video bg-player-bg relative group">
              {/* Video Placeholder */}
              <div className="w-full h-full bg-player-bg flex items-center justify-center">
                <div className="text-center text-player-controls">
                  <div className="text-6xl mb-4 opacity-80">📺</div>
                  <p className="text-lg">Video content loading...</p>
                </div>
              </div>
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-player-controls hover:text-player-controls/80 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  <div className="flex-1">
                    <Progress value={progress} className="h-1 bg-player-controls/20" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-player-controls" />
                    <Maximize className="w-5 h-5 text-player-controls" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Tabs */}
          <div className="flex-1 bg-background">
            <div className="container-main py-8">
              <div className="max-w-5xl mx-auto">
                
                {/* Lesson Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-title mb-2">{currentLesson?.title}</h1>
                    <div className="flex items-center gap-4 text-caption">
                      <span>Lesson {currentLessonIndex + 1} of {lessons.length}</span>
                      <span>•</span>
                      <span>{currentLesson?.duration}</span>
                      <span>•</span>
                      <span>{progress}% complete</span>
                    </div>
                  </div>
                  
                  {nextLesson && (
                    <Button 
                      variant="cta" 
                      onClick={handleNextLesson}
                      className="shadow-medium hover:shadow-subtle transition-all duration-medium"
                    >
                      Next Lesson
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  )}
                </div>

                {/* Content Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-accent">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Resources
                    </TabsTrigger>
                    <TabsTrigger value="discussion" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Discussion
                    </TabsTrigger>
                    <TabsTrigger value="classmates" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Classmates
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Lesson Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-body">
                          In this lesson, you'll learn the fundamental concepts of machine learning and how it fits into the broader AI landscape. 
                          We'll cover supervised, unsupervised, and reinforcement learning paradigms with practical examples.
                        </p>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-text-primary">Learning Objectives:</h4>
                          <ul className="list-disc list-inside space-y-1 text-body ml-4">
                            <li>Understand the core principles of machine learning</li>
                            <li>Differentiate between supervised and unsupervised learning</li>
                            <li>Identify real-world applications of ML algorithms</li>
                            <li>Set up your first ML development environment</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Downloadable Resources</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border border-border hover:bg-accent transition-colors">
                            <div className="flex items-center gap-3">
                              <Download className="w-5 h-5 text-text-muted" />
                              <div>
                                <p className="font-medium text-text-primary">Lesson Slides</p>
                                <p className="text-caption">PDF • 2.4 MB</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Download</Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border border-border hover:bg-accent transition-colors">
                            <div className="flex items-center gap-3">
                              <Download className="w-5 h-5 text-text-muted" />
                              <div>
                                <p className="font-medium text-text-primary">Code Examples</p>
                                <p className="text-caption">ZIP • 1.8 MB</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Download</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="discussion" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Discussion Forum</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-body">
                          Join the conversation with fellow learners. Ask questions, share insights, and collaborate on projects.
                        </p>
                        <Button variant="outline" className="mt-4">
                          View All Discussions
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="classmates" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Classmates</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-body">
                          Connect with other professionals taking this course. Build your network and learn together.
                        </p>
                        <Button variant="outline" className="mt-4">
                          Browse Learners
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CourseDeliveryPage