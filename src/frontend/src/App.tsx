import DemoModal from "@/components/DemoModal";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Box,
  Brain,
  Building2,
  ChevronDown,
  Droplets,
  Factory,
  Link2,
  Mail,
  MapPin,
  Satellite,
  Shield,
  Wheat,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { SiLinkedin, SiX } from "react-icons/si";

// Lazy-load Three.js canvas to avoid SSR issues
const HeroCanvas = lazy(() => import("@/components/HeroCanvas"));

// ── Fade-in animation wrapper ────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 30 : 0,
    x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────
function Navigation({ onDemoClick }: { onDemoClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    {
      label: "Technologie",
      href: "#technologie",
      ocid: "nav.technologie.link",
    },
    { label: "Cas d'Usage", href: "#cas-usage", ocid: "nav.cas_usage.link" },
    { label: "Notre Vision", href: "#vision", ocid: "nav.vision.link" },
    { label: "À propos", href: "#apropos", ocid: "nav.apropos.link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/90 backdrop-blur-xl border-b border-neon-cyan/10 shadow-[0_4px_24px_oklch(0.07_0.025_255/0.6)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="h-12 w-auto overflow-hidden">
            <img
              src="/assets/uploads/Gemini_Generated_Image_5y1dsk5y1dsk5y1d-2--1.png"
              alt="MEDEN RESILIENCE Logo"
              className="h-full w-auto object-contain"
            />
          </div>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.ocid}
              href={link.href}
              data-ocid={link.ocid}
              className="text-sm font-medium text-muted-foreground hover:text-neon-cyan transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA button */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            data-ocid="nav.demo.button"
            onClick={onDemoClick}
            className="font-semibold text-sm px-5 py-2 rounded-lg glow-cyan-sm transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.18 196 / 0.15) 0%, oklch(0.55 0.22 250 / 0.15) 100%)",
              border: "1px solid oklch(0.88 0.18 196 / 0.4)",
              color: "oklch(0.88 0.18 196)",
            }}
          >
            Demander une Démo
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-neon-cyan transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-navy-deep/95 backdrop-blur-xl border-t border-neon-cyan/10 px-6 py-4 space-y-3"
        >
          {navLinks.map((link) => (
            <a
              key={link.ocid}
              href={link.href}
              data-ocid={link.ocid}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-neon-cyan transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <Button
            data-ocid="nav.demo.button"
            onClick={() => {
              onDemoClick();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 font-semibold text-sm"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.18 196) 0%, oklch(0.70 0.22 210) 100%)",
              color: "oklch(0.07 0.02 255)",
            }}
          >
            Demander une Démo Technique
          </Button>
        </motion.div>
      )}
    </header>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection({ onDemoClick }: { onDemoClick: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Three.js background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30" />

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 120%, oklch(0.09 0.025 255) 30%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse-glow" />
          <span className="text-xs font-mono text-neon-cyan tracking-widest uppercase">
            Jumeau Numérique Hydrique — Maroc
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-foreground">Anticiper le</span>
          <br />
          <span
            className="glow-text-cyan"
            style={{ color: "oklch(0.88 0.18 196)" }}
          >
            Stress Hydrique
          </span>
          <br />
          <span className="text-foreground">par le Jumeau Numérique</span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(90deg, oklch(0.88 0.18 196), oklch(0.65 0.22 250))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Souverain.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          MEDEN déploie une IA géospatiale de pointe pour transformer les
          données environnementales en un bouclier stratégique 24/7.{" "}
          <span className="text-foreground font-medium">
            Sécurisons l'avenir de l'eau au Maroc, dès aujourd'hui.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            data-ocid="hero.explore.primary_button"
            onClick={onDemoClick}
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-base font-bold rounded-xl glow-cyan transition-all duration-300 hover:scale-105 group"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.18 196) 0%, oklch(0.70 0.22 210) 100%)",
              color: "oklch(0.07 0.02 255)",
              boxShadow: "0 0 30px oklch(0.88 0.18 196 / 0.4)",
            }}
          >
            Explorer la Plateforme
            <ArrowRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Button>

          <Button
            data-ocid="hero.manifeste.secondary_button"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              border: "1px solid oklch(0.55 0.22 250 / 0.5)",
              color: "oklch(0.85 0.12 220)",
            }}
            onClick={() =>
              document
                .getElementById("vision")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Lire le Manifeste de Résilience
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#probleme"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors group"
          >
            <span className="text-xs font-mono tracking-widest uppercase">
              Découvrir
            </span>
            <ChevronDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Le Problème ───────────────────────────────────────────────────────────────
function ProblemeSection() {
  const stats = [
    {
      value: "37%",
      label: "des aquifères marocains en stress critique",
      color: "oklch(0.75 0.22 30)",
    },
    {
      value: "12",
      label: "bassins versants sous surveillance continue",
      color: "oklch(0.88 0.18 196)",
    },
    {
      value: "2050",
      label: "projection de pénurie sans action immédiate",
      color: "oklch(0.65 0.22 250)",
    },
  ];

  return (
    <section id="probleme" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.55 0.22 250 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-mono tracking-widest text-neon-cyan uppercase mb-4">
              — L'Urgence
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl leading-tight text-foreground max-w-3xl mx-auto mb-6">
              La donnée statique ne peut plus résoudre une crise{" "}
              <span style={{ color: "oklch(0.88 0.18 196)" }}>dynamique.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Face au stress hydrique historique, les rapports PDF et les
              données fragmentées ne suffisent plus. Les décideurs ont besoin
              d'une vision prédictive, pas d'un constat de crise. MEDEN comble
              le fossé entre la réalité géologique et l'action politique.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={stat.value} delay={i * 0.15} direction="up">
              <div
                className="relative rounded-2xl p-8 text-center group border border-glow hover:border-neon-cyan/40 transition-all duration-300"
                style={{
                  background: "oklch(0.11 0.03 255 / 0.8)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Glow accent */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 opacity-60"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  }}
                />

                <div
                  className="font-display font-black text-5xl md:text-6xl mb-3"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── La Technologie (Bento Grid) ───────────────────────────────────────────────
function TechnologieSection() {
  const tiles = [
    {
      id: 1,
      icon: Satellite,
      title: "Ingestion Multimodale",
      description:
        "Fusion en temps réel des images satellites (Sentinel/Landsat) et des capteurs de terrain pour une précision millimétrique.",
      ocid: "tech.tile.1",
      wide: false,
    },
    {
      id: 2,
      icon: Brain,
      title: "Moteur Prédictif IA",
      description:
        "Modèles de Deep Learning propriétaires spécialisés dans le comportement des aquifères et l'humidité des sols.",
      ocid: "tech.tile.2",
      wide: false,
    },
    {
      id: 3,
      icon: Box,
      title: "Simulation 4D",
      description:
        "Ne vous contentez pas d'observer. Simulez. Visualisez l'état des ressources hydriques en 2030 avec nos outils de projection spatio-temporelle.",
      ocid: "tech.tile.3",
      wide: true,
    },
    {
      id: 4,
      icon: Link2,
      title: "Confiance Blockchain & Web 3.0",
      description:
        "Un registre immuable pour garantir l'intégrité absolue et la traçabilité des données hydriques critiques.",
      ocid: "tech.tile.4",
      wide: false,
    },
    {
      id: 5,
      icon: Shield,
      title: "Souveraineté Totale",
      description:
        "Infrastructure Cloud sécurisée et hébergée exclusivement au Maroc pour une indépendance technologique totale.",
      ocid: "tech.tile.5",
      wide: false,
    },
  ];

  return (
    <section id="technologie" className="relative py-28 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 50%, oklch(0.55 0.22 250 / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-mono tracking-widest text-neon-cyan uppercase mb-4">
              — Savoir-Faire
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl leading-tight text-foreground">
              Une Technologie{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.88 0.18 196), oklch(0.65 0.22 250))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                de Rupture
              </span>
            </h2>
          </div>
        </FadeIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <FadeIn
                key={tile.id}
                delay={i * 0.1}
                className={tile.wide ? "lg:col-span-2" : ""}
              >
                <motion.div
                  data-ocid={tile.ocid}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative h-full rounded-2xl p-7 border border-white/[0.06] cursor-default group overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg, oklch(0.13 0.04 255 / 0.9) 0%, oklch(0.10 0.03 255 / 0.9) 100%)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "0 0 0 1px oklch(0.88 0.18 196 / 0.0), inset 0 0 30px oklch(0.09 0.025 255 / 0.3)",
                  }}
                >
                  {/* Hover border glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      border: "1px solid oklch(0.88 0.18 196 / 0.35)",
                      boxShadow:
                        "0 0 24px oklch(0.88 0.18 196 / 0.12), inset 0 0 24px oklch(0.88 0.18 196 / 0.03)",
                    }}
                  />

                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-20 rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(circle at top right, oklch(0.88 0.18 196 / 0.3), transparent 70%)",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 relative"
                    style={{
                      background: "oklch(0.88 0.18 196 / 0.1)",
                      border: "1px solid oklch(0.88 0.18 196 / 0.2)",
                    }}
                  >
                    <Icon size={22} style={{ color: "oklch(0.88 0.18 196)" }} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-lg text-foreground mb-3">
                    {tile.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tile.description}
                  </p>

                  {/* Tile number */}
                  <div className="absolute bottom-5 right-5 font-mono text-2xl font-bold opacity-5 text-neon-cyan">
                    0{tile.id}
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Tableau de Bord ───────────────────────────────────────────────────────────
function DashboardSection() {
  const features = [
    { icon: Droplets, label: "Alertes de sécheresse précoces" },
    { icon: BarChart3, label: "Monitoring des bassins versants" },
    { icon: ArrowRight, label: "Optimisation des transferts d'eau" },
  ];

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, oklch(0.55 0.22 250 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-mono tracking-widest text-neon-cyan uppercase mb-4">
              — La Preuve
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl leading-tight text-foreground mb-4">
              Centre de{" "}
              <span style={{ color: "oklch(0.88 0.18 196)" }}>
                Commandement
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Un centre de commandement pour la résilience territoriale.
            </p>
          </div>
        </FadeIn>

        {/* Screen mockup */}
        <FadeIn delay={0.2}>
          <div className="relative mx-auto max-w-4xl">
            {/* Outer bezel */}
            <div
              className="relative rounded-2xl p-3 mx-auto"
              style={{
                background: "linear-gradient(145deg, #1a2a4a 0%, #0d1530 100%)",
                boxShadow:
                  "0 0 0 2px #1a2a4a, 0 0 0 3px #0d1020, 0 60px 100px -20px oklch(0.07 0.025 255), 0 0 80px oklch(0.88 0.18 196 / 0.08)",
              }}
            >
              {/* Top bar with dots */}
              <div className="flex items-center gap-2 mb-2 px-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <div className="flex-1 mx-4 h-5 rounded bg-white/5 flex items-center px-3">
                  <span className="text-xs text-white/20 font-mono">
                    meden.ma/dashboard
                  </span>
                </div>
              </div>

              {/* Screen */}
              <div
                className="relative rounded-lg overflow-hidden"
                style={{
                  boxShadow: "inset 0 0 60px oklch(0.07 0.025 255 / 0.5)",
                }}
              >
                <img
                  src="/assets/generated/dashboard-mockup.dim_1200x750.jpg"
                  alt="MEDEN Dashboard"
                  className="w-full h-auto block"
                />
                {/* Screen glare */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)",
                  }}
                />
              </div>
            </div>

            {/* Glow beneath screen */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-3xl opacity-30 pointer-events-none"
              style={{ background: "oklch(0.88 0.18 196)" }}
            />
          </div>
        </FadeIn>

        {/* Feature badges */}
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 backdrop-blur-sm"
              >
                <Icon size={16} style={{ color: "oklch(0.88 0.18 196)" }} />
                <span className="text-sm font-medium text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Cas d'Usage ────────────────────────────────────────────────────────────────
function CasUsageSection() {
  const useCases = [
    {
      icon: Building2,
      title: "Gouvernance Publique (ABH)",
      description:
        "Optimisation de la gestion des agences de bassins hydrauliques grâce à une vision prédictive et des alertes en temps réel.",
      ocid: "usecase.gouvernance.card",
      accentColor: "oklch(0.65 0.22 250)",
      tag: "Secteur Public",
    },
    {
      icon: Wheat,
      title: "Agro-Industrie",
      description:
        "Protection des cultures stratégiques et planification de l'irrigation intelligente pour maximiser les rendements avec un minimum d'eau.",
      ocid: "usecase.agro.card",
      accentColor: "oklch(0.75 0.2 140)",
      tag: "Agriculture",
    },
    {
      icon: Factory,
      title: "Infrastructures",
      description:
        "Monitoring des stations de dessalement et sécurité des autoroutes de l'eau pour une infrastructure résiliente.",
      ocid: "usecase.infra.card",
      accentColor: "oklch(0.88 0.18 196)",
      tag: "Infrastructure",
    },
  ];

  return (
    <section id="cas-usage" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />

      <div className="relative max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-mono tracking-widest text-neon-cyan uppercase mb-4">
              — Applications Terrain
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl leading-tight text-foreground">
              Des Solutions pour{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.88 0.18 196), oklch(0.65 0.22 250))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Chaque Secteur
              </span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <FadeIn key={uc.ocid} delay={i * 0.15}>
                <motion.div
                  data-ocid={uc.ocid}
                  whileHover={{ scale: 1.02, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative rounded-2xl p-8 border border-white/[0.06] group overflow-hidden cursor-default h-full"
                  style={{
                    background:
                      "linear-gradient(145deg, oklch(0.13 0.04 255 / 0.9) 0%, oklch(0.10 0.03 255 / 0.9) 100%)",
                  }}
                >
                  {/* Hover glow border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      border: `1px solid ${uc.accentColor.replace(")", " / 0.4)")}`,
                      boxShadow: `0 0 24px ${uc.accentColor.replace(")", " / 0.1)")}`,
                    }}
                  />

                  {/* Background glow */}
                  <div
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ background: uc.accentColor }}
                  />

                  {/* Tag */}
                  <span
                    className="inline-block text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full mb-5"
                    style={{
                      background: `${uc.accentColor.replace(")", " / 0.1)")}`,
                      color: uc.accentColor,
                      border: `1px solid ${uc.accentColor.replace(")", " / 0.2)")}`,
                    }}
                  >
                    {uc.tag}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: `${uc.accentColor.replace(")", " / 0.1)")}`,
                      border: `1px solid ${uc.accentColor.replace(")", " / 0.25)")}`,
                    }}
                  >
                    <Icon size={26} style={{ color: uc.accentColor }} />
                  </div>

                  <h3 className="font-display font-bold text-xl text-foreground mb-3">
                    {uc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {uc.description}
                  </p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Notre Vision ──────────────────────────────────────────────────────────────
function VisionSection() {
  return (
    <section id="vision" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.55 0.22 250 / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <span className="inline-block text-xs font-mono tracking-widest text-neon-cyan uppercase mb-4">
            — Notre Mission
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl leading-tight text-foreground mb-8">
            Manifeste de{" "}
            <span style={{ color: "oklch(0.88 0.18 196)" }}>Résilience</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            className="relative p-10 md:p-14 rounded-3xl border border-neon-cyan/15 text-left"
            style={{
              background:
                "linear-gradient(145deg, oklch(0.12 0.04 255 / 0.8) 0%, oklch(0.09 0.03 255 / 0.8) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Quote decoration */}
            <div
              className="absolute top-8 left-8 font-display font-black text-8xl leading-none pointer-events-none select-none"
              style={{ color: "oklch(0.88 0.18 196 / 0.12)" }}
            >
              "
            </div>

            <p className="relative z-10 text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 font-light">
              L'eau est la ressource la plus stratégique de ce siècle. Face aux
              défis climatiques et démographiques du Maroc, la résilience
              nationale passe par la{" "}
              <span className="text-foreground font-semibold">
                maîtrise technologique souveraine
              </span>{" "}
              de nos données environnementales.
            </p>
            <p className="relative z-10 text-base text-muted-foreground leading-relaxed">
              MEDEN n'est pas seulement une plateforme — c'est un{" "}
              <span className="text-neon-cyan font-semibold">
                engagement envers la génération future
              </span>
              . Chaque modèle prédictif, chaque simulation, chaque alerte est un
              acte de souveraineté pour le Maroc.
            </p>

            {/* Signature line */}
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.88 0.18 196 / 0.3), transparent)",
                }}
              />
              <span className="font-mono text-xs text-neon-cyan tracking-widest uppercase">
                MEDEN — Sovereign Engineering
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Fondatrice ────────────────────────────────────────────────────────────────
function FondatriceSection() {
  return (
    <section id="apropos" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 0% 50%, oklch(0.55 0.22 250 / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-mono tracking-widest text-neon-cyan uppercase mb-4">
              — À propos
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl leading-tight text-foreground">
              Expertise &{" "}
              <span style={{ color: "oklch(0.88 0.18 196)" }}>Vision</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <FadeIn direction="left">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Frame */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 1px oklch(0.88 0.18 196 / 0.2), 0 0 60px oklch(0.88 0.18 196 / 0.08), 0 40px 80px -20px oklch(0.07 0.025 255)",
                }}
              >
                <img
                  src="/assets/uploads/unnamed-1.jpg"
                  alt="Fatima Zahra Bassam — CEO & Fondatrice, MEDEN"
                  className="w-full h-auto block object-cover object-top"
                />
                {/* Overlay gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-40"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.09 0.025 255) 20%, transparent)",
                  }}
                />
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-display font-bold text-xl text-foreground">
                    Fatima Zahra Bassam
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "oklch(0.88 0.18 196)" }}
                  >
                    CEO & Fondatrice, MEDEN
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border border-neon-cyan/10 -z-10"
                style={{ background: "oklch(0.13 0.04 255)" }}
              />
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-2xl border border-neon-cyan/5 -z-20"
                style={{ background: "oklch(0.11 0.03 255)" }}
              />
            </div>
          </FadeIn>

          {/* Text content */}
          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-6">
              {/* Quote mark */}
              <div
                className="font-display font-black text-7xl leading-none"
                style={{ color: "oklch(0.88 0.18 196 / 0.25)" }}
              >
                "
              </div>

              <blockquote className="text-base md:text-lg font-light text-muted-foreground leading-relaxed -mt-4">
                Experte en{" "}
                <span className="font-semibold text-foreground">
                  Géosciences (Mines & Carrières)
                </span>
                , Fatima Zahra Bassam mène des recherches doctorales sur la{" "}
                <span className="font-semibold text-neon-cyan">
                  modélisation des ressources du sous-sol marocain
                </span>
                . Alliant une rigueur scientifique académique à une vision
                stratégique du{" "}
                <span className="font-semibold text-foreground">
                  Management de l'Innovation
                </span>
                , elle a fondé MEDEN pour répondre à l'urgence du{" "}
                <span className="font-semibold text-neon-cyan">
                  stress hydrique au Maroc
                </span>
                . Sa double compétence lui permet de traduire des données
                géologiques complexes en{" "}
                <span className="font-semibold text-foreground">
                  outils de décision technologiques souverains
                </span>
                .
              </blockquote>

              <div
                className="h-px w-24"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.88 0.18 196 / 0.5), transparent)",
                }}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="relative py-16 px-6 border-t border-neon-cyan/10"
      style={{ background: "oklch(0.07 0.02 255)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.88 0.18 196 / 0.3), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-auto overflow-hidden">
                <img
                  src="/assets/uploads/Gemini_Generated_Image_5y1dsk5y1dsk5y1d-2--1.png"
                  alt="MEDEN RESILIENCE Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <p
              className="text-sm leading-relaxed font-mono"
              style={{ color: "oklch(0.88 0.18 196 / 0.7)" }}
            >
              Sovereign Engineering for a Resilient Future.
              <br />
              Made in Morocco.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@meden.ma"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                <Mail size={15} />
                contact@meden.ma
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={15} />
                Casablanca, Maroc
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn MEDEN"
                  className="p-2 rounded-lg border border-white/10 text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
                >
                  <SiLinkedin size={16} />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X/Twitter MEDEN"
                  className="p-2 rounded-lg border border-white/10 text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
                >
                  <SiX size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-5">
              Légal
            </h4>
            <div className="space-y-3">
              <a
                href="/privacy"
                className="block text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                Politique de confidentialité
              </a>
              <a
                href="/terms"
                className="block text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {currentYear} MEDEN. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ♥ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neon-cyan transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onDemoClick={() => setIsDemoOpen(true)} />

      <main>
        <HeroSection onDemoClick={() => setIsDemoOpen(true)} />
        <ProblemeSection />
        <TechnologieSection />
        <DashboardSection />
        <CasUsageSection />
        <VisionSection />
        <FondatriceSection />
      </main>

      <Footer />

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}
