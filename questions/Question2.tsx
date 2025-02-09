"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (response: string) => void;
}

const Question2: React.FC<QuestionProps> = ({ onNext }) => {
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    if (response.trim()) {
      onNext(response.trim());
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Quelles émotions ont dominé ma journée ?</h2>
      <p style={styles.subtitle}>
        Écrivez une ou plusieurs émotions qui ont marqué votre journée.
      </p>
      <input
        type="text"
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Écrivez vos émotions dominantes"
        style={styles.inputField}
      />
      <button
        onClick={handleSubmit}
        style={{
          ...styles.button,
          ...(response.trim() ? {} : styles.buttonDisabled),
        }}
        disabled={!response.trim()}
        aria-disabled={!response.trim()}
      >
        Next
      </button>
    </div>
  );
};

export default Question2;

// Styles Object
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    background: "#1e1e1e", // Dark background
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)", // Darker shadow for depth
    padding: "30px",
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
    color: "#f0f0f0", // Light text color
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Consistent font
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center items horizontally
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
  inputField: {
    width: "80%", // Reduced width for better centering
    maxWidth: "500px", // Maximum width to prevent excessive stretching
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #444", // Darker border
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#2e2e2e", // Darker background for input
    color: "#f0f0f0", // Light text
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.5)",
    textAlign: "center", // Center text within the input
  },
  button: {
    padding: "12px 30px",
    backgroundColor: "#0070f3", // Updated to blue
    color: "#fff", // White text
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(0, 112, 243, 0.5)", // Darker shadow
    width: "80%", // Match input width
    maxWidth: "500px",
  },
  buttonDisabled: {
    backgroundColor: "#555555", // Dark gray for disabled state
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
