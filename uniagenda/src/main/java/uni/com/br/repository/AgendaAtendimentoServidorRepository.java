package uni.com.br.repository;

import uni.com.br.domain.AgendaAtendimentoServidor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AgendaAtendimentoServidor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaAtendimentoServidorRepository extends JpaRepository<AgendaAtendimentoServidor, Long> {
}
