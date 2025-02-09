"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCalendar } from 'react-icons/fi';  // Feather Icons

import Questionary from '../questionary/Questionary';
import AnimatedSphere from '@/compounds/background';

const Page: React.FC = () => {
  // Show quiz or sphere?
  const [showQuiz, setShowQuiz] = useState(false);

  // Manage date/time
  const [dateTime, setDateTime] = useState(new Date());

  // Next.js App Router navigation
  const router = useRouter();

  useEffect(() => {
    const timerId = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  // Format date/time in French
  const formattedDateTime = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(dateTime);

  // Start the quiz (hide the sphere, shrink date/time)
  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  // Navigate to your /calendar route
  const handleGoToCalendar = () => {
    router.push('/calendar');
  };

  return (
    <main className="page">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

        :global(body, html) {
          margin: 0;
          padding: 0;
        }

        .page {
          color: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .header-bar {
          position: relative; /* so we can position elements inside it absolutely */
          padding: 1rem;
          text-align: center;
          z-index: 10;
        }

        /* Calendar icon in the top-right corner */
        .calendar-icon-container {
          position: absolute;
          top: 1rem;
          right: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Customize icon size/color if desired */
        .calendar-icon-container :global(svg) {
          width: 30px;
          height: 30px;
          fill: #fff;
        }

        .page-title {
          margin: 0 0 0.5rem 0;
          font-family: 'Montserrat', sans-serif;
          font-size: 1.75rem;
        }

        .date-time-container {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Montserrat', sans-serif;
          transition: font-size 0.4s ease;
          font-size: 2rem; /* Slightly bigger initially */
        }

        .date-time-container.small {
          font-size: 1rem; /* Shrink when quiz is shown */
        }

        /* The main content area for the sphere or quiz */
        .content-area {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
      `}</style>

      {/* Header Bar with title, date/time, and a calendar icon in the corner */}
      <div className="header-bar">
        <div className={`date-time-container ${showQuiz ? 'small' : ''}`}>
          {formattedDateTime}
        </div>

        {/* The calendar icon that goes to /calendar */}
        <div className="calendar-icon-container" onClick={handleGoToCalendar}>
          <FiCalendar />
        </div>
      </div>

      {/* Sphere or Quiz below the header */}
      <div className="content-area">
        {showQuiz ? (
          <Questionary />
        ) : (
          <AnimatedSphere onStart={handleStartQuiz} />
        )}
      </div>
    </main>
  );
};

export default Page;
