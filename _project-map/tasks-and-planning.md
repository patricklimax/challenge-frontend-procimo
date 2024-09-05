### Layout inicial do projeto
Tela inicial
  [] Componente com:
    -- Meu nome
    -- Nome do desafio
    -- Link para o repositório do projeto/meu github
  
  [] Aplicação principal
    [] renderização do mapa com react-leaflet
    [] marcar no mapa as NETWORKS

####### NA NETWORK:
### hover na NETWORK:
    --[] mostrar no modal o nome da rede
    --[] mostrar no modal país de origem, se der 

### click na NETWORK:
    
    task principal --[] abrir modal contendo quantidade de networks do país da network
      --[] inserir opção de fechar modal, resetando o mapa
    task principal --[] abrir modal contendo quantidade de stations da network clicada
      --[] inserir opção de fechar modal, resetando o mapa
    task principal --[] fazer sistema de busca de station


    --[] renderizar no modal o país da network, se der

    Ainda no clique na Network
    --[] remover todas as marcações de rede, deixando somente da rede clicada
    --[] dar zoom no mapa
    --[] mudar o ponto central do mapa
    ---- setando as coordenadas da network clicada como ponto central

    --[] ao clicar numa network mostrar todas as stations da network clicada

  ####### NA ESTAÇÃO:
  ### hover:
    --[] mostrar "alguns" detalhes da estação: nome || network || país ao qual pertece
    

### click:
    task principal --[] ao clicar numa station mostrar os detalhes dessa station, usar modal
  

#####
Techs para usar
  -- [x] react-leaflet + types
  -- [x] leaflet
  -- [x] axios
  -- [x] tailwind
  -- plugin-prettier-tailwind + prettier
  -- lucide react para icones
