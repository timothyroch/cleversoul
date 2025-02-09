"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnimatedSphereProps {
  onStart: () => void;
}

export const AnimatedSphere: React.FC<AnimatedSphereProps> = ({ onStart }) => {
  const [currentDateTime, setCurrentDateTime] = useState<string | null>(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [todayAnswers, setTodayAnswers] = useState(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  // Update the current date and time on the client side
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(
        now.toLocaleString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // Fetch today’s answers after hydration
  useEffect(() => {
    const checkTodayAnswers = async () => {
      try {
        const response = await fetch("/api/GetResponses", { method: "GET" });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data.length > 0) {
          const today = new Date();
          const todayDateString = today.toISOString().split("T")[0];

          // Check if there is any answer with today's date
          const todayData = data.data.find((entry) => {
            const entryDate = new Date(entry.timestamp).toISOString().split("T")[0];
            return entryDate === todayDateString;
          });

          if (todayData) {
            setHasCompletedQuiz(true);
            setTodayAnswers(todayData);
          }
        }
      } catch (error) {
        console.error("Error fetching today’s answers:", error);
      }
    };

    checkTodayAnswers();
  }, []);

  // Generate the 3D sphere animation
  useEffect(() => {
    const planes = 12;
    const spokes = 36;
    const colors = [
      "var(--primary-blue)",
      "var(--secondary-blue)",
      "var(--accent-blue)",
      "var(--tertiary-blue)",
    ];

    if (sphereRef.current) {
      sphereRef.current.innerHTML = "";

      for (let i = 1; i <= planes; i++) {
        const plane = document.createElement("div");
        plane.className = `plane plane-${i}`;
        plane.style.transform = `rotateY(${(360 / planes) * i}deg)`;

        for (let j = 1; j <= spokes; j++) {
          const spoke = document.createElement("div");
          spoke.className = `spoke spoke-${j}`;
          spoke.style.transform = `rotateZ(${(360 / spokes) * j}deg)`;

          const dot = document.createElement("div");
          dot.className = "dot";
          spoke.appendChild(dot);
          plane.appendChild(spoke);
        }
        sphereRef.current.appendChild(plane);
      }

      for (let i = 0; i <= spokes / 2; i++) {
        const delay = `${i / (spokes / 2)}s`;
        const colorIndex = i % colors.length;

        const spokeDots = sphereRef.current.querySelectorAll(
          `.spoke-${i} .dot, .spoke-${spokes - i} .dot`
        );

        spokeDots.forEach((dot: Element) => {
          (dot as HTMLElement).style.animation = `pulsate .6s infinite ${delay} alternate both`;
          (dot as HTMLElement).style.backgroundColor = colors[colorIndex];
        });
      }
    }
  }, []);

  const handleSeeAnswers = () => {
    alert(JSON.stringify(todayAnswers, null, 2)); // Replace with better UI for displaying answers
  };

  return (
    <div className="animated-sphere-container">
      <style>{`
        :root {
          --background-dark: #333;
          --text-light: #ddd;
          --primary-blue: #1e90ff;
          --secondary-blue: #4682b4;
          --accent-blue: #00bfff;
          --tertiary-blue: #87cefa;
        }

        .animated-sphere-container {
          font-family: 'Roboto', sans-serif;
          background-color: none;
          color: var(--text-light);
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .sphere-wrapper {
          position: relative;
          width: 50vw;
          height: 50vw;
          max-width: 300px;
          max-height: 300px;
          perspective: 1000px;
        }

        .sphere {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotate3d 10s linear infinite;
        }

        .plane {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .spoke {
          position: absolute;
          width: 0;
          height: 50%;
          transform-origin: 0 0;
          transform-style: preserve-3d;
          left: 50%;
          top: 50%;
        }

        .dot {
          position: absolute;
          width: 1vw;
          height: 1vw;
          max-width: 8px;
          max-height: 8px;
          border-radius: 50%;
          background: var(--accent-blue);
          left: -0.5vw;
          top: 100%;
          transform: rotateX(90deg);
        }

        @keyframes rotate3d {
          0% {
            transform: rotate3d(1, 1, 1, 0deg);
          }
          100% {
            transform: rotate3d(1, 1, 1, 360deg);
          }
        }

        @keyframes pulsate {
          0% {
            transform: rotateX(90deg) scale(.4) translateZ(30px);
          }
          100% {
            transform: rotateX(90deg) scale(1) translateZ(0px);
          }
        }

        .start-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          padding: 0.75rem 1.5rem;
          font-size: 0.95rem;
          cursor: pointer;
          background: transparent;
          color: var(--text-light);
          border: 2px solid var(--text-light);
          border-radius: 24px;
          transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
          font-family: 'Roboto', sans-serif;
          text-transform: uppercase;
        }

        .start-button:hover {
          background-color: var(--text-light);
          color: #333;
          transform: translate(-50%, -50%) scale(1.05);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }


      `}</style>

      <div className="sphere-wrapper">
        <div className="sphere" ref={sphereRef}></div>
        {hasCompletedQuiz ? (
          <button className="start-button" onClick={handleSeeAnswers}>
            Quiz Completed, See Answers
          </button>
        ) : (
          <button className="start-button" onClick={onStart}>
            Commencer
          </button>
        )}
      </div>

    </div>
  );
};

export default AnimatedSphere;
