import React, { useState } from "react";
import "./Blog.css";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Anxiety: Symptoms and Coping Strategies",
      excerpt: "Learn about the different types of anxiety disorders and evidence-based techniques to manage symptoms effectively.",
      category: "anxiety",
      date: "2024-12-01",
      readTime: "5 min read",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '50px', height: '50px', color: '#ff79c6'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18.75a6 6 0 0 0 6-6c0-3.314-2.686-6-6-6s-6 2.686-6 6a6 6 0 0 0 6 6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.75v12m-6-6h12" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "The Importance of Sleep for Mental Health",
      excerpt: "Discover how quality sleep impacts your mental wellness and practical tips for improving sleep hygiene.",
      category: "wellness",
      date: "2024-11-28",
      readTime: "4 min read",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '50px', height: '50px', color: '#ffb86c'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Mindfulness Meditation: A Beginner's Guide",
      excerpt: "Start your mindfulness journey with simple techniques that can reduce stress and improve emotional regulation.",
      category: "self-care",
      date: "2024-11-25",
      readTime: "6 min read",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '50px', height: '50px', color: '#50fa7b'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m-9-9h18m-9-6a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Breaking the Stigma Around Mental Health",
      excerpt: "Why talking about mental health matters and how we can create more supportive communities.",
      category: "awareness",
      date: "2024-11-20",
      readTime: "5 min read",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '50px', height: '50px', color: '#8be9fd'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.5 8.25h9m-9 3h9m-9 3h9m-9 3.75h3l3.75 3.75V18h3.75A2.25 2.25 0 0 0 21 15.75V5.25A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25v10.5A2.25 2.25 0 0 0 5.25 18h2.25v2.25L7.5 18Z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Depression vs. Sadness: Understanding the Difference",
      excerpt: "Learn to recognize the signs of clinical depression and when to seek professional help.",
      category: "depression",
      date: "2024-11-15",
      readTime: "7 min read",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '50px', height: '50px', color: '#bd93f9'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v3m-3-2v3m6-2v3" />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Building Resilience in Challenging Times",
      excerpt: "Practical strategies to develop emotional resilience and bounce back from adversity.",
      category: "wellness",
      date: "2024-11-10",
      readTime: "5 min read",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '50px', height: '50px', color: '#f1fa8c'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
    },
  ];

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "anxiety", label: "Anxiety" },
    { id: "depression", label: "Depression" },
    { id: "wellness", label: "Wellness" },
    { id: "self-care", label: "Self-Care" },
    { id: "awareness", label: "Awareness" },
  ];

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <h1>Mental Health Blog</h1>
        <p>Expert insights, tips, and resources for your mental wellness journey</p>
      </div>

      <div className="blog-container">
        <div className="blog-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-image">{post.image}</div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="read-time">{post.readTime}</span>
                  <button className="read-more-btn">Read More →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
