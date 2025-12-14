import React from 'react';
import Footer from '@/components/Footer';
import { contactEmail, socialLinks } from '@/data/content';

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen bg-white pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-medium mb-8">Contact</h1>
          <div className="space-y-4 text-sm">
            <p>For inquiries: {contactEmail}</p>
            <div className="pt-8 space-y-2">
              {socialLinks.map((link) => (
                
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-red-600 transition-colors duration-200"
                >
                  {link.name} &rarr;
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
