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
  income() {
    let income = 0
    transactions.forEach((transaction) => {
      if(transaction.amount > 0){
        income += + transaction.amount
       
      }
    })
    return income
    // somar as entradas
  },
  expenses() {
    let expense = 0
    transactions.forEach((transaction) => {
      if(transaction.amount > 0){
        income += + transaction.amount
       
      }
    )
    // somar saídas/gastos
  },
  total() {
    // entradas - saídas
  },
};

const DOM = {

  transactionContainer: document.querySelector("#data-table tbody"),


  addTransaction(transaction,index){
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction){
    const CSSclass = transaction.amount > 0 ? "income":
    "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
          <img src="./assets/minus.svg" alt="Remover transação" />
      </td>
    `
    return html
  },

  updateBalance(){
    document.getElementById('incomeDisplay').innerHTML = Transaction.income()
    document.getElementById('expenseDisplay').innerHTML = Transaction.expense()
    document.getElementById('totalDisplay').innerHTML = Transaction.total()

  }
};

//DOM.addTransaction(transactions)

const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : ""
    
    value = String(value).replace(/\D/g,"")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR",{
      style: "currency",
      currency: "BRL",
      
    })
    return signal + value

  }
}

transactions.forEach(function(transaction){
  DOM.addTransaction(transaction)
})

DOM.updateBalance()