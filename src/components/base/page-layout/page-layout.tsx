import React from "react";

import { Header } from "@/components/base/header/header";

type PageLayoutType = {
  children: React.ReactElement[] | React.ReactElement;
};

export const PageLayout: React.FC<PageLayoutType> = ({ children }) => {
  return (
    <div>
      <Header isTransparent={false} />
      <main className="container mx-auto mt-20">
        {children}
      </main>
    </div>
  );
};
