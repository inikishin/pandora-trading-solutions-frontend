import React from 'react';
import Link from "next/link";
import Image from "next/image";

import logo from '../../../../../public/logo.jpeg';

export type DailyCardType = {
  id: string;
  code: string;
  name: string;
  description: string;
  img: string;
  onDatetime: string;
};

export const DailyCard: React.FC<DailyCardType> = (
  { id, code, name, description, img, onDatetime}) => {
  return (
    <article className="flex max-w-xl flex-col items-start hover:bg-gray-100 rounded-xl p-4">
      <Link href={`/daily/${code}`}>
        <div className="flex w-full justify-center">
          <Image src={img ? img : logo} alt={code} className="rounded-xl" />
        </div>
        <div className="flex items-center gap-x-4 text-xs w-full justify-between mt-3">
          <div className="text-gray-500">{new Date(onDatetime).toLocaleString("ru-RU")}</div>
          <div className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{code}</div>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            {name}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{description}</p>
        </div>
      </Link>
    </article>
  );
};
