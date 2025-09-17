import { Clock, Users, Award, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

interface Course {
  id: string
  title: string
  instructor: string
  duration: string
  students: string
  level: string
  description: string
  skills: string[]
}

const PreviewPage = () => {
  const navigate = useNavigate()
  
  const courses: Course[] = [
    {
      id: "ai-fundamentals",
      title: "AI Fundamentals for Professionals",
      instructor: "Dr. Sarah Chen",
      duration: "8 weeks",
      students: "12,847",
      level: "Beginner",
      description: "Master the core concepts of artificial intelligence, machine learning, and neural networks. Build practical skills through hands-on projects.",
      skills: ["Machine Learning", "Neural Networks", "Python", "Data Analysis"]
    },
    {
      id: "deep-learning-mastery",
      title: "Deep Learning Mastery",
      instructor: "Prof. Marcus Rivera",
      duration: "12 weeks", 
      students: "8,543",
      level: "Advanced",
      description: "Advanced deep learning techniques, including CNNs, RNNs, transformers, and generative models. Real-world applications and industry best practices.",
      skills: ["Deep Learning", "TensorFlow", "PyTorch", "Computer Vision", "NLP"]
    },
    {
      id: "ml-production",
      title: "Machine Learning in Production",
      instructor: "Alex Thompson",
      duration: "10 weeks",
      students: "6,291",
      level: "Intermediate", 
      description: "Learn to deploy, monitor, and scale machine learning models in production environments. Focus on MLOps, model versioning, and performance optimization.",
      skills: ["MLOps", "Docker", "Kubernetes", "Model Deployment", "Monitoring"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container-main">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-text-primary">
              Treppan Learn
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-spacing">
        <div className="container-main">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 px-4 sm:px-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
                Master AI.<br />
                Choose Your Path.
              </h1>
              
              <p className="text-base sm:text-lg leading-relaxed text-text-secondary max-w-2xl mx-auto px-4 sm:px-0">
                Expert-designed courses from industry leaders. Build practical AI skills 
                through hands-on projects and real-world applications.
              </p>
            </div>

            {/* Course Catalog */}
            <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary text-center">Available Courses</h2>
              
              <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
                {courses.map((course) => (
                  <Card key={course.id} className="border border-border hover:border-text-muted transition-colors group overflow-hidden">
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex flex-col space-y-3">
                        <CardTitle className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors text-text-primary">
                          {course.title}
                        </CardTitle>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-text-muted">
                          <span className="font-medium text-text-secondary">by {course.instructor}</span>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{course.students} students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              <span>{course.level}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 sm:space-y-6 pt-0">
                      <p className="text-base leading-relaxed text-text-secondary">
                        {course.description}
                      </p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-text-primary">Skills you'll gain:</h4>
                        <div className="flex flex-wrap gap-2">
                          {course.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 text-sm bg-accent text-accent-foreground border border-border"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          variant="cta" 
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="w-full sm:text-lg py-3 sm:py-4 shadow-medium hover:shadow-subtle transition-all duration-medium group-hover:scale-[1.02] touch-manipulation"
                        >
                          Start Learning
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="container-main">
          <div className="py-8 text-center">
            <p className="text-subtle">
              © 2024 Treppan Learn. Excellence in AI education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PreviewPage