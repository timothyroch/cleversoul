"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (response: { ateWell: string; waterIntake: string }) => void;
}

const Question20: React.FC<QuestionProps> = ({ onNext }) => {
  const [ateWell, setAteWell] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const isComplete = ateWell.trim() !== "" && waterIntake.trim() !== "";

  const handleSubmit = () => {
    if (isComplete) {
      onNext({ ateWell, waterIntake });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>4. État physique et énergie</h2>
        <p style={styles.subtitle}>
          Pour comprendre l’influence de ta santé physique sur ton mental et ton esprit.
        </p>
        <h3 style={styles.question}>
          Ai-je bien mangé et bu suffisamment d’eau ?
        </h3>
        <input
          type="text"
          placeholder="Comment évaluez-vous votre alimentation aujourd’hui ?"
          value={ateWell}
          onChange={(e) => setAteWell(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Comment évaluez-vous votre consommation d’eau aujourd’hui ?"
          value={waterIntake}
          onChange={(e) => setWaterIntake(e.target.value)}
          style={styles.input}
        />
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

export default Question20;

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
    marginBottom: "20px",
    border: "1px solid #444444",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#2e2e2e", // Darker input background
    color: "#f0f0f0", // Light text
    boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.5)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Placeholder font consistency
  },
  nextButton: {
    padding: "12px 30px",
    backgroundColor: "#7f7fd5", // Purple gradient start color
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(127, 127, 213, 0.5)", // Slight shadow
    width: "80%",
    maxWidth: "500px",
  },
  nextButtonDisabled: {
    backgroundColor: "#555555", // Dark gray for disabled state
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
