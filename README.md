# Olá, eu sou Patrick! 👋

## E este é o repositório do Desafio Front-end Procimo...

# Visão geral

Projeto desenvolvido como solução do Desafio Front-end da empresa Procimo.

## Resumo do Desafio:

Criar um aplicativo da web, usando ReactJS para visualizar dados geolocalizados recuperados da API CityBikes.<br />

Tarefas do Projeto:<br />
-- Criar um aplicativo da web usando ReactJS;<br />
-- Buscar dados da API CityBikes: http://api.citybik.es/v2/;<br />
-- Mostrar os dados em um mapa com 3 camadas diferentes: <br />
● L1: Número de redes por país; <br />
● L2: Número de estações por rede; <br />
● L3: Detalhes da estação, ao clicar em uma estação;<br />
-- Permitir que o usuário faça uma busca detalhada de L1 a L3, clicando nos marcadores.<br />
-- Permitir que o usuário volte para a camada anterior.<br />
-- Definição de pronto:<br />
● Documente seu projeto:<br />
● Instruções sobre como executar; <br />
● Como testar, e;<br />
● Como construir otimizado para produção.<br />

## Planejamento do projeto:

Projeto foi arquitetado usando o mapa de atividades abaixo:

### Layout inicial do projeto

[x] Componente Mapa <br />
[x] Componete Header, contendo:<br />
--- [x] Mensagem de boas vindas;<br />
--- [x] Meu nome;<br />
--- [x] Nome do desafio<br />
--- [x] Link para meu github;<br />
--- [x] Link para repositório github do projeto<br />

### Aplicação Inicial

[x] Exibir mapa com react-leaflet e leaflet;<br />
[x] Exibir, no mapa, marcadores de rede no mapa, de acordo com as coordenadas de cada rede;<br />

# NA NETWORK:

### Evento hover:

[x] Mostrar componente Tooltip, do react-leaflet, com o nome da rede;<br />
--- [] mostrar o nome completo do país, usar API RestCountries, se der;<br />

### Evento click:

[x] Abrir modal e mostrar quantidade de rede do país da rede clicada; [tarefa 1, do desafio]<br />
---[x] Inserir botão de fechar modal, resetando o mapa;<br />

--- [x] Dar zoom no mapa;<br />
--- [x] Alterar o centro do mapa, passando as coordenadas de rede clicada;<br />
--- [x] Exibir as estações da rede clicada;<br />

[x] Abrir modal e mostrar quantidade de estações da rede clicada; [tarefa 2, do desafio]<br />
--- [x] Inserir botão de fechar modal, resetando o mapa;<br />

# NA ESTAÇÃO:

### Evento hover:

[x] Mostrar componente Tooltip, do react-leaflet, com o nome da estação;<br />

### Evento click:

[x] Abrir modal e exibir os detalhes dessa estação; [tarefa 3, do desafio]<br />

# Sistema de Busca:

[] Criar sistema de busca, pelo nome da cidade, nome da rede ou estação [tarefa 4, do desafio]<br />
--- [] Ao inserir a pesquisa: cidade, rede ou estação:<br />
---- [] Gerar lista de sugestões;<br />
----- [] Ao clicar numa sugestão:<br />
------ [] dar zoom no mapa;<br />
------ [] centralizar mapa com as coordenadas da rede/estação;<br />

# Tecnologias Utilizadas

● React + TypeScript + Vite;<br />
● React Leaflet;<br />
● Leaflet;<br />
● Tailwind;<br />
● Axios;<br />
● Lucide React para Ícones;<br />
● Zustand;<br />

# Componentes

### Map

Este Componente é responsável por exibir a interface principal do mapa, exibir as coordenadas geográficas de cada rede, estação de acordo com a interação do usuário.

### Header

Este Componente exibe as boas vinda ao desafio, o nome do desafio e um sistema de navegação de links com o nome do autor do projeto, link para o github do autor do projeto e link para o repositório do projeto.

### LoadingInitialCountNetwork

Este Componente mostrar uma mensagem de carregamento, sempre que os dados são carregados na tela, e depois dos dados carregados, exibe uma mensagem com a quantidade de redes da api CityBik.

### CenterMap

Este Componente lida com o gerecimanento do centro do mapa, sempre que o usuário clica em uma rede. As informações da rede são enviadas para este componente, e ao recebe-las altera as coordenadas do centro do mapa, passando como centro do mapa as coordenadas da rede clicada.

### ZoomInOut

Este Componente lida com o gerecimanento do zoom do mapa, sempre que o usuário clica em uma rede. O zoom do mapa é alterado para um valor maior sempre que o usuário clica numa rede, monstrando mais detalhes do mapa. Ao clicar duas vezes sobre qualquer ponto do mapa, o zoom também é alterado, mas de forma nativa (funcionalidade do React Leaflet).

### ModalNetworksCountry

Este Componente recebe as informações referente a quantidade de redes de um determinado país, sendo este país, o país da rede clicada. É exibido sempre que o usuário clica em uma rede. O gerenciamento do estado de exibição deste modal e das função de abrir e fechar, são gerenciadas via Zustand.

### ModalStationsNetwork

Este Componente recebe as informações referente a quantidade de estações de uma rede, sendo esta rede, a rede clicada. É exibido sempre que o usuário clica em uma rede. O gerenciamento do estado de exibição deste modal e das função de abrir e fechar, são gerenciadas via Zustand.

### ModalStationDetails

Este Componente recebe as informações referente de uma estação, sendo esta estação, a estação clicada. É exibido sempre que o usuário clica em uma estação. O gerenciamento do estado de exibição deste modal e das função de abrir e fechar, são gerenciadas via Zustand.

### NetworkMarker

Este Componente exibe os marcadores referente a cada rede no mapa. São exibidos sempre que a aplicação é inicialidade ou está na camada L1.

### StationMarker

Este Componente exibe os marcadores referente a cada estação no mapa. São exibidos sempre que a uma determinada rede é clicada.

## Instalação

Como Rodar o Projeto Localmente

- Clone o repositório:

```bash
  git clone https://github.com/patricklimax/challenge-frontend-procimo.git
```

- Navegue até o diretório do projeto:

```bash
cd nome do peojeto
```

- Instale as dependências:

```bash
npm install
```

- Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

- Acesse o projeto em `http://localhost:5173`

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```

## Contribuindo

Contribuições são sempre bem-vindas!

Contribuições são bem-vindas! Se você deseja sugerir melhorias ou relatar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a MIT License
[MIT](https://choosealicense.com/licenses/mit/)

## Deployment

Este projeto está hospedado na Vercel, o que permite um deployment contínuo e rápido sempre que novas alterações são feitas no repositório.
