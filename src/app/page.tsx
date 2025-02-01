"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useState } from "react";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailError, setEmailError] = useState(""); // State for email error message

  const handleSend = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!fullName || !email) return;

      // Validate email format before proceeding
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isEmailValid) {
        setEmailError("Por favor, ingresa un correo electrónico válido.");
        return; // Don't proceed if email is not valid
      } else {
        setEmailError(""); // Clear error if email is valid
      }

      try {
        const response = await fetch("https://interesados-landing-server.onrender.com/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name: fullName }),
        });

        const data = await response.json();

        if (response.status === 409) {
          setEmailExists(true);
        } else if (response.ok) {
          setEmailExists(false);
        } else {
          console.error("Error:", data.error || "Unexpected error");
          return;
        }

        setIsRegistered(true);
      } catch (error) {
        console.error("Request failed:", error);
      }
    },
    [fullName, email]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 bg-white text-black font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 items-center text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-red-600">¡Deliverty llegará pronto!</h1>

        {isRegistered ? (
          <div className="flex flex-col items-center gap-4">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
            {emailExists ? (
              <p className="text-lg sm:text-xl text-black max-w-md">
                ¡Ya tenemos tus datos, <span className="font-bold">{fullName}</span>! Cuando tengamos más información (muy pronto), te avisaremos.
              </p>
            ) : (
              <p className="text-lg sm:text-xl text-black max-w-md">
                ¡Registro exitoso, <span className="font-bold">{fullName}</span>! Cuando haya más información, te enviaremos un correo avisándote.
              </p>
            )}
          </div>
        ) : (
          <>
            <p className="text-lg sm:text-xl max-w-md text-black">
              Mantente atento a una experiencia de entrega revolucionaria. ¡Regístrate para recibir notificaciones cuando lancemos!
            </p>

            <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSend}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  className="border border-black focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-md px-4 py-3 text-base sm:text-lg w-64 text-black placeholder-gray-600 outline-none"
                  placeholder="Nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="border border-black focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-md px-4 py-3 text-base sm:text-lg w-64 text-black placeholder-gray-600 outline-none"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(""); // Clear error when the user modifies the email
                  }}
                  required
                />
              </div>
              {emailError && (
                <p className="text-red-600 text-sm mt-2">{emailError}</p> // Display error message if email is invalid
              )}
              <button
                type="submit"
                className="rounded-md bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 hover:bg-red-700 text-lg font-semibold"
              >
                Notificarme!
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
