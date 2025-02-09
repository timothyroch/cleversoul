"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { FiCalendar } from "react-icons/fi";

export default function DayPage({
  params,
}: {
  params: { year: string; month: string; day: string };
}) {
  const router = useRouter();

  // Correctly unwrap params using React.use()
  const { year, month, day } = React.use(params);

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        const res = await fetch(`/api/Quiz?date=${year}-${month}-${day}`);

        // If the server is designed to return 404 when no quiz is found:
        if (res.status === 404) {
          // There's simply no quiz for this date; that’s not a “fetch error.”
          setQuiz(null);
        } else if (res.ok) {
          // 2xx status
          const data = await res.json();
          // If your API sets quiz to null or data.quiz is missing:
          if (data.success && data.quiz) {
            setQuiz(data.quiz);
          } else {
            setQuiz(null);
          }
        } else {
          // Throw for other errors (500, 403, etc.)
          throw new Error(`HTTP Error: ${res.status}`);
        }
      } catch (error: any) {
        console.error("Error fetching quiz:", error);
        setError("Failed to fetch quiz data.");
      }
      setLoading(false);
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

  // Navigate to the next date
  const handleNextDay = () => {
    const nextDate = getNextDate(Number(year), Number(month), Number(day));
    router.push(`/calendar/day/${nextDate.year}/${nextDate.month}/${nextDate.day}`);
  };

  // Navigate to the previous date
  const handlePrevDay = () => {
    const prevDate = getPrevDate(Number(year), Number(month), Number(day));
    router.push(`/calendar/day/${prevDate.year}/${prevDate.month}/${prevDate.day}`);
  };

  // Navigate to the calendar overview
  const handleGoToCalendar = () => {
    router.push('/calendar');
  };

  return (
    <div style={styles.pageContainer}>
      {/* The calendar icon that navigates to /calendar */}
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

      {/* Fixed left arrow */}
      <button
        style={{ ...styles.arrowButton, ...styles.arrowButtonLeft }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.arrowButtonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.arrowButton.backgroundColor)
        }
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
              {quiz[0].questions.map((q: any, index: number) => (
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
              <p>{quiz[0].summary.daySummary}</p>
            </div>
            <div style={styles.recommendationsContainer}>
              <h3>Recommendations</h3>
              <p>{quiz[0].summary.recommendations}</p>
            </div>
          </div>
        ) : (
          <p>No quiz has been completed on this day.</p>
        )}
      </div>

      {/* Fixed right arrow */}
      <button
        style={{ ...styles.arrowButton, ...styles.arrowButtonRight }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.arrowButtonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.arrowButton.backgroundColor)
        }
        onClick={handleNextDay}
        aria-label="Next Day"
      >
        →
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  // Main page container
  pageContainer: {
    position: "relative",
    minHeight: "100vh",
    padding: "2rem",
    color: "#f8f9fa",
    fontFamily: "Roboto, sans-serif",
  },

  // Calendar icon container
  calendarIconContainer: {
    position: "fixed",       // Ensures the icon stays in place on scroll
    top: "1rem",             // Distance from the top of the viewport
    left: "1rem",            // Distance from the left of the viewport
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,            // Keeps the icon above other elements
  },

  // Content wrapper
  contentContainer: {
    maxWidth: "750px",
    margin: "0 auto",
    textAlign: "center",
  },

  // Date title
  dayTitle: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    fontWeight: 700,
  },

  // Quiz title
  quizTitle: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    fontWeight: 600,
  },

  // Quiz list container
  quizList: {
    listStyleType: "none",
    padding: 0,
    margin: "1rem 0",
    textAlign: "left",
  },

  // Individual quiz item
  quizListItem: {
    marginBottom: "1rem",
    padding: "1rem",
    backgroundColor: "#ffffff22",
    borderRadius: "0.5rem",
  },

  // Fixed arrow button style
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

  // Hover state for arrow button
  arrowButtonHover: {
    backgroundColor: "#005bb5",
  },

  // Position the left arrow
  arrowButtonLeft: {
    position: "fixed",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
  },

  // Position the right arrow
  arrowButtonRight: {
    position: "fixed",
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
  },

  // Summary section
  summaryContainer: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#ffffff22",
    borderRadius: "0.5rem",
    textAlign: "left",
  },

  // Recommendations section
  recommendationsContainer: {
    marginTop: "1.5rem",
    padding: "1rem",
    backgroundColor: "#ffffff22",
    borderRadius: "0.5rem",
    textAlign: "left",
  },
};
