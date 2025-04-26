import React from 'react';
import './Section.css';

const Home = () => {

    return (
        <section id="home" className="section bg-primary">
            {/* Content Container */}
            <div className="content-container bg-primary">
                <div className="rounded-square"></div>
                <h1 className="content pt-12 pl-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">AI’s potential</span></h1>
                <blockquote className="content pl-8 text-xl italic font-semibold text-gray-900 dark:text-white">

                    <p>"Unlock insights from social media with AI-powered sentiment analysis. Harness advanced neural networks to decode emotions in real-time."</p>
                </blockquote>
            </div>

            {/* Robot Image */}
            <img
                src="/src/assets/robot.png" // Ensure this path is correct
                alt="Robot"
                className="robot-image mr-12"
            />
        </section>
    );
};

export default Home;


