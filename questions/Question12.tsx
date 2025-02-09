"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (rating: number) => void;
}

const Question12: React.FC<QuestionProps> = ({ onNext }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onNext(rating);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Sur une échelle de 1 à 10, comment évaluerais-je ma{" "}
          <span style={styles.highlight}>clarté mentale</span> aujourd’hui ?
        </h2>
        <input
          type="range"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          style={styles.rangeInput}
          aria-label="Niveau de clarté mentale"
        />
        <div style={styles.ratingDisplay}>
          Niveau de clarté mentale : {rating}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            ...styles.nextButton,
            ...(rating > 0 ? {} : styles.nextButtonDisabled),
          }}
          disabled={rating === 0}
          aria-disabled={rating === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question12;

// Styles Object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#f0f0f0", // Light text
  },
  card: {
    background: "#1e1e1e", // Dark gray background
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)", // Darker shadow
    padding: "30px",
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    color: "#f0f0f0",
    marginBottom: "20px",
    fontWeight: 600,
  },
  highlight: {
    color: "#0070f3", // Blue highlight
  },
  rangeInput: {
    width: "100%",
    marginBottom: "20px",
  },
  ratingDisplay: {
    fontSize: "16px",
    color: "#d0d0d0",
    marginBottom: "20px",
  },
  nextButton: {
    padding: "12px 30px",
    backgroundColor: "#0070f3", // Active blue
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(0, 112, 243, 0.5)", // Light shadow
    width: "80%",
    maxWidth: "500px",
  },
  nextButtonDisabled: {
    backgroundColor: "#555555", // Disabled gray
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
