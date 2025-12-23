const form = document.getElementById('formRegistro');

form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    // Identificar en qué tabla insertar según el título del modal
    const tabla = document.getElementById('modalTitle').innerText.toLowerCase().includes('estudiante') 
                  ? 'estudiantes' : 'profesores';

    const { data, error } = await supabase
        .from(tabla)
        .insert([datos]);

    if (error) {
        alert("Error al guardar: " + error.message);
    } else {
        alert("¡Registro exitoso!");
        cerrarModal();
        location.reload(); // Recargar para ver los cambios
    }
};