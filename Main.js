var a = "-1";
var bandera = 0;
//----Funcion para mostrar el pop up
var showPopover = function(target) {
      document
        .getElementById('popover')
        .show(target);
    };
//----Funcion para ocultar el pop up
var hidePopover = function() {
      document
        .getElementById('popover')
        .hide();
    };

//-----Función Verificar usuario en Siiau
function verificarUDG(){     
    var cod = document.getElementById("valor1").value;
    var nip = document.getElementById("valor2").value;
    
    var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function(){
            
            if(this.readyState==4 && this.status == 200){
              
                var respuesta = this.responseText;
                var verificar = parseInt(respuesta);  
                if(cod != "" && nip != ""){
                    if(verificar == 0){
                        selectParking();
                    }else{
                        var datos = respuesta.split(',');   

                        document.getElementById("nombre").innerHTML=datos[2];
                        console.log(datos[2]);
       
                        selectParking_udg();
                    }  
                }else{
                    ons.notification.alert("¡Asegurate que ni un campo este vacío!"); 
                }
            }
        };
    xhttp.open("GET","https://dcc.000webhostapp.com/2018/datosudeg.php?codigo="+cod+"&nip="+nip,true);
    xhttp.send();
}
    
//-----Función Ver Verificar usuario en el Estacionamiento que no sea de la udg
function selectParking(){
    var cod = document.getElementById("valor1").value;
    var nip = document.getElementById("valor2").value;
    
     var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function(){
            
            if(this.readyState==4 && this.status == 200){
              
                var respuesta = this.responseText;
                var verificar = parseInt(respuesta);  
                    if(verificar == 0){
                        inscribirse();
                    }else{

                        var datos = respuesta.split(',');
                        var nombre = datos[2];
                        var placas = datos[3];
                        console.log("Datos Estacionamiento: "+datos)
                            
                        localStorage.setItem("Cod", cod);
                        getPlacas();

                        var myNavigator = document.getElementById("myNavigator");

                        myNavigator.replacePage("pageMap.html").then(function(){

                            document.getElementById("cent").innerHTML = "Usuario: " + cod;

                            document.getElementById("valor1").value = localStorage.getItem("Cod");
                        });             
                    }

            }
        };
    xhttp.open("GET","https://nestornavarizga.000webhostapp.com/selectUser.php?Codigo="+cod+"&Password="+nip,true);
    xhttp.send();
}   
//-----Función Verificar usuario en el Estacionamiento que sea de la udg
function selectParking_udg(){
    var cod = document.getElementById("valor1").value;
    
     var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function(){
            
            if(this.readyState==4 && this.status == 200){
              
                var respuesta = this.responseText;
                var verificar = parseInt(respuesta);  
                
                if(verificar == 0){
                    //Muestra el pop up en el boton
                    showPopover(document.getElementById("boton")); 
                }else{
                    
                    var datos = respuesta.split(',');
                    var nombre = datos[2];
                    var placas = datos[3];
                    console.log("Dsatos Estacionamiento: "+datos)
                    
                    localStorage.setItem("Cod", cod);
                    getPlacas();
                            
                    var myNavigator = document.getElementById("myNavigator");
                    
                    myNavigator.replacePage("pageMap.html").then(function(){
                        
                        document.getElementById("cent").innerHTML = "Usuario: " + cod;
                        
                        document.getElementById("valor1").value = localStorage.getItem("Cod");
                       // document.getElementById("placas").value = localStorage.getItem("Placas");
                    });             
                }
            }
        };
    xhttp.open("GET","https://nestornavarizga.000webhostapp.com/selectUser.php?Codigo="+cod+"&Password=",true);
    xhttp.send();
}
//----Función Continuar 
function continuar(){
    
    var nombre = document.getElementById("nombre").innerHTML;
    var codigo = document.getElementById("valor1").value;
    var placas = document.getElementById("placas").value;
    var telefono = document.getElementById("telefono").value;
    var patronPlaca = new RegExp("(^[A-Z]{3}-[0-9]{2}-[0-9]{2}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{3}$)");
    console.log(nombre);
    //Esconder el pop para poder ver el mensaje
    hidePopover();
    
    //Verificamos que el ingreso los datos en los campos
    if(placas == "" && telefono == ""){
        ons.notification.alert("¡No debe dejar campos vacio!");
    }else{
        if(patronPlaca.test(placas)){
            if(telefono != ""){
                
                var xhttp = new XMLHttpRequest();
                
                xhttp.onreadystatechange = function(){
                    
                    if(this.readyState==4 && this.status == 200){
                        
                        var respuesta = this.responseText;
                        var verificar = parseInt(respuesta);  

                        if(verificar == 0){
                            ons.notification.alert("¡Error en su registro!");
                        }else{
                            
                            localStorage.setItem("Cod", codigo);
                            getPlacas();
                            console.log(this.responseText);
                            
                            var myNavigator = document.getElementById("myNavigator");
                            
                            myNavigator.replacePage("pageMap.html").then(function(){
                                
                                document.getElementById("cent").innerHTML = "Usuario: " + codigo;
                        
                                document.getElementById("valor1").value = localStorage.getItem("Cod");
                                
                            });
                        }
                    }
                };
                
            xhttp.open("GET","http://cuceiMobile.tech/Escuela/altaU.php?codigo=" +codigo+"&nombre="+nombre+"&placas="+placas+"&telefono="+telefono,true);
            xhttp.send();
        
            }else{
                ons.notification.alert("¡El campo telefono está vacío!");
            }
        }else{
            ons.notification.alert("Las placas no tienen el orden correcto.\nEjemplo: ABC-12-12 o AB-12-123.");
        }
    }      
}

