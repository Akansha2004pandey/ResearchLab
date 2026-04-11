import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  useEvents,
  useGrants,
  useNews,
  usePeople,
  usePublications,
  useResearchAreas,
} from '@/hooks/useLabData';
import { researchAreas as fallbackResearchAreas } from '@/data/research';
import { people as fallbackPeople } from '@/data/people';
import { publications as fallbackPublications } from '@/data/publications';
import { events as fallbackEvents } from '@/data/events';
import { grants as fallbackGrants } from '@/data/grants';
import { news as fallbackNews } from '@/data/news';

const TIMELINE_START_DATE = '2023-02-01';

function parseGrantAmount(amount?: string): number {
  if (!amount) return 0;
  const value = Number.parseFloat(amount.replace(/[^\d.]/g, ''));
  return Number.isFinite(value) ? value : 0;
}

function formatDate(value: string): string {
  try {
    return format(parseISO(value), 'MMM d, yyyy');
  } catch {
    return value;
  }
}

function sectionMotion(delay = 0) {
  return {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.35, delay },
  };
}

export default function HomePage() {
  const { data: researchAreas = [] } = useResearchAreas();
  const { data: people = [] } = usePeople();
  const { data: publications = [] } = usePublications();
  const { data: events = [] } = useEvents();
  const { data: grants = [] } = useGrants();
  const { data: news = [] } = useNews();

  const researchItems = (researchAreas.length ? researchAreas : fallbackResearchAreas).slice(0, 6);
  const peopleItems = (people.length ? people : fallbackPeople)
    .filter((member) => member.category !== 'alumni')
    .slice(0, 12);
  const publicationItems = (publications.length ? publications : fallbackPublications).slice(0, 5);
  const timelineSource = (events.length ? events : fallbackEvents)
    .filter((event) => event.date >= TIMELINE_START_DATE);
  const upcomingEvents = timelineSource.filter((event) => event.status !== 'past').slice(0, 3);
  const eventItems = upcomingEvents.length > 0 ? upcomingEvents : timelineSource.slice(0, 3);
  const galleryItems = timelineSource
    .flatMap((event) => {
      const eventImages = event.images.length > 0
        ? event.images
        : event.posterImage
          ? [event.posterImage]
          : [];

      return eventImages.map((src, index) => ({
        id: `${event.id}-image-${index}`,
        src,
        alt: `${event.title} photo ${index + 1}`,
        caption: `${event.title} · ${formatDate(event.date)}`,
      }));
    })
    .slice(0, 9);

  const awardItems = (news.length ? news : fallbackNews)
    .filter((item) => item.category === 'award')
    .slice(0, 4);

  const rollingPeople = peopleItems.length > 0 ? [...peopleItems, ...peopleItems] : [];
  const rollingGallery = galleryItems.length > 0 ? [...galleryItems, ...galleryItems] : [];

  const grantItems = grants.length ? grants : fallbackGrants;
  const activeGrants = grantItems.filter((grant) => grant.status === 'ongoing').length;
  const fundingTotal = grantItems.reduce((sum, grant) => sum + parseGrantAmount(grant.amount), 0);
  const roundedFundingCrores = fundingTotal > 0 ? (fundingTotal / 10000000).toFixed(1) : '0.0';

  return (
    <Layout>
      <div className="bg-background">
        <section className="border-b border-border/60 pb-10 pt-20 md:pb-12 md:pt-24">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-8">
            <motion.div {...sectionMotion()}>
              <p className="text-sm text-muted-foreground">Netaji Subhas University of Technology, Delhi</p>
              <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Next Gen AI Lab
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                We conduct research in machine learning, language technologies, computer vision, and responsible AI.
                Our work combines theory with practical systems that support education, healthcare, and public impact.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/research">
                    Explore Research
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Join Lab</Link>
                </Button>
              </div>
            </motion.div>

            <motion.aside
              {...sectionMotion(0.08)}
              className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
            >
              <h2 className="text-lg font-medium text-foreground">At a glance</h2>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-baseline justify-between border-b border-border/70 pb-3">
                  <span className="text-muted-foreground">Research areas</span>
                  <span className="text-xl font-semibold text-foreground">{researchItems.length}</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border/70 pb-3">
                  <span className="text-muted-foreground">Lab members</span>
                  <span className="text-xl font-semibold text-foreground">{peopleItems.length}</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border/70 pb-3">
                  <span className="text-muted-foreground">Active grants</span>
                  <span className="text-xl font-semibold text-foreground">{activeGrants}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground">Current funding</span>
                  <span className="text-xl font-semibold text-foreground">₹{roundedFundingCrores} Cr</span>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <motion.section {...sectionMotion()} className="py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Research areas</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  We work on methods and systems that improve reliability, interpretability, and real-world utility.
                </p>
              </div>
              <Link to="/research" className="text-sm text-primary transition-colors hover:text-primary/80">
                View all research areas
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {researchItems.map((area) => (
                <article
                  key={area.id}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <img src={area.image} alt={area.title} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-foreground">{area.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{area.shortDescription}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion()} className="border-y border-border/60 bg-muted/35 py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">People</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Faculty, researchers, and students working together on shared research goals.
                </p>
              </div>
              <Link to="/people" className="text-sm text-primary transition-colors hover:text-primary/80">
                View all members
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-3">
              <div className="flex w-max gap-4 animate-marquee">
                {rollingPeople.map((person, index) => (
                  <article
                    key={`${person.id}-${index}`}
                    className="w-[270px] shrink-0 rounded-2xl border border-border/70 bg-card p-3"
                  >
                    <img
                      src={person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=dbeafe&color=1e3a8a&size=256`}
                      alt={person.name}
                      className="h-36 w-full rounded-xl object-cover"
                    />
                    <h3 className="mt-3 text-base font-medium text-foreground line-clamp-1">{person.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{person.role}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion()} className="border-y border-border/60 bg-muted/35 py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Awards and Recognition</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Recognitions earned by the lab and its members across conferences and academia.
                </p>
              </div>
              <Link to="/awards" className="text-sm text-primary transition-colors hover:text-primary/80">
                View all awards
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {awardItems.map((award) => (
                <article
                  key={award.id}
                  className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <p className="text-xs text-muted-foreground">{formatDate(award.date)}</p>
                  <h3 className="mt-1 text-lg font-medium text-foreground">{award.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{award.description}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion()} className="py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Publications</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Recent papers and reports from the lab across conferences and journals.
                </p>
              </div>
              <Link to="/publications" className="text-sm text-primary transition-colors hover:text-primary/80">
                View all publications
              </Link>
            </div>

            <div className="space-y-3">
              {publicationItems.map((publication) => (
                <article
                  key={publication.id}
                  className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <p className="text-xs text-muted-foreground">
                    {publication.venue} · {publication.year}
                  </p>
                  <h3 className="mt-1 text-lg font-medium text-foreground">{publication.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {publication.authors.slice(0, 4).join(', ')}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion()} className="border-y border-border/60 bg-muted/35 py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Events</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Seminars, workshops, and outreach sessions hosted by the lab.
                </p>
              </div>
              <Link to="/timeline" className="text-sm text-primary transition-colors hover:text-primary/80">
                View full timeline
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {eventItems.map((event) => (
                <article
                  key={event.id}
                  className="rounded-2xl border border-border/70 bg-background p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                  <h3 className="mt-2 text-lg font-medium text-foreground">{event.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{event.venue}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion()} className="py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Gallery</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Moments from lab life, events, and project activities.
                </p>
              </div>
              <Link to="/timeline" className="text-sm text-primary transition-colors hover:text-primary/80">
                View full timeline
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-3">
              <div className="flex w-max gap-4 animate-marquee-slow">
                {rollingGallery.map((image, index) => (
                  <figure
                    key={`${image.id}-${index}`}
                    className="w-[300px] shrink-0 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
                  >
                    <img src={image.src} alt={image.alt} className="h-44 w-full object-cover" />
                    <figcaption className="p-3 text-sm text-muted-foreground line-clamp-2">{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
