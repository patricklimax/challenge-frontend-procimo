### Layout inicial do projeto

Tela inicial
[] Componente com:
--[x] Meu nome
--[x] Nome do desafio
--[ ] Link para o repositório do projeto/meu github

[] Aplicação principal
--[x] renderização do mapa com react-leaflet
--[x] marcar no mapa as NETWORKS

####### NA NETWORK:

### hover na NETWORK:

[x] mostrar no modal o nome da rede
--[x] componente Popup pronto do react-leafle
[x] mostrar no modal país de origem, se der
--[x] componente Popup pronto do react-leafle

### click na NETWORK:

task principal
--[x] abrir modal contendo quantidade de networks do país da network
--[x] inserir opção de fechar modal, resetando o mapa

task principal
--[x] abrir modal contendo quantidade de stations da network clicada
--[x] inserir opção de fechar modal, resetando o mapa

task principal
--[] fazer sistema de busca
-- pesquisar por:
[x]cidade 
[x]rede
estação -- não incluido
-- [x] gerar lista de sugestões
-- [x]ao clicar numa sugestão
-- [x]dar zoom no mapa, centralizar mapa com as coordenadas da rede/estação
--[] renderizar no modal o país da network, se der, usar uma api de dados de país

Ainda no clique na Network
--[] remover todas as marcações de rede, deixando somente da rede clicada, se der
--[x] dar zoom no mapa ao clicar numa network
--[x] mudar o ponto central do mapa
-- setando as coordenadas da network clicada como ponto central

--[x] ao clicar numa network mostrar todas as stations da network clicada

####### NA ESTAÇÃO:

### hover:

--[x] mostrar "alguns" detalhes da estação: nome || network || país ao qual pertece

### click:

task principal
--[x] ao clicar numa station mostrar os detalhes dessa station, usar modal

#####

Techs para usar
-- [x] react-leaflet + types
-- [x] leaflet
-- [x] axios
-- [x] tailwind
-- plugin-prettier-tailwind + prettier
-- lucide react para icones

### TODO!:

// Estados derivados sendo criados
--- remover states e criar constantes para armazenar informações
// desabitar sistema de zoom do mapa ao rolar o scroll do mouse
// ao fechar modal da quantidade de redes por país, perguntar se reseta o mapa

#### verificar o código e ajustar o que precisa ajudar
#### componetizar input e lista de cidade/rede

### criar manual do usuário na tela

