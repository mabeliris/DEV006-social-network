import searchImg from './img/search.png';
import logoImg from './img/logo.png';
import {
  signIn,
  loginGoogle,
} from './firebase/config';

function home(navigateTo) {
  const ctnImage = document.createElement('div');
  const logo = document.createElement('img');
  const section = document.createElement('section');
  // const title = document.createElement('h2')
  const formLogin = document.createElement('form');
  const textAcces = document.createElement('p');
  const inputAcces = document.createElement('input');
  const textPass = document.createElement('p');
  const inputPassword = document.createElement('input');
  const btnLogin = document.createElement('button');
  const btnRegister = document.createElement('button');
  const buttonGoogle = document.createElement('button');
  const imgGoogle = document.createElement('img');

  btnRegister.setAttribute('id', 'button-home');
  btnLogin.setAttribute('id', 'button-login');
  buttonGoogle.setAttribute('id', 'button-google');
  section.setAttribute('id', 'section-style');
  formLogin.setAttribute('id', 'formLogin-style');
  textAcces.setAttribute('id', 'textAcces-style');
  textPass.setAttribute('id', 'textPass-style');
  inputAcces.setAttribute('id', 'inputA-style');
  inputPassword.setAttribute('id', 'inputP-style');
  inputPassword.setAttribute('type', 'password');
  imgGoogle.setAttribute('id', 'imgG-style');
  logo.setAttribute('id', 'logo-style');
  logo.src = logoImg;
  logo.alt = 'web-logo';
  ctnImage.appendChild(logo);
  imgGoogle.src = searchImg;
  imgGoogle.alt = 'goo-logo';
  buttonGoogle.appendChild(imgGoogle);

  textAcces.textContent = 'INGRESA TU CORREO';
  textPass.textContent = 'CONTRASEÑA';

  inputAcces.placeholder = 'example@gmail.com';
  inputPassword.placeholder = '********';

  // boton de iniciar sesión
  btnLogin.textContent = 'INICIAR SESIÓN';
  btnLogin.addEventListener('click', () => {
    const email = inputAcces.value;
    const password = inputPassword.value;

    // Iniciar sesion
    signIn(email, password)
      .then((userCredential) => {
        inputAcces.value = '';
        inputPassword.value = '';

        navigateTo('/wall');
        return userCredential;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  });

  // boton de registrarse
  btnRegister.textContent = 'REGISTRARSE';
  btnRegister.addEventListener('click', () => {
    navigateTo('/login');
  });
  // boton de google
  buttonGoogle.textContent = 'INICIAR CON GOOGLE';
  buttonGoogle.addEventListener('click', () => {
    const google = loginGoogle();
    google.then((result) => {
      const user = result.user.accessToken;
      localStorage.setItem('token', result.user.accessToken);

      navigateTo('/wall');

      return user;
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  });

  formLogin.append(textAcces, inputAcces, textPass, inputPassword);
  section.append(ctnImage, formLogin, btnLogin, btnRegister, buttonGoogle);
  return section;
}

export default home;
