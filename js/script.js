const tarefas = [];

// Seleção de elementos do DOM
const form = document.querySelector('#form-tarefa');
const inputTarefa = document.querySelector('#input-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const mensagemErro = document.querySelector('#mensagem-erro');

function validarTarefa(texto) {
  if (!texto || texto.trim() === '') {
    return false;
  }
  return true;
}

function renderTarefas() {
  // limpa a lista
  listaTarefas.textContent = '';

  // renderiza cada tarefa
  tarefas.forEach((tarefa) => {
    const li = document.createElement('li');
    li.textContent = tarefa;
    listaTarefas.appendChild(li);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const texto = inputTarefa.value;

  if (!validarTarefa(texto)) {
    mensagemErro.textContent = 'Por favor digite uma tarefa válida.';
    return;
  }

  // limpa mensagem de erro se existir
  mensagemErro.textContent = '';

  // adiciona no array e atualiza a interface
  tarefas.push(texto.trim());
  renderTarefas();

  // limpa o input
  inputTarefa.value = '';
  inputTarefa.focus();
});

// limpa mensagem quando o usuário começa a digitar
inputTarefa.addEventListener('input', function () {
  if (mensagemErro.textContent) {
    mensagemErro.textContent = '';
  }
});
