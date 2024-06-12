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

    streak.streakLength += 1;
    await streak.save();

    return NextResponse.json(streak, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
