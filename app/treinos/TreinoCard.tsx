import { Clock, Flame, CalendarSync, Users, ArrowRight, Dumbbell } from "lucide-react";

export type NivelTreino = "iniciante" | "médio" | "avançado";
export type StatusTreino = "ativo" | "inativo" | "rascunho";

export interface TreinoCardProps {
  nome: string;
  descricao: string;
  nivel: NivelTreino;
  status: StatusTreino;
  duracaoMin: number;
  frequenciaSemanal: number;
  totalAlunos: number;
  onVerDetalhes?: () => void;
}

export const NIVEL_CONFIG: Record<NivelTreino, { label: string; classes: string }> = {
  iniciante: {
    label: "Iniciante",
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  médio: {
    label: "Médio",
    classes: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  avançado: {
    label: "Avançado",
    classes: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
};

export const STATUS_CONFIG: Record<StatusTreino, { label: string; classes: string; dot: string }> = {
  ativo: {
    label: "Ativo",
    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  inativo: {
    label: "Inativo",
    classes: "bg-white/5 text-white/40 border-white/10",
    dot: "bg-white/30",
  },
  rascunho: {
    label: "Rascunho",
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
};

export function StatusBadge({ status }: { status: StatusTreino }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function TreinoCard({
  nome,
  descricao,
  nivel,
  status,
  duracaoMin,
  frequenciaSemanal,
  totalAlunos,
  onVerDetalhes,
}: TreinoCardProps) {
  const nivelCfg = NIVEL_CONFIG[nivel];

  return (
    <div className="bg-[#13131f] border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:border-white/20 transition-colors">
      <div className="flex items-center gap-4">
        {/* Ícone */}
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
          <Dumbbell size={18} className="text-violet-300" />
        </div>

        {/* Info principal */}
        <div>
          <p className="font-semibold text-white">{nome}</p>
          <p className="text-sm text-white/40 mt-0.5 line-clamp-1">{descricao}</p>

          {/* Metadados */}
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-xs text-white/30">
              <Clock size={11} />
              {duracaoMin} min
            </span>
            <span className="flex items-center gap-1 text-xs text-white/30">
              <CalendarSync size={11} />
              {frequenciaSemanal}x/sem
            </span>
            <span className="flex items-center gap-1 text-xs text-white/30">
              <Users size={11} />
              {totalAlunos} alunos
            </span>
          </div>
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex items-center gap-3 shrink-0">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${nivelCfg.classes}`}
        >
          <Flame size={10} />
          {nivelCfg.label}
        </span>

        <StatusBadge status={status} />

        <button
          onClick={onVerDetalhes}
          className="text-white/20 hover:text-white/60 transition-colors"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}