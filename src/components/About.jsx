import React, { useState } from "react";
import { useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import "./Section.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const EmotionGraph = ({ scores }) => {
  const emotions = ["Anger", "Desire", "Disgust", "Fear", "Grief", "Joy", "Love"];

  const data = {
    labels: emotions,
    datasets: [
      {
        data: scores,
        backgroundColor: "transparent",
        borderColor: "var(--primary)",
        borderWidth: 2,
        pointBackgroundColor: "var(--chart-1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.2,
          color: "var(--muted-foreground)",
        },
        pointLabels: {
          font: {
            size: 16 // Increase label size around the radar
          },
          color: "var(--foreground)"
        },
        angleLines: {
          color: "var(--border)",
          lineWidth: 1,
        },
        grid: {
          color: "var(--border)",
          lineWidth: 1 // Thickness of circular grid lines
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-1/2 flex justify-center">
      <Radar data={data} options={options} />
    </div>
  );
};

const About = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState(new Array(7).fill(0));
  const maxLength = 100;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/send-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setScores(data.sentiment);
        setText("");
      } else {
        alert("Failed to send text.");
      }
    } catch (error) {
      console.error("Error sending text:", error);
      alert("An error occurred while sending the text.");
    }
    setLoading(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".txt") && !file.name.endsWith(".doc") && !file.name.endsWith(".docx")) {
      alert("Only .txt and .doc/.docx files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      setText(fileContent); // replaces textarea content with file text
    };
    reader.readAsText(file);
  };

  return (
    <section id="about" className="section flex bg-card">
      <div className="w-1/2 p-2 mt-12">
        <h1 className="mb-4 text-md font-extrabold text-foreground md:text-3xl lg:text-5xl">
          <span className="block p-2 text-transparent bg-clip-text bg-gradient-to-r to-primary from-ring">
            Sentiment Analysis
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-primary from-secondary">
            Model
          </span>
        </h1>

        <p className="text-lg font-normal text-muted-foreground lg:text-xl">
          Analyze sentiment from social media posts with our AI-powered model. Simply input text or upload data, and let the neural network do the rest. Get real-time insights into emotions.
        </p>

        <div className="text-box-container mb-4">
          <textarea
            className="text-box w-full p-2 bg-input border-input text-foreground rounded focus:border-ring focus:ring-ring"
            placeholder="Enter your thoughts here..."
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <button
          className="submit-button mt-2 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      <EmotionGraph scores={scores} />
    </section>
  );
};

export default About;