import React from "react";
import { Link } from "react-router-dom";
import "./Legal.css";

const PrivacyPolicy = () => {
  const lastUpdated = "May 30, 2025";

  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: [
        {
          subtitle: "Personal Information",
          text: "When you register for an account, we collect your name, email address, and optionally your date of birth, gender, phone number, and a brief bio. This information is used solely to personalize your experience and facilitate consultations.",
        },
        {
          subtitle: "Assessment Data",
          text: "We collect your responses to mental health assessments, including your scores and interpretation results. This data is encrypted and stored securely. It is never shared with third parties without your explicit, written consent.",
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect certain technical information when you use our service, including your IP address, browser type, and pages visited. This data is used in aggregate form to improve our platform and is not linked to your personal identity.",
        },
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your personal information to create and manage your account, deliver assessment results, and provide personalized mental wellness recommendations.",
        },
        {
          subtitle: "Communication",
          text: "We may contact you via email to send important updates about your account, security notifications, and — if you opt in — our mental wellness newsletter. You can unsubscribe from marketing communications at any time.",
        },
        {
          subtitle: "Platform Improvement",
          text: "Anonymized, aggregated usage data helps us understand how the platform is used and where we can improve the experience. No personally identifiable information is used for this purpose.",
        },
        {
          subtitle: "Legal Compliance",
          text: "We may use your information to comply with applicable laws and regulations, respond to legal requests, and enforce our Terms of Use.",
        },
      ],
    },
    {
      id: "data-sharing",
      title: "Data Sharing & Disclosure",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      content: [
        {
          subtitle: "We Do Not Sell Your Data",
          text: "Psychoish does not sell, rent, or trade your personal information or assessment results to any third party, ever, for any reason.",
        },
        {
          subtitle: "Healthcare Providers",
          text: "If you book a consultation, only the information you explicitly choose to share will be provided to the licensed mental health professional facilitating your session.",
        },
        {
          subtitle: "Service Providers",
          text: "We may share limited technical data with trusted service providers (e.g., hosting, email delivery) who are contractually bound to protect your data and may not use it for any other purpose.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information if required by law, court order, or when we believe in good faith that disclosure is necessary to protect the safety of any person.",
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmitted between your browser and our servers is encrypted using industry-standard TLS (Transport Layer Security). Passwords are hashed using bcrypt and are never stored in plain text.",
        },
        {
          subtitle: "Access Controls",
          text: "Access to your personal data is restricted to authorized personnel on a need-to-know basis. We conduct regular security audits and maintain strict access logs.",
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting support@psychoish.com.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: [
        {
          subtitle: "Access & Portability",
          text: "You have the right to access all personal information we hold about you and to receive it in a portable format. Submit a request to support@psychoish.com.",
        },
        {
          subtitle: "Correction",
          text: "You may update or correct your personal information at any time through your Profile settings page.",
        },
        {
          subtitle: "Deletion",
          text: 'You have the right to request deletion of your account and all associated data ("right to be forgotten"). We will process such requests within 30 days.',
        },
        {
          subtitle: "Opt-Out",
          text: "You may opt out of marketing emails at any time using the unsubscribe link in any email or by contacting us directly.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-3 6a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      ),
      content: [
        {
          subtitle: "Essential Cookies",
          text: "We use session cookies strictly necessary for you to log in and use the platform. These are deleted when you close your browser.",
        },
        {
          subtitle: "No Third-Party Tracking",
          text: "We do not use advertising cookies, cross-site tracking pixels, or sell browsing data to advertisers. Your mental health journey stays private.",
        },
      ],
    },
  ];

  return (
    <div className="legal-page">
      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1>Privacy Policy</h1>
        <p>Your data, your rights — we take privacy seriously.</p>
        <div className="legal-meta">Last updated: {lastUpdated}</div>
      </div>

      <div className="legal-layout">
        {/* Sticky sidebar TOC */}
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
              <p>Questions about this policy?</p>
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
              At <strong>Psychoish</strong>, protecting your privacy is not an afterthought — it is central to
              everything we build. This policy explains what information we collect, how we use it, and the
              controls you have over it. By using Psychoish, you agree to the practices described here.
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

          {/* Contact CTA */}
          <div className="legal-cta">
            <h2>Still have questions?</h2>
            <p>Our team is here to help you understand how your data is handled.</p>
            <div className="legal-cta-buttons">
              <a href="mailto:support@psychoish.com" className="legal-btn-primary">
                Contact Support
              </a>
              <Link to="/faq" className="legal-btn-secondary">
                Read FAQ
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
