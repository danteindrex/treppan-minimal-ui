import { useState } from "react"
import { ChevronRight, Play, Pause, Volume2, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
}

interface CourseDeliveryPageProps {
  courseId?: string
}

const CourseDeliveryPage = ({ courseId = "ai-fundamentals" }: CourseDeliveryPageProps) => {
  const [currentLessonId, setCurrentLessonId] = useState("lesson-1")
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(23)

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
    <div className="min-h-screen bg-background flex">
      {/* Course Navigation Sidebar */}
      <aside className="w-sidebar bg-card border-r border-border flex-shrink-0">
        <div className="p-6 border-b border-border">
          <h2 className="text-title">AI Fundamentals</h2>
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
        <div className="flex-1 bg-player-bg flex items-center justify-center relative">
          <div className="w-full max-w-4xl aspect-video bg-player-bg relative group">
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

        {/* Lesson Info and Controls */}
        <div className="bg-background border-t border-border p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
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
          </div>
        </div>
      </main>
    </div>
  )
}

export default CourseDeliveryPage