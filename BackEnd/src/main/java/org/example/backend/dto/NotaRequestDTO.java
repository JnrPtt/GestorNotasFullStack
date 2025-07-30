package org.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotaRequestDTO {

    @NotBlank(message = "El título no puede estar vacío")
    private String titulo;

    @NotBlank(message = "El contenido no puede estar vacío")
    private String contenido;

    public NotaRequestDTO() {}

    public NotaRequestDTO(String titulo, String contenido) {
        this.titulo = titulo;
        this.contenido = contenido;
    }
}
