import React, { useState } from 'react';
import { FaBars, FaTimes, FaPlus, FaDownload, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import Modal from './Modal';
import Image from 'next/image';
import { FaPerson, FaWebflow } from 'react-icons/fa6';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
  userId: string;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [target, setTarget] = useState(0);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const res = await fetch(`/api/streak`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteUrl,
          websiteName,
          target: Math.abs(target),
          userId,
        })
      })
      if(res?.ok){
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <div className={`fixed inset-y-0 left-0 bg-red-500 rounded-r-lg text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-semibold">Menu</h2>
          <button onClick={toggleSidebar} className="focus:outline-none">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="mt-10">
          <button onClick={toggleModal} className="flex w-full items-center px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <FaPlus className="mr-3" />
            Create Streak
          </button>
          <Link href="/download-extension" className="flex items-center px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <FaDownload className="mr-3" />
            Download Extension
          </Link>
          <Link href={`/${userId}/userDetails`} className="flex items-center px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <FaPerson className="mr-3" />
            User Information
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full">
          <button className="flex items-center border-t w-full px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <FaSignOutAlt className="mr-3" />
            <Link href="/api/auth/signout">Logout</Link>
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-screen p-4">
        <button onClick={toggleSidebar} className="focus:outline-none text-gray-800">
          <FaBars size={24} className='text-red-400'/>
        </button>
        <div className="mt-4">
          {/* Content of the dashboard goes here */}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className="text-xl font-semibold mb-4">Create Streak</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Website URL</label>
            <input type="url" className="w-full px-4 py-2 border border-gray-700 rounded-lg" required
              value = {websiteUrl}
              onChange={(e)=>setWebsiteUrl(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Website Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-700 rounded-lg" required
              value = {websiteName}
              onChange={(e)=>setWebsiteName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Target Streak Length (days)</label>
            <input type="number" className="w-full px-4 py-2 border border-gray-700 rounded-lg" required
            value = {target}
            onChange={(e)=>setTarget(Math.abs(parseInt(e.target.value)))}
            />
          </div>
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg">Create</button>
        </form>
      </Modal>
    </div>
  );
};

export default Sidebar;
