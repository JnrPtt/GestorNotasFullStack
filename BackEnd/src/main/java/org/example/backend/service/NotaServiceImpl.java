package org.example.backend.service;

import org.example.backend.dto.NotaRequestDTO;
import org.example.backend.dto.NotaResponseDTO;
import org.example.backend.model.Nota;
import org.example.backend.Repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotaServiceImpl implements NotaService {
    private final NotaRepository notaRepository;

    public NotaServiceImpl(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    private NotaResponseDTO mapToDTO(Nota nota){
        return new NotaResponseDTO(
                nota.getId(),
                nota.getTitulo(),
                nota.getContenido(),
                nota.getFechaCreacion().format(DateTimeFormatter.ISO_DATE)
        );
    }

    @Override
    public List<NotaResponseDTO> findAll() {
        return notaRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public NotaResponseDTO getNotaById(Long id) {
        Nota nota = notaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada"));
        return mapToDTO(nota);
    }

    @Override
    public NotaResponseDTO crearNota(NotaRequestDTO notaRequestDTO) {
        Nota nota = Nota.builder()
                .titulo(notaRequestDTO.getTitulo())
                .contenido(notaRequestDTO.getContenido())
                .build();
        nota = notaRepository.save(nota);
        return mapToDTO(nota);
    }

    @Override
    public NotaResponseDTO actualizarNota(Long id,NotaRequestDTO dto) {
        Nota nota = notaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada"));
        nota.setTitulo(dto.getTitulo());
        nota.setContenido(dto.getContenido());
        nota = notaRepository.save(nota);
        return mapToDTO(nota);
    }

    @Override
    public void eliminarNota(Long id) {
        if(!notaRepository.existsById(id)){
            throw new RuntimeException("Nota no encontrada");
        }
        notaRepository.deleteById(id);
    }
}
