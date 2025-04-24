import React from 'react'
import Hero from '../components/Home/Hero'
import Solutions from '../components/Home/Solutions'
import TestimonialsBranches from '../components/Home/TestimonialsBranches'
import ChatBot from '../components/Chatbot';

function HomePage() {
    return (
      <div className="bg-white min-h-screen ">
        <ChatBot />
        <Hero />
        <Solutions />
        <TestimonialsBranches/>
        
      </div>
    );
  }
  export default HomePage;
  