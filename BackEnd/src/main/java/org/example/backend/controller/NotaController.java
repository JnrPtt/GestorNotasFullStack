package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.NotaRequestDTO;
import org.example.backend.dto.NotaResponseDTO;
import org.example.backend.service.NotaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "*")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService){
        this.notaService = notaService;
    }

    @GetMapping
    public List<NotaResponseDTO> getNotas(){
        return notaService.findAll();
    }

    @GetMapping("/{id}")
    public NotaResponseDTO getNotaById(@PathVariable Long id){
        return notaService.getNotaById(id);
    }

    @PostMapping
    public NotaResponseDTO crearNota(@Valid @RequestBody NotaRequestDTO notaRequestDTO){
        return notaService.crearNota(notaRequestDTO);
    }

    @PutMapping("/{id}")
    public NotaResponseDTO actualizarNota(@PathVariable Long id, @RequestBody NotaRequestDTO notaRequestDTO){
        return notaService.actualizarNota(id, notaRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void eliminarNota(@PathVariable Long id){
        notaService.eliminarNota(id);
    }
}
