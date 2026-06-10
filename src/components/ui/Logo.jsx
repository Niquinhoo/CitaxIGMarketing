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
        className={`${selectedSize.icon} flex items-center justify-center`}
      >
        <img 
          src="/favicon.svg" 
          alt="Citax Icon" 
          className="w-full h-full object-contain"
        />
      </div>
      {!iconOnly && (
        <span 
          className={`font-black tracking-tight ${selectedSize.text} ${
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
