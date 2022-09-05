package io.github.paulapinhao.clientes.rest.exception;

public class ClienteCadastradoException extends RuntimeException {
    public ClienteCadastradoException(String cpf) {
        super("Cliente já cadastrado para o cpf " + cpf);
    }
}
