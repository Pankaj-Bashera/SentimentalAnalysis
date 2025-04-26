import React from 'react';
import Slideshow from './Slideshow';
import './Section.css';

const Services = () => {
  const images = [
    'https://megaone.acrothemes.com/ai-chatbot/img/work-img-2.jpg',
    'https://megaone.acrothemes.com/ai-chatbot/img/work-img-3.jpg',
    'https://megaone.acrothemes.com/ai-chatbot/img/work-img-1.jpg',
  ];

  return (
    <section id="services" className="section bg-[#cbb2bf]">

      <h1 class="text-5xl font-extrabold text-[#1a1a2e] mb-8 ">Our Services</h1>

      <Slideshow images={images} />
    </section>
  );
};

export default Services;