import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import AssessmentPage from "./pages/AssessmentPage/AssessmentPage";
import Results from "./pages/Results/Results";
import AllResults from "./pages/Results/AllResults";
import Profile from "./pages/Profile/Profile";
import Consultation from "./pages/Consultation/Consultation";
import About from "./pages/About/About";
import Therapies from "./pages/Therapies/Therapies";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import FAQ from "./pages/FAQ/FAQ";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        transition: "all 0.3s ease",
        minHeight: "100vh",
      }}
    >
      <Router>
        <Navbar />
        <main
          style={{ 
            background: theme.colors.background,
            minHeight: "calc(100vh - 120px)"
          }}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/therapies" element={<Therapies />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessment/:type"
              element={
                <ProtectedRoute>
                  <AssessmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results/history"
              element={
                <ProtectedRoute>
                  <AllResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results/:id"
              element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/consultation"
              element={
                <ProtectedRoute>
                  <Consultation />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
