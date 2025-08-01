import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {eliminarNota, getNotaById} from "../services/notaService.js";
import { Link } from "react-router-dom";

export default function NotaDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nota, setNota] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getNotaById(id)
            .then(data => {
                setNota(data);
                setError(null);
            })
            .catch(err => setError(err.message));
    }, [id]);

    const handleEliminar = async () => {
        if (window.confirm("¿Seguro que quieres eliminar la nota?")) {
            setLoading(true);
            try {
                await eliminarNota(id);
                navigate("/");
            } catch {
                setError("Error al eliminar la nota");
            }
            setLoading(false);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!nota) return <div>Cargando...</div>;

    return (
        <div className="nota-detalle">
            <h2>Detalle de la Nota</h2>
            <p><strong>Título:</strong> {nota.titulo}</p>
            <p><strong>Contenido:</strong> {nota.contenido}</p>
            <p><strong>ID:</strong> {nota.id}</p>

            <div className="botones">
                <Link to={`/nota/${id}/editar`}>
                    <button>Editar Nota</button>
                </Link>

                <button onClick={handleEliminar} disabled={loading}>
                    {loading ? "Eliminando..." : "Eliminar Nota"}
                </button>

                <button onClick={() => navigate(-1)}>Volver</button>
            </div>
        </div>
    );

}