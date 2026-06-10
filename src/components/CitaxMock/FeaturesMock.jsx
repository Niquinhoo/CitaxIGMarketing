import React from "react";
import { MessageSquare, Calendar, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export function FeaturesMock({ className = "", width = 750, businessName = "Citax", accentColor = "#1d4ed8" }) {
  const features = [
    {
      title: "Reserva Online 24/7",
      desc: "Un link personalizado para que tus clientes agenden solos desde WhatsApp o Instagram, sin chats infinitos.",
      badge: "100% Automático",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900",
      icon: Calendar
    },
    {
      title: "Recordatorios Inteligentes",
      desc: "Alertas automáticas de confirmación y cancelación por WhatsApp. Olvidate del ausentismo.",
      badge: "Reducí 90% inasistencias",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
      icon: MessageSquare
    },
    {
      title: "Control total de tu negocio",
      desc: "Estadísticas, prestadores, horarios, ingresos y cálculo automático de comisiones en segundos.",
      badge: "Estadísticas en vivo",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
      icon: Zap
    }
  ];

  return (
    <div 
      style={{ width: `${width}px` }} 
      className={`rounded-3xl bg-white border border-slate-200/80 shadow-xl p-7 flex flex-col gap-6 font-sans text-slate-800 ${className}`}
    >
      {/* Header section of features card */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-4 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">¿Qué incluye {businessName}?</span>
        </div>
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: accentColor }}>
          Agenda Inteligente
        </div>
      </div>

      {/* Grid of features */}
      <div className="flex flex-col gap-5">
        {features.map((feat, i) => (
          <div 
            key={i} 
            className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
          >
            {/* Glow Icon wrapper */}
            <div 
              style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
              className="p-3.5 rounded-2xl flex items-center justify-center shrink-0 border border-black/5"
            >
              <feat.icon className="w-6 h-6" />
            </div>

            {/* Description */}
            <div className="flex-grow space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-extrabold text-base tracking-tight text-slate-900">
                  {feat.title}
                </h4>
                <span className={`text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${feat.badgeColor.split(' ').filter(c => !c.startsWith('dark:')).join(' ')}`}>
                  {feat.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Pill */}
      <div className="mt-2 flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-2xl text-[11px] font-bold text-slate-500">
        <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Canal de WhatsApp Verificado</span>
        <span className="flex items-center gap-0.5 hover:underline cursor-pointer select-none" style={{ color: accentColor }}>Saber más <ArrowRight className="w-3.5 h-3.5" /></span>
      </div>
    </div>
  );
}

export default FeaturesMock;
