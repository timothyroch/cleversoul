"use client";

import React, { useState } from 'react';
import Question1 from '../questions/Question1';
import Question2 from '../questions/Question2';
import Question3 from '@/questions/Question3';
import Question4 from '@/questions/Question4';
import Question5 from '@/questions/Question5';
import Question6 from '@/questions/Question6';
import Question7 from '@/questions/Question7';
import Question8 from '@/questions/Question8';
import Question9 from '@/questions/Question9';
import Question10 from '@/questions/Question10';
import Question11 from '@/questions/Question11';
import Question12 from '@/questions/Question12';
import Question13 from '@/questions/Question13';
import Question14 from '@/questions/Question14';
import Question15 from '@/questions/Question15';
import Question16 from '@/questions/Question16';
import Question17 from '@/questions/Question17';
import Question18 from '@/questions/Question18';
import Question19 from '@/questions/Question19';
import Question20 from '@/questions/Question20';
import Question21 from '@/questions/Question21';
import Question22 from '@/questions/Question22';
import Question23 from '@/questions/Question23';
import Question24 from '@/questions/Question24';
import Question25 from '@/questions/Question25';
import Question26 from '@/questions/Question26';
import Question27 from '@/questions/Question27';
import router, { useRouter } from 'next/router';
/*implementation of the ai*/
import { loadPuterScript } from '../utils/loadPuterScript';
import CategoryIntro from './components/CategoryIntro';
declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (prompt: string) => Promise<string>;
      };
    };
  }
}
const getSummaryAndRecommendations = async (responses: any) => {
  await loadPuterScript();

  if (!window.puter?.ai?.chat) {
    throw new Error('Puter.js is not loaded properly');
  }

  const prompt = `
    Voici les réponses d'un questionnaire basé sur l'état émotionnel et psychique :
    ${JSON.stringify(responses, null, 2)}

    1. Résume la journée de manière concise.
    2. Donne des recommandations pratiques basées sur les réponses ci-dessus, en tenant compte des émotions, des habitudes alimentaires, et de l'énergie.

    Fournis une réponse structurée :
    - Résumé de la journée :
    - Recommandations :
  `;

  try {
    const result = await window.puter.ai.chat(prompt);
    console.log('AI Response:', result);

    // Extract the relevant text (adjust based on response structure)
    const message = result || 'No summary available';
    return message;
  } catch (error) {
    console.error('Erreur lors de la communication avec l’IA :', error);
    throw new Error('Impossible de générer un résumé.');
  }
};






/*end of the ai implementation*/

