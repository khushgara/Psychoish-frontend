import React, { useState, useEffect, useRef, useCallback } from "react";
import { API_BASE_URL } from "../../config/api";
import "./Chatbot.css";

/* ── Tiny unique ID ──────────────────────────────────────────── */
const genId = () => Math.random().toString(36).slice(2, 10);

/* ── Quick-reply suggestions ─────────────────────────────────── */
const SUGGESTIONS = [
  "I'm feeling anxious today",
  "Help me understand my results",
  "How do I improve my sleep?",
  "What is Psychoish?",
  "Breathing exercises for stress",
];

/* ── Markdown-lite renderer (bold, bullet lists) ──────────────── */
function RenderMessage({ text }) {
  const lines = text.split("\n");
  return (
    <div className="chat-msg-text">
      {lines.map((line, i) => {
        // Bold: **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
          p.startsWith("**") ? <strong key={j}>{p.slice(2, -2)}</strong> : p
        );
        // Bullet list
        if (line.startsWith("* ") || line.startsWith("- ")) {
          return <li key={i}>{parts.slice(1)}</li>;
        }
        if (!line.trim()) return <br key={i} />;
        return <p key={i}>{parts}</p>;
      })}
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: genId(),
      role: "bot",
      text: "Hi! I'm **Psy**, your mental wellness companion 💜\n\nI'm here to help you understand your mental health, suggest coping strategies, and answer any questions you have about Psychoish.\n\nHow are you feeling today?",
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => genId());
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [unread, setUnread] = useState(0);
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const API_BASE  = API_BASE_URL;

  /* Auto-scroll to bottom */
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text) => {
      const userText = (text || input).trim();
      if (!userText || loading) return;

      setInput("");
      setShowSuggestions(false);
      setLoading(true);
      setTyping(true);

      // Add user bubble
      const userMsg = { id: genId(), role: "user", text: userText, ts: new Date() };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const res = await fetch(`${API_BASE}/api/chat/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText, sessionId }),
        });
        const data = await res.json();
        setTyping(false);

        const botMsg = {
          id: genId(),
          role: "bot",
          text: data.success
            ? data.reply
            : (data.message || "Sorry, I'm having trouble right now. Please try again in a moment."),
          ts: new Date(),
          error: !data.success,
        };
        setMessages((prev) => [...prev, botMsg]);
        if (!open) setUnread((u) => u + 1);
      } catch {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: genId(),
            role: "bot",
            text: "I'm having trouble reaching the server. Please check your connection.",
            ts: new Date(),
            error: true,
          },
        ]);
      }
      setLoading(false);
    },
    [input, loading, sessionId, API_BASE, open]
  );

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    await fetch(`${API_BASE}/api/chat/clear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {});
    setMessages([
      {
        id: genId(),
        role: "bot",
        text: "Chat cleared! I'm still here whenever you need me 💜",
        ts: new Date(),
      },
    ]);
    setShowSuggestions(true);
  };

  const fmt = (d) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* ── Floating bubble ───────────────────────────────────── */}
      <button
        className={`chatbot-bubble ${open ? "chatbot-bubble--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open Psy chat"}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="26" height="26">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
        {!open && unread > 0 && (
          <span className="chatbot-unread">{unread}</span>
        )}
      </button>

      {/* ── Chat window ───────────────────────────────────────── */}
      <div className={`chatbot-window ${open ? "chatbot-window--open" : ""}`} role="dialog" aria-label="Psy Mental Health Assistant">

        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <div className="chatbot-header-info">
            <div className="chatbot-header-name">Psy</div>
            <div className="chatbot-header-status">
              <span className="chatbot-status-dot" />
              Mental wellness assistant
            </div>
          </div>
          <div className="chatbot-header-actions">
            <button className="chatbot-icon-btn" onClick={clearChat} title="Clear chat" aria-label="Clear chat">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
            <button className="chatbot-icon-btn" onClick={() => setOpen(false)} title="Close" aria-label="Close chat">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="chatbot-disclaimer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="12" height="12">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          Not a substitute for professional care. In crisis? Call or text <strong>988</strong>.
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-msg-row chat-msg-row--${msg.role}`}>
              {msg.role === "bot" && (
                <div className="chat-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
              )}
              <div className={`chat-bubble ${msg.role === "user" ? "chat-bubble--user" : "chat-bubble--bot"} ${msg.error ? "chat-bubble--error" : ""}`}>
                <RenderMessage text={msg.text} />
                <div className="chat-bubble-time">{fmt(msg.ts)}</div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="chat-msg-row chat-msg-row--bot">
              <div className="chat-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <div className="chat-bubble chat-bubble--bot chat-bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {/* Quick suggestions (shown after greeting) */}
          {showSuggestions && messages.length === 1 && !loading && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="chatbot-suggestion-btn"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chatbot-input-area">
          <div className="chatbot-input-wrap">
            <textarea
              ref={inputRef}
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything about mental health…"
              rows={1}
              disabled={loading}
            />
            <button
              className="chatbot-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              {loading ? (
                <span className="chatbot-spinner" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </div>
          <p className="chatbot-footer-note">Powered by Google Gemini · Psychoish Psy</p>
        </div>
      </div>
    </>
  );
}
