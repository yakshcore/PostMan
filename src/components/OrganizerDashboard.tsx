import React, { useState } from 'react';
import { EventConfig, CommunityPost, ActiveTab } from '../types';

interface OrganizerDashboardProps {
  currentEvent: EventConfig;
  onUpdateEvent: (updated: EventConfig) => void;
  onResetEvent: () => void;
  posts: CommunityPost[];
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQRModal: () => void;
  onOpenExportModal: () => void;
  onOpenNewEventModal: () => void;
  onViewPost: (post: CommunityPost) => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({
  currentEvent,
  onUpdateEvent,
  onResetEvent,
  posts,
  setActiveTab,
  onOpenQRModal,
  onOpenExportModal,
  onOpenNewEventModal,
  onViewPost
}) => {
  // Form State
  const [eventName, setEventName] = useState(currentEvent.name);
  const [organizerName, setOrganizerName] = useState(currentEvent.organizer);
  const [hashtags, setHashtags] = useState<string[]>(currentEvent.hashtags);
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState(currentEvent.linkedinUrl);
  const [twitterUrl, setTwitterUrl] = useState(currentEvent.twitterUrl);
  const [websiteUrl, setWebsiteUrl] = useState(currentEvent.websiteUrl);
  const [guidancePrompt, setGuidancePrompt] = useState(currentEvent.guidancePrompt);

  // Status & Feedback States
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Search & Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilterTone, setSelectedFilterTone] = useState<string>('all');
  const [showToneFilterDropdown, setShowToneFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle Event Switching sync
  React.useEffect(() => {
    setEventName(currentEvent.name);
    setOrganizerName(currentEvent.organizer);
    setHashtags(currentEvent.hashtags);
    setLinkedinUrl(currentEvent.linkedinUrl);
    setTwitterUrl(currentEvent.twitterUrl);
    setWebsiteUrl(currentEvent.websiteUrl);
    setGuidancePrompt(currentEvent.guidancePrompt);
  }, [currentEvent]);

  // Hashtag operations
  const handleRemoveHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
  };

  const handleAddHashtag = () => {
    if (!newTagInput.trim()) return;
    const tag = newTagInput.startsWith('#') ? newTagInput.trim() : `#${newTagInput.trim()}`;
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
    setNewTagInput('');
    setShowAddTag(false);
  };

  // Save changes handler
  const handleSaveChanges = () => {
    setSaving(true);
    setTimeout(() => {
      onUpdateEvent({
        ...currentEvent,
        name: eventName,
        organizer: organizerName,
        hashtags,
        linkedinUrl,
        twitterUrl,
        websiteUrl,
        guidancePrompt,
      });
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }, 600);
  };

