package org.example.backend.mapper;

import org.example.backend.dto.NotaRequestDTO;
import org.example.backend.dto.NotaResponseDTO;
import org.example.backend.model.Nota;

public class NotaMapper {

    public static NotaResponseDTO toResponseDTO(Nota nota) {
        if(nota == null){
            return null;
        }

        return new NotaResponseDTO(
                nota.getId(),
                nota.getTitulo(),
                nota.getContenido(),
                nota.getFechaCreacion() != null ? nota.getFechaCreacion().toString() : null
        );
    }

    public static Nota toEntity(NotaRequestDTO dto) {
        if(dto == null) return null;

        Nota nota = new Nota();
        nota.setTitulo(dto.getTitulo());
        nota.setContenido(dto.getContenido());

        return nota;
    }

    public static void updateEntityFromDTO(NotaRequestDTO dto, Nota nota) {
        if(dto == null || nota == null) return;

        nota.setTitulo(dto.getTitulo());
        nota.setContenido(dto.getContenido());
    }
}
