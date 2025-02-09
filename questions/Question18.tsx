"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (response: string) => void;
}

const Question18: React.FC<QuestionProps> = ({ onNext }) => {
  const [responses, setResponses] = useState<string[]>(['', '', '']);

  const handleChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const isComplete = responses.every((response) => response.trim() !== '');

  const formatResponse = () => {
    return responses.map((response, index) => `${index + 1}) ${response}`).join('\n');
  };

  const handleSubmit = () => {
    if (isComplete) {
      onNext(formatResponse());
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>3. État spirituel et introspection</h2>
        <p style={styles.subtitle}>
          Ces questions touchent à ton lien avec toi-même, les autres, et peut-être une dimension spirituelle ou transcendante.
        </p>
        <h3 style={styles.question}>Quelles trois choses ai-je appréciées aujourd’hui ?</h3>
        {responses.map((response, index) => (
          <input
            key={index}
            type="text"
            value={response}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Chose ${index + 1}`}
            style={styles.input}
            aria-label={`Chose ${index + 1}`}
          />
        ))}
        <button
          onClick={handleSubmit}
          style={{
            ...styles.nextButton,
            ...(isComplete ? {} : styles.nextButtonDisabled),
          }}
          disabled={!isComplete}
          aria-disabled={!isComplete}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question18;

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
  input: {
    width: "80%",
    maxWidth: "500px",
    padding: "15px",
    marginBottom: "15px",
    border: "1px solid #444444", // Darker border
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#2e2e2e", // Darker background
    color: "#f0f0f0", // Light text
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.5)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  nextButton: {
    padding: "12px 30px",
    backgroundColor: "#ffb347", // Orange color for the button
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(255, 179, 71, 0.5)", // Slight shadow
    width: "80%",
    maxWidth: "500px",
  },
  nextButtonDisabled: {
    backgroundColor: "#555555", // Dark gray for disabled state
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