//----Función Registrar
function registrar(){
  
    var cod = Math.round(Math.random()*10000);//Numeros aleatorios de 0 a 10000
    //var cod = document.getElementById("valor1").value;
    
    var nom = document.getElementById("nomb").value;
    var pla = document.getElementById("placas").value;
    var tel = document.getElementById("telefono").value;
    var con = document.getElementById("passw").value;
    var patronPlaca = new RegExp("(^[A-Z]{3}-[0-9]{2}-[0-9]{2}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{3}$)");
    
    if(cod == ""){
       var cod = Math.round(Math.random()*10000);//Numeros aleatorios de 0 a 10000
        console.log(cod);
    }
    
    if(nom == "" && pla == "" && tel == "" && con == ""){
        ons.notification.alert("¡No debe dejar campos vacio!");
    }else{
        if(nom != ""){
            if(patronPlaca.test(pla)){
                if(tel != ""){
                    if(con != ""){
                            var xhttp = new XMLHttpRequest();
                        
                            xhttp.onreadystatechange = function(){
                            
                            if(this.readyState==4 && this.status == 200){
                                
                                var respuesta = this.responseText;
                                var verificar = parseInt(respuesta);  

                                if(verificar == 0){
                                    ons.notification.alert("¡Error de registro!");
                                }else{
                                    console.log(pla);
                                    console.log(nom);
                                    localStorage.setItem("Nom", nom);
                                    localStorage.setItem("Pssw", con);
                                    localStorage.setItem("Cod", cod);
                                    getPlacasRegistro();
                                    //console.log(this.responseText);
                            
                                    var myNavigator = document.getElementById("myNavigator");
                                    
                                    myNavigator.replacePage("pageMap.html").then(function(){
                                        document.getElementById("cent").innerHTML += "Usuario: " + cod;
                                       
                                        document.getElementById("cent").value = localStorage.getItem("Cod");
                                       
                                             
                                    });
                                }
                            }
                        };
                        
                        xhttp.open("GET","http://cuceiMobile.tech/Escuela/altaU.php?codigo=" +cod+"&nombre="+nom+"&placas="+pla+"&telefono="+tel+"&password="+con,true);
                        xhttp.send();
                        
                    }else{
                        ons.notification.alert("Contraseña no ingresada");
                    }
                }else{
                    ons.notification.alert("Telefono no ingresado");
                }
            }else{
                ons.notification.alert("Las placas no tienen el orden correcto.\nEjemplo: ABC-12-12 o AB-12-123.");
            }
        }else{
            ons.notification.alert("Nombre no ingresado");
        }
    }  
}
    
//---Función que cambia a la pagina de inscribirse
function inscribirse(){
    var myNavigator = document.getElementById("myNavigator");
    myNavigator.replacePage("pageInsc.html");
}

//----Funcion para cambiar del Splash al Login jnj
function cambiar(){
        //Ejecuta una función, después de esperar un número específico de milisegundos.
        setTimeout(function(){
        var myNavigator = document.getElementById("myNavigator");
        myNavigator.replacePage("pageLogin.html") },2000);
}
    
//-----Función persistencia de datos d
function obtener_sessionStorage(){
    /*Obtener datos almacenados*/
    
    var codigo = localStorage.getItem("Cod");
    var placas = localStorage.getItem("Plc");
   
    console.log("inicioSesion"+codigo)
    console.log("inicioSesion"+placas)
      
    if(codigo != null || placas != null){
        var myNavigator = document.getElementById("myNavigator");
        getPlacas();
        placas = localStorage.getItem("Plc");
                      
        myNavigator.replacePage("pageMap.html").then(function(){
            
            document.getElementById("cent").innerHTML = "Usuario: " +codigo; 
            
           //document.getElementById("valor1").value = localStorage.getItem("Cod");
            document.getElementById("Placas").innerHTML = localStorage.getItem("Plc");
            
        });
           
    }else{
        var myNavigator = document.getElementById("myNavigator");
        myNavigator.pushPage("splash.html");
    }
}

function salir(){
    localStorage.removeItem("Cod");
    localStorage.clear();
    bandera=0;
    clearInterval(refresh2);
    var myNavigator = document.getElementById("myNavigator");
     myNavigator.replacePage ("pageLogin.html")
    
}
function inicio(){
    var myNavigator = document.getElementById("myNavigator");
     myNavigator.replacePage ("pageLogin.html")
}
    
document.addEventListener("deviceready", onDeviceReady, false);
    
