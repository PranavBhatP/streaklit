'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import StreakCard from './StreakCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session, status } = useSession();


  // Redirect to login page if user is unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    } 
  }, [status]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <h1 className="lg:text-5xl sm: text-2xl text-xl w-3/5 font-bold mt-10 border-b-2 border-red-400">Hey there, John!</h1>
      <div className="mt-1 flex gap-y-5 flex-col border-b py-6">
        {/* Add your dashboard content here */}
        <h3 className = "text-2xl font-semibold">Your activity</h3>
        <div className = "flex w-full border-b-4 items-center justify-center border-red-400 shadow-2xl rounded-xl h-96">
          <h1 className='text-center'>Activity chart here</h1>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-y-5 border-b py-6">
        {/* Add your dashboard content here */}
        <h3 className = "text-2xl font-semibold">Your streaks 🔥</h3>
        <div className='flex flex-wrap gap-10'>
          <StreakCard/>
          <StreakCard/>
          <StreakCard/>
          <StreakCard/>
          <StreakCard/>
          <StreakCard/>
          <StreakCard/>
          <StreakCard/>
          <StreakCard/>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-y-5 border-b py-6">
        {/* Add your dashboard content here */}
        <h3 className = "text-2xl font-semibold">Your Milestones</h3>
        <div className='flex p-2 items-center justify-center border-dashed border-2 border-black w-full h-96 rounded-xl'>
          <p className='flex items-center justify-center'>Add certificates/online achievements images +</p>
        </div>
      </div>
      </div>
    </div>
  )
}
export default DashboardPage;
