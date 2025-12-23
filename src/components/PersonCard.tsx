import { Person } from '@/data/people';
import { Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonCardProps {
  person: Person;
  featured?: boolean;
}

export function PersonCard({ person, featured = false }: PersonCardProps) {
  return (
    <div
      className={cn(
        'group card-gradient rounded-xl border border-border shadow-card hover-lift overflow-hidden',
        featured && 'lg:flex lg:items-start'
      )}
    >
      <div className={cn('relative overflow-hidden', featured ? 'lg:w-80 lg:flex-shrink-0' : 'aspect-[4/3]')}>
        <img
          src={person.image}
          alt={person.name}
          className={cn(
            'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
            featured ? 'aspect-square lg:aspect-auto lg:h-full' : ''
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className={cn('p-5', featured && 'lg:p-8 lg:flex-1')}>
        <h3 className={cn('font-heading font-semibold text-foreground mb-1', featured ? 'text-2xl' : 'text-lg')}>
          {person.name}
        </h3>
        <p className="text-primary font-medium text-sm mb-3">{person.role}</p>
        
        <p className={cn('text-muted-foreground text-sm mb-4', featured ? 'line-clamp-4' : 'line-clamp-2')}>
          {person.bio}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {person.researchInterests.slice(0, featured ? 4 : 3).map((interest) => (
            <span
              key={interest}
              className="px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
          {person.googleScholar && (
            <a
              href={person.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Google Scholar"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {person.website && (
            <a
              href={person.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
