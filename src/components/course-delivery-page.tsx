import { useState } from "react"
import { ChevronRight, Play, Pause, Volume2, Maximize, BookOpen, Download, MessageSquare, Users, Star, ArrowLeft, Menu, X } from "lucide-react"
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
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
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container-main">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-text-secondary hover:text-text-primary hidden sm:flex"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Courses
              </Button>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-semibold text-text-primary truncate">{currentCourse.title}</h1>
                <p className="text-xs sm:text-sm text-text-muted hidden sm:block">by {currentCourse.instructor}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-text-muted">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
              <span>{currentCourse.rating}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{currentCourse.totalStudents} students</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Course Navigation Sidebar */}
        <aside className={`
          fixed md:relative inset-y-0 left-0 z-50 
          w-72 sm:w-80 md:w-sidebar 
          bg-card border-r border-border 
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex-shrink-0 overflow-hidden
        `}>
          <div className="p-4 sm:p-6 border-b border-border">
            <div className="flex items-center justify-between md:block">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-text-primary">Course Content</h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1 sm:mt-2">6 lessons • 2h 17m total</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <nav className="p-3 sm:p-4 overflow-y-auto flex-1">
            <div className="space-y-1 sm:space-y-2">
              {lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setCurrentLessonId(lesson.id)
                    setSidebarOpen(false) // Close sidebar on mobile after selection
                  }}
                  className={`w-full text-left p-2 sm:p-3 transition-colors hover:bg-accent group touch-manipulation ${
                    lesson.id === currentLessonId 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                      <span className={`text-xs sm:text-sm font-medium mt-0.5 flex-shrink-0 ${
                        lesson.id === currentLessonId ? 'text-text-primary' : 'text-text-muted'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className={`font-medium text-sm sm:text-base leading-tight ${
                          lesson.id === currentLessonId ? 'text-text-primary' : 'text-text-secondary'
                        }`}>
                          {lesson.title}
                        </div>
                        <div className="text-xs sm:text-sm text-text-muted mt-1">{lesson.duration}</div>
                      </div>
                    </div>
                    {lesson.completed && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Video Player Section */}
          <div className="bg-player-bg flex items-center justify-center relative" style={{ height: '50vh', minHeight: '300px' }}>
            <div className="w-full h-full max-w-5xl bg-player-bg relative group">
              {/* Video Placeholder */}
              <div className="w-full h-full bg-player-bg flex items-center justify-center">
                <div className="text-center text-player-controls px-4">
                  <div className="text-4xl sm:text-6xl mb-2 sm:mb-4 opacity-80">📺</div>
                  <p className="text-sm sm:text-lg">Video content loading...</p>
                </div>
              </div>
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-player-controls hover:text-player-controls/80 transition-colors p-1 sm:p-0"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </button>
                  
                  <div className="flex-1">
                    <Progress value={progress} className="h-1 bg-player-controls/20" />
                  </div>
                  
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-player-controls" />
                    <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-player-controls" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Tabs */}
          <div className="flex-1 bg-background">
            <div className="container-main py-4 sm:py-8">
              <div className="max-w-5xl mx-auto">
                
                {/* Lesson Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">{currentLesson?.title}</h1>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-text-muted">
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
                      className="w-full sm:w-auto shadow-medium hover:shadow-subtle transition-all duration-medium touch-manipulation"
                    >
                      Next Lesson
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  )}
                </div>

                {/* Content Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-accent">
                    <TabsTrigger value="overview" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Overview</span>
                      <span className="sm:hidden">Info</span>
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Resources</span>
                      <span className="sm:hidden">Files</span>
                    </TabsTrigger>
                    <TabsTrigger value="discussion" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Discussion</span>
                      <span className="sm:hidden">Chat</span>
                    </TabsTrigger>
                    <TabsTrigger value="classmates" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Classmates</span>
                      <span className="sm:hidden">People</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-4 sm:mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">Lesson Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                          In this lesson, you'll learn the fundamental concepts of machine learning and how it fits into the broader AI landscape. 
                          We'll cover supervised, unsupervised, and reinforcement learning paradigms with practical examples.
                        </p>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-text-primary">Learning Objectives:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-text-secondary ml-4">
                            <li>Understand the core principles of machine learning</li>
                            <li>Differentiate between supervised and unsupervised learning</li>
                            <li>Identify real-world applications of ML algorithms</li>
                            <li>Set up your first ML development environment</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-4 sm:mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">Downloadable Resources</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border border-border hover:bg-accent transition-colors">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <Download className="w-5 h-5 text-text-muted flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-text-primary text-sm sm:text-base">Lesson Slides</p>
                                <p className="text-xs sm:text-sm text-text-muted">PDF • 2.4 MB</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs sm:text-sm">Download</Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border border-border hover:bg-accent transition-colors">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <Download className="w-5 h-5 text-text-muted flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-text-primary text-sm sm:text-base">Code Examples</p>
                                <p className="text-xs sm:text-sm text-text-muted">ZIP • 1.8 MB</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs sm:text-sm">Download</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="discussion" className="mt-4 sm:mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">Discussion Forum</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm sm:text-base text-text-secondary">
                          Join the conversation with fellow learners. Ask questions, share insights, and collaborate on projects.
                        </p>
                        <Button variant="outline" className="mt-4 w-full sm:w-auto">
                          View All Discussions
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="classmates" className="mt-4 sm:mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">Your Classmates</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm sm:text-base text-text-secondary">
                          Connect with other professionals taking this course. Build your network and learn together.
                        </p>
                        <Button variant="outline" className="mt-4 w-full sm:w-auto">
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