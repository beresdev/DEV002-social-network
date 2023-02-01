// Este es el punto de entrada de tu aplicacion

import firebaseConfig from './Firebase/ConfigFirebase.js';
import { register } from './views/register.js';
import { timeline } from './views/timeline.js';
import {
  registerFirebase, registerGoogle, getAuth, GoogleAuthProvider, initializeApp,
} from './Firebase/FirebaseFunctions.js';
import { inicioDeSesion } from './views/InicioDeSesion.js';
import { route, template, router } from './lib/Router.js';

initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
function login(email, password) {
  if (email === '' || password === '') {
    alert('Completa los datos requeridos');
  } else {
    return window.location = 'http://localhost:3000/#/timeline';
  }
}

template('inicioDeSesion', () => { // Se crea una función anónima
  inicioDeSesion(); // Le asigna a la función anónima la función about()
  const signIn = document.getElementById('enviar');
  signIn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
  const google = document.getElementById('google');
  google.addEventListener('click', (e) => {
    e.preventDefault();
    registerGoogle(auth, provider);
  });
});

//ESTA ES
// const signIn = document.getElementById('enviar');

// function login(e) {
//   e.preventDefault();
//   const email = document.getElementById('correo').value;
//   const password = document.getElementById('password').value;
//   if (email === '' || password === '') {
//     alert('Completa los datos requeridos');
//   }
//   return window.location = 'http://localhost:3000/#/timeline';
// }
// signIn.addEventListener('click', login);

//OTRA OPCIÓN


// const signIn = document.getElementById('enviar');
// signIn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const email = document.getElementById('correo').value;
//   const password = document.getElementById('password').value;
//   login(email, password);
// });

template('register', () => { // Se crea una función anónima
  register(); // Le asigna a la función anónima la función about()
  const submit = document.getElementById('enviar');
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('correo').value;
    // let usuaria = document.getElementById('usuaria').value
    const password = document.getElementById('password').value;
    registerFirebase(auth, email, password);

    // emailAutentication(auth, email)
    if (email === '' || password === '') {
      alert('Completa los datos requeridos');
    } else {
      alert('El correo de verificación ha sido enviado a su bandeja de entrada');
    }
  });
});

template('timeline', () => {
  timeline();
});

route('/', 'inicioDeSesion');
route('/register', 'register');
route('/timeline', 'timeline');

window.addEventListener('load', router); // Con el evento load se ejecuta la función router
window.addEventListener('hashchange', router);

// export { login }
