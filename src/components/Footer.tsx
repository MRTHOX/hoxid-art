import React from "react";
import { socialLinks } from "@/data/content";

export default function Footer() {
  return (
    <footer className="fixed bottom-8 right-8 text-xs font-mono space-x-4 z-40">
      {socialLinks.map((link) => (
        
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-600 transition-colors duration-200"
        >
          {link.label}
        </a>
      ))}
    </footer>
  );
}
