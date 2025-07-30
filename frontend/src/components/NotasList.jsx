import {useEffect, useState} from "react";
import {getNotasPaginadas} from "../services/notaService.js";
import { Link } from "react-router-dom";
import CrearNota from "./CrearNota.jsx";

export default function NotasList() {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const size = 3;

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
            <h2>Lista de Notas</h2>
            <CrearNota onNotaCreada={handleNotaCreada} />
            {notas.length === 0 ? (
                <p>No hay notas aún.</p>
            ) : (
                <ul>
                    {notas.map(nota => (
                        <li key={nota.id}>
                            <strong>
                                <Link to={`/nota/${nota.id}`}>{nota.titulo}</Link>
                            </strong> : {nota.contenido}
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <button onClick={() => setPage(0)} disabled={page === 0}>
                    Primera
                </button>
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                    Anterior
                </button>
                <span>
                    Página {page + 1} de {totalPages}
                </span>
                <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
                    Siguiente
                </button>
                <button onClick={() => setPage(totalPages - 1)} disabled={page + 1 >= totalPages}>
                    Última
                </button>
            </div>
        </div>
    );
}