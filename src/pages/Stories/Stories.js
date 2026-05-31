import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Stories.css";

const SuccessStories = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedStory, setExpandedStory] = useState(null);

  const stats = [
    {
      value: "5,000+",
      label: "Lives Impacted",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "#8b5cf6",
    },
    {
      value: "94%",
      label: "Reported Improvement",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      color: "#10b981",
    },
    {
      value: "9",
      label: "Clinical Assessments",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "#3b82f6",
    },
    {
      value: "4.9★",
      label: "Average Rating",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
      color: "#f59e0b",
    },
  ];

  const featured = {
    name: "Sarah M.",
    age: 28,
    location: "New York, USA",
    category: "anxiety",
    tagline: "From panic attacks to peace — my two-year journey with Psychoish",
    avatar: "S",
    avatarColor: "#8b5cf6",
    rating: 5,
    story: `I started using Psychoish during one of the darkest periods of my life. I was experiencing panic attacks almost daily, struggling to get through work, and isolating myself from everyone I loved. I didn't know where to turn.\n\nA friend suggested I try the anxiety assessment on Psychoish. Within minutes, I had a clearer picture of what I was dealing with — moderate-to-severe anxiety. The platform connected me with a therapist who specialized in CBT, and for the first time, I felt genuinely understood.\n\nOver the next eight months, using a combination of weekly assessments to track my progress and regular consultations, I gradually rebuilt my life. The data showed me what I couldn't always feel — that I was improving, even on the hard days.\n\nToday, I lead a mental wellness support group in my community. I never imagined saying that two years ago. Psychoish didn't just help me — it gave me the tools to help others.`,
    improvement: "Anxiety score: 22 → 6",
    duration: "8 months",
    assessments: ["Anxiety", "Mood", "Well-Being"],
  };

  const stories = [
    {
      id: 1,
      name: "James T.",
      age: 34,
      location: "London, UK",
      category: "depression",
      rating: 5,
      avatar: "J",
      avatarColor: "#3b82f6",
      tagline: "Tracking my mood daily helped me recognize patterns I'd ignored for years.",
      shortStory:
        "After losing my job, I fell into a deep depression. The mood assessments on Psychoish helped me and my therapist track week-by-week changes. Six months later, I'm back working — and more self-aware than ever.",
      fullStory:
        "After losing my job during the economic downturn, I fell into a deep depression that I tried to dismiss as just 'being stressed'. The mood assessments on Psychoish were the first objective measure I'd had. Seeing my scores chart over time — even tiny improvements — kept me motivated during therapy. Six months later, I'm back working in a new field I love, and I check in with the platform monthly just to stay grounded.",
      improvement: "Mood score: 19 → 4",
      duration: "6 months",
      assessments: ["Mood", "Sleep Quality"],
    },
    {
      id: 2,
      name: "Priya K.",
      age: 22,
      location: "Mumbai, India",
      category: "sleep",
      rating: 5,
      avatar: "P",
      avatarColor: "#10b981",
      tagline: "I finally understand why I was exhausted all the time.",
      shortStory:
        "Years of poor sleep left me foggy, irritable, and unable to focus. The Sleep Quality assessment revealed I had delayed sleep phase syndrome. With targeted guidance, I transformed my nights — and my days.",
      fullStory:
        "I'd been exhausted for so long that I thought it was just normal. My sleep assessment through Psychoish showed a pattern I hadn't connected before — I was falling asleep at 3am and waking at noon when I could, but fighting it every other day. My therapist suggested I might have delayed sleep phase syndrome. With a structured plan and biweekly check-ins, I shifted my schedule by three hours over two months. My concentration and mood improved dramatically. I'm now finishing my master's degree with energy I didn't know I had.",
      improvement: "Sleep score: 18 → 3",
      duration: "3 months",
      assessments: ["Sleep Quality", "Mood"],
    },
    {
      id: 3,
      name: "Marcus W.",
      age: 45,
      location: "Chicago, USA",
      category: "ocd",
      rating: 5,
      avatar: "M",
      avatarColor: "#ec4899",
      tagline: "The Y-BOCS assessment gave me language for something I'd hidden for 20 years.",
      shortStory:
        "I'd been managing intrusive thoughts secretly for two decades. Seeing my Y-BOCS score helped me finally talk to a professional. ERP therapy changed my life.",
      fullStory:
        "For twenty years, I thought I was just 'weird' or 'too anxious'. The Y-BOCS assessment through Psychoish was the first time I encountered language that matched what I was experiencing. My score indicated moderate OCD — something I'd never considered. The consultation I booked through the platform connected me with an ERP (Exposure Response Prevention) specialist. Eighteen months of hard work later, my score is minimal. I wish I'd found this resource decades ago.",
      improvement: "Y-BOCS: 26 → 8",
      duration: "18 months",
      assessments: ["OCD (Y-BOCS)", "Anxiety", "Well-Being"],
    },
    {
      id: 4,
      name: "Aisha R.",
      age: 19,
      location: "Toronto, Canada",
      category: "wellbeing",
      rating: 5,
      avatar: "A",
      avatarColor: "#f59e0b",
      tagline: "College was overwhelming — Psychoish helped me build a toolkit for hard days.",
      shortStory:
        "Starting university far from home, I was drowning. The well-being assessments helped me understand that what I felt was real and that I deserved support. Now I'm thriving.",
      fullStory:
        "Moving across the country for university, I hit a wall by week three. I was homesick, overwhelmed by coursework, and felt like everyone else had it figured out. A campus counselor pointed me to Psychoish. My well-being score reflected how I felt — low. But the weekly check-ins showed me a roadmap. I joined a peer support group, started monthly consultations, and developed a daily structure that worked for me. By my second semester, my score had improved significantly. I now volunteer on the mental wellness committee at my university.",
      improvement: "Well-being: Low → High",
      duration: "5 months",
      assessments: ["Well-Being", "Mood", "Anxiety"],
    },
    {
      id: 5,
      name: "David L.",
      age: 52,
      location: "Sydney, Australia",
      category: "depression",
      rating: 5,
      avatar: "D",
      avatarColor: "#6366f1",
      tagline: "Retirement should have been joyful — instead I was lost. Psychoish helped me find myself again.",
      shortStory:
        "After retiring, I lost my sense of purpose and fell into depression. Psychoish helped me recognize it, seek help, and rebuild an identity beyond my career.",
      fullStory:
        "Forty years in engineering, and then — nothing. The first six months of retirement were the emptiest of my life. My wife noticed before I did. The mood assessment I took on Psychoish showed a score that surprised me. I'd never thought of myself as someone who could be depressed. But seeing it in data made it real. I booked a consultation, worked with a psychologist on identity and purpose after career transition, and slowly rediscovered what I love. I now mentor young engineers and take a pottery class on Fridays. Life feels full again.",
      improvement: "Mood score: 21 → 5",
      duration: "10 months",
      assessments: ["Mood", "Well-Being"],
    },
    {
      id: 6,
      name: "Layla N.",
      age: 31,
      location: "Dubai, UAE",
      category: "anxiety",
      rating: 5,
      avatar: "L",
      avatarColor: "#14b8a6",
      tagline: "Social anxiety had me avoiding life. Now I lead team meetings.",
      shortStory:
        "Social situations made me physically ill. Through Psychoish assessments and targeted therapy, I went from avoiding phone calls to confidently presenting to 200 people.",
      fullStory:
        "I turned down a promotion because the role required public speaking. That was my wake-up call. My anxiety assessment showed high social anxiety specifically — something I'd normalized as 'just being introverted'. My therapist and I worked through exposure hierarchy using my assessment scores as milestones. Six months in, I gave my first team presentation — hands shaking, but I did it. A year later, I accepted that promotion. I still use Psychoish quarterly to check in and make sure I'm staying on track.",
      improvement: "Anxiety score: 17 → 4",
      duration: "12 months",
      assessments: ["Anxiety", "Phobia", "Well-Being"],
    },
  ];

  const categories = [
    { id: "all", label: "All Stories" },
    { id: "anxiety", label: "Anxiety" },
    { id: "depression", label: "Depression" },
    { id: "sleep", label: "Sleep" },
    { id: "ocd", label: "OCD" },
    { id: "wellbeing", label: "Well-Being" },
  ];

  const filtered =
    activeFilter === "all" ? stories : stories.filter((s) => s.category === activeFilter);

  const renderStars = (n) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < n ? "currentColor" : "none"}
        stroke="currentColor"
        width="16"
        height="16"
        style={{ color: "#f59e0b" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ));

  return (
    <div className="stories-page">
      {/* Hero */}
      <div className="stories-hero">
        <div className="stories-hero-badge">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          Real People. Real Progress.
        </div>
        <h1>Success Stories</h1>
        <p>
          Thousands of people have taken the first step toward better mental health with Psychoish.
          These are some of their journeys — shared with permission and gratitude.
        </p>
        {/* Stats strip */}
        <div className="stories-stats">
          {stats.map((s, i) => (
            <div key={i} className="stories-stat">
              <div className="stories-stat-icon" style={{ color: s.color, background: s.color + "22" }}>
                {s.icon}
              </div>
              <div className="stories-stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stories-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stories-content">

        {/* Featured story */}
        <section className="featured-section">
          <div className="section-label">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            Featured Story
          </div>
          <div className="featured-card">
            {/* Left panel */}
            <div className="featured-left">
              <div className="featured-avatar" style={{ background: featured.avatarColor }}>
                {featured.avatar}
              </div>
              <h3 className="featured-name">{featured.name}</h3>
              <p className="featured-meta">{featured.age} · {featured.location}</p>
              <div className="featured-stars">{renderStars(featured.rating)}</div>

              <div className="featured-metrics">
                <div className="featured-metric">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
                  </svg>
                  {featured.improvement}
                </div>
                <div className="featured-metric">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {featured.duration}
                </div>
              </div>

              <div className="featured-assessments">
                {featured.assessments.map((a) => (
                  <span key={a} className="assessment-tag">{a}</span>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="featured-right">
              <h2 className="featured-tagline">"{featured.tagline}"</h2>
              <div className="featured-story-text">
                {featured.story.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filter chips */}
        <div className="stories-filters-row">
          <div className="section-label">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.97 5.97 0 00-.75-2.985m-.958-3.198a3.007 3.007 0 00-3.453-.268m.94 3.198A5.978 5.978 0 0112 18.72a5.978 5.978 0 01-3.25-1.025m-.94-3.197A3.007 3.007 0 004.3 14.23m.94 3.197a5.97 5.97 0 00-.75-2.985m0 0a3 3 0 01-4.682-2.72A9.094 9.094 0 013.5 16.2c.226-.223.479-.413.75-.566M12 11.25a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
            Community Stories
          </div>
          <div className="stories-chips">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`story-chip ${activeFilter === c.id ? "story-chip--active" : ""}`}
                onClick={() => setActiveFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Story cards grid */}
        <div className="stories-grid">
          {filtered.map((story) => {
            const isExpanded = expandedStory === story.id;
            return (
              <div key={story.id} className={`story-card ${isExpanded ? "story-card--expanded" : ""}`}>
                {/* Header */}
                <div className="story-card-header">
                  <div className="story-avatar" style={{ background: story.avatarColor }}>
                    {story.avatar}
                  </div>
                  <div className="story-person">
                    <div className="story-name">{story.name}</div>
                    <div className="story-meta">{story.age} · {story.location}</div>
                  </div>
                  <div className="story-stars">{renderStars(story.rating)}</div>
                </div>

                {/* Quote */}
                <blockquote className="story-quote">"{story.tagline}"</blockquote>

                {/* Body */}
                <p className="story-body">
                  {isExpanded ? story.fullStory : story.shortStory}
                </p>

                {/* Metrics row */}
                <div className="story-metrics">
                  <div className="story-metric">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
                    </svg>
                    {story.improvement}
                  </div>
                  <div className="story-metric">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {story.duration}
                  </div>
                </div>

                {/* Assessment tags */}
                <div className="story-tags">
                  {story.assessments.map((a) => (
                    <span key={a} className="assessment-tag">{a}</span>
                  ))}
                </div>

                {/* Read more */}
                <button
                  className="story-expand-btn"
                  onClick={() => setExpandedStory(isExpanded ? null : story.id)}
                >
                  {isExpanded ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>
                      Show Less
                    </>
                  ) : (
                    <>
                      Read Full Story
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="stories-disclaimer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>
            Stories are shared with permission. Names and identifying details may be anonymized to protect privacy.
            Individual results vary. Psychoish assessments are not a substitute for professional clinical diagnosis or treatment.
          </p>
        </div>

        {/* CTA */}
        <div className="stories-cta">
          <div className="stories-cta-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="40" height="40">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2>Start Your Own Journey</h2>
          <p>
            Every success story began with a single assessment. Take yours today — it's free, private,
            and takes less than 15 minutes.
          </p>
          <div className="stories-cta-buttons">
            <Link to="/signup" className="stories-btn-primary">
              Get Started Free
            </Link>
            <Link to="/dashboard" className="stories-btn-secondary">
              Take an Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
