const langButtons = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-section]");

let ultimoIdioma = localStorage.getItem("idioma") || "es";

function traducir(idioma) {
    fetch(`../languages/${idioma}.json`)
        .then(res => res.json())
        .then(data => {
            textsToChange.forEach((el) => {
                const section = el.dataset.section;
                const value = el.dataset.value;
                if (data[section] && data[section][value]) {
                    el.innerHTML = data[section][value];
                }
            });
            ultimoIdioma = idioma;
            localStorage.setItem("idioma", idioma);
        })
        .catch(error => {
            console.error("Error al cargar el idioma:", error);
        });
}
langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const idiomaSeleccionado = button.dataset.language;
        traducir(idiomaSeleccionado);
    });
});

function traducirAlUltimoIdioma() {
    traducir(ultimoIdioma);
}
document.addEventListener("DOMContentLoaded", () => {
    traducirAlUltimoIdioma();
});