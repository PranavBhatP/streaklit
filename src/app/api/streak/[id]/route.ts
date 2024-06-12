import {NextResponse} from 'next/server';
import Streak from '@/model/Streak';
import User from '@/model/User';
export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    const { id } = params;
    
    try {
        const streak = await Streak.findById(id);
        if(!streak) {
            return NextResponse.json({ message: 'Streak not found'}, { status: 404});
        }

        await Streak.findByIdAndDelete(id);
        await User.updateOne({streaks: id}, { $pull: {streaks: id}})
        return NextResponse.json({ message: 'Succesfully deleted'}, { status: 200 });
    } catch(e) {
        return NextResponse.json({ message: 'Server error', e}, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {  
    const { id } = params;
  
    try {
      const streak = await Streak.findById(id);
      if (!streak) {
        return NextResponse.json({ message: 'Streak not found' }, { status: 404 });
      }
  
      return NextResponse.json(streak, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    }
}
