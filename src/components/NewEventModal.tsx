import React, { useState } from 'react';
import { EventConfig } from '../types';
import { ASSETS } from '../data/mockData';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newEvent: EventConfig) => void;
}

export const NewEventModal: React.FC<NewEventModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [date, setDate] = useState('April 2025');
  const [tagInput, setTagInput] = useState('');
  const [hashtags, setHashtags] = useState<string[]>(['#TechSummit', '#Innovation', '#DevPulse']);
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/company/');
  const [twitterUrl, setTwitterUrl] = useState('https://x.com/');
  const [guidancePrompt, setGuidancePrompt] = useState('Learned advanced architecture, connected with community peers, and built cutting-edge software solutions.');

  if (!isOpen) return null;

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const formatted = tagInput.startsWith('#') ? tagInput.trim() : `#${tagInput.trim()}`;
    if (!hashtags.includes(formatted)) {
      setHashtags([...hashtags, formatted]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newEvent: EventConfig = {
      id: slug || `event-${Date.now()}`,
      name: name.trim(),
      organizer: organizer.trim() || 'Tech Organizers',
      location,
      date,
      hashtags,
      linkedinUrl,
      twitterUrl,
      websiteUrl: 'https://eventpulse.ai/events/' + slug,
      guidancePrompt,
      bannerImage: ASSETS.hackathonTeam,
      postsCount: 0,
      photosCount: 0,
      qualityScore: 5.0,
      shareSlug: slug
    };

    onSave(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">add_circle</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Create New Event</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md text-on-surface font-semibold">
                Event Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. AI DevDay 2025"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md text-on-surface font-semibold">
                Host / Organizer *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Acme Tech"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md text-on-surface font-semibold">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md text-on-surface font-semibold">
                Date / Timeframe
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface font-semibold">
              Official Event Hashtags
            </label>
            <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-wrap items-center gap-2">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 text-primary-container font-label-md text-label-md font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-primary focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="#newtag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="px-2.5 py-1 text-sm bg-surface-container-lowest rounded-md outline-none w-28"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="p-1 rounded-md bg-surface-container text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Guidance */}
          <div className="space-y-1.5">
            <label className="block font-label-md text-label-md text-on-surface font-semibold">
              AI Generation Guidance & Key Takeaways Hint
            </label>
            <textarea
              rows={3}
              value={guidancePrompt}
              onChange={(e) => setGuidancePrompt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-label-md text-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold shadow-xs"
            >
              Launch Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
