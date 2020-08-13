package uni.com.br.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import uni.com.br.domain.enumeration.Curso;

/**
 * A Aluno.
 */
@Entity
@Table(name = "aluno")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ra_aluno")
    private Double raAluno;

    @Column(name = "nome_aluno")
    private String nomeAluno;

    @Column(name = "periodo")
    private Double periodo;

    @Enumerated(EnumType.STRING)
    @Column(name = "curso")
    private Curso curso;

    @OneToMany(mappedBy = "aluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<AgendaReservaSala> raAlunos = new HashSet<>();

    @OneToMany(mappedBy = "aluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<AgendaAtendimentoServidor> ids = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getRaAluno() {
        return raAluno;
    }

    public Aluno raAluno(Double raAluno) {
        this.raAluno = raAluno;
        return this;
    }

    public void setRaAluno(Double raAluno) {
        this.raAluno = raAluno;
    }

    public String getNomeAluno() {
        return nomeAluno;
    }

    public Aluno nomeAluno(String nomeAluno) {
        this.nomeAluno = nomeAluno;
        return this;
    }

    public void setNomeAluno(String nomeAluno) {
        this.nomeAluno = nomeAluno;
    }

    public Double getPeriodo() {
        return periodo;
    }

    public Aluno periodo(Double periodo) {
        this.periodo = periodo;
        return this;
    }

    public void setPeriodo(Double periodo) {
        this.periodo = periodo;
    }

    public Curso getCurso() {
        return curso;
    }

    public Aluno curso(Curso curso) {
        this.curso = curso;
        return this;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Set<AgendaReservaSala> getRaAlunos() {
        return raAlunos;
    }

    public Aluno raAlunos(Set<AgendaReservaSala> agendaReservaSalas) {
        this.raAlunos = agendaReservaSalas;
        return this;
    }

    public Aluno addRaAluno(AgendaReservaSala agendaReservaSala) {
        this.raAlunos.add(agendaReservaSala);
        agendaReservaSala.setAluno(this);
        return this;
    }

    public Aluno removeRaAluno(AgendaReservaSala agendaReservaSala) {
        this.raAlunos.remove(agendaReservaSala);
        agendaReservaSala.setAluno(null);
        return this;
    }

    public void setRaAlunos(Set<AgendaReservaSala> agendaReservaSalas) {
        this.raAlunos = agendaReservaSalas;
    }

    public Set<AgendaAtendimentoServidor> getIds() {
        return ids;
    }

    public Aluno ids(Set<AgendaAtendimentoServidor> agendaAtendimentoServidors) {
        this.ids = agendaAtendimentoServidors;
        return this;
    }

    public Aluno addId(AgendaAtendimentoServidor agendaAtendimentoServidor) {
        this.ids.add(agendaAtendimentoServidor);
        agendaAtendimentoServidor.setAluno(this);
        return this;
    }

    public Aluno removeId(AgendaAtendimentoServidor agendaAtendimentoServidor) {
        this.ids.remove(agendaAtendimentoServidor);
        agendaAtendimentoServidor.setAluno(null);
        return this;
    }

    public void setIds(Set<AgendaAtendimentoServidor> agendaAtendimentoServidors) {
        this.ids = agendaAtendimentoServidors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aluno)) {
            return false;
        }
        return id != null && id.equals(((Aluno) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + getId() +
            ", raAluno=" + getRaAluno() +
            ", nomeAluno='" + getNomeAluno() + "'" +
            ", periodo=" + getPeriodo() +
            ", curso='" + getCurso() + "'" +
            "}";
    }
}
