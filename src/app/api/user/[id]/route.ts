import { NextResponse } from 'next/server';
import User from '@/model/User';

export async function GET(request: Request, { params } : {params: { id: string}}) {
    try {
        const user = await User.findById(params.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (err) {
        return NextResponse.json({ message: "Server error", err }, { status: 500 });
    }
}

export async function PUT(request: Request, { params } : {params: { id: string}}) {
    try {
        const { username, email } = await request.json();
        const user = await User.findById(params.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        user.username = username || user.username;
        user.email = email || user.email;
        await user.save();
        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Server error", err }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params } : {params: { id: string}}) {
    try {
        const user = await User.findById(params.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        await user.remove();
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Server error", err }, { status: 500 });
    }
}

export async function POST(request: Request, { params } : {params: { id: string}}) {
    try {
        const { imageKey } = await request.json();
        if (!imageKey) {
            return NextResponse.json({ message: "Image key is required" }, { status: 400 });
        }

        const user = await User.findById(params.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.images.push(imageKey);
        await user.save();

        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Server error", err }, { status: 500 });
    }
}
