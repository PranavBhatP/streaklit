import { NextResponse } from 'next/server';
import Streak from '@/model/Streak';
import User from '@/model/User';

export async function POST(req: Request) {
    const { websiteUrl, websiteName, target, userId } = await req.json();

    if(!websiteUrl || ! websiteName || !target || !userId ) {
        return NextResponse.json({ message: "Missing required fields"}, { status: 400});
    }

    try {
        const newStreak = await Streak.create({
            websiteUrl,
            websiteName,
            target
        })

        await User.findByIdAndUpdate(userId, { $push: { streaks: newStreak._id }});

        return NextResponse.json(newStreak, { status: 201});
    } catch (err) {
        return NextResponse.json({ message: 'Server error', err }, { status:500 });
    }
}