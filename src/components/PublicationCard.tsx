import { useState } from 'react';
import { Publication } from '@/data/publications';
import { FileText, ExternalLink, Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const [showBibtex, setShowBibtex] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyBibtex = async () => {
    if (publication.bibtex) {
      await navigator.clipboard.writeText(publication.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group p-5 rounded-xl border border-border bg-card hover:shadow-card transition-all duration-300">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="hidden sm:flex w-10 h-10 rounded-lg bg-accent items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {publication.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-2">
            {publication.authors.join(', ')}
          </p>

          <p className="text-sm mb-3">
            <span className="font-medium text-foreground">{publication.venue}</span>
            <span className="text-muted-foreground"> · {publication.year}</span>
          </p>

          {publication.abstract && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {publication.abstract}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {publication.pdfUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-3.5 h-3.5 mr-1.5" />
                  PDF
                </a>
              </Button>
            )}
            {publication.doiUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={publication.doiUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  DOI
                </a>
              </Button>
            )}
            {publication.codeUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={publication.codeUrl} target="_blank" rel="noopener noreferrer">
                  <Code className="w-3.5 h-3.5 mr-1.5" />
                  Code
                </a>
              </Button>
            )}
            {publication.bibtex && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBibtex(!showBibtex)}
              >
                BibTeX
              </Button>
            )}
          </div>

          {/* BibTeX */}
          {showBibtex && publication.bibtex && (
            <div className="mt-4 relative">
              <pre className="p-4 bg-muted rounded-lg text-xs overflow-x-auto">
                <code>{publication.bibtex}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={copyBibtex}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
