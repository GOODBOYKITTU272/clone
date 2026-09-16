"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("cv");
  const [activeTool, setActiveTool] = useState<string>("bbox");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Canvas background rendering stippled particle wave with vector connector lines
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

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const numParticles = 140;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint background grid dots
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

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

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.06 * (1 - dist / 90)})`;
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#faf8f5] text-[#111827]">
      
      {/* SuperAnnotate Exact Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-black/5 h-[72px] flex items-center">
        <div className="max-w-[1320px] w-full mx-auto px-7 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <img 
              src="/provenetix_logo.jpg" 
              alt="Provenetix AI Logo" 
              className="h-8 w-auto object-contain rounded-md"
            />
            <span className="text-xl font-extrabold tracking-tight text-[#111827]">
              Provenetix<span className="text-[#f26522]">AI</span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-8 list-none">
            <li>
              <a href="#infra" className="text-[14.5px] font-semibold text-gray-700 hover:text-black flex items-center gap-1">
                What We Do <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </a>
            </li>
            <li>
              <a href="#experts" className="text-[14.5px] font-semibold text-gray-700 hover:text-black flex items-center gap-1">
                Solutions <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </a>
            </li>
            <li>
              <a href="#legal" className="text-[14.5px] font-semibold text-gray-700 hover:text-black flex items-center gap-1">
                Resources <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-5">
            <a href="#" className="text-[14.5px] font-semibold text-gray-700 hover:text-black" onClick={() => showToast("Sign in portal active")}>
              Sign In
            </a>
            <button
              className="bg-[#111827] text-white text-[14px] font-bold px-5 py-2.5 rounded-full hover:bg-black transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => showToast("Talk to us inquiry initiated")}
            >
              Talk to Us
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Exact Match to Screenshot 2 */}
      <section className="relative py-16 md:py-24 min-h-[640px] flex items-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <div className="max-w-[1320px] w-full mx-auto px-7 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Text Col */}
          <div className="lg:col-span-7 max-w-[680px]">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#ef4444] text-xs font-mono">★★★★★</span>
              <span className="text-[13.5px] font-extrabold text-[#111827]">4.9</span>
              <span className="bg-[#ef4444] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">G2</span>
              <span className="text-[13px] text-gray-400 font-semibold">#1 AI Data Company</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-[#111827] leading-[1.15] tracking-tight mb-6">
              <span className="bg-[#fee2e2] text-[#111827] px-3 py-1 rounded-2xl border border-[#fca5a5]/30">Platform,</span>{" "}
              <span className="bg-[#fee2e2] text-[#111827] px-3 py-1 rounded-2xl border border-[#fca5a5]/30">experts,</span> and{" "}
              <span className="bg-[#fee2e2] text-[#111827] px-3 py-1 rounded-2xl border border-[#fca5a5]/30">workflows</span> to deliver the highest-quality AI data.
            </h1>

            <div className="pt-2">
              <button
                className="bg-[#111827] text-white text-[14.5px] font-bold px-7 py-3.5 rounded-full shadow-lg hover:bg-black transition-all cursor-pointer"
                onClick={() => showToast("Contact us requested")}
              >
                Contact us
              </button>
            </div>
          </div>

          {/* Right Floating Nodes Col - Exact match to SuperAnnotate pill badges */}
          <div className="lg:col-span-5 relative h-[440px] hidden md:flex flex-col justify-center">
            
            {/* SVG Connecting Vector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#fca5a5]/40" strokeDasharray="3 3">
              <line x1="20%" y1="50%" x2="60%" y2="15%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="70%" y2="30%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="55%" y2="48%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="75%" y2="64%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="65%" y2="78%" strokeWidth="1.2" />
              <line x1="20%" y1="50%" x2="50%" y2="90%" strokeWidth="1.2" />
            </svg>

            {/* Pill 1 */}
            <div 
              className="absolute top-[10%] right-[18%] bg-white/95 border border-black/10 px-3.5 py-1.5 rounded-md shadow-sm flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 cursor-pointer hover:border-[#ef4444] transition-all"
              onClick={() => showToast("RL Environments selected")}
            >
              <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-sm"></span> RL Environments
            </div>

            {/* Pill 2 */}
            <div 
              className="absolute top-[26%] right-[5%] bg-white/95 border border-black/10 px-3.5 py-1.5 rounded-md shadow-sm flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 cursor-pointer hover:border-[#ef4444] transition-all"
              onClick={() => showToast("Multimodal Labeling selected")}
            >
              <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-sm"></span> Multimodal Labeling
            </div>

            {/* Pill 3 */}
            <div 
              className="absolute top-[44%] right-[28%] bg-white/95 border border-black/10 px-3.5 py-1.5 rounded-md shadow-sm flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 cursor-pointer hover:border-[#ef4444] transition-all"
              onClick={() => showToast("RLHF & SFT selected")}
            >
              <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-sm"></span> RLHF &amp; SFT
            </div>

            {/* Pill 4 */}
            <div 
              className="absolute top-[60%] right-[3%] bg-white/95 border border-black/10 px-3.5 py-1.5 rounded-md shadow-sm flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 cursor-pointer hover:border-[#ef4444] transition-all"
              onClick={() => showToast("Agent Trajectories selected")}
            >
              <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-sm"></span> Agent Trajectories
            </div>

            {/* Pill 5 */}
            <div 
              className="absolute top-[75%] right-[22%] bg-white/95 border border-black/10 px-3.5 py-1.5 rounded-md shadow-sm flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 cursor-pointer hover:border-[#ef4444] transition-all"
              onClick={() => showToast("Evaluation selected")}
            >
              <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-sm"></span> Evaluation
            </div>

            {/* Pill 6 */}
            <div 
              className="absolute top-[88%] right-[12%] bg-white/95 border border-black/10 px-3.5 py-1.5 rounded-md shadow-sm flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 cursor-pointer hover:border-[#ef4444] transition-all"
              onClick={() => showToast("Off-the-shelf Datasets selected")}
            >
              <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-sm"></span> Off-the-shelf Datasets
            </div>

          </div>

        </div>
      </section>

      {/* Real Extracted SVG Logo Marquee Carousel - Matches Screenshot 2 */}
      <div className="bg-white border-y border-black/5 py-6 overflow-hidden relative z-10">
        <div className="flex items-center gap-16 w-max animate-marquee">
          <img src="/aws.svg" alt="AWS" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/google-cloud.svg" alt="Google Cloud" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/ibm.svg" alt="IBM" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/servicenow.svg" alt="ServiceNow" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/databricks.svg" alt="Databricks" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/snowflake.svg" alt="Snowflake" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/gumgum.svg" alt="GumGum" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/twelve-labs.svg" alt="TwelveLabs" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/fireworks-ai.svg" alt="Fireworks AI" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/nvidia.svg" alt="NVIDIA" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />

          {/* Duplicated loop for smooth infinite scroll */}
          <img src="/aws.svg" alt="AWS" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/google-cloud.svg" alt="Google Cloud" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/ibm.svg" alt="IBM" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/servicenow.svg" alt="ServiceNow" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/databricks.svg" alt="Databricks" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/snowflake.svg" alt="Snowflake" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/gumgum.svg" alt="GumGum" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/twelve-labs.svg" alt="TwelveLabs" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/fireworks-ai.svg" alt="Fireworks AI" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/nvidia.svg" alt="NVIDIA" className="h-6 max-h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Infrastructure Section - Exact Match to Screenshot 3 */}
      <section className="py-24 bg-[#faf8f5]" id="infra">
        <div className="max-w-[1320px] w-full mx-auto px-7">
          <div className="text-xs font-extrabold text-[#ef4444] tracking-widest uppercase mb-3">• INFRASTRUCTURE</div>
          <h2 className="text-4xl font-extrabold text-[#111827] leading-tight tracking-tight mb-4 max-w-3xl">
            A unified platform for fine-tuning and evaluation
          </h2>
          <p className="text-base text-gray-600 mb-10 max-w-2xl">
            Customizable annotation tooling, data exploration, quality assurance, and model evaluation built for scale.
          </p>

          <div className="flex gap-3 border-b border-gray-200 mb-8 overflow-x-auto">
            {["cv", "rlhf", "agents", "eval", "datasets"].map((tabKey) => (
              <button
                key={tabKey}
                className={`py-3.5 px-5 font-bold text-sm whitespace-nowrap cursor-pointer border-b-2 -mb-[2px] transition-all ${
                  activeTab === tabKey ? "border-[#ef4444] text-black" : "border-transparent text-gray-500 hover:text-black"
                }`}
                onClick={() => {
                  setActiveTab(tabKey);
                  showToast(`Switched suite to ${tabKey.toUpperCase()}`);
                }}
              >
                {tabKey === "cv" && "Multimodal Labeling"}
                {tabKey === "rlhf" && "RLHF & SFT"}
                {tabKey === "agents" && "Agent Trajectories"}
                {tabKey === "eval" && "Evaluation"}
                {tabKey === "datasets" && "Off-the-shelf Datasets"}
              </button>
            ))}
          </div>

          <div className="bg-[#090d16] rounded-2xl p-6 text-white shadow-2xl border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-3 bg-[#111827] rounded-xl p-4 flex flex-col gap-2 border border-white/5">
                <div className="text-[11px] font-bold text-gray-400 uppercase mb-1 tracking-wider">ANNOTATION TOOLS</div>
                {["bbox", "polygon", "sam", "keypoint", "cuboid"].map((t) => (
                  <button
                    key={t}
                    className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 cursor-pointer border transition-all ${
                      activeTool === t ? "bg-[#ef4444] border-[#ef4444] text-white" : "border-white/10 text-white hover:bg-white/5"
                    }`}
                    onClick={() => {
                      setActiveTool(t);
                      showToast(`Tool selected: ${t.toUpperCase()}`);
                    }}
                  >
                    <i className="fa-solid fa-square-check"></i> {t === "bbox" && "Bounding Box"}
                    {t === "polygon" && "Polygon Segment"}
                    {t === "sam" && "SAM Smart Select"}
                    {t === "keypoint" && "Keypoint Dots"}
                    {t === "cuboid" && "3D Cuboids"}
                  </button>
                ))}
              </div>

              <div className="lg:col-span-6 bg-black rounded-xl min-h-[420px] relative overflow-hidden flex items-center justify-center border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"
                  alt="AI Dataset Viewport"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute top-[22%] left-[30%] w-[42%] h-[48%] border-2 border-[#ef4444] bg-[#ef4444]/15 rounded">
                  <span className="absolute -top-6 -left-0.5 bg-[#ef4444] text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded shadow">
                    Autonomous_Vehicle (98.4%)
                  </span>
                </div>
              </div>

              <div className="lg:col-span-3 bg-[#111827] rounded-xl p-5 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold border-b border-white/10 pb-2.5 mb-4 text-white uppercase tracking-wider">Object Inspector</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[11px] text-gray-400 mb-0.5">Class Label</div>
                      <div className="text-xs font-mono font-bold text-[#38bdf8]">Autonomous_Vehicle</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 mb-0.5">Model Assistance</div>
                      <div className="text-xs font-mono font-bold text-[#38bdf8]">Segment Anything (SAM)</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 mb-0.5">Confidence Score</div>
                      <div className="text-xs font-mono font-bold text-[#38bdf8]">0.9842</div>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full mt-6 bg-[#1f2937] hover:bg-black border border-white/20 text-white font-bold py-2.5 rounded-lg text-xs cursor-pointer transition-all"
                  onClick={() => showToast("Annotation approved and saved!")}
                >
                  Approve Annotation
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* "Not just tooling" / Experts Section - Exact Match to Screenshot 4 */}
      <section className="py-24 bg-[#faf8f5]" id="experts">
        <div className="max-w-[1320px] w-full mx-auto px-7">
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-3">
            Not just tooling
          </h2>
          <p className="text-base text-gray-600 mb-12 max-w-2xl">
            The human expertise and unified infrastructure behind every frontier AI model.
          </p>

          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Left Box: Expert Avatar Graphic Array */}
            <div className="lg:col-span-5 bg-[#faf8f5] rounded-xl p-8 flex items-center justify-center relative min-h-[360px] border border-black/5">
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#fca5a5]/50" strokeDasharray="3 3">
                <line x1="50%" y1="50%" x2="25%" y2="25%" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="75%" y2="25%" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="25%" y2="75%" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="50%" y2="85%" strokeWidth="1.5" />
              </svg>

              <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                {/* Center Node */}
                <div className="w-4 h-4 rounded-full bg-[#ef4444] shadow-md z-10"></div>

                {/* Avatar 1 */}
                <img src="/expert-lead.png" alt="Expert Lead" className="absolute top-[5%] left-[10%] w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white" />
                {/* Avatar 2 */}
                <img src="/expert-partner.png" alt="Expert Partner" className="absolute top-[5%] right-[10%] w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white" />
                {/* Avatar 3 */}
                <img src="/expert-analyst.png" alt="Expert Analyst" className="absolute bottom-[5%] left-[10%] w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white" />
                {/* Avatar 4 */}
                <img src="/expert-quality.png" alt="Expert Quality" className="absolute bottom-[5%] right-[10%] w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white" />
                {/* Avatar 5 */}
                <img src="/expert-mentor.png" alt="Expert Mentor" className="absolute bottom-[0%] left-[38%] w-18 h-18 rounded-2xl object-cover shadow-md border-2 border-white" />
              </div>
            </div>

            {/* Right Side Card List - Exact Copy from Screenshot 4 */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              
              <div>
                <h3 className="text-2xl font-extrabold text-[#111827] mb-2">Expert humans, in the loop</h3>
                <p className="text-sm text-gray-500 mb-6">
                  The right specialists for your project, precise in their execution and critical in their feedback.
                </p>
              </div>

              <div className="space-y-4">
                
                <div className="p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-all flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg bg-[#fee2e2] text-[#ef4444] flex items-center justify-center font-bold text-sm shrink-0">
                    <i className="fa-solid fa-user-doctor"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#111827]">Expert Services</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Skilled professionals with deep domain talent for your most complex projects.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-all flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg bg-[#fee2e2] text-[#ef4444] flex items-center justify-center font-bold text-sm shrink-0">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#111827]">AI-Assisted Annotation</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Speed and consistency at scale with AI tools guided by expert oversight.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-all flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg bg-[#fee2e2] text-[#ef4444] flex items-center justify-center font-bold text-sm shrink-0">
                    <i className="fa-solid fa-database"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#111827]">Off-the-shelf Datasets</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Ready-to-use datasets for common use cases so you can move faster.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-all flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg bg-[#fee2e2] text-[#ef4444] flex items-center justify-center font-bold text-sm shrink-0">
                    <i className="fa-solid fa-globe"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#111827]">Data Collection</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Real-world, high-fidelity data from global network partners.</p>
                  </div>
                </div>

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
              <div className="bg-white border border-black/10 rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#fee2e2] text-[#ef4444] flex items-center justify-center text-base shrink-0">
                  <i className="fa-solid fa-[#shield-halved]"></i>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111827] mb-1">SOC 2 Type II &amp; HIPAA Compliant</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Enterprise data governance with end-to-end encryption and audit logs.</p>
                </div>
              </div>

              <div className="bg-white border border-black/10 rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#fee2e2] text-[#ef4444] flex items-center justify-center text-base shrink-0">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111827] mb-1">Zero Data Retention Option</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Keep your training assets completely inside your own cloud VPC (AWS, GCP, Azure).</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SuperAnnotate Legal Corporate Footer */}
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
                <li><a href="#infra" className="hover:text-white">Multimodal Labeling</a></li>
                <li><a href="#infra" className="hover:text-white">RLHF &amp; SFT</a></li>
                <li><a href="#infra" className="hover:text-white">Agent Trajectories</a></li>
                <li><a href="#infra" className="hover:text-white">Evaluation</a></li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold mb-4">Solutions</div>
              <ul className="space-y-2 list-none">
                <li><a href="#experts" className="hover:text-white">Generative AI</a></li>
                <li><a href="#experts" className="hover:text-white">Autonomous Systems</a></li>
                <li><a href="#experts" className="hover:text-white">Medical AI</a></li>
                <li><a href="#experts" className="hover:text-white">PhD Experts</a></li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold mb-4">Resources</div>
              <ul className="space-y-2 list-none">
                <li><a href="#" className="hover:text-white" onClick={() => showToast("Docs active")}>Documentation</a></li>
                <li><a href="#" className="hover:text-white" onClick={() => showToast("SDK: pip install provenetix")}>Python SDK</a></li>
                <li><a href="#" className="hover:text-white" onClick={() => showToast("SOC 2 Type II Certified")}>Security</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>&copy; 2026 Provenetix Consulting Services Private Limited (Provenetix.ai). All Rights Reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Security</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Bar */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#111827] text-white border border-[#ef4444] px-5 py-3 rounded-lg font-bold text-xs shadow-2xl z-50">
          <i className="fa-solid fa-circle-check text-[#ef4444] mr-2"></i> {toastMsg}
        </div>
      )}

    </div>
  );
}
