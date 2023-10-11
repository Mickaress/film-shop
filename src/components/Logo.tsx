import React from 'react';
import logo from '@/assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="Мир фильмов" priority />
    </Link>
  );
};

export default Logo;
