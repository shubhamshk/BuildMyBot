"use client";

import { useState } from "react";
import { Copy, CheckCircle2, RefreshCw, Loader2, Terminal } from "lucide-react";

interface TerminalOutputProps {
  title: string;
  content: string;
  loading?: boolean;
  error?: string | null;
  onRewrite?: () => void;
  isGenerating?: boolean;
}

/**
 * Render markdown-style text with bold and italic formatting
 */
function renderFormattedText(text: string): React.ReactNode[] {
  if (!text) return [];

  const parts: React.ReactNode[] = [];
  let key = 0;

  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/);

  paragraphs.forEach((paragraph, pIndex) => {
    if (pIndex > 0) {
      parts.push(<div key={key++} className="h-4" />); // Paragraph spacing
    }

    // Process inline formatting within each paragraph
    // Handle **bold** and *italic* patterns
    const lines = paragraph.split(/\n/);
    
    lines.forEach((line, lIndex) => {
      if (lIndex > 0) {
        parts.push(<br key={key++} />);
      }

      // Regex to match **bold** and *italic* patterns
      // Order matters: check for ** first, then *
      const regex = /(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
      let lastIndex = 0;
      let match;

      const lineContent: React.ReactNode[] = [];
      let lineKey = 0;

      while ((match = regex.exec(line)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          lineContent.push(
            <span key={lineKey++} className="text-gray-300">
              {line.slice(lastIndex, match.index)}
            </span>
          );
        }

        const matchText = match[0];
        
        if (matchText.startsWith("**") && matchText.endsWith("**")) {
          // Bold text (dialogue)
          const innerText = matchText.slice(2, -2);
          lineContent.push(
            <span key={lineKey++} className="font-bold text-white">
              {innerText}
            </span>
          );
        } else if (matchText.startsWith("*") && matchText.endsWith("*")) {
          // Italic text (descriptions)
          const innerText = matchText.slice(1, -1);
          lineContent.push(
            <span key={lineKey++} className="italic text-gray-400">
              {innerText}
            </span>
          );
        }

        lastIndex = match.index + matchText.length;
      }

      // Add remaining text after last match
      if (lastIndex < line.length) {
        lineContent.push(
          <span key={lineKey++} className="text-gray-300">
            {line.slice(lastIndex)}
          </span>
        );
      }

      // If no formatting was found, just add the plain text
      if (lineContent.length === 0) {
        lineContent.push(
          <span key={lineKey++} className="text-gray-300">
            {line}
          </span>
        );
      }

      parts.push(<span key={key++}>{lineContent}</span>);
    });
  });

  return parts;
}

export function TerminalOutput({
  title,
  content,
  loading = false,
  error = null,
  onRewrite,
  isGenerating = false,
}: TerminalOutputProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-[#1a1a2e]">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#16162a] border-b border-border">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-gray-300">{title}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          {onRewrite && (
            <button
              onClick={onRewrite}
              disabled={loading || isGenerating}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 text-xs text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              Regenerate
            </button>
          )}
          <button
            onClick={copyToClipboard}
            disabled={!content || loading}
            className="px-3 py-1.5 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 transition-colors flex items-center gap-2 text-xs text-violet-400 hover:text-violet-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 min-h-[200px] max-h-[600px] overflow-y-auto font-mono text-sm leading-relaxed">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
            <span className="ml-3 text-gray-400">Generating...</span>
          </div>
        ) : error ? (
          <div className="py-4 px-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400 font-medium mb-1">Generation Failed</p>
            <p className="text-sm text-red-400/80">{error}</p>
            {onRewrite && (
              <button
                onClick={onRewrite}
                className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
              >
                Try again
              </button>
            )}
          </div>
        ) : content ? (
          <div className="space-y-0">
            {renderFormattedText(content)}
          </div>
        ) : (
          <div className="text-gray-500 italic">
            Content will be generated here...
          </div>
        )}
      </div>
    </div>
  );
}
