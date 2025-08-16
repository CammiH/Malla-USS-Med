async function cargarCursos() {
  const response = await fetch("data.json");
  const cursos = await response.json();
  return cursos;
}

function crearCurso(curso, estado = "bloqueado") {
  const div = document.createElement("div");
  div.classList.add("curso", curso.tipo, estado);
  div.dataset.codigo = curso.codigo;
  div.innerText = curso.nombre;

  // Evento clic para alternar estados
  div.addEventListener("click", () => {
    if (div.classList.contains("desbloqueado")) {
      // Pasa a aprobado
      div.classList.remove("desbloqueado");
      div.classList.add("aprobado");
      desbloquearDependientes(curso.codigo);

    } else if (div.classList.contains("aprobado")) {
      // Vuelve a bloqueado
      div.classList.remove("aprobado");
      div.classList.add("bloqueado");
      reBloquearDependientes(curso.codigo);
    }
  });

  return div;
}

let listaCursos = [];

function renderCursos(cursos) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  cursos.forEach(curso => {
    let estado = "bloqueado";

    // desbloqueado si no tiene prerequisitos
    if (curso.prerequisitos.length === 0) {
      estado = "desbloqueado";
    }

    const divCurso = crearCurso(curso, estado);
    contenedor.appendChild(divCurso);
  });

  listaCursos = cursos;
}

function desbloquearDependientes(codigo) {
  listaCursos.forEach(curso => {
    if (curso.prerequisitos.includes(codigo)) {
      const div = document.querySelector(`[data-codigo="${curso.codigo}"]`);
      if (div.classList.contains("bloqueado")) {
        // verificamos si TODOS los prerequisitos ya están aprobados
        const todosAprobados = curso.prerequisitos.every(pre => {
          const divPre = document.querySelector(`[data-codigo="${pre}"]`);
          return divPre.classList.contains("aprobado");
        });

        if (todosAprobados) {
          div.classList.remove("bloqueado");
          div.classList.add("desbloqueado");
        }
      }
    }
  });
}

function reBloquearDependientes(codigo) {
  listaCursos.forEach(curso => {
    if (curso.prerequisitos.includes(codigo)) {
      const div = document.querySelector(`[data-codigo="${curso.codigo}"]`);
      if (div.classList.contains("desbloqueado") || div.classList.contains("aprobado")) {
        // Se bloquea de nuevo
        div.classList.remove("desbloqueado", "aprobado");
        div.classList.add("bloqueado");

        // Rebloqueo en cadena
        reBloquearDependientes(curso.codigo);
      }
    }
  });
}

// Inicializar
cargarCursos().then(renderCursos);
