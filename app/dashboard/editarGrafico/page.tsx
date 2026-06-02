import Sidebar from "../../../components/navigation";

export default function EditarGraficoPage() {
  return (
    <div className="flex w-screen h-screen bg-zinc-950">
      <Sidebar/>
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Editar Gráfico
        </h1>
        <p className="text-white">
            Aqui você pode editar as configurações do gráfico, como os dados exibidos, cores e estilos.
        </p>
      </main>
    </div>
  );
}