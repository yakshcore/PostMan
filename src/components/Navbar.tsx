import React, { useState } from 'react';
import { ActiveTab, EventConfig } from '../types';
import { ASSETS } from '../data/mockData';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentEvent: EventConfig;
  events: EventConfig[];
  setCurrentEvent: (event: EventConfig) => void;
  onNewEventClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentEvent,
  events,
  setCurrentEvent,
  onNewEventClick
}) => {
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Viral reach milestone', desc: '#GoogleH2S surpassed 120K impressions!', time: '10m ago' },
    { id: 2, title: 'New post published', desc: 'Marcus Vance published to LinkedIn', time: '15m ago' },
    { id: 3, title: 'QR Scan Spike', desc: '54 scans from Main Stage Auditorium', time: '1h ago' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-container-lowest border-b border-outline-variant/50 shadow-xs">
      <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('organizer-dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-xs overflow-hidden">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3 7 4-14 3 7h4" />
              </svg>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              EventPulse
            </span>
          </button>
          <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium hidden sm:inline-block">
            AI Post Suite
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center h-full space-x-1 shrink-0">
          <button
            onClick={() => setActiveTab('organizer-dashboard')}
            className={`h-full flex items-center px-4 font-label-lg text-label-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'organizer-dashboard'
                ? 'text-on-surface border-primary-container font-semibold'
                : 'text-on-surface-variant hover:text-on-surface border-transparent font-medium'
            }`}
          >
            Organizer Dashboard
          </button>
          <button
            onClick={() => setActiveTab('attendee-view')}
            className={`h-full flex items-center px-4 font-label-lg text-label-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'attendee-view'
                ? 'text-on-surface border-primary-container font-semibold'
                : 'text-on-surface-variant hover:text-on-surface border-transparent font-medium'
            }`}
          >
            Attendee View
          </button>
          <button
            onClick={() => setActiveTab('post-generator')}
            className={`h-full flex items-center px-4 font-label-lg text-label-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'post-generator'
                ? 'text-on-surface border-primary-container font-semibold'
                : 'text-on-surface-variant hover:text-on-surface border-transparent font-medium'
            }`}
          >
            Post Generator
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`h-full flex items-center px-4 font-label-lg text-label-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'analytics'
                ? 'text-on-surface border-primary-container font-semibold'
                : 'text-on-surface-variant hover:text-on-surface border-transparent font-medium'
            }`}
          >
            Analytics
          </button>
        </nav>

        {/* Right Section: Event Selector & User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Active Event Dropdown Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEventDropdown(!showEventDropdown)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/60 cursor-pointer hover:bg-surface-container transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
              <span className="font-label-md text-label-md text-on-surface font-medium truncate max-w-[140px] lg:max-w-[200px]">
                {currentEvent.name}
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">unfold_more</span>
            </button>

            {showEventDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/40 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                  Select Active Event
                </div>
                {events.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => {
                      setCurrentEvent(ev);
                      setShowEventDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-surface-container transition-colors ${
                      ev.id === currentEvent.id ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface'
                    }`}
                  >
                    <div className="truncate">
                      <p className="font-label-md text-label-md truncate">{ev.name}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{ev.organizer}</p>
                    </div>
                    {ev.id === currentEvent.id && (
                      <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                    )}
                  </button>
                ))}
                <div className="border-t border-outline-variant/40 mt-1 pt-1 px-2">
                  <button
                    onClick={() => {
                      setShowEventDropdown(false);
                      onNewEventClick();
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-primary hover:bg-surface-container font-label-md text-label-md font-semibold flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Create New Event
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
              type="button"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/40 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Event Notifications</span>
                  <span className="text-label-sm text-primary cursor-pointer hover:underline">Mark read</span>
                </div>
                <div className="space-y-2.5 pt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                      <p className="font-label-md text-label-md text-on-surface font-semibold">{n.title}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{n.desc}</p>
                      <span className="text-[11px] text-outline font-mono">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-outline-variant/60 hidden sm:block"></div>

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 pl-1 cursor-pointer group"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/40"
                src={ASSETS.sarahAvatar}
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                  Sarah Lin
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                  Event Lead
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:text-on-surface transition-colors">
                expand_more
              </span>
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/40 py-2 z-50">
                <div className="px-4 py-2 border-b border-outline-variant/30">
                  <p className="font-label-md text-label-md font-bold text-on-surface">Sarah Lin</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">sarah.lin@google.com</p>
                  <span className="mt-1 inline-block px-2 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm font-semibold">
                    Pro Organizer Plan
                  </span>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab('organizer-dashboard');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">dashboard</span>
                    Organizer Settings
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('attendee-view');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">visibility</span>
                    Switch to Attendee View
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('analytics');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">analytics</span>
                    Analytics & Export
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant/60 px-4 py-3 space-y-2">
          <button
            onClick={() => {
              setActiveTab('organizer-dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg font-label-lg text-label-lg ${
              activeTab === 'organizer-dashboard' ? 'bg-primary-container text-on-primary font-semibold' : 'text-on-surface'
            }`}
          >
            Organizer Dashboard
          </button>
          <button
            onClick={() => {
              setActiveTab('attendee-view');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg font-label-lg text-label-lg ${
              activeTab === 'attendee-view' ? 'bg-primary-container text-on-primary font-semibold' : 'text-on-surface'
            }`}
          >
            Attendee View
          </button>
          <button
            onClick={() => {
              setActiveTab('post-generator');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg font-label-lg text-label-lg ${
              activeTab === 'post-generator' ? 'bg-primary-container text-on-primary font-semibold' : 'text-on-surface'
            }`}
          >
            Post Generator
          </button>
          <button
            onClick={() => {
              setActiveTab('analytics');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg font-label-lg text-label-lg ${
              activeTab === 'analytics' ? 'bg-primary-container text-on-primary font-semibold' : 'text-on-surface'
            }`}
          >
            Analytics
          </button>
        </div>
      )}
    </header>
  );
};
