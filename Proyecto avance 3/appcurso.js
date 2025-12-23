async function cargarCursos() {
    // Consultamos cursos y traemos el nombre del profesor relacionado
    const { data, error } = await supabase
        .from('cursos')
        .select(`
            *,
            profesores ( nombre )
        `);

    if (error) return console.error(error);

    const grid = document.getElementById('grid-cursos');
    grid.innerHTML = '';

    data.forEach(curso => {
        grid.innerHTML += `
            <article class="course-card">
                <div class="card-header">
                    <h3>${curso.nombre_curso}</h3>
                    <span class="badge-credits">${curso.creditos} créditos</span>
                </div>
                <div class="card-body">
                    <span class="course-code">${curso.codigo}</span>
                    <p class="course-desc">${curso.descripcion || 'Sin descripción'}</p>
                    <div class="course-prof">
                        <i class="fas fa-user-tie"></i> 
                        <span>${curso.profesores ? curso.profesores.nombre : 'Sin profesor'}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn-edit-inline" onclick="editarCurso(${curso.id})">
                        <i class="fas fa-pencil-alt"></i> Editar
                    </button>
                    <button class="btn-delete-inline" onclick="eliminarCurso(${curso.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </article>
        `;
    });
}

document.addEventListener('DOMContentLoaded', cargarCursos);