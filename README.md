# -Agendamentos

agenda
passo 0 - Fazer o Clone deste repositório ou fazer o donwload do arquivo .ZIP do projeto, clicando em Code download zip.

Antes de poder construir este projeto, você deve instalar e configurar as seguintes dependências em sua máquina:
1) Instalar o Java JDK-8u261  encontrado https://www.oracle.com/br/java/technologies/javase/javase-jdk8-downloads.html
1.1) Configurar a variavel java_home nas variaveis de ambiente do windows: https://confluence.atlassian.com/confbr1/configurando-a-variavel-java_home-no-windows-933709538.html

2) instalar o Node v12.16.1 tb encontrado https://nodejs.org/en/blog/release/v12.16.1/
Node.js: usamos o Node para executar um servidor da Web de desenvolvimento e criar o projeto. Dependendo do seu sistema, você pode instalar o Node da origem 
ou como um pacote configurável pré-empacotado. Após instalar o Node, você poderá executar o seguinte comando para instalar as ferramentas de desenvolvimento. 
Você só precisará executar este comando na instalação ou quando as dependências mudarem no package.json.

 comando 1: Digite no CMD o comando: npm install

e depois

3) rodar no CMD o comando: mvnw

O Maven também é usado para gerenciar as dependências de Java usadas neste aplicativo. Você pode atualizar dependências especificando uma versão mais recente no package.json. 
Você também pode executar o npm update e o npm install para gerenciar dependências. 

4) abra o navegador e entre no endereço http://localhost:8080/
para fazer o login use - usuario: admin e senha: admin

agenda
Esta aplicação foi gerada utilizando JHipster 6.10.1, pode encontrar documentação e ajuda em https://www.jhipster.tech/documentation-archive/v6.10.1.

Desenvolvimento em
Antes de poder construir este projecto, deve instalar e configurar as seguintes dependências na sua máquina:

Node.js: Utilizamos o Node para executar um servidor web de desenvolvimento e construir o projecto. Dependendo do seu sistema, pode instalar o Node a partir da fonte ou como um pacote pré-pacotado.
Depois de instalar Node, deverá poder executar o seguinte comando para instalar ferramentas de desenvolvimento. Só precisará de executar este comando quando as dependências mudarem em package.json.

npm instalar
Utilizamos npm scripts e Webpack como o nosso sistema de construção.

Execute os seguintes comandos em dois terminais separados para criar uma experiência de desenvolvimento feliz, onde o seu navegador faz o auto-refresco quando os ficheiros mudam no seu disco rígido.


./mvnw


npm início
Npm é também utilizado para gerir as dependências CSS e JavaScript utilizadas nesta aplicação. Pode actualizar as dependências especificando uma versão mais recente em package.json. Pode também executar npm update e npm install para gerir as dependências. Adicione a bandeira de ajuda em qualquer comando para ver como a pode utilizar. Por exemplo, npm help update.

O comando npm run listará todos os scripts disponíveis para correr para este projecto.

Apoio PWA
JHipster envia com suporte de PWA (Progressive Web App), e está desligado por defeito. Um dos principais componentes de um AWP é um trabalhador de serviços.

O código de inicialização do trabalhador de serviços é comentado por defeito. Para o activar, descomente o seguinte código em src/main/webapp/index.html:

<script>
  se ('serviceWorker' em navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function () {
      console.log('Serviço Trabalhador Registado');
    });
  }
</script>
Nota: A Workbox dá poder ao trabalhador de serviço de JHipster. Gera dinamicamente o ficheiro service-worker.js.

Gestão de dependências
Por exemplo, para adicionar a biblioteca de Folhetos como uma dependência de tempo de execução da sua aplicação, correria seguindo o comando:

npm install --save --save folheto exacto
Para beneficiar das definições de tipo TypeScript do repositório DefinitivelyTyped em desenvolvimento, correria seguindo o comando:

npm install --save-dev --save-exact @types/leaflet
Depois importaria os ficheiros JS e CSS especificados nas instruções de instalação da biblioteca para que o Webpack os conheça: Editar ficheiro src/main/webapp/app/vendor.ts:

importar 'leaflet/dist/leaflet.js';
Editar ficheiro src/main/webapp/content/scss/vendor.scss:

@importar '~folheto/dist/leaflet.css';
Nota: Há ainda algumas outras coisas a fazer para o Leaflet que não iremos detalhar aqui.

Para mais instruções sobre como desenvolver com JHipster, dê uma vista de olhos à Utilização de JHipster em desenvolvimento.

Utilização da CLI Angular
Também pode usar a CLI Angular para gerar algum código de cliente personalizado.

Por exemplo, o seguinte comando:

ng gerar componente meu-componente
irá gerar poucos ficheiros:

criar src/main/webapp/app/meu-componente/meucomponente.html
criar src/main/webapp/app/meu-componente/meucomponente.ts
actualizar src/main/webapp/app/app.module.ts
Edifício para produção
Embalagem como frasco
Para construir o frasco final e optimizar a aplicação da agenda para a produção, executar:


./mvnw -Pprod verificar limpo


Isto irá concatenar e minificar os ficheiros CSS e JavaScript do cliente. Modificará também index.html para que faça referência a estes novos ficheiros. Para garantir que tudo funcionou, execute:


java -jar target/*.jar


Depois navegue para http://localhost:8080 no seu navegador.

Consulte Utilizar JHipster em produção para mais detalhes.

Embalagem como guerra
Para empacotar a sua aplicação como uma guerra a fim de a implantar num servidor de aplicação, execute:


./mvnw -Pprod,war clean check


Testes
Para iniciar os testes da sua candidatura, execute:

./mvnw verificar
Testes de clientes
Os testes unitários são realizados por Jest e escritos com Jasmine. Estão localizados em src/test/javascript/ e podem ser executados com:

npm teste
Para mais informações, consultar a página Testes em curso.

Qualidade do código
O sonar é utilizado para analisar a qualidade do código. Pode iniciar um servidor Sonar local (acessível em http://localhost:9001) com:

docker-compose -f src/main/docker/sonar.yml up -d
Pode efectuar uma análise Sonar com a utilização do sonar-scanner ou utilizando o plugin maven.

Em seguida, executar uma análise por sonar:

./mvnw -Pprod clean verify sonar:sonar
Se precisar de executar novamente a fase Sonar, certifique-se de especificar pelo menos a fase de inicialização, uma vez que as propriedades do Sonar são carregadas a partir do ficheiro sonar-projecto.propriedades.

./mvnw inicializar sonar:sonar
Para mais informações, consultar a página sobre a qualidade do Código.

Utilização do Docker para simplificar o desenvolvimento (opcional)
Pode usar o Docker para melhorar a sua experiência de desenvolvimento JHipster. Uma série de configurações de docker-compose estão disponíveis na pasta src/main/docker para lançar os serviços de terceiros necessários.

Por exemplo, para iniciar uma base de dados mysql num contentor de doca, execute:

docker-compose -f src/main/docker/mysql.yml up -d
Para o parar e remover o recipiente, correr:

docker-compose -f src/main/docker/mysql.ym

Traduzido com a versão gratuita do tradutor - www.DeepL.com/Translator
