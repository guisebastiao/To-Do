import { useNavigate } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";

export const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContextAuth();

  const goToPage = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="w-full h-full flex-col md:flex-row">
      <div>
        <img
          src="/not-found.png"
          alt="img-not-found"
          className="max-w-80 w-full"
        />
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl text-zinc-800 dark:text-zinc-300 m-3 font-bold text-center">
          Página Não Encontrada!
        </h1>
        <p className="text-sm text-zinc-700 dark:text-zinc-400 text-center font-medium max-w-sm px-4">
          Tem certeza de que a URL do site está correta? Procuramos esta página
          em todos os lugares e não encontramos.
        </p>
        <Button
          className="m-6 bg-blue-500 hover:bg-blue-600"
          onClick={goToPage}
        >
          <span>Voltar Para o Inicio</span>
        </Button>
      </div>
    </section>
  );
};
