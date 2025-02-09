"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (response: string, rating: number) => void;
}

const AccomplishmentsQuestion: React.FC<QuestionProps> = ({ onNext }) => {
  const [response, setResponse] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [showTextarea, setShowTextarea] = useState<boolean | null>(null);

  const handleYesClick = () => {
    setShowTextarea(true);
    setResponse(""); // Reset response
    setRating(0); // Reset rating
  };

  const handleNoClick = () => {
    setShowTextarea(false);
    setResponse("No"); // Set response to "No"
    setRating(0); // Reset rating
  };

  const handleSubmit = () => {
    if (response.trim() || showTextarea === false) {
      onNext(response.trim(), rating);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Ai-je accompli quelque chose aujourd’hui qui m’a rendu(e) fier(e) ou satisfait(e) ?
        </h2>
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
              placeholder="Décrivez ce que vous avez accompli aujourd’hui qui vous a rendu(e) fier(e) ou satisfait(e)."
              style={styles.textarea}
              aria-label="Description des accomplissements"
            />
            <h3 style={styles.subtitle}>
              Évaluez votre satisfaction sur une échelle de 1 à 10 :
            </h3>
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value, 10))}
              style={styles.rangeInput}
              aria-label="Niveau de satisfaction"
            />
            <div style={styles.ratingDisplay}>
              Niveau de satisfaction : {rating}
            </div>
          </>
        )}
        <button
          onClick={handleSubmit}
          style={{
            ...styles.nextButton,
            ...(response.trim() && (showTextarea === false || rating > 0)
              ? {}
              : styles.nextButtonDisabled),
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

export default AccomplishmentsQuestion;

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
    color: "#f0f0f0",
  },
  card: {
    background: "#1e1e1e",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
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
    marginBottom: "15px",
    fontWeight: 600,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#555555",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  },
  buttonActive: {
    backgroundColor: "#0070f3",
    boxShadow: "0 2px 4px rgba(0, 112, 243, 0.5)",
  },
  textarea: {
    width: "80%",
    maxWidth: "500px",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #444444",
    borderRadius: "10px",
    fontSize: "16px",
    height: "120px",
    outline: "none",
    backgroundColor: "#2e2e2e",
    color: "#f0f0f0",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.5)",
    resize: "none",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  subtitle: {
    fontSize: "18px",
    color: "#d0d0d0",
    marginBottom: "10px",
  },
  rangeInput: {
    width: "100%",
    marginBottom: "20px",
  },
  ratingDisplay: {
    fontSize: "16px",
    color: "#f0f0f0",
    marginBottom: "20px",
  },
  nextButton: {
    padding: "12px 30px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(0, 112, 243, 0.5)",
    width: "80%",
    maxWidth: "500px",
  },
  nextButtonDisabled: {
    backgroundColor: "#555555",
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
