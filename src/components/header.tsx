import { BookMarkedIcon, Github } from 'lucide-react';

export const Header = () => {
  return (
    <header className="md flex w-full flex-col items-center justify-between gap-4 bg-slate-900 px-8 py-4 text-slate-200 h-auto md:h-12 md:flex-row md:gap-0 md:py-0">
      <h1 className="text-xl font-bold">Bem vindo, meu amigo!</h1>
      <p className="text-xl font-bold">Desafio Front-end Procimo</p>
      <nav>
        <ul className="flex flex-col items-center gap-4 md:flex-row">
          <li>
            <a href="https://patricklimax.vercel.app/">Autor: Patrick Lima</a>
          </li>
          <li>
            <a
              href="https://github.com/patricklimax"
              className="flex items-center justify-center gap-1 text-sm"
            >
              <span>
                <Github size={16} />
              </span>
              <span className="uppercase">meu github</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/patricklimax/challenge-frontend-procimo"
              className="flex items-center justify-center gap-1 text-sm"
            >
              <Github size={16} />
              <span className="uppercase">Repo Projeto</span>
            </a>
          </li>
          <li>
            <a
              href="#userManual"
              className="flex items-center justify-center gap-1 text-sm"
            >
              <BookMarkedIcon size={16} />
              <span className="uppercase">Dicas de Uso</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
