'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import React from 'react';

type Props = {
  links: Link[];
};

type Link = {
  title: string;
  path: string;
};

const LinksGroup: FC<Props> = ({ links }) => {
  const currentPathname = usePathname();
  return (
    <div className="flex">
      {links.map((link) => (
        <Link
          className={`w-[150px] ${
            link.path === currentPathname && 'bg-white text-blue'
          } rounded-t-xl h-[40px] flex justify-center items-center font-bold`}
          key={link.path}
          href={link.path}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default LinksGroup;
