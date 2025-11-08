import React, { useState, useEffect, useRef, useCallback } from 'react';
import RobotIcon from './robot-icon';
import { trackEvent } from '../utils/analytics';
import { API_URLS, EXAMPLE_QUESTIONS, CHAT_CONFIG } from '../constants/chatbot';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const messagesEndRef = useRef(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        // Only scroll if there are messages
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, scrollToBottom]);

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen(prev => {
            const newState = !prev;
            trackEvent('Chatbot', 'Toggle Fullscreen', newState ? 'Enter' : 'Exit');
            return newState;
        });
    }, []);

    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const handleSubmit = useCallback(async (e, questionOverride = null) => {
        e.preventDefault();

        const message = (questionOverride || inputValue).trim();
        if (!message || isLoading) return;

        trackEvent('Chatbot', 'Message Sent', 'User Query');

        // Add user message with unique ID
        const userMessage = {
            role: 'user',
            content: message,
            id: `${Date.now()}-${Math.random()}`
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Add empty assistant message with unique ID
        const assistantMessage = {
            role: 'assistant',
            content: '',
            id: `${Date.now()}-${Math.random()}-assistant`
        };
        setMessages(prev => [...prev, assistantMessage]);

        try {
            const apiUrl = window.location.hostname === 'localhost'
                ? API_URLS.development
                : API_URLS.production;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                // Update the last message with the new chunk - FIX: Create new message object
                if (isMountedRef.current) {
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessageIndex = newMessages.length - 1;
                        newMessages[lastMessageIndex] = {
                            ...newMessages[lastMessageIndex],
                            content: newMessages[lastMessageIndex].content + chunk
                        };
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Chatbot error:', error);
            }
            if (isMountedRef.current) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessageIndex = newMessages.length - 1;
                    newMessages[lastMessageIndex] = {
                        ...newMessages[lastMessageIndex],
                        content: CHAT_CONFIG.errorMessage
                    };
                    return newMessages;
                });
            }
        } finally {
            if (isMountedRef.current) {
                setIsLoading(false);
            }
        }
    }, [inputValue, isLoading]);

    const handleExampleClick = useCallback((question) => {
        trackEvent('Chatbot', 'Example Question Click', question);
        setInputValue(question);
        // Trigger submit with the question
        setTimeout(() => {
            const event = { preventDefault: () => {} };
            handleSubmit(event, question);
        }, 0);
    }, [handleSubmit]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }, [handleSubmit]);

    return (
        <div id="chat-bot" className={`chat-container ${isFullscreen ? 'fullscreen' : ''}`}>
            {!isFullscreen && (
                <div className="chat-header">
                    <h2>{CHAT_CONFIG.headerTitle}</h2>
                    <p className="chat-subtitle">{CHAT_CONFIG.headerSubtitle}</p>
                </div>
            )}

            <div className="chat-messages">
                <button
                    className="fullscreen-toggle"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                    {isFullscreen ? '✕' : '⛶'}
                </button>

                {messages.length === 0 && (
                    <div className="welcome-message">
                        <p>{CHAT_CONFIG.welcomeMessage}</p>

                        <div className="example-questions">
                            <p className="example-label">Try asking:</p>
                            {EXAMPLE_QUESTIONS.map((question) => (
                                <button
                                    key={question}
                                    onClick={() => handleExampleClick(question)}
                                    className="example-question"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((message, index) => {
                    const isLastMessage = index === messages.length - 1;
                    const isLoadingMessage = isLastMessage && message.role === 'assistant' && !message.content && isLoading;

                    return (
                        <div key={message.id} className={`message ${message.role}`}>
                            <div className="message-avatar">
                                {message.role === 'user' ? '👤' : <RobotIcon />}
                            </div>

                            {isLoadingMessage && (
                                <div className="loading-spinner"></div>
                            )}

                            <div className="message-content">
                                {message.content}
                            </div>
                        </div>
                    );
                })}

                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="chat-input-container">
                <div className="chat-input-wrapper">
                    <textarea
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Ask me about Cory... (Press Enter to send)"
                        className="chat-input"
                        rows="1"
                        disabled={isLoading}
                        onKeyDown={handleKeyDown}
                        aria-label="Chat message input"
                    />

                    <button
                        type="submit"
                        className="chat-submit"
                        disabled={isLoading || !inputValue.trim()}
                    >
                        {isLoading ? '⏳' : '➤'}
                    </button>
                </div>
            </form>
        </div>
    );
}
