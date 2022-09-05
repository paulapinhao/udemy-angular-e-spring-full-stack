package io.github.paulapinhao.clientes.rest;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import io.github.paulapinhao.clientes.rest.exception.ApiErrors;

@RestControllerAdvice
public class ApplicationControllerAdvice {
    /* Intercepta e captura as exceções de validação dos campos e retorna apenas as mensagens de erro */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrors handleValidationErrors(MethodArgumentNotValidException exception) {
        /* resultado da validação: captura todos os erros */
        BindingResult bindingResult = exception.getBindingResult(); 

        /* armazena somente as mensagens de erro: transforma array de streams em array de strings */     
        List<String> errorMessages = bindingResult.getAllErrors() 
                     .stream()
                     .map(objectError -> objectError.getDefaultMessage())
                     .collect(Collectors.toList());

        return new ApiErrors(errorMessages);
    }

    /* Intercepta e captura as exceções de status e retorna mensagem de erro personalizada */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity handleResponseStatusException(ResponseStatusException exception) {
        String mensagemErro = exception.getReason();
        HttpStatus codigoStatus = exception.getStatus();
        ApiErrors apiErrors = new ApiErrors(mensagemErro);
        return new ResponseEntity(apiErrors, codigoStatus);
    }
}
