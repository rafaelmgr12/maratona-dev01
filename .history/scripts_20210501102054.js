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
    // somar as entradas
  },
  expenses() {
    // somar saídas/gastos
  },
  total() {
    // entradas - saídas
  },
};

const DOM = {
  addTransaction(transaction,index){
    console.log('oi')
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction()
  },

  innerHTMLTransaction(){
    
    const html = `
    
      <td class="description">Luz</td>
      <td class="expense">- R$ 500,00</td>
      <td class="date">23/01/2021</td>
      <td>
          <img src="./assets/minus.svg" alt="Remover transação" />
      </td>
 
    
    `
    return html
  },
};

DOM.addTransaction()