package org.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotaResponseDTO {

    private Long id;
    private String titulo;
    private String contenido;
    private String fechaCreacion;

    public NotaResponseDTO() {}

    public NotaResponseDTO(Long id, String titulo, String contenido, String fechaCreacion) {
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
    }
}
