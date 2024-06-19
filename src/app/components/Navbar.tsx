import React, { useState } from 'react';
import { FaFire, FaBars, FaTimes } from 'react-icons/fa';
import { Kanit } from 'next/font/google';
import Link from 'next/link';

const kanit = Kanit({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
});

type Props = {};

function Navbar({}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav id="nav" className="flex items-center justify-between lg:px-10 sm:px-4 py-2 border-b bg-white">
      <div className="flex items-center gap-x-5">
        <Link href="#features" className="font-bold hidden sm:block">Features</Link>
        <Link href="#faq" className="font-bold hidden sm:block">FAQ</Link>
      </div>
      <div className="flex items-center gap-1">
        <FaFire className="text-xl text-red-500" />
        <h2 className="flex text-2xl font-bold">
          <span className={kanit.className}>StreakLit</span>
        </h2>
      </div>
      <div className="flex items-center gap-x-5 hidden sm:flex">
        <Link href="/auth/login" className="font-bold">Login</Link>
        <Link href="/auth/register" className="rounded-lg font-bold text-red-500 p-2 ring-2 ring-red-500">Sign Up</Link>
      </div>
      <div className="sm:hidden">
        <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
      </div>
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-50 opacity-90">
          <FaTimes className="text-3xl cursor-pointer absolute top-4 right-4  hover:bg-red-400 hover:text-white  p-2 rounded-lg hover:scale-1.1" onClick={toggleMenu} />
          <Link href="#features" className="font-bold text-2xl my-2 hover:bg-red-400 hover:text-white p-2 rounded-lg hover:scale-1.1" onClick={toggleMenu}>Features</Link>
          <Link href="#faq" className="font-bold text-2xl my-2 hover:bg-red-400 hover:text-white p-2 rounded-lg hover:scale-1.1" onClick={toggleMenu}>FAQ</Link>
          <Link href="/auth/login" className="font-bold text-2xl my-2 hover:bg-red-400 hover:text-white p-2 rounded-lg hover:scale-1.1" onClick={toggleMenu}>Login</Link>
          <Link href="/auth/register" className="rounded-lg font-bold text-red-500 text-2xl my-2 p-2 ring-2 ring-red-500" onClick={toggleMenu}>Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
