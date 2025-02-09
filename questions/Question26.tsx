"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (response: string) => void;
}

const Question26: React.FC<QuestionProps> = ({ onNext }) => {
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    if (response.trim()) {
      onNext(response.trim());
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>5. Objectifs et progression personnelle</h2>
        <p style={styles.subtitle}>
          Pour suivre tes progrès et garder une trace de tes aspirations.
        </p>
        <h3 style={styles.question}>
          Qu’est-ce que je ferais différemment si je pouvais recommencer cette
          journée ?
        </h3>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Décrivez ce que vous feriez différemment si vous pouviez recommencer la journée."
          style={styles.textarea}
          aria-label="Réflexion sur ce que vous feriez différemment"
        />
        <button
          onClick={handleSubmit}
          style={{
            ...styles.nextButton,
            ...(response.trim() ? {} : styles.nextButtonDisabled),
          }}
          disabled={!response.trim()}
          aria-disabled={!response.trim()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question26;

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
    background: "#1e1e1e", // Dark gray
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)", // Stronger shadow
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
    color: "#ff5e62", // Accent color
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  nextButton: {
    padding: "12px 30px",
    backgroundColor: "#ff5e62", // Accent color
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(255, 94, 98, 0.5)", // Slight shadow
    width: "80%",
    maxWidth: "500px",
  },
  nextButtonDisabled: {
    backgroundColor: "#555555", // Disabled color
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
