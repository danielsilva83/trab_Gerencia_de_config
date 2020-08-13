package uni.com.br.web.rest;

import uni.com.br.AgendaApp;
import uni.com.br.domain.AgendaAtendimentoServidor;
import uni.com.br.repository.AgendaAtendimentoServidorRepository;

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
 * Integration tests for the {@link AgendaAtendimentoServidorResource} REST controller.
 */
@SpringBootTest(classes = AgendaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AgendaAtendimentoServidorResourceIT {

    private static final StatusAgenda DEFAULT_STATUS = StatusAgenda.Livre;
    private static final StatusAgenda UPDATED_STATUS = StatusAgenda.Agendado;

    @Autowired
    private AgendaAtendimentoServidorRepository agendaAtendimentoServidorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAgendaAtendimentoServidorMockMvc;

    private AgendaAtendimentoServidor agendaAtendimentoServidor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgendaAtendimentoServidor createEntity(EntityManager em) {
        AgendaAtendimentoServidor agendaAtendimentoServidor = new AgendaAtendimentoServidor()
            .status(DEFAULT_STATUS);
        return agendaAtendimentoServidor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgendaAtendimentoServidor createUpdatedEntity(EntityManager em) {
        AgendaAtendimentoServidor agendaAtendimentoServidor = new AgendaAtendimentoServidor()
            .status(UPDATED_STATUS);
        return agendaAtendimentoServidor;
    }

    @BeforeEach
    public void initTest() {
        agendaAtendimentoServidor = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgendaAtendimentoServidor() throws Exception {
        int databaseSizeBeforeCreate = agendaAtendimentoServidorRepository.findAll().size();
        // Create the AgendaAtendimentoServidor
        restAgendaAtendimentoServidorMockMvc.perform(post("/api/agenda-atendimento-servidors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaAtendimentoServidor)))
            .andExpect(status().isCreated());

        // Validate the AgendaAtendimentoServidor in the database
        List<AgendaAtendimentoServidor> agendaAtendimentoServidorList = agendaAtendimentoServidorRepository.findAll();
        assertThat(agendaAtendimentoServidorList).hasSize(databaseSizeBeforeCreate + 1);
        AgendaAtendimentoServidor testAgendaAtendimentoServidor = agendaAtendimentoServidorList.get(agendaAtendimentoServidorList.size() - 1);
        assertThat(testAgendaAtendimentoServidor.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createAgendaAtendimentoServidorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agendaAtendimentoServidorRepository.findAll().size();

        // Create the AgendaAtendimentoServidor with an existing ID
        agendaAtendimentoServidor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgendaAtendimentoServidorMockMvc.perform(post("/api/agenda-atendimento-servidors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaAtendimentoServidor)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaAtendimentoServidor in the database
        List<AgendaAtendimentoServidor> agendaAtendimentoServidorList = agendaAtendimentoServidorRepository.findAll();
        assertThat(agendaAtendimentoServidorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAgendaAtendimentoServidors() throws Exception {
        // Initialize the database
        agendaAtendimentoServidorRepository.saveAndFlush(agendaAtendimentoServidor);

        // Get all the agendaAtendimentoServidorList
        restAgendaAtendimentoServidorMockMvc.perform(get("/api/agenda-atendimento-servidors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agendaAtendimentoServidor.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getAgendaAtendimentoServidor() throws Exception {
        // Initialize the database
        agendaAtendimentoServidorRepository.saveAndFlush(agendaAtendimentoServidor);

        // Get the agendaAtendimentoServidor
        restAgendaAtendimentoServidorMockMvc.perform(get("/api/agenda-atendimento-servidors/{id}", agendaAtendimentoServidor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(agendaAtendimentoServidor.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAgendaAtendimentoServidor() throws Exception {
        // Get the agendaAtendimentoServidor
        restAgendaAtendimentoServidorMockMvc.perform(get("/api/agenda-atendimento-servidors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgendaAtendimentoServidor() throws Exception {
        // Initialize the database
        agendaAtendimentoServidorRepository.saveAndFlush(agendaAtendimentoServidor);

        int databaseSizeBeforeUpdate = agendaAtendimentoServidorRepository.findAll().size();

        // Update the agendaAtendimentoServidor
        AgendaAtendimentoServidor updatedAgendaAtendimentoServidor = agendaAtendimentoServidorRepository.findById(agendaAtendimentoServidor.getId()).get();
        // Disconnect from session so that the updates on updatedAgendaAtendimentoServidor are not directly saved in db
        em.detach(updatedAgendaAtendimentoServidor);
        updatedAgendaAtendimentoServidor
            .status(UPDATED_STATUS);

        restAgendaAtendimentoServidorMockMvc.perform(put("/api/agenda-atendimento-servidors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgendaAtendimentoServidor)))
            .andExpect(status().isOk());

        // Validate the AgendaAtendimentoServidor in the database
        List<AgendaAtendimentoServidor> agendaAtendimentoServidorList = agendaAtendimentoServidorRepository.findAll();
        assertThat(agendaAtendimentoServidorList).hasSize(databaseSizeBeforeUpdate);
        AgendaAtendimentoServidor testAgendaAtendimentoServidor = agendaAtendimentoServidorList.get(agendaAtendimentoServidorList.size() - 1);
        assertThat(testAgendaAtendimentoServidor.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingAgendaAtendimentoServidor() throws Exception {
        int databaseSizeBeforeUpdate = agendaAtendimentoServidorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgendaAtendimentoServidorMockMvc.perform(put("/api/agenda-atendimento-servidors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaAtendimentoServidor)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaAtendimentoServidor in the database
        List<AgendaAtendimentoServidor> agendaAtendimentoServidorList = agendaAtendimentoServidorRepository.findAll();
        assertThat(agendaAtendimentoServidorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgendaAtendimentoServidor() throws Exception {
        // Initialize the database
        agendaAtendimentoServidorRepository.saveAndFlush(agendaAtendimentoServidor);

        int databaseSizeBeforeDelete = agendaAtendimentoServidorRepository.findAll().size();

        // Delete the agendaAtendimentoServidor
        restAgendaAtendimentoServidorMockMvc.perform(delete("/api/agenda-atendimento-servidors/{id}", agendaAtendimentoServidor.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AgendaAtendimentoServidor> agendaAtendimentoServidorList = agendaAtendimentoServidorRepository.findAll();
        assertThat(agendaAtendimentoServidorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
