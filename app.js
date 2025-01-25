
/*
// modificar o titulo <h1></h1>
let titulo = document.querySelector("h1");
titulo.innerHTML = "Jogo do número secreto";

//modificar o paragrafo <p class="texto__paragrafo"></p>
let paragraph = document.querySelector("p");
paragraph = "Escolha entre 0 e 100";
*/
let sortedList = [];
let limiteNum = 10;
let numeroSecreto = gerarRandomNumber();
let tentativas = 1;

// função para configurar textos
function exibirTexto(tag,mensagem){
    let textos = document.querySelector(tag);
    textos.innerHTML = mensagem;

    responsiveVoice.speak(mensagem, "Brazilian Portuguese Female", {rate:1.2});
}

// função config do texto inicial2
function configTextoInicial(){
    exibirTexto("h1","Jogo do número secreto");
    exibirTexto("p","Escolha entre 0 e 10");
}

configTextoInicial();
//função para dicas menor ou maior
function dicas(chute){
    
    if(chute < numeroSecreto){
        exibirTexto("p",`o número secreto é maior que o ${chute}`);
    }else{
        exibirTexto("p",`o número secreto é menor que o ${chute}`);
    }
}

//função apra gerar numero aleatoriamente
function gerarRandomNumber(){
    let numeroEscolhido =  parseInt(Math.floor(Math.random()* (limiteNum + 1)));
    let quantidadeElmList = sortedList.length;

    if(quantidadeElmList == limiteNum){
        sortedList = [];
    }

    if(sortedList.includes(numeroEscolhido)){
        return gerarRandomNumber();
    }else{
        sortedList.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//limpar o campo de tentativas
function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

//verificar se a escolha do numero está certa
function verificarChute(){
    let chute = document.querySelector("input").value;//pega o valor de entrada
    let singularPlural = tentativas > 1? 'tentativas' : 'tentativa';
    let mensagemDeTentativas = `Acertou o número com ${tentativas} ${singularPlural} `;

    if(chute == numeroSecreto){//verifica se o numero é igual, se for ele acerta 
        exibirTexto("h1","Acertou!");
        exibirTexto("p", mensagemDeTentativas);
        document.getElementById("escolha").setAttribute("disabled", true)
        document.getElementById("reiniciar").removeAttribute("disabled");

    }else{// se não, ele vai errar e dizer se é menor ou maior que o numero escolhido aleatorio
        dicas(chute);
        exibirTexto("h1","Errou!");
    }

    limparCampo(chute);
    tentativas++;
                            
}

//função para verificar quantas tentativas foram
function allTentativas(){

}
    
//função de um novo jogo
function newGame(){
   
    numeroSecreto = gerarRandomNumber();
    limparCampo();
    tentativas = 1;
    
    configTextoInicial();

    document.getElementById("reiniciar").setAttribute("disabled",true);
    document.getElementById("escolha").removeAttribute("disabled");
}
