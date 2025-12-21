'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ type: 'idle' });

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

      if (response.ok) {
        setStatus({ type: 'success', message: 'TRANSMISSION COMPLETE.' });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus({ type: 'idle' }), 5000);
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error || 'TRANSMISSION FAILED.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'UNEXPECTED SYSTEM ERROR.' });
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="name" className="font-mono text-[10px] text-blue-500 uppercase tracking-widest">
            // SENDER_NAME
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/10 px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-blue-600 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="font-mono text-[10px] text-blue-500 uppercase tracking-widest">
            // SENDER_EMAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/10 px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-blue-600 transition-colors"
            placeholder="john@system.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="font-mono text-[10px] text-blue-500 uppercase tracking-widest">
          // MESSAGE_BODY
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={8}
          className="w-full bg-black border border-white/10 px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-blue-600 transition-colors resize-none"
          placeholder="Enter message text here..."
        />
      </div>

      <div className="flex items-center gap-8">
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="px-12 py-4 bg-blue-600 text-white font-bold uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center gap-4"
        >
          {status.type === 'loading' ? 'Processing...' : 'Send Message'}
          <span className="text-xl">→</span>
        </button>

        {status.message && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`font-mono text-[10px] uppercase ${
              status.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            [ {status.message} ]
          </motion.div>
        )}
      </div>
    </form>
  );
}
