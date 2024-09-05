export const Header = () => {
  return (
    <header className="flex w-full flex-col items-center justify-center gap-4 rounded-md bg-slate-900 py-4 text-slate-200 md:w-56 md:gap-20">
      <h1 className="text-center text-xl font-bold">Seja bem vindo</h1>
      <div className="flex items-center gap-2 text-center text-2xl font-bold md:flex-col">
        <p>Desafio</p>
        <p>Front-end</p>
        <p>Procimo</p>
      </div>
      <div>
        <p>Autor: Patrick Lima</p>
      </div>
      <nav className="text-center">
        <ul>
          <li>
            <a href="">Github @patricklimax</a>
          </li>
          <li>
            <a href="">Github @projeto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
