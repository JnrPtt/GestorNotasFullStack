package org.example.backend.service;

import org.example.backend.dto.NotaRequestDTO;
import org.example.backend.dto.NotaResponseDTO;

import java.util.List;


public interface NotaService{
    List<NotaResponseDTO> findAll();
    NotaResponseDTO getNotaById(Long id);
    NotaResponseDTO crearNota(NotaRequestDTO notaRequestDTO);
    NotaResponseDTO actualizarNota(Long id, NotaRequestDTO notaRequestDTO);
    void eliminarNota(Long id);
}

