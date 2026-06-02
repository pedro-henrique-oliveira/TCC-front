"use client";

import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";
import Sidebar from "@/components/navigation";
import TreinoCard, {
  type NivelTreino,
  type StatusTreino,
  NIVEL_CONFIG,
  STATUS_CONFIG,
} from "@/app/treinos/TreinoCard";

interface Exercicio {
  nome: string;
  series: number;
  repeticoes: string;
  descanso: string;
}

interface Treino {
  id: number;
  nome: string;
  descricao: string;
  nivel: NivelTreino;
  status: StatusTreino;
  duracaoMin: number;
  frequenciaSemanal: number;
  totalAlunos: number;
  exercicios: Exercicio[];
}

interface FormTreino {
  nome: string;
  descricao: string;
  nivel: NivelTreino;
  status: StatusTreino;
  duracaoMin: number;
  frequenciaSemanal: number;
}

const mockTreinos: Treino[] = [
  {
    id: 1,
    nome: "Hipertrofia A/B",
    descricao: "Foco em ganho de massa muscular com divisão de grupos musculares.",
    nivel: "avançado",
    status: "ativo",
    duracaoMin: 60,
    frequenciaSemanal: 4,
    totalAlunos: 32,
    exercicios: [
      { nome: "Supino reto", series: 4, repeticoes: "8-12", descanso: "90s" },
      { nome: "Agachamento livre", series: 4, repeticoes: "8-10", descanso: "120s" },
      { nome: "Remada curvada", series: 3, repeticoes: "10-12", descanso: "90s" },
    ],
  },
  {
    id: 2,
    nome: "Cardio Funcional",
    descricao: "Circuito de alta intensidade para condicionamento cardiovascular.",
    nivel: "médio",
    status: "ativo",
    duracaoMin: 45,
    frequenciaSemanal: 3,
    totalAlunos: 21,
    exercicios: [
      { nome: "Burpee", series: 3, repeticoes: "15", descanso: "60s" },
      { nome: "Mountain climber", series: 3, repeticoes: "20", descanso: "45s" },
    ],
  },
  {
    id: 3,
    nome: "Mobilidade & Core",
    descricao: "Exercícios de mobilidade articular e fortalecimento do core.",
    nivel: "iniciante",
    status: "ativo",
    duracaoMin: 30,
    frequenciaSemanal: 5,
    totalAlunos: 18,
    exercicios: [
      { nome: "Prancha", series: 3, repeticoes: "30-60s", descanso: "30s" },
      { nome: "Bird dog", series: 3, repeticoes: "12", descanso: "30s" },
    ],
  },
  {
    id: 4,
    nome: "Powerlifting Base",
    descricao: "Treino de força com foco em agachamento, supino e levantamento terra.",
    nivel: "avançado",
    status: "rascunho",
    duracaoMin: 90,
    frequenciaSemanal: 3,
    totalAlunos: 9,
    exercicios: [
      { nome: "Agachamento", series: 5, repeticoes: "5", descanso: "180s" },
      { nome: "Supino", series: 5, repeticoes: "5", descanso: "180s" },
      { nome: "Terra", series: 3, repeticoes: "3", descanso: "240s" },
    ],
  },
];

const AVATAR_COLORS = [
  "bg-violet-500/20 text-violet-300",
  "bg-sky-500/20 text-sky-300",
  "bg-orange-500/20 text-orange-300",
  "bg-teal-500/20 text-teal-300",
];

interface ModalNovoTreinoProps {
  onClose: () => void;
  onSalvar: (form: FormTreino) => void;
}

