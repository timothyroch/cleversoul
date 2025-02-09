"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (response: string) => void;
}

const Question15: React.FC<QuestionProps> = ({ onNext }) => {
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    if (response.trim()) {
      onNext(response.trim());
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          3. État spirituel et introspection
        </h2>
        <p style={styles.subtitle}>
          Ces questions touchent à ton lien avec toi-même, les autres, et peut-être une dimension spirituelle ou transcendante.
        </p>
        <h3 style={styles.question}>
          Quelle leçon ou quel apprentissage puis-je tirer de ma journée ?
        </h3>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Décrivez la leçon ou l'apprentissage que vous retirez de votre journée."
          style={styles.textarea}
          aria-label="Description de la leçon ou de l'apprentissage"
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

export default Question15;

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
    backgroundColor: "#2e2e2e", // Darker textarea background
    color: "#f0f0f0", // Light text
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.5)",
    resize: "none",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Ensures placeholder font matches text
  },
  nextButton: {
    padding: "12px 30px",
    backgroundColor: "#ffb347", // Active yellow color
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(255, 179, 71, 0.5)", // Light shadow
    width: "80%",
    maxWidth: "500px",
  },
  nextButtonDisabled: {
    backgroundColor: "#555555", // Dark gray for disabled state
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
