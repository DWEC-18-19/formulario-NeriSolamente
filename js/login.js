/* ---- CREAR COOKIES ---- */
'use strict';

/* Declaración de variables */
let isAlerts = [user];
let error = 0;

window.onload = iniciar;

function iniciar(){
    // Al hacer click en el botón de enviar tendrá que llamar a la la función validar que se encargará de validar el formulario.
    //recoge los elementos de formulado según el id
    let form = document.getElementById('form');
    let user = document.getElementById('user');
    let pass = document.getElementById('pass');

    let button = document.getElementById('aceptar');
   
    //document.getElementById("aceptar").addEventListener('click',,false);

    //Se ejecuta cuando se pulsa "Enviar". Si los datos son correctos, crea cookie
    document.getElementById("aceptar").addEventListener('click',function(event){
            var vUser = validateUser();
            if (vUser == 1){
                event.preventDefault();
            }
        },false);
    document.getElementById("newUser").addEventListener('click',function(event){
           top.location.href = "crearUser.html";
        },false);
}

/* Funciones validación */
    /* Validaciones obligatorias */
function validateUser(){
    console.log("validar usuario");

    if (user.value === '' || nullTemplate.test(user.value)) {
        showAlertMessage(user, 'Este campo es obligatorio. Por favor indique nombre y apellidos.');
    }else{  
        console.log(document.cookie);
        let userV = comprobarCookie('user');  

        console.log("userV " + userV);
        if (userV === user.value) { //si el usuario ya está registrado
            //se comprueba que la contraseña sea correcta
            let validateF = validatePass();
            console.log("validate " + validateF);
            if (validateF === 0){
                error = 0;
                top.location.href = "index.html";
                div = document.getElementById('divTit');
                tit = document.createElement("H1");
                txt = document.createTextNode("Bienvendo " + userV);
                div.appendChild(tit);
                tit.appendChild(txt);  
                deleteCookie = document.createElement('input');
                deleteCookie.setAttribute('type','button');
                deleteCookie.setAttribute('value','Eliminar cookies');
                deleteCookie.setAttribute('onclick','eliminar("user")');
                div.appendChild(deleteCookie); 
            }else{
                error = 1;
            }
        }else{
            //habilita boton para crear nuevo usuario
            console.log("no ok");
            error = 1;
            showAlertMessage(user, 'El nombre indicado no esta registrado. Si quiere acceder debe registrarse');
        }
    }
    return error;
}

function validatePass(){
    console.log("contraseña");
    
    if (pass.value === '' || nullTemplate.test(pass.value)) {
        showAlertMessage(pass, 'Este campo es obligatorio. Por favor indique su contrase\u00F1a.');
        error = 1;
    }else{    
        let passV = comprobarCookie('pass');
        if (passV === pass.value){
            hideAlertMessage(user);
            pass.parentNode.className = "";
            error = 0;
        }else{
            console.log("no ok");
            showAlertMessage(pass, 'La contrase\u00F1a no es correcta.');
            error = 1;
        }
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


/* Comprobación de cookies */

function obtenerCookie(c_name)
{
    //localStorage permite acceder al objeto local Storage
    if(typeof localStorage != "") {//comprueba que el navegador tenga localstorage
        return localStorage.getItem(c_name); 
    } else {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (document.cookie.length > 0) {
            if (c_start !== -1) {
                return getCookieSubstring(c_start, c_name);
            }
        }
        return "";
    }
}

function comprobarCookie(clave) {
    console.log("comprueba cookie");
    var clave = obtenerCookie(clave);
    return clave;
}