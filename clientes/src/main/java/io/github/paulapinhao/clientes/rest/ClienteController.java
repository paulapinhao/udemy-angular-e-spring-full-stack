package io.github.paulapinhao.clientes.rest;

import java.util.List;

import javax.validation.Valid;

import io.github.paulapinhao.clientes.rest.exception.ClienteCadastradoException;
import io.github.paulapinhao.clientes.service.ClienteService;
import io.github.paulapinhao.clientes.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.github.paulapinhao.clientes.model.entity.Cliente;
import io.github.paulapinhao.clientes.model.repository.ClienteRepository;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {
    private final ClienteService clienteService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente salvar(@RequestBody @Valid Cliente cliente) {
        try {
            return clienteService.salvar(cliente);
        } catch (ClienteCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("{id}")
    public Cliente buscarPorId(@PathVariable Integer id) {
        return clienteService.buscarPorId(id);
    }

    @GetMapping
    public List<Cliente> obterTodos() {
        return  clienteService.obterTodos();
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        clienteService.deletar(id);
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar(@PathVariable Integer id, @RequestBody @Valid Cliente clienteAtualizado) {
        clienteService.atualizar(id, clienteAtualizado);
    }
}
