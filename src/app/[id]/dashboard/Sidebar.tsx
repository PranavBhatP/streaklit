import React from 'react';
import { FaBars, FaTimes, FaPlus, FaDownload, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
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
          <Link href="/create-streak" className="flex items-center px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200">
              <FaPlus className="mr-3" />
              Create Streak
          </Link>
          <Link href="/download-extension" className="flex items-center px-4 py-2 mt-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200">
              <FaDownload className="mr-3" />
              Download Extension
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
    </div>
  );
};

export default Sidebar;
