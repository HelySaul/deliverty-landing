"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">

        <h1 className="text-3xl sm:text-5xl font-bold">¡Deliverty llegará pronto!</h1>
        <p className="text-lg sm:text-xl max-w-md">Mantente atento a una experiencia de entrega revolucionaria. ¡Regístrate para recibir notificaciones cuando lancemos!</p>
        
        <form className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className="border border-black/[.08] dark:border-white/[.145] rounded px-4 py-2 text-sm sm:text-base w-full sm:w-64"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background px-4 sm:px-5 py-2 sm:py-3 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base"
          >
            Notificarme
          </button>
        </form>
      </main>
    </div>
  );
}
