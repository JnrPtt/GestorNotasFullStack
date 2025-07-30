import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotasList from "./components/NotasList.jsx";
import NotaDetalle from "./components/NotaDetalle.jsx";
import EditarNota from "./components/EditarNota.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<NotasList/>}/>
            <Route path="/nota/:id" element={<NotaDetalle/>}/>
            <Route path="/nota/:id/editar" element={<EditarNota/>}/>
        </Routes>
    )
}

export default App
