function CheckCookies(){
    this.comprobarCookie('user');
}

CheckCookies.prototype.obtenerCookie = function(c_name)
{
    if(typeof localStorage != "undefined"){
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

CheckCookies.prototype.comprobarCookie = function(clave) {
    console.log("comprueba cookie");
    var clave = this.obtenerCookie(clave);
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