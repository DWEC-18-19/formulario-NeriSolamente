/* ---- CREAR COOKIES ---- */
window.onload = iniciar;

function iniciar(){
	// Al hacer click en el botón de enviar tendrá que llamar a la la función validar que se encargará
	// de validar el formulario.

	/* Recogida de elementos del formulario */
	var form = document.getElementById('form');
	var user = document.getElementById('user');
	var email = document.getElementById('email');
	var pass = document.getElementById('pass');
	var errorU = user;

	var userReg = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
	var emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	/* especificaciones pass
		^	La cadena de contraseña comenzará de esta manera
		(? =. * [az])	La cadena debe contener al menos 1 carácter alfabético en minúscula
		(? =. * [AZ])	La cadena debe contener al menos 1 carácter alfabético en mayúsculas
		(? =. * [0-9])	La cadena debe contener al menos 1 carácter numérico
		(? =. [ ! @ # \ $% \ ^ & ])	La cadena debe contener al menos un carácter especial, 
									pero estamos escapando de los caracteres RegEx reservados para evitar conflictos
		(? =. {8,})	La cadena debe tener ocho caracteres o más. */
	var passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

	/*user.addEventListener("keyup",function(event){
		valueNom = user.value;
		console.log(valueNom);
		if (valueNom === ''){
			user.className="";
		}
		console.log("user");	
		if (valueNom.search(userReg) == 1){
			user.style.color="#000";
			return;
		}else{
			user.className="invalid";
			console.log("user invalid");
		}
	},false);

	email.addEventListener("keyup",function(event){
		valueEmail = email.value;
		console.log("email");
		if (valueEmail.search(emailReg) == 0){
			email.style.color="#000";
		return;
		}else{
			email.className="invalid";
			console.log("email invalid");
		}
	},false);

	pass.addEventListener("keyup",function(event){
		console.log("pass");
		valuePass = pass.value;
		if (valuePass.search(passReg) == 0){
			pass.style.color="#000";
		return;
		}else{
			pass.className="invalid";
			console.log("pass invalid");
		}
	},false);*/
	// El evento de click lo programamos en la fase de burbujeo (false).
	document.getElementById("enviar").addEventListener('click',validar,false);
}

//function validar(eventopordefecto)	{
	function validar()	{
// En la variable que pongamos aquí gestionaremos el evento por defecto 
// asociado al botón de "enviar" (type=submit) que en este caso
// lo que hace por defecto es enviar un formulario.
	// Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
	if (validarcampostexto(this) && confirm("¿Deseas enviar el formulario?"))
		return true;
	else
	{
		//Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
		eventopordefecto.preventDefault();		
		return false;	//Salimos de la función devolviendo false.
	}
}

function validarcampostexto(objeto) {
	// A esta función le pasamos un objeto (que en este caso es el botón de enviar.
	// Puesto que validarcampostexto(this) hace referencia al objeto dónde se programó ese evento que fue el botón de enviar.
	var formulario = objeto.form; //La propiedad form del botón enviar contiene la referencia del formulario dónde está ese botón submit.

	for (var i=0; i<formulario.elements.length; i++) { //Eliminamos la clase Error que estuviera asignada a algún campo.
		formulario.elements[i].className="";
	}
	
	// De esta manera podemos recorrer todos los elementos del formulario, buscando los que son de tipo texto.
	// Para validar que contengan valores.
	for (var i=0; i<formulario.elements.length; i++) {
		if (formulario.elements[i].type == "text" && formulario.elements[i].value=="") {
			alert("El campo: "+formulario.elements[i].name+" no puede estar en blanco");
			formulario.elements[i].className="invalid";
			formulario.elements[i].focus();
			return false;
		} else if (formulario.elements[i].id=="edad") { //Aprovechamos y dentro de la función validamos también la edad
			if (isNaN(formulario.elements[i].value) || formulario.elements[i].value <0 || formulario.elements[i].value >105) {
				alert("El campo: "+formulario.elements[i].name+" posee valores incorrectos o la edad <0 o >105");
				formulario.elements[i].className="error";
				formulario.elements[i].focus();
				return false;
			}
		}else{
			valueNom = user.value;
		console.log(valueNom);
		
		console.log("user");	
		if (valueNom.search(userReg) == 1){
			user.style.color="#000";
			return true;
		}else{
			user.className="invalid";
			console.log("user invalid");
			return false;
		}
	

		}
	}
	return true;//Si sale de la función con esta instrucción es que todos los campos de texto y la edad son válidos
}


function NewCookies(){
	user = document.getElementById('user');
	if (user != "" || notNull(user)){    this.crearCookie('user','Nerea','');}
}

NewCookies.prototype.crearCookie = function(clave, valor, diasexpiracion) {
	console.log("nerea");
    var d = new Date();
    d.setTime(d.getTime() + (diasexpiracion*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = clave + "=" + valor + "; " + expires;
}

var a = new NewCookies();
