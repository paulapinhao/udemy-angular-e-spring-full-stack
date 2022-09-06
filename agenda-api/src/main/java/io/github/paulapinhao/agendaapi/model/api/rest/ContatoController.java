package io.github.paulapinhao.agendaapi.model.api.rest;

import io.github.paulapinhao.agendaapi.model.entity.Contato;
import io.github.paulapinhao.agendaapi.model.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contatos")
@RequiredArgsConstructor
public class ContatoController {
    private final ContatoRepository contatoRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contato save(@RequestBody Contato contato) {
        return contatoRepository.save(contato);
    }
}
