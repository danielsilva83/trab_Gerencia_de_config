package uni.com.br.web.rest;

import uni.com.br.AgendaApp;
import uni.com.br.domain.Servidor;
import uni.com.br.repository.ServidorRepository;

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

/**
 * Integration tests for the {@link ServidorResource} REST controller.
 */
@SpringBootTest(classes = AgendaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ServidorResourceIT {

    private static final Double DEFAULT_COD_SIAPE = 1D;
    private static final Double UPDATED_COD_SIAPE = 2D;

    private static final String DEFAULT_NOME_SERVIDOR = "AAAAAAAAAA";
    private static final String UPDATED_NOME_SERVIDOR = "BBBBBBBBBB";

    @Autowired
    private ServidorRepository servidorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServidorMockMvc;

    private Servidor servidor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Servidor createEntity(EntityManager em) {
        Servidor servidor = new Servidor()
            .codSiape(DEFAULT_COD_SIAPE)
            .nomeServidor(DEFAULT_NOME_SERVIDOR);
        return servidor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Servidor createUpdatedEntity(EntityManager em) {
        Servidor servidor = new Servidor()
            .codSiape(UPDATED_COD_SIAPE)
            .nomeServidor(UPDATED_NOME_SERVIDOR);
        return servidor;
    }

    @BeforeEach
    public void initTest() {
        servidor = createEntity(em);
    }

    @Test
    @Transactional
    public void createServidor() throws Exception {
        int databaseSizeBeforeCreate = servidorRepository.findAll().size();
        // Create the Servidor
        restServidorMockMvc.perform(post("/api/servidors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(servidor)))
            .andExpect(status().isCreated());

        // Validate the Servidor in the database
        List<Servidor> servidorList = servidorRepository.findAll();
        assertThat(servidorList).hasSize(databaseSizeBeforeCreate + 1);
        Servidor testServidor = servidorList.get(servidorList.size() - 1);
        assertThat(testServidor.getCodSiape()).isEqualTo(DEFAULT_COD_SIAPE);
        assertThat(testServidor.getNomeServidor()).isEqualTo(DEFAULT_NOME_SERVIDOR);
    }

    @Test
    @Transactional
    public void createServidorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = servidorRepository.findAll().size();

        // Create the Servidor with an existing ID
        servidor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServidorMockMvc.perform(post("/api/servidors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(servidor)))
            .andExpect(status().isBadRequest());

        // Validate the Servidor in the database
        List<Servidor> servidorList = servidorRepository.findAll();
        assertThat(servidorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServidors() throws Exception {
        // Initialize the database
        servidorRepository.saveAndFlush(servidor);

        // Get all the servidorList
        restServidorMockMvc.perform(get("/api/servidors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(servidor.getId().intValue())))
            .andExpect(jsonPath("$.[*].codSiape").value(hasItem(DEFAULT_COD_SIAPE.doubleValue())))
            .andExpect(jsonPath("$.[*].nomeServidor").value(hasItem(DEFAULT_NOME_SERVIDOR)));
    }
    
    @Test
    @Transactional
    public void getServidor() throws Exception {
        // Initialize the database
        servidorRepository.saveAndFlush(servidor);

        // Get the servidor
        restServidorMockMvc.perform(get("/api/servidors/{id}", servidor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(servidor.getId().intValue()))
            .andExpect(jsonPath("$.codSiape").value(DEFAULT_COD_SIAPE.doubleValue()))
            .andExpect(jsonPath("$.nomeServidor").value(DEFAULT_NOME_SERVIDOR));
    }
    @Test
    @Transactional
    public void getNonExistingServidor() throws Exception {
        // Get the servidor
        restServidorMockMvc.perform(get("/api/servidors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServidor() throws Exception {
        // Initialize the database
        servidorRepository.saveAndFlush(servidor);

        int databaseSizeBeforeUpdate = servidorRepository.findAll().size();

        // Update the servidor
        Servidor updatedServidor = servidorRepository.findById(servidor.getId()).get();
        // Disconnect from session so that the updates on updatedServidor are not directly saved in db
        em.detach(updatedServidor);
        updatedServidor
            .codSiape(UPDATED_COD_SIAPE)
            .nomeServidor(UPDATED_NOME_SERVIDOR);

        restServidorMockMvc.perform(put("/api/servidors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServidor)))
            .andExpect(status().isOk());

        // Validate the Servidor in the database
        List<Servidor> servidorList = servidorRepository.findAll();
        assertThat(servidorList).hasSize(databaseSizeBeforeUpdate);
        Servidor testServidor = servidorList.get(servidorList.size() - 1);
        assertThat(testServidor.getCodSiape()).isEqualTo(UPDATED_COD_SIAPE);
        assertThat(testServidor.getNomeServidor()).isEqualTo(UPDATED_NOME_SERVIDOR);
    }

    @Test
    @Transactional
    public void updateNonExistingServidor() throws Exception {
        int databaseSizeBeforeUpdate = servidorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServidorMockMvc.perform(put("/api/servidors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(servidor)))
            .andExpect(status().isBadRequest());

        // Validate the Servidor in the database
        List<Servidor> servidorList = servidorRepository.findAll();
        assertThat(servidorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServidor() throws Exception {
        // Initialize the database
        servidorRepository.saveAndFlush(servidor);

        int databaseSizeBeforeDelete = servidorRepository.findAll().size();

        // Delete the servidor
        restServidorMockMvc.perform(delete("/api/servidors/{id}", servidor.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Servidor> servidorList = servidorRepository.findAll();
        assertThat(servidorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
