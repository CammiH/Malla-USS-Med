async function cargarMalla() {
  try {
    const response = await fetch("data.json");
    const ciclos = await response.json();
    const contenedor = document.getElementById("malla");
    contenedor.innerHTML = "";

    ciclos.forEach(ciclo => {
      const columna = document.createElement("div");
      const titulo = document.createElement("h2");
      titulo.textContent = ciclo.ciclo;
      columna.appendChild(titulo);

      ciclo.cursos.forEach(curso => {
        const div = document.createElement("div");
        div.classList.add("curso");

        // Estado
        if (curso.estado === "bloqueado") {
          div.classList.add("bloqueado");
        } else if (curso.estado === "aprobado") {
          div.classList.add("aprobado");
        } else {
          div.classList.add(curso.tipo);
        }

        div.textContent = `${curso.codigo} - ${curso.nombre}`;
        columna.appendChild(div);
      });

      contenedor.appendChild(columna);
    });
  } catch (error) {
    console.error("Error cargando la malla:", error);
  }
}

cargarMalla();