
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaLoaded) {
      setSubmitStatus({
        type: 'error',
        message: 'Not ready for security'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const recaptchaToken = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'contact_form' }
      );

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Message is successfully sent, thank you!'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to send, please try again'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network problem, please try later'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
        onLoad={() => {
          setRecaptchaLoaded(true);
        }}
      />
      
      <div className="px-4 sm:px-6 pt-6"> 
        <div className="px-4 sm:px-6 pt-6"> 
          <h2 className="neon-text-flicker text-lg font-medium mb-8">CONTACT</h2>
          
          <div>
            <form 
              className="flex flex-col max-w-2xl mx-auto pt-6 neon-text-flicker-white space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-2 text-base">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-white text-pink-500 w-full px-4 py-3 text-base rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block mb-2 text-base">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white text-pink-500 w-full px-4 py-3 text-base rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block mb-2 text-base">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-white text-pink-500 w-full px-4 py-3 text-base h-32 resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                  placeholder="Enter your message"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {submitStatus.message && (
                <div className={`p-4 rounded-md text-center ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button 
                type="submit"
                className={`text-white max-w-2/3 py-3 text-lg mt-5 mb-10 mx-auto p-4 rounded-md transition-all duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-pink-500 hover:bg-pink-600 transform hover:scale-105'
                }`}
                disabled={isSubmitting || !recaptchaLoaded}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              {!recaptchaLoaded && (
                <p className="text-center text-sm text-gray-400">
                  Preparing the security...
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;