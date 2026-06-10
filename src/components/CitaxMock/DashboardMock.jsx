import React from "react";
import { Calendar, User, Clock, CheckCircle2, MessageSquare, ChevronRight } from "lucide-react";

export function DashboardMock({ appointments = [], businessName = "Citax Peluquería", className = "" }) {
  // Fallback default mock data if not provided
  const displayAppointments = appointments.length > 0 ? appointments : [
    {
      id: 1,
      clientName: "Paula Herrera",
      service: "Corte + Color Completo",
      time: "10:30 hs",
      status: "Confirmado",
      notified: true
    },
    {
      id: 2,
      clientName: "Martín Gómez",
      service: "Corte Barba y Pelo",
      time: "12:00 hs",
      status: "Confirmado",
      notified: true
    },
    {
      id: 3,
      clientName: "Sofía Medina",
      service: "Manicuría Premium",
      time: "15:30 hs",
      status: "Pendiente",
      notified: false
    }
  ];

  return (
    <div className={`rounded-3xl bg-surface border border-border neo-shadow-lg overflow-hidden flex flex-col font-sans text-slate-800 ${className}`}>
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#1d4ed8] to-[#1e40af] p-5 text-white flex justify-between items-center select-none">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Panel Administrador</span>
          <h3 className="font-extrabold text-lg tracking-tight">{businessName}</h3>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Citax Activo</span>
        </div>
      </div>

      {/* Main stats or indicators */}
      <div className="grid grid-cols-3 border-b border-border bg-slate-50 select-none">
        <div className="p-3.5 text-center border-r border-border">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hoy</div>
          <div className="text-xl font-black text-primary">12 Turnos</div>
        </div>
        <div className="p-3.5 text-center border-r border-border">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confirmados</div>
          <div className="text-xl font-black text-success">98%</div>
        </div>
        <div className="p-3.5 text-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ahorro Tiempo</div>
          <div className="text-xl font-black text-amber-500">4 hs/día</div>
        </div>
      </div>

      {/* Slots / Appointments list */}
      <div className="p-5 flex-grow overflow-hidden space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 select-none flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-primary" /> Turnos de Hoy
        </h4>
        
        {displayAppointments.map((appt) => (
          <div
            key={appt.id}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-border neo-shadow-sm hover:border-blue-400 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-primary font-bold text-sm">
                {appt.clientName.charAt(0)}
              </div>
              <div>
                <h5 className="font-bold text-slate-800 text-sm">{appt.clientName}</h5>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> {appt.time} • {appt.service}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {appt.notified && (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Citax OK
                </span>
              )}
              {!appt.notified && appt.status === "Pendiente" && (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                  Pendiente
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Sub footer */}
      <div className="p-3 bg-slate-50 border-t border-border flex justify-between items-center text-xs text-slate-400 select-none px-5">
        <span className="flex items-center gap-1 font-medium"><MessageSquare className="w-3.5 h-3.5 text-blue-500" /> WhatsApp Conectado</span>
        <span className="mono text-[10px] font-bold">API v2.4</span>
      </div>
    </div>
  );
}

export default DashboardMock;
