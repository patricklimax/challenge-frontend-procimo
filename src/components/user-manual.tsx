import { CheckIcon, ChevronsRightIcon } from 'lucide-react';
import IconNetwork from '../assets/network-pinner.png';
import IconStation from '../assets/bike.svg';

export const UserManual = () => {
  return (
    <div id="userManual" className="mx-auto mt-52 w-full px-4 md:mt-0 md:max-w-5xl">
      <h2 className="py-4 text-center text-3xl font-bold">Manual do Usuário</h2>
      <div className="flex flex-col gap-2">
        <p className="border-l-2 border-emerald-600 px-2 py-1">
          O projeto é uma aplicação web desenvolvida com ReactJS e TypeScript para
          visualizar dados geolocalizados de redes de bicicletas a partir da API
          CityBikes.
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <p className="mt-4 border-l-2 border-emerald-600 px-2 py-1 font-semibold">
          As principais funcionalidades incluem:
        </p>
        <ul className="flex flex-col gap-4 px-4">
          <li className="flex items-center gap-2">
            <div className="h-full w-10">
              <CheckIcon />
            </div>
            <p>
              Exibição de dados em um mapa interativo com camadas detalhadas (redes,
              estações e detalhes das estações).
            </p>
          </li>
          <li className="flex items-center gap-2">
            <div className="h-full w-10">
              <CheckIcon />
            </div>
            <p> Sistema de busca para redes e estações.</p>
          </li>
          <li className="flex items-center gap-2">
            <div className="h-full w-10">
              <CheckIcon />
            </div>
            <p>
              Modais e tooltips que exibem informações detalhadas ao clicar em redes
              ou estações.
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <p className="mt-4 border-l-2 border-emerald-600 px-2 py-1 font-semibold">
          Dentro do projeto, precisamos entender dois conceitos:
        </p>
        <ul className="flex flex-col gap-4 px-4">
          <li className="flex items-center gap-4">
            <div className="flex w-20 flex-col items-center justify-start">
              <img src={IconNetwork} alt="" className="h-6 w-6" />
              <p className="font-bold uppercase">Rede</p>
            </div>
            <p className="flex-1">
              Refere-se ao conjunto de estações de bicicletas públicas disponíveis em
              uma cidade ou região. Uma rede pode incluir várias estações para
              facilitar o uso de bicicletas compartilhadas.
            </p>
          </li>
          <li className="flex items-center gap-4 py-1">
            <div className="flex w-20 flex-col items-center justify-start">
              <img src={IconStation} alt="" className="h-6 w-6" />
              <p className="font-bold uppercase">Estação</p>
            </div>
            <p className="flex-1">
              É um ponto físico dentro de uma rede onde as bicicletas são
              disponibilizadas para os usuários. As estações são locais de retirada e
              devolução das bicicletas.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <p className="mt-4 border-l-2 border-emerald-600 px-2 py-1 font-semibold">
          Entendendo melhor as funcionalidades:
        </p>
        <ul className="flex flex-col gap-2 px-4">
          <li className="flex items-center gap-1 py-1">
            <div className="h-full w-10">
              <ChevronsRightIcon />
            </div>
            <p className="flex-1">
              Ao iniciar a aplicação, é renderizado as redes espalhadas pelo mundo.
            </p>
          </li>
          <li className="flex items-center gap-1 py-1">
            <div className="h-full w-10">
              <ChevronsRightIcon />
            </div>
            <p className="flex-1">
              Ao passar o mouse por uma rede, é exibido o nome da rede, e o país ao
              qual ela perterce;
            </p>
          </li>
          <li className="py-1">
            <div className="flex items-center gap-1">
              <div className="h-full w-10">
                <ChevronsRightIcon />
              </div>
              <p className="flex-1">Ao clicar em uma rede: </p>
            </div>
            <div className="flex flex-col gap-1 px-12">
              <p className="mt-2">
                - É exibido uma caixa contendo a quantidade de redes do país sede da
                rede clicada;
              </p>
              <p className="mt-2">
                - É exibido uma caixa contendo a quantidade de estações da rede
                clicada;
              </p>
              <p className="mt-2">
                - É dado um zoom no mapa, centralizando o mapa com as coordenadas da
                rede clicada e mostrada as estações da respectiva rede;
              </p>
            </div>
          </li>
          <li className="flex items-center gap-1 py-1">
            <div className="h-full w-10">
              <ChevronsRightIcon />
            </div>
            <p className="flex-1">
              Ao passar o mouse por uma estação, é exibido o nome da estação;
            </p>
          </li>
          <li className="flex items-center gap-1 py-1">
            <div className="h-full w-10">
              <ChevronsRightIcon />
            </div>
            <div className="flex-1">
              <p>
                Ao clicar em uma estação: É exibido uma caixa contendo os detalhes da
                estação clicada;
              </p>
            </div>
          </li>
          <li className="flex items-center gap-1 py-1">
            <div className="h-full w-10">
              <ChevronsRightIcon />
            </div>
            <p className="flex-1">
              No campo de busca, você pode fazer sua busca pelo nome da cidade ou
              estação.
            </p>
          </li>
        </ul>
      </div>
      <p className="my-16 text-center">
        Para mais detalhes, você pode acessar o repositório do projeto.
      </p>
    </div>
  );
};
