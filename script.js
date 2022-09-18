"use strict";
/*
CRIADO PARA CRIMOÇÃO AS FUNÇÕES
let banco = [
  { tarefa: "estudar JS", status: "" },
  { tarefa: "estudar HTML", status: "" },
  { tarefa: "estudar CSS", status: "" },
];
*/

const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
  localStorage.setItem("todoList", JSON.stringify(banco));

const criarItem = (tarefa, status = "", indece) => {
  const item = document.createElement("label");
  item.classList.add("todo__item");
  item.innerHTML = `
  <input type="checkbox" ${status} data-indice="${indece}">
  <div>${tarefa}</div>
  <input type="button" value=""data-indice="${indece}">
  `;
  document.getElementById("todoList").appendChild(item);
};

const limpatTarefas = () => {
  const todoList = document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const atualizarTela = () => {
  limpatTarefas();
  const banco = getBanco();
  banco.forEach((item, indece) => {
    criarItem(item.tarefa, item.status, indece);
  });
};

const addItem = (event) => {
  const tecla = event.key;
  const texto = event.target.value;
  if (tecla === "Enter") {
    const banco = getBanco();
    const limparCampoDigitado = (event.target.value = "");
    banco.push({ tarefa: texto, status: "" });
    setBanco(banco);
    atualizarTela();
    limparCampoDigitado();
  }
};

const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice(indice, 1);
  setBanco(banco);
  atualizarTela();
};

const atualizarItem = (indice) => {
  const banco = getBanco();
  banco[indice].status = banco[indice].status === "" ? "checked" : "";
  setBanco(banco);
  atualizarTela();
};

const clickItem = (event) => {
  const elemento = event.target;
  if (elemento.type === "button") {
    const indece = elemento.dataset.indice;
    removerItem(indece);
  } else if (elemento.type === "checkbox") {
    const indece = elemento.dataset.indice;
    atualizarItem(indece);
  }
};

document.getElementById("newItem").addEventListener("keypress", addItem);
document.getElementById("todoList").addEventListener("click", clickItem);
atualizarTela();
