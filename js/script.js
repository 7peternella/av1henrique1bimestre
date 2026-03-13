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

  // renderiza cada tarefa em uma estrutura clara:
  // <li>
  //   <span class="tarefa-text">texto</span>
  //   <div class="tarefa-actions">
  //     <button class="secondary">Excluir</button>
  //   </div>
  // </li>
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'tarefa-text';
    span.textContent = tarefa;

    const actions = document.createElement('div');
    actions.className = 'tarefa-actions';

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'secondary';
    btnExcluir.textContent = 'Excluir';
    // ao clicar, remove a tarefa do array pelo índice e re-renderiza
    btnExcluir.addEventListener('click', () => {
      tarefas.splice(index, 1);
      renderTarefas();
    });

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
