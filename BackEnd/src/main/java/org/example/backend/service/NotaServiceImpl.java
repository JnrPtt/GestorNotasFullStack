package org.example.backend.service;

import org.example.backend.dto.NotaRequestDTO;
import org.example.backend.dto.NotaResponseDTO;
import org.example.backend.exception.NotaNotFoundException;
import org.example.backend.mapper.NotaMapper;
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
    
    @Override
    public List<NotaResponseDTO> findAll() {
        return notaRepository.findAll().stream()
                .map(NotaMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public NotaResponseDTO getNotaById(Long id) {
        Nota nota = notaRepository.findById(id)
                .orElseThrow(() -> new NotaNotFoundException(id));
        return NotaMapper.toResponseDTO(nota);
    }

    @Override
    public NotaResponseDTO crearNota(NotaRequestDTO notaRequestDTO) {
        Nota nota = NotaMapper.toEntity(notaRequestDTO);
        Nota notaGuardada = notaRepository.save(nota);
        return NotaMapper.toResponseDTO(notaGuardada);
    }

    @Override
    public NotaResponseDTO actualizarNota(Long id,NotaRequestDTO dto) {
        Nota notaExistente = notaRepository.findById(id)
                .orElseThrow(() -> new NotaNotFoundException(id));

        NotaMapper.updateEntityFromDTO(dto, notaExistente);

        Nota notaActualizada = notaRepository.save(notaExistente);
        return NotaMapper.toResponseDTO(notaActualizada);
    }

    @Override
    public void eliminarNota(Long id) {
        if(!notaRepository.existsById(id)){
            throw new NotaNotFoundException(id);
        }
        notaRepository.deleteById(id);
    }
}
