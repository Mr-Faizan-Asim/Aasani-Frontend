import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import slide1 from '../assets/serviceprovider.jpg';
import slide2 from '../assets/guest_invite.png';
import slide3 from '../assets/signinpageside.png';

export default function ChatBotPage() {
  const slides = [slide1, slide2, slide3];
  const [current, setCurrent] = useState(0);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm Shaulat Kar Chatbot powered by DeepSeek. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-rotate slides every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  // Groq API key and endpoint
  const GROQ_API_KEY = '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';
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  // Send message via Groq API
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [...messages, userMessage],
        }),
      });
      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message || { role: 'assistant', content: 'Sorry, something went wrong.' };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error: Unable to get response from Groq.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      {/* LEFT PANEL: Slider */}
      <div className="w-full md:w-1/2 relative p-4 md:p-8">
        <div className="relative rounded-xl overflow-hidden h-64 sm:h-80 md:h-full">
          <img src={slides[current]} alt={`slide-${current}`} className="object-cover w-full h-full" />
          <button onClick={goPrev} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition">
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <button onClick={goNext} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition">
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`${idx === current ? 'w-8' : 'w-4'} h-1 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-600'} transition-all duration-300`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Chat Interface */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-12">
        <div className="space-y-4 overflow-y-auto" style={{ flex: 1 }}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>                
              <div className={`px-4 py-2 rounded-lg max-w-xs whitespace-pre-wrap ${m.role === 'assistant' ? 'bg-gray-800 text-gray-100' : 'bg-indigo-600 text-white'}`}>{m.content}</div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {isLoading && <div className="py-2 text-center text-gray-400 animate-pulse">Typing...</div>}

        <form onSubmit={handleSend} className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="bg-indigo-600 px-6 py-2 rounded-r-lg hover:bg-indigo-500 transition">Send</button>
        </form>
      </div>
    </div>
  );
}