const Questionary: React.FC = () => {
  const [responses, setResponses] = useState<{ [key: string]: any }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup
  const [isSaving, setIsSaving] = useState(false);   // Track save state


  /*ai implementation*/
  const [summary, setSummary] = useState<string | null>(null); // To store the AI-generated summary
const [loading, setLoading] = useState(false); // To track the loading state for the AI summary
  /*end of the ai implementation*/


  const handleNext = (questionKey: string, response: any, rating?: number) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionKey]: {
        response,
        ...(rating !== undefined && { rating }),
      },
    }));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  /*ai implementation*/
  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const aiSummary = await getSummaryAndRecommendations(responses);
      setSummary(aiSummary);
    } catch (error) {
      alert('Erreur lors de la génération du résumé.');
    } finally {
      setLoading(false);
    }
  };
  
  /*end of the ai implementation*/
  

 const saveResponses = async () => {
  setIsSaving(true);
  try {
    // Ensure summary is an object before accessing properties
   const content = summary;

    const currentDateTime = new Date().toISOString(); // Get the current date and time in ISO format

    const payload = {
      category: 'État émotionnel et psychique',
      questions: Object.entries(responses).map(([question, value]) => ({
        question,
        response: value.response,
        rating: value.rating !== undefined ? `${value.rating}/10` : undefined,
      })),
      summary: content
        ? {
            daySummary: content.match(/### Résumé de la journée :\n([\s\S]*?)\n\n### Recommandations :/)?.[1] || null,
            recommendations: content.match(/### Recommandations :\n([\s\S]*)/)?.[1] || null,
          }
        : null,
      timestamp: currentDateTime, // Add the current date and time
    };

    // Your API call or logic to save payload here...

  } catch (error) {
    console.error("Error saving responses:", error);
  } finally {
    setIsSaving(false);
  }
};


        console.log('Payload to API:', payload);

        const response = await fetch('/api/saveResponses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            setShowPopup(true); // Show the popup on success
        } else {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            alert('Erreur lors de la sauvegarde des réponses.');
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Une erreur réseau s\'est produite. Veuillez vérifier votre connexion.');
    } finally {
        setIsSaving(false);
    }
};


  const handleClosePopup = () => {
    setShowPopup(false);
    router.reload(); // Refresh the page
  };


  const handleRetakeQuiz = () => {
    setResponses({});
    setCurrentQuestionIndex(0);
    setSummary(null);
    setShowPopup(false);
    setIsSaving(false);
  };
  

  const questions = [
   <Question1 onNext={(response) => handleNext('Comment me suis-je senti(e) aujourd’hui ?', response.join(', '))}/>,
    <Question2 onNext={(response) => handleNext('Quelles émotions ont dominé ma journée ?', response)} />,
    <Question3 onNext={(response) => handleNext('Y a-t-il eu un moment où je me suis senti(e) submergé(e) ? Pourquoi ?', response)} />,
    <Question4 onNext={(response) => handleNext('Ai-je ressenti de l’anxiété ou de la tristesse aujourd’hui ?', response)} />,
    <Question5 onNext={(response) => handleNext('Ai-je ressenti de la gratitude ou de la joie ?', response)} />,
    <Question6 onNext={(response) => handleNext('Qu’est-ce qui m’a le plus perturbé(e) ou contrarié(e) aujourd’hui ?', response)} />,
    <Question7 onNext={(response) => handleNext('Ai-je eu des pensées négatives répétées aujourd’hui ?', response)} />,
    <Question8 onNext={(response) => handleNext('Ai-je pris du temps pour me recentrer ou méditer ?', response)} />,
    <Question9 onNext={(response, rating) => handleNext('Ai-je ressenti de la fatigue mentale ?', response, rating)} />,
    <Question10 onNext={(response) => handleNext('Ai-je ressenti une connexion ou une satisfaction dans mes interactions sociales ?', response)} />,
    <Question11 onNext={(response, rating) => handleNext('Ai-je accompli quelque chose aujourd’hui qui m’a rendu(e) fier(e) ou satisfait(e) ?', response, rating)} />,
    <Question12 onNext={(rating) => handleNext('Sur une échelle de 1 à 10, comment évaluerais-je ma clarté mentale aujourd’hui ?', rating)} />,
    <Question13 onNext={(response) => handleNext('Ai-je pris un moment pour réfléchir ou méditer sur ma journée ?', response)} />,
    <Question14 onNext={(response) => handleNext('Ai-je ressenti un lien avec quelque chose de plus grand que moi (la nature, la spiritualité, l’univers) ?', response)} />,
    <Question15 onNext={(response) => handleNext('Quelle leçon ou quel apprentissage puis-je tirer de ma journée ?', response)} />,
    <Question16 onNext={(response) => handleNext('Ai-je ressenti de la paix intérieure à un moment donné aujourd’hui ?', response)} />,
    <Question17 onNext={(response) => handleNext('Ai-je nourri ma foi ou mes valeurs spirituelles ? Si oui, comment ?', response)} />,
    <Question18 onNext={(response) => handleNext('Quelles trois choses ai-je appréciées aujourd’hui ?', response)} />,
    <Question19 onNext={(rating) => handleNext('Comment évaluerais-je mon niveau d’énergie aujourd’hui ?', rating)} />,
    <Question20 onNext={(response) => handleNext('Ai-je bien mangé et bu suffisamment d’eau ?', response)} />,
    <Question21 onNext={(response) => handleNext('Ai-je fait de l’exercice ou pris soin de mon corps d’une manière particulière ?', response)} />,
    <Question22 onNext={(response) => handleNext('Ai-je bien dormi hier soir ?', response)} />,
    <Question23 onNext={(response) => handleNext('Ai-je ressenti des tensions physiques ou des douleurs ?', response)} />,
    <Question24 onNext={(response) => handleNext('Ai-je avancé vers mes objectifs personnels aujourd’hui ?', response)} />,
    <Question25 onNext={(response) => handleNext('Y a-t-il une habitude que je veux améliorer ou développer ?', response)} />,
    <Question26 onNext={(response) => handleNext('Qu’est-ce que je ferais différemment si je pouvais recommencer cette journée ?', response)} />,
    <Question27 onNext={(response) => handleNext('Ai-je pris du temps pour moi-même et mes passions ?', response)} />,


  ];

  const renderPopup = () => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Prevent horizontal overflow
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          maxHeight: '90vh', // Constrain height to viewport
          overflowY: 'auto', // Enable vertical scrolling
        }}
      >
        <h2>Vos réponses</h2>
        <ul>
          {Object.entries(responses).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>
              {typeof value.response === 'object' ? (
                <>
                  <br />
                  <em>Alimentation:</em> {value.response.ateWell}
                  <br />
                  <em>Eau:</em> {value.response.waterIntake}
                </>
              ) : (
                value.response
              )}
              {value.rating !== undefined && (
                <>
                  <br />
                  <em>Rating:</em> {value.rating}/10
                </>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={saveResponses}
          disabled={isSaving}
          style={{
            padding: '10px 20px',
            backgroundColor: isSaving ? '#6c757d' : '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            marginTop: '20px',
          }}
        >
          {isSaving ? 'Sauvegarde en cours...' : 'Sauvegarder'}
        </button>
        <button
          onClick={() => setShowPopup(false)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
            marginLeft: '10px',
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  );


  const renderFriendlySummary = (
    summaryObject: any,
    title: string = "Résumé de votre journée"
  ) => {
    // 1. Extract the actual text string from summaryObject
    const content = summaryObject?.message?.content;

    // 2. If no content or it's not a string, return nothing
    if (!content || typeof content !== "string") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#f0f0f0", // Light text for dark theme
          }}
        >
          {currentQuestionIndex < questions.length ? (
            <>
              {questions[currentQuestionIndex]}
            </>
          ) : (
            <div
              style={{
                background: "#333", // Dark gray background for the final message
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
                padding: "40px",
                maxWidth: "700px",
                width: "100%",
                textAlign: "center",
                color: "#f0f0f0", // Light text for contrast
              }}
            >
              <h2 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "20px" }}>
                Merci d'avoir complété le questionnaire!
              </h2>
              <button
                onClick={handleGenerateSummary}
                style={{
                  padding: "14px 35px",
                  backgroundColor: loading ? "#555" : "#444", // Dark button color
                  color: "#f0f0f0", // Light text
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "18px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
                  marginTop: "20px",
                }}
                disabled={loading}
              >
                {loading ? "Génération en cours..." : "Générer un résumé"}
              </button>
            </div>
          )}
        </div>
      );
      
      
      
      
    }

    // 3. Adjust your regex to match "###" if that's what you have in the content
    const daySummary = content.match(
      /### Résumé de la journée :\n([\s\S]*?)\n\n### Recommandations :/
    )?.[1];

    const recommendations = content.match(
      /### Recommandations :\n([\s\S]*)/
    )?.[1];

    // 4. Create list items from the recommendations, if present
    const recommendationItems = recommendations
      ? recommendations
          .split('\n')
          .filter((line) => line.trim())
          .map((rec, idx) => <li key={idx}>{rec.trim()}</li>)
      : [];

    // 5. Render your UI
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
          background: "linear-gradient(135deg, #2c2c2c, #1e1e1e)", // Dark background gradient
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#f0f0f0", // Light text for readability
        }}
      >
        {currentQuestionIndex < questions.length ? (
          <>
            <div
              style={{
                background: "#333", // Dark background for the question container
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
                padding: "40px",
                maxWidth: "700px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "18px", color: "#f0f0f0" }}>
                {questions[currentQuestionIndex]}
              </p>
              <button
                onClick={() => setShowPopup(true)}
                style={{
                  padding: "12px 30px",
                  backgroundColor: "#444",
                  color: "#f0f0f0",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                  marginTop: "20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                }}
              >
                Voir toutes mes réponses
              </button>
            </div>
          </>
        ) : (
          <div
            style={{
              background: "#333",
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
              padding: "40px",
              maxWidth: "700px",
              width: "100%",
              textAlign: "center",
              color: "#f0f0f0",
            }}
          >
            <h2 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "20px" }}>
              Merci d'avoir complété le questionnaire!
            </h2>
            <button
              onClick={handleGenerateSummary}
              style={{
                padding: "14px 35px",
                backgroundColor: loading ? "#555" : "#444",
                color: "#f0f0f0",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "background-color 0.3s",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                marginTop: "20px",
              }}
              disabled={loading}
            >
              {loading ? "Génération en cours..." : "Générer un résumé"}
            </button>
          </div>
        )}
    
        <div
          style={{
            background: "#2c2c2c",
            borderRadius: "10px",
            padding: "30px",
            marginTop: "30px",
            width: "100%",
            maxWidth: "700px",
            color: "#f0f0f0",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h3 style={{ fontSize: "24px", color: "#ffffff" }}>{title}</h3>
          {daySummary && <p style={{ fontSize: "16px", color: "#dcdcdc" }}>{daySummary}</p>}
    
          {recommendationItems.length > 0 && (
            <div>
              <h4 style={{ fontSize: "20px", color: "#ffffff" }}>Recommandations</h4>
              <ul style={{ listStyleType: "disc", paddingLeft: "20px", color: "#dcdcdc" }}>
                {recommendationItems}
              </ul>
            </div>
          )}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={saveResponses}
              disabled={isSaving}
              style={{
                padding: "14px 35px",
                backgroundColor: isSaving ? "#555" : "#444",
                color: "#f0f0f0",
                border: "none",
                borderRadius: "10px",
                cursor: isSaving ? "not-allowed" : "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "background-color 0.3s",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                marginRight: "10px",
              }}
            >
              {isSaving ? "Sauvegarde en cours..." : "Sauvegarder"}
            </button>
            <button
              onClick={handleRetakeQuiz}
              style={{
                padding: "14px 35px",
                backgroundColor: "#444",
                color: "#f0f0f0",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "background-color 0.3s",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              Reprendre le questionnaire
            </button>
          </div>
        </div>
      </div>
    );
    
  };

  return (
    <>
      {showPopup && renderPopup()}
      {/* Pass the entire summary object into the function */}
      {renderFriendlySummary(summary)}
    </>
  );
};

export default Questionary;
