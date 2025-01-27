"use strict"

document.addEventListener('DOMContentLoaded', principal);
    
const KEY_TAREAS = 'tareas'; 
const KEY_TAREAS_COMPLETADAS = 'tareasCompletadas'; 
function principal()
{
     // Añadimos evento para gestionar alta de tareas
     const $formulario=document.getElementsByTagName('form')[0];
     $formulario.addEventListener('submit',MeterTarea);    
     
     // Añadimos evento para eliminar un tareas
     const $Clasetareas = document.getElementsByClassName('tareas')[0];
     $Clasetareas.addEventListener('click',ComletarTarea);

     const $ClasetareasCompletadas = document.getElementsByClassName('completadas')[0];
     $ClasetareasCompletadas.addEventListener('click',EliminarTarea);
 
     // Mostramos el contenido de localStorage
     
     const tareas = JSON.parse(localStorage.getItem(KEY_TAREAS));
     const tareasCompletadas = JSON.parse(localStorage.getItem(KEY_TAREAS_COMPLETADAS));
     if (tareas === null || !Array.isArray(tareas)) 
    {
        localStorage.setItem(KEY_TAREAS,'[]');

    }
    if (tareasCompletadas === null || !Array.isArray(tareasCompletadas)) 
    {
        localStorage.setItem(KEY_TAREAS_COMPLETADAS,'[]');
        return
    }
     let listadotareas = tareas.map(t=>`
         <li data-id="${t.id}">
             ${t.tarea} ${t.fecha} 
             <button type="button">Completar</button>
         </li>`).join('');

    let listadotareasCompletadas = tareasCompletadas.map(t=>`
        <li data-id="${t.id}">
            ${t.tarea} ${t.fecha} 
            <button type="button">Eliminar</button>
        </li>`).join('');
        
    let plantilla =
     `
    <h1>TAREAS</h1>
    <ul>${listadotareas}</ul>
    `
    ;
    let plantillaCompletadas = 
    ` 
        <h1>TAREAS COMPLETADAS</h1>
        <button>Eliminar completadas </button> 
        <ul>${listadotareasCompletadas}</ul>
    `;
    const $contenidoCompletadas = document.getElementsByClassName('completadas')[0];
    const $contenido = document.getElementsByClassName('tareas')[0];
    $contenido.innerHTML = plantilla;
    $contenidoCompletadas.innerHTML = plantillaCompletadas;
}


function MeterTarea(evento){
    // bloqueamos la acción por defecto del submit, para permanecer en esta página
    evento.preventDefault();
    console.log(evento);    
    // ponemos como id el timestamp como cadena
    const tareas = JSON.parse(localStorage.getItem(KEY_TAREAS));
    let tarea;
    if(tareas.length == 0)
    {
        tarea = {
            id: String(1),
            tarea: evento.target.nombreTarea.value,
            fecha: evento.target.fecha.value
        };
    }
    else{
        tarea = {
            id: String(parseInt(tareas[tareas.length -1].id) +1 ),
            tarea: evento.target.nombreTarea.value,
            fecha: evento.target.fecha.value,
            fechaEntrega: evento.target.fecha.value
        };
    }
    

    // añadimos tarea a localStorage
    tareas.push(tarea);
    localStorage.setItem(KEY_TAREAS,JSON.stringify(tareas))

    // añadimos tareas al DOM
    const $contenido = document.getElementsByClassName('tareas')[0];
    const nuevoLI = `
        <li data-id="${tarea.id}">
            ${tarea.tarea} ${tarea.fecha} 
            <button type="button">Completar</button>
        </li>`;
    //$contenido.firstElementChild es la lista UL
    $contenido.children[1].innerHTML += nuevoLI;
}


function ComletarTarea(evento){

    // salida prematura si el target no es un botón
    if (evento.target.tagName!=='BUTTON') return;
    if (evento.target.textContent !== 'Completar') return;

    // evento.target.parentElement es el <li>
    // dataset.id hace referencia al atributo html data-id del <li>
    
    CompletarTareaDeLocalStorage(evento.target.parentElement.dataset.id);

    // eliminamos el tareas del DOM
    evento.target.parentElement.remove(); 
}

function CompletarTareaDeLocalStorage(idTarea){
    // obtener tareas de localStorage
    const tareas = JSON.parse(localStorage.getItem(KEY_TAREAS));
    let tarea = extraerTarea(tareas,idTarea)
     // añadimos tarea a localStorage
     const tareasCompletadas = JSON.parse(localStorage.getItem(KEY_TAREAS_COMPLETADAS));
     tareasCompletadas.push(tarea);
     localStorage.setItem(KEY_TAREAS_COMPLETADAS,JSON.stringify(tareasCompletadas))
 
     // añadimos tareas al DOM
     const $contenido = document.getElementsByClassName('completadas')[0];
     const nuevoLI = `
         <li data-id="${tarea.id}">
             ${tarea.tarea} ${tarea.fecha} ${tarea.fechaEntrega}
             <button type="button">Eliminar</button>
         </li>`;
     //$contenido.firstElementChild es la lista UL
    $contenido.children[2].innerHTML += nuevoLI;
    // nos quedamos con un nuevo array sin la tarea con id igual a idtareas
    const tareasFiltrados = tareas.filter(t=>t.id!==idTarea);

    // actualizamos localStorage con la nueva lista de tareas
    localStorage.setItem(KEY_TAREAS, JSON.stringify(tareasFiltrados));
}


function EliminarTareaDeLocalStorage(idTarea){
    // obtener tareas de localStorage
    const tareas = JSON.parse(localStorage.getItem(KEY_TAREAS_COMPLETADAS));
    // nos quedamos con un nuevo array sin la tarea con id igual a idtareas
    const tareasFiltrados = tareas.filter(t=>t.id!==idTarea);

    // actualizamos localStorage con la nueva lista de tareas
    localStorage.setItem(KEY_TAREAS_COMPLETADAS, JSON.stringify(tareasFiltrados));
}


function EliminarTarea(evento){

    // salida prematura si el target no es un botón
    
    if (evento.target.tagName!=='BUTTON') return;
    if (evento.target.textContent == 'Eliminar') 
    {
    // evento.target.parentElement es el <li>
    // dataset.id hace referencia al atributo html data-id del <li>
    
    EliminarTareaDeLocalStorage(evento.target.parentElement.dataset.id);

    // eliminamos el tareas del DOM
    evento.target.parentElement.remove(); 
    }
    else {
        const $contenido = document.getElementsByClassName('completadas')[0];
        $contenido.children[2].innerHTML = [];
        localStorage.setItem(KEY_TAREAS_COMPLETADAS,'[]');       
    }

   
}

function extraerTarea(tareas,id)
{
    for(let value of tareas)
    {
        if(value.id == id)
        {
            console.log(value)
            value.fechaEntrega = new Date().toISOString().split('T')[0];
            return value;
            
        }      
    }
}