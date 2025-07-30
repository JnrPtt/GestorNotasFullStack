package org.example.backend.exception;

public class NotaNotFoundException extends RuntimeException{
    public NotaNotFoundException(Long id){
        super("La nota con id" +id + "no fue encontrada");
    }
}
