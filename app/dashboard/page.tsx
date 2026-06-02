"use client"

import Sidebar from "../../components/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Link from "next/link";

function Grafico() {
  const data = [
    { name: "Jan", Alunos: 400 },
    { name: "Fev", Alunos: 300 },
    { name: "Mar", Alunos: 500 },
    { name: "Abr", Alunos: 200 },
    { name: "Mai", Alunos: 350 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={false}/>
        <Bar type="monotone" dataKey="Alunos" stroke="#8884d8" fill="#3b82f6" activeBar={{ fill: "#6c63ff", stroke: "#4a00e0", strokeWidth: 2 }}/>
      </BarChart>
    </ResponsiveContainer>
    
  );
}

export default function DashboardPage() {
  

  return (
    <div className="flex w-screen h-screen bg-zinc-950">
      
      <Sidebar/>
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-zinc-400">
              Alunos
            </h2>

            <p className="text-4xl text-white font-bold mt-2">
              --
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-zinc-400">
              Treinos
            </h2>

            <p className="text-4xl text-white font-bold mt-2">
              --
            </p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-zinc-400">
              Mensalidades Pendentes
            </h2>

            <p className="text-4xl text-white font-bold mt-2">
              --
            </p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-zinc-400">
              Check-ins do dia
            </h2>

            <p className="text-4xl text-white font-bold mt-2">
              --
            </p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl col-span-3">
            <Grafico />
            <Link href="/dashboard/editarGrafico" className="text-white font-mono py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 mt-4">
              Editar Gráfico
            </Link>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-zinc-400">Alunos Recentes</h2>
            <p className="text-4xl text-white font-bold mt-2">
              -- <br />
            
            </p>
            <h2 className="text-zinc-400">pagamentos</h2>
            <p className="text-4xl text-white font-bold mt-2">
              -- <br />
              
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
