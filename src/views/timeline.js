// import { template } from '../lib/Router.js';
import {
  logOut, publicaciones, onGetPost, deletePost, editPost, getPost, datePost,
  updateNotes,
}
  from '../Firebase/FirebaseFunctions.js';
import { auth, doc, onAuthStateChanged } from '../Firebase/FirebaseImport.js';
import { inicioDeSesion } from './InicioDeSesion.js';
// onGetPost, deletePost, getPost, publicaciones

const main = document.getElementById('main');
const footer = document.getElementById('footer');

export const timeline = () => {
  main.innerHTML = '';
  footer.innerHTML = '';

  const section1 = document.createElement('section');
  const logo = document.createElement('img');
  const holaUsuaria = document.createElement('p');
  const section2 = document.createElement('form');
  const inputPost = document.createElement('textarea');
  const botonPublicar = document.createElement('button');
  const section3 = document.createElement('section');
  const nombrePost = document.createElement('p');

  const formPost = document.createElement('form');
  const divPosted = document.createElement('div');
  const eliminar = document.createElement('i');
  const editar = document.createElement('i');
  const fecha = document.createElement('p');
  const signOut = document.createElement('i');
  const buttonOut = document.createElement('button');

  section1.className = 'section-head';
  logo.className = 'logo-timeline';
  logo.src = './img/logo-big.png';
  logo.alt = 'logo-powerL';
  holaUsuaria.className = 'hola-Usuaria';
  eliminar.className = 'fa-solid fa-trash-can';
  editar.className = 'fa-regular fa-pen-to-square';
  signOut.className = 'fa-solid fa-arrow-right-from-bracket signOut-icon';
  section1.appendChild(logo);
  section1.appendChild(holaUsuaria);

  section2.className = 'section-posting';
  inputPost.className = 'input-post';
  inputPost.id = 'postear';
  inputPost.placeholder = '¡Hola mundo!';
  inputPost.cols = '50';
  inputPost.rows = '4';
  inputPost.resize = 'none';
  botonPublicar.className = 'boton-enviar';
  botonPublicar.id = 'publicar';
  botonPublicar.innerText = 'Publicar';
  botonPublicar.type = 'submit';
  formPost.id = 'formPost';
  formPost.appendChild(inputPost);
  formPost.appendChild(botonPublicar);
  section2.appendChild(formPost);

  section3.className = 'section-timeline';
  nombrePost.className = 'autora-post';
  divPosted.className = 'div-posted';
  divPosted.id = 'divPosted';
  eliminar.className = 'boton-eliminar';
  editar.className = 'boton-editar';
  fecha.className = 'fecha-post';
  section3.appendChild(nombrePost);
  section3.appendChild(divPosted);
  section3.appendChild(fecha);
  fecha.appendChild(eliminar);
  fecha.appendChild(editar);

  main.appendChild(section1);
  main.appendChild(section2);
  main.appendChild(section3);
  buttonOut.id = 'userSignOut';
  buttonOut.className = 'signOut-button';
  footer.appendChild(buttonOut);
  buttonOut.appendChild(signOut);

  const postedDiv = document.getElementById('divPosted');

  const arrayPost = [];
  const postear = document.getElementById('postear');
  const publicar = document.getElementById('publicar');
  const userLogout = document.getElementById('userSignOut');
  const formulario = document.getElementById('formPost');
  let editStatus = false;
  let id = '';

  // Aqui inicia el observador para dar la condicional - botones

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userID = user.uid;
      datePost((querySnapshot) => {
        let html = '';
        let optionsUser = '';

        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          if (userID === postData.userID) {
            optionsUser = `
         <div class = 'post-options'>
         <button class='btn-delete' data-id='${doc.id}'>
         <i class="fa-solid fa-trash-can"></i>
         </button>
         <button class='btn-edit' data-id='${doc.id}'>
         <i class="fa-solid fa-pen-to-square"></i>
         </button>
            </div>
       `;
          } else {
            optionsUser = '';
          }
          html
          += ` <div class = 'post-foreach'>
          <p>${postData.name}</p>
          <p>${postData.formattedDate}</p>
          <p>${postData.post}</p>
          ${optionsUser}
          </div>`;
        });
        postedDiv.innerHTML = html;
        const btnsDelete = postedDiv.querySelectorAll('.btn-delete');
        btnsDelete.forEach((btn) => {
          btn.addEventListener('click', ({ target: { dataset } }) => {
            if (confirm('¿Segura que deseas eliminar el post?')) { /* eslint-disable-line */
              deletePost(dataset.id);
            }
          });
        });

        const btnsEdit = postedDiv.querySelectorAll('.btn-edit');
        btnsEdit.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const doc = await getPost(e.target.dataset.id);
            const postData = doc.data();
            formulario.postear.value = postData.post;

            editStatus = true;
            id = doc.id;

            formulario.publicar.innerText = 'Update';
          });
        });
      });
    } else {
      console.log('usuaria no logueada');
    }
  });

  //                  DOM POST PT 1     AQUÍ OH

  // // espera a que DOM se cargue completamente
  // window.addEventListener('DOMContentLoaded', async () => {
  //   // const querySnapshot = await getTasks();
  //   // querysnapshot es una "foto" instantánea de la base de datos
  //   onGetTasks((querySnapshot) => {
  //     let divContain = '';
  //     querySnapshot.forEach((doc) => {
  //       const task = doc.data();
  //       const likes = task.likes;
  //       const numero = likes.length;
  //       const userId = user1().uid;
  //       const currentLike = likes.indexOf(userId);
  //       let likeSrc = '';
  //       const likeImg = () => {
  //         if (currentLike === -1) {
  //           likeSrc = '/*aquí va el icon*/';
  //         } else {
  //           likeSrc = '/*aquí va el icon*/';
  //         }
  //       };
  //       likeImg();

  //       divContain += `
  //       <section class="post">
  //       <div class="cabezaDePost">
  //       <img class="fotoDePerfil" src="imagenes/pug.jpg" alt='foto del usuario'>
  //       <p class="nombreDeUsuario"> Manchitas</p>
  //       <ul disabled selected class ="menu-horizontal" id="mas"><img src="imagenes/mas.png" width=30px height=30px>
  //        <div class="edit-delet">
  //        <li class='editar' data-id='${doc.id}'><img width=15px src="imagenes/editar.png"> Editar publicación</li>
  //        <li class='delete' data-id='${doc.id}'><img width=15px src="imagenes/eliminar.png"> Eliminar </li>
  //        </div>
  //       </ul>
  //       </div>
  //       <div class="cuerpoDePost" >
  //       <p class="contenidoP"> ${task.description} </p>
  //       </div>
  //       <div  class="linea"></div>
  //       <div class="footerDePost">
  //       <img class="like" data-id="${doc.id}" src='${likeSrc}' width=30px>
  //       <p class="contadorLike" data-id="${doc.id}"> ${numero} Me encanta</p>
  //       </div>
  //       </section>
  //       `;
  //     });
  //     taskContainer.innerHTML = divContain;
  //   });
  // });

  //                  TEMPLATE TIMELINE
  publicar.addEventListener('click', async (e) => {
    e.preventDefault();
    const postDescription = formulario.postear;
    // await postPublisher();

    if (!editStatus) {
      await publicaciones(postDescription.value);
    } else {
      await updateNotes(id, { post: postDescription.value });
      //  console.log('updating');

      editStatus = false;
    }
    formulario.reset();
  });
  //                  DOM POST PT 2    AQUÍ OH

  // const userId = user1().uid;
  // const likeBtn = taskContainer.querySelectorAll('.like');

  // // likeBtn.forEach((btn) => {
  // //   btn.src = 'imagenes/dislike.png'
  // // })

  // likeBtn.forEach((btn) => {
  //   btn.addEventListener('click', async (e) => {
  //     const id = e.target.dataset.id;
  //     const doc = await getTask(id);
  //     const likes = doc.data().likes;
  //     const currentLike = likes.indexOf(userId);
  //     // let numero = likes.length;
  //     console.log(likes);
  //     if (currentLike === -1) {
  //       // btn.src = 'imagenes/like.png';
  //       giveLike(id, userId);
  //       // console.log(btn)
  //       // numero = numero + 1
  //       // console.log(numero + " likes")
  //       // contadorLike.innerHTML = numero + " me encanta"
  //     } else {
  //       // btn.src = 'imagenes/dislike.png';
  //       disLike(id, userId);
  //       // numero = numero - 1
  //       // console.log(numero + " likes")
  //       // contadorLike.innerHTML = numero + " me encanta"
  //       // console.log(btn)
  //     }
  //   });
  // });

  //       FUNCIÓN LOGOUT
  console.log('Función Logout');
  userLogout.addEventListener('click', (e) => {
    e.preventDefault();
    logOut(auth);
    return inicioDeSesion();
  });
};
