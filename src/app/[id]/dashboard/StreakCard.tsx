import React, { ReactEventHandler, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrPowerReset } from 'react-icons/gr';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IStreak } from '@/model/Streak';
import { Types } from 'mongoose';
import dayjs from 'dayjs';
type Props = {
  streakId: Types.ObjectId; // Assuming streakId is of type ObjectId
};

const StreakCard: React.FC<Props> = ({ streakId }) => {
  const [streak, setStreak] = useState<IStreak | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const res = await fetch(`/api/streak/${streakId}`);
        if (res.ok) {
          const data = await res.json();
          setStreak(data);
          setPercentage(data.streakLength || 0);
          const streakStartDate = dayjs(data.streakStartDate);
          const currentDate = dayjs();
          const differenceInDays = currentDate.diff(streakStartDate, 'day');

          if (differenceInDays > 1) {
            await handleReset();
          }
          
        } else {
          console.error('Failed to fetch streak data');
        }
      } catch (error) {
        console.error('Error fetching streak data:', error);
      }
    };

    fetchStreak();
  }, [streakId]);

  const handleClick = async () => {
    setPercentage(percentage+1);
    try {
      const res = await fetch(`/api/streak/${streakId}/increment`, {
        method: 'PUT',
      });
      if (res.ok) {
        const updatedStreak = await res.json();
        setPercentage(updatedStreak.streakLength);
        if(percentage >= updatedStreak.target) {
          setMessage("Congrats! You've reached your goal!");
        } else {
          setMessage('Come back tomorrow to update your streak!')
        }
      } else {
        console.error('Failed to increment streak length');
      }
    } catch (error) {
      console.error('Error incrementing streak length:', error);
    }
  };

  const handleReset = async () => {
    //setPercentage(0);
    try {
      const res = await fetch(`/api/streak/${streakId}/reset`, {
        method: 'PUT',
      });
      if (res.ok) {
        const updatedStreak = await res.json();
        setPercentage(updatedStreak.streakLength);
        setStreak(updatedStreak);
      } else {
        console.error('Failed to reset streak length');
      }
    } catch (error) {
      console.error('Error resetting streak length:', error);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/streak/${streakId}`,{
        method: "DELETE"
      })
      if(res.ok) {
        window.location.reload();
      }              
    } catch(err) {
      console.error('Failed to reset streak length');
    }
  } 

  return (
    <div className="flex w-56 flex-col items-center justify-center h-72 border-2 border-red-400 rounded-lg shadow-2xl p-4">
      <div className="flex w-full justify-between">
        <GrPowerReset
          onClick={handleReset}
          className="text-gray-500 rounded-lg p-1 hover:bg-red-300 hover:text-white text-3xl transition-colors duration-200"
        />
        <h1 className="font-semibold text-xl">{streak?.websiteName}</h1>
        <RiDeleteBin6Line
          onClick = {handleDelete}
          className="text-gray-500 text-3xl p-1 hover:bg-red-300 hover:text-white rounded-lg transition-colors duration-200"
        />
      </div>
      <p className="font-semibold text-gray-300 text-sm">TARGET: {streak?.target}</p>
      <CircularProgressbar
        maxValue={streak?.target}
        className="py-2"
        styles={buildStyles({
          pathTransitionDuration: 0.5,
          pathColor: `#F87171`,
        })}
        value={percentage}
        text={`${Math.floor(percentage)}/${streak?.target || 0}`}
        strokeWidth={6}
      />
      <button
        onClick={handleClick}
        className="rounded-full hover:bg-red-300 mt-1 transition-colors duration-200 px-2 bg-red-400"
      >
        +
      </button>
      <p className = "text-gray-400 text-xs text-center font-semibold">{message}</p>
    </div>
  );
};

export default StreakCard;
