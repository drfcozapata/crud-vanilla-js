/** ARRAY QUE CONTIENE LOS DATOS A MOSTRAR **/
let usersList = [{
        name: "Francisco",
        lastName: "Zapata Millán",
        email: "drfcozapata@gmail.com",
    },
    {
        name: "Daniel",
        lastName: "Meza Miranda",
        email: "daniel@gmail.com",
    },
    {
        name: "Samantha",
        lastName: "López Martínez",
        email: "samy@gmail.com",
    },
];

/** VARIABLE PARA SABER SI CREAR O EDITAR **/
let updateFlag = false,
    updateIndex = null;

/** VARIABLE EN LA QUE VAMOS A GUARDAR EL ELEMENTO HTML DONDE VAMOS A HACER RENDER DEL ARREGLO */
let userListUI = document.getElementById("userList");

/** VARIABLE QUE VA A GUARDAR EL FORMULARIO **/
let userForm = document.getElementById('addUser');

/** FUNCIONES DEL CRUD **/
// Función renderList lee y muestra en el DIV los valores del arreglo
const renderList = () => {
    // Limpiar el DIV principal antes de iniciar forEach
    userListUI.innerHTML = "";
    // Asignamos el array a otra variable
    let userListArray = usersList;

    // Recorro el arreglo para ver cada elemento del mismo
    userListArray.forEach((user, index) => {
        // Contenedor principal que será fila de cada usuario
        const userItemDiv = document.createElement("DIV");
        userItemDiv.setAttribute("class", "userItem");
        userListUI.appendChild(userItemDiv);

        // DIV que contendrá información de cada usuario
        const userInfoDiv = document.createElement("DIV");
        userInfoDiv.setAttribute("class", "userInfo");
        userItemDiv.appendChild(userInfoDiv);

        // H4 que mostrarán información de usuarios para incrustrarla en DIv anterior
        const nameUserDiv = document.createElement("H4");
        const emailUserDiv = document.createElement("H4");
        nameUserDiv.innerText = `${user.name} ${user.lastName}`;
        emailUserDiv.innerText = `${user.email}`;

        userInfoDiv.appendChild(nameUserDiv);
        userInfoDiv.appendChild(emailUserDiv);

        /** BOTONES DE ACCIÓN, para editar o eliminar */
        const actionButtons = document.createElement("DIV");
        actionButtons.setAttribute("class", "actions");
        userItemDiv.append(actionButtons);

        // Botón de Editar (Update)
        const updateBtn = document.createElement("button");

        // Agregué clase, id y addEventListener
        updateBtn.setAttribute("class", "update");
        updateBtn.addEventListener("click", () => updateUser(index, user));
        updateBtn.setAttribute("id", "update");
        updateBtn.innerText = "Editar";

        // Botón para borrar (Delete)
        const deleteBtn = document.createElement("button");

        // Agregué clase, id y addEventListener
        deleteBtn.setAttribute("class", "delete");
        deleteBtn.addEventListener("click", () => deleteUser(index));
        deleteBtn.innerText = "Eliminar";
        deleteBtn.setAttribute("id", "delete");

        // Agrego el botón de Editar y Eliminar
        actionButtons.appendChild(updateBtn);
        actionButtons.appendChild(deleteBtn);
    });
};

/** CREAR Y AGREGAR USUARIO NUEVO **/
const createUpdateUser = event => {
    // Prevengo el comportamiento por Default (recargar la página al hacer click)
    event.preventDefault();

    // SI updateFlag es true, ejecuta lógica para Editar
    if (updateFlag) {
        // Crea un nuevo objeto con los nuevos valores introducidos
        let udpatedUser = {
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastname').value,
            email: document.getElementById('email').value
        };

        // Indicamos al arreglo cambiar el objeto en el lugar que ocupa updateIndex por el nuevo updatedUser
        usersList[updateIndex] = udpatedUser;

        // Reiniciamos nuevamente las variables globales y volvemos a "pintar" el arreglo
        updateFlag = false;
        updateIndex = null;
        renderList();
    } else {
        // SI updateFlag es false, ejecuta lógica para crear
        // Se crea el objeto a agregar en el arreglo
        let user = {
            // Con .value se accede al valor de cada input
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastname').value,
            email: document.getElementById('email').value
        };
        // Se agrega el nuevo objeto al arreglo
        usersList.push(user);
        // Se vuelve a "pintar" el arreglo
        renderList();
    }

    // Para limpiar los cuadros input y dejarlos vacíos
    userForm.reset();
};

/** EDITAR UN USUARIO **/
const updateUser = (index, user) => {
    // Se colocan en los cuadros input los valores del usuario seleccionado
    document.getElementById('name').value = user.name;
    document.getElementById('lastname').value = user.lastName;
    document.getElementById('email').value = user.email;
    // Para que createUpdateUser sepa que tiene que actualizar, se cambia la variable updateFlag a true
    updateFlag = true;
    // Pasamos el index para recuperarlo de createUpdateUser y saber qué elemento actualizar
    updateIndex = index;
};

/** ELIMINAR UN USUARIO (en posición index) **/
const deleteUser = index => {
    // con .splice indicamos eliminar un solo elemento a partir del index
    usersList.splice(index, 1);
    // Se vuelve a "pintar" el arreglo con el nuevo arreglo
    renderList();
};

// Para CREAR elementos, escuchamos el envío del formulario y se ejecuta la función createUpdateUser para agregar un nuevo elemento
userForm.addEventListener('submit', createUpdateUser);
// Indica la carga completa del documento, para "pintar" en arreglo
document.addEventListener("DOMContentLoaded", renderList);