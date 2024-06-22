import { NextResponse } from 'next/server';
import Streak from '@/model/Streak';
//import dbConnect from '@/lib/dbConnect';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  //await dbConnect();

  const { id } = params;

  try {
    const streak = await Streak.findById(id);
    if (!streak) {
      return NextResponse.json({ message: 'Streak not found' }, { status: 404 });
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    console.log(today);
    const lastIncrementedDate = new Date(streak.streakStartDate)
    lastIncrementedDate.setHours(0,0,0,0);

    if(lastIncrementedDate.getTime() !== today.getTime() && streak.streakLength > 0) {
      streak.streakLength += 1;
      streak.streakStartDate = today;
      console.log(streak.streakStartDate);
      await streak.save();
    } else if (lastIncrementedDate.getTime() !== today.getTime() || streak.streakLength == 0) {
      streak.streakLength += 1;
      streak.streakStartDate = today;
      console.log(streak.streakStartDate);
      await streak.save();
    } 
    return NextResponse.json(streak, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
