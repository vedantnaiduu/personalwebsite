'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <div className="glass-panel rounded-full px-12 py-4 flex items-center justify-between shadow-2xl backdrop-blur-xl w-full max-w-5xl pointer-events-auto">
        <Link href="/" className="text-accent-blue font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity">
          Portfolio
        </Link>
        
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-text-secondary hover:text-accent-blue font-medium text-sm transition-colors duration-300 group tracking-wide uppercase"
              onMouseEnter={() => setActiveSection(item.name)}
              onMouseLeave={() => setActiveSection('')}
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-accent-blue"
                initial={{ width: 0 }}
                animate={{
                  width: activeSection === item.name ? '100%' : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-text-primary"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLineCap="round"
              strokeLineJoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}

