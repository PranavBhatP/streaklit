import React, { useState } from 'react';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa';

interface DownloadableImageProps {
  imageUrl: string;
  alt: string;
}

const DownloadableImage: React.FC<DownloadableImageProps> = ({ imageUrl, alt }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = `https://utfs.io/f/${imageUrl}`;
    link.download = imageUrl.split('/').pop() || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full h-full">
      <button
        className="relative rounded-lg p-0 border-none outline-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleDownloadClick}
      >
        <Image src={`https://utfs.io/f/${imageUrl}`} alt={alt} width={400} height={400} className="rounded-lg" />
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500">
            <FaDownload className='text-4xl text-white' />
          </div>
        )}
      </button>
    </div>
  );
};

export default DownloadableImage;
