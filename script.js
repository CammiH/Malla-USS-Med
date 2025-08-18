function toggleEstado(curso) {
  if (curso.classList.contains("bloqueado")) {
    curso.classList.remove("bloqueado");
    curso.classList.add("desbloqueado");
  } else if (curso.classList.contains("desbloqueado")) {
    curso.classList.remove("desbloqueado");
    curso.classList.add("aprobado");
  } else if (curso.classList.contains("aprobado")) {
    curso.classList.remove("aprobado");
    curso.classList.add("bloqueado");
  }
}
