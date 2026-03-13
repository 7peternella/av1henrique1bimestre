// agora cada tarefa é um objeto: { text: string, feito: boolean }
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

  // renderiza cada tarefa como objeto com botões de ação
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'tarefa-text';
    span.textContent = tarefa.text;
    if (tarefa.feito) span.classList.add('feito');

    const actions = document.createElement('div');
    actions.className = 'tarefa-actions';

    // botão concluir / desfazer
    const btnConcluir = document.createElement('button');
    btnConcluir.type = 'button';
    btnConcluir.className = 'success';
    btnConcluir.textContent = tarefa.feito ? 'Desfazer' : 'Concluir';
    btnConcluir.addEventListener('click', () => {
      // alterna o estado 'feito' e re-renderiza
      tarefas[index].feito = !tarefas[index].feito;
      renderTarefas();
    });

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'secondary';
    btnExcluir.textContent = 'Excluir';
    // ao clicar, remove a tarefa do array pelo índice e re-renderiza
    btnExcluir.addEventListener('click', () => {
      tarefas.splice(index, 1);
      renderTarefas();
    });

    actions.appendChild(btnConcluir);
    actions.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(actions);
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
  tarefas.push({ text: texto.trim(), feito: false });
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
