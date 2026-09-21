"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import {
  ShieldCheckIcon,
  PhotoIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface HeaderProps {
  onSelectSample: (sampleUrl: string, sampleName: string) => void;
  onReset: () => void;
  onExport: () => void;
  hasImage: boolean;
  activeTab?: string;
  setActiveTab?: (tab: any) => void;
}

export const SAMPLE_IMAGES = [
  {
    name: "Portrait",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    desc: "Remove BG & AI Enhance",
  },
  {
    name: "Cyberpunk City",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80",
    desc: "Pixel Art & Compression",
  },
  {
    name: "Low-Light Night",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    desc: "Denoise & Color Grading",
  },
];

export const Header: React.FC<HeaderProps> = ({
  onSelectSample,
  onReset,
  onExport,
  hasImage,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [isSampleMenuOpen, setIsSampleMenuOpen] = useState(false);
  const sampleMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sampleMenuRef.current && !sampleMenuRef.current.contains(event.target as Node)) {
        setIsSampleMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [activeSection, setActiveSection] = useState<"home" | "features">(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("activeNavSection");
      if (stored === "features" || window.location.hash === "#features") {
        return "features";
      }
    }
    return "home";
  });

  // Track active section on Home page (hash & scroll spy)
  useEffect(() => {
    if (!isHome) return;

    const stored = sessionStorage.getItem("activeNavSection");
    if (stored === "features" || window.location.hash === "#features") {
      setActiveSection("features");
      sessionStorage.removeItem("activeNavSection");
      const scrollToFeatures = () => {
        const featEl = document.getElementById("features");
        if (featEl) {
          featEl.scrollIntoView({ behavior: "smooth" });
        }
      };
      scrollToFeatures();
      setTimeout(scrollToFeatures, 120);
      setTimeout(scrollToFeatures, 350);
    }

    const checkHash = () => {
      if (typeof window !== "undefined") {
        if (window.location.hash === "#features") {
          setActiveSection("features");
        } else if (window.scrollY < 200) {
          setActiveSection("home");
        }
      }
    };

    const featEl = document.getElementById("features");
    let observer: IntersectionObserver | null = null;

    if (featEl) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection("features");
            } else if (entry.boundingClientRect.top > 200) {
              setActiveSection("home");
            }
          });
        },
        {
          rootMargin: "-100px 0px -40% 0px",
          threshold: 0.1,
        }
      );
      observer.observe(featEl);
    }

    const handleScroll = () => {
      if (window.scrollY < 180 && window.location.hash !== "#features") {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", checkHash);

    return () => {
      if (observer && featEl) observer.unobserve(featEl);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", checkHash);
    };
  }, [isHome]);

  const navItems = [
    { id: "home", href: "/", label: "Home" },
    { id: "features", href: "/#features", label: "Features" },
    { id: "studio", href: "/studio", label: "Toolkit Studio" },
    { id: "editor", href: "/editor", label: "Pro Color Editor" },
  ];

  const handleNavClick = (id: string, href: string, e: React.MouseEvent) => {
    if (id === "features") {
      e.preventDefault();
      sessionStorage.setItem("activeNavSection", "features");
      setActiveSection("features");
      if (isHome) {
        window.history.pushState(null, "", "#features");
        const featEl = document.getElementById("features");
        if (featEl) {
          featEl.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push("/#features");
      }
    } else if (id === "home") {
      sessionStorage.removeItem("activeNavSection");
      if (isHome) {
        e.preventDefault();
        setActiveSection("home");
        window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else {
      sessionStorage.removeItem("activeNavSection");
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("#mobile-menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#121212]/95 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="inline-block" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo size={28} />
          </Link>
        </div>

        {/* Center: Desktop Navigation with CSS pill indicator */}
        <nav className="hidden lg:flex items-center bg-[#1c1c1c] p-1 rounded-full border border-white/[0.08] text-xs font-medium shrink-0 shadow-inner relative">
          {navItems.map((item) => {
            let isItemActive = false;
            if (item.id === "home") {
              isItemActive = isHome && activeSection === "home";
            } else if (item.id === "features") {
              isItemActive = isHome && activeSection === "features";
            } else {
              isItemActive = pathname === item.href;
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(item.id, item.href, e)}
                className={`relative px-4 py-1.5 rounded-full transition-all duration-200 ease-out whitespace-nowrap z-10 cursor-pointer ${
                  isItemActive
                    ? "text-black font-semibold bg-[#ff47ff] shadow-md shadow-[#ff47ff]/30"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}

          {isHome && (
            <span className="hidden xl:flex px-3 py-1.5 rounded-full text-neutral-400 items-center gap-1 text-[11px] whitespace-nowrap border-l border-white/[0.08] ml-1 pl-3">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-[#64ed68]" /> Client-Side Privacy
            </span>
          )}
        </nav>

        {/* Right: Workspace Actions (Desktop & Mobile) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Desktop Samples Dropdown */}
          {!isHome && (
            <div className="hidden sm:block relative shrink-0" ref={sampleMenuRef}>
              <button
                onClick={() => setIsSampleMenuOpen(!isSampleMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-[#1c1c1c] hover:bg-[#252525] rounded-full border border-white/[0.08] hover:border-[#ff47ff]/30 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                title="Load a demo photo"
              >
                <PhotoIcon className="w-3.5 h-3.5 text-[#ff47ff]" />
                <span>Samples</span>
                <ChevronDownIcon
                  className={`w-3 h-3 text-neutral-400 transition-transform duration-250 ${isSampleMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSampleMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 py-1.5 bg-[#1c1c1c] border border-white/10 rounded-2xl shadow-2xl z-50 backdrop-blur-xl animate-dropdown-in">
                  <div className="px-3 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider border-b border-white/5 mb-1">
                    Try Demo Images
                  </div>
                  {SAMPLE_IMAGES.map((sample) => (
                    <button
                      key={sample.name}
                      onClick={() => {
                        onSelectSample(sample.url, sample.name);
                        setIsSampleMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-[#ff47ff]/10 flex flex-col transition-colors group cursor-pointer hover:translate-x-0.5"
                    >
                      <span className="text-xs font-medium text-neutral-200 group-hover:text-[#ff47ff] transition-colors">
                        {sample.name}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {sample.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Desktop Reset Action */}
          {hasImage && !isHome && (
            <button
              onClick={onReset}
              className="hidden sm:flex group items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-[#1c1c1c] hover:bg-[#252525] rounded-full border border-white/[0.08] hover:border-white/20 transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
              title="Reset all adjustments"
            >
              <ArrowPathIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:rotate-180 transition-transform duration-500 ease-out" />
              <span>Reset</span>
            </button>
          )}

          {/* Export / Launch Studio CTA Button */}
          {!isHome ? (
            <button
              onClick={onExport}
              disabled={!hasImage}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 active:scale-95 ${
                hasImage
                  ? "bg-[#ff47ff] hover:bg-[#e035e0] text-black shadow-lg shadow-[#ff47ff]/25 hover:shadow-[#ff47ff]/45 hover:scale-[1.03] cursor-pointer"
                  : "bg-[#1c1c1c] text-neutral-500 border border-white/[0.08] cursor-not-allowed opacity-60"
              }`}
            >
              <ArrowDownTrayIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span className="hidden xs:inline">Export Photo</span>
              <span className="xs:hidden">Export</span>
            </button>
          ) : (
            <Link
              href="/studio"
              className="group flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#ff47ff] hover:bg-[#e035e0] text-black font-semibold text-xs shadow-lg shadow-[#ff47ff]/25 hover:shadow-[#ff47ff]/45 transition-all whitespace-nowrap shrink-0 cursor-pointer hover:scale-[1.04] active:scale-95"
            >
              <span>Launch Studio</span>
              <ArrowTopRightOnSquareIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-[#1c1c1c] hover:bg-[#252525] border border-white/[0.08] text-neutral-300 hover:text-white transition-all active:scale-95 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-5 h-5 text-[#ff47ff] transition-transform rotate-90" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden border-t border-white/[0.08] bg-[#141414]/98 backdrop-blur-2xl px-4 py-4 flex flex-col gap-3 shadow-2xl animate-dropdown-in"
        >
          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-3">
              Navigation
            </span>
            {navItems.map((item) => {
              let isItemActive = false;
              if (item.id === "home") {
                isItemActive = isHome && activeSection === "home";
              } else if (item.id === "features") {
                isItemActive = isHome && activeSection === "features";
              } else {
                isItemActive = pathname === item.href;
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(item.id, item.href, e);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isItemActive
                      ? "bg-[#ff47ff] text-black shadow-md shadow-[#ff47ff]/25"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {isItemActive && (
                    <span className="w-2 h-2 rounded-full bg-black" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Studio Tools on Mobile (Samples & Reset) */}
          {!isHome && (
            <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-3">
                Quick Demo Samples
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_IMAGES.map((sample) => (
                  <button
                    key={sample.name}
                    onClick={() => {
                      onSelectSample(sample.url, sample.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-xl bg-[#1c1c1c] border border-white/5 text-center text-xs text-neutral-300 hover:text-white hover:border-[#ff47ff]/40 transition-all active:scale-95"
                  >
                    <span className="block font-medium truncate">{sample.name}</span>
                  </button>
                ))}
              </div>

              {hasImage && (
                <button
                  onClick={() => {
                    onReset();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1c1c1c] border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white transition-all active:scale-95"
                >
                  <ArrowPathIcon className="w-4 h-4 text-neutral-400" />
                  <span>Reset All Adjustments</span>
                </button>
              )}
            </div>
          )}

          {/* Privacy Footnote */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] text-neutral-400">
            <ShieldCheckIcon className="w-4 h-4 text-[#64ed68]" />
            <span>100% Client-Side Privacy Protection</span>
          </div>
        </div>
      )}
    </header>
  );
};
