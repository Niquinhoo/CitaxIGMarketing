import React, { useState } from "react";
import { Player } from "@remotion/player";
import { Image, Video, Sparkles, Code, Play, Pause, RefreshCw, Copy, Check } from "lucide-react";
import FlyerCreator from "./flyers/FlyerCreator";
import VideoComposition from "./video-remotion/VideoComposition";
import Logo from "./components/ui/Logo";

export function App() {
  const [activeTab, setActiveTab] = useState("flyers"); // "flyers" | "videos"
  
  // States for Video Customizer
  const [videoBusinessName, setVideoBusinessName] = useState("Citax Peluquería");
  const [videoAccentColor, setVideoAccentColor] = useState("#1d4ed8");
  const [copiedCommand, setCopiedCommand] = useState(false);

  // Predefined color presets for the video
  const colorPresets = [
    { name: "Citax Blue", value: "#1d4ed8" },
    { name: "Deep Violet", value: "#6d28d9" },
    { name: "Emerald Pro", value: "#059669" },
    { name: "Amber Buzz", value: "#d97706" }
  ];

  // Remotion CLI Command to render this customized video
  const renderCommand = `npx remotion render src/video-remotion/index.js PromoVideo out/promo-video.mp4 --props='{"businessName":"${videoBusinessName}","accentColor":"${videoAccentColor}"}'`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(renderCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md select-none">
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <span className="text-slate-400 font-bold">|</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Marketing Hub</span>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setActiveTab("flyers")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all select-none ${
              activeTab === "flyers"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            Crear Flyers
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all select-none ${
              activeTab === "videos"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Crear Videos (Remotion)
          </button>
        </div>

        {/* Right Info */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Local Engine Active</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {activeTab === "flyers" ? (
          <FlyerCreator />
        ) : (
          <div className="flex flex-col lg:flex-row flex-grow bg-slate-100">
            
            {/* Video Controller Sidebar */}
            <div className="w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 flex flex-col gap-6 shrink-0 max-h-screen overflow-y-auto">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg text-slate-900 font-sans">Configurar Video</h2>
              </div>
              
              <hr className="border-slate-100" />

              {/* Business Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nombre del Negocio</label>
                <input
                  type="text"
                  value={videoBusinessName}
                  onChange={(e) => setVideoBusinessName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-semibold"
                />
              </div>

              {/* Accent Color Preset */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Color Destacado</label>
                <div className="flex gap-2">
                  {colorPresets.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setVideoAccentColor(color.value)}
                      className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-sm"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {videoAccentColor === color.value && <Check className="w-4 h-4 text-white drop-shadow-sm" />}
                    </button>
                  ))}
                  <input 
                    type="color" 
                    value={videoAccentColor} 
                    onChange={(e) => setVideoAccentColor(e.target.value)}
                    className="w-8 h-8 rounded-full border border-slate-200 cursor-pointer overflow-hidden p-0 bg-transparent shrink-0" 
                  />
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Render Instructions Card */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <Code className="w-4 h-4 text-[#60a5fa]" />
                  <span className="text-slate-200">Exportar Video MP4</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Dado que los videos requieren renderizado basado en Puppeteer, copiá y ejecutá este comando en tu terminal para compilar el video MP4 localmente en alta calidad:
                </p>
                <div className="relative rounded-lg bg-black/50 p-3 text-[10px] font-mono break-all text-slate-300 pr-10 border border-white/5 select-all">
                  {renderCommand}
                  <button 
                    onClick={copyToClipboard}
                    className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copiar comando"
                  >
                    {copiedCommand ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Video Preview Canvas */}
            <div className="flex-grow flex flex-col items-center justify-center p-6 lg:p-12 overflow-auto bg-[#e8ecf3] gap-6">
              
              {/* Remotion Player element */}
              <div className="w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-slate-300 bg-slate-950">
                <Player
                  component={VideoComposition}
                  durationInFrames={270}
                  fps={30}
                  compositionWidth={1080}
                  compositionHeight={1080}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  inputProps={{
                    businessName: videoBusinessName,
                    accentColor: videoAccentColor
                  }}
                  controls
                  loop
                />
              </div>

              {/* Instruction Tip */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/60 shadow-sm select-none">
                <Play className="w-3.5 h-3.5 text-primary" />
                <span>Usá los controles multimedia integrados para previsualizar los tiempos</span>
              </div>
            </div>

          </div>
        )}
      </main>

    </div>
  );
}

export default App;
