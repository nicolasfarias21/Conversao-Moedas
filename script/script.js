import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dolar',
        data: [],
        borderWidth: 1
      }]
    }
})

function geraHorario(){
    let data = new Date
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    console.log(horario);
    return horario;
}

function adicionaDados(grafico, legenda, dados){
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) =>{
        dataset.data.push(dados);
    })
    grafico.update();
}

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    selecionaCotacao("dolar", valor)
    adicionaDados(graficoParaDolar, tempo, valor)
})

const graficoRublo = document.getElementById('graficoRublo')

const graficoParaRublo = new Chart(graficoRublo, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Rublo',
        data: [],
        borderWidth: 1
      }]
    }
})
let workerRublo = new Worker('./script/workers/workerRublo.js');
workerRublo.postMessage('rub');

workerRublo.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    adicionaDados(graficoParaRublo, tempo, valor)
    selecionaCotacao("rublo", valor)

})