"use client";

import { useState } from "react";
import Sidebar from "@/components/navigation";

interface Mensalidade {
  id: number;
  mes: string;
  vencimento: string;
  valor: number;
  status: "pago" | "pendente" | "atrasado";
  pagamento: string | null;
}

interface Aluno {
  id: number;
  nome: string;
  modalidade: string;
  plano: string;
  avatar: string;
  mensalidades: Mensalidade[];
}

interface FormMensalidade {
  mes: string;
  valor: number;
  vencimento: string;
  status: "pago" | "pendente" | "atrasado";
}

const mockAlunos: Aluno[] = [
  {
    id: 1,
    nome: "Lucas Ferreira",
    modalidade: "Musculação",
    plano: "Plano Premium",
    avatar: "LF",
    mensalidades: [
      {
        id: 1,
        mes: "Maio 2025",
        vencimento: "2025-05-10",
        valor: 120,
        status: "pago",
        pagamento: "2025-05-08",
      },
      {
        id: 2,
        mes: "Junho 2025",
        vencimento: "2025-06-10",
        valor: 120,
        status: "pago",
        pagamento: "2025-06-07",
      },
      {
        id: 3,
        mes: "Julho 2025",
        vencimento: "2025-07-10",
        valor: 120,
        status: "pendente",
        pagamento: null,
      },
    ],
  },

  {
    id: 2,
    nome: "Ana Paula",
    modalidade: "Pilates",
    plano: "Plano Gold",
    avatar: "AP",
    mensalidades: [
      {
        id: 4,
        mes: "Julho 2025",
        vencimento: "2025-07-15",
        valor: 180,
        status: "atrasado",
        pagamento: null,
      },
    ],
  },

  {
    id: 3,
    nome: "Rafael Souza",
    modalidade: "Crossfit",
    plano: "Plano Black",
    avatar: "RS",
    mensalidades: [
      {
        id: 5,
        mes: "Julho 2025",
        vencimento: "2025-07-20",
        valor: 220,
        status: "pendente",
        pagamento: null,
      },
    ],
  },
];

const STATUS_CONFIG = {
  pago: {
    label: "Pago",
    classes:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },

  pendente: {
    label: "Pendente",
    classes:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },

  atrasado: {
    label: "Atrasado",
    classes:
      "bg-rose-500/10 text-rose-400 border-rose-500/20",
    dot: "bg-rose-400",
  },
};

const AVATAR_COLORS = [
  "bg-violet-500/20 text-violet-300",
  "bg-sky-500/20 text-sky-300",
  "bg-orange-500/20 text-orange-300",
  "bg-teal-500/20 text-teal-300",
];

function StatusBadge({
  status,
}: {
  status: "pago" | "pendente" | "atrasado";
}) {
  const cfg = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.classes}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}
      />

      {cfg.label}
    </span>
  );
}

interface ModalProps {
  aluno: Aluno;
  onClose: () => void;
  onSalvar: (
    alunoId: number,
    form: FormMensalidade
  ) => void;
}

