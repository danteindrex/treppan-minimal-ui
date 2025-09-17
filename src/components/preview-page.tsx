import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const PreviewPage = () => {
  const benefits = [
    "AI-powered learning paths tailored to your pace",
    "Expert-curated content from industry leaders",
    "Hands-on projects with real-world applications",
    "Certificate of completion for career advancement"
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
          <div className="max-w-3xl mx-auto text-center space-y-12">
            
            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-display">
                Master AI.<br />
                Treppan Learn.
              </h1>
              
              <p className="text-body max-w-2xl mx-auto">
                The definitive platform for AI mastery. Join thousands of professionals 
                advancing their careers through our expert-designed curriculum.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 max-w-xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 text-left">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-text-primary" />
                  </div>
                  <span className="text-body">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="pt-8">
              <Button 
                variant="cta" 
                className="shadow-medium hover:shadow-subtle transition-all duration-medium"
              >
                Join Waitlist
              </Button>
              
              <p className="text-caption mt-4">
                Early access launching soon. Be the first to know.
              </p>
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