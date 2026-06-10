import React, { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import { 
  Download, Sparkles, RefreshCw, Type, Smartphone, FileImage, 
  MessageSquare, Check, Calendar, Plus, Trash2, ArrowUp, ArrowDown, 
  AlignLeft, AlignCenter, Image as ImageIcon, CreditCard, List
} from "lucide-react";
import WhatsAppBubble from "../components/CitaxMock/WhatsAppBubble";
import DashboardMock from "../components/CitaxMock/DashboardMock";
import FeaturesMock from "../components/CitaxMock/FeaturesMock";
import Logo from "../components/ui/Logo";

export function FlyerCreator() {
  const exportRef = useRef(null);
  
  // Layout Options
  const [ratio, setRatio] = useState("feed"); // "feed" (1080x1080) | "story" (1080x1920)
  const [bgStyle, setBgStyle] = useState("grid"); // "grid" | "gradient" | "dark" | "solid" | "custom-gradient" | "pattern-dots" | "radial-aura"
  const [canvasBgColor, setCanvasBgColor] = useState("#f3f6fb");
  const [canvasBgColor2, setCanvasBgColor2] = useState("#1d4ed8");
  
  // Element States
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [exporting, setExporting] = useState(false);
  
  // Snap lines indicators state
  const [snapLines, setSnapLines] = useState({ showV: false, showH: false, x: 0, y: 0 });

  // Drag states
  const [dragState, setDragState] = useState({
    isDragging: false,
    elementId: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0
  });

  // Resize states
  const [resizeState, setResizeState] = useState({
    isResizing: false,
    elementId: null,
    handle: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    initialWidth: 0,
    initialHeight: 0,
    initialScale: 1
  });

  // Scale of the preview
  const canvasWidth = 1080;
  const canvasHeight = ratio === "feed" ? 1080 : 1920;
  const scale = ratio === "feed" ? 0.45 : 0.28;

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("citax_flyer_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.elements && parsed.elements.length > 0) {
          setElements(parsed.elements);
        }
        if (parsed.ratio) setRatio(parsed.ratio);
        if (parsed.bgStyle) setBgStyle(parsed.bgStyle);
        if (parsed.canvasBgColor) setCanvasBgColor(parsed.canvasBgColor);
        if (parsed.canvasBgColor2) setCanvasBgColor2(parsed.canvasBgColor2);
      } else {
        applyTemplate("whatsapp");
      }
    } catch (e) {
      console.error("Failed to load saved state:", e);
      applyTemplate("whatsapp");
    }
  }, []);

  // Save state to localStorage whenever elements or configuration changes
  useEffect(() => {
    if (elements.length === 0) return;
    try {
      const stateToSave = {
        elements,
        ratio,
        bgStyle,
        canvasBgColor,
        canvasBgColor2
      };
      localStorage.setItem("citax_flyer_state", JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state:", e);
    }
  }, [elements, ratio, bgStyle, canvasBgColor, canvasBgColor2]);

  // Keyboard listener to delete components via Delete / Backspace keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
          return; // Skip if writing in fields
        }
        if (selectedId) {
          e.preventDefault();
          setElements((prev) => prev.filter((el) => el.id !== selectedId));
          setSelectedId(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  // Predefined templates
  const applyTemplate = (type) => {
    let newElements = [];
    if (type === "whatsapp") {
      newElements = [
        {
          id: "logo-1",
          type: "logo",
          x: 60,
          y: 60,
          size: "md",
          dark: bgStyle !== "dark",
          iconOnly: false
        },
        {
          id: "badge-1",
          type: "badge",
          x: 60,
          y: 160,
          text: "Inteligencia Artificial Activa",
          bgColor: "#1d4ed8",
          textColor: "#ffffff"
        },
        {
          id: "title-1",
          type: "text",
          x: 60,
          y: 220,
          text: "¿CLIENTES QUE FALTAN?",
          fontSize: 64,
          fontWeight: "black",
          color: bgStyle === "dark" ? "#ffffff" : "#0f172a",
          width: 800,
          textAlign: "left"
        },
        {
          id: "desc-1",
          type: "text",
          x: 60,
          y: 420,
          text: "Citax envía recordatorios por WhatsApp automáticamente y reprograma turnos colgados en 1 clic.",
          fontSize: 24,
          fontWeight: "medium",
          color: bgStyle === "dark" ? "#cbd5e1" : "#475569",
          width: 750,
          textAlign: "left"
        },
        {
          id: "bubble-u1",
          type: "whatsapp-bubble",
          x: 60,
          y: 540,
          sender: "user",
          text: "Hola! Disculpá, me surgió un problema y no voy a poder ir al turno de las 15 hs 😔",
          time: "10:15 hs",
          status: "read"
        },
        {
          id: "bubble-c1",
          type: "whatsapp-bubble",
          x: 60,
          y: 670,
          sender: "citax",
          text: "¡Hola Paula! Tu turno fue cancelado. Si querés volver a reservar, hacelo acá:\ncitax.com.ar/estilo-real",
          time: "10:15 hs",
          status: "read"
        },
        {
          id: "cta-1",
          type: "text",
          x: 60,
          y: 920,
          text: "Comenzá tu prueba gratuita hoy en citax.com.ar",
          fontSize: 20,
          fontWeight: "bold",
          color: "#1d4ed8",
          width: 960,
          textAlign: "center"
        }
      ];
    } else if (type === "dashboard") {
      newElements = [
        {
          id: "logo-2",
          type: "logo",
          x: 60,
          y: 60,
          size: "md",
          dark: bgStyle !== "dark",
          iconOnly: false
        },
        {
          id: "title-2",
          type: "text",
          x: 60,
          y: 150,
          text: "CONTROLÁ TU AGENDA",
          fontSize: 54,
          fontWeight: "black",
          color: bgStyle === "dark" ? "#ffffff" : "#0f172a",
          width: 960,
          textAlign: "center"
        },
        {
          id: "desc-2",
          type: "text",
          x: 60,
          y: 230,
          text: "Visualizá turnos, confirmaciones y estadísticas en tiempo real.",
          fontSize: 22,
          fontWeight: "medium",
          color: bgStyle === "dark" ? "#cbd5e1" : "#475569",
          width: 960,
          textAlign: "center"
        },
        {
          id: "dash-mock",
          type: "dashboard",
          x: 140,
          y: 320,
          width: 800,
          businessName: "Paula Herrera Estética"
        },
        {
          id: "cta-2",
          type: "text",
          x: 60,
          y: 920,
          text: "Registrate en citax.com.ar",
          fontSize: 22,
          fontWeight: "bold",
          color: "#1d4ed8",
          width: 960,
          textAlign: "center"
        }
      ];
    } else {
      // Modern features template
      setBgStyle("radial-aura");
      setCanvasBgColor("#1d4ed8");

      newElements = [
        {
          id: "logo-3",
          type: "logo",
          x: 440,
          y: 70,
          size: "md",
          dark: false, // White logo on dark radial background
          iconOnly: false
        },
        {
          id: "title-3",
          type: "text",
          x: 60,
          y: 170,
          text: "TU AGENDA EN AUTO-PILOTO",
          fontSize: 48,
          fontWeight: "black",
          color: "#ffffff",
          width: 960,
          textAlign: "center"
        },
        {
          id: "desc-3",
          type: "text",
          x: 60,
          y: 240,
          text: "La plataforma que automatiza tus reservas y reduce ausencias por WhatsApp.",
          fontSize: 22,
          fontWeight: "medium",
          color: "#cbd5e1",
          width: 960,
          textAlign: "center"
        },
        {
          id: "feat-showcase",
          type: "features-mock",
          x: 140,
          y: 340,
          width: 800,
          businessName: "Citax",
          accentColor: "#3b82f6" // Vibrant blue accent
        },
        {
          id: "cta-3",
          type: "text",
          x: 60,
          y: 930,
          text: "Comenzá tu prueba gratuita de 14 días en citax.com.ar",
          fontSize: 20,
          fontWeight: "bold",
          color: "#60a5fa",
          width: 960,
          textAlign: "center"
        }
      ];
    }

    // If story ratio, slide elements down slightly or space them out
    if (ratio === "story") {
      newElements = newElements.map(el => {
        if (el.y > 500) {
          return { ...el, y: el.y + 350 };
        } else if (el.y > 200) {
          return { ...el, y: el.y + 100 };
        }
        return el;
      });
    }

    setElements(newElements);
    setSelectedId(null);
  };



  // Mouse drag handlers
  const handleMouseDown = (e, el) => {
    e.stopPropagation();
    setSelectedId(el.id);

    // Track original client and position offset
    setDragState({
      isDragging: true,
      elementId: el.id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: el.x,
      initialY: el.y
    });
  };

  // Mouse resize handlers
  const handleResizeMouseDown = (e, el, handle) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedId(el.id);

    setResizeState({
      isResizing: true,
      elementId: el.id,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialX: el.x,
      initialY: el.y,
      initialWidth: el.width || (el.type === "logo" ? 150 : el.type === "whatsapp-bubble" ? 450 : el.type === "dashboard" ? 700 : 300),
      initialHeight: el.height || (el.type === "whatsapp-bubble" ? 120 : el.type === "dashboard" ? 420 : el.type === "logo" ? 60 : 80),
      initialScale: el.scale || 1
    });
  };

  // Global mouse move and mouse up listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragState.isDragging && dragState.elementId) {
        const dx = (e.clientX - dragState.startX) / scale;
        const dy = (e.clientY - dragState.startY) / scale;

        let nextX = Math.round(dragState.initialX + dx);
        let nextY = Math.round(dragState.initialY + dy);

        // Snap configuration
        const snapThreshold = 18; // snap threshold in canvas pixels
        let snappedX = false;
        let snappedY = false;
        let snapValX = 0;
        let snapValY = 0;

        // Find the element currently being dragged to determine its width/height
        const el = elements.find((item) => item.id === dragState.elementId);
        if (el) {
          const elScale = el.scale || 1;
          
          // Width estimation
          let elWidth = el.width || 300;
          if (el.type === "logo") {
            elWidth = el.size === "sm" ? 100 : el.size === "md" ? 150 : el.size === "lg" ? 300 : 450;
          } else if (el.type === "whatsapp-bubble") {
            elWidth = 450;
          } else if (el.type === "dashboard") {
            elWidth = el.width || 700;
          } else if (el.type === "badge") {
            elWidth = 220;
          }
          elWidth = elWidth * elScale;

          // Height estimation
          let elHeight = 80;
          if (el.type === "whatsapp-bubble") elHeight = 120;
          else if (el.type === "dashboard") elHeight = 420;
          else if (el.type === "logo") elHeight = 60;
          else if (el.type === "badge") elHeight = 40;
          elHeight = elHeight * elScale;

          // X Snapping calculations
          const elCenterX = nextX + elWidth / 2;

          // A. Snap center of element to coordinate 0 (placed exactly half off-screen)
          if (Math.abs(elCenterX) < snapThreshold) {
            nextX = Math.round(-elWidth / 2);
            snappedX = true;
            snapValX = 0;
          }
          // B. Snap center of element to canvas horizontal center (540)
          else if (Math.abs(elCenterX - canvasWidth / 2) < snapThreshold) {
            nextX = Math.round(canvasWidth / 2 - elWidth / 2);
            snappedX = true;
            snapValX = canvasWidth / 2;
          }
          // C. Snap left edge to 0
          else if (Math.abs(nextX) < snapThreshold) {
            nextX = 0;
            snappedX = true;
            snapValX = 0;
          }

          // Y Snapping calculations
          const elCenterY = nextY + elHeight / 2;

          // A. Snap center of element to coordinate 0 (placed exactly half off-screen)
          if (Math.abs(elCenterY) < snapThreshold) {
            nextY = Math.round(-elHeight / 2);
            snappedY = true;
            snapValY = 0;
          }
          // B. Snap center of element to canvas vertical center
          else if (Math.abs(elCenterY - canvasHeight / 2) < snapThreshold) {
            nextY = Math.round(canvasHeight / 2 - elHeight / 2);
            snappedY = true;
            snapValY = canvasHeight / 2;
          }
          // C. Snap top edge to 0
          else if (Math.abs(nextY) < snapThreshold) {
            nextY = 0;
            snappedY = true;
            snapValY = 0;
          }
        }

        // Update vertical and horizontal snap line indicators
        setSnapLines({
          showV: snappedX,
          showH: snappedY,
          x: snapValX,
          y: snapValY
        });

        setElements((prev) =>
          prev.map((item) => {
            if (item.id === dragState.elementId) {
              return {
                ...item,
                x: Math.max(-400, Math.min(canvasWidth, nextX)),
                y: Math.max(-400, Math.min(canvasHeight, nextY))
              };
            }
            return item;
          })
        );
      } else if (resizeState.isResizing && resizeState.elementId) {
        const dx = (e.clientX - resizeState.startX) / scale;
        const dy = (e.clientY - resizeState.startY) / scale;

        setElements((prev) =>
          prev.map((item) => {
            if (item.id === resizeState.elementId) {
              const updated = { ...item };
              const h = resizeState.handle;

              // Width resizing
              if (h === "r") {
                updated.width = Math.max(50, Math.round(resizeState.initialWidth + dx));
              } else if (h === "l") {
                const newWidth = Math.max(50, Math.round(resizeState.initialWidth - dx));
                updated.width = newWidth;
                updated.x = Math.round(resizeState.initialX + (resizeState.initialWidth - newWidth));
              }

              // Height or Scale resizing
              if (h === "b") {
                if (item.type === "image" || item.type === "dashboard") {
                  updated.height = Math.max(35, Math.round(resizeState.initialHeight + dy));
                } else {
                  const scaleDelta = dy / 180;
                  updated.scale = Math.max(0.2, Math.min(4, parseFloat((resizeState.initialScale + scaleDelta).toFixed(3))));
                }
              }

              // Corner resizing: adjust scale factor proportionally
              if (h === "br" || h === "tr" || h === "bl" || h === "tl") {
                const delta = (dx + dy) / 2;
                const scaleDelta = delta / 250;
                updated.scale = Math.max(0.2, Math.min(4, parseFloat((resizeState.initialScale + scaleDelta).toFixed(3))));
              }

              return updated;
            }
            return item;
          })
        );
      }
    };

    const handleMouseUp = () => {
      if (dragState.isDragging) {
        setDragState({
          isDragging: false,
          elementId: null,
          startX: 0,
          startY: 0,
          initialX: 0,
          initialY: 0
        });
        setSnapLines({ showV: false, showH: false, x: 0, y: 0 });
      }
      if (resizeState.isResizing) {
        setResizeState({
          isResizing: false,
          elementId: null,
          handle: null,
          startX: 0,
          startY: 0,
          initialX: 0,
          initialY: 0,
          initialWidth: 0,
          initialHeight: 0,
          initialScale: 1
        });
      }
    };

    if (dragState.isDragging || resizeState.isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, resizeState, scale, elements]);

  // Add Element Helpers
  const addTextElement = () => {
    const id = `text-${Date.now()}`;
    const newEl = {
      id,
      type: "text",
      x: 100,
      y: 400,
      text: "Hacé clic para editar este texto",
      fontSize: 32,
      fontWeight: "semibold",
      color: bgStyle === "dark" ? "#ffffff" : "#0f172a",
      width: 600,
      textAlign: "left"
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(id);
  };

  const addButtonElement = () => {
    const id = `btn-${Date.now()}`;
    const newEl = {
      id,
      type: "button",
      x: 100,
      y: 500,
      text: "⚡ Botón de Ejemplo",
      bgColor: "#1d4ed8",
      textColor: "#ffffff",
      fontSize: 24,
      width: 400
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(id);
  };

  const addLogoElement = () => {
    const id = `logo-${Date.now()}`;
    const newEl = {
      id,
      type: "logo",
      x: 100,
      y: 100,
      size: "md",
      dark: bgStyle !== "dark",
      iconOnly: false
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(id);
  };

  const addBubbleElement = () => {
    const id = `bubble-${Date.now()}`;
    const newEl = {
      id,
      type: "whatsapp-bubble",
      x: 100,
      y: 600,
      sender: "citax",
      text: "¡Hola! Su turno de hoy está confirmado.",
      time: "12:00 hs",
      status: "read"
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(id);
  };

  const addDashboardElement = () => {
    const id = `dash-${Date.now()}`;
    const newEl = {
      id,
      type: "dashboard",
      x: 100,
      y: 300,
      width: 700,
      businessName: "Paula Herrera Estética"
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(id);
  };

  const addFeaturesElement = () => {
    const id = `feat-mock-${Date.now()}`;
    const newEl = {
      id,
      type: "features-mock",
      x: 140,
      y: 300,
      width: 800,
      businessName: "Citax",
      accentColor: "#1d4ed8"
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(id);
  };

  // Image Upload handler to convert file to base64 draggable element
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const id = `img-${Date.now()}`;
      const newEl = {
        id,
        type: "image",
        x: 200,
        y: 300,
        src: event.target.result,
        width: 300,
        height: "auto"
      };
      setElements((prev) => [...prev, newEl]);
      setSelectedId(id);
    };
    reader.readAsDataURL(file);
  };

  // Delete Element
  const deleteSelected = () => {
    if (!selectedId) return;
    setElements((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  // Reordering Layers
  const moveForward = () => {
    if (!selectedId) return;
    const index = elements.findIndex((el) => el.id === selectedId);
    if (index === -1 || index === elements.length - 1) return;
    const copy = [...elements];
    const item = copy[index];
    copy.splice(index, 1);
    copy.splice(index + 1, 0, item);
    setElements(copy);
  };

  const moveBackward = () => {
    if (!selectedId) return;
    const index = elements.findIndex((el) => el.id === selectedId);
    if (index === -1 || index === 0) return;
    const copy = [...elements];
    const item = copy[index];
    copy.splice(index, 1);
    copy.splice(index - 1, 0, item);
    setElements(copy);
  };

  // Alignments helpers
  const alignCenter = () => {
    if (!selectedId) return;
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === selectedId) {
          const w = el.width || 300;
          return { ...el, x: Math.round((canvasWidth - w) / 2) };
        }
        return el;
      })
    );
  };

  const alignLeft = () => {
    if (!selectedId) return;
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === selectedId) {
          return { ...el, x: 60 };
        }
        return el;
      })
    );
  };

  // Custom prop updator
  const updateSelectedProp = (key, value) => {
    if (!selectedId) return;
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === selectedId) {
          return { ...el, [key]: value };
        }
        return el;
      })
    );
  };

  // Export PNG method
  const handleExport = async () => {
    if (!exportRef.current) return;
    setSelectedId(null); // Clear selection border during export
    setExporting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const dataUrl = await toPng(exportRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`
        },
        pixelRatio: 2
      });

      const link = document.createElement("a");
      link.download = `citax-design-${ratio}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failure:", err);
    } finally {
      setExporting(false);
    }
  };

  // Background style classes
  const getBgStyleClass = () => {
    switch (bgStyle) {
      case "gradient":
        return "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50";
      case "dark":
        return "bg-slate-950 text-white";
      case "solid":
        return "";
      case "custom-gradient":
        return "";
      case "pattern-dots":
        return "bg-[#f3f6fb] [background-image:radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:20px_20px]";
      case "radial-aura":
        return "";
      case "grid":
      default:
        return "bg-[#f3f6fb] [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]";
    }
  };

  const activeElement = elements.find((el) => el.id === selectedId);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-100 text-slate-800 font-sans">
      
      {/* Sidebar Controls */}
      <div className="w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 flex flex-col gap-6 shrink-0 z-10 max-h-screen overflow-y-auto select-none">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg text-slate-900">Editor Pro (WYSIWYG)</h2>
          </div>
          <button 
            onClick={() => applyTemplate("whatsapp")} 
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-primary transition-all"
            title="Reiniciar a plantilla"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <hr className="border-slate-100" />

        {/* Global Layout Setup */}
        <div className="space-y-4">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Diseño Canvas</label>
          <div className="flex gap-2">
            <button
              onClick={() => setRatio("feed")}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-xl border text-xs font-semibold gap-2 transition-all ${
                ratio === "feed" ? "border-primary bg-blue-50/50 text-primary font-bold shadow-sm" : "border-slate-200 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <FileImage className="w-4 h-4" /> Feed 1:1
            </button>
            <button
              onClick={() => setRatio("story")}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-xl border text-xs font-semibold gap-2 transition-all ${
                ratio === "story" ? "border-primary bg-blue-50/50 text-primary font-bold shadow-sm" : "border-slate-200 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <Smartphone className="w-4 h-4" /> Story 9:16
            </button>
          </div>

          {/* Canvas Background Settings */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">Estilo de Fondo</label>
            <select
              value={bgStyle}
              onChange={(e) => setBgStyle(e.target.value)}
              className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
            >
              <option value="grid">Líneas de Rejilla (Citax Default)</option>
              <option value="gradient">Gradiente Suave</option>
              <option value="dark">Tema Oscuro Slate</option>
              <option value="solid">Color Sólido</option>
              <option value="custom-gradient">Gradiente Personalizado</option>
              <option value="pattern-dots">Puntos Polka (Dots)</option>
              <option value="radial-aura">Aura Radial Oscura</option>
            </select>
          </div>

          {/* Background Colors Customizers */}
          {bgStyle === "solid" && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Color de Fondo</label>
              <input
                type="color"
                value={canvasBgColor}
                onChange={(e) => setCanvasBgColor(e.target.value)}
                className="w-full h-8 rounded border border-slate-200 cursor-pointer overflow-hidden bg-transparent"
              />
            </div>
          )}

          {bgStyle === "radial-aura" && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Color del Aura Central</label>
              <input
                type="color"
                value={canvasBgColor}
                onChange={(e) => setCanvasBgColor(e.target.value)}
                className="w-full h-8 rounded border border-slate-200 cursor-pointer overflow-hidden bg-transparent"
              />
            </div>
          )}

          {bgStyle === "custom-gradient" && (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Color Inicio</label>
                <input
                  type="color"
                  value={canvasBgColor}
                  onChange={(e) => setCanvasBgColor(e.target.value)}
                  className="w-full h-8 rounded border border-slate-200 cursor-pointer overflow-hidden bg-transparent"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Color Fin</label>
                <input
                  type="color"
                  value={canvasBgColor2}
                  onChange={(e) => setCanvasBgColor2(e.target.value)}
                  className="w-full h-8 rounded border border-slate-200 cursor-pointer overflow-hidden bg-transparent"
                />
              </div>
            </div>
          )}

          {/* Gradient Presets Gallery */}
          {(bgStyle === "custom-gradient" || bgStyle === "solid" || bgStyle === "radial-aura") && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Gradients Destacados</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Citax Sunset", start: "#1d4ed8", end: "#f43f5e" },
                  { name: "Emerald Dream", start: "#0f766e", end: "#10b981" },
                  { name: "Ocean Wave", start: "#1e3a8a", end: "#06b6d4" },
                  { name: "Luxury Dark", start: "#09090b", end: "#1e293b" },
                  { name: "WhatsApp Green", start: "#022c22", end: "#064e3b" },
                  { name: "Neon Glow", start: "#581c87", end: "#1e1b4b" }
                ].map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setBgStyle("custom-gradient");
                      setCanvasBgColor(preset.start);
                      setCanvasBgColor2(preset.end);
                    }}
                    className="w-8 h-8 rounded-full border border-slate-200 shadow-sm transition-transform hover:scale-110 active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${preset.start} 0%, ${preset.end} 100%)`
                    }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <hr className="border-slate-100" />

        {/* Add Elements Toolbar */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Agregar Elementos</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button 
              onClick={addTextElement} 
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-all shadow-sm"
            >
              <Type className="w-4 h-4 text-blue-500" /> Texto
            </button>
            <button 
              onClick={addButtonElement} 
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-all shadow-sm"
            >
              <CreditCard className="w-4 h-4 text-emerald-500" /> Botón
            </button>
            <button 
              onClick={addLogoElement} 
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Logo Citax
            </button>
            <button 
              onClick={addBubbleElement} 
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-rose-500" /> Chat WhatsApp
            </button>
            <button 
              onClick={addDashboardElement} 
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-all shadow-sm col-span-2"
            >
              <Calendar className="w-4 h-4 text-violet-500" /> Panel Dashboard Mockup
            </button>
            <button 
              onClick={addFeaturesElement} 
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-all shadow-sm col-span-2"
            >
              <List className="w-4 h-4 text-indigo-500" /> Showcase de Características (Features)
            </button>

            {/* Custom Image Upload */}
            <label className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-all shadow-sm col-span-2 cursor-pointer">
              <ImageIcon className="w-4 h-4 text-indigo-500" />
              Subir Imagen Personalizada
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Dynamic Contextual Inspector Panel */}
        {activeElement ? (
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 animate-form-swap">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
                Inspector: {activeElement.type}
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={moveForward} 
                  className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600" 
                  title="Traer adelante"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={moveBackward} 
                  className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600" 
                  title="Enviar atrás"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={deleteSelected} 
                  className="p-1 rounded bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600" 
                  title="Eliminar elemento"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Common Alignment Actions */}
            <div className="flex gap-2">
              <button 
                onClick={alignLeft} 
                className="flex-1 flex items-center justify-center py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold gap-1 text-slate-600"
              >
                <AlignLeft className="w-3.5 h-3.5" /> Izquierda
              </button>
              <button 
                onClick={alignCenter} 
                className="flex-1 flex items-center justify-center py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold gap-1 text-slate-600"
              >
                <AlignCenter className="w-3.5 h-3.5" /> Centrar
              </button>
            </div>

            {/* Position coordinate overrides */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Posición X</label>
                <input 
                  type="number" 
                  value={activeElement.x} 
                  onChange={(e) => updateSelectedProp("x", parseInt(e.target.value) || 0)} 
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Posición Y</label>
                <input 
                  type="number" 
                  value={activeElement.y} 
                  onChange={(e) => updateSelectedProp("y", parseInt(e.target.value) || 0)} 
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded" 
                />
              </div>
            </div>

            {/* Element Scale slider */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <label className="text-slate-500 font-bold">Zoom Componente</label>
                <span className="font-mono text-primary font-bold">{(activeElement.scale || 1).toFixed(2)}x</span>
              </div>
              <input 
                type="range" 
                min="0.3" 
                max="3" 
                step="0.05"
                value={activeElement.scale || 1} 
                onChange={(e) => updateSelectedProp("scale", parseFloat(e.target.value))} 
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
              />
            </div>

            {/* Inspector sub-fields depending on Element Type */}
            {activeElement.type === "text" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Contenido Texto</label>
                  <textarea 
                    value={activeElement.text} 
                    onChange={(e) => updateSelectedProp("text", e.target.value)} 
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-sm resize-none" 
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold">Tamaño Fuente</label>
                    <input 
                      type="number" 
                      value={activeElement.fontSize} 
                      onChange={(e) => updateSelectedProp("fontSize", parseInt(e.target.value) || 12)} 
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold">Ancho Bloque</label>
                    <input 
                      type="number" 
                      value={activeElement.width || 400} 
                      onChange={(e) => updateSelectedProp("width", parseInt(e.target.value) || 200)} 
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold">Espesor</label>
                    <select
                      value={activeElement.fontWeight || "medium"}
                      onChange={(e) => updateSelectedProp("fontWeight", e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold"
                    >
                      <option value="light">Light</option>
                      <option value="normal">Normal</option>
                      <option value="medium">Medium</option>
                      <option value="semibold">Semibold</option>
                      <option value="bold">Bold</option>
                      <option value="black">Black</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold">Alineación</label>
                    <select
                      value={activeElement.textAlign || "left"}
                      onChange={(e) => updateSelectedProp("textAlign", e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold"
                    >
                      <option value="left">Izquierda</option>
                      <option value="center">Centro</option>
                      <option value="right">Derecha</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Color de Texto</label>
                  <input 
                    type="color" 
                    value={activeElement.color || "#0f172a"} 
                    onChange={(e) => updateSelectedProp("color", e.target.value)} 
                    className="w-full h-8 rounded border border-slate-200 cursor-pointer overflow-hidden bg-transparent" 
                  />
                </div>
              </>
            )}

            {activeElement.type === "button" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Texto del Botón</label>
                  <input 
                    type="text" 
                    value={activeElement.text} 
                    onChange={(e) => updateSelectedProp("text", e.target.value)} 
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-sm" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold">Tamaño Fuente</label>
                    <input 
                      type="number" 
                      value={activeElement.fontSize} 
                      onChange={(e) => updateSelectedProp("fontSize", parseInt(e.target.value) || 12)} 
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold">Ancho Botón</label>
                    <input 
                      type="number" 
                      value={activeElement.width || 400} 
                      onChange={(e) => updateSelectedProp("width", parseInt(e.target.value) || 200)} 
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold">Fondo Botón</label>
                    <input 
                      type="color" 
                      value={activeElement.bgColor || "#1d4ed8"} 
                      onChange={(e) => updateSelectedProp("bgColor", e.target.value)} 
                      className="w-full h-8 rounded border border-slate-200 cursor-pointer overflow-hidden bg-transparent" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold">Texto Botón</label>
                    <input 
                      type="color" 
                      value={activeElement.textColor || "#ffffff"} 
                      onChange={(e) => updateSelectedProp("textColor", e.target.value)} 
                      className="w-full h-8 rounded border border-slate-200 cursor-pointer overflow-hidden bg-transparent" 
                    />
                  </div>
                </div>
              </>
            )}

            {activeElement.type === "whatsapp-bubble" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Mensaje WhatsApp</label>
                  <textarea 
                    value={activeElement.text} 
                    onChange={(e) => updateSelectedProp("text", e.target.value)} 
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-sm resize-none" 
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold">Remitente</label>
                    <select
                      value={activeElement.sender || "user"}
                      onChange={(e) => updateSelectedProp("sender", e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold"
                    >
                      <option value="user">Cliente (Blanco)</option>
                      <option value="citax">Citax Bot (Verde)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold">Estado Mensaje</label>
                    <select
                      value={activeElement.status || "read"}
                      onChange={(e) => updateSelectedProp("status", e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold"
                    >
                      <option value="sent">Enviado (1 check)</option>
                      <option value="delivered">Entregado (2 check gris)</option>
                      <option value="read">Leído (2 check azul)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Hora</label>
                  <input 
                    type="text" 
                    value={activeElement.time || "10:15 hs"} 
                    onChange={(e) => updateSelectedProp("time", e.target.value)} 
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold" 
                  />
                </div>
              </>
            )}

            {activeElement.type === "dashboard" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Nombre del Negocio</label>
                  <input 
                    type="text" 
                    value={activeElement.businessName || "Paula Herrera Estética"} 
                    onChange={(e) => updateSelectedProp("businessName", e.target.value)} 
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Ancho del Panel</label>
                  <input 
                    type="number" 
                    value={activeElement.width || 700} 
                    onChange={(e) => updateSelectedProp("width", parseInt(e.target.value) || 400)} 
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs" 
                  />
                </div>
              </>
            )}

            {activeElement.type === "features-mock" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Nombre del Negocio</label>
                  <input 
                    type="text" 
                    value={activeElement.businessName || "Citax"} 
                    onChange={(e) => updateSelectedProp("businessName", e.target.value)} 
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block font-bold">Color Acento</label>
                  <input 
                    type="color" 
                    value={activeElement.accentColor || "#1d4ed8"} 
                    onChange={(e) => updateSelectedProp("accentColor", e.target.value)} 
                    className="w-full h-8 rounded border border-slate-200 cursor-pointer overflow-hidden bg-transparent" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Ancho del Panel</label>
                  <input 
                    type="number" 
                    value={activeElement.width || 800} 
                    onChange={(e) => updateSelectedProp("width", parseInt(e.target.value) || 400)} 
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs" 
                  />
                </div>
              </>
            )}

            {activeElement.type === "image" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Ancho Imagen (px)</label>
                  <input 
                    type="number" 
                    value={activeElement.width || 300} 
                    onChange={(e) => updateSelectedProp("width", parseInt(e.target.value) || 50)} 
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs" 
                  />
                </div>
              </>
            )}

            {activeElement.type === "logo" && (
              <>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold">Tamaño</label>
                    <select
                      value={activeElement.size || "md"}
                      onChange={(e) => updateSelectedProp("size", e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold"
                    >
                      <option value="sm">Chico</option>
                      <option value="md">Mediano</option>
                      <option value="lg">Grande</option>
                      <option value="xl">Extra Grande</option>
                    </select>
                  </div>
                  <div className="space-y-1 flex flex-col justify-end">
                    <label className="flex items-center gap-1 text-slate-600 font-bold select-none cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={activeElement.iconOnly || false} 
                        onChange={(e) => updateSelectedProp("iconOnly", e.target.checked)} 
                        className="rounded" 
                      />
                      Icono Solo
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Big Prominent Delete Button */}
            <button
              onClick={deleteSelected}
              className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar Componente
            </button>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center text-xs text-slate-400 font-semibold select-none leading-relaxed">
            Hacé clic en cualquier elemento del flyer para seleccionarlo y editar sus estilos.
          </div>
        )}

        {/* Templates shortcuts */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Restablecer Plantillas</label>
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <button 
              onClick={() => applyTemplate("whatsapp")} 
              className="px-2 py-1.5 border border-slate-200 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold"
            >
              WhatsApp
            </button>
            <button 
              onClick={() => applyTemplate("dashboard")} 
              className="px-2 py-1.5 border border-slate-200 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold"
            >
              Dashboard
            </button>
            <button 
              onClick={() => applyTemplate("features")} 
              className="px-2 py-1.5 border border-slate-200 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold"
            >
              Features
            </button>
          </div>
        </div>

        {/* Download Action */}
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
              Exportar PNG ({ratio === "feed" ? "1080x1080" : "1080x1920"})
            </>
          )}
        </button>
      </div>

      {/* Editor Screen Preview */}
      <div 
        onClick={() => setSelectedId(null)}
        className="flex-grow flex items-center justify-center p-6 lg:p-12 overflow-auto bg-[#e8ecf3]"
      >
        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-white"
          style={{
            width: `${canvasWidth * scale}px`,
            height: `${canvasHeight * scale}px`,
            minWidth: `${canvasWidth * scale}px`,
            minHeight: `${canvasHeight * scale}px`
          }}
        >
          {/* Main Visual Canvas wrapper */}
          <div
            id="wysiwyg-canvas"
            ref={exportRef}
            className={`absolute top-0 left-0 overflow-hidden ${getBgStyleClass()}`}
            style={{
              width: `${canvasWidth}px`,
              height: `${canvasHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              backgroundColor: bgStyle === "solid" ? canvasBgColor : undefined,
              backgroundImage: bgStyle === "custom-gradient" 
                ? `linear-gradient(135deg, ${canvasBgColor} 0%, ${canvasBgColor2} 100%)`
                : bgStyle === "radial-aura"
                ? `radial-gradient(circle at center, ${canvasBgColor} 0%, #0b0f19 100%)`
                : undefined
            }}
          >
            {/* Visual Snapping Guidelines */}
            {snapLines.showV && (
              <div 
                className="absolute border-l-2 border-dashed border-rose-500 z-50 pointer-events-none"
                style={{
                  left: `${snapLines.x}px`,
                  top: 0,
                  bottom: 0,
                  width: '2px'
                }}
              />
            )}
            {snapLines.showH && (
              <div 
                className="absolute border-t-2 border-dashed border-rose-500 z-50 pointer-events-none"
                style={{
                  top: `${snapLines.y}px`,
                  left: 0,
                  right: 0,
                  height: '2px'
                }}
              />
            )}

            {elements.map((el) => {
              const isSelected = el.id === selectedId;

              // Render inner block based on Element Type
              let innerNode = null;
              if (el.type === "logo") {
                innerNode = <Logo size={el.size} iconOnly={el.iconOnly} dark={el.dark} />;
              } else if (el.type === "text") {
                // Inline styles based on weights
                const weightMapper = {
                  light: 300,
                  normal: 400,
                  medium: 500,
                  semibold: 600,
                  bold: 700,
                  black: 900
                };
                innerNode = (
                  <div 
                    style={{ 
                      fontSize: `${el.fontSize}px`, 
                      fontWeight: weightMapper[el.fontWeight] || 500,
                      color: el.color,
                      textAlign: el.textAlign || "left",
                      lineHeight: "1.15"
                    }}
                    className="w-full break-words select-none leading-normal font-sans"
                  >
                    {el.text}
                  </div>
                );
              } else if (el.type === "button") {
                innerNode = (
                  <div 
                    style={{ 
                      backgroundColor: el.bgColor || "#1d4ed8",
                      color: el.textColor || "#ffffff",
                      fontSize: `${el.fontSize}px`
                    }}
                    className="w-full font-black uppercase text-center py-4 px-6 rounded-2xl shadow-md cursor-grab"
                  >
                    {el.text}
                  </div>
                );
              } else if (el.type === "badge") {
                innerNode = (
                  <span 
                    style={{ 
                      backgroundColor: el.bgColor || "#1d4ed8",
                      color: el.textColor || "#ffffff"
                    }}
                    className="inline-block text-xs font-black uppercase tracking-[0.25em] px-4 py-2 rounded-lg"
                  >
                    {el.text}
                  </span>
                );
              } else if (el.type === "whatsapp-bubble") {
                innerNode = (
                  <WhatsAppBubble 
                    text={el.text} 
                    sender={el.sender} 
                    time={el.time} 
                    status={el.status} 
                    animated={false} 
                    className="!mb-0"
                  />
                );
              } else if (el.type === "dashboard") {
                innerNode = (
                  <DashboardMock 
                    businessName={el.businessName}
                    appointments={[
                      { id: 1, clientName: "Julieta Romero", service: "Extensiones Pestañas", time: "16:00 hs", status: "Confirmado", notified: true },
                      { id: 2, clientName: "Tomás Pérez", service: "Corte Degradé + Lavado", time: "17:15 hs", status: "Confirmado", notified: true },
                      { id: 3, clientName: "Sofía Medina", service: "Esmaltado Semipermanente", time: "18:30 hs", status: "Pendiente", notified: false }
                    ]}
                    className="w-full hover:border-slate-200" 
                  />
                );
              } else if (el.type === "features-mock") {
                innerNode = (
                  <FeaturesMock 
                    businessName={el.businessName}
                    width={el.width || 800}
                    accentColor={el.accentColor || "#1d4ed8"}
                    className="w-full hover:border-slate-200" 
                  />
                );
              } else if (el.type === "image") {
                innerNode = (
                  <img 
                    src={el.src} 
                    alt="Custom Upload" 
                    className="w-full object-contain pointer-events-none" 
                  />
                );
              }

              return (
                <div
                  key={el.id}
                  onMouseDown={(e) => handleMouseDown(e, el)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    width: el.width ? `${el.width}px` : "auto",
                    zIndex: isSelected ? 999 : undefined,
                    cursor: dragState.isDragging && dragState.elementId === el.id ? "grabbing" : "grab",
                    transform: el.scale ? `scale(${el.scale})` : undefined,
                    transformOrigin: "top left"
                  }}
                  className={`group select-none rounded ${
                    isSelected ? "outline-dashed outline-2 outline-offset-4 outline-primary" : "hover:outline-dashed hover:outline-1 hover:outline-offset-4 hover:outline-blue-400/60"
                  }`}
                >
                  {/* Bounding box resize handles */}
                  {isSelected && (
                    <>
                      {/* Bounding border box */}
                      <div className="absolute inset-0 border border-primary pointer-events-none" />

                      {/* Corners */}
                      <div 
                        onMouseDown={(e) => handleResizeMouseDown(e, el, "tl")}
                        className="absolute w-3.5 h-3.5 bg-white border-2 border-primary rounded-full z-50 cursor-nwse-resize" 
                        style={{ top: "-7px", left: "-7px" }}
                      />
                      <div 
                        onMouseDown={(e) => handleResizeMouseDown(e, el, "tr")}
                        className="absolute w-3.5 h-3.5 bg-white border-2 border-primary rounded-full z-50 cursor-nesw-resize" 
                        style={{ top: "-7px", right: "-7px" }}
                      />
                      <div 
                        onMouseDown={(e) => handleResizeMouseDown(e, el, "bl")}
                        className="absolute w-3.5 h-3.5 bg-white border-2 border-primary rounded-full z-50 cursor-nesw-resize" 
                        style={{ bottom: "-7px", left: "-7px" }}
                      />
                      <div 
                        onMouseDown={(e) => handleResizeMouseDown(e, el, "br")}
                        className="absolute w-3.5 h-3.5 bg-white border-2 border-primary rounded-full z-50 cursor-nwse-resize" 
                        style={{ bottom: "-7px", right: "-7px" }}
                      />

                      {/* Side Edges (Middle points) */}
                      <div 
                        onMouseDown={(e) => handleResizeMouseDown(e, el, "l")}
                        className="absolute w-3.5 h-3.5 bg-white border-2 border-primary rounded-full z-50 cursor-ew-resize" 
                        style={{ top: "calc(50% - 7px)", left: "-7px" }}
                      />
                      <div 
                        onMouseDown={(e) => handleResizeMouseDown(e, el, "r")}
                        className="absolute w-3.5 h-3.5 bg-white border-2 border-primary rounded-full z-50 cursor-ew-resize" 
                        style={{ top: "calc(50% - 7px)", right: "-7px" }}
                      />
                      <div 
                        onMouseDown={(e) => handleResizeMouseDown(e, el, "b")}
                        className="absolute w-3.5 h-3.5 bg-white border-2 border-primary rounded-full z-50 cursor-ns-resize" 
                        style={{ bottom: "-7px", left: "calc(50% - 7px)" }}
                      />
                    </>
                  )}

                  {innerNode}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

export default FlyerCreator;
