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
    <nav id = "nav" className = "flex w-full h-20 items-center justify-between px-10 py-2">
        <div>
            <Link href = "/">
                <FaFire className='text-4xl text-red-400'/>
            </Link>
        </div>
        <div className = "flex items-center gap-x-5">
            <Link href = '/auth/register' className = "rounded-lg font-bold text-black p-2 ring-2 ring-red-400">Sign Up</Link>
        </div>
    </nav>
  )
}

export default Navbar