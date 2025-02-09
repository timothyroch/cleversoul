"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (response: string) => void;
}

const Question6: React.FC<QuestionProps> = ({ onNext }) => {
  const [response, setResponse] = useState<string>("");

  const handleSubmit = () => {
    if (response.trim()) {
      onNext(response.trim());
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Qu’est-ce qui m’a le plus perturbé(e) ou contrarié(e) aujourd’hui ?
        </h2>
        <p style={styles.subtitle}>
          Décrivez ce qui vous a perturbé(e) ou contrarié(e) aujourd’hui.
        </p>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Décrivez ce qui vous a perturbé(e) ou contrarié(e) aujourd’hui."
          style={styles.textarea}
          aria-label="Description des perturbations ou contrariétés"
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

export default Question6;

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
  },
  card: {
    background: "#1e1e1e", // Dark gray background to maintain the dark theme
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)", // Darker shadow for depth
    padding: "30px",
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
    color: "#f0f0f0", // Light text color for readability
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
  subtitle: {
    fontSize: "16px",
    color: "#d0d0d0", // Slightly lighter for hierarchy
    marginBottom: "20px",
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
