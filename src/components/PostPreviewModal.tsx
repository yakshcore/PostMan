import React, { useState } from 'react';
import { CommunityPost } from '../types';

interface PostPreviewModalProps {
  post: CommunityPost | null;
  onClose: () => void;
}

export const PostPreviewModal: React.FC<PostPreviewModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(post.fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">feed</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Community Post Preview</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Author info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary-container font-bold flex items-center justify-center font-label-md text-label-md">
                {post.authorInitials}
              </div>
              <div>
                <p className="font-label-lg text-label-lg font-bold text-on-surface">{post.authorName}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{post.authorRole}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm font-semibold">
              {post.tone}
            </span>
          </div>

          {/* Full content */}
          <div className="p-4 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface whitespace-pre-line leading-relaxed">
            {post.fullContent}
          </div>

          {/* Photos if any */}
          {post.photos && post.photos.length > 0 && (
            <div className={`grid gap-2 ${post.photos.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {post.photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Post visual ${i + 1}`}
                  className="w-full h-44 object-cover rounded-xl border border-outline-variant/30"
                />
              ))}
            </div>
          )}

          {/* Social Stats */}
          <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-2 border-t border-outline-variant/30">
            <div className="flex items-center gap-1.5">
              <span>👍💡👏</span>
              <span className="font-medium text-on-surface">{post.likes} reactions</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{post.comments} comments</span>
              <span>•</span>
              <span>{post.reposts} reposts</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-tertiary font-label-sm text-label-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
            {post.status}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                copied
                  ? 'bg-tertiary-container text-white'
                  : 'bg-surface-container hover:bg-surface-variant text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Post Text'}</span>
            </button>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>View on LinkedIn</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
