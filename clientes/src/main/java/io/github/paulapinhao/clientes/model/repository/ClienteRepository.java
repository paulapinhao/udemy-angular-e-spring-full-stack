package io.github.paulapinhao.clientes.model.repository;

import io.github.paulapinhao.clientes.model.entity.Cliente;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByCpf(String cpf);

    /* select count(*) > 0 from cliente where cpf =:cpf */
    boolean existsByCpf(String cpf);
}
