package uni.com.br.web.rest;

import uni.com.br.AgendaApp;
import uni.com.br.domain.AgendaReservaSala;
import uni.com.br.repository.AgendaReservaSalaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import uni.com.br.domain.enumeration.StatusAgenda;
/**
 * Integration tests for the {@link AgendaReservaSalaResource} REST controller.
 */
@SpringBootTest(classes = AgendaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AgendaReservaSalaResourceIT {

    private static final StatusAgenda DEFAULT_STATUS = StatusAgenda.Livre;
    private static final StatusAgenda UPDATED_STATUS = StatusAgenda.Agendado;

    @Autowired
    private AgendaReservaSalaRepository agendaReservaSalaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAgendaReservaSalaMockMvc;

    private AgendaReservaSala agendaReservaSala;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgendaReservaSala createEntity(EntityManager em) {
        AgendaReservaSala agendaReservaSala = new AgendaReservaSala()
            .status(DEFAULT_STATUS);
        return agendaReservaSala;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgendaReservaSala createUpdatedEntity(EntityManager em) {
        AgendaReservaSala agendaReservaSala = new AgendaReservaSala()
            .status(UPDATED_STATUS);
        return agendaReservaSala;
    }

    @BeforeEach
    public void initTest() {
        agendaReservaSala = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgendaReservaSala() throws Exception {
        int databaseSizeBeforeCreate = agendaReservaSalaRepository.findAll().size();
        // Create the AgendaReservaSala
        restAgendaReservaSalaMockMvc.perform(post("/api/agenda-reserva-salas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaReservaSala)))
            .andExpect(status().isCreated());

        // Validate the AgendaReservaSala in the database
        List<AgendaReservaSala> agendaReservaSalaList = agendaReservaSalaRepository.findAll();
        assertThat(agendaReservaSalaList).hasSize(databaseSizeBeforeCreate + 1);
        AgendaReservaSala testAgendaReservaSala = agendaReservaSalaList.get(agendaReservaSalaList.size() - 1);
        assertThat(testAgendaReservaSala.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createAgendaReservaSalaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agendaReservaSalaRepository.findAll().size();

        // Create the AgendaReservaSala with an existing ID
        agendaReservaSala.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgendaReservaSalaMockMvc.perform(post("/api/agenda-reserva-salas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaReservaSala)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaReservaSala in the database
        List<AgendaReservaSala> agendaReservaSalaList = agendaReservaSalaRepository.findAll();
        assertThat(agendaReservaSalaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAgendaReservaSalas() throws Exception {
        // Initialize the database
        agendaReservaSalaRepository.saveAndFlush(agendaReservaSala);

        // Get all the agendaReservaSalaList
        restAgendaReservaSalaMockMvc.perform(get("/api/agenda-reserva-salas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agendaReservaSala.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getAgendaReservaSala() throws Exception {
        // Initialize the database
        agendaReservaSalaRepository.saveAndFlush(agendaReservaSala);

        // Get the agendaReservaSala
        restAgendaReservaSalaMockMvc.perform(get("/api/agenda-reserva-salas/{id}", agendaReservaSala.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(agendaReservaSala.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAgendaReservaSala() throws Exception {
        // Get the agendaReservaSala
        restAgendaReservaSalaMockMvc.perform(get("/api/agenda-reserva-salas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgendaReservaSala() throws Exception {
        // Initialize the database
        agendaReservaSalaRepository.saveAndFlush(agendaReservaSala);

        int databaseSizeBeforeUpdate = agendaReservaSalaRepository.findAll().size();

        // Update the agendaReservaSala
        AgendaReservaSala updatedAgendaReservaSala = agendaReservaSalaRepository.findById(agendaReservaSala.getId()).get();
        // Disconnect from session so that the updates on updatedAgendaReservaSala are not directly saved in db
        em.detach(updatedAgendaReservaSala);
        updatedAgendaReservaSala
            .status(UPDATED_STATUS);

        restAgendaReservaSalaMockMvc.perform(put("/api/agenda-reserva-salas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgendaReservaSala)))
            .andExpect(status().isOk());

        // Validate the AgendaReservaSala in the database
        List<AgendaReservaSala> agendaReservaSalaList = agendaReservaSalaRepository.findAll();
        assertThat(agendaReservaSalaList).hasSize(databaseSizeBeforeUpdate);
        AgendaReservaSala testAgendaReservaSala = agendaReservaSalaList.get(agendaReservaSalaList.size() - 1);
        assertThat(testAgendaReservaSala.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingAgendaReservaSala() throws Exception {
        int databaseSizeBeforeUpdate = agendaReservaSalaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgendaReservaSalaMockMvc.perform(put("/api/agenda-reserva-salas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaReservaSala)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaReservaSala in the database
        List<AgendaReservaSala> agendaReservaSalaList = agendaReservaSalaRepository.findAll();
        assertThat(agendaReservaSalaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgendaReservaSala() throws Exception {
        // Initialize the database
        agendaReservaSalaRepository.saveAndFlush(agendaReservaSala);

        int databaseSizeBeforeDelete = agendaReservaSalaRepository.findAll().size();

        // Delete the agendaReservaSala
        restAgendaReservaSalaMockMvc.perform(delete("/api/agenda-reserva-salas/{id}", agendaReservaSala.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AgendaReservaSala> agendaReservaSalaList = agendaReservaSalaRepository.findAll();
        assertThat(agendaReservaSalaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
