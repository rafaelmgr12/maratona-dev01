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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
          <img src="./assets/minus.svg" alt="Remover transação" />
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
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("#inputdate"),

  formatData() {},
  validateField() {},
  submit(event) {
    event.preventDefault();
    Form.validateField();
    Form.formatData();
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
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
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
