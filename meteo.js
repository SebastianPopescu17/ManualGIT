window.onload = function () {
    inicializarApp();
};

// Función para inicializar la aplicación
function inicializarApp() {
    let formularioClima = document.getElementById('formularioClima');
    formularioClima.addEventListener('submit', obtenerDatosClima);
}

// Validación de la ciudad usando RegExp
function validarCiudad(ciudad) {
    let ciudadRegex = /^[a-zA-Z\s]+$/;  
    return ciudadRegex.test(ciudad);
}

// Obtener clima actual
async function obtenerDatosClima(evento) {
    evento.preventDefault();
    let ciudad = document.getElementById('ciudad').value.trim();

    // Validar la ciudad
    if (!validarCiudad(ciudad)) {
        alert("Por favor, ingresa una ciudad válida (solo letras y espacios).");
        return;
    }

    if (ciudad) {
        // Guardar la ciudad en el historial (localStorage)
        let historial = JSON.parse(localStorage.getItem('historial')) || [];
        if (!historial.includes(ciudad)) {
            historial.push(ciudad);  
            localStorage.setItem('historial', JSON.stringify(historial));  
        }

        // Llamar a las funciones de clima actual, pronóstico y alertas
        obtenerClimaActual(ciudad);
        obtenerPronostico(ciudad);
        obtenerAlertas(ciudad);
        let fecha = "2023-10-01"; 
        guardarBusquedaEnHistorial(ciudad); 
    }
}

// Obtener clima actual
async function obtenerClimaActual(ciudad) {
    try {
        let respuesta = await fetch(`https://api.weatherapi.com/v1/current.json?key=ba39142e13724f60817164842241711&q=${ciudad}&lang=es`);
        let datos = await respuesta.json();

        let climaActualHTML = `
            <h3>Clima actual en ${datos.location.name}</h3>
            <p>Temperatura: ${Math.round(datos.current.temp_c)}°C</p> <!-- Usamos Math.round para redondear -->
            <p>Descripción: ${datos.current.condition.text}</p>
            <img src="https:${datos.current.condition.icon}" alt="${datos.current.condition.text}">
        `;

        // Mostrar el clima actual en la página
        document.getElementById('climaActual').innerHTML = climaActualHTML;

        // Cargar la información de la ciudad en el iframe
        cargarDatosCiudadEnIframe(datos.location);
    } catch (error) {
        console.error('Error al obtener el clima actual:', error);
    }
}

// Obtener pronóstico de 3 días
async function obtenerPronostico(ciudad) {
    try {
        let respuesta = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ba39142e13724f60817164842241711&q=${ciudad}&days=3&lang=es`);
        let datos = await respuesta.json();

        let pronosticoHTML = `<h3>Pronóstico para los próximos 3 días en ${datos.location.name}</h3>`;
        datos.forecast.forecastday.forEach(dia => {
            pronosticoHTML += `
                <div>
                    <h4>${new Date(dia.date).toLocaleDateString()}</h4>
                    <p>Temperatura: ${Math.round(dia.day.avgtemp_c)}°C</p> <!-- Usamos Math.round para redondear -->
                    <p>Descripción: ${dia.day.condition.text}</p>
                    <img src="https:${dia.day.condition.icon}" alt="${dia.day.condition.text}">
                </div>
            `;
        });

        document.getElementById('pronosticoClima').innerHTML = pronosticoHTML;
    } catch (error) {
        console.error('Error al obtener el pronóstico:', error);
    }
}


// Obtener alertas meteorológicas
async function obtenerAlertas(ciudad) {
    try {
        let respuesta = await fetch(`https://api.weatherapi.com/v1/alerts.json?key=ba39142e13724f60817164842241711&q=${ciudad}&lang=es`);
        let datos = await respuesta.json();

        if (datos.alerts && datos.alerts.length > 0) {
            let alertasHTML = '<h3>Alertas Meteorológicas:</h3>';
            datos.alerts.forEach(alerta => {
                alertasHTML += `
                    <div>
                        <h4>${alerta.headline}</h4>
                        <p>${alerta.description}</p>
                    </div>
                `;
            });

            document.getElementById('alertasClima').innerHTML = alertasHTML;
        } else {
            document.getElementById('alertasClima').innerHTML = '<p>No hay alertas meteorológicas activas.</p>';
        }
    } catch (error) {
        console.error('Error al obtener alertas meteorológicas:', error);
    }
}

