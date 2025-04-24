// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import BotIconUrl from '../assets/icons/bot.svg';
import UserIconUrl from '../assets/icons/user.svg';

const GEMINI_API_URL = 'https://api.gemini.com/v1/chat/completions';
const GEMINI_API_KEY = "AIzaSyBaZIGiYWoYL5HngCyWO8Cmn0uuBejDbUk";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleOpen = () => setOpen(prev => !prev);

  const sendToGemini = async (prompt) => {
    setLoading(true);
    try {
      const res = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gemini-pro',
          messages: [
            { role: 'system', content: 'You are a helpful healthcare assistant.' },
            ...messages.map(m => ({ role: m.from === 'bot' ? 'assistant' : 'user', content: m.text })),
            { role: 'user', content: prompt }
          ]
        })
      });
      const data = await res.json();
      return data.choices[0].message.content;
    } catch (err) {
      console.error('Gemini API error', err);
      return 'Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu.';
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const loadingMsg = { from: 'bot', text: '...' };
    setMessages(prev => [...prev, loadingMsg]);

    const response = await sendToGemini(userMsg.text);
    setMessages(prev => {
      // remove last loading placeholder
      const withoutLoading = prev.filter(m => m.text !== '...');
      return [...withoutLoading, { from: 'bot', text: response }];
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='z-10 relative'>
      {/* Chat bubble toggle */}
      <button
        onClick={toggleOpen}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition"
      >
        {open ? <span className="text-2xl">×</span> : <img src={BotIconUrl} alt="Chat" className="w-8 h-8" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={BotIconUrl} alt="Bot" className="w-6 h-6" />
              <span className="font-semibold">Chat Support</span>
            </div>
            <button onClick={toggleOpen} aria-label="Close chat" className="text-xl">×</button>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[70%] flex space-x-2 ${m.from === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>  
                  <img
                    src={m.from === 'bot' ? BotIconUrl : UserIconUrl}
                    alt={m.from}
                    className="w-5 h-5 mt-1"
                  />
                  <div
                    className={`p-2 rounded-xl shadow-sm text-sm leading-relaxed
                      ${m.from === 'bot'
                        ? 'bg-white text-gray-800'
                        : 'bg-gradient-to-tr from-green-100 to-green-200 text-gray-800'}
                    `}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input box */}
          <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={loading}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '...' : 'Gửi'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
