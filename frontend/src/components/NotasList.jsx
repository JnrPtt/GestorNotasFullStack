import {useEffect, useState} from "react";
import {getNotas} from "../services/notaService.js";

export default function NotasList() {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getNotas()
            .then(data => setNotas(data))
            .catch(err => setError(err.message));
    }, [])

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Lista de Notas</h2>
            {notas.length === 0 ? (
                <p>No hay notas aún.</p>
            ) :  (
                <ul>
                    {notas.map(nota => (
                        <li key={nota.id}>
                            <strong>{nota.titulo}</strong> : {nota.contenido}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}