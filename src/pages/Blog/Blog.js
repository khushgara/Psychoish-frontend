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
      image: "🧠",
    },
    {
      id: 2,
      title: "The Importance of Sleep for Mental Health",
      excerpt: "Discover how quality sleep impacts your mental wellness and practical tips for improving sleep hygiene.",
      category: "wellness",
      date: "2024-11-28",
      readTime: "4 min read",
      image: "😴",
    },
    {
      id: 3,
      title: "Mindfulness Meditation: A Beginner's Guide",
      excerpt: "Start your mindfulness journey with simple techniques that can reduce stress and improve emotional regulation.",
      category: "self-care",
      date: "2024-11-25",
      readTime: "6 min read",
      image: "🧘",
    },
    {
      id: 4,
      title: "Breaking the Stigma Around Mental Health",
      excerpt: "Why talking about mental health matters and how we can create more supportive communities.",
      category: "awareness",
      date: "2024-11-20",
      readTime: "5 min read",
      image: "💬",
    },
    {
      id: 5,
      title: "Depression vs. Sadness: Understanding the Difference",
      excerpt: "Learn to recognize the signs of clinical depression and when to seek professional help.",
      category: "depression",
      date: "2024-11-15",
      readTime: "7 min read",
      image: "😔",
    },
    {
      id: 6,
      title: "Building Resilience in Challenging Times",
      excerpt: "Practical strategies to develop emotional resilience and bounce back from adversity.",
      category: "wellness",
      date: "2024-11-10",
      readTime: "5 min read",
      image: "💪",
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
