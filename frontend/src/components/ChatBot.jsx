// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import BotIconUrl from '../assets/icons/bot.svg';
import UserIconUrl from '../assets/icons/user.svg';
import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:8020/api/chatbot/respond/';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Xin chào! Tôi là chatbot chẩn đoán sức khỏe. Hãy mô tả các triệu chứng của bạn hoặc nói "đặt lịch khám" để đặt lịch hẹn.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    // Khôi phục session_id từ localStorage
    return localStorage.getItem('chatbot_session_id') || null;
  });
  const messagesEndRef = useRef(null);

  const toggleOpen = () => setOpen(prev => !prev);

  const resetChat = async () => {
    setMessages([
      { from: 'bot', text: 'Xin chào! Tôi là chatbot chẩn đoán sức khỏe. Hãy mô tả các triệu chứng của bạn hoặc nói "đặt lịch khám" để đặt lịch hẹn.' }
    ]);
    
    // Gửi message reset để reset session trên server
    if (sessionId) {
      await sendToChatbot('reset');
    }
    
    setSessionId(null);
    localStorage.removeItem('chatbot_session_id');
    setInput('');
  };

  const sendToChatbot = async (prompt) => {
    setLoading(true);
    try {
      const res = await axios.post(LOCAL_API_URL, {
        message: prompt,
        session_id: sessionId || null,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      // Save session ID if new
      if (!sessionId && res.data.session_id) {
        setSessionId(res.data.session_id);
        localStorage.setItem('chatbot_session_id', res.data.session_id);
      }
      
      return res.data.reply;
    } catch (err) {
      console.error('Chatbot API error', err);
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

    const response = await sendToChatbot(userMsg.text);
    
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
    <div className='fixed bottom-0 right-0 z-[9999]'>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleOpen}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={`fixed bottom-8 right-8 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-3xl ${
          open ? 'rotate-180' : 'hover:rotate-12'
        } border-4 border-white/20`}
        style={{ zIndex: 10000 }}
      >
        {open ? (
          <span className="text-3xl font-bold">×</span>
        ) : (
          <div className="relative">
            <img src={BotIconUrl} alt="Chat" className="w-10 h-10 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div 
          className="fixed bottom-32 right-8 w-96 h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm border border-gray-200/50"
          style={{ zIndex: 9999 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-4 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="relative">
                <img src={BotIconUrl} alt="Bot" className="w-8 h-8" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="font-bold text-lg">AI Health Assistant</span>
                <div className="text-xs text-blue-100">Tư vấn sức khỏe 24/7</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 relative z-10">
              <button 
                onClick={resetChat} 
                title="Bắt đầu cuộc trò chuyện mới"
                className="text-white hover:text-blue-200 transition-all duration-200 p-2 rounded-full hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button 
                onClick={toggleOpen} 
                aria-label="Close chat" 
                className="text-white hover:text-red-200 transition-all duration-200 p-2 rounded-full hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-blue-50/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'} animate-fadeIn`}>
                <div className={`max-w-[80%] flex space-x-3 ${m.from === 'bot' ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className="flex-shrink-0">
                    <img
                      src={m.from === 'bot' ? BotIconUrl : UserIconUrl}
                      alt={m.from}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    />
                  </div>
                  <div className={`px-4 py-3 rounded-2xl shadow-md text-sm leading-relaxed relative transform transition-all duration-200 hover:scale-105
                    ${m.from === 'bot'
                      ? 'bg-white text-gray-800 rounded-bl-sm border border-gray-100 shadow-blue-100'
                      : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-sm shadow-purple-200'}
                  `}>
                    {m.from === 'bot' && (
                      <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
                    )}
                    {m.from === 'user' && (
                      <div className="absolute -right-2 top-4 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-blue-500"></div>
                    )}
                    <div className="relative z-10">
                      {m.text === '...' ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      ) : (
                        m.text
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-3xl">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !loading && handleSend()}
                  disabled={loading}
                  placeholder="Nhập triệu chứng hoặc câu hỏi của bạn..."
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-gray-400"
                />
                {input && (
                  <button
                    onClick={() => setInput('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            {loading && (
              <div className="mt-2 text-xs text-gray-500 flex items-center space-x-2">
                <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Đang xử lý...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
