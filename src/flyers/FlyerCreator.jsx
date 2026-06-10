import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Download, Sparkles, RefreshCw, Layers, Smartphone, FileImage, MessageSquare, Check, Calendar } from "lucide-react";
import WhatsAppBubble from "../components/CitaxMock/WhatsAppBubble";
import DashboardMock from "../components/CitaxMock/DashboardMock";
import Logo from "../components/ui/Logo";

export function FlyerCreator() {
  const exportRef = useRef(null);
  
  // Customization States
  const [template, setTemplate] = useState("whatsapp"); // "whatsapp" | "dashboard" | "features"
  const [ratio, setRatio] = useState("feed"); // "feed" (1080x1080) | "story" (1080x1920)
  const [businessName, setBusinessName] = useState("Estilo Real Barbería");
  const [title, setTitle] = useState("¿Clientes colgados?");
  const [subtitle, setSubtitle] = useState("Citax les avisa por WhatsApp de forma automática. Olvidate de los turnos vacíos.");
  const [ctaText, setCtaText] = useState("Comenzá tu prueba gratis en citax.com.ar");
  
  const [primaryColor, setPrimaryColor] = useState("#1d4ed8"); // Default Citax Blue
  const [bgStyle, setBgStyle] = useState("grid"); // "gradient" | "grid" | "dark"
  const [exporting, setExporting] = useState(false);

  // Predefined options
  const colorPresets = [
    { name: "Citax Blue", value: "#1d4ed8" },
    { name: "Deep Violet", value: "#6d28d9" },
    { name: "Emerald Pro", value: "#059669" },
    { name: "Amber Buzz", value: "#d97706" },
    { name: "Rose Spark", value: "#be123c" }
  ];

  // Helper to trigger random mock data
  const randomizeFields = () => {
    const hooks = [
      "¿Cansado de perder plata?",
      "¡Automatizá tu Agenda!",
      "Tu negocio en piloto automático",
      "¿Turnos cancelados a último momento?",
      "Reservas 24/7 sin esfuerzo"
    ];
    const subs = [
      "Recordatorios automáticos por WhatsApp con confirmación instantánea. Citax trabaja por vos.",
      "Tus clientes reservan solos desde un link personalizado. Sin chats interminables.",
      "Reducí el ausentismo hasta un 90% con nuestro sistema inteligente de alertas.",
      "Controlá tus finanzas, prestadores y horarios desde un solo centro de comando.",
      "Integración impecable, configuración en 5 minutos. Modernizá tu peluquería o estética hoy."
    ];
    const businesses = [
      "Club de la Barba",
      "Paula Herrera Estética",
      "Clínica Dental Sur",
      "Spa Urbano",
      "Gimnasio Zeus"
    ];

    setTitle(hooks[Math.floor(Math.random() * hooks.length)]);
    setSubtitle(subs[Math.floor(Math.random() * subs.length)]);
    setBusinessName(businesses[Math.floor(Math.random() * businesses.length)]);
  };

  // Export handler
  const handleExport = async () => {
    if (!exportRef.current) return;
    setExporting(true);

    try {
      // Small delay to ensure rendering completes
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const dataUrl = await toPng(exportRef.current, {
        width: ratio === "feed" ? 1080 : 1080,
        height: ratio === "feed" ? 1080 : 1920,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          width: ratio === "feed" ? "1080px" : "1080px",
          height: ratio === "feed" ? "1080px" : "1920px"
        },
        pixelRatio: 2 // Retains high density
      });

      const link = document.createElement("a");
      link.download = `citax-flyer-${template}-${ratio}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting image:", error);
    } finally {
      setExporting(false);
    }
  };

  // Dimensions based on selected ratio
  const width = 1080;
  const height = ratio === "feed" ? 1080 : 1920;
  
  // Calculate scaled CSS values to fit preview window nicely
  const scale = ratio === "feed" ? 0.45 : 0.32;

  // Background Class mapper
  const getBgStyleClass = () => {
    switch (bgStyle) {
      case "gradient":
        return "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50";
      case "dark":
        return "bg-slate-950 text-white";
      case "grid":
      default:
        return "bg-slate-50 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-100 text-slate-800 font-sans">
      
      {/* Settings Control Panel */}
      <div className="w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 flex flex-col gap-6 shrink-0 z-10 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg text-slate-900">Editor de Flyers</h2>
          </div>
          <button 
            onClick={randomizeFields} 
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-primary transition-all"
            title="Randomize Content"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <hr className="border-slate-100" />

        {/* Template Selector */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Template</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
              { id: "dashboard", label: "Dashboard", icon: Calendar },
              { id: "features", label: "Features", icon: Layers }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-1.5 transition-all select-none ${
                  template === t.id
                    ? "border-primary bg-blue-50/50 text-primary font-bold shadow-sm"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Layout / Size Ratio */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tamaño del Flyer</label>
          <div className="flex gap-2">
            <button
              onClick={() => setRatio("feed")}
              className={`flex-1 flex items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-2 transition-all ${
                ratio === "feed"
                  ? "border-primary bg-blue-50/50 text-primary font-bold shadow-sm"
                  : "border-slate-200 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <FileImage className="w-4 h-4" />
              Feed (1:1)
            </button>
            <button
              onClick={() => setRatio("story")}
              className={`flex-1 flex items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-2 transition-all ${
                ratio === "story"
                  ? "border-primary bg-blue-50/50 text-primary font-bold shadow-sm"
                  : "border-slate-200 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Story (9:16)
            </button>
          </div>
        </div>

        {/* Color Presets */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Color Primario</label>
          <div className="flex flex-wrap gap-2">
            {colorPresets.map((color) => (
              <button
                key={color.value}
                onClick={() => setPrimaryColor(color.value)}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-sm"
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {primaryColor === color.value && <Check className="w-4 h-4 text-white drop-shadow-sm" />}
              </button>
            ))}
            <input 
              type="color" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-8 h-8 rounded-full border border-slate-200 cursor-pointer overflow-hidden p-0 bg-transparent shrink-0" 
            />
          </div>
        </div>

        {/* Background Style */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Estilo de Fondo</label>
          <div className="grid grid-cols-3 gap-2">
            {["grid", "gradient", "dark"].map((style) => (
              <button
                key={style}
                onClick={() => setBgStyle(style)}
                className={`p-2 rounded-lg border text-xs font-semibold capitalize transition-all ${
                  bgStyle === style
                    ? "border-primary bg-blue-50/50 text-primary font-bold"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Texts Configuration */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Negocio Mock</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Título / Gancho</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Subtítulo / Mensaje</label>
            <textarea
              value={subtitle}
              rows={3}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-medium resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Call to Action (CTA)</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-semibold"
            />
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={exporting}
          className="mt-auto w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 text-sm select-none"
        >
          {exporting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generando PNG...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Exportar en {ratio === "feed" ? "1080x1080" : "1080x1920"}
            </>
          )}
        </button>
      </div>

      {/* Live Preview Canvas Wrapper */}
      <div className="flex-grow flex items-center justify-center p-6 lg:p-12 overflow-auto bg-[#e8ecf3]">
        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-white"
          style={{
            width: `${width * scale}px`,
            height: `${height * scale}px`,
            minWidth: `${width * scale}px`,
            minHeight: `${height * scale}px`
          }}
        >
          {/* Virtual Zooming Canvas */}
          <div
            id="flyer-canvas"
            ref={exportRef}
            className={`absolute top-0 left-0 select-none ${getBgStyleClass()}`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left"
            }}
          >
            {/* Template WhatsApp layout */}
            {template === "whatsapp" && (
              <div className="w-full h-full p-16 flex flex-col justify-between relative">
                {/* Header branding */}
                <div className="flex justify-between items-center">
                  <Logo size="md" dark={bgStyle !== "dark"} />
                  <span className={`text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${
                    bgStyle === "dark" ? "border-slate-800 bg-slate-900/50 text-slate-400" : "border-slate-200 bg-slate-100 text-slate-500"
                  }`}>
                    Automatización inteligente
                  </span>
                </div>

                {/* Main Content Body */}
                <div className="my-auto space-y-10">
                  <div className="space-y-4 max-w-[90%]">
                    <span 
                      className="inline-block text-xs font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-lg text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      WhatsApp Bot
                    </span>
                    <h1 className="text-6xl font-black tracking-tight leading-[1.05] uppercase">
                      {title}
                    </h1>
                  </div>

                  {/* Chat Preview Frame */}
                  <div className={`p-8 rounded-3xl border border-black/5 bg-slate-100/50 backdrop-blur-md max-w-xl shadow-lg relative overflow-hidden ${
                    bgStyle === "dark" ? "bg-slate-900/30 border-white/5" : ""
                  }`}>
                    {/* Decorative Top Bar */}
                    <div className="flex items-center gap-2 border-b border-black/5 pb-3.5 mb-4">
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-400" />
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold text-slate-400 ml-1">whatsapp_chat_simulator</span>
                    </div>

                    <WhatsAppBubble 
                      text="Hola! Che se me re complicó, disculpa. ¿Puedo cancelar el turno de hoy?"
                      sender="user"
                      time="10:15 hs"
                    />

                    <WhatsAppBubble 
                      text={`¡Hola! No hay problema. Tu turno fue cancelado automáticamente. \n\nSi querés volver a agendar podés hacerlo desde este link: \nhttps://citax.com.ar/${businessName.toLowerCase().replace(/\s+/g, "-")}`}
                      sender="citax"
                      time="10:15 hs"
                      status="read"
                    />
                  </div>

                  {/* Main Subtitle */}
                  <p className={`text-xl font-semibold leading-relaxed max-w-[85%] ${
                    bgStyle === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {subtitle}
                  </p>
                </div>

                {/* Footer branding */}
                <div className="border-t border-black/5 pt-8 flex justify-between items-center">
                  <span className={`text-sm font-bold tracking-wide ${bgStyle === "dark" ? "text-slate-400" : "text-slate-700"}`}>
                    {ctaText}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Citax API v2</span>
                  </div>
                </div>
              </div>
            )}

            {/* Template Dashboard layout */}
            {template === "dashboard" && (
              <div className="w-full h-full p-16 flex flex-col justify-between">
                {/* Header branding */}
                <div className="flex justify-between items-center">
                  <Logo size="md" dark={bgStyle !== "dark"} />
                  <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-100 text-slate-500">
                    Panel de Administración
                  </span>
                </div>

                {/* Main Content Body */}
                <div className="my-auto grid grid-cols-12 gap-10 items-center">
                  <div className="col-span-6 space-y-6">
                    <span 
                      className="inline-block text-xs font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-lg text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Citax Dashboard
                    </span>
                    <h1 className="text-6xl font-black tracking-tight leading-[1.05] uppercase">
                      {title}
                    </h1>
                    <p className={`text-lg font-semibold leading-relaxed ${
                      bgStyle === "dark" ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {subtitle}
                    </p>
                  </div>

                  {/* Dashboard Mock Component */}
                  <div className="col-span-6">
                    <DashboardMock 
                      businessName={businessName} 
                      className="shadow-2xl border-slate-200"
                      appointments={[
                        { id: 1, clientName: "Julieta Romero", service: "Extensiones Pestañas", time: "16:00 hs", status: "Confirmado", notified: true },
                        { id: 2, clientName: "Tomás Pérez", service: "Corte Degradé + Lavado", time: "17:15 hs", status: "Confirmado", notified: true },
                        { id: 3, clientName: "Sofía Medina", service: "Esmaltado Semipermanente", time: "18:30 hs", status: "Pendiente", notified: false }
                      ]}
                    />
                  </div>
                </div>

                {/* Footer branding */}
                <div className="border-t border-black/5 pt-8 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700 tracking-wide">
                    {ctaText}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <span>99.9% Uptime</span>
                  </div>
                </div>
              </div>
            )}

            {/* Template Features layout */}
            {template === "features" && (
              <div className="w-full h-full p-16 flex flex-col justify-between">
                {/* Header branding */}
                <div className="flex justify-between items-center">
                  <Logo size="md" dark={bgStyle !== "dark"} />
                  <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-100 text-slate-500">
                    ¿Qué hace Citax?
                  </span>
                </div>

                {/* Main Content Body */}
                <div className="my-auto space-y-10">
                  <div className="space-y-4 text-center">
                    <h1 className="text-6xl font-black tracking-tight leading-[1.05] uppercase">
                      {title}
                    </h1>
                    <p className={`text-xl font-semibold max-w-2xl mx-auto leading-relaxed ${
                      bgStyle === "dark" ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {subtitle}
                    </p>
                  </div>

                  {/* 3 columns of features */}
                  <div className="grid grid-cols-3 gap-8">
                    {[
                      { title: "Agenda Inteligente", desc: "Tus clientes reservan solos desde un link, reduciendo chats de consulta.", icon: Calendar },
                      { title: "Recordatorios de WhatsApp", desc: "Alertas automáticas de confirmación y cancelación para evitar inasistencias.", icon: MessageSquare },
                      { title: "Dashboard & Métricas", desc: "Control total de prestadores, finanzas, comisiones y estadísticas en tiempo real.", icon: Layers }
                    ].map((feature, i) => (
                      <div 
                        key={i} 
                        className={`p-8 rounded-3xl border border-black/5 bg-white shadow-lg space-y-4 hover:scale-[1.02] transition-transform ${
                          bgStyle === "dark" ? "bg-slate-900 border-white/5" : ""
                        }`}
                      >
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <h4 className="font-extrabold text-lg">{feature.title}</h4>
                        <p className={`text-sm leading-relaxed ${
                          bgStyle === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}>
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer branding */}
                <div className="border-t border-black/5 pt-8 text-center">
                  <span className="text-sm font-bold text-slate-700 tracking-wide">
                    {ctaText}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default FlyerCreator;
