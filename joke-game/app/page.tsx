"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FerrisWheel, Tent, Sparkles, RotateCcw, Star, Ticket } from "lucide-react"

interface Joke {
  setup: string
  delivery: string
  type: string
  id: number
}

export default function AmusementParkJokePage() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null)
  const [showPunchline, setShowPunchline] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jokeCategory, setJokeCategory] = useState<'programming' | 'any'>('programming')

  const fetchJoke = async () => {
    setLoading(true)
    setError(null)
    setShowPunchline(false)

    try {
      let joke;
      
      if (jokeCategory === 'programming') {
        // First API for programming jokes
        const response = await fetch(
          'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart',
        )
        if (!response.ok) {
          throw new Error("Failed to fetch programming joke")
        }
        joke = await response.json()
      } else {
        // Second API for random jokes
        const response = await fetch(
          'https://official-joke-api.appspot.com/random_joke'
        )
        if (!response.ok) {
          throw new Error("Failed to fetch random joke")
        }
        const randomJoke = await response.json()
        // Transform the response to match our Joke interface
        joke = {
          setup: randomJoke.setup,
          delivery: randomJoke.punchline,
          type: 'random',
          id: randomJoke.id
        }
      }
      
      setCurrentJoke(joke)
    } catch (err) {
      setError("Oops! The joke machine is broken. Try again!")
      console.error("Error fetching joke:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJoke()
  }, [jokeCategory])

  const revealPunchline = () => {
    setShowPunchline(true)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10 bg-red-500"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              #ef4444,
              #ef4444 20px,
              #dc2626 20px,
              #dc2626 40px
            )
          `
        }}
      ></div>
      
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 text-4xl sm:text-7xl animate-bounce">🎪</div>
        <div className="absolute top-8 right-4 sm:top-20 sm:right-20 text-3xl sm:text-5xl animate-pulse">🎠</div>
        <div className="absolute bottom-8 left-4 sm:bottom-20 sm:left-20 text-4xl sm:text-6xl animate-spin-slow">
          🎡
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 text-3xl sm:text-5xl animate-bounce delay-300">
          🎢
        </div>
        <div className="absolute top-1/2 left-1/4 text-2xl sm:text-4xl animate-float">🎈</div>
        <div className="absolute top-1/3 right-1/3 text-2xl sm:text-4xl animate-pulse delay-500">🍿</div>
        <div className="absolute top-1/4 left-1/2 text-xl sm:text-3xl animate-bounce delay-700">🎯</div>
        <div className="absolute bottom-1/3 right-1/4 text-2xl sm:text-4xl animate-float delay-1000">🎭</div>
        <div className="absolute top-3/4 left-1/3 text-xl sm:text-3xl animate-pulse delay-200">🍭</div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-20 p-2 sm:p-4 lg:p-6">
        <div className="absolute top-1/6 right-1/6 text-xl sm:text-3xl animate-wiggle">🎪</div>
        <div className="absolute bottom-1/4 left-1/6 text-xl sm:text-3xl animate-bounce delay-800">🎊</div>
        <div className="absolute top-2/3 right-2/3 text-xl sm:text-3xl animate-float delay-600">🎨</div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-fall delay-0 shadow-lg"></div>
        <div className="absolute top-0 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-fall delay-1000 shadow-lg"></div>
        <div className="absolute top-0 left-3/4 w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-fall delay-2000 shadow-lg"></div>
        <div className="absolute top-0 left-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-fall delay-500 shadow-lg"></div>
        <div className="absolute top-0 left-2/3 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-fall delay-1500 shadow-lg"></div>
        <div className="absolute top-0 left-1/6 w-1 h-1 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-fall delay-800 shadow-lg"></div>
        <div className="absolute top-0 left-5/6 w-1 h-1 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-fall delay-1200 shadow-lg"></div>
      </div>

      <div className="max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-4 sm:mb-8">
          <h1
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-2 font-serif animate-pulse-slow"
            style={{
              textShadow: "2px 2px 0px #dc2626, 4px 4px 0px #991b1b, 6px 6px 10px rgba(0,0,0,0.5)",
            }}
          >
            🎪 CODE CARNIVAL 🎪
          </h1>
          <p
            className="text-sm sm:text-xl lg:text-2xl text-yellow-200 font-bold drop-shadow-lg animate-fade-in px-2"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            Step right up for the funniest programming jokes on earth!
          </p>
          <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-4">
            <Star className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-300 fill-yellow-300 animate-twinkle drop-shadow-lg" />
            <Star className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-300 fill-yellow-300 animate-twinkle delay-200 drop-shadow-lg" />
            <Star className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-300 fill-yellow-300 animate-twinkle delay-400 drop-shadow-lg" />
          </div>
        </div>

        <Card className="bg-white border-4 sm:border-8 border-yellow-400 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 sm:w-8 sm:h-8 bg-red-500 transform rotate-45 -translate-x-2 -translate-y-2 sm:-translate-x-4 sm:-translate-y-4"></div>
          <div className="absolute top-0 right-0 w-4 h-4 sm:w-8 sm:h-8 bg-blue-500 transform rotate-45 translate-x-2 -translate-y-2 sm:translate-x-4 sm:-translate-y-4"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-8 sm:h-8 bg-green-500 transform rotate-45 -translate-x-2 translate-y-2 sm:-translate-x-4 sm:translate-y-4"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-8 sm:h-8 bg-purple-500 transform rotate-45 translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4"></div>

          <CardHeader className="bg-red-600 text-white rounded-t-lg relative overflow-hidden border-b-2 sm:border-b-4 border-yellow-400">
            <div className="absolute inset-0 bg-red-700 opacity-50 animate-pulse"></div>
            <CardTitle
              className="text-lg sm:text-2xl lg:text-3xl text-center flex items-center justify-center gap-1 sm:gap-3 relative z-10 font-bold px-2"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              <Tent className="h-5 w-5 sm:h-8 sm:w-8 lg:h-10 lg:w-10 animate-wiggle text-yellow-300" />
              THE CODE STAGE
              <Tent className="h-5 w-5 sm:h-8 sm:w-8 lg:h-10 lg:w-10 animate-wiggle delay-300 text-yellow-300" />
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 bg-yellow-50">
            {loading && (
              <div className="text-center py-8 sm:py-12">
                <div className="animate-spin text-4xl sm:text-6xl lg:text-8xl mb-4">🎪</div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 animate-pulse px-2">
                  The performers are getting ready...
                </p>
              </div>
            )}

            {error && (
              <div className="text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl lg:text-8xl mb-4 animate-bounce">😅</div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-4 px-2">{error}</p>
                <Button
                  onClick={fetchJoke}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 sm:px-10 sm:py-4 text-lg sm:text-xl font-bold transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl border-2 sm:border-4 border-red-800"
                >
                  <RotateCcw className="mr-2 h-4 w-4 sm:h-6 sm:w-6" />
                  Try Again
                </Button>
              </div>
            )}

            {currentJoke && !loading && !error && (
              <>
                <div className="flex flex-col items-center gap-4 mb-4">
                  <div className="flex gap-2">
                    <Button 
                      variant={jokeCategory === 'programming' ? 'default' : 'outline'} 
                      onClick={() => setJokeCategory('programming')}
                      className="font-bold"
                      disabled={loading}
                    >
                      🤓 Programmer Jokes
                    </Button>
                    <Button 
                      variant={jokeCategory === 'any' ? 'default' : 'outline'} 
                      onClick={() => setJokeCategory('any')}
                      className="font-bold"
                      disabled={loading}
                    >
                      🎭 Random Jokes
                    </Button>
                  </div>
                  <Badge className="bg-yellow-400 text-black text-sm sm:text-lg lg:text-xl px-3 py-2 sm:px-6 sm:py-3 font-bold border-2 sm:border-4 border-yellow-600 shadow-xl animate-glow">
                    <Ticket className="mr-1 sm:mr-2 h-3 w-3 sm:h-5 sm:w-5" />
                    {jokeCategory === 'programming' ? 'PROGRAMMING' : 'RANDOM'} JOKE
                  </Badge>
                </div>

                <div className="text-center bg-blue-100 p-4 sm:p-6 lg:p-8 rounded-xl border-2 sm:border-4 border-blue-400 shadow-inner transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-2 h-2 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-2 h-2 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                  <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-2 h-2 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-2 h-2 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-blue-900 leading-relaxed relative z-10 px-2">
                    "{currentJoke.setup}"
                  </p>
                </div>

                <div className="text-center min-h-[100px] sm:min-h-[140px] flex items-center justify-center">
                  {showPunchline ? (
                    <div className="bg-green-500 p-4 sm:p-6 lg:p-8 rounded-xl border-2 sm:border-4 border-green-700 animate-in zoom-in duration-700 shadow-2xl transform hover:scale-105 transition-all duration-300 relative">
                      <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-3 h-3 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
                      <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-bounce delay-400"></div>
                      <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-3 h-3 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-bounce delay-600"></div>
                      <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg px-2">
                        "{currentJoke.delivery}"
                      </p>
                      <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-4">
                        <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-300 fill-yellow-300 animate-pulse" />
                        <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-300 fill-yellow-300 animate-pulse delay-100" />
                        <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-300 fill-yellow-300 animate-pulse delay-200" />
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={revealPunchline}
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 sm:px-12 sm:py-6 lg:px-16 lg:py-8 text-lg sm:text-xl lg:text-2xl font-bold border-2 sm:border-4 border-purple-800 shadow-2xl animate-bounce hover:animate-none transform hover:scale-110 transition-all duration-300 min-h-[60px] sm:min-h-[80px]"
                    >
                      🎭 REVEAL THE PUNCHLINE! 🎭
                    </Button>
                  )}
                </div>

                {showPunchline && (
                  <div className="text-center pt-4 sm:pt-6">
                    <Button
                      onClick={fetchJoke}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 text-lg sm:text-xl font-bold border-2 sm:border-4 border-orange-700 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-slow"
                    >
                      <FerrisWheel className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 animate-spin-slow" />
                      NEXT PERFORMANCE!
                      <FerrisWheel className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 animate-spin-slow" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 193, 7, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 193, 7, 0.8); }
        }
        .animate-gradient-x { animation: gradient-x 15s ease infinite; background-size: 400% 400%; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fall { animation: fall 3s linear infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 1s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )
}
