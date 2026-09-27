import React, { useState, useEffect, useRef } from 'react';
import { EventConfig, ToneType, ActiveTab, CommunityPost } from '../types';
import { ASSETS } from '../data/mockData';
import { generateLinkedInPost } from '../utils/aiGenerator';

interface AttendeeViewProps {
  currentEvent: EventConfig;
  setActiveTab: (tab: ActiveTab) => void;
  onPostCreated?: (post: CommunityPost) => void;
}

export const AttendeeView: React.FC<AttendeeViewProps> = ({
  currentEvent,
  setActiveTab,
  onPostCreated
}) => {
  // Post customization state
  const [selectedTone, setSelectedTone] = useState<ToneType>('grateful');
  const [notes, setNotes] = useState(
    "Completed intensive 5-day hackathon sprint! Built an autonomous research agent using Gemini 1.5 Pro and Google Cloud Run. Immense gratitude to our mentor Alex Rivera and the whole Google Developer team for the hands-on code reviews. Loved connecting with fellow engineers from across the country."
  );
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([
    ASSETS.hackathonTeam,
    ASSETS.bootcampCert
  ]);

  // AI Generation & Preview states
  const [generatedPost, setGeneratedPost] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [likesCount, setLikesCount] = useState(184);
  const [hasLiked, setHasLiked] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate initial post or upon tone change
  const handleGenerate = async (toneToUse: ToneType = selectedTone) => {
    setIsGenerating(true);
    try {
      const text = await generateLinkedInPost({
        tone: toneToUse,
        event: currentEvent,
        notes: notes
      });
      setGeneratedPost(text);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    handleGenerate(selectedTone);
  }, [selectedTone, currentEvent]);

  // Quick prompt chip insertion
  const insertPromptSnippet = (snippet: string) => {
    setNotes(prev => `${prev} ${snippet}`);
  };

  // Photo handlers
  const handleRemovePhoto = (index: number) => {
    setAttachedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAttachedPhotos(prev => [...prev.slice(0, 3), event.target!.result as string]);
      }
    };
    reader.readAsDataURL(file);
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Like interaction
  const toggleLike = () => {
    if (hasLiked) {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  // LinkedIn share intent URL
  const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
    generatedPost
  )}`;

  return (
    <div className="flex flex-col w-full gap-6 animate-in fade-in duration-300">
      {/* EVENT BANNER HEADER */}
      <section className="w-full bg-surface-container-lowest rounded-2xl shadow-sm p-6 lg:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden border border-outline-variant/30">
        {/* Subtle Ambient Backdrop Accent */}
        <div className="absolute -right-24 -top-24 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-20 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col gap-4 max-w-3xl z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Hosted by {currentEvent.organizer}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {currentEvent.location}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              {currentEvent.date}
            </span>
          </div>

          <div>
            <h1 className="font-display text-display text-on-surface tracking-tight font-bold">
              {currentEvent.name}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Turn your sprint achievements, hackathon builds, and mentor milestones into reach-amplifying LinkedIn content.
            </p>
          </div>

          {/* Official Hashtags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
              Official Tags:
            </span>
            {currentEvent.hashtags.map((tag) => (
              <span
                key={tag}
                onClick={() => insertPromptSnippet(tag)}
                className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-medium hover:bg-surface-container-high cursor-pointer transition-colors"
                title="Click to add to your post highlights"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
              href={currentEvent.linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">share</span>
              LinkedIn Page
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
              href={currentEvent.twitterUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">tag</span>
              X / Twitter Feed
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
              href={currentEvent.websiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              Event Hub
            </a>
          </div>
        </div>

        {/* Right Header Column: Portal Meta & Dashboard Switch */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between self-stretch lg:self-auto gap-4 shrink-0 z-10 pt-4 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-container/10 text-tertiary font-label-md text-label-md font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            Attendee Authoring Portal
          </div>
          <button
            onClick={() => setActiveTab('organizer-dashboard')}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-medium transition-all shadow-xs cursor-pointer"
          >
            <span>Switch to Organizer Dashboard</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform text-primary">
              arrow_forward
            </span>
          </button>
        </div>
      </section>

      {/* TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        {/* LEFT COLUMN: Input & AI Controls (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full">
          <div className="bg-surface-container-lowest rounded-2xl p-6 lg:p-7 shadow-sm flex flex-col gap-6 border border-outline-variant/30">
            {/* Workspace Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
                    Create Your LinkedIn Post
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Turn your bootcamp highlights into an engaging, professional story in seconds.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-surface-container text-primary font-label-sm text-label-sm font-semibold uppercase">
                Step 1 of 2
              </span>
            </div>

            {/* SECTION 1: PHOTO UPLOAD */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1.5">
                  <span>Attached Media</span>
                  <span className="text-on-surface-variant font-normal font-label-sm text-label-sm">
                    ({attachedPhotos.length} of 4 selected)
                  </span>
                </label>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Supports JPG, PNG up to 15MB</span>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-surface-container-low rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-all group border border-dashed border-outline-variant/60"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                </div>
                <p className="font-label-md text-label-md text-on-surface font-semibold mt-2.5">
                  Drag & drop event photos here, or <span className="text-primary hover:underline">browse files</span>
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  High-resolution stage, team, or project photos boost reach by +47%
                </p>
              </div>

              {/* Thumbnail Preview Strip */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                {attachedPhotos.map((photo, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden bg-surface-container aspect-video shadow-xs border border-outline-variant/30">
                    <img
                      alt={`Attached event media ${index + 1}`}
                      className="w-full h-full object-cover"
                      src={photo}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent flex items-end p-2">
                      <span className="font-body-sm text-body-sm text-surface-container-lowest truncate max-w-[85%]">
                        {index === 0 ? 'hackathon_team.jpg' : index === 1 ? 'bootcamp_certificate.jpg' : `photo_${index + 1}.jpg`}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePhoto(index);
                      }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-on-surface/80 hover:bg-error text-surface-container-lowest flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                      title="Remove photo"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </div>
                ))}

                {attachedPhotos.length < 4 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl bg-surface-container-low hover:bg-surface-container flex flex-col items-center justify-center gap-1 aspect-video text-on-surface-variant hover:text-on-surface transition-all cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px] text-primary">add_circle</span>
                    <span className="font-label-sm text-label-sm font-semibold">Add more</span>
                  </button>
                )}
              </div>
            </div>

            {/* SECTION 2: TONE SELECTOR */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-label-lg text-on-surface font-semibold">Select Tone of Voice</label>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Influences copy cadence & hooks</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Professional */}
                <button
                  onClick={() => setSelectedTone('professional')}
                  className={`flex items-start gap-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    selectedTone === 'professional'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30'
                  }`}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] mt-0.5 ${
                      selectedTone === 'professional' ? 'text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    business_center
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-label-md text-label-md font-semibold ${selectedTone === 'professional' ? 'text-on-primary' : 'text-on-surface'}`}>
                      Professional
                    </span>
                    <span className={`font-body-sm text-body-sm leading-tight truncate ${selectedTone === 'professional' ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                      Career-focused & polished
                    </span>
                  </div>
                </button>

                {/* Grateful Attendee */}
                <button
                  onClick={() => setSelectedTone('grateful')}
                  className={`flex items-start gap-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    selectedTone === 'grateful'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30'
                  }`}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] mt-0.5 ${
                      selectedTone === 'grateful' ? 'text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    favorite
                  </span>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-label-md text-label-md font-semibold ${selectedTone === 'grateful' ? 'text-on-primary' : 'text-on-surface'}`}>
                        Grateful Attendee
                      </span>
                      {selectedTone === 'grateful' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span>
                      )}
                    </div>
                    <span className={`font-body-sm text-body-sm leading-tight truncate ${selectedTone === 'grateful' ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                      Warm & mentor-honoring
                    </span>
                  </div>
                </button>

                {/* Key Takeaways */}
                <button
                  onClick={() => setSelectedTone('takeaways')}
                  className={`flex items-start gap-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    selectedTone === 'takeaways'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30'
                  }`}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] mt-0.5 ${
                      selectedTone === 'takeaways' ? 'text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    lightbulb
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-label-md text-label-md font-semibold ${selectedTone === 'takeaways' ? 'text-on-primary' : 'text-on-surface'}`}>
                      Key Takeaways
                    </span>
                    <span className={`font-body-sm text-body-sm leading-tight truncate ${selectedTone === 'takeaways' ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                      Bulleted learning points
                    </span>
                  </div>
                </button>

                {/* Excited Student */}
                <button
                  onClick={() => setSelectedTone('excited')}
                  className={`flex items-start gap-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    selectedTone === 'excited'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30'
                  }`}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] mt-0.5 ${
                      selectedTone === 'excited' ? 'text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    rocket_launch
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-label-md text-label-md font-semibold ${selectedTone === 'excited' ? 'text-on-primary' : 'text-on-surface'}`}>
                      Excited Student
                    </span>
                    <span className={`font-body-sm text-body-sm leading-tight truncate ${selectedTone === 'excited' ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                      Milestone & high energy
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* SECTION 3: KEY HIGHLIGHTS / NOTES TEXTAREA */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="attendee-notes">
                  Key Highlights & What You Learned
                </label>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                  {notes.length} chars
                </span>
              </div>
              <div className="relative rounded-xl bg-surface-container-low overflow-hidden focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary transition-all border border-outline-variant/30">
                <textarea
                  className="w-full bg-transparent p-3.5 text-on-surface font-body-md text-body-md focus:outline-none resize-none leading-relaxed"
                  id="attendee-notes"
                  placeholder="Mention key projects, teammates, mentors, or favorite moments..."
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Quick prompt prompts:</span>
                <button
                  onClick={() => insertPromptSnippet('Shoutout to our mentors for the rigorous code reviews.')}
                  className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
                  type="button"
                >
                  + Mention mentors
                </button>
                <button
                  onClick={() => insertPromptSnippet('Deployed scalable multi-agent microservices on Cloud Run.')}
                  className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
                  type="button"
                >
                  + Cloud architecture
                </button>
                <button
                  onClick={() => insertPromptSnippet('Incredible camaraderie collaborating with fellow engineers.')}
                  className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
                  type="button"
                >
                  + Team collaboration
                </button>
              </div>
            </div>

            {/* SECTION 4: PRIMARY ACTION GENERATE BUTTON */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-on-primary-fixed-variant active:scale-[0.99] text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2.5 shadow-md transition-all group cursor-pointer"
                id="generate-btn"
                type="button"
                onClick={() => handleGenerate()}
                disabled={isGenerating}
              >
                <span className={`material-symbols-outlined text-[22px] ${isGenerating ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`}>
                  {isGenerating ? 'refresh' : 'auto_awesome'}
                </span>
                <span>{isGenerating ? 'Generating Post with EventPulse AI...' : 'Generate LinkedIn Post with EventPulse AI'}</span>
              </button>
              <div className="flex items-center justify-center gap-1.5 text-center">
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Automatically incorporates verified <span className="font-semibold text-primary">{currentEvent.hashtags[0]}</span> hashtags and tags <span className="font-semibold text-primary">@{currentEvent.organizer}</span>.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Realistic LinkedIn Post Live Preview (6 cols) */}
        <div className={`lg:col-span-6 flex flex-col gap-4 w-full lg:sticky lg:top-24 ${previewMode === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
          {/* Preview Section Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Live LinkedIn Post Preview
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                Copy Ready
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  previewMode === 'mobile'
                    ? 'bg-surface-container text-primary font-bold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
                title="Mobile preview toggle"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">smartphone</span>
              </button>
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  previewMode === 'desktop'
                    ? 'bg-surface-container text-primary font-bold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
                title="Desktop preview toggle"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">desktop_windows</span>
              </button>
            </div>
          </div>

          {/* LINKEDIN PREVIEW CARD (Pixel-Accurate LinkedIn Styling) */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden flex flex-col border border-outline-variant/30">
            {/* Author Header */}
            <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                {/* Author Avatar */}
                <div className="relative shrink-0">
                  <img
                    alt="Sarah Lin portrait"
                    className="w-12 h-12 rounded-full object-cover"
                    src={ASSETS.sarahAvatar}
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-tertiary-container rounded-full ring-2 ring-surface-container-lowest"></span>
                </div>
                {/* Author Metadata */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface truncate">
                      Sarah Lin
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm">• 1st</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Software Engineer & AI Builder | {currentEvent.name} Fellow | Prev. SWE Intern
                  </p>
                  <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm mt-0.5">
                    <span>Just now</span>
                    <span>•</span>
                    <span className="material-symbols-outlined text-[14px]">public</span>
                  </div>
                </div>
              </div>

              {/* LinkedIn Ellipsis */}
              <div className="flex items-center gap-1 text-on-surface-variant shrink-0">
                <button className="p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer" title="More options" type="button">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
            </div>

            {/* Post Body Content */}
            <div
              className={`px-4 sm:px-5 pb-3 font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-line transition-opacity duration-300 ${
                isGenerating ? 'opacity-40' : 'opacity-100'
              }`}
              id="post-body-content"
            >
              {generatedPost}
            </div>

            {/* Uploaded Photo Grid in Post */}
            {attachedPhotos.length > 0 && (
              <div
                className={`w-full grid ${
                  attachedPhotos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                } gap-1 bg-surface-container-high overflow-hidden select-none`}
              >
                {attachedPhotos.map((photo, i) => (
                  <div key={i} className="h-64 sm:h-72 overflow-hidden bg-surface-container">
                    <img
                      alt="Bootcamp event visual"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      src={photo}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Social Engagement Metrics */}
            <div className="px-4 sm:px-5 py-2.5 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-lowest border-t border-outline-variant/20">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center -space-x-1">
                  <span className="w-5 h-5 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-[10px] ring-1 ring-surface-container-lowest">
                    👍
                  </span>
                  <span className="w-5 h-5 rounded-full bg-[#e7a33e] text-white flex items-center justify-center text-[10px] ring-1 ring-surface-container-lowest">
                    💡
                  </span>
                  <span className="w-5 h-5 rounded-full bg-[#44712e] text-white flex items-center justify-center text-[10px] ring-1 ring-surface-container-lowest">
                    👏
                  </span>
                </div>
                <span className="font-medium text-on-surface">{likesCount}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>42 comments</span>
                <span>•</span>
                <span>12 reposts</span>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-surface-container"></div>

            {/* Post Action Bar (Like, Comment, Repost, Send) */}
            <div className="px-3 py-1.5 grid grid-cols-4 gap-1 bg-surface-container-lowest">
              <button
                onClick={toggleLike}
                className={`py-2.5 px-1 rounded-lg hover:bg-surface-container-low flex items-center justify-center gap-1.5 font-label-md text-label-md transition-colors cursor-pointer ${
                  hasLiked ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">thumb_up</span>
                <span className="hidden sm:inline">{hasLiked ? 'Liked' : 'Like'}</span>
              </button>
              <button
                className="py-2.5 px-1 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary flex items-center justify-center gap-1.5 font-label-md text-label-md transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">comment</span>
                <span className="hidden sm:inline">Comment</span>
              </button>
              <button
                className="py-2.5 px-1 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary flex items-center justify-center gap-1.5 font-label-md text-label-md transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">repeat</span>
                <span className="hidden sm:inline">Repost</span>
              </button>
              <button
                className="py-2.5 px-1 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary flex items-center justify-center gap-1.5 font-label-md text-label-md transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">send</span>
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>

          {/* Bottom Action Controls Toolbar */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Copy Text Button */}
              <button
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-label-md text-label-md font-semibold transition-all cursor-pointer ${
                  copied
                    ? 'bg-tertiary-container text-white'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
                id="copy-btn"
                type="button"
                onClick={handleCopy}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span id="copy-btn-text">{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              {/* Regenerate Button */}
              <button
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all cursor-pointer"
                id="regen-btn"
                type="button"
                onClick={() => handleGenerate()}
                disabled={isGenerating}
              >
                <span className={`material-symbols-outlined text-[18px] ${isGenerating ? 'animate-spin' : ''}`}>
                  sync
                </span>
                <span>Regenerate</span>
              </button>
            </div>

            {/* Open in LinkedIn Primary CTA */}
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary active:scale-[0.99] text-on-primary font-label-md text-label-md font-bold shadow-sm transition-all"
              href={linkedInShareUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Open in LinkedIn</span>
              <span className="material-symbols-outlined text-[18px]">launch</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
