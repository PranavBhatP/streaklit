import React from 'react'
import { FaFire } from "react-icons/fa6";
import { Kanit } from 'next/font/google';
import Link from 'next/link';
const kanit = Kanit({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
  })
type Props = {}

function Navbar({}: Props) {
  return (
    <nav id = "nav" className = "flex items-center justify-between px-10 py-2 border-b">
        <div className = "flex items-center gap-x-5">
            <Link href = "#features"className = "font-bold">Features</Link>
            <Link href = "#faq" className = "font-bold">FAQ</Link>
        </div>
        <div className="flex items-center gap-1">
            <FaFire className='text-xl text-red-500'/>
            <h2 className ="flex text-2xl font-bold"><span className = {kanit.className}>StreakLit</span></h2>
        </div>
        <div className = "flex items-center gap-x-5">
            <Link href = "/auth/login" className = "font-bold">Login</Link>
            <Link href = '/auth/register' className = "rounded-lg font-bold text-red-500 p-2 ring-2 ring-red-500">Sign Up</Link>
        </div>
    </nav>
  )
}

export default Navbar