function ModalRegistrar({
  aluno,
  onClose,
  onSalvar,
}: ModalProps) {
  const meses = [
    "Janeiro 2025",
    "Fevereiro 2025",
    "Março 2025",
    "Abril 2025",
    "Maio 2025",
    "Junho 2025",
    "Julho 2025",
    "Agosto 2025",
  ];

  const [form, setForm] =
    useState<FormMensalidade>({
      mes: meses[6]!,
      valor: aluno.mensalidades[0]?.valor || 120,
      vencimento: "2025-07-10",
      status: "pago",
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="px-6 pt-6 pb-4 border-b border-white/10 flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-white">
              Registrar mensalidade
            </h2>

            <p className="text-sm text-white/40 mt-0.5">
              {aluno.nome}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white/20 hover:text-white/60 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <select
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white"
            value={form.mes}
            onChange={(e) =>
              setForm({
                ...form,
                mes: e.target.value,
              })
            }
          >
            {meses.map((m) => (
              <option
                key={m}
                value={m}
                className="bg-[#1a1a2e]"
              >
                {m}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={form.valor}
            onChange={(e) =>
              setForm({
                ...form,
                valor: Number(e.target.value),
              })
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white"
          />

          <input
            type="date"
            value={form.vencimento}
            onChange={(e) =>
              setForm({
                ...form,
                vencimento: e.target.value,
              })
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white"
          />

          <div className="flex gap-2">
            {(
              [
                "pago",
                "pendente",
                "atrasado",
              ] as const
            ).map((s) => (
              <button
                key={s}
                onClick={() =>
                  setForm({
                    ...form,
                    status: s,
                  })
                }
                className={`flex-1 py-2 rounded-xl text-sm font-semibold border ${
                  form.status === s
                    ? STATUS_CONFIG[s].classes
                    : "border-white/10 text-white/30"
                }`}
              >
                {STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/40"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              onSalvar(aluno.id, form);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Mensalidades() {
  const [alunos, setAlunos] =
    useState<Aluno[]>(mockAlunos);

  const [alunoAtivo, setAlunoAtivo] =
    useState<Aluno | null>(mockAlunos[0]!);

  const [modalAberto, setModalAberto] =
    useState(false);

  const [filtroStatus, setFiltroStatus] =
    useState<
      "todos" | "pago" | "pendente" | "atrasado"
    >("todos");

  const [busca, setBusca] = useState("");

  const alunosFiltrados = alunos.filter((a) =>
    a.nome
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  const mensalidadesFiltradas = alunoAtivo
    ? filtroStatus === "todos"
      ? alunoAtivo.mensalidades
      : alunoAtivo.mensalidades.filter(
          (m) => m.status === filtroStatus
        )
    : [];

  const handleSalvar = (
    alunoId: number,
    form: FormMensalidade
  ) => {
    setAlunos((prev) =>
      prev.map((a) => {
        if (a.id !== alunoId) return a;

        const nova: Mensalidade = {
          id: Date.now(),
          mes: form.mes,
          vencimento: form.vencimento,
          valor: Number(form.valor),
          status: form.status,
          pagamento:
            form.status === "pago"
              ? new Date()
                  .toISOString()
                  .split("T")[0]!
              : null,
        };

        return {
          ...a,
          mensalidades: [
            ...a.mensalidades,
            nova,
          ],
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      
      <div className="flex">
            <Sidebar />
          <div>
            <div className="px-6 py-5 ">
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2"
            />
          {alunosFiltrados.map((aluno, i) => (
            
            
            <button
              key={aluno.id}
              onClick={() =>
                setAlunoAtivo(aluno)
              }
              className="w-full flex  items-center gap-3 px-4 py-3 hover:bg-white/5"
            >
                
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  AVATAR_COLORS[i % 4]
                }`}
              >
                {aluno.avatar}
              </div>

              <div className="text-left">
                <p>{aluno.nome}</p>

                <p className="text-xs text-white/40">
                  {aluno.modalidade}
                </p>

                <span className="text-[10px] text-violet-300 mt-1 block">
                  {aluno.plano}
                </span>
              </div>
            </button>
          ))}
          </div>
            </div>


        <main className="flex-1 p-6">
          {alunoAtivo && (
            <div className="bg-[#13131f] border border-white/10 rounded-2xl p-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {alunoAtivo.nome}
                  </h2>

                  <p className="text-white/40 mt-1">
                    {alunoAtivo.modalidade}
                  </p>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-xl">
                  <p className="text-xs text-violet-300 uppercase">
                    Plano
                  </p>

                  <p className="font-bold text-violet-200">
                    {alunoAtivo.plano}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() =>
              setModalAberto(true)
            }
            className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-xl mb-6"
          >
            Nova mensalidade
          </button>

          <div className="flex gap-3 mb-4">
  {(
    [
      "todos",
      "pago",
      "pendente",
      "atrasado",
    ] as const
  ).map((f) => (
    <button
      key={f}
      onClick={() =>
        setFiltroStatus(f)
      }
      className={`
        px-4 py-2 rounded-xl border text-sm font-semibold
        transition-all duration-300 ease-in-out

        hover:scale-105
        hover:shadow-lg

        ${
          filtroStatus === f
            ? f === "pago"
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20"
              : f === "pendente"
              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20"
              : f === "atrasado"
              ? "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/20"
              : "bg-violet-500/20 text-violet-300 border-violet-500/40 shadow-violet-500/20"
            : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
        }
      `}
    >
      {f === "todos"
        ? "Todos"
        : f === "pago"
        ? "Pago"
        : f === "pendente"
        ? "Pendente"
        : "Atrasado"}
    </button>
  ))}
</div>

          <div className="space-y-3">
            {mensalidadesFiltradas.map((m) => (
              <div
                key={m.id}
                className="bg-[#13131f] border border-white/10 rounded-2xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {m.mes}
                  </p>

                  <p className="text-sm text-white/40">
                    Vencimento:{" "}
                    {new Date(
                      m.vencimento +
                        "T00:00:00"
                    ).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold">
                    R$ {m.valor}
                  </p>

                  <StatusBadge
                    status={m.status}
                  />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {modalAberto && alunoAtivo && (
        <ModalRegistrar
          aluno={alunoAtivo}
          onClose={() =>
            setModalAberto(false)
          }
          onSalvar={handleSalvar}
        />
      )}
    </div>
  );
}