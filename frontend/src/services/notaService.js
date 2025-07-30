const API_URL = "http://localhost:8080/api/notas"
const API_URL_PAGINADA = "http://localhost:8080/api/notas/paginadas"


export async function getNotas() {
    const response = await fetch(API_URL);
    if(!response.ok) {
        throw new Error("Error al obtener las notas")
    }
    return response.json()
}

export async function crearNota(nota) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nota)
    });
    if(!response.ok) {
        throw new Error("Error al crear la nota")
    }
    return response.json()
}

export async function actualizarNota(id, nota) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nota)
    });
    if(!response.ok) {
        throw new Error("Error al actualizar la nota")
    }
    return response.json()
}

export async function eliminarNota(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    if(!response.ok) {
        throw new Error("Error al eliminar la nota")
    }
    return true;
}

export async function getNotasPaginadas(page = 0, size = 3) {
    const response = await fetch(`${API_URL_PAGINADA}?page=${page}&size=${size}`);
    if(!response.ok) {
        throw new Error("Error al obtener las notas")
    }
    return response.json()
}

export async function getNotaById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok) {
        throw new Error("Error al obtener la nota por Id")
    }
    return response.json()
}