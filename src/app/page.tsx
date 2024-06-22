'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Kanit } from 'next/font/google';
import Link from 'next/link';
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css';

const kanit = Kanit({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
});

const Home: React.FC = () => {
  const [faqVisible, setFaqVisible] = useState([false, false, false, false]);

  const toggleFaq = (index: number) => {
    setFaqVisible(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <>
      <Navbar/>
      <main className="flex flex-col items-center justify-between p-2 gap-y-28 h-full">
      <div className="flex flex-col items-center justify-center w-3/5 gap-y-3 mt-28 border-b">
          <p className="font-bold text-sm text-center text-gray-400">CORE</p>
          <h1 className="flex text-7xl font-bold text-center">Get Your Online Habits Straight!</h1>
          <p className="text-center font-bold text-gray-700">
            Track website visits. Maintain streaks. Build lifelong habits. Make progress.
            <br />
            All it takes is Streaklit.
          </p>
          <Link href="/" className="bg-red-400 text-black rounded-lg p-3 font-bold mt-4 hover:text-red-500 hover:bg-transparent hover:ring-2 hover:ring-red-500 transistion-opacity duration-300">Get Started!</Link>
          <Image src="/image1.jpg" alt="Description of image" width={600} height={600} />
        </div>
        <div className="flex flex-col items-center justify-center w-3/5 gap-y-3 border-b">
          <p className="font-bold text-sm text-center text-gray-400">TRACK PROGRESS*</p>
          <h1 className="flex text-6xl font-bold text-center">Use our in-house Chrome Extension to track web visits!</h1>
          <p className="text-center font-bold text-gray-700">
            Use our trustworthy and powerful Chrome extension to record your streaks.
          </p>
          <Image src="/image5.jpg" alt="Description of image" width={500} height={500} />
        </div>
        <div id="features" className="flex flex-col items-center justify-center w-3/5 gap-y-5">
          <p className="font-bold text-sm text-center text-gray-400">FEATURES*</p>
          <h1 className="flex text-6xl font-bold text-center">View Visit Analytics and Streak Data!</h1>
          <p className="text-center font-bold text-gray-700">
            View graphs. Avail streak data and reports.
          </p>
          <Image src="/image3.jpg" alt="Description of image" width={600} height={600} />
        </div>
        <div id="faq" className="flex flex-col items-center justify-center w-3/5 gap-y-10 mt-10">
          <p className="font-bold text-sm text-center text-gray-400">FAQ</p>
          <h1 className="flex text-5xl font-bold text-center">Frequently Asked Questions</h1>
          <div className="w-full text-left mb-20">
            {[
              { question: "What is Streaklit?", answer: "Streaklit is a tool that helps you track your website visits, maintain streaks, and build lifelong habits." },
              { question: "How does the Chrome Extension work?", answer: "Our Chrome extension monitors your web visits and records your streaks, providing you with detailed analytics and reports." },
              { question: "Is my data safe with Streaklit?", answer: "Yes, your data privacy and security are our top priorities. We use advanced security measures to protect your information." },
              { question: "How can I get started?", answer: "Click on the 'Get Started!' button above to sign up and start tracking your web visits with Streaklit." }
            ].map((faq, index) => (
              <div key={index} className="my-6">
                <h2
                  className="font-bold text-xl text-center cursor-pointer border-b border-red-500"
                  onClick={() => toggleFaq(index)}
                >
                  Q: {faq.question}
                </h2>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${faqVisible[index] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-700 text-center">
                    A: {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </>
    
  );
}

export default Home;
