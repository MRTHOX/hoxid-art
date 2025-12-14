import React from 'react';
import Footer from '@/components/Footer';
import { contactEmail, socialLinks } from '@/data/content';

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen bg-white pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-medium">Contact</h1>
          <p className="text-sm leading-relaxed">
            For inquiries, collaborations, or press, please use the email below.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-block text-sm font-mono border-b border-black hover:text-red-600 hover:border-red-600 transition-colors duration-200"
          >
            {contactEmail}
          </a>
          <div className="text-xs font-mono text-gray-600">
            <p>More links:</p>
            <div className="space-x-4 mt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition-colors duration-200"
                >
                  {link.label}
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
