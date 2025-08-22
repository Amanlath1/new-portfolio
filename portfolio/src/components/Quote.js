// /src/components/Quote.js

import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Get the API key from environment variables
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const Quote = () => {
    // State to store the generated quote
    const [quote, setQuote] = useState("Loading your daily dose of inspiration...");

    // Function to fetch the quote from Gemini API
    const fetchQuote = async () => {
        try {
            // Initialize the Generative AI model
            const genAI = new GoogleGenerativeAI(API_KEY);

            // Configuration to ensure a random, creative response
            const generationConfig = {
              temperature: 1,
              topP: 0.9,
              topK: 40,
            };

            const model = genAI.getGenerativeModel({
              model: "gemini-2.5-flash-lite", // Corrected model name
              generationConfig,
            });

            // This prompt is tailored to your resume's skills
            const prompt = `
                Generate a short, insightful, and inspiring quote for a personal portfolio website.
                The person's key skills are: DevOps, AWS, Docker, Kubernetes, CI/CD, and Continuous Learning.
                The quote should be related to technology, automation, building the future, or continuous improvement.
                Do not add any introductory text like "Here is a quote:". Just provide the quote itself.
                Random seed for uniqueness: ${Math.random()}
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            setQuote(text); // Update the state with the new quote
        } catch (error) {
            console.error("Error fetching quote:", error);
            setQuote("The best way to predict the future is to code it."); // Fallback quote
        }
    };

    // useEffect hook runs once when the component is first rendered
    useEffect(() => {
        fetchQuote();
    }, []); // The empty array [] means this effect runs only once

    return (
        <div className="quote-container">
            <p>"{quote}"</p>
        </div>
    );
};

export default Quote;