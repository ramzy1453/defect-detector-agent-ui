"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Scan,
  Wallet,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2 font-bold" href="/">
            <Wallet className="h-6 w-6 text-cyan-400" />
            <span>ZBot</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white hover:from-cyan-500 hover:to-violet-600"
            >
              <Link href="/generate">Request Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
          {/* Animated Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Curved Lines */}
            <svg
              className="absolute h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Top Curves */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 1,
                }}
                d="M 100 100 Q 300 0 500 100 T 900 100"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="1"
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 1,
                  delay: 0.5,
                }}
                d="M 0 200 Q 200 100 400 200 T 800 200"
                fill="none"
                stroke="url(#grad2)"
                strokeWidth="1"
              />
              {/* Bottom Curves */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 1,
                  delay: 1,
                }}
                d="M 100 600 Q 300 500 500 600 T 900 600"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="1"
              />
            </svg>

            {/* Straight Lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{
                    x: "-100%",
                    opacity: [0, 0.7, 0.7, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                  className="absolute right-0"
                  style={{
                    top: `${15 + i * 10}%`,
                    height: "1px",
                    width: "100%",
                    background: `linear-gradient(90deg, transparent, ${
                      i % 2 === 0 ? "#22d3ee" : "#8b5cf6"
                    }60, transparent)`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Animated Background */}
          <div className="absolute inset-0 z-[1]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="container relative z-[3] px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mx-auto max-w-3xl space-y-8"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Revolutionary machine diagnosis
              </h1>
              <p className="mx-auto max-w-2xl text-muted sm:text-xl">
                ZBot Industrial AI Agent optimizes machine operations by
                offering real-time expert guidance, precise troubleshooting, and
                advanced image analysis to reduce downtime and improve
                productivity.
              </p>
              <Button className="text-white bg-gradient-to-r from-cyan-400 to-violet-500 text-lg hover:from-cyan-500 hover:to-violet-600 p-6 rounded-lg shadow-lg cursor-pointer">
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}

        <section
          id="features"
          className="relative z-10 border-t border-white/10 bg-black py-24"
        >
          <div className="container px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose Our Defect Detection?
              </h2>
              <p className="mt-4 text-gray-400">
                Discover our AI-powered solutions for industrial quality
                control.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
              >
                <Wand2 className="mb-4 h-12 w-12 text-cyan-400" />
                <h3 className="mb-2 text-xl font-bold">
                  Prompt-based Classification
                </h3>
                <p className="text-gray-400">
                  Use zero-shot vision-language models to detect unseen defects
                  by simply describing them in text prompts.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-violet-400/50"
              >
                <Scan className="mb-4 h-12 w-12 text-violet-400" />
                <h3 className="mb-2 text-xl font-bold">
                  FiLo Heatmap Enhancement
                </h3>
                <p className="text-gray-400">
                  Localize defects with FiLo’s refined heatmaps and improve
                  inference through preprocessed focus regions.
                </p>
              </motion.div>

              {/* 3. Visual Question Answering */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
              >
                <MessageSquare className="mb-4 h-12 w-12 text-cyan-400" />
                <h3 className="mb-2 text-xl font-bold">
                  VQA for Industrial QA
                </h3>
                <p className="text-gray-400">
                  Ask visual questions like “Is there a scratch on the metal
                  part?” to get instant AI-driven answers.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-950/50 to-violet-950/50 p-8 text-center backdrop-blur-sm md:p-12 lg:p-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Join thousands of satisfied customers who trust us for their
                banking needs.
              </p>
              <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-4 text-left">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  <span>No hidden fees or charges</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  <span>Secure and regulated platform</span>
                </li>
              </ul>
              <Button className="mt-8 bg-gradient-to-r from-cyan-400 to-violet-500 text-lg hover:from-cyan-500 hover:to-violet-600 text-white">
                Open Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8">
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} ZBot Industrial AI Agent. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
