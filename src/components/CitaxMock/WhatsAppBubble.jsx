import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";

export function WhatsAppBubble({
  text = "",
  sender = "user", // "user" (customer, left, white), "citax" (system, right, green)
  time = "12:00",
  status = "read", // "sent" | "delivered" | "read"
  animated = false,
  typingSpeed = 30, // ms per character
  className = "",
  onDoneTyping = () => {}
}) {
  const [displayedText, setDisplayedText] = useState(animated ? "" : text);
  const [isTyping, setIsTyping] = useState(animated);

  useEffect(() => {
    if (!animated) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    setDisplayedText("");
    setIsTyping(true);

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
        onDoneTyping();
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, animated, typingSpeed]);

  const isCitax = sender === "citax";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full mb-3 ${isCitax ? "justify-end" : "justify-start"} ${className}`}
    >
      <div
        className={`relative max-w-[85%] px-3.5 py-2 rounded-2xl text-[14px] shadow-sm select-none border border-black/5 ${
          isCitax
            ? "bg-[#d9fdd3] text-slate-800 rounded-tr-none"
            : "bg-white text-slate-800 rounded-tl-none"
        }`}
      >
        {/* Chat bubble tail */}
        <div
          className={`absolute top-0 w-3 h-3 ${
            isCitax
              ? "right-[-6px] bg-[#d9fdd3] border-r border-t border-black/5 rotate-[45deg] rounded-sm"
              : "left-[-6px] bg-white border-l border-t border-black/5 rotate-[-45deg] rounded-sm"
          }`}
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
        />

        {/* Sender Label */}
        <div className="text-[11px] font-bold text-slate-500 mb-0.5">
          {isCitax ? "Citax Assistant" : "Cliente"}
        </div>

        {/* Content */}
        <div className="whitespace-pre-wrap break-words leading-relaxed font-sans font-medium">
          {isTyping ? (
            <div className="flex items-center gap-1 py-1 px-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            displayedText
          )}
        </div>

        {/* Time and Status Footer */}
        <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400 select-none">
          <span>{time}</span>
          {isCitax && !isTyping && (
            <span className="ml-1">
              {status === "sent" && <Check className="w-3.5 h-3.5 text-slate-400" />}
              {status === "delivered" && <CheckCheck className="w-3.5 h-3.5 text-slate-400" />}
              {status === "read" && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default WhatsAppBubble;
