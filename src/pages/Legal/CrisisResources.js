import React from "react";
import { Link } from "react-router-dom";
import "./Legal.css";

const CrisisResources = () => {
  const hotlines = [
    {
      name: "988 Suicide & Crisis Lifeline",
      number: "988",
      description: "Call or text 988 to reach a trained crisis counselor 24/7. Free, confidential support for people in suicidal crisis or mental health distress.",
      available: "24/7 · Free · Confidential",
      color: "#8b5cf6",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.194-4.176-7-7l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Text HOME to 741741 to connect with a trained Crisis Counselor. Available in the US, UK, Ireland, and Canada.",
      available: "24/7 · Free · Text-based",
      color: "#3b82f6",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      ),
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Free, confidential treatment referral and information service for individuals and families facing mental health and/or substance use disorders.",
      available: "24/7 · Free · English & Spanish",
      color: "#10b981",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
        </svg>
      ),
    },
    {
      name: "National Domestic Violence Hotline",
      number: "1-800-799-7233",
      description: "Provides essential tools and support to help survivors of domestic violence live their lives free of abuse. Chat option available at thehotline.org.",
      available: "24/7 · Free · Multilingual",
      color: "#ec4899",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      name: "Veterans Crisis Line",
      number: "988, then press 1",
      description: "Connects veterans and their families in crisis with qualified VA responders. Also available via text (838255) and online chat.",
      available: "24/7 · Free · Veterans & families",
      color: "#f59e0b",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      name: "Trevor Project (LGBTQ+ Youth)",
      number: "1-866-488-7386",
      description: "Crisis intervention and suicide prevention for LGBTQ+ young people under 25. Also available via TrevorChat and TrevorText (text START to 678-678).",
      available: "24/7 · Free · LGBTQ+ youth",
      color: "#6366f1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
  ];

  const onlineResources = [
    {
      name: "National Alliance on Mental Illness (NAMI)",
      url: "https://www.nami.org",
      description: "America's largest grassroots mental health organization offering education, support groups, and advocacy.",
      category: "Education & Support",
      color: "#8b5cf6",
    },
    {
      name: "MentalHealth.gov",
      url: "https://www.mentalhealth.gov",
      description: "Official U.S. government resource for mental health information, treatment locators, and public education.",
      category: "Government Resource",
      color: "#3b82f6",
    },
    {
      name: "Psychology Today Therapist Finder",
      url: "https://www.psychologytoday.com/us/therapists",
      description: "Find licensed therapists, psychiatrists, and counselors in your area by specialty and insurance.",
      category: "Find a Therapist",
      color: "#10b981",
    },
    {
      name: "Open Path Collective",
      url: "https://openpathcollective.org",
      description: "Affordable in-person and online therapy sessions ($30–$80) for individuals, couples, and children.",
      category: "Affordable Therapy",
      color: "#f59e0b",
    },
    {
      name: "7 Cups",
      url: "https://www.7cups.com",
      description: "Free emotional support from trained listeners. Also offers online therapy for those who need more.",
      category: "Peer Support",
      color: "#ec4899",
    },
    {
      name: "Headspace (Free for those in need)",
      url: "https://www.headspace.com",
      description: "Guided meditation and mindfulness. Offers free access for unemployed individuals and healthcare workers.",
      category: "Mindfulness",
      color: "#f97316",
    },
  ];

  const selfCareSteps = [
    {
      title: "Reach Out",
      description: "Call or text a crisis line, or contact a trusted person. You don't have to face this alone.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.194-4.176-7-7l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      title: "Create Distance",
      description: "If you have access to means of harm, put physical distance between yourself and them.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      ),
    },
    {
      title: "Stay Present",
      description: "Focus on your breathing. Take slow, deep breaths. Ground yourself in the present moment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      title: "Seek Professional Help",
      description: "If safe to do so, go to a hospital, urgent care, or book an appointment with a mental health professional.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="legal-page">
      {/* Emergency Banner */}
      <div className="crisis-emergency-banner">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>
          <strong>In immediate danger?</strong> Call <strong>911</strong> or the <strong>988 Suicide &amp; Crisis Lifeline</strong> (call or text <strong>988</strong>) right now.
        </span>
      </div>

      {/* Hero */}
      <div className="legal-hero legal-hero--crisis">
        <div className="legal-hero-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h1>Crisis Resources</h1>
        <p>You are not alone. Help is available — right now, for free.</p>
      </div>

      <div className="crisis-page-content">

        {/* Immediate steps */}
        <section className="crisis-section">
          <h2 className="crisis-section-title">If You're in Crisis Right Now</h2>
          <p className="crisis-section-subtitle">These steps can help you stay safe in a moment of crisis.</p>
          <div className="crisis-steps-grid">
            {selfCareSteps.map((step, i) => (
              <div key={i} className="crisis-step-card">
                <div className="crisis-step-number">{i + 1}</div>
                <div className="crisis-step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hotlines */}
        <section className="crisis-section">
          <h2 className="crisis-section-title">Crisis Hotlines</h2>
          <p className="crisis-section-subtitle">Free, confidential support available around the clock.</p>
          <div className="crisis-hotlines-grid">
            {hotlines.map((line, i) => (
              <div key={i} className="crisis-hotline-card" style={{ borderColor: line.color + "44" }}>
                <div className="crisis-hotline-icon" style={{ color: line.color, background: line.color + "18" }}>
                  {line.icon}
                </div>
                <div className="crisis-hotline-info">
                  <h3>{line.name}</h3>
                  <div className="crisis-hotline-number" style={{ color: line.color }}>
                    {line.number}
                  </div>
                  <p>{line.description}</p>
                  <div className="crisis-hotline-badge" style={{ borderColor: line.color + "55", color: line.color }}>
                    {line.available}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Online Resources */}
        <section className="crisis-section">
          <h2 className="crisis-section-title">Online Resources & Tools</h2>
          <p className="crisis-section-subtitle">Trusted organizations offering education, therapy, and support.</p>
          <div className="crisis-resources-grid">
            {onlineResources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="crisis-resource-card"
                style={{ borderColor: res.color + "33" }}
              >
                <div className="crisis-resource-category" style={{ color: res.color, background: res.color + "18" }}>
                  {res.category}
                </div>
                <h3>{res.name}</h3>
                <p>{res.description}</p>
                <div className="crisis-resource-arrow" style={{ color: res.color }}>
                  Visit Site →
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="crisis-disclaimer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>
            Psychoish is not an emergency service. The assessments and tools on this platform are for informational
            purposes only and do not replace professional clinical care. If you are experiencing a psychiatric emergency,
            please contact emergency services or go to your nearest hospital immediately.
          </p>
        </div>

        {/* CTA */}
        <div className="legal-cta">
          <h2>You've taken a brave step</h2>
          <p>Seeking help is a sign of strength. Explore our assessments or book a consultation with a professional today.</p>
          <div className="legal-cta-buttons">
            <Link to="/dashboard" className="legal-btn-primary">
              Take an Assessment
            </Link>
            <Link to="/consultation" className="legal-btn-secondary">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisResources;
