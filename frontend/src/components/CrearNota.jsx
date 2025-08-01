import {useState} from "react";
import {crearNota} from "../services/notaService.js";

export default function CrearNota({ onNotaCreada}) {
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!titulo.trim() || !contenido.trim()) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            const nuevaNota = await crearNota({titulo, contenido});
            onNotaCreada(nuevaNota);
            setTitulo("");
            setContenido("");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Crear Nueva Nota</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
            />
            <br/>
            <textarea
                placeholder="Contenido"
                value={contenido}
                onChange={e => setContenido(e.target.value)}
            />
            <br/>
            <button className="crear-btn" type="submit">Crear</button>
        </form>
    )
}