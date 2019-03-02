/* ---- CREAR COOKIES ---- */
'use strict';

/* Declaración de variables */
let isAlerts = [user];
let  nullTemplate = /^\s*$/; //Espacio en blanco
let error = 0;

window.onload = iniciar;

function iniciar(){
    // Al hacer click en el botón de enviar tendrá que llamar a la la función validar que se encargará de validar el formulario.
    //recoge los elementos de formulado según el id
    let form = document.getElementById('form');
    let user = document.getElementById('user');
    let email = document.getElementById('email');
    let pass = document.getElementById('pass');
    let confpass = document.getElementById('confpass');
    let dtbirth = document.getElementById('dtbirth'); 
    let cbox1 = document.getElementById('cbox1');

    let button = document.getElementById('enviar');
   
    eventos(); //llama a la función que prepara los eventos

    //Se ejecuta cuando se pulsa "Enviar". Si los datos son correctos, crea cookie
    document.getElementById("enviar").addEventListener('click',function(event){
        if (confirm("\u00BFDeseas enviar el formulario?")){
            console.log("formulario ok");
            event.preventDefault();
            var vUser = validateUser();
            var vEmail = validateEmail();
            var vPass = validatePass();
            var vConfPass = confirmPass();
            var vDate = validateBirth();
            var vChk = validateChk();

            /* comprueba que todas la validaciones son correctas*/
            if (vUser == 1 || vEmail == 1 || vPass == 1 || vConfPass == 1 || vDate == 1 || vChk == 1){ //si hay errores el formulario no se envía
                console.log("errores");
                event.preventDefault();//no carga la pagina si hay errores
            }else{
                //crea la cookie si los datos  obligatorios son correctos
                crearCookie("user", user.value,"pass", pass.value, 1);
                console.log("cookie creada");
            }
        } else{
        //Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
            console.log("confirmación cancelada");
            event.preventDefault();
            return false;   //Salimos de la función devolviendo false.
        }
    },false);
}

function eventos(){ //prepara los eventos que se pueden realizar en los input
   
    /* Datos obligatorias a rellenar */
    user.addEventListener('keyup', validateUser, false); //se valida según se escribe
    user.addEventListener('blur', validateUser, false);
    user.addEventListener('input', validateUser, false); //se valida cuando se carga el input

    email.addEventListener('keyup', validateEmail, false);
    email.addEventListener('blur', validateEmail, false);
    email.addEventListener('input', validateEmail, false);

    pass.addEventListener('keyup', validatePass, false);
    pass.addEventListener('blur', validatePass, false);
    pass.addEventListener('input', validatePass, false);

    confpass.addEventListener('keyup', confirmPass, false);
    confpass.addEventListener('blur', confirmPass, false);
    confpass.addEventListener('input', confirmPass, false);

    /* Datos no obligatorias a rellenar */
    dtbirth.addEventListener('keyup', validateBirth, false);
    dtbirth.addEventListener('blur', validateBirth, false);
    dtbirth.addEventListener('input', validateBirth, false);

    cbox1.addEventListener('keyup', validateChk, false);
    cbox1.addEventListener('blur', validateChk, false);
    cbox1.addEventListener('input', validateChk, false);

}

/* Funciones validación */
    /* Validaciones obligatorias */
function validateUser(){
    console.log("validar usuario");

    var userReg = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
    if (user.value === '' || nullTemplate.test(user.value)) {
        showAlertMessage(user, 'Este campo es obligatorio. Por favor indique nombre y apellidos.');
    }else{    
        if (userReg.test(user.value)) { //Si la validación no es correcta
            console.log("Ok");
            hideAlertMessage(user);
            user.parentNode.className = "";
            error = 0;
        } else { //Si la validación es correcta
            console.log("no ok");
            showAlertMessage(user, 'Nombre y apellidos incorrectos.');
            error = 1;
        }
    }
    return error;
}

function validateEmail(){
    console.log("validar email");

    var emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value === '' || nullTemplate.test(email.value)) {
        showAlertMessage(email, 'Este campo es obligatorio. Por favor indique su email.');
    }else{    
        if (emailReg.test(email.value)) { //Si la validación no es correcta
            console.log("Ok");
            hideAlertMessage(email);
            email.parentNode.className = "";
            error = 0;
        } else { //Si la validación es correcta
            console.log("no ok");
            showAlertMessage(email, 'Email incorrecto.');
            error = 1;
        }
    }
    return error;
}

function validatePass(){
    console.log("contraseña");
    var passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    if (pass.value === '' || nullTemplate.test(pass.value)) {
        showAlertMessage(pass, 'Este campo es obligatorio. Por favor indique su contrase\u00F1.');
    }else{    
        if (passReg.test(pass.value)) { //Si la validación no es correcta
            console.log("Ok");
            hideAlertMessage(pass);
            pass.parentNode.className = "";
            error = 0;
        } else { //Si la validación es correcta
            console.log("no ok");
            showAlertMessage(pass, 'Debe tener al menos 8 caracteres y al menos una letra en min\u00FAscula, una en may\u00FAscula, un n\u00FAmero y un caracter especial.');
            error = 1;
        }
    }
    return error;
}

