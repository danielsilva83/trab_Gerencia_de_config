package uni.com.br.repository;

import uni.com.br.domain.AgendaServidor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AgendaServidor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaServidorRepository extends JpaRepository<AgendaServidor, Long> {
}
