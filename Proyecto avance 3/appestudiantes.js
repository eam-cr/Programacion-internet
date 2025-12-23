// Función para listar y mostrar con el diseño de tu imagen
async function cargarEstudiantes() {
    const { data, error } = await supabase.from('estudiantes').select('*');
    if (error) return console.error(error);

    const tabla = document.getElementById('cuerpo-tabla');
    tabla.innerHTML = '';

    data.forEach(est => {
        // Generar iniciales para el avatar circular (ej: Carlos Rodríguez -> CR)
        const iniciales = est.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        
        tabla.innerHTML += `
            <tr>
                <td>
                    <div class="user-cell">
                        <span class="avatar">${iniciales}</span>
                        <strong>${est.nombre}</strong>
                    </div>
                </td>
                <td>${est.email}</td>
                <td>${est.fecha_nacimiento}</td>
                <td><span class="badge-carrera">${est.carrera}</span></td>
                <td>
                    <button class="btn-edit" onclick="editar(${est.id})"><i class="fas fa-pencil-alt"></i></button>
                    <button class="btn-delete" onclick="eliminar(${est.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Lógica de Búsqueda (Filtro básico solicitado en el punto 2 del alcance)
async function filtrarEstudiantes() {
    const query = document.getElementById('inputBuscar').value;
    const { data } = await supabase
        .from('estudiantes')
        .select('*')
        .or(`nombre.ilike.%${query}%,email.ilike.%${query}%,carrera.ilike.%${query}%`);
    
    // Aquí llamarías a una función de renderizado similar a cargarEstudiantes(data)
}

const inputBuscar = document.getElementById('inputBuscar');

inputBuscar.addEventListener('input', async (e) => {
    const valor = e.target.value;

    // Buscamos en las columnas nombre, email o carrera
    const { data, error } = await supabase
        .from('estudiantes')
        .select('*')
        .or(`nombre.ilike.%${valor}%,email.ilike.%${valor}%,carrera.ilike.%${valor}%`);

    if (!error) {
        renderizarTablaEstudiantes(data); // Función que dibuja las filas
    }
});async function eliminarRegistro(id, tabla) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este registro?");
    
    if (confirmacion) {
        const { error } = await supabase
            .from(tabla)
            .delete()
            .eq('id', id);

        if (error) {
            alert("Error al eliminar: " + error.message);
        } else {
            alert("Registro eliminado con éxito.");
            location.reload(); // Recarga la página para actualizar la lista
        }
    }
}