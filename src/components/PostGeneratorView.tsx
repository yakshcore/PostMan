import React, { useState } from 'react';
import { EventConfig } from '../types';
import { ASSETS } from '../data/mockData';
import { generateLinkedInPost } from '../utils/aiGenerator';

interface PostGeneratorViewProps {
  currentEvent: EventConfig;
}

export const PostGeneratorView: React.FC<PostGeneratorViewProps> = ({ currentEvent }) => {
  const [platform, setPlatform] = useState<'linkedin' | 'twitter'>('linkedin');
  const [topic, setTopic] = useState('Hackathon final demo and Google Cloud architecture recap');
  const [audience, setAudience] = useState('Recruiters & Engineering Peers');
  const [outputLength, setOutputLength] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [customInstructions, setCustomInstructions] = useState('Emphasize latency benchmarks, mentorship from Google Cloud staff, and open source contribution.');
  const [generatedResult, setGeneratedResult] = useState<string>(
    `🚀 From idea to live multi-agent deployment in 48 hours at #GoogleH2S!

Key engineering takeaways:
• Implemented Gemini 1.5 Pro function calling with strict JSON schemas
• Optimized container startup on Google Cloud Run to < 350ms
• Pair programmed with fellow fellows across 12 countries

Immense gratitude to @Google for Developers for fostering such an inspiring environment.

#GoogleH2S #GoogleDevelopers #CloudSkills #EngineeringExcellence`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateCustom = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      let draft = '';
      if (platform === 'twitter') {
        draft = `Just wrapped day 5 of ${currentEvent.name} with @${currentEvent.organizer}! 🚀\n\n• Shipped multi-agent architecture on Cloud Run\n• Sub-400ms inference loops\n• Amazing community energy\n\nBig thanks to our mentor squad! 💻✨\n\n${currentEvent.hashtags.slice(0, 3).join(' ')}`;
      } else {
        draft = `Reflecting on an exhilarating sprint at ${currentEvent.name} hosted by @${currentEvent.organizer} 🌟\n\nTargeting ${audience.toLowerCase()}:\n\n${customInstructions}\n\nKey Highlights:\n1. Architectural scalability and clean boundary contracts\n2. Real-time observability during multi-agent orchestration\n3. High-impact community mentorship from Google Staff engineers\n\nLooking forward to deploying these skills to solve high-scale challenges!\n\n${currentEvent.hashtags.join(' ')}`;
      }
      setGeneratedResult(draft);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary/10 text-primary-container">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </span>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              AI Post Studio
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Author customized thought leadership posts tailored for different audiences and distribution channels.
          </p>
        </div>

        {/* Platform Selector */}
        <div className="flex items-center p-1 rounded-xl bg-surface-container-low border border-outline-variant/40 shrink-0">
          <button
            onClick={() => setPlatform('linkedin')}
            className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              platform === 'linkedin'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-4 h-4 rounded bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold">
              in
            </span>
            <span>LinkedIn Post</span>
          </button>
          <button
            onClick={() => setPlatform('twitter')}
            className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              platform === 'twitter'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-4 h-4 rounded bg-on-surface text-surface-container-lowest flex items-center justify-center text-[10px] font-bold">
              𝕏
            </span>
            <span>X / Thread</span>
          </button>
        </div>
      </section>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Parameters (6 cols) */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Generation Parameters
            </h2>
            <span className="text-label-sm font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Gemini 3.8 Flash
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block font-label-md text-label-md font-semibold text-on-surface">
              Core Topic / Milestone
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary border border-outline-variant/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md font-semibold text-on-surface">
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary border border-outline-variant/40 cursor-pointer"
              >
                <option value="Recruiters & Engineering Peers">Recruiters & Peers</option>
                <option value="Founders & Investors">Founders & Investors</option>
                <option value="Open Source Community">Open Source Community</option>
                <option value="Technical Hiring Managers">Technical Hiring Managers</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md font-semibold text-on-surface">
                Target Length
              </label>
              <div className="flex rounded-lg bg-surface-container-low p-1 border border-outline-variant/40">
                {(['short', 'medium', 'detailed'] as const).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setOutputLength(len)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                      outputLength === len
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-label-md text-label-md font-semibold text-on-surface">
              Custom Directives & Mentions
            </label>
            <textarea
              rows={3}
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary border border-outline-variant/40 resize-none leading-relaxed"
            />
          </div>

          {/* Hashtag Preview */}
          <div className="space-y-1.5">
            <label className="block font-label-md text-label-md font-semibold text-on-surface">
              Active Event Tags (Auto-Injected)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {currentEvent.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-secondary-container/20 text-on-secondary-container text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateCustom}
            disabled={isGenerating}
            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[20px] ${isGenerating ? 'animate-spin' : ''}`}>
              {isGenerating ? 'refresh' : 'auto_awesome'}
            </span>
            <span>{isGenerating ? 'Drafting with EventPulse AI...' : 'Draft Tailored Post'}</span>
          </button>
        </div>

        {/* Right Output: Formatted Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">preview</span>
                Generated {platform === 'linkedin' ? 'LinkedIn' : 'X/Twitter'} Draft
              </span>
              <span className="text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                Ready to Publish
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface whitespace-pre-line leading-relaxed min-h-[220px]">
              {generatedResult}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className={`px-4 py-2.5 rounded-xl font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copied
                    ? 'bg-tertiary-container text-white'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>

              <a
                href={
                  platform === 'linkedin'
                    ? `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(generatedResult)}`
                    : `https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedResult)}`
                }
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <span>Publish to {platform === 'linkedin' ? 'LinkedIn' : 'X'}</span>
                <span className="material-symbols-outlined text-[18px]">launch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
