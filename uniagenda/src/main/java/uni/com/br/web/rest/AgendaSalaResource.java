package uni.com.br.web.rest;

import uni.com.br.domain.AgendaSala;
import uni.com.br.repository.AgendaSalaRepository;
import uni.com.br.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link uni.com.br.domain.AgendaSala}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AgendaSalaResource {

    private final Logger log = LoggerFactory.getLogger(AgendaSalaResource.class);

    private static final String ENTITY_NAME = "agendaSala";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AgendaSalaRepository agendaSalaRepository;

    public AgendaSalaResource(AgendaSalaRepository agendaSalaRepository) {
        this.agendaSalaRepository = agendaSalaRepository;
    }

    /**
     * {@code POST  /agenda-salas} : Create a new agendaSala.
     *
     * @param agendaSala the agendaSala to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new agendaSala, or with status {@code 400 (Bad Request)} if the agendaSala has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/agenda-salas")
    public ResponseEntity<AgendaSala> createAgendaSala(@RequestBody AgendaSala agendaSala) throws URISyntaxException {
        log.debug("REST request to save AgendaSala : {}", agendaSala);
        if (agendaSala.getId() != null) {
            throw new BadRequestAlertException("A new agendaSala cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgendaSala result = agendaSalaRepository.save(agendaSala);
        return ResponseEntity.created(new URI("/api/agenda-salas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /agenda-salas} : Updates an existing agendaSala.
     *
     * @param agendaSala the agendaSala to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated agendaSala,
     * or with status {@code 400 (Bad Request)} if the agendaSala is not valid,
     * or with status {@code 500 (Internal Server Error)} if the agendaSala couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/agenda-salas")
    public ResponseEntity<AgendaSala> updateAgendaSala(@RequestBody AgendaSala agendaSala) throws URISyntaxException {
        log.debug("REST request to update AgendaSala : {}", agendaSala);
        if (agendaSala.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgendaSala result = agendaSalaRepository.save(agendaSala);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, agendaSala.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /agenda-salas} : get all the agendaSalas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of agendaSalas in body.
     */
    @GetMapping("/agenda-salas")
    public List<AgendaSala> getAllAgendaSalas() {
        log.debug("REST request to get all AgendaSalas");
        return agendaSalaRepository.findAll();
    }

    /**
     * {@code GET  /agenda-salas/:id} : get the "id" agendaSala.
     *
     * @param id the id of the agendaSala to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the agendaSala, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/agenda-salas/{id}")
    public ResponseEntity<AgendaSala> getAgendaSala(@PathVariable Long id) {
        log.debug("REST request to get AgendaSala : {}", id);
        Optional<AgendaSala> agendaSala = agendaSalaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agendaSala);
    }

    /**
     * {@code DELETE  /agenda-salas/:id} : delete the "id" agendaSala.
     *
     * @param id the id of the agendaSala to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/agenda-salas/{id}")
    public ResponseEntity<Void> deleteAgendaSala(@PathVariable Long id) {
        log.debug("REST request to delete AgendaSala : {}", id);
        agendaSalaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
