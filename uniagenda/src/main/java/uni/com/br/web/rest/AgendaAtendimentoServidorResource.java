package uni.com.br.web.rest;

import uni.com.br.domain.AgendaAtendimentoServidor;
import uni.com.br.repository.AgendaAtendimentoServidorRepository;
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
 * REST controller for managing {@link uni.com.br.domain.AgendaAtendimentoServidor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AgendaAtendimentoServidorResource {

    private final Logger log = LoggerFactory.getLogger(AgendaAtendimentoServidorResource.class);

    private static final String ENTITY_NAME = "agendaAtendimentoServidor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AgendaAtendimentoServidorRepository agendaAtendimentoServidorRepository;

    public AgendaAtendimentoServidorResource(AgendaAtendimentoServidorRepository agendaAtendimentoServidorRepository) {
        this.agendaAtendimentoServidorRepository = agendaAtendimentoServidorRepository;
    }

    /**
     * {@code POST  /agenda-atendimento-servidors} : Create a new agendaAtendimentoServidor.
     *
     * @param agendaAtendimentoServidor the agendaAtendimentoServidor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new agendaAtendimentoServidor, or with status {@code 400 (Bad Request)} if the agendaAtendimentoServidor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/agenda-atendimento-servidors")
    public ResponseEntity<AgendaAtendimentoServidor> createAgendaAtendimentoServidor(@RequestBody AgendaAtendimentoServidor agendaAtendimentoServidor) throws URISyntaxException {
        log.debug("REST request to save AgendaAtendimentoServidor : {}", agendaAtendimentoServidor);
        if (agendaAtendimentoServidor.getId() != null) {
            throw new BadRequestAlertException("A new agendaAtendimentoServidor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgendaAtendimentoServidor result = agendaAtendimentoServidorRepository.save(agendaAtendimentoServidor);
        return ResponseEntity.created(new URI("/api/agenda-atendimento-servidors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /agenda-atendimento-servidors} : Updates an existing agendaAtendimentoServidor.
     *
     * @param agendaAtendimentoServidor the agendaAtendimentoServidor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated agendaAtendimentoServidor,
     * or with status {@code 400 (Bad Request)} if the agendaAtendimentoServidor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the agendaAtendimentoServidor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/agenda-atendimento-servidors")
    public ResponseEntity<AgendaAtendimentoServidor> updateAgendaAtendimentoServidor(@RequestBody AgendaAtendimentoServidor agendaAtendimentoServidor) throws URISyntaxException {
        log.debug("REST request to update AgendaAtendimentoServidor : {}", agendaAtendimentoServidor);
        if (agendaAtendimentoServidor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgendaAtendimentoServidor result = agendaAtendimentoServidorRepository.save(agendaAtendimentoServidor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, agendaAtendimentoServidor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /agenda-atendimento-servidors} : get all the agendaAtendimentoServidors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of agendaAtendimentoServidors in body.
     */
    @GetMapping("/agenda-atendimento-servidors")
    public List<AgendaAtendimentoServidor> getAllAgendaAtendimentoServidors() {
        log.debug("REST request to get all AgendaAtendimentoServidors");
        return agendaAtendimentoServidorRepository.findAll();
    }

    /**
     * {@code GET  /agenda-atendimento-servidors/:id} : get the "id" agendaAtendimentoServidor.
     *
     * @param id the id of the agendaAtendimentoServidor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the agendaAtendimentoServidor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/agenda-atendimento-servidors/{id}")
    public ResponseEntity<AgendaAtendimentoServidor> getAgendaAtendimentoServidor(@PathVariable Long id) {
        log.debug("REST request to get AgendaAtendimentoServidor : {}", id);
        Optional<AgendaAtendimentoServidor> agendaAtendimentoServidor = agendaAtendimentoServidorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agendaAtendimentoServidor);
    }

    /**
     * {@code DELETE  /agenda-atendimento-servidors/:id} : delete the "id" agendaAtendimentoServidor.
     *
     * @param id the id of the agendaAtendimentoServidor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/agenda-atendimento-servidors/{id}")
    public ResponseEntity<Void> deleteAgendaAtendimentoServidor(@PathVariable Long id) {
        log.debug("REST request to delete AgendaAtendimentoServidor : {}", id);
        agendaAtendimentoServidorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
