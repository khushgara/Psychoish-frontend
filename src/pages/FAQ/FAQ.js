import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is Psychoish?",
          a: "Psychoish is a comprehensive mental health assessment platform that provides evidence-based psychological assessments, personalized recommendations, and access to professional consultations.",
        },
        {
          q: "Is Psychoish free to use?",
          a: "Yes! Creating an account and taking assessments is completely free. Professional consultation services may have associated fees.",
        },
        {
          q: "How do I get started?",
          a: "Simply sign up for a free account, complete your profile, and start taking any of our 9 clinical assessments.",
        },
      ],
    },
    {
      category: "Assessments",
      questions: [
        {
          q: "What assessments are available?",
          a: "We offer 9 clinical assessments including Mood Assessment, Anxiety Assessment, Sleep Quality, OCD Symptoms (Y-BOCS), Suicide Risk (SBQ-R), Drug Abuse Screening (DAST-10), Phobia Questionnaire, and Psychological Well-Being scales.",
        },
        {
          q: "How long do assessments take?",
          a: "Most assessments take 5-15 minutes to complete, depending on the number of questions.",
        },
        {
          q: "Are the assessments scientifically valid?",
          a: "Yes, all our assessments are based on clinically validated tools used by mental health professionals worldwide.",
        },
        {
          q: "Can I retake an assessment?",
          a: "Absolutely! You can retake any assessment as many times as you'd like to track your progress over time.",
        },
      ],
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          q: "Is my data secure?",
          a: "Yes, we use industry-standard encryption to protect your data. All information is stored securely and never shared without your explicit consent.",
        },
        {
          q: "Who can see my assessment results?",
          a: "Only you can see your assessment results unless you choose to share them with a healthcare provider through our consultation booking system.",
        },
        {
          q: "Do you sell my data?",
          a: "Never. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
        },
      ],
    },
    {
      category: "Professional Support",
      questions: [
        {
          q: "Can I book a consultation with a therapist?",
          a: "Yes, you can book consultations with licensed mental health professionals through our platform.",
        },
        {
          q: "What if I'm in crisis?",
          a: "If you're experiencing a mental health crisis, please call 988 (Suicide & Crisis Lifeline) or visit your nearest emergency room. Our platform is not a substitute for emergency services.",
        },
        {
          q: "Are the therapists licensed?",
          a: "Yes, all mental health professionals on our platform are licensed and credentialed in their respective fields.",
        },
      ],
    },
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about Psychoish</p>
      </div>

      <div className="faq-container">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h2 className="category-title">{category.category}</h2>
            <div className="faq-list">
              {category.questions.map((faq, qIndex) => {
                const isOpen = openIndex === `${catIndex}-${qIndex}`;
                return (
                  <div key={qIndex} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggleFAQ(catIndex, qIndex)}
                    >
                      <span>{faq.q}</span>
                      <span className="faq-icon">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="faq-contact">
          <h2>Still have questions?</h2>
          <p>Can't find the answer you're looking for? Contact our support team.</p>
          <a href="/contact" className="contact-btn">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
