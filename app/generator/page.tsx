"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Shield,
  Palette,
  Camera,
  Sun,
  Copy,
  RefreshCw,
  ExternalLink,
  Settings,
  Clock,
  User,
} from "lucide-react";
import Link from "next/link";
import { useCharacter } from "@/context/CharacterContext";
import { useState, useEffect } from "react";

export default function PromptGenerator() {
  const { character } = useCharacter();
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState({
    composition: "Portrait",
    isSfw: true,
    artStyle: "Realistic",
    lighting: "Cinematic Volumetric",
    lens: "85mm Prime, f/1.8",
    environment: "",
  });

  const compositions = ["Portrait", "Half-body", "Full-body", "WideS"];
  const artStyles = ["Realistic", "Anime", "Semi-Realistic", "Digital Art", "Concept Art"];

  useEffect(() => {
    updatePrompt();
  }, [character, settings]);

  const updatePrompt = () => {
    if (!character.name) {
      setPrompt("");
      return;
    }

    const envText = settings.environment
      ? `, ${settings.environment}`
      : ", detailed background";
    const promptText = `Highly detailed ${settings.composition.toLowerCase()} of ${character.name}, ${character.generatedProfile?.title || "character"}, ${settings.artStyle.toLowerCase()} style, ${settings.lighting.toLowerCase()}, ${settings.lens}${envText}, 8k resolution, photorealistic --ar 3:4 --v 6.0`;

    setPrompt(promptText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">Image Prompt Generator</h1>
            <button className="w-10 h-10 rounded-lg glass flex items-center justify-center text-violet-400 hover:bg-white/5 transition-colors">
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Generate precision prompts for Midjourney, DALL-E, and Stable Diffusion.
          </p>
        </div>

        {/* Selected Character */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4 border border-border mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">SELECTED CHARACTER</span>
            <div className="flex items-center gap-2">
              <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Manage
              </button>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {character.name || "Cyberpunk Mercenary"}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {character.generatedProfile?.title || "Cybernetic eyes, Streetwea..."}
              </p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-medium">
                  ACTIVE
                </span>
                <span className="px-2 py-1 rounded-lg glass text-muted-foreground text-xs font-medium">
                  LEVEL4
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prompt Settings */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">PROMPT SETTINGS</h2>

          {/* Composition Type */}
          <div className="mb-6">
            <label className="text-xs text-muted-foreground mb-3 block">Composition Type</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {compositions.map((comp) => (
                <button
                  key={comp}
                  onClick={() => setSettings({ ...settings, composition: comp })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    settings.composition === comp
                      ? "bg-violet-500 text-white"
                      : "glass border border-border hover:bg-white/5"
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          {/* Filter & Art Style */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="glass rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-violet-400" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Filter</p>
                  <p className="text-sm font-semibold text-foreground">SFW</p>
                </div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, isSfw: !settings.isSfw })}
                className={`w-12 h-6 rounded-full relative transition-all ${
                  settings.isSfw ? "bg-violet-500" : "bg-muted"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    settings.isSfw ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="glass rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Palette className="w-5 h-5 text-violet-400" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Art Style</p>
                  <select
                    value={settings.artStyle}
                    onChange={(e) => setSettings({ ...settings, artStyle: e.target.value })}
                    className="w-full bg-transparent border-none text-sm font-semibold text-foreground focus:ring-0 outline-none cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white"
                  >
                    {artStyles.map((style) => (
                      <option key={style} value={style} className="bg-zinc-900 text-white">
                        {style}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Environment */}
          <div className="mb-4">
            <label className="text-xs text-muted-foreground mb-2 block">Environment / Setting</label>
            <input
              type="text"
              placeholder="e.g. Neon-lit Tokyo back alley, heavy rain, cinematic lighting..."
              value={settings.environment}
              onChange={(e) => setSettings({ ...settings, environment: e.target.value })}
              className="w-full h-12 px-4 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none"
            />
          </div>

          {/* Camera & Lighting */}
          <div className="space-y-3">
            <div className="glass rounded-2xl p-4 border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">CAMERA & LENS</p>
                  <p className="text-sm font-semibold text-foreground">{settings.lens}</p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-[-90deg]" />
            </div>

            <div className="glass rounded-2xl p-4 border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">LIGHTING</p>
                  <p className="text-sm font-semibold text-foreground">{settings.lighting}</p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-[-90deg]" />
            </div>
          </div>
        </div>

        {/* Generated Prompt */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">GENERATED PROMPT</h2>
          <div className="glass rounded-2xl p-6 border border-violet-500/30 mb-4">
            <p className="text-sm text-foreground leading-relaxed font-mono">
              {prompt || "Create a character first to generate prompts..."}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              disabled={!prompt}
              className="flex-1 py-4 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-5 h-5" />
              {copied ? "Copied!" : "Copy Prompt"}
            </button>
            <button
              onClick={updatePrompt}
              className="w-14 h-14 rounded-xl glass border border-border flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 glass border-t border-border p-4">
          <div className="max-w-2xl mx-auto flex items-center justify-around">
            <NavItem icon={<User className="w-5 h-5" />} label="Characters" />
            <NavItem icon={<Sparkles className="w-5 h-5" />} label="Generator" active />
            <NavItem icon={<Clock className="w-5 h-5" />} label="History" />
            <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
          </div>
        </div>
      </div>
    </div>
  );
}

const NavItem = ({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <button
    className={`flex flex-col items-center gap-1 transition-colors ${
      active ? "text-violet-400" : "text-muted-foreground"
    }`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);
