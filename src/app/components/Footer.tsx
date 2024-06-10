import React from 'react'
import Link from 'next/link';
import { FaFire } from 'react-icons/fa6';
type Props = {}

function Footer({}: Props) {
  return (
    <footer className = "flex items-center justify-between p-10 sm:flex-row lg:flex-row flex-col border-t gap-y-10">
        <p className='text-gray-400 text-sm'>©Streaklit 2024</p>
        <div className='flex sm:flex-row lg:flex-row flex-col items-center justify-center gap-x-5 mr-20'>
            <Link href='/' className = "text-lg font-bold hover:text-red-500">Get Started ↗</Link>
            <Link href='#nav' className = "text-lg font-bold hover:text-red-500">Back up</Link>
        </div>
        <div className='flex sm:flex-row lg:flex-row flex-col items-center justify-center gap-x-5'>
            <FaFire className='text-5xl text-red-400'/>
        </div>
    </footer>
  )
}

export default Footer