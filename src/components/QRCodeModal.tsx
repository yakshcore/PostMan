import React, { useState } from 'react';
import { EventConfig } from '../types';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventConfig;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, event }) => {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const attendeeUrl = `https://eventpulse.ai/attendee/${event.shareSlug}`;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Create SVG blob download
      const svgElement = document.getElementById('qr-code-svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${event.shareSlug}-qr-badge.svg`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">qr_code_2</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Presenter QR Slide</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Slide Preview Body */}
        <div className="p-6 text-center space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-surface-container-low to-surface-container border border-outline-variant/40 flex flex-col items-center">
            <span className="text-label-sm font-semibold uppercase tracking-wider text-primary mb-1">
              Scan with mobile to author post
            </span>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-4">
              {event.name}
            </h4>

            {/* High-contrast crisp SVG QR Code */}
            <div className="w-56 h-56 p-4 bg-white rounded-2xl shadow-md border border-outline-variant/30 flex items-center justify-center">
              <svg
                id="qr-code-svg"
                className="w-full h-full text-slate-900"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                {/* Simulated high-density QR grid */}
                <rect x="10" y="10" width="28" height="28" rx="4" fill="#0A66C2" />
                <rect x="16" y="16" width="16" height="16" rx="2" fill="white" />
                <rect x="20" y="20" width="8" height="8" rx="1" fill="#0A66C2" />

                <rect x="62" y="10" width="28" height="28" rx="4" fill="#0A66C2" />
                <rect x="68" y="16" width="16" height="16" rx="2" fill="white" />
                <rect x="72" y="20" width="8" height="8" rx="1" fill="#0A66C2" />

                <rect x="10" y="62" width="28" height="28" rx="4" fill="#0A66C2" />
                <rect x="16" y="68" width="16" height="16" rx="2" fill="white" />
                <rect x="20" y="72" width="8" height="8" rx="1" fill="#0A66C2" />

                {/* Central Data Matrix Dots */}
                <circle cx="45" cy="18" r="3" fill="#131B2E" />
                <circle cx="54" cy="22" r="2.5" fill="#131B2E" />
                <circle cx="48" cy="30" r="3.5" fill="#131B2E" />
                <circle cx="20" cy="46" r="3" fill="#131B2E" />
                <circle cx="28" cy="52" r="2.5" fill="#131B2E" />
                <circle cx="36" cy="46" r="3" fill="#131B2E" />
                <circle cx="48" cy="46" r="4" fill="#057642" />
                <circle cx="56" cy="52" r="3" fill="#131B2E" />
                <circle cx="65" cy="46" r="2.5" fill="#131B2E" />
                <circle cx="74" cy="52" r="3.5" fill="#131B2E" />
                <circle cx="82" cy="46" r="3" fill="#131B2E" />
                <circle cx="46" cy="68" r="3" fill="#131B2E" />
                <circle cx="54" cy="74" r="3.5" fill="#131B2E" />
                <circle cx="62" cy="66" r="2.5" fill="#131B2E" />
                <circle cx="72" cy="72" r="3" fill="#131B2E" />
                <circle cx="82" cy="80" r="3" fill="#131B2E" />
                <circle cx="50" cy="84" r="3" fill="#131B2E" />
              </svg>
            </div>

            <p className="mt-4 font-mono font-body-sm text-body-sm text-on-surface-variant truncate max-w-xs select-all">
              {attendeeUrl}
            </p>
          </div>
          <p className="text-on-surface-variant font-body-sm text-body-sm">
            Place this QR slide at the end of keynotes, hackathons, or badges. Attendees scan to instantly launch the pre-configured post generator.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/40 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print Slide</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-5 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloading ? 'refresh' : 'download'}
            </span>
            <span>{downloading ? 'Exporting...' : 'Download Vector SVG'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
