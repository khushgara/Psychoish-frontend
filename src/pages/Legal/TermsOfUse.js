import React from "react";
import { Link } from "react-router-dom";
import "./Legal.css";

const TermsOfUse = () => {
  const lastUpdated = "May 30, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: [
        {
          subtitle: "Agreement",
          text: "By accessing or using Psychoish (\"Platform\"), you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use the Platform.",
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 13 years of age to use Psychoish. If you are under 18, you represent that a parent or guardian has reviewed and consented to these Terms on your behalf.",
        },
        {
          subtitle: "Account Responsibility",
          text: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately at support@psychoish.com if you suspect unauthorized access to your account.",
        },
      ],
    },
    {
      id: "not-medical-advice",
      title: "Not a Medical Service",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      content: [
        {
          subtitle: "Informational Purpose Only",
          text: "Psychoish provides self-assessment tools and educational content for informational purposes only. The Platform does not provide medical diagnoses, clinical therapy, or emergency mental health services.",
        },
        {
          subtitle: "Not a Substitute for Professional Care",
          text: "Assessment results are NOT a substitute for evaluation, diagnosis, or treatment by a qualified mental health professional or physician. Always seek the advice of a licensed professional with any questions you may have.",
        },
        {
          subtitle: "Emergency Situations",
          text: "If you or someone you know is in immediate danger or experiencing a psychiatric emergency, call 911 or the 988 Suicide & Crisis Lifeline immediately. Do not rely on this platform in emergencies.",
        },
      ],
    },
    {
      id: "permitted-use",
      title: "Permitted Use",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      content: [
        {
          subtitle: "Authorized Uses",
          text: "You may use Psychoish for personal, non-commercial purposes to complete mental health assessments, track your wellness journey, read educational content, and book consultations with licensed professionals.",
        },
        {
          subtitle: "Prohibited Activities",
          text: "You agree not to: (a) use the Platform for any unlawful purpose; (b) attempt to gain unauthorized access to any system or account; (c) reproduce, resell, or distribute any content without written permission; (d) impersonate any person or entity; (e) upload harmful, misleading, or abusive content.",
        },
        {
          subtitle: "Account Sharing",
          text: "Your account is for individual use only. Sharing access credentials with others or creating accounts on behalf of others is not permitted.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: [
        {
          subtitle: "Our Content",
          text: "All content on Psychoish — including text, assessments, graphics, logos, and software — is the property of Psychoish or its licensors and is protected by copyright and intellectual property laws.",
        },
        {
          subtitle: "Your Content",
          text: "Any content you submit to the Platform (e.g., profile information) remains yours. By submitting it, you grant Psychoish a limited license to use it solely to operate and improve the Platform.",
        },
        {
          subtitle: "Clinical Tools",
          text: "Some assessment tools (e.g., PHQ-9, GAD-7, Y-BOCS) are based on publicly validated clinical instruments. We respect all original authors and their licensing requirements.",
        },
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers & Limitation of Liability",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: [
        {
          subtitle: "As-Is Basis",
          text: 'The Platform is provided "as is" without any warranty, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.',
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the fullest extent permitted by law, Psychoish shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — the Platform.",
        },
        {
          subtitle: "Third-Party Links",
          text: "The Platform may contain links to third-party websites. We have no control over their content and accept no responsibility for any loss or damage that may arise from your use of them.",
        },
      ],
    },
    {
      id: "termination",
      title: "Termination",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      content: [
        {
          subtitle: "By You",
          text: "You may terminate your account at any time by contacting support@psychoish.com. Termination does not affect any provisions of these Terms that, by their nature, should survive termination.",
        },
        {
          subtitle: "By Us",
          text: "We reserve the right to suspend or terminate your access to the Platform at our discretion if you violate these Terms, without prior notice and without liability.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to These Terms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      content: [
        {
          subtitle: "Notification",
          text: "We may update these Terms from time to time. Material changes will be communicated via email or a prominent notice on the Platform at least 14 days before taking effect.",
        },
        {
          subtitle: "Continued Use",
          text: "Your continued use of the Platform after the effective date of any changes constitutes your acceptance of the revised Terms.",
        },
      ],
    },
  ];

  return (
    <div className="legal-page">
      {/* Hero */}
      <div className="legal-hero legal-hero--terms">
        <div className="legal-hero-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1>Terms of Use</h1>
        <p>Please read these terms carefully before using Psychoish.</p>
        <div className="legal-meta">Last updated: {lastUpdated}</div>
      </div>

      <div className="legal-layout">
        {/* Sidebar TOC */}
        <aside className="legal-toc">
          <div className="toc-card">
            <h3>Contents</h3>
            <nav>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="toc-link">
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="toc-contact">
              <p>Legal questions?</p>
              <a href="mailto:support@psychoish.com" className="toc-email-link">
                support@psychoish.com
              </a>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="legal-content">
          <div className="legal-intro">
            <p>
              These Terms of Use govern your access to and use of <strong>Psychoish</strong>, including any
              related applications, content, and services. By creating an account or using the Platform, you
              confirm that you have read, understood, and agree to be bound by these Terms.
            </p>
          </div>

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="legal-section">
              <div className="legal-section-header">
                <div className="legal-section-icon">{section.icon}</div>
                <h2>{section.title}</h2>
              </div>
              {section.content.map((item, i) => (
                <div key={i} className="legal-subsection">
                  <h3>{item.subtitle}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </section>
          ))}

          {/* Not Medical Advice banner */}
          <div className="legal-warning-banner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <strong>Important Reminder</strong>
              <p>Psychoish is not a medical provider. If you are in crisis, call <strong>988</strong> (Suicide &amp; Crisis Lifeline) or go to your nearest emergency room immediately.</p>
            </div>
          </div>

          <div className="legal-cta">
            <h2>Questions about our Terms?</h2>
            <p>We believe in plain-language policies. If anything is unclear, please reach out.</p>
            <div className="legal-cta-buttons">
              <a href="mailto:support@psychoish.com" className="legal-btn-primary">
                Contact Support
              </a>
              <Link to="/privacy" className="legal-btn-secondary">
                Privacy Policy
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsOfUse;
