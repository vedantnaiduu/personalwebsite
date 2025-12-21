'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      const response = await fetch('https://formspree.io/f/xvgzgeeo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus({ type: 'idle' }), 5000);
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An unexpected error occurred.' });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto liquid-glass p-10 relative group rounded-2xl overflow-visible shadow-2xl"
    >
      <GlowingEffect
        variant="blue"
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.3}
        borderWidth={2}
      />
      {/* Geometric border corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent-blue opacity-50 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent-blue opacity-50 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent-blue opacity-50 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent-blue opacity-50 pointer-events-none z-0" />

      <div className="relative z-10 space-y-6">
        <div>
          <label htmlFor="name" className="block text-accent-blue mb-2 text-sm font-semibold uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-blue transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-accent-blue mb-2 text-sm font-semibold uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-blue transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-accent-blue mb-2 text-sm font-semibold uppercase tracking-wider">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-blue transition-all duration-300 resize-none"
          />
        </div>

        <motion.button
          type="submit"
          disabled={status.type === 'loading'}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 bg-white text-background-dark font-bold rounded-xl hover:bg-accent-blue hover:text-white transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">
            {status.type === 'loading' ? 'Sending...' : 
             status.type === 'success' ? 'Message Sent!' : 
             status.type === 'error' ? 'Failed to Send' : 'Send Message'}
          </span>
        </motion.button>
        
        {status.message && (
          <p className={`text-center mt-4 text-sm font-medium ${
            status.type === 'success' ? 'text-green-500' : 'text-red-500'
          }`}>
            {status.message}
          </p>
        )}
      </div>
    </motion.form>
  );
}

