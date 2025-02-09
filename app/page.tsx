"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Utility function to get days in a month
const getDaysInMonth = (year: number, month: number) => {
  const days = new Date(year, month, 0).getDate(); // Month is 1-based in JavaScript Date
  return Array.from({ length: days }, (_, i) => i + 1); // Create array of days
};

// Utility function to format month names
const getMonthName = (month: number) => {
  const date = new Date(0, month - 1); // Month is 0-based in JavaScript
  return date.toLocaleString("default", { month: "long" });
};

// Utility function to get day names starting from Monday
const getDayNames = () => {
  const baseDate = new Date(2021, 5, 7); // June 7, 2021 is a Monday
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(baseDate);
    day.setDate(baseDate.getDate() + i);
    return day.toLocaleString("default", { weekday: "short" });
  });
};

// Utility function to get the weekday index of the first day of the month (Monday = 0, Sunday = 6)
const getFirstWeekday = (year: number, month: number) => {
  const firstDay = new Date(year, month - 1, 1);
  const day = firstDay.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  return day === 0 ? 6 : day - 1; // Adjust so that Monday = 0, ..., Sunday = 6
};

export default function CalendarPage() {
  const router = useRouter();
  
  // State Hooks - declared at the top level to avoid React Hook misuse errors
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1); // Months are 0-based in JavaScript

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const dayNames = getDayNames();
  const firstWeekday = getFirstWeekday(currentYear, currentMonth);

  // Create an array with empty slots and actual days
  const calendarDays = [
    ...Array(firstWeekday).fill(null), // Empty slots for the start of the month
    ...daysInMonth.map((day) => day),
  ];

  // Ensure the total number of cells is a multiple of 7
  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  while (calendarDays.length < totalCells) {
    calendarDays.push(null);
  }

  // Navigate to dynamic route when clicking a day
  const handleDayClick = (day: number) => {
    router.push(`/calendar/day/${currentYear}/${currentMonth}/${day}`);
  };

  // Navigate to the previous month
  const goToPrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Determine if a day is today
  const today = new Date();
  const isToday = (day: number) =>
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

      {/* Day Labels */}
      <div style={styles.dayLabels}>
        {dayNames.map((day) => (
          <div key={day} style={styles.dayLabel}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={styles.grid}>
        {calendarDays.map((day, index) =>
          day ? (
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
    fontWeight: "600",
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
    fontWeight: "600",
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