function onDeviceReady(){
        //alert("navigator.geolocation works well");

        //var switch1 = document.getElementById("switch-1");
            //ons.notification.alert('Value is ' + switch1.checked);
        navigator.geolocation.getCurrentPosition(geolocationSuccess, [geolocationError], [geolocationOptions]);
}

function CapturaGps(){
    if(localStorage.getItem("flag") != null){
       bandera = localStorage.getItem("flag");
    }  
    if(bandera == 0){
        var x = 1;
        localStorage.setItem("flag", x);
        bandera = localStorage.getItem("flag");
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        ons.notification.alert('Ya ha ocupado un lugar.'); 
    }
                  
}
function eliminarGps(){
    bandera = localStorage.getItem("flag");
        if(bandera==0){
             ons.notification.alert('¡Debe ocupar un lugar!');
        }else{
            var x = 0;
            localStorage.setItem("flag", x);
            
            getPlacas();
            var placas = localStorage.getItem("Plc");

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){

                if(this.readyState==4 && this.status == 200){

                    var respuesta = this.responseText;
                    var verificar = parseInt(respuesta);  

                    if(verificar == 0){

                        ons.notification.alert("¡Error con el servidor!");
                    }else{
                        if(respuesta == 1){
                            bandera=0;
                            eliminarL();
                            ons.notification.alert('Su lugar ahora esta libre.\n ¡Tenga un excelente día!');

                            //actualizar();/
                        }else{
                            ons.notification.alert("¡Ups, ocurrio un error!");
                        }          
                    }
                }
            };
        xhttp.open("GET","https://nestornavarizga.000webhostapp.com/deleteLuegarE.php?placas="+placas,true);
        xhttp.send();
        }

}
function actualizar(){location.reload(true);}
function onError(error){
        ons.notification.alert('code: '  + error.code +    '\n'+
              'message' + error.message + '\n');

}
function getPlacas(){
    
    var cod = localStorage.getItem("Cod");
    //alert("getPlacas" + cod);
    
     var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function(){
            
            if(this.readyState==4 && this.status == 200){
              
                var respuesta = this.responseText;
                var verificar = parseInt(respuesta);  
                
                if(verificar == 0){
                    ons.notification.alert("Error al recuperar las placas");
                }else{
                    
                    var datos = respuesta.split(',');
                    var placas = datos[3];
                    localStorage.setItem("Plc", placas);

                }
            }
        };
    xhttp.open("GET","https://nestornavarizga.000webhostapp.com/selectUser.php?Codigo="+cod+"&Password=",true);
    xhttp.send();
}
function getPlacasRegistro(){
    
    console.log("Entrooo")
    var cod = localStorage.getItem("Cod");
    var pasw = localStorage.getItem("Pssw");
    //alert("getPlacas" + cod);
    
     var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function(){
            
            if(this.readyState==4 && this.status == 200){
              
                var respuesta = this.responseText;
                var verificar = parseInt(respuesta);  
                
                if(verificar == 0){
                    ons.notification.alert("Error al recuperar las placas");
                }else{
                    console.log("Entro 2")
                    var datos = respuesta.split(',');
                    console.log("Respuesta"+respuesta);
                    var placas = datos[3];
                    console.log("Placas"+placas);
                    localStorage.setItem("Plc", placas);

                }
            }
        };
    xhttp.open("GET","https://nestornavarizga.000webhostapp.com/selectUser.php?Codigo="+cod+"&Password="+pasw,true);
    xhttp.send();
}
var onSuccess = function(position){
        /*alert('Latitude: '  + position.coords.latitude  + '\n'+
              'Longitude: ' + position.coords.longitude + '\n');*/
    getPlacas();
    var placas = localStorage.getItem("Plc");
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var ocupado = 1;
    
     var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function(){
            
            if(this.readyState==4 && this.status == 200){
              
                var respuesta = this.responseText;
                var verificar = parseInt(respuesta);  
                
                if(verificar == 0){
                    //Muestra el pop up en el boton
                    ons.notification.alert("¡Error con el servidor!");
                }else{
                    if(respuesta == 1){
                        agregarL();
                       ons.notification.alert('El proceso ha sido un exito.  ¡Disfruta tus clases en CUCEI!');
                         
                       //actualizar();
                    
                    }else{
                        ons.notification.alert("¡Ups, ocurrio un error!");
                    }          
                }
            }
        };
    xhttp.open("GET","https://nestornavarizga.000webhostapp.com/insertLugarE.php?placas="+placas+"&lat="+lat+"&lon="+lon+"&ocupado=1",true);
    xhttp.send();
    
};          
function agregarL(){
       // CapturaGps();
            for(a in array_marcadores){//Elimina los marcadores
                array_marcadores[a].setMap(null);
            }
            array_marcadores = [];
            //navigator.geolocation.getCurrentPosition(onSuccess, onError);
            //alert("Hola, regresé");
            loadmap();


}
function eliminarL(){
        for(a in array_marcadores){//Elimina los marcadores
            array_marcadores[a].setMap(null);
        }
        array_marcadores = [];
        loadmap();
}    
function refresh(){   
    agregarL();
}
