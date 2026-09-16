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

  // Particle Canvas Background Animation
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

    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = [];
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.3 ? "rgba(239, 68, 68, 0.25)" : "rgba(242, 101, 34, 0.2)",
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

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.8;
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
      
      {/* SuperAnnotate Top Nav */}
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

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 min-h-[640px] flex items-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <div className="max-w-[1320px] w-full mx-auto px-7 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Text Col */}
          <div className="lg:col-span-7 max-w-[680px]">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="text-[#f59e0b] text-sm tracking-widest">★★★★★</span>
              <span className="text-[13.5px] font-extrabold text-[#111827]">4.9</span>
              <span className="bg-[#ef4444] text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded">G2</span>
              <span className="text-[13px] text-gray-500 font-semibold">#1 AI Data Company</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-[#111827] leading-[1.15] tracking-tight mb-6">
              <span className="highlight-pill">Platform,</span> <span className="highlight-pill">experts,</span> and <span className="highlight-pill">workflows</span> to deliver the highest-quality AI data.
            </h1>

            <button
              className="bg-[#111827] text-white text-[15px] font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-black transition-all transform hover:-translate-y-0.5 cursor-pointer"
              onClick={() => showToast("Contact us requested")}
            >
              Contact us
            </button>
          </div>

          {/* Right Floating Nodes Col (Matches Screenshot) */}
          <div className="lg:col-span-5 relative h-[480px] hidden md:flex flex-col justify-center">
            
            <div 
              className="absolute top-[12%] right-[18%] bg-white border border-black/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 text-[13.5px] font-bold text-[#111827] cursor-pointer hover:scale-105 hover:border-[#e11d48] transition-all animate-float-1"
              onClick={() => showToast("RL Environments module selected")}
            >
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> RL Environments
            </div>

            <div 
              className="absolute top-[26%] right-[8%] bg-white border border-black/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 text-[13.5px] font-bold text-[#111827] cursor-pointer hover:scale-105 hover:border-[#e11d48] transition-all animate-float-2"
              onClick={() => showToast("Multimodal Labeling module selected")}
            >
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> Multimodal Labeling
            </div>

            <div 
              className="absolute top-[40%] right-[26%] bg-white border border-black/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 text-[13.5px] font-bold text-[#111827] cursor-pointer hover:scale-105 hover:border-[#e11d48] transition-all animate-float-3"
              onClick={() => showToast("RLHF & SFT module selected")}
            >
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> RLHF &amp; SFT
            </div>

            <div 
              className="absolute top-[54%] right-[4%] bg-white border border-black/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 text-[13.5px] font-bold text-[#111827] cursor-pointer hover:scale-105 hover:border-[#e11d48] transition-all animate-float-4"
              onClick={() => showToast("Agent Trajectories module selected")}
            >
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> Agent Trajectories
            </div>

            <div 
              className="absolute top-[68%] right-[22%] bg-white border border-black/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 text-[13.5px] font-bold text-[#111827] cursor-pointer hover:scale-105 hover:border-[#e11d48] transition-all animate-float-5"
              onClick={() => showToast("Evaluation module selected")}
            >
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> Evaluation
            </div>

            <div 
              className="absolute top-[82%] right-[12%] bg-white border border-black/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 text-[13.5px] font-bold text-[#111827] cursor-pointer hover:scale-105 hover:border-[#e11d48] transition-all animate-float-6"
              onClick={() => showToast("Off-the-shelf Datasets module selected")}
            >
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> Off-the-shelf Datasets
            </div>

          </div>

        </div>
      </section>

      {/* Logo Marquee Carousel */}
      <div className="bg-white border-y border-black/5 py-6 overflow-hidden relative z-10">
        <div className="flex items-center gap-14 w-max animate-marquee">
          <span className="text-lg font-extrabold text-gray-500 opacity-70">servicenow</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">databricks</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">snowflake</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">gumgum</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">TwelveLabs</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">Fireworks</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">KÖRBER</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">GET YOUR GUIDE</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">TARANIS</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">Flo</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">rem people</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">NVIDIA</span>

          <span className="text-lg font-extrabold text-gray-500 opacity-70">servicenow</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">databricks</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">snowflake</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">gumgum</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">TwelveLabs</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">Fireworks</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">KÖRBER</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">GET YOUR GUIDE</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">TARANIS</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">Flo</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">rem people</span>
          <span className="text-lg font-extrabold text-gray-500 opacity-70">NVIDIA</span>
        </div>
      </div>

      {/* Infrastructure Section */}
      <section className="py-24 bg-white" id="infra">
        <div className="max-w-[1320px] w-full mx-auto px-7">
          <div className="text-xs font-extrabold text-gray-500 tracking-widest uppercase mb-3">• INFRASTRUCTURE</div>
          <h2 className="text-4xl font-extrabold text-[#111827] leading-tight tracking-tight mb-10 max-w-3xl">
            The complete platform for AI data curation, annotation, and evaluation.
          </h2>

          <div className="flex gap-3 border-b-2 border-gray-200 mb-8 overflow-x-auto">
            {["cv", "rlhf", "agents", "eval", "datasets"].map((tabKey) => (
              <button
                key={tabKey}
                className={`py-3.5 px-5 font-bold text-sm whitespace-nowrap cursor-pointer border-b-2 -mb-[2px] transition-all ${
                  activeTab === tabKey ? "border-[#e11d48] text-black" : "border-transparent text-gray-500 hover:text-black"
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

          <div className="bg-[#0b0f19] rounded-2xl p-8 text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-3 bg-[#111827] rounded-xl p-5 flex flex-col gap-2.5">
                <div className="text-[11px] font-bold text-gray-400 uppercase mb-1">Annotation Tools</div>
                {["bbox", "polygon", "sam", "keypoint", "cuboid"].map((t) => (
                  <button
                    key={t}
                    className={`p-3 rounded-md text-xs font-semibold flex items-center gap-2.5 cursor-pointer border transition-all ${
                      activeTool === t ? "bg-[#e11d48] border-[#e11d48] text-white" : "border-white/10 text-white hover:bg-white/5"
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

              <div className="lg:col-span-6 bg-black rounded-xl min-h-[380px] relative overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"
                  alt="AI Dataset Viewport"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute top-[25%] left-[30%] w-[40%] h-[45%] border-2 border-[#ef4444] bg-[#ef4444]/15 rounded">
                  <span className="absolute -top-6 -left-0.5 bg-[#ef4444] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    Autonomous_Vehicle (98.4%)
                  </span>
                </div>
              </div>

              <div className="lg:col-span-3 bg-[#111827] rounded-xl p-5">
                <div className="text-sm font-bold border-b border-white/10 pb-2 mb-3">Object Inspector</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-gray-400">Class Label</div>
                    <div className="text-xs font-mono font-bold text-[#38bdf8]">Autonomous_Vehicle</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400">Model Assistance</div>
                    <div className="text-xs font-mono font-bold text-[#38bdf8]">Segment Anything (SAM)</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400">Confidence Score</div>
                    <div className="text-xs font-mono font-bold text-[#38bdf8]">0.9842</div>
                  </div>
                </div>

                <button
                  className="w-full mt-6 bg-[#111827] border border-white/20 hover:bg-black text-white font-bold py-2.5 rounded-md text-xs cursor-pointer"
                  onClick={() => showToast("Annotation approved and saved!")}
                >
                  Approve Annotation
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-24 bg-[#faf8f5]" id="experts">
        <div className="max-w-[1320px] w-full mx-auto px-7">
          <div className="text-xs font-extrabold text-gray-500 tracking-widest uppercase mb-3">• EXPERTS</div>
          <h2 className="text-4xl font-extrabold text-[#111827] leading-tight tracking-tight mb-10 max-w-3xl">
            PhD-level domain experts for RLHF, coding, and medical AI.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-black/10 rounded-xl p-7 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="text-3xl mb-4">💻</div>
              <h3 className="text-lg font-extrabold text-[#111827] mb-2">Software Engineers</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Code generation, multi-language debugging, and unit test benchmarks.</p>
            </div>

            <div className="bg-white border border-black/10 rounded-xl p-7 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-lg font-extrabold text-[#111827] mb-2">PhD Scientists</h3>
              <p className="text-sm text-gray-600 leading-relaxed">STEM reasoning, complex mathematical proof verification, and physics data.</p>
            </div>

            <div className="bg-white border border-black/10 rounded-xl p-7 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="text-3xl mb-4">🩺</div>
              <h3 className="text-lg font-extrabold text-[#111827] mb-2">Medical Doctors</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Radiology image segmentation, clinical summarization, and healthcare AI.</p>
            </div>

            <div className="bg-white border border-black/10 rounded-xl p-7 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-lg font-extrabold text-[#111827] mb-2">Legal Scholars</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Contract clause analysis, statutory compliance evaluation, and legal datasets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SuperAnnotate Footer with Integrated MCA Records */}
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
        <div className="fixed bottom-6 right-6 bg-[#111827] text-white border border-[#e11d48] px-5 py-3 rounded-lg font-bold text-xs shadow-2xl z-50">
          <i className="fa-solid fa-circle-check text-[#ef4444] mr-2"></i> {toastMsg}
        </div>
      )}

    </div>
  );
}
