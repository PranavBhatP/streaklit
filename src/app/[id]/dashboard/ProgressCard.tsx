import React, { useEffect, useState } from 'react';
import { Types } from 'mongoose';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
type Props = {
    streakIdList: Types.ObjectId[],
}

export default function ProgressCard({streakIdList}: Props) {
    const [barChartData, setBarChartData] = useState<any[]>([])

    useEffect(() => {
        const fetchStreakData = async () => {
            const data = await Promise.all(streakIdList.map(async (streakId) => {
                const response = await fetch(`/api/streak/${streakId}`);
                const streak = await response.json();
                console.log("Fetched!!")
                return { name: streak.websiteName, streakLength: streak.streakLength };
            }));
            setBarChartData(data);
        }
        fetchStreakData();
    },[streakIdList])
    return (
        <div className="flex flex-col w-full items-center border-red-400 shadow-2xl rounded-xl h-96">
            <h1>Overall progress</h1>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="streakLength" fill="#ff0000" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}