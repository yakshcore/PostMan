import React, { useState } from 'react';
import { EventConfig } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventConfig;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, event }) => {
  const [format, setFormat] = useState<'csv' | 'pdf' | 'json'>('csv');
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      let content = '';
      let filename = `${event.shareSlug}-analytics-export.${format}`;
      let mimeType = 'text/plain';

      if (format === 'csv') {
        mimeType = 'text/csv;charset=utf-8;';
        content = `Metric,Value,Benchmark,Growth\nTotal Posts Generated,${event.postsCount},vs 680 yesterday,+24%\nLinkedIn Impressions,128400,Target 100K reached,+38%\nAttendee Generator Visits,1420,59.3% conversion,842 authors\nTop Tag Activity,#GoogleH2S,92% inclusion,Viral Trend\nQuality Score,${event.qualityScore}/5,Top 5% Cohorts,Gold\nPhotos Attached,${event.photosCount},Avg 1.8/post,+47% reach impact\n`;
      } else if (format === 'json') {
        mimeType = 'application/json;charset=utf-8;';
        content = JSON.stringify(
          {
            event: event.name,
            organizer: event.organizer,
            date: event.date,
            metrics: {
              postsCount: event.postsCount,
              impressions: '128.4K',
              visits: 1420,
              conversionRate: '59.3%',
              topHashtags: event.hashtags,
              qualityScore: event.qualityScore
            },
            exportedAt: new Date().toISOString()
          },
          null,
          2
        );
      } else {
        mimeType = 'text/plain;charset=utf-8;';
        content = `EVENTPULSE EXECUTIVE REPORT\n=========================\nEvent: ${event.name}\nOrganizer: ${event.organizer}\nDate: ${event.date}\n\nTotal Posts Generated: ${event.postsCount} (+24%)\nLinkedIn Impressions: 128.4K (+38%)\nAttendee Conversion: 59.3%\nQuality Score: ${event.qualityScore}/5\nHashtags: ${event.hashtags.join(', ')}\n`;
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">download</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Export Analytics</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Export comprehensive social reach, attendee conversion funnels, and hashtag engagement metrics for{' '}
            <strong className="text-on-surface">{event.name}</strong>.
          </p>

          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface font-semibold">
              Select Export Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`py-3 px-2 rounded-xl text-center border font-label-md text-label-md transition-all ${
                  format === 'csv'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-outline-variant/50 hover:bg-surface-container text-on-surface'
                }`}
              >
                CSV Table
              </button>
              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`py-3 px-2 rounded-xl text-center border font-label-md text-label-md transition-all ${
                  format === 'json'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-outline-variant/50 hover:bg-surface-container text-on-surface'
                }`}
              >
                JSON Payload
              </button>
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`py-3 px-2 rounded-xl text-center border font-label-md text-label-md transition-all ${
                  format === 'pdf'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-outline-variant/50 hover:bg-surface-container text-on-surface'
                }`}
              >
                Text Summary
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low text-body-sm text-on-surface-variant space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span>Included Records:</span>
              <span className="font-bold text-on-surface">842 Posts</span>
            </div>
            <div className="flex justify-between">
              <span>Attribution Window:</span>
              <span className="font-bold text-on-surface">Live 5-Day Sprint</span>
            </div>
            <div className="flex justify-between">
              <span>Network:</span>
              <span className="font-bold text-on-surface">LinkedIn & X Feeds</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-label-md text-label-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={downloading}
            className="px-5 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloading ? 'refresh' : 'download'}
            </span>
            <span>{downloading ? 'Preparing File...' : 'Download File'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
