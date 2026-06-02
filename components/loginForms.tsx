"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    onSend: (email: string, password: string) => Promise<void | string>;
}

export default function LoginForm({ onSend }: Props) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit() {
        const response = await onSend(email, password);
        if (response) {
            alert(response);
            return;
        }
        router.push("/dashboard");
    }

    
    return (
        <div className="min-h-screen flex items-center justify-center">

          
            <div className="bg-blue-500/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 flex flex-col gap-6 w-full max-w-sm shadow-2xl">

                <div className="flex flex-col gap-1">
                    <h1 className="text-white text-3xl text-center tracking-tight font-mono">
                        Bem-vindo ao <span className="text-red-500">Gym</span><span className="text-blue-500">Flow</span>
                    </h1>
                    <p className="text-gray-500 text-sm text-center">
                        Faça login para continuar
                    </p>
                </div>

               
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                            E-mail
                        </label>
                        <input
                            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                            Senha
                        </label>
                       
                        <div className="relative">
                            <input
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-11 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition text-xs"
                            >
                                {showPassword ? "ocultar" : "ver"}
                            </button>
                        </div>
                    </div>

                </div>

              
                <div className="flex justify-end -mt-3">
                    <a href="#" className="text-xs text-red-400 hover:text-red-300 transition">
                        Esqueceu a senha?
                    </a>
                </div>

              
                <button
                    onClick={handleSubmit}
                    className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-medium py-3 rounded-lg transition cursor-pointer w-full"
                >
                    Entrar
                </button>

            </div>
        </div>
    );
}