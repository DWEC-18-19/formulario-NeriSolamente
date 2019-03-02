function CheckCookies(){

    this.comprobarCookie('user');
}


CheckCookies.prototype.obtenerCookie = function(clave) {
    var name = clave + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

CheckCookies.prototype.comprobarCookie = function(clave) {
    console.log("comprueba cookie");
    var clave = this.obtenerCookie(clave);
    console.log(clave);
    if (clave!="") {// La cookie existe.
        console.log("existe")
        div = document.getElementById('divTit');
        tit = document.createElement("H1");
        txt = document.createTextNode("Bienvendo " + clave);
        div.appendChild(tit);
        tit.appendChild(txt);  
        deleteCookie = document.createElement('input');
        deleteCookie.setAttribute('type','button');
        deleteCookie.setAttribute('value','Eliminar cookies');
        deleteCookie.setAttribute('onclick','eliminar("user")');
        div.appendChild(deleteCookie); 

       //newlink = document.createElement('h2');
        //newlink.setAttribute('value','Bienvenido');
    }else{
        console.log("no existe")
        div = document.getElementById('divBut');
        newlink = document.createElement('input');
        newlink.setAttribute('type','button');
        newlink.setAttribute('value','Nuevo usuario');
        newlink.setAttribute('onclick','redireccion()');
        div.appendChild(newlink);         
    }
}
var a = new CheckCookies();