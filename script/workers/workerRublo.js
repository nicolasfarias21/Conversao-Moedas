addEventListener("message", () =>{
    conectaAPI();
    setInterval(() => conectaAPI(), 5000)
})

async function conectaAPI(){
    const conexao = await fetch("https://economia.awesomeapi.com.br/json/last/RUB-BRL");
    const conexaoTraduzida = await conexao.json();
    postMessage(conexaoTraduzida.RUBBRL)
}

