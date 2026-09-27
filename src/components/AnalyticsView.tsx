import React, { useState } from 'react';
import { EventConfig } from '../types';

interface AnalyticsViewProps {
  currentEvent: EventConfig;
  onOpenExportModal: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ currentEvent, onOpenExportModal }) => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | 'all'>('7d');

  const dailyActivity = [
    { day: 'Mon', posts: 65, reach: '9.8K' },
    { day: 'Tue', posts: 110, reach: '18.2K' },
    { day: 'Wed', posts: 195, reach: '31.4K' },
    { day: 'Thu', posts: 240, reach: '44.0K' },
    { day: 'Fri', posts: 232, reach: '25.0K' },
  ];

  const maxPosts = Math.max(...dailyActivity.map(d => d.posts));

  const hashtagStats = [
    { tag: currentEvent.hashtags[0] || '#GoogleH2S', posts: 774, share: '92%', reach: '118.2K', status: 'Trending' },
    { tag: currentEvent.hashtags[1] || '#GoogleDevelopers', posts: 648, share: '77%', reach: '98.5K', status: 'Top Tag' },
    { tag: currentEvent.hashtags[2] || '#TechBootcamp2025', posts: 412, share: '49%', reach: '62.0K', status: 'Active' },
    { tag: currentEvent.hashtags[3] || '#CloudSkills', posts: 388, share: '46%', reach: '58.4K', status: 'Active' },
  ];

  return (
    <div className="flex flex-col w-full space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary/10 text-primary-container">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </span>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              Reach & Engagement Analytics
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Real-time attribution data for <strong className="text-on-surface">{currentEvent.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-surface-container-low p-1 border border-outline-variant/40">
            {(['24h', '7d', 'all'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                  timeRange === r
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenExportModal}
            className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/30">
          <span className="font-label-md text-label-md text-on-surface-variant">Cumulative LinkedIn Reach</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-display font-extrabold text-on-surface">128.4K</span>
            <span className="text-tertiary font-label-sm font-semibold flex items-center">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              +38%
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Target 100K achieved in 4 days</p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/30">
          <span className="font-label-md text-label-md text-on-surface-variant">Attendee Author Conversion</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-display font-extrabold text-on-surface">59.3%</span>
            <span className="text-tertiary font-label-sm font-semibold flex items-center">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              +12%
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">842 authors out of 1,420 unique visits</p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/30">
          <span className="font-label-md text-label-md text-on-surface-variant">Post Quality Score</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-display font-extrabold text-tertiary">4.9<span className="text-lg font-medium">/5</span></span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold">Top 1%</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Measured by read-through & comment engagement</p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/30">
          <span className="font-label-md text-label-md text-on-surface-variant">Total Event Media Shared</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-display font-extrabold text-primary-container">142</span>
            <span className="text-tertiary font-label-sm font-semibold">+47% reach</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Photos of demos, badges, and teams</p>
        </div>
      </section>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Posts Trajectory Chart (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Daily Posts Published Trajectory
            </h2>
            <span className="text-xs text-on-surface-variant">Total: {currentEvent.postsCount} posts</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-6 pb-2">
            <div className="flex items-end justify-between gap-4 h-52 px-2">
              {dailyActivity.map((item) => {
                const heightPercent = Math.round((item.posts / maxPosts) * 100);
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-xs font-bold text-on-surface opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.posts}
                    </span>
                    <div className="w-full bg-surface-container-low rounded-t-lg h-40 flex items-end overflow-hidden">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-primary-container group-hover:bg-primary transition-all rounded-t-lg relative"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      {item.day}
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-mono">
                      {item.reach}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tone & Role Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-5">
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Tone of Voice Distribution
          </h2>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-on-surface">Key Takeaways</span>
                <span className="text-primary font-bold">41% (345 posts)</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-primary-container h-2 rounded-full w-[41%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-on-surface">Grateful Attendee</span>
                <span className="text-tertiary font-bold">32% (269 posts)</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-tertiary-container h-2 rounded-full w-[32%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-on-surface">Thought Leader</span>
                <span className="text-secondary font-bold">16% (135 posts)</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full w-[16%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-on-surface">Attendee Hype</span>
                <span className="text-on-surface-variant font-bold">11% (93 posts)</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-outline h-2 rounded-full w-[11%]"></div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-outline-variant/30">
            <h3 className="font-label-md text-label-md font-bold text-on-surface mb-2">Attendee Demographics</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface">
                42% Software Engineers
              </span>
              <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface">
                28% ML/AI Fellows
              </span>
              <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface">
                18% Cloud Architects
              </span>
              <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface">
                12% Students
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hashtags Performance Table */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          Hashtag Virality & Reach Impact
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md">
            <thead>
              <tr className="bg-surface-container-low/60 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Hashtag</th>
                <th className="py-3 px-4">Posts Included</th>
                <th className="py-3 px-4">Cohort Share</th>
                <th className="py-3 px-4">LinkedIn Impressions</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Trend Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60">
              {hashtagStats.map((item) => (
                <tr key={item.tag} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-primary">
                    {item.tag}
                  </td>
                  <td className="py-3.5 px-4 text-on-surface">{item.posts}</td>
                  <td className="py-3.5 px-4 text-on-surface">{item.share}</td>
                  <td className="py-3.5 px-4 font-bold text-on-surface">{item.reach}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
