const anadir = document.getElementById('anadir');
const nombre = document.getElementById('nombre');
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const listaEmpleados = document.getElementById('listaEmpleados');
const calcular = document.getElementById('calcular');
const refrescar = document.getElementById('refrescar');
const empleados = [];
let resultado = 0;
let propinaHora = 0;

const fragment1 = document.createDocumentFragment();
const fragment2 = document.createDocumentFragment();
const fragment3 = document.createDocumentFragment();

const arrayHoras = []

const arrayMinutos = [0, 15, 30, 45]

for (let numero = 0; numero < 100; numero++) {
    arrayHoras.push(numero);
}

arrayHoras.forEach(element => {
    const item = document.createElement('option');
    item.textContent = element;
    fragment1.appendChild(item);
});

arrayMinutos.forEach(element => {
    const item = document.createElement('option');
    item.textContent = element;
    fragment2.appendChild(item);
});

horas.appendChild(fragment1);
minutos.appendChild(fragment2);

anadir.addEventListener("click", (e) => {
    e.preventDefault();

    let crearUsuario = true;

    for (objeto of empleados) {
        if (objeto.nombre == nombre.value) {
            crearUsuario = false;
        }
    }

    if (crearUsuario) {

        let tiempo = 0;

        const div = document.createElement('div');
        div.className = 'grid';
        listaEmpleados.appendChild(div);
        const itemEmpleado = document.createElement('li');
        itemEmpleado.textContent = nombre.value;
        div.appendChild(itemEmpleado);
        const itemHoras = document.createElement('li');
        itemHoras.textContent = horas.value;
        div.appendChild(itemHoras);
        const itemMinutos = document.createElement('li');
        itemMinutos.textContent = minutos.value;
        div.appendChild(itemMinutos);
        const itemTotal = document.createElement('li');
        itemTotal.textContent = 0;
        div.appendChild(itemTotal);
        const itemEliminar = document.createElement('span');
        itemEliminar.textContent = 'X';
        itemEliminar.className = 'itemEliminar';

        switch (minutos.value) {
            case '0':
                tiempo = parseInt(horas.value);
                break;
            case '15':
                tiempo = parseInt(horas.value) + 0.25;
                break;
            case '30':
                tiempo = parseInt(horas.value) + 0.50;
                break;
            case '45':
                tiempo = parseInt(horas.value) + 0.75;
                break;
        }

        const empleado = {
            "nombre": nombre.value,
            "tiempo": tiempo
        };

        empleados.push(empleado);

        nombre.value = '';
        horas.value = 0;
        minutos.value = 0;

        div.appendChild(itemEliminar);
        itemEliminar.addEventListener('click', (e) => {

            let index = 0;
            for (objeto of empleados) {

                if (objeto.nombre == itemEliminar.parentElement.children[0].textContent) {
                    empleados.splice(index, 1);
                    break;
                }

                index++;
            }

            div.parentElement.removeChild(div);
        })
    }
});


calcular.addEventListener('click', (e) => {
    e.preventDefault();

    const totalPropinas = document.getElementById('totalPropinas');
    let totalHoras = 0;

    for (objeto of empleados) {
        totalHoras += objeto.tiempo;
    }

    propinaHora = parseFloat(totalPropinas.value) / totalHoras;

    let posicionDiv = 1;

    empleados.forEach(objeto => {

        resultado = (parseFloat(propinaHora) * parseFloat(objeto.tiempo)).toFixed(2);
        listaEmpleados.children[posicionDiv].children[3].textContent = resultado;

        posicionDiv++;
    });
})

refrescar.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload(true);
})