  // Copy shareable link
  const attendeeLink = `https://eventpulse.ai/attendee/${currentEvent.shareSlug}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(attendeeLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Copy post snippet
  const handleCopyPost = (post: CommunityPost) => {
    navigator.clipboard.writeText(post.fullContent);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.fullContent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTone =
      selectedFilterTone === 'all' || post.tone === selectedFilterTone;
    return matchesSearch && matchesTone;
  });

  return (
    <div className="flex flex-col w-full space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Quick Actions Bar */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Welcome back, Sarah 👋
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-tertiary/10 text-tertiary font-semibold">
              Pro Organizer Plan
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage your events, attendee engagement links, and viral social reach in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Live Event Switcher Badge Button */}
          <div
            onClick={onOpenNewEventModal}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all cursor-pointer border border-outline-variant/30"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary-container"></span>
            </span>
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium leading-none">Active Event</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight truncate max-w-[150px] sm:max-w-[200px]">
                {currentEvent.name}
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">keyboard_arrow_down</span>
          </div>

          {/* Export Analytics Button */}
          <button
            onClick={onOpenExportModal}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-lowest shadow-sm font-label-lg text-label-lg text-on-surface hover:bg-surface-container hover:text-primary transition-all cursor-pointer border border-outline-variant/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">download</span>
            Export Analytics
          </button>

          {/* New Event Button */}
          <button
            onClick={onOpenNewEventModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container font-label-lg text-label-lg text-on-primary font-semibold shadow-sm hover:bg-primary transition-all active:scale-[0.99] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Event
          </button>
        </div>
      </section>

      {/* Metrics Grid (High Impact SaaS Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Posts */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Total Posts Generated</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-display text-on-surface font-extrabold tracking-tight">
              {currentEvent.postsCount}
            </span>
            <span className="inline-flex items-center gap-0.5 text-label-sm font-label-sm text-tertiary font-semibold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              +24%
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
            <span>vs. 680 yesterday</span>
            <span className="font-medium text-primary">Peak 2:30 PM</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-primary-container h-1 rounded-full w-4/5"></div>
          </div>
        </div>

        {/* Metric 2: Reach */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">LinkedIn Impressions Reach</span>
            <div className="w-9 h-9 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-display text-on-surface font-extrabold tracking-tight">128.4K</span>
            <span className="inline-flex items-center gap-0.5 text-label-sm font-label-sm text-tertiary font-semibold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              +38%
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
            <span>Target: 100K reached</span>
            <span className="font-semibold text-tertiary">Goal Met</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-tertiary-container h-1 rounded-full w-full"></div>
          </div>
        </div>

        {/* Metric 3: Generator Visits */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Attendee Generator Visits</span>
            <div className="w-9 h-9 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-display text-on-surface font-extrabold tracking-tight">1,420</span>
            <span className="inline-flex items-center gap-0.5 text-label-sm font-label-sm text-on-surface font-semibold bg-surface-container px-1.5 py-0.5 rounded">
              59.3% conv.
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
            <span>From QR badges & slides</span>
            <span>842 authors</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-primary-container h-1 rounded-full w-3/5"></div>
          </div>
        </div>

        {/* Metric 4: Top Tag Activity */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Top Tag Activity</span>
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">tag</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-primary-container font-extrabold tracking-tight truncate">
              {currentEvent.hashtags[0] || '#GoogleH2S'}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
            <span>92% of posts included</span>
            <span className="font-medium text-tertiary">Viral trend</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-primary-container h-1 rounded-full w-[92%]"></div>
          </div>
        </div>
      </section>

      {/* Two-Column Workspace (Authoring Config & Live Event Distribution Rail) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Column A: Event Social Configuration Form (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 sm:p-7 shadow-sm space-y-6 border border-outline-variant/30">
          <div className="flex items-start justify-between gap-4 pb-4 bg-surface-container-low/40 -mx-6 sm:-mx-7 -mt-6 sm:-mt-7 p-6 sm:p-7 rounded-t-xl border-b border-outline-variant/20">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-[22px]">tune</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Event Details & Social Configuration
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Configure the parameters attendees will automatically see and inherit when generating their LinkedIn posts.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm shrink-0 font-medium">
              Auto-Sync On
            </span>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
            {/* Event Name & Organizer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="event-name">
                  Event Name
                </label>
                <input
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-xs border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary-container/20 transition-all placeholder:text-outline"
                  id="event-name"
                  placeholder="e.g. NextGen AI Summit 2025"
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="organizer-name">
                  Organizer / Host Name
                </label>
                <input
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-xs border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary-container/20 transition-all placeholder:text-outline"
                  id="organizer-name"
                  placeholder="e.g. Acme Cloud Corp"
                  type="text"
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                />
              </div>
            </div>

            {/* Official Hashtags */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-label-md text-label-md text-on-surface font-semibold">
                  Official Event Hashtags
                </label>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Recommended: 3-5 tags</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low min-h-[52px] flex flex-wrap items-center gap-2 border border-outline-variant/30">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 text-primary-container font-label-md text-label-md font-medium"
                  >
                    {tag}
                    <button
                      className="hover:text-primary transition-colors focus:outline-none cursor-pointer"
                      title="Remove hashtag"
                      type="button"
                      onClick={() => handleRemoveHashtag(tag)}
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}

                {showAddTag ? (
                  <div className="inline-flex items-center gap-1 bg-surface-container-lowest rounded-full px-2 py-0.5 border border-primary">
                    <input
                      type="text"
                      placeholder="#tag"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddHashtag();
                        } else if (e.key === 'Escape') {
                          setShowAddTag(false);
                        }
                      }}
                      autoFocus
                      className="outline-none text-xs w-24 bg-transparent font-medium"
                    />
                    <button
                      type="button"
                      onClick={handleAddHashtag}
                      className="text-primary hover:text-primary-container font-bold text-xs"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddTag(true)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium shadow-xs transition-colors cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    Add tag
                  </button>
                )}
              </div>
            </div>

            {/* Social URLs */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="linkedin-url">
                  LinkedIn Company / Page URL
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 flex items-center justify-center w-5 h-5 rounded bg-[#0A66C2] text-white font-bold text-[11px] select-none">
                    in
                  </span>
                  <input
                    className="w-full pl-11 pr-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-xs border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary-container/20 transition-all"
                    id="linkedin-url"
                    placeholder="https://linkedin.com/company/your-brand"
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="twitter-url">
                    X / Twitter URL or Handle
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 flex items-center justify-center w-5 h-5 rounded bg-on-surface text-surface-container-lowest font-bold text-[11px] select-none">
                      𝕏
                    </span>
                    <input
                      className="w-full pl-11 pr-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-xs border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary-container/20 transition-all"
                      id="twitter-url"
                      placeholder="https://x.com/yourhandle"
                      type="text"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="website-url">
                    Event Website / Landing Page
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px]">
                      link
                    </span>
                    <input
                      className="w-full pl-11 pr-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-xs border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary-container/20 transition-all"
                      id="website-url"
                      placeholder="https://your-event.com"
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Guidance / Key Takeaways */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="prompt-guidance">
                  AI Generation Guidance & Key Takeaways Hint
                </label>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Default context for attendees</span>
              </div>
              <textarea
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-xs border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary-container/20 transition-all leading-relaxed"
                id="prompt-guidance"
                rows={3}
                value={guidancePrompt}
                onChange={(e) => setGuidancePrompt(e.target.value)}
              />
              <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-primary-container">info</span>
                Attendees can customize this, but our AI will inject these talking points into their initial drafted post.
              </p>
            </div>

            {/* Form Actions Footer */}
            <div className="pt-3 flex items-center justify-between border-t border-outline-variant/30">
              <button
                className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-variant font-label-lg text-label-lg text-on-surface-variant transition-colors cursor-pointer"
                type="button"
                onClick={onResetEvent}
              >
                Reset Defaults
              </button>
              <div className="flex items-center gap-3">
                {saveSuccess && (
                  <span className="text-tertiary font-label-md text-label-md flex items-center gap-1 animate-in fade-in">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Changes saved!
                  </span>
                )}
                <button
                  className="px-5 py-2.5 rounded-lg bg-primary-container font-label-lg text-label-lg text-on-primary font-semibold shadow-sm hover:bg-primary transition-all active:scale-[0.99] flex items-center gap-2 cursor-pointer"
                  id="save-changes-btn"
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={saving}
                >
                  <span className={`material-symbols-outlined text-[18px] ${saving ? 'animate-spin' : ''}`}>
                    {saving ? 'refresh' : 'save'}
                  </span>
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Column B: Live Event Overview & Distribution Rail (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Event Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
            {/* Event Banner Image */}
            <div className="relative h-40 w-full overflow-hidden">
              <img
                alt={currentEvent.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                src={currentEvent.bannerImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs text-tertiary font-label-sm text-label-sm font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                  Live Event Now
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold drop-shadow-xs">
                  {currentEvent.name}
                </h3>
                <p className="font-body-sm text-body-sm text-inverse-on-surface opacity-90 truncate">
                  {currentEvent.organizer} · {currentEvent.location}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Active Tags Array */}
              <div className="flex flex-wrap gap-1.5">
                {currentEvent.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Social External Shortcuts */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <a
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors"
                  href={currentEvent.linkedinUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="w-3.5 h-3.5 rounded bg-[#0A66C2] text-white flex items-center justify-center text-[9px] font-bold">
                    in
                  </span>
                  Company Page
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
                <a
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors"
                  href={currentEvent.twitterUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>𝕏</span>
                  Handle
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
                <a
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors"
                  href={currentEvent.websiteUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  Website
                </a>
              </div>

              {/* Mini Dashboard Stats Grid */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-surface-container-low text-center border border-outline-variant/20">
                <div className="space-y-0.5">
                  <span className="font-headline-sm text-headline-sm text-primary-container font-bold">
                    {currentEvent.postsCount}
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Posts published</p>
                </div>
                <div className="space-y-0.5">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {currentEvent.photosCount}
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Photos added</p>
                </div>
                <div className="space-y-0.5">
                  <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
                    {currentEvent.qualityScore}
                    <span className="text-label-sm font-medium">/5</span>
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Quality score</p>
                </div>
              </div>

              {/* Shareable Attendee Generator Link Card Box */}
              <div className="p-4 rounded-xl bg-surface-container space-y-3 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-container text-[18px]">share</span>
                    Attendee Shareable Portal Link
                  </span>
                  <span className="text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    Active Link
                  </span>
                </div>

                {/* URL input + Copy */}
                <div className="flex items-center gap-2">
                  <input
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest font-body-sm text-body-sm text-on-surface truncate select-all focus:outline-none border border-outline-variant/40"
                    readOnly
                    type="text"
                    value={attendeeLink}
                  />
                  <button
                    className={`px-3 py-2 rounded-lg text-on-primary font-label-md text-label-md font-semibold transition-all shrink-0 flex items-center gap-1.5 active:scale-95 shadow-xs cursor-pointer ${
                      copiedLink ? 'bg-tertiary-container' : 'bg-primary-container hover:bg-primary'
                    }`}
                    type="button"
                    onClick={handleCopyLink}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedLink ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* QR code and Slide Action Row */}
                <div className="flex items-center gap-3 pt-1">
                  <div
                    onClick={onOpenQRModal}
                    className="w-14 h-14 bg-surface-container-lowest rounded-lg p-1.5 shrink-0 flex items-center justify-center shadow-xs cursor-pointer hover:ring-2 hover:ring-primary transition-all border border-outline-variant/40"
                    title="Click to view & download slide QR"
                  >
                    <svg className="w-full h-full text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4-2h2v2h-2v-2zm-2 2h2v4h-2v-4zm4 4h4v2h-4v-2zm2-4h2v2h-2v-2zm-6-2h2v2h-2v-2zm8 0h2v2h-2v-2zM6 6h2v2H6V6zm12 0h2v2h-2V6zm-12 12h2v2H6v-2z" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-body-sm text-body-sm text-on-surface font-medium leading-tight">
                      Display on presenter slides
                    </p>
                    <button
                      onClick={onOpenQRModal}
                      className="text-primary-container hover:text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                      Download QR for Slides / Badges
                    </button>
                  </div>
                </div>

                {/* Attendee View Tab Link Highlight Banner */}
                <button
                  onClick={() => setActiveTab('attendee-view')}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary-container font-label-lg text-label-lg font-semibold hover:bg-primary-container hover:text-on-primary transition-all shadow-xs group cursor-pointer border border-outline-variant/30"
                  type="button"
                >
                  <span>Preview Attendee Experience</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Recent Community Posts Generated Stream / Activity Table */}
      <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-5 border border-outline-variant/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Recent Community Posts Generated
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Live feed of attendees creating and publishing their event takeaways to LinkedIn.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                className="pl-8 pr-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40"
                placeholder="Search posts..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-on-surface-variant text-[16px]">
                search
              </span>
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowToneFilterDropdown(!showToneFilterDropdown)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer border border-outline-variant/40 ${
                  selectedFilterTone !== 'all'
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                title="Filter by tone"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>

              {showToneFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/40 py-1.5 z-40">
                  <div className="px-3 py-1 text-label-sm font-semibold text-on-surface-variant uppercase">
                    Filter by Tone
                  </div>
                  {['all', 'Key Takeaways', 'Thought Leader', 'Attendee Hype', 'Grateful Attendee'].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => {
                        setSelectedFilterTone(tone);
                        setShowToneFilterDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-surface-container ${
                        selectedFilterTone === tone ? 'text-primary font-bold bg-surface-container-low' : 'text-on-surface'
                      }`}
                    >
                      <span>{tone === 'all' ? 'All Tones' : tone}</span>
                      {selectedFilterTone === tone && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Posts Activity List / Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low/60 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Attendee & Role</th>
                <th className="py-3 px-3">Generation Tone</th>
                <th className="py-3 px-4">Post Snippet</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-container-low/40 transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary-container font-semibold flex items-center justify-center shrink-0 font-label-md text-label-md">
                        {post.authorInitials}
                      </div>
                      <div className="min-w-0">
                        <span className="block font-label-lg text-label-lg text-on-surface font-semibold truncate">
                          {post.authorName}
                        </span>
                        <span className="block font-body-sm text-body-sm text-on-surface-variant truncate">
                          {post.authorRole}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm font-medium whitespace-nowrap">
                      <span className="material-symbols-outlined text-[13px]">
                        {post.tone === 'Thought Leader' ? 'psychology' : post.tone === 'Attendee Hype' ? 'celebration' : 'lightbulb'}
                      </span>
                      {post.tone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs md:max-w-md">
                    <p className="font-body-md text-body-md text-on-surface line-clamp-1">
                      {post.snippet}
                    </p>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-label-sm text-label-sm font-semibold ${
                        post.status === 'Published to LinkedIn'
                          ? 'bg-tertiary-container/10 text-tertiary'
                          : 'bg-secondary-fixed/50 text-secondary'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          post.status === 'Published to LinkedIn' ? 'bg-tertiary-container' : 'bg-secondary'
                        }`}
                      ></span>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-primary-container transition-colors cursor-pointer"
                        title="View Post Preview"
                        type="button"
                        onClick={() => onViewPost(post)}
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          copiedPostId === post.id
                            ? 'text-tertiary bg-tertiary-container/10'
                            : 'hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                        title={copiedPostId === post.id ? 'Copied!' : 'Copy Text'}
                        type="button"
                        onClick={() => handleCopyPost(post)}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {copiedPostId === post.id ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                    No community posts match your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Summary Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 font-body-sm text-body-sm text-on-surface-variant border-t border-outline-variant/30">
          <span>Showing {filteredPosts.length} of {currentEvent.postsCount} total posts generated for this event</span>
          <div className="flex items-center gap-1">
            <button
              className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-medium disabled:opacity-50 transition-colors cursor-pointer"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              type="button"
            >
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg font-semibold flex items-center justify-center cursor-pointer transition-colors ${
                  currentPage === page
                    ? 'bg-primary-container text-on-primary'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
                type="button"
              >
                {page}
              </button>
            ))}
            <span className="px-1 text-outline">...</span>
            <button
              onClick={() => setCurrentPage(42)}
              className={`w-8 h-8 rounded-lg font-semibold flex items-center justify-center cursor-pointer transition-colors ${
                currentPage === 42
                  ? 'bg-primary-container text-on-primary'
                  : 'hover:bg-surface-container text-on-surface'
              }`}
              type="button"
            >
              42
            </button>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-medium transition-colors cursor-pointer"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
