import { NextResponse } from 'next/server';
import User from '@/model/User';

export async function GET(request: Request, { params } : {params: { id: string}}) {
    //dbConnect is not required since th database is connected on the initial run.
    try {
        const user = await User.findById(params.id);
        if(!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        return NextResponse.json(user);
    } catch (err) {
        return NextResponse.json({message:" Server error", err }, { status: 500});
    }
}