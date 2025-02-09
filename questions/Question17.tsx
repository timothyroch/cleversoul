"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (response: string) => void;
}

const Question17: React.FC<QuestionProps> = ({ onNext }) => {
  const [response, setResponse] = useState("");
  const [showTextarea, setShowTextarea] = useState<boolean | null>(null);

  const handleYesClick = () => {
    setShowTextarea(true);
    setResponse(""); // Reset response if switching from "No"
  };

  const handleNoClick = () => {
    setShowTextarea(false);
    setResponse("No"); // Set response as "No"
  };

  const handleSubmit = () => {
    if (response.trim() || showTextarea === false) {
      onNext(response.trim());
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>3. État spirituel et introspection</h2>
        <p style={styles.subtitle}>
          Ces questions touchent à ton lien avec toi-même, les autres, et peut-être une dimension spirituelle ou transcendante.
        </p>
        <h3 style={styles.question}>
          Ai-je nourri ma foi ou mes valeurs spirituelles ? <br /> Si oui, comment ?
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
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Décrivez comment vous avez nourri votre foi ou vos valeurs spirituelles."
            style={styles.textarea}
            aria-label="Description de votre foi ou valeurs spirituelles"
          />
        )}
        <button
          onClick={handleSubmit}
          style={{
            ...styles.nextButton,
            ...(response.trim() || showTextarea === false ? {} : styles.nextButtonDisabled),
          }}
          disabled={!response.trim() && showTextarea !== false}
          aria-disabled={!response.trim() && showTextarea !== false}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question17;

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
  subtitle: {
    fontSize: "16px",
    color: "#d0d0d0",
    marginBottom: "30px",
  },
  question: {
    fontSize: "18px",
    color: "#f0f0f0",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 30px",
    backgroundColor: "#555555",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow
  },
  buttonActive: {
    backgroundColor: "#ffb347",
    boxShadow: "0 2px 4px rgba(255, 179, 71, 0.5)", // Enhanced shadow for active state
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
    backgroundColor: "#2e2e2e", // Darker background for textarea
    color: "#f0f0f0", // Light text
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.5)",
    resize: "none",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  nextButton: {
    padding: "12px 30px",
    backgroundColor: "#ffb347",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(255, 179, 71, 0.5)",
    width: "80%",
    maxWidth: "500px",
  },
  nextButtonDisabled: {
    backgroundColor: "#555555",
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
