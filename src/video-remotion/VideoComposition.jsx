import React from "react";
import { 
  AbsoluteFill, 
  spring, 
  interpolate, 
  useCurrentFrame, 
  useVideoConfig 
} from "remotion";
import Logo from "../components/ui/Logo";
import WhatsAppBubble from "../components/CitaxMock/WhatsAppBubble";

// Main Video wrapper holding our sequence of scenes
export function VideoComposition({ 
  businessName = "Citax Peluquería", 
  accentColor = "#1d4ed8" 
}) {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // SCENE 1: Intro (Frames 0 to 60 - 2 seconds)
  // Scene opacity/fading
  const introOpacity = interpolate(frame, [0, 10, 50, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12 },
    durationInFrames: 30
  });

  // SCENE 2: Chat Animation (Frames 60 to 190 - 4.3 seconds)
  const chatOpacity = interpolate(frame, [55, 65, 180, 190], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Typing state switches based on frame ranges
  const showBubble1 = frame >= 70;
  const bubble1Text = "Hola! ¿A qué hora tengo el turno hoy?";
  const bubble1Frame = frame - 70;
  const bubble1TypingDone = bubble1Frame > bubble1Text.length * 1.5;

  const showBubble2 = frame >= 110;
  const bubble2Text = `¡Hola! Tenés un turno reservado para las 15:30 hs.\n\nEscribí CANCELAR si querés reprogramar.`;
  const bubble2Frame = frame - 110;

  // Scene transition
  const chatMoveUp = interpolate(frame, [150, 170], [0, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // SCENE 3: Outro (Frames 190 to 270 - 2.7 seconds)
  const outroOpacity = interpolate(frame, [185, 195, 260, 270], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const outroTextMove = spring({
    frame: frame - 190,
    fps,
    config: { damping: 10 }
  });

  const outroTextTranslateY = interpolate(outroTextMove, [0, 1], [40, 0]);

  return (
    <AbsoluteFill className="bg-slate-950 font-sans text-white overflow-hidden">
      {/* Visual background element: animated grid lines */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Radial ambient glow */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full filter blur-[120px] opacity-20"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          top: "10%",
          left: "10%"
        }}
      />

      {/* -------------------- SCENE 1: INTRO -------------------- */}
      {frame < 60 && (
        <AbsoluteFill 
          style={{ opacity: introOpacity }}
          className="flex flex-col items-center justify-center"
        >
          <div style={{ transform: `scale(${logoScale})` }} className="mb-4">
            <Logo size="xl" iconOnly={false} />
          </div>
          <p className="text-blue-300 font-bold uppercase tracking-[0.25em] text-sm mt-3 select-none">
            Tu Agenda Automatizada
          </p>
        </AbsoluteFill>
      )}

      {/* -------------------- SCENE 2: CHAT -------------------- */}
      {frame >= 55 && frame < 190 && (
        <AbsoluteFill 
          style={{ opacity: chatOpacity }}
          className="flex flex-col items-center justify-center p-12"
        >
          <div className="w-full max-w-lg space-y-6 text-center select-none mb-10">
            <span 
              className="inline-block text-xs font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-lg text-white"
              style={{ backgroundColor: accentColor }}
            >
              Simulación WhatsApp
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              ¿Seguís respondiendo chats manualmente?
            </h2>
          </div>

          {/* Chat box container */}
          <div 
            className="w-full max-w-md bg-slate-900/60 border border-white/10 rounded-3xl p-6 shadow-2xl relative backdrop-blur-md overflow-hidden"
            style={{ transform: `translateY(${chatMoveUp}px)` }}
          >
            {/* Window header */}
            <div className="flex items-center gap-2 border-b border-white/5 pb-3.5 mb-4">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-500 ml-1">whatsapp_chat_bot</span>
            </div>

            {/* Bubble 1: User */}
            {showBubble1 && (
              <WhatsAppBubble
                text={bubble1Text}
                sender="user"
                time="15:00 hs"
                animated={true}
                typingSpeed={35}
              />
            )}

            {/* Bubble 2: Citax Bot */}
            {showBubble2 && (
              <WhatsAppBubble
                text={bubble2Text}
                sender="citax"
                time="15:01 hs"
                animated={true}
                typingSpeed={30}
                status="read"
              />
            )}
          </div>
        </AbsoluteFill>
      )}

      {/* -------------------- SCENE 3: OUTRO -------------------- */}
      {frame >= 185 && (
        <AbsoluteFill 
          style={{ opacity: outroOpacity }}
          className="flex flex-col items-center justify-center p-12"
        >
          <div 
            style={{ transform: `translateY(${outroTextTranslateY}px)` }}
            className="text-center space-y-8 max-w-2xl"
          >
            <div className="flex justify-center mb-6">
              <Logo size="xl" iconOnly={false} />
            </div>
            
            <h1 className="text-5xl font-black uppercase tracking-tight leading-none">
              Modernizá tu <br />
              <span style={{ color: accentColor }}>Negocio Hoy</span>
            </h1>

            <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
              Link de reserva online 24/7. Recordatorios automáticos por WhatsApp.
            </p>

            <div 
              className="inline-block px-6 py-3.5 rounded-2xl font-black tracking-wide text-white shadow-lg border border-white/10"
              style={{ backgroundColor: accentColor }}
            >
              Comenzar en citax.com.ar
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

export default VideoComposition;