function confirmPass(){
    validatePass("confpass");
    var pass2Reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    var pass1 = pass.value;
    var pass2 = confpass.value;
    if (pass1 === '' || nullTemplate.test(pass1)){
        if (pass2 === '' || nullTemplate.test(pass2)) {
            showAlertMessage(pass2, 'Este campo es obligatorio. Por favor indique su contrase\u00F1a.');
        }else{  
            if (pass2Reg.test(pass2)) { //Si la validación no es correcta
                console.log("Ok");
                hideAlertMessage(confpass);
                confpass.parentNode.className = "";
                error = 0;
            } else { //Si la validación es correcta
                console.log("no ok");
                showAlertMessage(confpass, 'Debe tener al menos 8 caracteres y al menos una letra en mín\u00FAscula, una en may\u00FAscula, un n\u00FAmero y un carácter especial.');
                error = 1;
            }
        }
    }else{
        if(pass1 === pass2){
            console.log("Ok");
            hideAlertMessage(confpass);
            confpass.parentNode.className = "";
            error = 0;
        }else{
            console.log("no ok");
            showAlertMessage(confpass, 'Las contrase\u00F1as no coinciden.');
            error = 1;
        }
    }
    return error;
}

    /* Validaciones no obligatorias */
function validateBirth(){
    var dateRegES = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    var dateReg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    
    if (dtbirth.value === '' || nullTemplate.test(dtbirth.value)){
     //si está vacio no hace nada porque no es obligatorio
            hideAlertMessage(dtbirth);
            dtbirth.parentNode.className = "";
            error = 0;
    }else{
        if (dateReg.test(dtbirth.value) || dateRegES.test(dtbirth.value)) { //Si la validación no es correcta
            console.log("Ok");
            hideAlertMessage(dtbirth);
            dtbirth.parentNode.className = "";
            error = 0;
        } else { //Si la validación es correcta
            console.log("no ok");
            showAlertMessage(dtbirth, 'La fecha debe cumplir con el formato dd/mm/yyyy o mm/dd/yyyy.');
            error = 1;
        }
    }
    return error;
}

function validateChk(){
    console.log("terminos");
    if(cbox1.checked){
      error = 0;
    }else{
        showAlertMessage(cbox1, 'Debe aceptar los t\u00E9rminos y condiciones.');
        error = 1;
    }
    return error;
}
/* Funciones mensajes */
    /* muestra mensajes*/
 function showAlertMessage(node, text) {
    addClass(node.parentNode, 'invalid');

    if (!node.parentNode.querySelector('.alert-danger')) {
        node.parentNode.appendChild(createAlertMessage(text));
    }
    else {
        node.parentNode.querySelector('.alert-danger').textContent = text;
    }
    node.parentNode.querySelector('.alert-danger').style.display = 'block';

    if (isAlerts.indexOf(node) === -1) {
        isAlerts.push(node);
    }
}

    /* crea mensajes */
function createAlertMessage(text) {
    var elem = document.createElement('div');
    elem.className = 'alert alert-danger';
    elem.textContent = text;
    elem.style.display = 'none';
    return elem;
}

    /* oculta mensajes */
function hideAlertMessage(node) {
    removeClass(node.parentNode, 'has-error');

    if (node.parentNode.querySelector('.alert-danger')) {
        node.parentNode.querySelector('.alert-danger').style.display = 'none';
    }

    if (isAlerts.indexOf(node) !== -1) {
        isAlerts.splice(isAlerts.indexOf(node), 1);
    }
}

/* Funciones para clases */
    /* elimina clase */
function removeClass(el, cls) {
    var c = el.className.split(' ');
    for (var i = 0; i < c.length; i++) {
        if (c[i] == cls) c.splice(i--, 1);
    }
    el.className = c.join(' ');
}

    /* añade clase */
function addClass(el, cls) {
    var c = el.className ? el.className.split(' ') : [];
    for (var i = 0; i < c.length; i++) {
        if (c[i] == cls) return;
    }
    c.push(cls);
    el.className = c.join(' ');
}

/* Función para crear cookies */

function crearCookie(user, vUser,pass,vPass, diasexpiracion) {
    console.log("Crear cookie");
    var d = new Date();
    d.setTime(d.getTime() + (diasexpiracion*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = user + "=" + vUser + "; " + pass + "=" + vPass + "; " + expires;

    alert("Se ha realizado el registro correctamente.");

    top.location.href = "index.html"; //vuelve a cargar la página principal con los datos guardados
}