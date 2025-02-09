import React, { useEffect, useState } from "react";

interface CategoryIntroProps {
  onNext: () => void;
}

const CategoryIntro: React.FC<CategoryIntroProps> = ({ onNext }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("CategoryIntro mounted");
    setIsVisible(true);

    const displayDuration = 3000; // Display for 3 seconds
    const transitionDuration = 500; // 0.5 seconds for fade-out

    // Start fade-out after 3 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
      console.log("CategoryIntro fading out");
    }, displayDuration);

    // Call onNext after fade-out transition
    const proceedTimer = setTimeout(() => {
      console.log("CategoryIntro calling onNext");
      onNext();
    }, displayDuration + transitionDuration);

    // Cleanup timers
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(proceedTimer);
    };
  }, [onNext]);

  return (
    <div
      style={{
        ...styles.container,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div style={styles.card}>
        <h2 style={styles.title}>Santé mentale et bien-être</h2>
        <p style={styles.subtitle}>
          Cette section se concentre sur ton bien-être mental et émotionnel.
          Prends un moment pour réfléchir à ton état d'esprit, tes émotions,
          et comment elles influencent ta journée.
        </p>
      </div>
    </div>
  );
};

export default CategoryIntro;

// ... (styles remain unchanged)


// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#121212",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "#1e1e1e",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
    padding: "30px",
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
    color: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "28px",
    color: "#f0f0f0",
    marginBottom: "20px",
    fontWeight: 700,
  },
  subtitle: {
    fontSize: "18px",
    color: "#d0d0d0",
    marginBottom: "30px",
    lineHeight: "1.5",
  },
};
