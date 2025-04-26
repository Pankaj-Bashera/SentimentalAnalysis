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
        borderColor: "#29234e",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 0.9)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.2,
          color: "#000",
        },
        pointLabels: {
          font: {
            size: 16 // Increase label size around the radar
          },
          color: "#000"
        },
        angleLines: {
          color: "#555",
          lineWidth: 1,
        },
        grid: {
          color: "#222",
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
    <section id="about" className="section flex bg-accent">
      <div className="w-1/2 p-2 mt-12">
        <h1 className="mb-4 text-md font-extrabold text-soft dark:text-white md:text-3xl lg:text-5xl">
          <span className="block p-2 text-transparent bg-clip-text bg-gradient-to-r to-[#40048c] from-[#0735fa]">
            Sentiment Analysis 
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-primary from-secondary">
             Model
          </span>
        </h1>

        <p className="text-lg font-normal text-black lg:text-xl dark:text-black-100">
          Analyze sentiment from social media posts with our AI-powered model. Simply input text or upload data, and let the neural network do the rest. Get real-time insights into emotions.
        </p>

        <div className="text-box-container mb-4">
          <textarea
            className="text-box w-full p-2 bg-grey-800 border rounded"
            placeholder="Enter your thoughts here..."
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        {/* File Upload Section using your styles */}
        {/* <div className="mb-4">
          <label className="block mb-2 pl-16 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
            Upload file
          </label>
          <input
            className="w-3/5  text-sm text-primary border border-gray-300 rounded-lg cursor-pointer  dark:text-primary focus:outline-none dark:bg-warm dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept=".txt,.doc,.docx"
            onChange={handleFileUpload}
          />
        </div> */}

        <button
          className="submit-button mt-2 p-2 bg-secondary hover:bg-blue-800 text-white rounded"
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