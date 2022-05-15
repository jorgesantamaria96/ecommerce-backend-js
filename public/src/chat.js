const socket = io();

socket.on("renderchat", ()=>{
    renderChat()
})

function renderChat(){
    const tabla = document.getElementById('tBodyChat');
    const url = '/api/chat';

    /* Funcion fetch para traerme el historial de chat mediante GET */
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        /* Todo OK borro el contenido viejo de la tabla y escribo el nuevo */
        tabla.innerHTML="";
        for (const chat of data.messages) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `<strong><font color="blue">${chat.author}</font></strong>`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `${chat.type}`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<i><font color="green">${chat.body}</font></i>`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
        
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function enviarChat(evt){

    /* Armando request para la funcion fetch */
    const url = '/api/chat';
    let data = {
        msg: document.getElementById('msg').value
    }

    const request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    };
    evt.preventDefault();
    /* Funcion fetch para postear un nuevo mensaje del chat */
    fetch(url, request)
        .then(function() {
            /* Todo OK renderizo la tabla para todos los clientes conectados y borro la info del input del mensaje */
            document.getElementById('msg').value = "";
            socket.emit("chat", "");
    });

    //return false;
}