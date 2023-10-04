'use client';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from './ui/Button';

const UserDropDownMenu = () => {
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <div className="relative">
      <ChevronDown
        size={28}
        className={`cursor-pointer hover:bg-blue hover:stroke-white rounded-lg ${
          isOpen && 'rotate-180'
        }`}
        onClick={() => SetIsOpen(!isOpen)}
      />
      <div
        className={`absolute top-[150%] right-0 bg-white rounded-lg shadow-main flex flex-col text-center ${
          !isOpen && 'hidden'
        }`}
      >
        <Button
          variant="text"
          href="/sign-in"
          className="p-3 border-b-[0.5px] border-black/25"
        >
          Профиль
        </Button>
        <Button variant="text" onClick={() => signOut()} className="p-3">
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default UserDropDownMenu;
