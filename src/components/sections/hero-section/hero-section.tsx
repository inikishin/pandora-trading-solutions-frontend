import React from "react";
import Link from 'next/link';

import { Header } from "@/components/base/header/header";


export const HeroSection: React.FC = () => {
  return (
    <div className="h-screen overflow-hidden bg-hero flex justify-center items-center">
      <div className="absolute bg-black/50 w-full h-screen"/>

      <Header isTransparent />

      <div className="relative max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Pandora Trading Solutions
        </h1>
        <p className="mt-6 text-lg leading-8 text-white">
          Ваш проводник в мире финансовых рынков. Технический анализ инструментов, торговые сигналы, прогнозы
          цены с использованием искусственного интеллекта.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/daily"
            className="rounded-md bg-danger-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-danger-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger-600"
          >
            Вперед
          </Link>
        </div>
      </div>
    </div>
  )
}
