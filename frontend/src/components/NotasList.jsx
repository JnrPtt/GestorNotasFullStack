import {useEffect, useState} from "react";
import {getNotasPaginadas} from "../services/notaService.js";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import CrearNota from "./CrearNota.jsx";

export default function NotasList() {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const size = 3;
    const navigate = useNavigate();

    const cargarNotas = () => {
        getNotasPaginadas(page, size)
            .then(data => {
                setNotas(data.content);
                setTotalPages(data.totalPages);
                setError(null);
            })
            .catch(err => setError(err.message));
    };

    useEffect(() => {
        cargarNotas();
    }, [page]);

    const handleNotaCreada = () => {
        setPage(0)
        cargarNotas();
    }

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Lista de Notas</h1>
            <CrearNota onNotaCreada={handleNotaCreada} />
            {notas.length === 0 ? (
                <p>No hay notas aún.</p>
            ) : (
                <ul className="nota-lista">
                    {notas.map(nota => (
                        <li
                            key={nota.id}
                            className="nota-item"
                            onClick={() => navigate(`/nota/${nota.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <strong>
                                <Link
                                    to={`/nota/${nota.id}`}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ cursor: "pointer", color: "inherit", textDecoration: "none" }}
                                >
                                    {nota.titulo}
                                </Link>
                            </strong>
                            <span>{nota.contenido}</span>
                        </li>

                    ))}
                </ul>
            )}

            {totalPages > 1 && (
                <div className="paginacion-container">
                    {totalPages > 2 && (
                        <button className="paginacion-btn" onClick={() => setPage(0)} disabled={page === 0}>
                            Primera
                        </button>
                    )}
                    <button className="paginacion-btn" onClick={() => setPage(page - 1)} disabled={page === 0}>
                        Anterior
                    </button>
                    <span className="paginacion-info">
                        Página {page + 1} de {totalPages}
                    </span>
                    <button className="paginacion-btn" onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
                        Siguiente
                    </button>
                    {totalPages > 2 && (
                        <button className="paginacion-btn" onClick={() => setPage(totalPages - 1)} disabled={page + 1 >= totalPages}>
                            Última
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}