"use client";

import React, { useState } from "react";

interface QuestionProps {
  onNext: (response: string[]) => void;
}

const emotions = [
  "Admiratif/ve",
  "Amusé(e)",
  "Angoissé(e)",
  "Anxieux/se",
  "Apaisé(e)",
  "Attristé(e)",
  "Blessé(e)",
  "Coléreux/se",
  "Confus(e)",
  "Coupable",
  "Curieux/se",
  "Déçu(e)",
  "Désespéré(e)",
  "Déterminé(e)",
  "Écœuré(e)",
  "Embarrassé(e)",
  "Ennuyé(e)",
  "Enragé(e)",
  "Épuisé(e)",
  "Excité(e)",
  "Fier/ère",
  "Frustré(e)",
  "Heureux/se",
  "Honteux/se",
  "Impatient(e)",
  "Inspiré(e)",
  "Inquiet(e)",
  "Jaloux/se",
  "Joyeux/se",
  "Malheureux/se",
  "Méfiant(e)",
  "Motivé(e)",
  "Nerveux/se",
  "Optimiste",
  "Paniqué(e)",
  "Reconnaissant(e)",
  "Satisfait(e)",
  "Solitaire",
  "Stressé(e)",
  "Surpris(e)",
  "Triste",
  "Vulnérable",
  "Zen",
];

const Question1: React.FC<QuestionProps> = ({ onNext }) => {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Comment me suis-je senti(e) aujourd’hui ?</h2>
      <p style={styles.subtitle}>
        Sélectionnez toutes les émotions qui correspondent à votre journée.
      </p>
      <div style={styles.emotionsGrid}>
        {emotions.map((emotion) => (
          <label
            key={emotion}
            style={{
              ...styles.emotionLabel,
              ...(selectedEmotions.includes(emotion)
                ? styles.emotionSelected
                : styles.emotionUnselected),
              ...(hoveredEmotion === emotion &&
              !selectedEmotions.includes(emotion)
                ? styles.emotionHover
                : {}),
            }}
            onMouseEnter={() => setHoveredEmotion(emotion)}
            onMouseLeave={() => setHoveredEmotion(null)}
          >
            <input
              type="checkbox"
              value={emotion}
              checked={selectedEmotions.includes(emotion)}
              onChange={() => toggleEmotion(emotion)}
              style={styles.checkbox}
              aria-label={emotion}
            />
            {emotion}
          </label>
        ))}
      </div>
      <button
        onClick={() => onNext(selectedEmotions)}
        style={{
          ...styles.nextButton,
          ...(selectedEmotions.length === 0 ? styles.nextButtonDisabled : {}),
        }}
        disabled={selectedEmotions.length === 0}
        aria-disabled={selectedEmotions.length === 0}
      >
        Next
      </button>
    </div>
  );
};

export default Question1;

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
    color: "#f0f0f0", // Light text color for readability
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Consistent font
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
  emotionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "15px",
    margin: "20px 0",
  },
  emotionLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "10px",
    padding: "10px 15px",
    border: "1px solid #444", // Darker border
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s",
    userSelect: "none",
    backgroundColor: "#2e2e2e", // Darker background for unselected
    color: "#f0f0f0", // Light text
  },
  emotionSelected: {
    backgroundColor: "#0070f3", // Primary blue
    color: "#fff", // White text on blue
    borderColor: "#0070f3",
    boxShadow: "0 2px 4px rgba(0, 112, 243, 0.5)", // Subtle shadow
  },
  emotionUnselected: {
    backgroundColor: "#2e2e2e", // Darker background
    color: "#f0f0f0", // Light text
  },
  emotionHover: {
    backgroundColor: "#3e3e3e", // Slightly lighter on hover
    color: "#ffffff", // Ensure text remains readable
  },
  checkbox: {
    accentColor: "#0070f3", // Primary blue
    width: "16px",
    height: "16px",
    cursor: "pointer",
    // Ensuring checkbox visibility on dark background
    backgroundColor: "#fff",
    border: "1px solid #ccc",
  },
  nextButton: {
    padding: "12px 30px",
    backgroundColor: "#0070f3", // Primary blue
    color: "#fff", // White text
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(0, 112, 243, 0.5)", // Darker shadow
  },
  nextButtonDisabled: {
    backgroundColor: "#555555", // Dark gray for disabled state
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
