import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ModalItem {
  title: string;
  category: string;
  subtitle: string;
  description: string;
  codeSnippet?: string;
  metrics?: { label: string; value: string }[];
  details?: string[];
}

interface DetailModalProps {
  item: ModalItem | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-2xl bg-surface border border-stroke rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-bg border border-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="text-xs text-muted uppercase tracking-[0.2em] font-mono block mb-2">
              {item.category}
            </span>
            <h3 className="text-3xl sm:text-4xl font-display italic text-text-primary mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{item.subtitle}</p>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
            {/* Description */}
            <p className="text-sm text-text-primary/90 leading-relaxed font-light">
              {item.description}
            </p>

            {/* Metrics */}
            {item.metrics && item.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {item.metrics.map((m, idx) => (
                  <div key={idx} className="bg-bg border border-stroke rounded-2xl p-3 text-center">
                    <div className="text-xs text-muted font-mono mb-1">{m.label}</div>
                    <div className="text-lg font-display italic text-text-primary">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Code Snippet */}
            {item.codeSnippet && (
              <div className="bg-bg border border-stroke rounded-2xl p-4 overflow-x-auto font-mono text-xs text-emerald-400/90 leading-relaxed">
                <div className="text-[10px] text-muted uppercase tracking-widest mb-2 border-b border-stroke pb-1">
                  Russel Declarative Spec
                </div>
                <pre>{item.codeSnippet}</pre>
              </div>
            )}

            {/* Feature List */}
            {item.details && item.details.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs text-muted font-mono uppercase tracking-widest">
                  Key Mechanics
                </div>
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-muted flex items-start gap-2">
                      <span className="text-text-primary mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="pt-6 mt-4 border-t border-stroke flex justify-end">
            <button
              onClick={onClose}
              className="accent-gradient rounded-full px-6 py-2.5 text-xs text-bg font-semibold hover:opacity-95 transition-opacity cursor-pointer"
            >
              Close Spec Sheet
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
