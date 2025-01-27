"use strict"
let carta = [];
let intentos = [];
let segundos = [];
let puntos = [];
let tiempo =[];
intentos[0] = 0;
segundos[0]=0;
carta[0] = document.addEventListener('DOMContentLoaded', (evento) => principal(evento, carta));     
//document.addEventListener('DOMContentLoaded', principal);
    
const Key_MejorTiempo = 'MejorTiempo'; 

let imagenes = 
[
    "imagenes/1.png",
    "imagenes/2.png",
    "imagenes/3.png",
    "imagenes/4.png",
    "imagenes/5.png",
    "imagenes/6.png",
    "imagenes/7.png",
    "imagenes/8.png",
    "imagenes/9.png",
    "imagenes/10.png",
    "imagenes/11.png",
    "imagenes/12.png"
]


function principal(carta,intentos)
{
    
    // const mejorTIempo = JSON.parse(localStorage.getItem(Key_MejorTiempo));
    //  if (mejorTIempo === null || !Array.isArray(mejorTIempo)) 
    // {
    //     const mejorTIempo = JSON.parse(localStorage.getItem(Key_MejorTiempo));

    //     mejorTIempo.push("0");
        
    //     localStorage.setItem(Key_MejorTiempo,JSON.stringify(mejorTIempo))
    

    // }

     // Añadimos evento para cambiar la dificultad
     const $formulario=document.getElementsByTagName('form')[0];
     $formulario.addEventListener('submit',CambiarDificultad);    
     
     const $tablero = document.getElementsByClassName('tablero')[0];
     return carta[0] = $tablero.addEventListener('click', (evento) => tapadas(evento, carta,intentos));  

     
      
}


function CambiarDificultad(evento)
{
    console.log(evento)
    evento.preventDefault();
    puntos[0] =0;
    //iniciamos los intentos a 0 cada vez que se reinicie la partida
    intentos[0]=0;
     let plantillaIntentos = "intentos = " + intentos[0]
     const $intentos = document.getElementsByClassName('intentos')[0];
     $intentos.innerHTML = plantillaIntentos;
    // recojo el formmulario
    const formulario = evento.target;

    // Usa FormData para recoger los valores de los campos del formulario
    const DatosFormulario = new FormData(formulario);

    // Puedes acceder a los valores con `get(nombre_del_campo)`
    const dificultad = DatosFormulario.get('dificultad'); // Cambia 'dificultad' por el nombre del campo de tu formulario´
    
    if(dificultad == "facil")
        {
            construirTablero(4) 
            puntos[0] = 4;  
            
            
        }
        else if(dificultad == "normal")
        {       
            construirTablero(8)
            puntos[0] =8;   
           
            
        }
        else if (dificultad == "dificil")
        {
            construirTablero(12)
            puntos[0] =12;  
            
        }

       

    
}

function construirTablero(num)
{
    let imagenes = [];
    for(let i = 1; i<=num;i++)
        {
            let controlador = 0;
            while(controlador < 2)
            {
                let posicionRabdom =  1 + Math.random() * (num * 2 - 1);//le coloco la posición aleatoria
                posicionRabdom = Math.round(posicionRabdom)
                
                if(typeof(imagenes[posicionRabdom]) !== "string" )
                {
                    imagenes[posicionRabdom] = "imagenes/" + i;
                    controlador++;
                }
            }  
        }  
    const $tablero = document.getElementsByClassName('tablero')[0];
   
    let plantillaImagenes = "";
    for(let i = 1; i < imagenes.length;i++)
    {
        plantillaImagenes += " <div class='fondocarta'><img class='' src=" + imagenes[i] + ".png alt=></div>"
    }
    segundos[0] =0;

    contador(false)
    $tablero.innerHTML = plantillaImagenes;

}

function tapadas(evento, guardada) {
    if (!evento.target.classList.contains("fondocarta")) return; // Verifica que se haga clic en un contenedor válido
    const $carta = evento.target;

    if (!guardada[0]) {
        // Si no hay carta guardada, guarda la actual y gírala
        guardada[0] = $carta;
        $carta.classList.toggle("tapadas");
        return;
    }

    if ($carta !== guardada[0]) {
        // Si la carta actual no es la guardada, gírala
        $carta.classList.toggle("tapadas");

        // Comparar las cartas
        const srcCarta1 = guardada[0].querySelector("img").src; // Obtener la imagen de la primera carta
        const srcCarta2 = $carta.querySelector("img").src; // Obtener la imagen de la segunda carta

        if (srcCarta1 === srcCarta2) {
            // Si coinciden, ambas permanecen visibles
            guardada[0] = undefined; // Reiniciar guardada
            puntos[0]--
            console.log(puntos[0])
        } else {
            // Si no coinciden, esperar antes de girarlas de vuelta
            setTimeout(() => {
                $carta.classList.toggle("tapadas");
                guardada[0].classList.toggle("tapadas");
                guardada[0] = undefined; // Reiniciar guardada
            }, 1000);
        }
    } 

    contarIntentos()
}
   
    
 function contarIntentos()
 {   
    const $intentos = document.getElementsByClassName('intentos')[0];
    
    if(intentos[0] ==0)
    {
        intentos[0]=1
        
    }
    let plantillaIntentos = "intentos = " + intentos[0]
    $intentos.innerHTML = plantillaIntentos;
   
    sumarintento(intentos)
  
}

function sumarintento(intento)
{
    intento[0]++;
}



function contador(fin)
{

        clearInterval(tiempo[0]);
        const $tiempo = document.getElementsByClassName('tiempo')[0];
        $tiempo.innerHTML ="tiempo: " + segundos[0]
        tiempo[0] =
        setInterval
        (
            function() 
            {
                if(puntos[0] <= 0 )
                {
                    
                    fin = true;
                    
                }

                if(fin!=true)
                {
                    console.log("termina")
                    segundos[0] = ++segundos[0]
                    $tiempo.innerHTML ="tiempo: " + segundos[0]
                }
                else
                {
                    clearInterval(tiempo);
                }
                
            },1000
            
        );
    
    
    
    

}

