async function cargarCursos() {
  try {
    const response = await fetch("cursos.json");
    const data = await response.json();

    const malla = document.getElementById("malla");

    data.cursos.forEach(curso => {
      const div = document.createElement("div");
      div.classList.add("curso");

      // Estado inicial
      if (curso.estado === "bloqueado") {
        div.classList.add("bloqueado");
      } else if (curso.estado === "aprobado") {
        div.classList.add("aprobado");
      } else if (curso.estado === "actual") {
        div.classList.add("actual", curso.tipo);
      }

      // Tipo de curso
      div.dataset.tipo = curso.tipo;
      div.textContent = curso.nombre;

      // Click → Bloqueado <-> Actual
      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueado")) {
          div.classList.remove("bloqueado", "aprobado");
          div.classList.add("actual", div.dataset.tipo);
        } else if (div.classList.contains("actual")) {
          div.classList.remove("actual", "especialidad", "general", "especifico");
          div.classList.add("bloqueado");
        }
      });

      // Doble clic → Aprobado
      div.addEventListener("dblclick", () => {
        div.classList.remove("bloqueado", "actual", "especialidad", "general", "especifico");
        div.classList.add("aprobado");
      });

      malla.appendChild(div);
    });
  } catch (error) {
    console.error("Error al cargar los cursos:", error);
  }
}

cargarCursos();
