import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNotaById, actualizarNota } from "../services/notaService.js";

export default function EditarNota() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        getNotaById(id)
            .then(data => {
                setTitulo(data.titulo);
                setContenido(data.contenido);
                setError(null);
            })
            .catch(err => setError(err.message));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizarNota(id, { titulo, contenido });
            navigate(`/nota/${id}`); // volver al detalle tras guardar
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!titulo && !contenido) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Editar Nota</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label><br />
                    <input
                        type="text"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contenido:</label><br />
                    <textarea
                        value={contenido}
                        onChange={e => setContenido(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
            </form>
        </div>
    );
}
