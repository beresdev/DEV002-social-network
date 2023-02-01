const main = document.getElementById('main');
const footer = document.getElementById('footer');

export const inicioDeSesion = () => {
  main.innerHTML = '';
  footer.innerHTML = '';
  const sectionA = document.createElement('section');
  const logo = document.createElement('img');
  const sectionB = document.createElement('section');
  const form = document.createElement('form');
  const correo = document.createElement('label');
  const inputCorreo = document.createElement('input');
  const password = document.createElement('label');
  const inputPassword = document.createElement('input');
  const Recovery = document.createElement('a');
  const button = document.createElement('button');
  // let signIn = document.createElement('a');
  const sectionC = document.createElement('section');
  const p = document.createElement('p');
  const register = document.createElement('a');
  const sectionD = document.createElement('section');
  const divO = document.createElement('div');
  const option = document.createElement('p');
  const sesionCon = document.createElement('p');
  // let buttonG= document.createElement('button')
  const google = document.createElement('img');
  const pFooter = document.createElement('p');

  sectionA.className = 'section-inicio-logo';
  sectionA.appendChild(logo);
  logo.src = './img/logo-big.png';
  logo.alt = 'logo-powerL';
  sectionB.className = 'section-form-inicio';
  form.className = 'form-inicio';
  sectionB.appendChild(form);
  form.appendChild(correo);
  form.appendChild(inputCorreo);
  inputCorreo.type = 'email';
  inputCorreo.placeholder = 'correo@dominio.com';
  inputCorreo.id = 'correo';
  inputCorreo.required = 'required';

  form.appendChild(password);
  form.appendChild(inputPassword);
  form.appendChild(Recovery);
  inputPassword.type = 'password';
  inputPassword.placeholder = '******';
  inputPassword.id = 'password';

  form.appendChild(button);
  button.innerText = 'Iniciar sesión';
  button.type = 'submit';
  button.id = 'enviar';
  // button.href = '#/timeline';

  correo.innerText = 'Correo';
  password.innerText = 'Contraseña';
  Recovery.innerText = '¿Olvidaste tu contraseña?';

  // button.appendChild('signIn');

  Recovery.id = 'recovey';

  sectionC.className = 'section-register';
  sectionC.appendChild(p);
  p.innerText = '¿Aún no tienes una cuenta?';
  p.appendChild(register);
  register.innerText = 'Registrate';
  register.href = '#/register';

  sectionD.className = 'section-google';
  sectionD.appendChild(divO);
  sectionD.appendChild(sesionCon);
  // sesionCon.appendChild(buttonG)
  sesionCon.appendChild(google);

  divO.appendChild(option);

  option.innerText = 'O';
  sesionCon.innerText = 'Inicie sesión con  ';
  sesionCon.appendChild(google);
  google.src = '../img/google-logo.png';
  google.alt = 'logo-Google';
  google.id = 'google';

  main.appendChild(sectionA);
  main.appendChild(sectionB);
  main.appendChild(sectionC);
  main.appendChild(sectionD);

  pFooter.innerText = 'Desarrollado por y para Laboratorians';
  pFooter.className = 'text-footer'

  footer.appendChild(pFooter);
};
