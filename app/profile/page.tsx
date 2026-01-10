"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Eye,
  Loader2,
  User,
  LogOut,
  Sparkles,
  Search,
  Download,
  Copy,
  Check,
  Calendar,
  Users,
  TrendingUp,
  Filter,
  Grid3X3,
  List,
  Star,
  Heart,
  Share2,
  MoreVertical,
  Clock,
  Zap,
  Camera,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  getUserCharacters,
  deleteCharacter,
  SavedCharacter,
} from "@/lib/supabase/characters";
import { TerminalOutput } from "@/components/terminal-output";

type ViewMode = "grid" | "list";
type SortBy = "newest" | "oldest" | "name";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id?: string; email?: string; user_metadata?: { full_name?: string; avatar_url?: string; custom_avatar?: string }; created_at?: string } | null>(null);
  const [characters, setCharacters] = useState<SavedCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<SavedCharacter | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [copied, setCopied] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    loadUserAndCharacters();
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favoriteCharacters");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favoriteCharacters", JSON.stringify([...favorites]));
  }, [favorites]);

  // Handle profile photo upload
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    setUploadingPhoto(true);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        // If storage bucket doesn't exist, use base64 as fallback
        console.warn("Storage upload failed, using metadata fallback:", uploadError);
        
        // Convert to base64 for metadata storage
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result as string;
          
          const { error: updateError } = await supabase.auth.updateUser({
            data: { custom_avatar: base64 }
          });

          if (updateError) {
            console.error("Failed to update avatar:", updateError);
            alert("Failed to upload photo. Please try again.");
          } else {
            // Refresh user data
            const { data: { user: updatedUser } } = await supabase.auth.getUser();
            setUser(updatedUser);
          }
          setUploadingPhoto(false);
        };
        reader.readAsDataURL(file);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Update user metadata with new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { custom_avatar: publicUrl }
      });

      if (updateError) {
        console.error("Failed to update user metadata:", updateError);
        alert("Failed to save photo. Please try again.");
      } else {
        // Refresh user data
        const { data: { user: updatedUser } } = await supabase.auth.getUser();
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Photo upload error:", error);
      alert("Failed to upload photo. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Get the avatar URL (custom or from OAuth provider)
  const getAvatarUrl = () => {
    return user?.user_metadata?.custom_avatar || user?.user_metadata?.avatar_url;
  };

  const loadUserAndCharacters = async () => {
    setLoading(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    
    setUser(user);
    
    const { data: chars, error } = await getUserCharacters();
    if (!error) {
      setCharacters(chars);
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDeleteCharacter = async (characterId: string) => {
    if (deleteConfirm !== characterId) {
      setDeleteConfirm(characterId);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    setDeletingId(characterId);
    const { error } = await deleteCharacter(characterId);
    
    if (!error) {
      setCharacters((prev) => prev.filter((c) => c.id !== characterId));
      if (selectedCharacter?.id === characterId) {
        setSelectedCharacter(null);
      }
    }
    
    setDeletingId(null);
    setDeleteConfirm(null);
  };

  const toggleFavorite = (characterId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(characterId)) {
        newFavorites.delete(characterId);
      } else {
        newFavorites.add(characterId);
      }
      return newFavorites;
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExportCharacter = (char: SavedCharacter) => {
    const exportData = {
      name: char.name,
      age: char.age,
      gender: char.gender,
      setting: char.setting,
      relationship: char.relationship,
      personality: {
        warmth: char.personality_warmth,
        confidence: char.personality_confidence,
        calmness: char.personality_calmness,
        reserve: char.personality_reserve,
      },
      generatedContent: {
        personality: char.generated_personality,
        scenario: char.generated_scenario,
      },
      createdAt: char.created_at,
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${char.name.replace(/\s+/g, "_")}_character.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return formatDate(dateString);
  };

  // Filter and sort characters
  const filteredCharacters = useMemo(() => {
    let result = [...characters];
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.setting.toLowerCase().includes(query) ||
          c.gender.toLowerCase().includes(query)
      );
    }
    
    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    // Favorites first
    result.sort((a, b) => {
      const aFav = favorites.has(a.id) ? 1 : 0;
      const bFav = favorites.has(b.id) ? 1 : 0;
      return bFav - aFav;
    });
    
    return result;
  }, [characters, searchQuery, sortBy, favorites]);

  // Stats
  const stats = useMemo(() => ({
    total: characters.length,
    thisWeek: characters.filter((c) => {
      const date = new Date(c.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date > weekAgo;
    }).length,
    favorites: favorites.size,
  }), [characters, favorites]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-violet-400 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your characters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back Home</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              My Characters
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {getAvatarUrl() ? (
              <img
                src={getAvatarUrl()}
                alt="Profile"
                className="w-9 h-9 rounded-full ring-2 ring-violet-500/30 object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl mb-8"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-blue-500/20" />
          <div className="absolute inset-0 glass" />
          
          <div className="relative p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Avatar with Upload */}
              <div className="relative group">
                {getAvatarUrl() ? (
                  <img
                    src={getAvatarUrl()}
                    alt="Profile"
                    className="w-24 h-24 rounded-2xl ring-4 ring-white/10 shadow-2xl object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center ring-4 ring-white/10 shadow-2xl">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
                
                {/* Upload Button Overlay */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {uploadingPhoto ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  ) : (
                    <Camera className="w-8 h-8 text-white" />
                  )}
                </button>
                
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                
                {/* Verified Badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center ring-4 ring-background">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {user?.user_metadata?.full_name || "Character Creator"}
                </h2>
                <p className="text-muted-foreground mb-3">{user?.email}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-sm font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    Pro Creator
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-muted-foreground text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    Joined {user?.created_at ? formatDate(user.created_at) : "Recently"}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <Link
                  href="/wizard/basics"
                  className="px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-violet-500/25"
                >
                  <Plus className="w-5 h-5" />
                  New Character
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="glass rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-violet-400" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Characters</p>
              </div>
              <div className="glass rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.thisWeek}</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
              <div className="glass rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.favorites}</p>
                <p className="text-xs text-muted-foreground">Favorites</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 border border-border mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search characters by name, setting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-border focus:border-violet-500 transition-all outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-border text-foreground outline-none cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white"
              >
                <option value="newest" className="bg-zinc-900 text-white">Newest First</option>
                <option value="oldest" className="bg-zinc-900 text-white">Oldest First</option>
                <option value="name" className="bg-zinc-900 text-white">Name A-Z</option>
              </select>
              
              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-border">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-violet-500 text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-violet-500 text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Characters List */}
          <div className={viewMode === "grid" ? "lg:col-span-3" : "lg:col-span-1"}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {filteredCharacters.length} Character{filteredCharacters.length !== 1 ? "s" : ""}
              </h3>
            </div>

            {filteredCharacters.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-12 border border-border text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-violet-400" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  {searchQuery ? "No matches found" : "No characters yet"}
                </h4>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  {searchQuery
                    ? "Try a different search term"
                    : "Create your first AI character and it will appear here"}
                </p>
                {!searchQuery && (
                  <Link
                    href="/wizard/basics"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Character
                  </Link>
                )}
              </motion.div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredCharacters.map((char, index) => (
                    <motion.div
                      key={char.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.03 }}
                      className={`glass rounded-2xl p-5 border cursor-pointer transition-all group hover:shadow-xl hover:shadow-violet-500/10 ${
                        selectedCharacter?.id === char.id
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-border hover:border-violet-500/50"
                      }`}
                      onClick={() => setSelectedCharacter(char)}
                    >
                      {/* Character Avatar */}
                      <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center mx-auto">
                          <span className="text-3xl">🤖</span>
                        </div>
                        {favorites.has(char.id) && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                            <Heart className="w-3 h-3 text-white fill-current" />
                          </div>
                        )}
                      </div>

                      <h4 className="font-semibold text-foreground text-center truncate mb-1">
                        {char.name}
                      </h4>
                      <p className="text-xs text-muted-foreground text-center mb-3">
                        {char.gender} • {char.age}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(char.id);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            favorites.has(char.id)
                              ? "bg-pink-500/20 text-pink-400"
                              : "hover:bg-white/10 text-muted-foreground"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${favorites.has(char.id) ? "fill-current" : ""}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportCharacter(char);
                          }}
                          className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-violet-400 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCharacter(char.id);
                          }}
                          disabled={deletingId === char.id}
                          className={`p-2 rounded-lg transition-colors ${
                            deleteConfirm === char.id
                              ? "bg-red-500/20 text-red-400"
                              : "hover:bg-white/10 text-muted-foreground hover:text-red-400"
                          }`}
                        >
                          {deletingId === char.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredCharacters.map((char, index) => (
                    <motion.div
                      key={char.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.03 }}
                      className={`glass rounded-xl p-4 border cursor-pointer transition-all group ${
                        selectedCharacter?.id === char.id
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-border hover:border-violet-500/50"
                      }`}
                      onClick={() => setSelectedCharacter(char)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center">
                            <span className="text-2xl">🤖</span>
                          </div>
                          {favorites.has(char.id) && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center">
                              <Heart className="w-2 h-2 text-white fill-current" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground truncate">
                            {char.name}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {char.gender} • {char.age} • {char.setting}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-violet-400">
                              {formatRelativeTime(char.created_at)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(char.id);
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              favorites.has(char.id)
                                ? "bg-pink-500/20 text-pink-400"
                                : "hover:bg-white/10 text-muted-foreground"
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${favorites.has(char.id) ? "fill-current" : ""}`} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExportCharacter(char);
                            }}
                            className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-violet-400 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCharacter(char.id);
                            }}
                            disabled={deletingId === char.id}
                            className={`p-2 rounded-lg transition-colors ${
                              deleteConfirm === char.id
                                ? "bg-red-500/20 text-red-400"
                                : "hover:bg-white/10 text-muted-foreground hover:text-red-400"
                            }`}
                          >
                            {deletingId === char.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Character Details Panel */}
          {viewMode === "list" && (
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selectedCharacter ? (
                  <motion.div
                    key={selectedCharacter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Character Header */}
                    <div className="glass rounded-2xl p-6 border border-border relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-bl-full" />
                      
                      <div className="flex items-start justify-between relative">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-2xl glass border-2 border-violet-500/30 flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-blue-500/20">
                            <span className="text-4xl">🤖</span>
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-foreground">
                              {selectedCharacter.name}
                            </h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="px-2 py-1 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-medium">
                                {selectedCharacter.gender}
                              </span>
                              <span className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium">
                                {selectedCharacter.age}
                              </span>
                              <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                                {selectedCharacter.relationship}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              {selectedCharacter.setting}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleFavorite(selectedCharacter.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              favorites.has(selectedCharacter.id)
                                ? "bg-pink-500/20 text-pink-400"
                                : "glass text-muted-foreground hover:text-pink-400"
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${favorites.has(selectedCharacter.id) ? "fill-current" : ""}`} />
                          </button>
                          <button
                            onClick={() => handleExportCharacter(selectedCharacter)}
                            className="p-2 rounded-lg glass text-muted-foreground hover:text-violet-400 transition-colors"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Quick Copy Buttons */}
                      <div className="flex gap-2 mt-4">
                        {selectedCharacter.generated_personality && (
                          <button
                            onClick={() => handleCopy(selectedCharacter.generated_personality!, "personality")}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
                          >
                            {copied === "personality" ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="text-muted-foreground">Copy Personality</span>
                          </button>
                        )}
                        {selectedCharacter.generated_scenario && (
                          <button
                            onClick={() => handleCopy(selectedCharacter.generated_scenario!, "scenario")}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
                          >
                            {copied === "scenario" ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="text-muted-foreground">Copy Scenario</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Personality Section */}
                    {selectedCharacter.generated_personality && (
                      <TerminalOutput
                        title="Personality"
                        content={selectedCharacter.generated_personality}
                      />
                    )}

                    {/* Scenario & Greeting Section */}
                    {selectedCharacter.generated_scenario && (
                      <TerminalOutput
                        title="Scenario & Greeting"
                        content={selectedCharacter.generated_scenario}
                      />
                    )}

                    {/* Personality Traits */}
                    <div className="glass rounded-2xl p-6 border border-border">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Personality Traits
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <TraitBar
                          label="Warmth"
                          value={selectedCharacter.personality_warmth}
                          leftLabel="Warm"
                          rightLabel="Cold"
                          color="from-orange-500 to-red-500"
                        />
                        <TraitBar
                          label="Confidence"
                          value={selectedCharacter.personality_confidence}
                          leftLabel="Shy"
                          rightLabel="Confident"
                          color="from-blue-500 to-cyan-500"
                        />
                        <TraitBar
                          label="Calmness"
                          value={selectedCharacter.personality_calmness}
                          leftLabel="Calm"
                          rightLabel="Chaotic"
                          color="from-emerald-500 to-green-500"
                        />
                        <TraitBar
                          label="Reserve"
                          value={selectedCharacter.personality_reserve}
                          leftLabel="Emotional"
                          rightLabel="Reserved"
                          color="from-violet-500 to-purple-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass rounded-3xl p-12 border border-border text-center h-full flex flex-col items-center justify-center min-h-[400px]"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 flex items-center justify-center mb-6">
                      <Eye className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Select a character
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Click on any character from the list to view their full details, personality, and generated content
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TraitBar({
  label,
  value,
  leftLabel,
  rightLabel,
  color = "from-violet-500 to-blue-500",
}: {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
  color?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{leftLabel}</span>
        <span className="text-violet-400 font-medium">{label} ({value}%)</span>
        <span className="text-muted-foreground">{rightLabel}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
        />
      </div>
    </div>
  );
}
