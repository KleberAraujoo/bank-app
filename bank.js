class ContaBancaria {
    constructor(numeroConta, tipoConta, agencia, saldoInicial) {
        this.numeroConta = numeroConta;
        this.tipoConta = tipoConta;
        this.agencia = agencia;
        this.saldo = saldoInicial;
    }

    buscarSaldo() {
        return this.saldo;
    }

    deposito(valor) {
        this.saldo += valor;
        return `Depósito de R$ ${valor.toFixed(2)} realizado com sucesso. Novo saldo: R$ ${this.saldo.toFixed(2)}`;
    }

    saque(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return `Saque de R$ ${valor.toFixed(2)} realizado com sucesso. Novo saldo: R$ ${this.saldo.toFixed(2)}`;
        } else {
            return 'Saldo insuficiente para realizar o saque.';
        }
    }

    obterInformacoes() {
        return `Número da Conta: ${this.numeroConta}\nTipo de Conta: ${this.tipoConta}\nAgência: ${this.agencia}\nSaldo Inicial: R$ ${this.saldo.toFixed(2)}`;
    }
}

let contaCliente = null;

function createAccount() {
    const numeroConta = document.getElementById('account-number').value;
    const tipoConta = document.getElementById('account-type').value;
    const agencia = document.getElementById('agency').value;

    // Validar entrada
    if (!numeroConta.match(/^\d{8}$/) || !agencia.match(/^\d{4}$/)) {
        alert('Por favor, preencha os campos corretamente.');
        return;
    }

    // Criar conta
    contaCliente = new ContaBancaria(numeroConta, tipoConta, agencia, 1000);

    // Exibir informações da conta e formulário de transação
    alert('Conta criada com sucesso!\n\n' + contaCliente.obterInformacoes());
    showTransactionForm();
}

function showTransactionForm() {
    const formHTML = `
        <h1>Conta Bancária</h1>
        <div id="account-info">
            <p>Número da Conta: ${contaCliente.numeroConta}</p>
            <p>Tipo de Conta: ${contaCliente.tipoConta}</p>
            <p>Agência: ${contaCliente.agencia}</p>
            <p>Saldo Atual: R$ ${contaCliente.buscarSaldo().toFixed(2)}</p>
        </div>
        <div id="transaction-form">
            <label for="amount">Valor:</label>
            <input type="number" id="amount" placeholder="Digite o valor" required>
            <button onclick="deposit()">Depositar</button>
            <button onclick="withdraw()">Sacar</button>
        </div>
        <div id="result"></div>
    `;

    document.querySelector('.container').innerHTML = formHTML;
}

function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount)) {
        document.getElementById('result').innerText = contaCliente.deposito(amount);
        updateBalance();
    } else {
        alert('Por favor, insira um valor válido.');
    }
}

function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount)) {
        document.getElementById('result').innerText = contaCliente.saque(amount);
        updateBalance();
    } else {
        alert('Por favor, insira um valor válido.');
    }
}

function updateBalance() {
    document.getElementById('account-info').innerHTML = `
        <p>Número da Conta: ${contaCliente.numeroConta}</p>
        <p>Tipo de Conta: ${contaCliente.tipoConta}</p>
        <p>Agência: ${contaCliente.agencia}</p>
        <p>Saldo Atual: R$ ${contaCliente.buscarSaldo().toFixed(2)}</p>
    `;
}
