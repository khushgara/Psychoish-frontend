import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AssessmentPage.css";

const AssessmentPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { axiosInstance, isAuthenticated } = useContext(AuthContext);
  
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    const fetchAssessmentQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/assessments/questions/${type}`);
        setAssessment(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assessment:", error);
        alert("Failed to load assessment. Please try again.");
        navigate("/dashboard");
      }
    };

    fetchAssessmentQuestions();
  }, [type, isAuthenticated, navigate, axiosInstance]);

  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unanswered = assessment.questions.filter(
      (q) => answers[q.id] === undefined
    );

    if (unanswered.length > 0) {
      alert(`Please answer all questions. ${unanswered.length} question(s) remaining.`);
      return;
    }

    setSubmitting(true);
    try {
      // Convert answers object to array to maintain order and match backend expectation
      const responses = assessment.questions.map(q => ({
        questionId: q.id,
        value: answers[q.id]
      }));

      const response = await axiosInstance.post("/assessments/submit", {
        assessmentType: type,
        responses: responses,
      });

      // Navigate to results page
      navigate(`/results/${response.data.result.id}`);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Failed to submit assessment. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="assessment-loading">
        <div className="loader"></div>
        <p>Loading assessment...</p>
      </div>
    );
  }

  if (!assessment) {
    return <div className="assessment-error">Assessment not found</div>;
  }

  const question = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div className="assessment-page">
      <div className="assessment-container">
        <div className="assessment-header">
          <h1>{assessment.name}</h1>
          <p>{assessment.description}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">
            Question {currentQuestion + 1} of {assessment.questions.length}
          </p>
        </div>

        <div className="question-card">
          <h2 className="question-text">{question.text}</h2>
          
          <div className="options-container">
            {question.options ? (
              // Multiple choice options
              question.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    answers[question.id] === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleAnswer(question.id, option.value)}
                >
                  {option.label}
                </button>
              ))
            ) : question.type === "yesno" ? (
              // Yes/No questions
              <>
                <button
                  className={`option-btn ${
                    answers[question.id] === 1 ? "selected" : ""
                  }`}
                  onClick={() => handleAnswer(question.id, 1)}
                >
                  Yes
                </button>
                <button
                  className={`option-btn ${
                    answers[question.id] === 0 ? "selected" : ""
                  }`}
                  onClick={() => handleAnswer(question.id, 0)}
                >
                  No
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-btn prev-btn"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>
          
          {currentQuestion === assessment.questions.length - 1 ? (
            <button
              className="nav-btn submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Assessment"}
            </button>
          ) : (
            <button
              className="nav-btn next-btn"
              onClick={handleNext}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
