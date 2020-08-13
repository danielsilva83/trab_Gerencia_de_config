package uni.com.br.web.rest;

import uni.com.br.AgendaApp;
import uni.com.br.domain.Aluno;
import uni.com.br.repository.AlunoRepository;

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

import uni.com.br.domain.enumeration.Curso;
/**
 * Integration tests for the {@link AlunoResource} REST controller.
 */
@SpringBootTest(classes = AgendaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AlunoResourceIT {

    private static final Double DEFAULT_RA_ALUNO = 1D;
    private static final Double UPDATED_RA_ALUNO = 2D;

    private static final String DEFAULT_NOME_ALUNO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_ALUNO = "BBBBBBBBBB";

    private static final Double DEFAULT_PERIODO = 1D;
    private static final Double UPDATED_PERIODO = 2D;

    private static final Curso DEFAULT_CURSO = Curso.Engenharia_Eletrica;
    private static final Curso UPDATED_CURSO = Curso.Engenharia_Computacao;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAlunoMockMvc;

    private Aluno aluno;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aluno createEntity(EntityManager em) {
        Aluno aluno = new Aluno()
            .raAluno(DEFAULT_RA_ALUNO)
            .nomeAluno(DEFAULT_NOME_ALUNO)
            .periodo(DEFAULT_PERIODO)
            .curso(DEFAULT_CURSO);
        return aluno;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aluno createUpdatedEntity(EntityManager em) {
        Aluno aluno = new Aluno()
            .raAluno(UPDATED_RA_ALUNO)
            .nomeAluno(UPDATED_NOME_ALUNO)
            .periodo(UPDATED_PERIODO)
            .curso(UPDATED_CURSO);
        return aluno;
    }

    @BeforeEach
    public void initTest() {
        aluno = createEntity(em);
    }

    @Test
    @Transactional
    public void createAluno() throws Exception {
        int databaseSizeBeforeCreate = alunoRepository.findAll().size();
        // Create the Aluno
        restAlunoMockMvc.perform(post("/api/alunos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aluno)))
            .andExpect(status().isCreated());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeCreate + 1);
        Aluno testAluno = alunoList.get(alunoList.size() - 1);
        assertThat(testAluno.getRaAluno()).isEqualTo(DEFAULT_RA_ALUNO);
        assertThat(testAluno.getNomeAluno()).isEqualTo(DEFAULT_NOME_ALUNO);
        assertThat(testAluno.getPeriodo()).isEqualTo(DEFAULT_PERIODO);
        assertThat(testAluno.getCurso()).isEqualTo(DEFAULT_CURSO);
    }

    @Test
    @Transactional
    public void createAlunoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alunoRepository.findAll().size();

        // Create the Aluno with an existing ID
        aluno.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlunoMockMvc.perform(post("/api/alunos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aluno)))
            .andExpect(status().isBadRequest());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAlunos() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        // Get all the alunoList
        restAlunoMockMvc.perform(get("/api/alunos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aluno.getId().intValue())))
            .andExpect(jsonPath("$.[*].raAluno").value(hasItem(DEFAULT_RA_ALUNO.doubleValue())))
            .andExpect(jsonPath("$.[*].nomeAluno").value(hasItem(DEFAULT_NOME_ALUNO)))
            .andExpect(jsonPath("$.[*].periodo").value(hasItem(DEFAULT_PERIODO.doubleValue())))
            .andExpect(jsonPath("$.[*].curso").value(hasItem(DEFAULT_CURSO.toString())));
    }
    
    @Test
    @Transactional
    public void getAluno() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        // Get the aluno
        restAlunoMockMvc.perform(get("/api/alunos/{id}", aluno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aluno.getId().intValue()))
            .andExpect(jsonPath("$.raAluno").value(DEFAULT_RA_ALUNO.doubleValue()))
            .andExpect(jsonPath("$.nomeAluno").value(DEFAULT_NOME_ALUNO))
            .andExpect(jsonPath("$.periodo").value(DEFAULT_PERIODO.doubleValue()))
            .andExpect(jsonPath("$.curso").value(DEFAULT_CURSO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAluno() throws Exception {
        // Get the aluno
        restAlunoMockMvc.perform(get("/api/alunos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAluno() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();

        // Update the aluno
        Aluno updatedAluno = alunoRepository.findById(aluno.getId()).get();
        // Disconnect from session so that the updates on updatedAluno are not directly saved in db
        em.detach(updatedAluno);
        updatedAluno
            .raAluno(UPDATED_RA_ALUNO)
            .nomeAluno(UPDATED_NOME_ALUNO)
            .periodo(UPDATED_PERIODO)
            .curso(UPDATED_CURSO);

        restAlunoMockMvc.perform(put("/api/alunos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAluno)))
            .andExpect(status().isOk());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
        Aluno testAluno = alunoList.get(alunoList.size() - 1);
        assertThat(testAluno.getRaAluno()).isEqualTo(UPDATED_RA_ALUNO);
        assertThat(testAluno.getNomeAluno()).isEqualTo(UPDATED_NOME_ALUNO);
        assertThat(testAluno.getPeriodo()).isEqualTo(UPDATED_PERIODO);
        assertThat(testAluno.getCurso()).isEqualTo(UPDATED_CURSO);
    }

    @Test
    @Transactional
    public void updateNonExistingAluno() throws Exception {
        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlunoMockMvc.perform(put("/api/alunos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aluno)))
            .andExpect(status().isBadRequest());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAluno() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        int databaseSizeBeforeDelete = alunoRepository.findAll().size();

        // Delete the aluno
        restAlunoMockMvc.perform(delete("/api/alunos/{id}", aluno.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
