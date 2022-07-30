function app() {
    console.log('App iniciada')

    carregar_avaliacoes()

    const btn_calcular_imc = document.getElementById('btn_calcular')
    const input_nome = document.getElementById('nome')
    const input_peso = document.getElementById('peso')
    const input_altura = document.getElementById('altura')
    const show_nome = document.getElementById('show_nome')
    const show_imc = document.getElementById('show_imc')
    const show_classificacao = document.getElementById('show_classificacao')
    const show_sexo = document.getElementById('show_sexo')

    const btn_sexo_m = document.getElementById('sexo_m')
    const btn_sexo_f = document.getElementById('sexo_f')

    let sexo = ''

    btn_calcular_imc.onclick = () => {
        const nome = input_nome.value
        const peso = Number(input_peso.value)
        const altura = Number(input_altura.value)

        const imc = peso / (altura * altura)
        // alert(`Olá ${nome}, seu IMC é ${imc.toFixed(1)}!`)

        const classificacao = classificar_imc(imc)

        show_nome.innerText = nome
        show_imc.innerText = 'IMC: ' + imc.toFixed(1)
        show_classificacao.innerText = classificacao
        show_sexo.innerText = sexo

        salvar_avaliacao(nome, imc, classificacao)

        adicionar_avaliacao_tabela(nome, imc, classificacao)

    }

    btn_sexo_m.onclick = () => {
        // alert('Masculino')
        sexo = 'Masculino'
        btn_sexo_m.classList.add('selecionado')
        btn_sexo_f.classList.remove('selecionado')
    }

    btn_sexo_f.onclick = () => {
        // alert('Feminino')
        sexo = 'Feminino'
        btn_sexo_f.classList.add('selecionado')
        btn_sexo_m.classList.remove('selecionado')
    }
}

function classificar_imc(imc) {
    if (imc < 18.5) {
        return 'Peso baixo'
    } else if (imc < 24.9) {
        return 'Peso normal'
    } else if (imc < 29.9) {
        return 'Sobrepeso'
    } else if (imc < 34.9) {
        return 'Obesidade I'
    } else if (imc < 39.9) {
        return 'Obesidade II'
    } else {
        return 'Obesidade III'
    }
}

function adicionar_avaliacao_tabela(nome, imc, classificacao) {
    // botar um nova linha da tabela
    const linha = document.createElement('tr')
    const col_nome = document.createElement('td')
    const col_imc = document.createElement('td')
    const col_classificacao = document.createElement('td')
    const col_remover = document.createElement('td')

    // preencher os elementos com dados
    col_nome.innerText = nome
    col_imc.innerText = imc.toFixed(1)
    col_classificacao.innerText = classificacao
    col_remover.innerText = '---'

    // adicionar colunas à linha
    linha.appendChild(col_nome)
    linha.appendChild(col_imc)
    linha.appendChild(col_classificacao)
    linha.appendChild(col_remover)

    // adiciona linha à tabela
    const corpo_tabela = document.getElementById('corpo_tabela')
    corpo_tabela.appendChild(linha)
}

async function carregar_avaliacoes() {
    console.log('Carregando avaliações')
    // Chamada na API Backend
    const response = await fetch('http://localhost:3000/avaliacoes')
    const avaliacoes = await response.json()

    for (let avaliacao of avaliacoes) {
        const nome = avaliacao.nome
        const imc = avaliacao.imc
        const classificacao = avaliacao.classificacao
        adicionar_avaliacao_tabela(nome, imc, classificacao)
    }
}

async function salvar_avaliacao(nome, imc, classificacao) {
    console.log('Enviando avaliacao para a API')

    const avaliacao = { nome, imc, classificacao }

    const init = {
        method: 'POST',
        body: JSON.stringify(avaliacao),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }

    // Chamada na API Backend
    await fetch("http://localhost:3000/avaliacoes", init)
    adicionar_avaliacao_tabela(nome, imc, classificacao)
}
app()