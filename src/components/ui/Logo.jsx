import React from "react";

export function Logo({ className = "", iconOnly = false, size = "md", dark = false }) {
  const sizeClasses = {
    sm: { icon: "w-5 h-5", text: "text-lg" },
    md: { icon: "w-8 h-8", text: "text-2xl" },
    lg: { icon: "w-16 h-16", text: "text-4xl" },
    xl: { icon: "w-24 h-24", text: "text-6xl" }
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div 
        className={`${selectedSize.icon} flex items-center justify-center rounded-xl p-1 bg-gradient-to-tr from-primary to-blue-500 shadow-sm`}
      >
        {/* Simple crisp scissors/check SVG for Citax */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-full h-full"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeOpacity="0.2" />
          <path d="M9 12l2 2 4-4" />
          <path d="M7 12h.01" strokeWidth="3" />
          <path d="M17 12h.01" strokeWidth="3" />
        </svg>
      </div>
      {!iconOnly && (
        <span 
          className={`font-black tracking-tight uppercase ${selectedSize.text} ${
            dark ? "text-slate-900" : "text-white"
          }`}
        >
          Citax
        </span>
      )}
    </div>
  );
}

export default Logo;
