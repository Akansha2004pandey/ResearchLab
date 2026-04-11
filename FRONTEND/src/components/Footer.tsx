import { Link } from 'react-router-dom';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

const quickLinks = [
  { href: '/people', label: 'People' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/timeline', label: 'Lab timeline' },
  { href: '/awards', label: 'Awards' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://ankursynon.github.io/', label: 'Lab Website' },
  { href: 'https://scholar.google.com/citations?user=097-HeYAAAAJ', label: 'Google Scholar' },
  { href: 'https://github.com/ankursynon', label: 'GitHub' },
  { href: 'https://x.com/ankursynon', label: 'Twitter/X' },
  { href: 'https://www.linkedin.com/in/ankursynon', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/35">
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/12 text-sm font-semibold text-primary">
                NG
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Next Gen AI Lab</p>
                <p className="text-sm text-muted-foreground">Netaji Subhas University of Technology, Delhi</p>
              </div>
            </Link>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              The lab develops machine learning methods and practical systems in language processing,
              computer vision, and responsible AI.
            </p>

            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>NSUT Campus, New Delhi</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:ankur.gupta@nsut.ac.in" className="transition-colors hover:text-foreground">
                  ankur.gupta@nsut.ac.in
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-base font-medium text-foreground">Quick links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-base font-medium text-foreground">Profiles</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-border/70 pt-4 text-sm text-muted-foreground">
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <p>© {new Date().getFullYear()} Next Gen AI Lab</p>
            <p>Department of Computer Science, NSUT Delhi</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
