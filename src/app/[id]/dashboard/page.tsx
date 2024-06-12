'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import StreakCard from './StreakCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
//import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import {Bars} from 'react-loading-icons'
import { IStreak } from '@/model/Streak';
import {Types} from 'mongoose';


const DashboardPage = ({ params }: { params: { id: string } }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [streakList, setStreakList] = useState<any>([]);
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = params.id;
  const randomValues = getRange(200).map(index => {
    return {
      date: shiftDate(new Date(), -index),
      count: getRandomInt(1, 3),
    };
  });
  // Redirect to login page if user is unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    } else if (status === 'authenticated' && userId) {
      fetch(`/api/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUser(data)
          setStreakList(data.streaks)
        })
        .catch((err) => {console.error('Failed to fetch user data:', err)});
    }
  }, [status, userId]);
  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return <Bars stroke="#F87171" strokeOpacity={.125}/>;
  }
  function shiftDate(date: Date, numDays: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }
  
  function getRange(count: number) {
    return Array.from({ length: count }, (_, i) => i);
  }
  
  function getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userId = { userId }/>
      <div className={`flex-1 p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64'  : 'ml-0'}`}>
      <h1 className="lg:text-5xl sm: text-2xl text-xl w-3/5 font-bold mt-10 border-b-2 border-red-400">Hey there, {user?.username}</h1>
      <div className="mt-1 flex gap-y-5 flex-col border-b py-6">
        {/* Add your dashboard content here */}
        <h3 className = "text-2xl font-semibold">Your activity</h3>
        <div className = "flex w-full border-b-4 items-center justify-center border-red-400 shadow-2xl rounded-xl h-96 ">
          {/* <CalendarHeatmap
            startDate={shiftDate(new Date(), -150)}
            endDate={new Date()}
            values={randomValues}
            classForValue={value => {
              if (!value) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
            tooltipDataAttrs={value => {
              return {
                'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${
                  value.count
                }`,
              };
            }}
            showWeekdayLabels={true}
            onClick={value => alert(`Clicked on value with count: ${value.count}`)}
          /> */}
          <h1>Activity here!</h1>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-y-5 border-b py-6">
        {/* Add your dashboard content here */}
        <h3 className = "text-2xl font-semibold">Your streaks 🔥</h3>
        <div className='flex flex-wrap gap-10'>
          {streakList.length > 0 && streakList.map((streakId: Types.ObjectId, index: number)=> (
            <StreakCard key = {index} streakId ={streakId}/>
          ))}
          {streakList.length === 0 && <p className='text-center font-semibold flex items-center justify-center'>Let's begin our day!</p>}
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
