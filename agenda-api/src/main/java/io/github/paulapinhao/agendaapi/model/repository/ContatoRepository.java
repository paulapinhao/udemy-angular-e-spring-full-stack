package io.github.paulapinhao.agendaapi.model.repository;

import io.github.paulapinhao.agendaapi.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

/* JpaRepository de Contato com chave primária Integer (id) */
public interface ContatoRepository extends JpaRepository<Contato, Integer> {

}
