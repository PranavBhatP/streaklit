'use client'
import React from 'react'
import Navbar from './Navbar'
import RegisterForm from './RegisterForm'

type Props = {}

export default function page({}: Props) {
  return (
    <div className = "flex flex-col items-center justify-content">
        <Navbar/>
        <RegisterForm/>
    </div>
  )
}