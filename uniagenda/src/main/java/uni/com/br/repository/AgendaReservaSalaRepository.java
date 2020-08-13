package uni.com.br.repository;

import uni.com.br.domain.AgendaReservaSala;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AgendaReservaSala entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaReservaSalaRepository extends JpaRepository<AgendaReservaSala, Long> {
}
