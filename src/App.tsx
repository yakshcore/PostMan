/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, EventConfig, CommunityPost } from './types';
import { INITIAL_EVENTS, INITIAL_POSTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { AttendeeView } from './components/AttendeeView';
import { PostGeneratorView } from './components/PostGeneratorView';
import { AnalyticsView } from './components/AnalyticsView';
import { PostPreviewModal } from './components/PostPreviewModal';
import { QRCodeModal } from './components/QRCodeModal';
import { NewEventModal } from './components/NewEventModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('organizer-dashboard');
  const [events, setEvents] = useState<EventConfig[]>(INITIAL_EVENTS);
  const [currentEvent, setCurrentEvent] = useState<EventConfig>(INITIAL_EVENTS[0]);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);

  // Modals state
  const [previewingPost, setPreviewingPost] = useState<CommunityPost | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Event updates
  const handleUpdateEvent = (updated: EventConfig) => {
    setCurrentEvent(updated);
    setEvents(prev => prev.map(ev => ev.id === updated.id ? updated : ev));
  };

  const handleResetEvent = () => {
    const original = INITIAL_EVENTS.find(e => e.id === currentEvent.id) || INITIAL_EVENTS[0];
    handleUpdateEvent({ ...original });
  };

  const handleAddNewEvent = (newEvent: EventConfig) => {
    setEvents(prev => [newEvent, ...prev]);
    setCurrentEvent(newEvent);
  };

  const handlePostCreated = (newPost: CommunityPost) => {
    setPosts(prev => [newPost, ...prev]);
    setCurrentEvent(prev => ({
      ...prev,
      postsCount: prev.postsCount + 1
    }));
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md selection:bg-primary-container selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentEvent={currentEvent}
        events={events}
        setCurrentEvent={setCurrentEvent}
        onNewEventClick={() => setNewEventModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="w-full flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {activeTab === 'organizer-dashboard' && (
            <OrganizerDashboard
              currentEvent={currentEvent}
              onUpdateEvent={handleUpdateEvent}
              onResetEvent={handleResetEvent}
              posts={posts}
              setActiveTab={setActiveTab}
              onOpenQRModal={() => setQrModalOpen(true)}
              onOpenExportModal={() => setExportModalOpen(true)}
              onOpenNewEventModal={() => setNewEventModalOpen(true)}
              onViewPost={(post) => setPreviewingPost(post)}
            />
          )}

          {activeTab === 'attendee-view' && (
            <AttendeeView
              currentEvent={currentEvent}
              setActiveTab={setActiveTab}
              onPostCreated={handlePostCreated}
            />
          )}

          {activeTab === 'post-generator' && (
            <PostGeneratorView currentEvent={currentEvent} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              currentEvent={currentEvent}
              onOpenExportModal={() => setExportModalOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Application Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/40 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant font-body-sm text-body-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-on-surface">EventPulse</span>
            <span>© 2025 AI Post Suite. Professional Thought Leadership Engine.</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('attendee-view')}
              className="hover:text-on-surface transition-colors cursor-pointer"
            >
              Attendee Portal
            </button>
            <button
              onClick={() => setExportModalOpen(true)}
              className="hover:text-on-surface transition-colors cursor-pointer"
            >
              Export Report
            </button>
            <button
              onClick={() => setQrModalOpen(true)}
              className="hover:text-on-surface transition-colors cursor-pointer"
            >
              Presenter Slides
            </button>
            <span className="text-outline">v2.4 Production</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <PostPreviewModal
        post={previewingPost}
        onClose={() => setPreviewingPost(null)}
      />

      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        event={currentEvent}
      />

      <NewEventModal
        isOpen={newEventModalOpen}
        onClose={() => setNewEventModalOpen(false)}
        onSave={handleAddNewEvent}
      />

      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        event={currentEvent}
      />
    </div>
  );
}
