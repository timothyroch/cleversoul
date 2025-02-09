"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { FiCalendar } from "react-icons/fi";


// Define the expected structure of the quiz data
interface QuizQuestion {
  question: string;
  response: string | { ateWell?: string; waterIntake?: string };
}

interface QuizSummary {
  daySummary: string;
  recommendations: string;
}

interface Quiz {
  questions: QuizQuestion[];
  summary: QuizSummary;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DayPage({ params }: any) {
  const router = useRouter();
  const { year, month, day } = params;


  const [quiz, setQuiz] = useState<Quiz | null>(null);  // Replaced any with Quiz type
  const [loading, setLoading] = useState<boolean>(true);  // Added explicit boolean type
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/Quiz?date=${year}-${month}-${day}`);

        if (res.status === 404) {
          setQuiz(null);
        } else if (res.ok) {
          const data = await res.json();
          if (data.success && data.quiz) {
            setQuiz(data.quiz[0]);  // Assuming quiz is an array, adjust if needed
          } else {
            setQuiz(null);
          }
        } else {
          throw new Error(`HTTP Error: ${res.status}`);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching quiz:", error.message);
          setError("Failed to fetch quiz data.");
        } else {
          console.error("Unknown error fetching quiz:", error);
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [year, month, day]);

  // Helper to get next date
  const getNextDate = (
    currentYear: number,
    currentMonth: number,
    currentDay: number
  ) => {
    const date = new Date(currentYear, currentMonth - 1, currentDay + 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  };

  // Helper to get previous date
  const getPrevDate = (
    currentYear: number,
    currentMonth: number,
    currentDay: number
  ) => {
    const date = new Date(currentYear, currentMonth - 1, currentDay - 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  };

  // Navigation Handlers
  const handleNextDay = () => {
    const nextDate = getNextDate(Number(year), Number(month), Number(day));
    router.push(`/calendar/day/${nextDate.year}/${nextDate.month}/${nextDate.day}`);
  };

  const handlePrevDay = () => {
    const prevDate = getPrevDate(Number(year), Number(month), Number(day));
    router.push(`/calendar/day/${prevDate.year}/${prevDate.month}/${prevDate.day}`);
  };

  const handleGoToCalendar = () => {
    router.push('/calendar');
  };

  return (
    <div style={styles.pageContainer}>
      <div
        style={styles.calendarIconContainer}
        onClick={handleGoToCalendar}
        aria-label="Go to Calendar"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleGoToCalendar();
        }}
      >
        <FiCalendar size={30} color="#fff" />
      </div>

      <button
        style={{ ...styles.arrowButton, ...styles.arrowButtonLeft }}
        onClick={handlePrevDay}
        aria-label="Previous Day"
      >
        ←
      </button>

      <div style={styles.contentContainer}>
        <h1 style={styles.dayTitle}>
          Selected Date: {year}-{String(month).padStart(2, "0")}-{String(day).padStart(2, "0")}
        </h1>

        {loading ? (
          <p>Loading quiz...</p>
        ) : error ? (
          <p>{error}</p>
        ) : quiz ? (
          <div>
            <h2 style={styles.quizTitle}>Quiz for {year}-{month}-{day}</h2>
            <ul style={styles.quizList}>
              {quiz.questions.map((q, index) => (
                <li key={index} style={styles.quizListItem}>
                  <strong>{q.question}</strong>
                  <br />
                  {typeof q.response === "object" ? (
                    <div>
                      {q.response.ateWell && <p>Ate Well: {q.response.ateWell}</p>}
                      {q.response.waterIntake && <p>Water Intake: {q.response.waterIntake}</p>}
                    </div>
                  ) : (
                    <p>Response: {q.response}</p>
                  )}
                </li>
              ))}
            </ul>

            <div style={styles.summaryContainer}>
              <h3>Summary</h3>
              <p>{quiz.summary.daySummary}</p>
            </div>
            <div style={styles.recommendationsContainer}>
              <h3>Recommendations</h3>
              <p>{quiz.summary.recommendations}</p>
            </div>
          </div>
        ) : (
          <p>No quiz has been completed on this day.</p>
        )}
      </div>

      <button
        style={{ ...styles.arrowButton, ...styles.arrowButtonRight }}
        onClick={handleNextDay}
        aria-label="Next Day"
      >
        →
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    position: "relative",
    minHeight: "100vh",
    padding: "2rem",
    color: "#f8f9fa",
    fontFamily: "Roboto, sans-serif",
  },
  calendarIconContainer: {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  contentContainer: {
    maxWidth: "750px",
    margin: "0 auto",
    textAlign: "center",
  },
  dayTitle: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    fontWeight: 700,
  },
  quizTitle: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    fontWeight: 600,
  },
  quizList: {
    listStyleType: "none",
    padding: 0,
    margin: "1rem 0",
    textAlign: "left",
  },
  quizListItem: {
    marginBottom: "1rem",
    padding: "1rem",
    backgroundColor: "#ffffff22",
    borderRadius: "0.5rem",
  },
  arrowButton: {
    fontSize: "1.8rem",
    padding: "0.8rem 1rem",
    backgroundColor: "#0066cc",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.3)",
    transition: "all 0.2s ease-in-out",
    zIndex: 999,
  },
  arrowButtonLeft: {
    position: "fixed",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
  },
  arrowButtonRight: {
    position: "fixed",
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
  },
  summaryContainer: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#ffffff22",
    borderRadius: "0.5rem",
    textAlign: "left",
  },
  recommendationsContainer: {
    marginTop: "1.5rem",
    padding: "1rem",
    backgroundColor: "#ffffff22",
    borderRadius: "0.5rem",
    textAlign: "left",
  },
};
