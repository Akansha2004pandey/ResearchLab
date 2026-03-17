import { useState } from 'react';
import { ResearchArea } from '@/data/research';
import { ChevronDown, Brain, MessageSquare, Eye, Bot, Shield, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  MessageSquare,
  Eye,
  Bot,
  Shield,
  Heart,
};

interface ResearchCardProps {
  area: ResearchArea;
}

export function ResearchCard({ area }: ResearchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[area.icon] || Brain;

  return (
    <div className="group card-gradient rounded-xl border border-border shadow-card overflow-hidden hover-lift">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={area.image}
          alt={area.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-background">
            <div className="w-10 h-10 rounded-lg bg-primary/90 flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-xl font-semibold">{area.title}</h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-muted-foreground text-sm mb-4">{area.shortDescription}</p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          {isExpanded ? 'Show less' : 'Learn more'}
          <ChevronDown
            className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')}
          />
        </button>

        {/* Expanded Content */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            isExpanded ? 'max-h-[600px] mt-4' : 'max-h-0'
          )}
        >
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Overview</h4>
              <p className="text-sm text-muted-foreground">{area.fullDescription}</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Methodology</h4>
              <p className="text-sm text-muted-foreground">{area.methodology}</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Key Contributions</h4>
              <ul className="space-y-1.5">
                {area.contributions.map((contribution, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {contribution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
