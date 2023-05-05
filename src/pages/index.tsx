import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { HeroSection } from "@/components/sections/hero-section/hero-section";

import logo from '@/../public/logo.jpeg';

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pandora Trading Solutions технический анализ финансовых рынков - pandoratradingsolutions.com</title>
        <meta name="description" content="Pandora Trading Solutions технический анализ финансовых рынков" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pandora Trading Solutions технический анализ финансовых рынков - pandoratradingsolutions.com" key="title" />
        <meta property="og:description" content="Pandora Trading Solutions технический анализ финансовых рынков" />
        <meta property="og:url" content="https://pandoratradingsolutions.com" />
        <meta property="og:image" content={logo.src} />
        </Head>
      <HeroSection />
    </div>
  )
}

export default HomePage;
