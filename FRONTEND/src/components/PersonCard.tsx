import { Person } from '@/data/people';
import { Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonCardProps {
  person: Person;
  featured?: boolean;
}

export function PersonCard({ person, featured = false }: PersonCardProps) {
  const showPhoto = featured && Boolean(person.image);

  return (
    <div
      className={cn(
        'group exp-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
        showPhoto && 'lg:flex lg:items-start'
      )}
    >
      {showPhoto && (
        <div className="relative overflow-hidden lg:w-80 lg:flex-shrink-0">
          <img
            src={person.image}
            alt={person.name}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 aspect-square lg:aspect-auto lg:h-full',
              person.imageClassName
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className={cn('p-5', showPhoto && 'lg:p-8 lg:flex-1')}>
        <h3 className={cn('font-heading font-semibold text-foreground mb-1', featured ? 'text-2xl' : 'text-lg')}>
          {person.name}
        </h3>
        <p className="text-primary font-medium text-sm mb-3">{person.role}</p>

        <p className={cn('text-muted-foreground text-sm', featured ? 'line-clamp-4 mb-4' : 'line-clamp-3')}>
          {person.bio}
        </p>

        {featured && (
          <>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {person.researchInterests.slice(0, 4).map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-md"
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
          </>
        )}
      </div>
    </div>
  );
}
