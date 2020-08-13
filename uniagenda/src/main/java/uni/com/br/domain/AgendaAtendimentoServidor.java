package uni.com.br.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import uni.com.br.domain.enumeration.StatusAgenda;

/**
 * A AgendaAtendimentoServidor.
 */
@Entity
@Table(name = "agenda_atendimento_servidor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AgendaAtendimentoServidor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusAgenda status;

    @ManyToOne
    @JsonIgnoreProperties(value = "ids", allowSetters = true)
    private AgendaServidor agendaServidor;

    @ManyToOne
    @JsonIgnoreProperties(value = "ids", allowSetters = true)
    private Aluno aluno;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StatusAgenda getStatus() {
        return status;
    }

    public AgendaAtendimentoServidor status(StatusAgenda status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusAgenda status) {
        this.status = status;
    }

    public AgendaServidor getAgendaServidor() {
        return agendaServidor;
    }

    public AgendaAtendimentoServidor agendaServidor(AgendaServidor agendaServidor) {
        this.agendaServidor = agendaServidor;
        return this;
    }

    public void setAgendaServidor(AgendaServidor agendaServidor) {
        this.agendaServidor = agendaServidor;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public AgendaAtendimentoServidor aluno(Aluno aluno) {
        this.aluno = aluno;
        return this;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AgendaAtendimentoServidor)) {
            return false;
        }
        return id != null && id.equals(((AgendaAtendimentoServidor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AgendaAtendimentoServidor{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
