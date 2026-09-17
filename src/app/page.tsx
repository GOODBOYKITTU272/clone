"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Crosshair, 
  Maximize2, 
  Eye, 
  ChevronRight,
  ExternalLink,
  ChevronDown,
  UserCheck,
  Database,
  Globe,
  ShieldCheck,
  Lock
} from "lucide-react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("cv");
  const [activeTool, setActiveTool] = useState<string>("bbox");
  const [activePill, setActivePill] = useState<number>(0);
  const [bboxApproved, setBboxApproved] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleApprove = () => {
    setBboxApproved(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#f97316", "#3b82f6", "#10b981"]
      });
    } catch {
      // fallback if canvas not available
    }
    showToast("✓ Annotation verified and committed to training dataset!");
    setTimeout(() => setBboxApproved(false), 3000);
  };

  // Canvas background rendering interactive stippled particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: { 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      size: number; 
      alpha: number 
    }[] = [];
    const numParticles = 140;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.35 + 0.1,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Faint mouse repulsion/gravitation
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          p.x -= (dx / dist) * 0.4;
          p.y -= (dy / dist) * 0.4;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${p.alpha})`;
        ctx.fill();
      });

      // Connecting stippled lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.07 * (1 - dist / 85)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  // Floating pill data matching SuperAnnotate screenshot
  const pills = [
    { label: "RL Environments", top: "10%", right: "18%", delay: 0 },
    { label: "Multimodal Labeling", top: "25%", right: "5%", delay: 0.1 },
    { label: "RLHF & SFT", top: "42%", right: "28%", delay: 0.2 },
    { label: "Agent Trajectories", top: "58%", right: "3%", delay: 0.3 },
    { label: "Evaluation", top: "74%", right: "22%", delay: 0.4 },
    { label: "Off-the-shelf Datasets", top: "88%", right: "12%", delay: 0.5 },
  ];

  return (
    <div 
      className="min-h-screen flex flex-col font-sans bg-[#faf8f5] text-[#111827] selection:bg-[#fee2e2] selection:text-[#ef4444]"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/85 backdrop-blur-md border-b border-black/5 h-[72px] flex items-center transition-all">
        <div className="max-w-[1320px] w-full mx-auto px-7 flex items-center justify-between">
          
          <motion.a 
            href="#" 
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img 
              src="/provenetix_logo.jpg" 
              alt="Provenetix AI Logo" 
              className="h-8 w-auto object-contain rounded-md shadow-xs group-hover:ring-2 group-hover:ring-[#ef4444]/30 transition-all"
            />
            <span className="text-xl font-extrabold tracking-tight text-[#111827]">
              Provenetix<span className="text-[#f26522]">AI</span>
            </span>
          </motion.a>

          {/* Navigation Items with smooth hover */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            <li>
              <a href="#infra" className="text-[14.5px] font-semibold text-gray-700 hover:text-black flex items-center gap-1 transition-colors">
                What We Do <ChevronDown className="w-3 h-3 text-gray-500" />
              </a>
            </li>
            <li>
              <a href="#experts" className="text-[14.5px] font-semibold text-gray-700 hover:text-black flex items-center gap-1 transition-colors">
                Solutions <ChevronDown className="w-3 h-3 text-gray-500" />
              </a>
            </li>
            <li>
              <a href="#legal" className="text-[14.5px] font-semibold text-gray-700 hover:text-black flex items-center gap-1 transition-colors">
                Resources <ChevronDown className="w-3 h-3 text-gray-500" />
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-5">
            <a 
              href="#legal" 
              className="text-[14.5px] font-semibold text-gray-700 hover:text-black transition-colors"
              onClick={() => showToast("Sign in portal active")}
            >
              Sign In
            </a>
            
            <motion.button
              className="bg-[#111827] text-white text-[14px] font-bold px-5 py-2.5 rounded-full hover:bg-black transition-all shadow-sm cursor-pointer"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => showToast("Connecting you with our AI Solutions Architect...")}
            >
              Talk to Us
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 min-h-[640px] flex items-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <div className="max-w-[1320px] w-full mx-auto px-7 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Hero Content */}
          <motion.div 
            className="lg:col-span-7 max-w-[680px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Rating Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#ef4444] text-xs tracking-wider">★★★★★</span>
              <span className="text-[13.5px] font-extrabold text-[#111827]">4.9</span>
              <span className="bg-[#ef4444] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide shadow-xs">G2</span>
              <span className="text-[13px] text-gray-400 font-semibold">#1 AI Data Company</span>
            </div>

            {/* Headline with exact highlight pills */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#111827] leading-[1.15] tracking-tight mb-7">
              <span className="inline-block bg-[#fee2e2] text-[#111827] px-3 py-1 rounded-2xl border border-[#fca5a5]/30 shadow-xs mr-2 mb-2">
                Platform,
              </span>
              <span className="inline-block bg-[#fee2e2] text-[#111827] px-3 py-1 rounded-2xl border border-[#fca5a5]/30 shadow-xs mr-2 mb-2">
                experts,
              </span>{" "}
              and{" "}
              <span className="inline-block bg-[#fee2e2] text-[#111827] px-3 py-1 rounded-2xl border border-[#fca5a5]/30 shadow-xs mb-2">
                workflows
              </span>{" "}
              to deliver the highest-quality AI data.
            </h1>

            {/* CTA Button */}
            <div className="pt-2 flex items-center gap-4">
              <motion.button
                className="bg-[#111827] text-white text-[15px] font-bold px-7 py-3.5 rounded-full shadow-lg hover:bg-black transition-all cursor-pointer flex items-center gap-2"
                whileHover={{ scale: 1.04, y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => showToast("Contact form opened. We'll be in touch within 2 hours.")}
              >
                Contact us
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </motion.button>
              
              <a 
                href="#infra"
                className="text-sm font-bold text-gray-600 hover:text-black flex items-center gap-1 transition-colors px-4 py-2"
              >
                Explore Platform <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </motion.div>

          {/* Right Floating Nodes Pillar with Framer Motion float physics */}
          <div className="lg:col-span-5 relative h-[450px] hidden md:flex flex-col justify-center">
            
            {/* SVG Connecting Vector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#fca5a5]/40" strokeDasharray="3 3">
              <line x1="20%" y1="50%" x2="60%" y2="15%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="70%" y2="28%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="55%" y2="45%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="75%" y2="62%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="65%" y2="76%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="50%" y2="90%" strokeWidth="1.2" />
            </svg>

            {pills.map((pill, idx) => (
              <motion.div
                key={pill.label}
                className={`absolute bg-white/95 border px-3.5 py-1.5 rounded-md shadow-xs flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 cursor-pointer transition-all ${
                  activePill === idx 
                    ? "border-[#ef4444] shadow-md ring-2 ring-[#ef4444]/20 text-black" 
                    : "border-black/10 hover:border-[#ef4444]"
                }`}
                style={{ top: pill.top, right: pill.right }}
                animate={{
                  y: [0, idx % 2 === 0 ? -6 : 6, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5 + idx * 0.4,
                  ease: "easeInOut",
                  delay: pill.delay,
                }}
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActivePill(idx);
                  showToast(`Selected module: ${pill.label}`);
                }}
              >
                <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-xs"></span>
                {pill.label}
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* Endless Vector Logo Marquee */}
      <div className="bg-white border-y border-black/5 py-7 overflow-hidden relative z-10">
        <div className="flex items-center gap-16 w-max animate-marquee">
          <img src="/aws.svg" alt="AWS" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/google-cloud.svg" alt="Google Cloud" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/ibm.svg" alt="IBM" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/servicenow.svg" alt="ServiceNow" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/databricks.svg" alt="Databricks" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/snowflake.svg" alt="Snowflake" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/gumgum.svg" alt="GumGum" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/twelve-labs.svg" alt="TwelveLabs" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/fireworks-ai.svg" alt="Fireworks AI" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/nvidia.svg" alt="NVIDIA" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/korber.svg" alt="Korber" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/taranis.svg" alt="Taranis" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />

          {/* Loop repeat */}
          <img src="/aws.svg" alt="AWS" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/google-cloud.svg" alt="Google Cloud" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/ibm.svg" alt="IBM" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/servicenow.svg" alt="ServiceNow" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/databricks.svg" alt="Databricks" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/snowflake.svg" alt="Snowflake" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/gumgum.svg" alt="GumGum" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/twelve-labs.svg" alt="TwelveLabs" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/fireworks-ai.svg" alt="Fireworks AI" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/nvidia.svg" alt="NVIDIA" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/korber.svg" alt="Korber" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
          <img src="/taranis.svg" alt="Taranis" className="h-6 max-h-6 object-contain opacity-55 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Infrastructure Interactive Studio Section */}
      <section className="py-24 bg-[#faf8f5]" id="infra">
        <div className="max-w-[1320px] w-full mx-auto px-7">
          <div className="text-xs font-extrabold text-[#ef4444] tracking-widest uppercase mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping"></span>
            INFRASTRUCTURE
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] leading-tight tracking-tight mb-3 max-w-3xl">
            A unified platform for fine-tuning and evaluation
          </h2>
          <p className="text-base text-gray-600 mb-10 max-w-2xl">
            Customizable annotation tooling, data exploration, quality assurance, and model evaluation built for scale.
          </p>

          {/* Tab Selector */}
          <div className="flex gap-2 border-b border-gray-200 mb-8 overflow-x-auto">
            {[
              { id: "cv", label: "Multimodal Labeling" },
              { id: "rlhf", label: "RLHF & SFT" },
              { id: "agents", label: "Agent Trajectories" },
              { id: "eval", label: "Evaluation" },
              { id: "datasets", label: "Off-the-shelf Datasets" }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-3.5 px-5 font-bold text-sm whitespace-nowrap cursor-pointer border-b-2 -mb-[2px] transition-all relative ${
                  activeTab === tab.id ? "border-[#ef4444] text-black" : "border-transparent text-gray-500 hover:text-black"
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  showToast(`Switched suite to ${tab.label}`);
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ef4444]" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Interactive Studio Viewport */}
          <div className="bg-[#090d16] rounded-2xl p-6 text-white shadow-2xl border border-white/10 relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Tool Selection Sidebar */}
              <div className="lg:col-span-3 bg-[#111827] rounded-xl p-4 flex flex-col gap-2 border border-white/5">
                <div className="text-[11px] font-bold text-gray-400 uppercase mb-2 tracking-wider flex items-center justify-between">
                  <span>ANNOTATION TOOLS</span>
                  <span className="text-[10px] text-[#ef4444] bg-[#ef4444]/10 px-2 py-0.5 rounded">HOTKEYS</span>
                </div>

                {[
                  { id: "bbox", label: "Bounding Box", icon: Crosshair },
                  { id: "polygon", label: "Polygon Segment", icon: Layers },
                  { id: "sam", label: "SAM Smart Select", icon: Sparkles },
                  { id: "keypoint", label: "Keypoint Dots", icon: Eye },
                  { id: "cuboid", label: "3D Cuboids", icon: Maximize2 },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <motion.button
                      key={t.id}
                      className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 cursor-pointer border transition-all ${
                        activeTool === t.id 
                          ? "bg-[#ef4444] border-[#ef4444] text-white shadow-md shadow-[#ef4444]/20" 
                          : "border-white/10 text-white hover:bg-white/5"
                      }`}
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTool(t.id);
                        showToast(`Tool active: ${t.label}`);
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {t.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Center Canvas Viewport */}
              <div className="lg:col-span-6 bg-black rounded-xl min-h-[420px] relative overflow-hidden flex items-center justify-center border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"
                  alt="AI Dataset Viewport"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-102"
                />

                {/* Simulated Bounding Box */}
                <motion.div 
                  className={`absolute top-[22%] left-[30%] w-[42%] h-[48%] border-2 rounded cursor-move transition-colors ${
                    bboxApproved 
                      ? "border-emerald-500 bg-emerald-500/15" 
                      : "border-[#ef4444] bg-[#ef4444]/15"
                  }`}
                  animate={bboxApproved ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`absolute -top-6 -left-0.5 text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 ${
                    bboxApproved ? "bg-emerald-600" : "bg-[#ef4444]"
                  }`}>
                    {bboxApproved ? "Verified ✓ (99.8%)" : "Autonomous_Vehicle (98.4%)"}
                  </span>
                </motion.div>
              </div>

              {/* Right Inspector Panel */}
              <div className="lg:col-span-3 bg-[#111827] rounded-xl p-5 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold border-b border-white/10 pb-2.5 mb-4 text-white uppercase tracking-wider flex items-center justify-between">
                    <span>Object Inspector</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <div className="text-[11px] text-gray-400 mb-0.5">Class Label</div>
                      <div className="text-xs font-mono font-bold text-[#38bdf8]">Autonomous_Vehicle</div>
                    </div>

                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <div className="text-[11px] text-gray-400 mb-0.5">Model Assistance</div>
                      <div className="text-xs font-mono font-bold text-[#38bdf8]">Segment Anything (SAM)</div>
                    </div>

                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <div className="text-[11px] text-gray-400 mb-0.5">Confidence Score</div>
                      <div className="text-xs font-mono font-bold text-[#38bdf8]">0.9842</div>
                    </div>
                  </div>
                </div>

                <motion.button
                  className={`w-full mt-6 text-white font-bold py-3 rounded-lg text-xs cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 ${
                    bboxApproved 
                      ? "bg-emerald-600 hover:bg-emerald-700" 
                      : "bg-[#ef4444] hover:bg-[#dc2626]"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApprove}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {bboxApproved ? "Approved ✓" : "Approve Annotation"}
                </motion.button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* "Not just tooling" / Experts Section */}
      <section className="py-24 bg-[#faf8f5]" id="experts">
        <div className="max-w-[1320px] w-full mx-auto px-7">
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-3">
            Not just tooling
          </h2>
          <p className="text-base text-gray-600 mb-12 max-w-2xl">
            The human expertise and unified infrastructure behind every frontier AI model.
          </p>

          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Left Graphic Array: Connected Experts */}
            <div className="lg:col-span-5 bg-[#faf8f5] rounded-xl p-8 flex items-center justify-center relative min-h-[380px] border border-black/5 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#fca5a5]/50" strokeDasharray="3 3">
                <line x1="50%" y1="50%" x2="25%" y2="25%" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="75%" y2="25%" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="25%" y2="75%" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="50%" y2="85%" strokeWidth="1.5" />
              </svg>

              <div className="relative w-full h-full min-h-[320px] flex items-center justify-center">
                {/* Center Node */}
                <motion.div 
                  className="w-4 h-4 rounded-full bg-[#ef4444] shadow-md z-10"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />

                {/* Experts Headshots */}
                <motion.img 
                  src="/expert-lead.png" 
                  alt="Expert Lead" 
                  className="absolute top-[5%] left-[8%] w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white cursor-pointer hover:ring-2 hover:ring-[#ef4444]" 
                  whileHover={{ scale: 1.1 }}
                />
                <motion.img 
                  src="/expert-partner.png" 
                  alt="Expert Partner" 
                  className="absolute top-[5%] right-[8%] w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white cursor-pointer hover:ring-2 hover:ring-[#ef4444]" 
                  whileHover={{ scale: 1.1 }}
                />
                <motion.img 
                  src="/expert-analyst.png" 
                  alt="Expert Analyst" 
                  className="absolute bottom-[5%] left-[8%] w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white cursor-pointer hover:ring-2 hover:ring-[#ef4444]" 
                  whileHover={{ scale: 1.1 }}
                />
                <motion.img 
                  src="/expert-quality.png" 
                  alt="Expert Quality" 
                  className="absolute bottom-[5%] right-[8%] w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white cursor-pointer hover:ring-2 hover:ring-[#ef4444]" 
                  whileHover={{ scale: 1.1 }}
                />
                <motion.img 
                  src="/expert-mentor.png" 
                  alt="Expert Mentor" 
                  className="absolute bottom-[0%] left-[38%] w-18 h-18 rounded-2xl object-cover shadow-md border-2 border-white cursor-pointer hover:ring-2 hover:ring-[#ef4444]" 
                  whileHover={{ scale: 1.1 }}
                />
              </div>
            </div>

            {/* Right Card List */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <div>
                <h3 className="text-2xl font-extrabold text-[#111827] mb-2">Expert humans, in the loop</h3>
                <p className="text-sm text-gray-500 mb-6">
                  The right specialists for your project, precise in their execution and critical in their feedback.
                </p>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    icon: UserCheck,
                    title: "Expert Services",
                    desc: "Skilled professionals with deep domain talent for your most complex projects."
                  },
                  {
                    icon: Sparkles,
                    title: "AI-Assisted Annotation",
                    desc: "Speed and consistency at scale with AI tools guided by expert oversight."
                  },
                  {
                    icon: Database,
                    title: "Off-the-shelf Datasets",
                    desc: "Ready-to-use datasets for common use cases so you can move faster."
                  },
                  {
                    icon: Globe,
                    title: "Data Collection",
                    desc: "Real-world, high-fidelity data from global network partners."
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      className="p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-xs transition-all flex gap-4 items-start cursor-pointer bg-white"
                      whileHover={{ x: 4 }}
                      onClick={() => showToast(`Inquiring about ${item.title}`)}
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#fee2e2] text-[#ef4444] flex items-center justify-center font-bold text-sm shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#111827]">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Sub-section: Every vendor, one secure system */}
          <div className="mb-8">
            <h3 className="text-2xl font-extrabold text-[#111827] mb-2">Every vendor, one secure system</h3>
            <p className="text-sm text-gray-500 mb-6">
              Unify all your data vendors into a single secure infrastructure you control.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white border border-black/10 rounded-xl p-6 shadow-xs flex items-start gap-4 hover:shadow-md transition-all"
                whileHover={{ y: -2 }}
              >
                <div className="w-10 h-10 rounded-lg bg-[#fee2e2] text-[#ef4444] flex items-center justify-center text-base shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111827] mb-1">SOC 2 Type II &amp; HIPAA Compliant</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Enterprise data governance with end-to-end encryption and audit logs.</p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white border border-black/10 rounded-xl p-6 shadow-xs flex items-start gap-4 hover:shadow-md transition-all"
                whileHover={{ y: -2 }}
              >
                <div className="w-10 h-10 rounded-lg bg-[#fee2e2] text-[#ef4444] flex items-center justify-center text-base shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111827] mb-1">Zero Data Retention Option</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Keep your training assets completely inside your own cloud VPC (AWS, GCP, Azure).</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Legal Footer */}
      <footer className="bg-[#0b0f19] text-gray-400 py-16 text-xs border-t border-white/10" id="legal">
        <div className="max-w-[1320px] w-full mx-auto px-7">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <img src="/provenetix_logo.jpg" alt="Provenetix AI Logo" className="h-7 w-auto object-contain rounded" />
                <span className="text-lg font-extrabold text-white">Provenetix AI</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm mb-4">
                Platform, experts, and workflows to deliver the highest-quality AI data for RLHF, multimodal labeling, and evaluation.
              </p>

              <div className="bg-[#111827] border border-white/10 p-4 rounded-lg">
                <div className="text-xs font-bold text-white mb-1">PROVENETIX CONSULTING SERVICES PRIVATE LIMITED</div>
                <div className="font-mono text-[11px] text-[#ef4444]">CIN: U62099TS2023PTC173282 • ROC Hyderabad</div>
                <div className="text-[11px] text-gray-500 mt-1">5-16, Lalgadi Malapert, Rangareddy, Telangana 500078 • DPIIT Recognized Startup</div>
              </div>
            </div>

            <div>
              <div className="text-white font-bold mb-4">Infrastructure</div>
              <ul className="space-y-2 list-none">
                <li><a href="#infra" className="hover:text-white transition-colors">Multimodal Labeling</a></li>
                <li><a href="#infra" className="hover:text-white transition-colors">RLHF &amp; SFT</a></li>
                <li><a href="#infra" className="hover:text-white transition-colors">Agent Trajectories</a></li>
                <li><a href="#infra" className="hover:text-white transition-colors">Evaluation</a></li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold mb-4">Solutions</div>
              <ul className="space-y-2 list-none">
                <li><a href="#experts" className="hover:text-white transition-colors">Generative AI</a></li>
                <li><a href="#experts" className="hover:text-white transition-colors">Autonomous Systems</a></li>
                <li><a href="#experts" className="hover:text-white transition-colors">Medical AI</a></li>
                <li><a href="#experts" className="hover:text-white transition-colors">PhD Experts</a></li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold mb-4">Resources</div>
              <ul className="space-y-2 list-none">
                <li><a href="#legal" className="hover:text-white transition-colors" onClick={() => showToast("Documentation portal active")}>Documentation</a></li>
                <li><a href="#legal" className="hover:text-white transition-colors" onClick={() => showToast("SDK: pip install provenetix")}>Python SDK</a></li>
                <li><a href="#legal" className="hover:text-white transition-colors" onClick={() => showToast("SOC 2 Type II Certified")}>Security</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>&copy; 2026 Provenetix Consulting Services Private Limited (Provenetix.ai). All Rights Reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Toast Feedback */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            className="fixed bottom-6 right-6 bg-[#111827] text-white border border-[#ef4444] px-5 py-3 rounded-lg font-bold text-xs shadow-2xl z-50 flex items-center gap-2"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse"></span>
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
