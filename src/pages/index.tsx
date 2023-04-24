import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { HeroSection } from "@/components/sections/hero-section/hero-section";

export default function Home() {
  return (
    <HeroSection />
  )
}
