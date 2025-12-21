'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/', id: '00' },
  { name: 'About', href: '/about', id: '01' },
  { name: 'Projects', href: '/projects', id: '02' },
  { name: 'Experience', href: '/experience', id: '03' },
  { name: 'Contact', href: '/contact', id: '04' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black border-b border-blue-500/20">
      <div className="grid grid-cols-2 md:grid-cols-12 h-16 md:h-20">
        
        {/* Brand Cell */}
        <div className="col-span-1 md:col-span-3 border-r border-blue-500/20 flex items-center px-6 md:px-10">
          <Link href="/" className="font-mono text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 flex items-center justify-center text-[10px] text-white">VN</div>
            <span className="hidden md:inline uppercase">Vedant Naidu</span>
          </Link>
        </div>

        {/* Desktop Navigation Cells */}
        <div className="hidden md:flex col-span-9 divide-x divide-blue-500/20">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex-1 flex flex-col justify-center px-6 group transition-colors hover:bg-blue-600/5 ${
                pathname === item.href ? 'bg-blue-600/10' : ''
              }`}
            >
              <span className="font-mono text-[10px] opacity-40 mb-1">[{item.id}]</span>
              <span className={`font-bold uppercase text-xs tracking-widest ${
                pathname === item.href ? 'text-blue-500' : 'text-white'
              }`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}
