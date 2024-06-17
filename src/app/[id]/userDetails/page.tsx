'use client'
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {}

export default function Page({ params }: { params: { id: string } }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const userId = params.id;

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/auth/login');
        } else if (status === 'authenticated' && userId) {
            fetch(`/api/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setUsername(data.username);
                setEmail(data.email);
            })
            .catch((err) => { console.error('Failed to fetch user data:', err) });
        }
    }, [status, userId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/user/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                })
            });
            if (res.ok) {
                const updatedUser = await res.json();
                setUser(updatedUser);
            } else {
                console.error('Failed to update user info');
            }
        } catch (err) {
            console.error('Error updating user info:', err);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const res = await fetch(`/api/user/${userId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                redirect('/auth/login');
            } else {
                console.error('Failed to delete account');
            }
        } catch (err) {
            console.error('Error deleting account:', err);
        }
    };

    if (!user) {
        return <p className="h-screen w-full flex items-center text-center justify-center text-black text-5xl font-bold">Loading...</p>;
    }

    return (
        <main className="flex h-screen w-full m-100 items-center justify-center">
            <div className='w-3/5 flex lg:flex-row flex-col items-center justify-center p-10 border-gray-300 rounded-lg border-2'>
                <section className='flex flex-col lg:h-96 h-auto w-1/4 lg:border-r-2 lg:border-red-400 justify-between'>
                    <div className="flex flex-col">
                        <Link href = {`/${userId}/dashboard`}>
                            <Image src="/profile.png" width={100} height={100} alt="profile picture" />
                        </Link>
                        <h4 className="text-lg font-semibold text-gray-600">{user?.username}</h4>
                        <h4 className="text-lg font-semibold text-gray-600">{user?.email}</h4>
                    </div>
                    <div className="flex flex-col">
                        <button 
                            onClick={handleSubmit} 
                            className="flex items-center w-4/5 px-4 py-2 mt-2 text-white text-sm bg-red-400 rounded-lg hover:bg-gray-200 hover:text-red-400 transition-colors duration-200">
                            Save
                        </button>
                        <button 
                            onClick={handleDeleteAccount} 
                            className="lg:flex hidden items-center w-4/5 px-4 py-2 mt-2 text-white text-sm bg-red-400 rounded-lg hover:bg-gray-200 hover:text-red-400 transition-colors duration-200">
                            Delete Account
                        </button>
                    </div>
                </section>
                <section className='flex flex-col h-96 w-3/4 mx-10'>
                    <div className="flex flex-col h-full">
                        <h4 className="text-lg font-semibold mb-4 lg:text-left text-center">Hello {user?.username} !</h4>
                        {/* Form to edit user info */}
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold">Username</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:ring-red-400 hover:ring-2 focus:ring-2 focus: ring-red-400"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col mt-6 ">
                                <label className="text-gray-700 font-semibold">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:ring-red-400 hover:ring-2 focus:ring-2 focus: ring-red-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="mt-20 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-red-500 transition-colors duration-200">
                                Save
                            </button>
                            <button 
                                onClick={handleDeleteAccount} 
                                className="lg:hidden  w-full text-center px-4 py-2 mt-1 text-white text-sm bg-red-400 rounded-lg hover:bg-gray-200 hover:text-red-400 transition-colors duration-200"
                            >
                                Delete Account
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    )
}
