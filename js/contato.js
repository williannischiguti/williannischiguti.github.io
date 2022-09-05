/* A função 'validarNome' faz uma checagem no campo 'nome' do formulário e verifica
o padrão (aceita letras de a - z).
Se estiver ok, exibe uma sinalização de sucesso, do contrário exibe um alerta*/

function validarNome(nome) {

  const campoNome = nome.value.substring(0, nome.length);
  const padrao = /[^a-zà-ú]/gi;
  const verificarPadrao = campoNome.match(padrao);

  if (campoNome.length == 0) {
    document.getElementById("validaNome").innerHTML = "<img src=\"./img/alerta.svg\">" + "<font color='#f09f00'> O campo está vazio. </font>";
  }

  if (verificarPadrao) {
    document.getElementById("validaNome").innerHTML = "<img src=\"./img/alerta.svg\">" + "<font color='#f09f00'> Seu nome está com espaços, números ou caracteres especiais </font>";
  } else if (campoNome){
    document.getElementById("validaNome").innerHTML = "<img src=\"./img/check.svg\">";
  }
}

/* A função 'validarEmail' verifica se o formato de e-mail é válido, inicialmente
verificando se o campo é >= 1 e realizando as checagens: 
- Se existe @, espaço em branco, o ponto (.) para definir dominio (exemplo: .com)
Se estiver ok, exibe mensagem de sucesso, senão exibe mensagem de erro*/

function validarEmail(email) {

  const contaEmail = email.value.substring(0, email.value.indexOf("@"));
  const dominio = email.value.substring(email.value.indexOf("@") + 1, email.value.length);

  if ((contaEmail.length >= 1) &&
    (contaEmail.search("@") == -1 && dominio.search("@") == -1) &&
    (contaEmail.search(" ") == -1 && dominio.search(" ") == -1) &&
    (dominio.search(".") != -1 && dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1 && dominio.length >= 3)) {
    document.getElementById("validaEmail").innerHTML = "<img src=\"./img/check.svg\">" + "<font color='#66d40e'> E-mail válido </font>";
  }

  else {
    document.getElementById("validaEmail").innerHTML = "<img src=\"./img/erro.svg\">" + "<font color='#ff0000'> E-mail inválido </font>";
  }
}

/* A função 'validarTextArea' verifica o campo 'textarea' do formulário e exibe uma mensagem
de alerta caso o texto digitado possua menos que 5 caracteres, do contrário exibe sinalização
de sucesso*/

function validarTextArea (textarea) {
  const campoTextArea = textarea.value.substring(0, textarea.length);

  if (campoTextArea.length < 5) {
    document.getElementById("validaTextArea").innerHTML = "<img src=\"./img/alerta.svg\">" + "<font color='#f09f00'> Possui menos de 5 caracteres </font>";
  } else {
    document.getElementById("validaTextArea").innerHTML = "<img src=\"./img/check.svg\">"
  }
}

/* A função 'contarCaracteres' faz a contagem dos caracteres do input. É exibida a
contagem inicial em 100 e vai decrescendo até chegar a 0. Caso chegue até a 0 é exibido
um alerta de máximo de caracteres atingido */

function contarCaracteres(valor) {
  maximoCaracteres = 100;
  texto = valor.length;
  
  if(texto <= maximoCaracteres) {
      caracteresRestantes = maximoCaracteres - texto;
      document.getElementById('contador').innerHTML = caracteresRestantes;
  } else {
      document.getElementById('textarea').value = valor.substr(0, maximoCaracteres);
      document.getElementById('contador').innerHTML = "Máximo de caracteres atingido" + "<img src=\"./img/alerta.svg\">" ;
  }

}

/* A função enviarFormulario previne o comportamento padrão do botão do tipo 'submit',
impedindo que haja a comunicação com o arquivo php enquanto o formulário não esteja com
todos os campos preenchidos.
Uma vez que os campos foram preenchidos e o botão é acionado, o mesmo é desabilitado e muda
seu 'estado' para 'Enviando...' e os dados preenchidos no formulário são gravados na constante 
'dadosFormulario' e em seguida é feita a requisição com o fetch, que faz a comunicação com 
o arquivo php e através do método POST faz o envio dos dados do formulário contendo o corpo 
(nome, email e textarea) e os dados contidos nesses campos e em seguida aciona a função 
formularioEnviado */

function enviarFormulario(submit) {

  submit.preventDefault();
  const botaoEnvio = document.querySelector("form button");
  botaoEnvio.disabled = true;
  botaoEnvio.innerText = "Enviando...";

  const dadosFormulario = new FormData(formulario);

  fetch("./enviar.php", {
    method: "POST",
    body: dadosFormulario,
  }).then(formularioEnviado);
}

/* A função 'formularioEnviado' exibe uma mensagem de sucesso caso tudo ocorra bem no
envio do formulário, caso contrário exibe uma mensagem de erro */

function formularioEnviado(mensagem) {

  if (mensagem.ok) {
    formulario.innerHTML =
      "<img src=\"./img/check.svg\">" +
      "<p style='grid-column: 1/-1; padding: 1rem; border-radius: 4px; background: #f7f7f7;'><span style='color: #005A00;'>Mensagem enviada</span><span style='color: #000000;'>, obrigado pelo envio</span></p>";
  } else {
    formulario.innerHTML =
      "<img src=\"./img/erro.svg\">" +
      "<p style='grid-column: 1/-1; padding: 1rem; border-radius: 4px; background: #f7f7f7;'><span style='color: #E00000;'>Erro no envio</span></p>";
  }
}

/* Seleciona o formulário e depois chama a função 'enviarFormulario', passando
o evento 'submit' */

const formulario = document.querySelector("form");
formulario.addEventListener("submit", enviarFormulario);
