const btnEnviar = document.getElementById('enviar');
const btnCalcular = document.getElementById('calcular');
const btnReset = document.getElementById('novo');

const spanHorario = document.getElementById('datetime');
spanHorario.innerHTML = new Date().toLocaleTimeString();

let finalOrder = {
    'pedidos': [],
    'price': 0.0
};

const xisDesc = {
    'xis1': 'Xis-Mignon:\nUm delicioso Xis feito com filé mignon maionese caseira da casa, muito queijo, alface, tomate, cebola e um toque final com bacon',
    'xis2': 'Xis-Mato:\nO famoso Xis Mato é a opção vegana da casa feita com Berinjela empanada, molho caseiro da casa, queijo vegano, alface, tomate, repolho e cebola',
    'xis3': 'Xis-Porco:\nA nova adição do cardapio é o Xis Porco, feito com costelinha desfiada, molho barbecue e só, um classico Xis caseiro!',
    'chimas': 'Chimarrão:\nO classico Chimarrão de 500ml!',
    'band': 'Bandeclay:\n3 Bandeclays de presunto pra fazer a festa!',
    'fritas': 'Batata Frita:\nBatatinha Frita temperada a moda casa para os amantes de batata'
};

const xisPrice = {
    'xis1': 28.90,
    'xis2': 50.00,
    'xis3': 26.90,
    'chimas': 12.0,
    'band': 7.00,
    'fritas': 7.00
};

function getForm() {
    return {
        'name': document.getElementById('nome').value,
        'tel': document.getElementById('phone').value,
        'combo': document.getElementById('combo').value,
        'chimas': document.getElementById('ex1').checked,
        'band': document.getElementById('ex2').checked,
        'fritas': document.getElementById('ex3').checked,
        'entrega': document.getElementById('radio1').checked
    }
}

function updateDesc() {
    const descBox = document.getElementById('description');
    let finalOrderStr = "";
    for(let i of finalOrder.pedidos) {
        finalOrderStr += `R$ ${xisPrice[i].toFixed(2)}\t${xisDesc[i]}\n`;
    }

    descBox.value = finalOrderStr;
}

btnEnviar.addEventListener("click", () => {
    const data = getForm();
    finalOrder.pedidos.push(data.combo);

    for (let i of ['band', 'fritas', 'chimas']) {
        if (data[i]) finalOrder.pedidos.push(i);
    }

    finalOrder.name = data.name;
    finalOrder.tel = data.tel;
    finalOrder.entrega = data.entrega ? 'Delivery' : 'Retirar';

    updateDesc();
});

btnCalcular.addEventListener("click", () => {
    for (let i of finalOrder.pedidos) {
        finalOrder.price += xisPrice[i];
    }
    const priceElement = document.getElementById('total');
    priceElement.value = `R$ ${finalOrder.price.toFixed(2)}`;
});

btnReset.addEventListener("click", () => {
    finalOrder = {
        'pedidos': [],
        'price': 0.0
    };

    updateDesc();
    const priceElement = document.getElementById('total');
    priceElement.value = `R$ ${finalOrder.price.toFixed(2)}`;
});

