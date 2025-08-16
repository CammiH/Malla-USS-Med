async function cargarCursos() {
  const response = await fetch("data.json");
  const cursos = await response.json();

  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.classList.add("curso", curso.tipo, curso.estado);
    div.textContent = curso.nombre;

    // 👉 interacción con clic
    div.addEventListener("click", () => {
      if (curso.estado === "actual") {
        curso.estado = "aprobado"; // al hacer click pasa a aprobado
      } else if (curso.estado === "bloqueado") {
        curso.estado = "actual"; // desbloqueado pasa a actual
      }
      guardarEstado(cursos); // guardamos los cambios
      renderizar(cursos);   // volvemos a pintar
    });

    contenedor.appendChild(div);
  });
}

function renderizar(cursos) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.classList.add("curso", curso.tipo, curso.estado);
    div.textContent = curso.nombre;

    div.addEventListener("click", () => {
      if (curso.estado === "actual") {
        curso.estado = "aprobado";
      } else if (curso.estado === "bloqueado") {
        curso.estado = "actual";
      }
      guardarEstado(cursos);
      renderizar(cursos);
    });

    contenedor.appendChild(div);
  });
}

function guardarEstado(cursos) {
  localStorage.setItem("cursos", JSON.stringify(cursos));
}

async function iniciar() {
  let cursosGuardados = localStorage.getItem("cursos");
  if (cursosGuardados) {
    renderizar(JSON.parse(cursosGuardados));
  } else {
    await cargarCursos();
  }
}

iniciar();
