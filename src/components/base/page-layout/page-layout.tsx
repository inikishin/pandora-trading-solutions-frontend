import React from "react";
import Head from "next/head";

import { Header } from "@/components/base/header/header";
import logo from '@/../public/logo.jpeg';

type PageLayoutType = {
  children: React.ReactElement[] | React.ReactElement;
  title: string;
  description: string;
  ogUrl?: string;
  ogImage?: string;
};

export const PageLayout: React.FC<PageLayoutType> = ({ children, title, description, ogUrl, ogImage }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={ogUrl ? ogUrl : 'https://pandoratradingsolutions.com'} />
        <meta property="og:image" content={ogImage ? ogImage : logo.src} />
      </Head>
      <Header isTransparent={false} />
      <main className="container mx-auto mt-20">
        {children}
      </main>
    </div>
  );
};
