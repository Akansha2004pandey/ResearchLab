import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Section, SectionHeader } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { researchAreas } from '@/data/research';
import { publications } from '@/data/publications';
import { events } from '@/data/events';
import { news } from '@/data/news';
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Calendar, 
  Sparkles,
  Brain,
  MessageSquare,
  Eye,
  Bot,
  Shield,
  Heart
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

const iconMap: Record<string, React.ElementType> = {
  Brain, MessageSquare, Eye, Bot, Shield, Heart
};

export default function HomePage() {
  const featuredPublications = publications.filter(p => p.featured).slice(0, 3);
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);
  const latestNews = news.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center hero-gradient overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-20 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">University of Technology</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground mb-6 animate-fade-in-up stagger-1">
              Computational<br />
              <span className="gradient-text">Intelligence Lab</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in-up stagger-2">
              Advancing the frontiers of artificial intelligence through fundamental research 
              and impactful applications. We build intelligent systems that understand, reason, and learn.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-3">
              <Button size="lg" asChild>
                <Link to="/research">
                  Explore Research
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Join Our Lab</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up stagger-4">
              {[
                { value: '50+', label: 'Publications' },
                { value: '15+', label: 'Team Members' },
                { value: '$10M+', label: 'Research Funding' },
                { value: '6', label: 'Research Areas' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <Section>
        <SectionHeader
          title="Research Areas"
          subtitle="Exploring the frontiers of AI across multiple domains"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map((area, idx) => {
            const IconComponent = iconMap[area.icon] || Brain;
            return (
              <Link
                key={area.id}
                to="/research"
                className="group p-6 rounded-xl border border-border bg-card hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <IconComponent className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {area.shortDescription}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/research">
              View All Research
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Featured Publications */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Featured Publications"
          subtitle="Our latest contributions to the scientific community"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPublications.map((pub, idx) => (
            <div
              key={pub.id}
              className="group p-6 rounded-xl border border-border bg-card hover:shadow-card transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">{pub.venue}</span>
                <span className="text-xs text-muted-foreground">· {pub.year}</span>
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {pub.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {pub.authors.join(', ')}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/publications">
              View All Publications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section>
        <SectionHeader
          title="Upcoming Events"
          subtitle="Join us for seminars, workshops, and more"
        />
        {upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, idx) => (
              <Link
                key={event.id}
                to="/events"
                className="group p-6 rounded-xl border border-border bg-card hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {format(parseISO(event.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No upcoming events at the moment.</p>
        )}
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/events">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Latest News */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Latest News"
          subtitle="Stay updated with our achievements and announcements"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {latestNews.map((item, idx) => (
            <div
              key={item.id}
              className="group flex gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-card transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {item.image && (
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-xs text-muted-foreground">
                  {format(parseISO(item.date), 'MMM d, yyyy')}
                </span>
                <h3 className="font-heading font-semibold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/news">
              View All News
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="relative rounded-2xl overflow-hidden bg-primary p-8 md:p-12 lg:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="relative max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Join Our Research Team
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              We're always looking for talented researchers, PhD students, and collaborators 
              who share our passion for advancing AI. Explore opportunities to work with us.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">
                  <Users className="w-4 h-4 mr-2" />
                  Get in Touch
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/people">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
