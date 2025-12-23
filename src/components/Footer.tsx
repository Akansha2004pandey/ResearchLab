import { Link } from 'react-router-dom';
import { GraduationCap, Mail, MapPin, ExternalLink } from 'lucide-react';

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
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Lab Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold">
                  Computational Intelligence Lab
                </span>
                <span className="block text-sm opacity-70">
                  University of Technology
                </span>
              </div>
            </Link>
            <p className="text-sm opacity-80 mb-6 max-w-md">
              Advancing the frontiers of artificial intelligence and machine learning
              through fundamental research and impactful applications.
            </p>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Room 401, Computer Science Building</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:ci-lab@university.edu" className="hover:opacity-100 transition-opacity">
                  ci-lab@university.edu
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
            <p>© {new Date().getFullYear()} Computational Intelligence Lab. All rights reserved.</p>
            <p>Part of the Department of Computer Science</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
