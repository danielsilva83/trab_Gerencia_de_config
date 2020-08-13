package uni.com.br.repository;

import uni.com.br.domain.AgendaSala;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AgendaSala entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaSalaRepository extends JpaRepository<AgendaSala, Long> {
}
