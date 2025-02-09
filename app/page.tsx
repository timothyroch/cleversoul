"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Utility function to get days in a month (month is 1-based)
const getDaysInMonth = (year: number, month: number): number[] => {
  const days = new Date(year, month, 0).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
};

// Utility function to format month names
const getMonthName = (month: number): string => {
  const date = new Date(0, month - 1);
  return date.toLocaleString("default", { month: "long" });
};

// Utility function to get day names starting from Monday
const getDayNames = (): string[] => {
  const baseDate = new Date(2021, 5, 7); // June 7, 2021 is a Monday
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(baseDate);
    day.setDate(baseDate.getDate() + i);
    return day.toLocaleString("default", { weekday: "short" });
  });
};

// Utility function to get the weekday index of the first day of the month
// (returns 0 for Monday, 6 for Sunday)
const getFirstWeekday = (year: number, month: number): number => {
  const firstDay = new Date(year, month - 1, 1);
  const day = firstDay.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  return day === 0 ? 6 : day - 1;
};

export default function HomePage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();  

  // Declare hooks at the top level
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);

 // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setCurrentMonth(new Date().getMonth() + 1);
  }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const dayNames = getDayNames();
  const firstWeekday = getFirstWeekday(currentYear, currentMonth);

  // Build calendar grid: start with empty slots before the 1st
  const calendarDays: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...daysInMonth,
  ];

  // Pad the grid so the total number of cells is a multiple of 7
  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  while (calendarDays.length < totalCells) {
    calendarDays.push(null);
  }

  // Handler for when a day is clicked; navigates to a dynamic route
  const handleDayClick = (day: number): void => {
    router.push(`/calendar/day/${currentYear}/${currentMonth}/${day}`);
  };

  // Handlers to navigate between months
  const goToPrevMonth = (): void => {
    setCurrentMonth(prev => {
      if (prev === 1) {
        setCurrentYear(year => year - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  const goToNextMonth = (): void => {
    setCurrentMonth(prev => {
      if (prev === 12) {
        setCurrentYear(year => year + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  // Check if a given day is today
  const today = new Date();
  const isToday = (day: number): boolean =>
    day === today.getDate() &&
    currentMonth === today.getMonth() + 1 &&
    currentYear === today.getFullYear();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button
          style={styles.navButton}
          onClick={goToPrevMonth}
          aria-label="Previous Month"
        >
          ←
        </button>
        <div style={styles.dateDisplay}>
          <span style={styles.month}>{getMonthName(currentMonth)}</span>{" "}
          <span style={styles.year}>{currentYear}</span>
        </div>
        <button
          style={styles.navButton}
          onClick={goToNextMonth}
          aria-label="Next Month"
        >
          →
        </button>
      </header>

      {/* Render day labels */}
      <div style={styles.dayLabels}>
        {dayNames.map((name, index) => (
          <div key={index} style={styles.dayLabel}>
            {name}
          </div>
        ))}
      </div>

      {/* Render calendar grid */}
      <div style={styles.grid}>
        {calendarDays.map((day, index) =>
          day !== null ? (
            <button
              key={index}
              style={{
                ...styles.dayButton,
                ...(isToday(day) ? styles.todayButton : {}),
              }}
              onClick={() => handleDayClick(day)}
              aria-label={`Day ${day}`}
            >
              {day}
            </button>
          ) : (
            <div key={index} style={styles.emptySlot}></div>
          )
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "500px",
    marginBottom: "1rem",
  },
  dateDisplay: {
    fontSize: "1.8rem",
    fontWeight: 600,
    color: "#333",
  },
  month: {
    textTransform: "capitalize",
    marginRight: "0.5rem",
    color: "#fff",
  },
  year: {
    color: "#fff",
  },
  navButton: {
    fontSize: "1.5rem",
    padding: "0.5rem 1rem",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 112, 243, 0.3)",
  },
  dayLabels: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.5rem",
    maxWidth: "500px",
    width: "100%",
    marginBottom: "0.5rem",
  },
  dayLabel: {
    textAlign: "center",
    fontWeight: 600,
    color: "#555",
    fontSize: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.5rem",
    maxWidth: "500px",
    width: "100%",
  },
  dayButton: {
    width: "100%",
    padding: "1rem 0",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "1rem",
    color: "#333",
    transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  todayButton: {
    backgroundColor: "#0070f3",
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 112, 243, 0.3)",
  },
  emptySlot: {
    width: "100%",
    padding: "1rem 0",
    border: "1px solid transparent",
    backgroundColor: "transparent",
    borderRadius: "4px",
  },
};
