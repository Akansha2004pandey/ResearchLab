import { Link } from 'react-router-dom';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

const quickLinks = [
  { href: '/people', label: 'People' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://scholar.google.com', label: 'Google Scholar' },
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://twitter.com', label: 'Twitter/X' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      <div className="pointer-events-none absolute -top-24 right-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground">
                  NSUT
                </span>
              </div>
              <div>
                <span className="font-heading text-xl font-semibold tracking-tight">
                  Artificial Intelligence Lab
                </span>
                <span className="block text-xs uppercase tracking-[0.18em] opacity-70">
                  Netaji Subhas University of Technology
                </span>
              </div>
            </Link>
            <p className="mb-6 max-w-md text-sm opacity-80">
              We build practical AI systems grounded in rigorous research, open science,
              and long-term collaboration across academia, government, and industry.
            </p>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Netaji Subhas University of Technology, Delhi</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:ankur.gupta@nsut.ac.in" className="hover:opacity-100 transition-opacity">
                  ankur.gupta@nsut.ac.in
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Navigate</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Research Profiles</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-background/15 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm opacity-65 md:flex-row">
            <p>© {new Date().getFullYear()} Artificial Intelligence Lab. All rights reserved.</p>
            <p>Part of the Department of Computer Science</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