// Función para cargar los datos de la ciudad en el iframe
async function cargarDatosCiudadEnIframe(datosCiudad) {
    // Obtener la imagen de la ciudad desde Unsplash
    let imagenCiudad = await obtenerImagenCiudad(datosCiudad.name);
    // Obtener la población desde la API RestCountries
    let poblacion = await obtenerPoblacionPais(datosCiudad.country);

    let iframe = window.frames['marcoClima'];
    let doc = iframe.document;

    doc.open();
    doc.write(`
        <html>
            <head>
                <title>Información de ${datosCiudad.name}</title>
            </head>
            <body>
                <h3>Información de ${datosCiudad.name}</h3>
                <p><strong>País:</strong> ${datosCiudad.country}</p>
                <p><strong>Población del País:</strong> ${poblacion}</p>
                <p><strong>Región:</strong> ${datosCiudad.region}</p>
                <p><strong>Latitud:</strong> ${datosCiudad.lat}</p>
                <p><strong>Longitud:</strong> ${datosCiudad.lon}</p>
                
                <img src="${imagenCiudad}" alt="Imagen de ${datosCiudad.name}" style="width: 100%; height: auto;">
            </body>
        </html>
    `);
    doc.close();
}

// Función para obtener la imagen de la ciudad desde Unsplash
async function obtenerImagenCiudad(ciudad) {
    let url = `https://api.unsplash.com/search/photos?query=${ciudad}&client_id=PYNpomYSn669T4Ln1wk65HcynB-Qvaa7uaFOjnN_wVY`;

    try {
        let respuesta = await fetch(url);
        let datos = await respuesta.json();

        if (datos.results && datos.results.length > 0) {
            return datos.results[0].urls.regular;
        } else {
            return 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
        }
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        return 'https://via.placeholder.com/600x400?text=Error+al+obtener+la+imagen';
    }
}

// Función para obtener la población desde RestCountries API
async function obtenerPoblacionPais(pais) {
    let url = `https://restcountries.com/v3.1/name/${pais}?fullText=true`;

    try {
        let respuesta = await fetch(url);
        let datos = await respuesta.json();

        if (datos && datos.length > 0) {
            return datos[0].population.toLocaleString();
        } else {
            return 'Información no disponible';
        }
    } catch (error) {
        console.error('Error al obtener la población:', error);
        return 'Información no disponible';
    }
}
    //Función para guardar el historial de búsqueda
function guardarBusquedaEnHistorial(ciudad) {
    // Realizar una solicitud AJAX para guardar el historial en la base de datos
    let formData = new FormData();
    formData.append('ciudad', ciudad);

    fetch('guardar_historial.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Mostrar el resultado de la solicitud
    })
    .catch(error => {
        console.error('Error al guardar la búsqueda:', error);
    });
}


// Cargar y mostrar el historial de búsquedas en una tabla
function cargarHistorialDeBusquedas() {
    // Realizar una solicitud AJAX para obtener el historial desde la base de datos
    fetch('consultar_historial.php')
        .then(response => response.json())
        .then(historial => {
            if (historial.length === 0) {
                document.getElementById('historial').innerHTML = "<p>No tienes historial de búsquedas.</p>";
            } else {
                let historialHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ciudad</th>
                                <th>Fecha de Búsqueda</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                
                historial.forEach((busqueda, index) => {
                    historialHTML += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${busqueda.ciudad}</td>
                            <td>${busqueda.fecha}</td>
                        </tr>
                    `;
                });

                historialHTML += `
                        </tbody>
                    </table>
                `;
                document.getElementById('historial').innerHTML = historialHTML;
            }
        })
        .catch(error => {
            console.error('Error al cargar el historial:', error);
        });
}


// Función para limpiar los datos mostrados en la pantalla
function limpiarPantalla() {
    // Limpiar el contenido de los elementos de la página
    document.getElementById('climaActual').innerHTML = '';
    document.getElementById('pronosticoClima').innerHTML = '';
    document.getElementById('alertasClima').innerHTML = '';
    document.getElementById('marcoClima').contentWindow.document.body.innerHTML = '';
}
// Implementación de clases con herencia
class Ciudad {
    constructor(nombre, pais) {
        this.nombre = nombre;
        this.pais = pais;
    }
}

class Pronostico extends Ciudad {
    constructor(nombre, pais, pronostico) {
        super(nombre, pais);
        this.pronostico = pronostico;
    }

    mostrarPronostico() {
        return `${this.nombre}, ${this.pais}: ${this.pronostico}`;
    }
}

