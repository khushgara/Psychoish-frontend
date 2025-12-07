import React from "react";
import "./Therapies.css";

const Therapies = () => {
  const therapies = [
    {
      name: "Cognitive Behavioral Therapy (CBT)",
      icon: "🧠",
      description: "Evidence-based approach focusing on changing negative thought patterns and behaviors",
      benefits: ["Treats anxiety and depression", "Practical coping strategies", "Short-term focused"],
      bestFor: "Anxiety, depression, phobias, OCD",
    },
    {
      name: "Dialectical Behavior Therapy (DBT)",
      icon: "⚖️",
      description: "Combines cognitive-behavioral techniques with mindfulness practices",
      benefits: ["Emotional regulation", "Distress tolerance", "Interpersonal effectiveness"],
      bestFor: "Borderline personality disorder, emotional dysregulation",
    },
    {
      name: "Psychodynamic Therapy",
      icon: "🔍",
      description: "Explores unconscious patterns and past experiences affecting current behavior",
      benefits: ["Deep self-understanding", "Resolves past trauma", "Long-term change"],
      bestFor: "Relationship issues, chronic depression, personality disorders",
    },
    {
      name: "Mindfulness-Based Therapy",
      icon: "🧘",
      description: "Incorporates meditation and mindfulness to increase present-moment awareness",
      benefits: ["Stress reduction", "Improved focus", "Emotional balance"],
      bestFor: "Stress, anxiety, chronic pain, depression relapse prevention",
    },
    {
      name: "EMDR Therapy",
      icon: "👁️",
      description: "Eye Movement Desensitization and Reprocessing for trauma treatment",
      benefits: ["Processes traumatic memories", "Reduces PTSD symptoms", "Relatively quick results"],
      bestFor: "PTSD, trauma, phobias, panic disorders",
    },
    {
      name: "Acceptance and Commitment Therapy (ACT)",
      icon: "🎯",
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
