const chaveDaApi = "917cef81a7eb44b090230628232511"; 
const pesquisa = document.getElementById("ipesquisa")
const $botaoDePesquisa = document.querySelector(".botao")

// Para deixar o campo de pesquisa focado ao carregar o HTML da página

document.addEventListener("DOMContentLoaded", () => {
    pesquisa.focus()
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        $botaoDePesquisa.click(); // Simula o clique no botão
    }
});

// Após o botão ser pressionado, é liberado 
$botaoDePesquisa.addEventListener("click", async () => {
    const cidade = pesquisa.value;

    pesquisa.value = ""
    pesquisa.blur()

    const dados = await buscarDadosDaCidade(cidade); 
    
    if (!cidade) return;                          

    if(dados) preencherDadosNaTela(dados, cidade) 
})

async function buscarDadosDaCidade(cidade) { 
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;
    
    const resposta = await fetch(apiURL); 
    
    if(resposta.status !== 200) return; 

    const dados = resposta.json();

    return dados; 
}

function preencherDadosNaTela(dados, cidade) { 
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velocidade = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;

    document.getElementById("temperatura").textContent = `${temperatura}°C`;

    document.getElementById("condicao").textContent = condicao;

    document.getElementById("humidade").textContent = `${humidade}%`;

    document.getElementById("velocidade").textContent = `${velocidade} km/h`;

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao)
}
