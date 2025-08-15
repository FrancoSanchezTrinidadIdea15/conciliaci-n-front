"use client";

import { DollarSign, ShieldAlert, CreditCard, FileText, Copy, Check, History as HistoryIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

type Role = "user" | "assistant";
interface ChatMsg {
  role: Role;
  content: string;
}

interface Session {
  id: string;
  title: string;
  ts: number;
  preview: string;
  data: ChatMsg[];
}

export default function ChatbotPage() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMsg[]>([]); // sin saludo inicial
  const [started, setStarted] = useState(false); // controla Quick Actions vs Chat
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Cargar sesiones desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cfdi_chat_history_sessions");
      if (raw) setSessions(JSON.parse(raw));
    } catch {}
  }, []);

  // Guardar sesiones en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cfdi_chat_history_sessions", JSON.stringify(sessions));
    } catch {}
  }, [sessions]);

  const quickActions = [
    { title: "Ingresos del mes", desc: "¿Cuántos son mis ingresos del mes?", icon: DollarSign },
    { title: "Lista negra del SAT", desc: "¿Tengo algun RFC en lista negra?", icon: ShieldAlert },
    { title: "IVA por pagar", desc: "Pagos y UUID", icon: CreditCard },
    { title: "Top clientes", desc: "¿Quiénes son mis principales clientes?", icon: FileText },
  ];

  const pastel = [
    { bgIcon: "bg-rose-100", icon: "text-rose-700", glow: "hover:ring-rose-200" },
    { bgIcon: "bg-sky-100", icon: "text-sky-700", glow: "hover:ring-sky-200" },
    { bgIcon: "bg-emerald-100", icon: "text-emerald-700", glow: "hover:ring-emerald-200" },
    { bgIcon: "bg-violet-100", icon: "text-violet-700", glow: "hover:ring-violet-200" },
  ];

  // Auto-scroll al final cada vez que haya nuevos mensajes o cuando inicie el chat
  useEffect(() => {
    if (!started) return;
    const scroll = () => {
      if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      // Fallback: también desplazamos la ventana por si hay contenedores padres
      window.requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
    };
    scroll();
  }, [chatHistory.length, started]);

  const handleQuickAction = (action: string) => {
    setStarted(true);
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: action },
      { role: "assistant", content: `Entiendo que quieres consultar sobre: ${action}. Te ayudo con eso...` },
    ]);
  };

  const handleSendMessage = () => {
    const text = message.trim();
    if (!text) return;
    setStarted(true);
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "Gracias por tu pregunta. Estoy procesando tu consulta sobre CFDIs..." },
    ]);
    setMessage("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch {}
  };

  const saveSession = () => {
    if (chatHistory.length === 0) return;
    const firstUser = chatHistory.find((m) => m.role === "user");
    const title = firstUser?.content?.slice(0, 50) || "Conversación sin título";
    const preview = chatHistory[chatHistory.length - 1]?.content?.slice(0, 80) || "";
    const session: Session = {
      id: `${Date.now()}`,
      title,
      ts: Date.now(),
      preview,
      data: chatHistory,
    };
    setSessions((prev) => [session, ...prev].slice(0, 50)); // límite 50
  };

  const loadSession = (s: Session) => {
    setChatHistory(s.data);
    setStarted(true);
    setShowHistory(false);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 0);
  };

  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 w-full b backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-base font-semibold text-slate-900">Asistente CFDI</h1>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHistory(true)}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                title="Historial"
              >
                <HistoryIcon className="h-3.5 w-3.5" /> Historial
              </button>
              {started && (
                <button
                  type="button"
                  onClick={() => {
                    saveSession();
                    setStarted(false);
                    setChatHistory([]);
                  }}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  title="Nueva consulta"
                >
                  Nueva consulta
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* QUICK ACTIONS (solo al inicio, sin saludo) */}
      {!started && (
        <section className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-10 sm:px-6 lg:pt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">¿En qué puedo ayudarte con tus CFDIs?</h2>
            <p className="mt-2 text-sm text-slate-600">Explora una de estas acciones rápidas o escribe tu propia pregunta abajo.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map(({ title, desc, icon: Icon }, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickAction(title)}
                className={`group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 text-left shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:shadow-md ${pastel[i % pastel.length].glow}`}
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${pastel[i % pastel.length].bgIcon} ${pastel[i % pastel.length].icon} shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-slate-900">{title}</div>
                <div className="mt-1 text-xs text-slate-600">{desc}</div>
              </button>
            ))}
          </div>

          {/* Composer visible también en inicio */}
          <div className="mx-auto mt-10 max-w-3xl">
            <Composer
              value={message}
              onChange={setMessage}
              onSend={handleSendMessage}
              onKeyDown={handleKeyDown}
            />
          </div>
        </section>
      )}

      {/* CHAT (pantalla completa, sin scroll interno) */}
      {started && (
        <section className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6">
          <div className="space-y-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`group relative rounded-2xl px-4 py-2 text-sm shadow-sm md:text-[15px] ${
                    chat.role === "user"
                      ? "bg-blue-600 text-white md:max-w-[75%]"
                      : "bg-white text-slate-800 ring-1 ring-slate-200 md:max-w-[75%]"
                  }`}
                >
                  {chat.content}
                  {chat.role === "assistant" && (
                    <button
                      onClick={() => handleCopy(chat.content, index)}
                      className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 opacity-0 shadow-sm transition-opacity hover:bg-slate-50 group-hover:opacity-100"
                      title="Copiar"
                      aria-label="Copiar"
                    >
                      {copiedIndex === index ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </section>
      )}

      {/* Composer fijado abajo (sticky) cuando hay chat */}
      {started && (
        <div className="sticky bottom-0 z-40 w-full">
          <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
            <Composer value={message} onChange={setMessage} onSend={handleSendMessage} onKeyDown={handleKeyDown} />
          </div>
        </div>
      )}

      {/* Drawer de Historial (derecha) */}
      <HistoryDrawer
        open={showHistory}
        onClose={() => setShowHistory(false)}
        sessions={sessions}
        onDelete={deleteSession}
        onLoad={loadSession}
      />
    </div>
  );
}

// --- Subcomponente: Composer ---
function Composer({
  value,
  onChange,
  onSend,
  onKeyDown,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pregúntame sobre tus CFDIs..."
        className="min-h-[44px] max-h-[180px] flex-1 resize-none border-none px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:ring-0"
        rows={1}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = Math.min(target.scrollHeight, 180) + "px";
        }}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        onClick={onSend}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700"
        aria-label="Enviar"
        title="Enviar"
      >
        <FaArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}

// --- Subcomponente: History Drawer ---
function HistoryDrawer({
  open,
  onClose,
  sessions,
  onLoad,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  sessions: Session[];
  onLoad: (s: Session) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 will-change-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-900">Historial</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Cerrar">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex h-[calc(100%-52px)] flex-col overflow-hidden">
          {sessions.length === 0 ? (
            <div className="grid flex-1 place-items-center p-6 text-center text-sm text-slate-500">
              No hay conversaciones guardadas todavía.
            </div>
          ) : (
            <ul className="flex-1 space-y-2 overflow-y-auto p-4">
              {sessions.map((s) => (
                <li key={s.id} className="rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
                  <div className="mb-1 line-clamp-1 text-sm font-medium text-slate-900">{s.title}</div>
                  <div className="line-clamp-2 text-xs text-slate-600">{s.preview}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => onLoad(s)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Abrir
                    </button>
                    <button
                      onClick={() => onDelete(s.id)}
                      className="rounded-full border border-rose-200 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
                    >
                      Eliminar
                    </button>
                    <div className="ml-auto text-xs text-slate-500">{new Date(s.ts).toLocaleString()}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
