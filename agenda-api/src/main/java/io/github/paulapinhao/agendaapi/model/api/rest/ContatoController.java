package io.github.paulapinhao.agendaapi.model.api.rest;

import io.github.paulapinhao.agendaapi.model.entity.Contato;
import io.github.paulapinhao.agendaapi.model.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contatos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ContatoController {
    private final ContatoRepository contatoRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contato save(@RequestBody Contato contato) {
        return contatoRepository.save(contato);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        contatoRepository.deleteById(id);
    }

    @GetMapping
    public Page<Contato> list(
            @RequestParam(value = "page", defaultValue = "0") Integer pagina,
            @RequestParam(value = "size", defaultValue = "10") Integer tamanhoPagina
    ) {
        PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
        return contatoRepository.findAll(pageRequest);
    }

    /* Atualização parcial da entidade. Se fosse total, seria PUT. */
    @PatchMapping("{id}/favorito")
    public void favorite(@PathVariable Integer id) {
        /* findbyId retorna Optional, pois pode existir ou não um contato com o ID especificado */
        Optional<Contato> contato = contatoRepository.findById(id);

        /* se findbyId retornou um contato */
        contato.ifPresent( c -> {
            /* se estiver nulo, converte para falso */
            boolean favorito = c.getFavorito() == Boolean.TRUE;
            c.setFavorito(!favorito);
            contatoRepository.save(c);
        });
    }

    @PutMapping("{id}/foto")
    public byte[] addPhoto(@PathVariable Integer id,
                           @RequestParam("foto") Part arquivo) {
        Optional<Contato> contato = contatoRepository.findById(id);
        return contato.map( c -> {
          try {
              InputStream inputStream = arquivo.getInputStream();
              byte[] bytes = new byte[(int) arquivo.getSize()];
              IOUtils.readFully(inputStream, bytes);
              c.setFoto(bytes);
              contatoRepository.save(c);
              inputStream.close();
              return bytes;
          } catch (IOException exception) {
              return null;
          }
        }).orElse(null);
    }
}
