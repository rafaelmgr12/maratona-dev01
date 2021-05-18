const Modal = {
  open() {
    // Abrir modal
    // Adicionar a class active ao modal
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    // fechar o modal
    // remover a class active do modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
  },
  { id: 2, description: "Website", amount: 500000, date: "23/01/2021" },
  { id: 3, description: "Internet", amount: -20000, date: "23/01/2021" },
];

const Transaction = {
  all: transactions,
  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },
  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },
  income() {
    let income = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
    // somar as entradas
  },
  expense() {
    let expense = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }

      // somar saídas/gastos
    });
    return expense;
  },
  total() {
    return Transaction.income() + Transaction.expense();
    // entradas - saídas
  },
};

const DOM = {
  transactionContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
      <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação" />
      </td>
    `;
    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.income()
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expense()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },
  clearTransactions() {
    DOM.transactionContainer.innerHTML = "";
  },
};

//DOM.addTransaction(transactions)

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return signal + value;
  },
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, "")) * 100;
    //value = Number(value) * 100; // É necessário fazer uns testes para isso

    return value;
  },

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },
};

const Storage = {
  get(){},
  set(transactions){},
}

const Form = { 
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },
  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);
    return {
      description,
      amount,
      date,
    };
  },
  validateField() {
    const { description, amount, date } = Form.getValues();
    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },
  saveTransaction(transaction) {
    Transaction.add(transaction);
  },
  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();
    try {
      Form.validateField();
      const transaction = Form.formatValues();
      Form.saveTransaction(transaction);
      Form.clearFields();
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
  // verificar se todas as informações foram preenchidas
  // formatar os dados para salvar
  // salvar
  //apagar os dados no formulário
  // modal fechar
  //atualizar a aplicação
};

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });

    DOM.updateBalance();

    //Storage.set(Transaction.all)
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();
