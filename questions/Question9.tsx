// components/Question9.tsx
"use client";

import React, { useState } from 'react';

interface QuestionProps {
  onNext: (response: string, rating: number) => void;
}

const Question9: React.FC<QuestionProps> = ({ onNext }) => {
  const [response, setResponse] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
const [showTextarea, setShowTextarea] = useState<boolean>(false);


  const handleYesClick = () => {
    setShowTextarea(true);
    setResponse(""); // Reset response if switching from "No"
    setRating(0); // Reset rating
  };

  const handleNoClick = () => {
    setShowTextarea(false);
    setResponse("No"); // Set response as "No"
    setRating(0); // Reset rating
  };

  const handleSubmit = () => {
    if (response.trim() && (showTextarea === false || rating > 0)) {
      onNext(response.trim(), rating);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Ai-je ressenti de la fatigue mentale ? <span style={styles.highlight}>Pourquoi ?</span>
        </h2>
        <p style={styles.subtitle}>
          Ces questions évaluent ton énergie mentale et ta clarté d’esprit.
        </p>
        <h3 style={styles.question}>
          Ai-je ressenti de la fatigue mentale ?
        </h3>
        <div style={styles.buttonGroup}>
          <button
            onClick={handleYesClick}
            style={{
              ...styles.button,
              ...(showTextarea === true ? styles.buttonActive : {}),
            }}
            aria-pressed={showTextarea === true}
          >
            Oui
          </button>
          <button
            onClick={handleNoClick}
            style={{
              ...styles.button,
              ...(showTextarea === false ? styles.buttonActive : {}),
            }}
            aria-pressed={showTextarea === false}
          >
            Non
          </button>
        </div>
        {showTextarea && (
          <>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Décrivez si vous avez ressenti de la fatigue mentale aujourd’hui et précisez le moment."
              style={styles.textarea}
              aria-label="Description de la fatigue mentale ressentie"
            />
            <h3 style={styles.rangeTitle}>
              Évaluez votre fatigue mentale sur une échelle de 1 à 10 :
            </h3>
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value, 10))}
              style={styles.rangeInput}
              aria-label="Échelle de fatigue mentale de 1 à 10"
            />
            <div style={styles.rangeLabel}>
              Niveau de fatigue mentale : {rating}
            </div>
          </>
        )}
        <button
          onClick={handleSubmit}
          style={{
            ...styles.nextButton,
            ...(response.trim() && (showTextarea === false || rating > 0) ? {} : styles.nextButtonDisabled),
          }}
          disabled={!response.trim() || (showTextarea && rating === 0)}
          aria-disabled={!response.trim() || (showTextarea && rating === 0)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question9;

// Styles Object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Consistent font family
    color: "#f0f0f0", // Light text color for readability
  },
  card: {
    background: "#1e1e1e", // Dark gray background to maintain the dark theme
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)", // Darker shadow for depth
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
    color: "#f0f0f0", // Light text
    marginBottom: "15px",
    fontWeight: 600,
  },
  highlight: {
    color: "#0070f3", // Blue color to highlight "Pourquoi ?"
  },
  subtitle: {
    fontSize: "16px",
    color: "#d0d0d0", // Slightly lighter for hierarchy
    marginBottom: "20px",
  },
  question: {
    fontSize: "18px",
    color: "#f0f0f0", // Light text
    marginBottom: "15px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#555555", // Default inactive color
    color: "#fff", // White text
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow
  },
  buttonActive: {
    backgroundColor: "#0070f3", // Active blue color
    boxShadow: "0 2px 4px rgba(0, 112, 243, 0.5)", // Enhanced shadow for active state
  },
  textarea: {
    width: "80%",
    maxWidth: "500px",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #444444", // Darker border
    borderRadius: "10px",
    fontSize: "16px",
    height: "120px",
    outline: "none",
    backgroundColor: "#2e2e2e", // Darker background for textarea
    color: "#f0f0f0", // Light text
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.5)",
    resize: "none", // Disable resizing for consistency
    textAlign: "center", // Center text within textarea
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Ensures placeholder has a nice font-family
  },
  rangeTitle: {
    fontSize: "18px",
    color: "#f0f0f0", // Light text
    marginBottom: "10px",
  },
  rangeInput: {
    width: "80%",
    maxWidth: "500px",
    marginBottom: "20px",
    cursor: "pointer",
  },
  rangeLabel: {
    fontSize: "16px",
    color: "#d0d0d0", // Slightly lighter
    marginBottom: "20px",
  },
  nextButton: {
    padding: "12px 30px",
    backgroundColor: "#0070f3", // Blue color for consistency
    color: "#fff", // White text
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(0, 112, 243, 0.5)", // Darker shadow
    width: "80%",
    maxWidth: "500px",
  },
  nextButtonDisabled: {
    backgroundColor: "#555555", // Dark gray for disabled state
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