function ModalNovoTreino({ onClose, onSalvar }: ModalNovoTreinoProps) {
  const [form, setForm] = useState<FormTreino>({
    nome: "",
    descricao: "",
    nivel: "médio",
    status: "ativo",
    duracaoMin: 60,
    frequenciaSemanal: 3,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="px-6 pt-6 pb-4 border-b border-white/10 flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Novo treino</h2>
            <p className="text-sm text-white/40 mt-0.5">Preencha os dados do plano</p>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white/60 text-2xl">
            ×
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <input
            type="text"
            placeholder="Nome do treino"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20"
          />

          <input
            type="text"
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20"
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <p className="text-xs text-white/30 mb-1.5">Duração (min)</p>
              <input
                type="number"
                value={form.duracaoMin}
                onChange={(e) => setForm({ ...form, duracaoMin: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/30 mb-1.5">Frequência/semana</p>
              <input
                type="number"
                value={form.frequenciaSemanal}
                onChange={(e) => setForm({ ...form, frequenciaSemanal: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          {/* Nível */}
          <div>
            <p className="text-xs text-white/30 mb-1.5">Nível</p>
            <div className="flex gap-2">
              {(["iniciante", "médio", "avançado"] as NivelTreino[]).map((n) => (
                <button
                  key={n}
                  onClick={() => setForm({ ...form, nivel: n })}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    form.nivel === n
                      ? NIVEL_CONFIG[n].classes
                      : "border-white/10 text-white/30"
                  }`}
                >
                  {NIVEL_CONFIG[n].label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs text-white/30 mb-1.5">Status</p>
            <div className="flex gap-2">
              {(["ativo", "rascunho", "inativo"] as StatusTreino[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, status: s })}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${
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
              if (!form.nome.trim()) return;
              onSalvar(form);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white font-semibold"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TreinosPage() {
  const [treinos, setTreinos] = useState<Treino[]>(mockTreinos);
  const [treinoAtivo, setTreinoAtivo] = useState<Treino | null>(mockTreinos[0]!);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<"todos" | StatusTreino>("todos");
  const [busca, setBusca] = useState("");
  const [exercicioEditando, setExercicioEditando] = useState<number | null>(null);
  const [exercicioEditForm, setExercicioEditForm] = useState<Exercicio | null>(null);

  const handleEditarExercicio = (index: number, ex: Exercicio) => {
    setExercicioEditando(index);
    setExercicioEditForm({ ...ex });
  };

  const handleSalvarExercicio = () => {
    if (!treinoAtivo || exercicioEditando === null || !exercicioEditForm) return;
    const novosExercicios = [...treinoAtivo.exercicios];
    novosExercicios[exercicioEditando] = exercicioEditForm;
    const treinoAtualizado = { ...treinoAtivo, exercicios: novosExercicios };
    setTreinos((prev) => prev.map((t) => (t.id === treinoAtivo.id ? treinoAtualizado : t)));
    setTreinoAtivo(treinoAtualizado);
    setExercicioEditando(null);
    setExercicioEditForm(null);
  };

  const handleCancelarEdicao = () => {
    setExercicioEditando(null);
    setExercicioEditForm(null);
  };

  const treinosFiltrados = treinos.filter((t) =>
    t.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const exerciciosFiltrados = treinoAtivo
    ? filtroStatus === "todos"
      ? treinoAtivo.exercicios
      : treinoAtivo.status === filtroStatus
      ? treinoAtivo.exercicios
      : []
    : [];

  const handleSalvar = (form: FormTreino) => {
    const novo: Treino = {
      id: Date.now(),
      nome: form.nome,
      descricao: form.descricao,
      nivel: form.nivel,
      status: form.status,
      duracaoMin: form.duracaoMin,
      frequenciaSemanal: form.frequenciaSemanal,
      totalAlunos: 0,
      exercicios: [],
    };
    setTreinos((prev) => [...prev, novo]);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <div className="flex">
        <Sidebar />

        {/* Lista lateral de treinos */}
        <div>
          <div className="px-6 py-5">
            <input
              type="text"
              placeholder="Buscar treino..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20"
            />

            {treinosFiltrados.map((treino, i) => (
              <button
                key={treino.id}
                onClick={() => setTreinoAtivo(treino)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors rounded-xl mt-1 ${
                  treinoAtivo?.id === treino.id ? "bg-white/5" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    AVATAR_COLORS[i % 4]
                  }`}
                >
                  {treino.nome.slice(0, 2).toUpperCase()}
                </div>

                <div className="text-left">
                  <p className="text-sm font-medium text-white">{treino.nome}</p>
                  <p className="text-xs text-white/40">{treino.duracaoMin} min</p>
                  <span className="text-[10px] text-violet-300 mt-1 block">
                    {NIVEL_CONFIG[treino.nivel].label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1 p-6">
          {treinoAtivo && (
            <div className="bg-[#13131f] border border-white/10 rounded-2xl p-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{treinoAtivo.nome}</h2>
                  <p className="text-white/40 mt-1">{treinoAtivo.descricao}</p>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-xl">
                  <p className="text-xs text-violet-300 uppercase">Nível</p>
                  <p className="font-bold text-violet-200">
                    {NIVEL_CONFIG[treinoAtivo.nivel].label}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setModalAberto(true)}
            className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-xl mb-6 text-sm font-semibold transition-colors"
          >
            Novo treino
          </button>

          {/* Filtros */}
          <div className="flex gap-3 mb-4">
            {(["todos", "ativo", "rascunho", "inativo"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltroStatus(f)}
                className={`
                  px-4 py-2 rounded-xl border text-sm font-semibold
                  transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg
                  ${
                    filtroStatus === f
                      ? f === "ativo"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20"
                        : f === "rascunho"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20"
                        : f === "inativo"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/20"
                        : "bg-violet-500/20 text-violet-300 border-violet-500/40 shadow-violet-500/20"
                      : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                  }
                `}
              >
                {f === "todos" ? "Todos" : STATUS_CONFIG[f as StatusTreino].label}
              </button>
            ))}
          </div>

          {/* Lista de exercícios do treino ativo */}
          {treinoAtivo && (
            <div className="space-y-3">
              {exerciciosFiltrados.length > 0 ? (
                exerciciosFiltrados.map((ex, i) => {
                  const isEditing = exercicioEditando === i;
                  return isEditing && exercicioEditForm ? (
                    <div
                      key={i}
                      className="bg-[#13131f] border border-violet-500/40 rounded-2xl p-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="text"
                          value={exercicioEditForm.nome}
                          onChange={(e) =>
                            setExercicioEditForm({ ...exercicioEditForm, nome: e.target.value })
                          }
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-semibold placeholder:text-white/20"
                          placeholder="Nome do exercício"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <p className="text-[10px] text-white/30 mb-1">Séries</p>
                          <input
                            type="number"
                            value={exercicioEditForm.series}
                            onChange={(e) =>
                              setExercicioEditForm({
                                ...exercicioEditForm,
                                series: Number(e.target.value),
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-white/30 mb-1">Repetições</p>
                          <input
                            type="text"
                            value={exercicioEditForm.repeticoes}
                            onChange={(e) =>
                              setExercicioEditForm({
                                ...exercicioEditForm,
                                repeticoes: e.target.value,
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-white/30 mb-1">Descanso</p>
                          <input
                            type="text"
                            value={exercicioEditForm.descanso}
                            onChange={(e) =>
                              setExercicioEditForm({
                                ...exercicioEditForm,
                                descanso: e.target.value,
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                          />
                        </div>
                        <div className="flex gap-1.5 pt-5">
                          <button
                            onClick={handleSalvarExercicio}
                            className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={handleCancelarEdicao}
                            className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/10 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="bg-[#13131f] border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:border-white/20 transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{ex.nome}</p>
                        <p className="text-sm text-white/40 mt-0.5">
                          {ex.series} séries · {ex.repeticoes} reps · descanso {ex.descanso}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-white">{ex.series}x</p>
                          <p className="text-xs text-white/30">{ex.repeticoes} reps</p>
                        </div>
                        <button
                          onClick={() => handleEditarExercicio(i, ex)}
                          className="w-8 h-8 rounded-xl bg-white/0 border border-white/0 flex items-center justify-center text-white/20 hover:bg-violet-500/10 hover:border-violet-500/20 hover:text-violet-300 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Pencil size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-white/20 text-sm">
                  Nenhum exercício encontrado para este filtro.
                </p>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Grid de todos os treinos */}
      <div className="px-6 pb-10 ml-[220px]">
        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
          Todos os treinos
        </h3>
        <div className="space-y-3">
          {treinos.map((t) => (
            <TreinoCard
              key={t.id}
              nome={t.nome}
              descricao={t.descricao}
              nivel={t.nivel}
              status={t.status}
              duracaoMin={t.duracaoMin}
              frequenciaSemanal={t.frequenciaSemanal}
              totalAlunos={t.totalAlunos}
              onVerDetalhes={() => setTreinoAtivo(t)}
            />
          ))}
        </div>
      </div>

      {modalAberto && (
        <ModalNovoTreino
          onClose={() => setModalAberto(false)}
          onSalvar={handleSalvar}
        />
      )}
    </div>
  );
}