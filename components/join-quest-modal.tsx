"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X, ComputerIcon as Steam, Heart, Mail, Gift, CheckCircle, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface JoinQuestModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = "steam" | "kickstarter" | "email" | "complete"

export function JoinQuestModal({ isOpen, onClose }: JoinQuestModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("steam")
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set())
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleStepComplete = (step: Step) => {
    setCompletedSteps((prev) => new Set([...prev, step]))

    // Analytics tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "quest_step_complete", {
        step_name: step,
        total_completed: completedSteps.size + 1,
      })
    }

    // Move to next step
    if (step === "steam") {
      setCurrentStep("kickstarter")
    } else if (step === "kickstarter") {
      setCurrentStep("email")
    } else if (step === "email") {
      setCurrentStep("complete")
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "quest_modal",
          tags: ["quest_complete"],
        }),
      })

      if (response.ok) {
        handleStepComplete("email")
        toast({
          title: "Welcome to the quest! 🎉",
          description: "Check your email to confirm your subscription and get your reward!",
        })
      } else {
        throw new Error("Subscription failed")
      }
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us for help.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setCurrentStep("steam")
    setCompletedSteps(new Set())
    setEmail("")
    onClose()
  }

  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="relative">
          <Button variant="ghost" size="sm" className="absolute top-4 right-4 z-10" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>

          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-fredoka text-2xl font-bold text-gradient">Join the Quest</h2>
                <span className="text-sm text-gray-500">{completedSteps.size}/3 complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(completedSteps.size / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentStep === "steam" && (
                <motion.div
                  key="steam"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <Steam className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl">Wishlist on Steam</h3>
                  <p className="text-gray-600">
                    Add Fruity Tales to your Steam wishlist to get notified when we launch!
                  </p>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        window.open("https://store.steampowered.com/app/fruity-tales", "_blank")
                        // Track click
                        if (typeof window !== "undefined" && window.gtag) {
                          window.gtag("event", "steam_wishlist_click", {
                            source: "quest_modal",
                          })
                        }
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Wishlist on Steam
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleStepComplete("steam")}
                    >
                      I've wishlisted it!
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === "kickstarter" && (
                <motion.div
                  key="kickstarter"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8 text-white fill-current" />
                  </div>
                  <h3 className="font-bold text-xl">Back Our Kickstarter</h3>
                  <p className="text-gray-600">Support Fruity Tales development and get exclusive rewards!</p>
                  <div className="bg-orange-100 rounded-lg p-4 text-sm">
                    <strong>Launching:</strong> End of September 2024
                  </div>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        window.open("https://kickstarter.com/projects/deltaquest/fruity-tales", "_blank")
                        // Track click
                        if (typeof window !== "undefined" && window.gtag) {
                          window.gtag("event", "kickstarter_click", {
                            source: "quest_modal",
                          })
                        }
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Kickstarter
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleStepComplete("kickstarter")}
                    >
                      I'll back it later
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === "email" && (
                <motion.div
                  key="email"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-4"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl">Join Our Newsletter</h3>
                    <p className="text-gray-600">Get exclusive updates, early access, and a free digital reward!</p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to receive updates about Fruity Tales
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Joining..." : "Join the Quest!"}
                    </Button>
                  </form>
                </motion.div>
              )}

              {currentStep === "complete" && (
                <motion.div
                  key="complete"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="font-bold text-xl text-green-600">Quest Complete! 🎉</h3>
                  <p className="text-gray-600">
                    Welcome to the Fruity Tales community! Check your email for your digital reward.
                  </p>

                  <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 text-pink-600 font-semibold">
                      <Gift className="w-5 h-5" />
                      Exclusive Wallpaper Unlocked!
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleClose}>
                    Continue Exploring
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
