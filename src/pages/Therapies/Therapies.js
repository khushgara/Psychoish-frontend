import React from "react";
import "./Therapies.css";

const Therapies = () => {
  const therapies = [
    {
      name: "Cognitive Behavioral Therapy (CBT)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '60px', height: '60px', color: '#ff79c6'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.75a6 6 0 0 0 6-6c0-3.314-2.686-6-6-6s-6 2.686-6 6a6 6 0 0 0 6 6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.75v12m-6-6h12" />
        </svg>
      ),
      description: "Evidence-based approach focusing on changing negative thought patterns and behaviors",
      benefits: ["Treats anxiety and depression", "Practical coping strategies", "Short-term focused"],
      bestFor: "Anxiety, depression, phobias, OCD",
    },
    {
      name: "Dialectical Behavior Therapy (DBT)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '60px', height: '60px', color: '#ffb86c'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v18M3 8.25h18M6 8.25l2.25 6h7.5L18 8.25" />
        </svg>
      ),
      description: "Combines cognitive-behavioral techniques with mindfulness practices",
      benefits: ["Emotional regulation", "Distress tolerance", "Interpersonal effectiveness"],
      bestFor: "Borderline personality disorder, emotional dysregulation",
    },
    {
      name: "Psychodynamic Therapy",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '60px', height: '60px', color: '#8be9fd'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
        </svg>
      ),
      description: "Explores unconscious patterns and past experiences affecting current behavior",
      benefits: ["Deep self-understanding", "Resolves past trauma", "Long-term change"],
      bestFor: "Relationship issues, chronic depression, personality disorders",
    },
    {
      name: "Mindfulness-Based Therapy",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '60px', height: '60px', color: '#50fa7b'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v18m-9-9h18m-9-6a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
        </svg>
      ),
      description: "Incorporates meditation and mindfulness to increase present-moment awareness",
      benefits: ["Stress reduction", "Improved focus", "Emotional balance"],
      bestFor: "Stress, anxiety, chronic pain, depression relapse prevention",
    },
    {
      name: "EMDR Therapy",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '60px', height: '60px', color: '#bd93f9'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
      description: "Eye Movement Desensitization and Reprocessing for trauma treatment",
      benefits: ["Processes traumatic memories", "Reduces PTSD symptoms", "Relatively quick results"],
      bestFor: "PTSD, trauma, phobias, panic disorders",
    },
    {
      name: "Acceptance and Commitment Therapy (ACT)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '60px', height: '60px', color: '#ff5555'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v18m-9-9h18M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
        </svg>
      ),
      description: "Focuses on accepting difficult emotions while committing to value-based actions",
      benefits: ["Psychological flexibility", "Values clarification", "Mindful action"],
      bestFor: "Chronic pain, anxiety, depression, substance abuse",
    },
  ];

  return (
    <div className="therapies-page">
      <div className="therapies-hero">
        <h1>Therapy Approaches</h1>
        <p>Explore evidence-based therapeutic methods to support your mental wellness</p>
      </div>

      <div className="therapies-container">
        <div className="therapies-grid">
          {therapies.map((therapy, index) => (
            <div key={index} className="therapy-card">
              <div className="therapy-icon">{therapy.icon}</div>
              <h2>{therapy.name}</h2>
              <p className="therapy-description">{therapy.description}</p>
              
              <div className="therapy-section">
                <h3>Benefits:</h3>
                <ul>
                  {therapy.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="therapy-section">
                <h3>Best For:</h3>
                <p className="best-for">{therapy.bestFor}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="consultation-cta">
          <h2>Not Sure Which Therapy is Right for You?</h2>
          <p>Book a consultation with our licensed professionals to find the best approach</p>
          <a href="/consultation" className="cta-button">
            Book Consultation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Therapies;
