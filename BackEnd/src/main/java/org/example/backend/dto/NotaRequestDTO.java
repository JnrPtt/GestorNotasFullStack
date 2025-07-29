package org.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotaRequestDTO {

    private String titulo;
    private String contenido;

    public NotaRequestDTO() {}

    public NotaRequestDTO(String titulo, String contenido) {
        this.titulo = titulo;
        this.contenido = contenido;
    }
}
