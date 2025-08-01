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
            navigate(`/nota/${id}`); // Volver al detalle tras guardar
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <div className="error-message">Error: {error}</div>;
    if (!titulo && !contenido) return <div>Cargando...</div>;

    return (
        <div className="editar-nota-container">
            <h2>Editar Nota</h2>
            <form onSubmit={handleSubmit} className="editar-nota-form">
                <div className="form-group">
                    <label htmlFor="titulo">Título:</label><br />
                    <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contenido">Contenido:</label><br />
                    <textarea
                        id="contenido"
                        value={contenido}
                        onChange={e => setContenido(e.target.value)}
                        required
                        className="textarea-field"
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
