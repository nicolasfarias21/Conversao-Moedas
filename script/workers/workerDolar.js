async function conectaApi(){
    const conexao = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    const conexaoTraduzida = await conexao.json();
    postMessage(conexaoTraduzida.USDBRL)
}

addEventListener("message", () =>{
    conectaApi();
    setInterval(() => conectaApi(), 5000)
})
