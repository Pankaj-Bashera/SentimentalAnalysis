import React from 'react';
import './Section.css';

const Home = () => {

    return (
        <section id="home" className="section bg-background">
            {/* Content Container */}
            <div className="content-container bg-background">
                <div className="rounded-square"></div>
                <h1 className="content pt-12 pl-8 text-4xl font-extrabold leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl">We invest in the <span className="underline underline-offset-3 decoration-8 decoration-primary">AI’s potential</span></h1>
                <blockquote className="content pl-8 text-xl italic font-semibold text-muted-foreground">

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


