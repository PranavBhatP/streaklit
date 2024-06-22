"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import StreakCard from './StreakCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import 'react-calendar-heatmap/dist/styles.css';
import { Types } from 'mongoose';
import Image from 'next/image';
import { OurUploadButton } from './UploadButton';
import DownloadableImage from './DownloadbleImage';

const DashboardPage = ({ params }: { params: { id: string } }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [streakList, setStreakList] = useState<any>([]);
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const userId = params.id;

  // Redirect to login page if user is unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    } else if (status === 'authenticated' && userId) {
      fetch(`/api/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUser(data);
          setStreakList(data.streaks);
          setImageList(data.images); // Set the image list from user data
        })
        .catch((err) => { console.error('Failed to fetch user data:', err) });
    }
  }, [status, userId]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return <p className="h-screen w-full flex items-center text-center justify-center text-black text-5xl font-bold">Loading...</p>;
  }

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userId={userId} />
      <div className={`flex-1 p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <Image src="/profile.png" alt="Pfp" width={100} height={100} className="hover:drop-shadow-image" />
        <h1 className="lg:text-5xl sm:text-2xl text-xl w-1/2 font-bold mt-10 border-b-2 border-red-400">Hey there, {user?.username} </h1>
        <div className="mt-1 flex gap-y-5 flex-col border-b py-6">
          <h3 className="text-2xl font-semibold">Your activity</h3>
          <div className="flex w-full border-b-4 items-center justify-center border-red-400 shadow-2xl rounded-xl h-96 ">
            <h1>Activity here!</h1>
          </div>
        </div>
        <div className="mt-1 flex flex-col gap-y-5 border-b py-6">
          <h3 className="text-2xl font-semibold">Your streaks 🔥</h3>
          <div className='flex flex-wrap gap-10'>
            {streakList.length > 0 && streakList.map((streakId: Types.ObjectId, index: number) => (
              <StreakCard key={index} streakId={streakId} />
            ))}
            {streakList.length === 0 && <p className='text-center font-semibold flex items-center justify-center'>Let&apos;s begin our day!</p>}
          </div>
        </div>
        <div className="mt-1 flex flex-col gap-y-5 border-b py-6">
          <h3 className="text-2xl font-semibold">Your Milestones</h3>
          {imageList.length > 0 ? (
            <div className = "flex flex-col mx-auto items-center justify-center gap-2">
              {imageList.map((imageUrl, index) => (
                <DownloadableImage key  ={index} imageUrl={imageUrl} alt = {`image${index}`}/>
              ))}
            </div>
          ) : (
            <div className='flex p-2 items-center justify-center border-dashed border-2 border-black w-full h-96 rounded-xl'>
              <p className='flex items-center justify-center'>Add certificates/online achievements images +</p>
            </div>
          )}
          <div className="flex items-center justify-center">
            <OurUploadButton userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
