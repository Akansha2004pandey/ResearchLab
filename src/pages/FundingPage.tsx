import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeader } from '@/components/Section';
import { grants, Grant } from '@/data/grants';
import { DollarSign, Calendar, User, Users, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

interface GrantCardProps {
  grant: Grant;
}

function GrantCard({ grant }: GrantCardProps) {
  const startDate = format(parseISO(grant.startDate + '-01'), 'MMM yyyy');
  const endDate = format(parseISO(grant.endDate + '-01'), 'MMM yyyy');

  return (
    <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-card transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full',
                grant.status === 'ongoing'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {grant.status === 'ongoing' ? (
                <>
                  <Clock className="w-3 h-3" />
                  Ongoing
                </>
              ) : (
                <>
                  <CheckCircle className="w-3 h-3" />
                  Completed
                </>
              )}
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {grant.title}
          </h3>
        </div>
        {grant.amount && (
          <div className="flex items-center gap-1.5 text-primary font-semibold">
            <DollarSign className="w-4 h-4" />
            {grant.amount.replace('$', '')}
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{grant.description}</p>

      <div className="grid gap-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-medium text-foreground">Agency:</span>
          {grant.agency}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {startDate} – {endDate}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="w-4 h-4" />
          <span>PI: {grant.pi}</span>
        </div>
        {grant.coPIs && grant.coPIs.length > 0 && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Co-PI(s): {grant.coPIs.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FundingPage() {
  const ongoingGrants = grants.filter(g => g.status === 'ongoing');
  const completedGrants = grants.filter(g => g.status === 'completed');

  const totalOngoing = ongoingGrants.reduce((sum, g) => {
    const amount = g.amount ? parseFloat(g.amount.replace(/[$,]/g, '')) : 0;
    return sum + amount;
  }, 0);

  return (
    <Layout>
      <PageHeader
        title="Funding & Grants"
        subtitle="Our research is supported by funding from federal agencies, foundations, and industry partners."
      />

      {/* Stats */}
      <Section className="border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: ongoingGrants.length.toString(), label: 'Active Grants' },
            { value: `$${(totalOngoing / 1000000).toFixed(1)}M+`, label: 'Ongoing Funding' },
            { value: completedGrants.length.toString(), label: 'Completed Grants' },
            { value: '7', label: 'Funding Partners' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Ongoing Grants */}
      <Section>
        <SectionHeader
          title="Ongoing Grants"
          subtitle="Current research projects and their funding sources"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {ongoingGrants.map((grant, idx) => (
            <div
              key={grant.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <GrantCard grant={grant} />
            </div>
          ))}
        </div>
      </Section>

      {/* Completed Grants */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Completed Grants"
          subtitle="Successfully completed research projects"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {completedGrants.map((grant, idx) => (
            <div
              key={grant.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <GrantCard grant={grant} />
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
