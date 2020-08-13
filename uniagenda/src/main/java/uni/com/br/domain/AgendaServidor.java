package uni.com.br.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import uni.com.br.domain.enumeration.Mes;

import uni.com.br.domain.enumeration.Horario;

import uni.com.br.domain.enumeration.DiaMes;

import uni.com.br.domain.enumeration.DiaSemana;

import uni.com.br.domain.enumeration.StatusDia;

/**
 * A AgendaServidor.
 */
@Entity
@Table(name = "agenda_servidor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AgendaServidor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "mes")
    private Mes mes;

    @Enumerated(EnumType.STRING)
    @Column(name = "horario")
    private Horario horario;

    @Enumerated(EnumType.STRING)
    @Column(name = "dia_mes")
    private DiaMes diaMes;

    @Enumerated(EnumType.STRING)
    @Column(name = "dia_semana")
    private DiaSemana diaSemana;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_dia")
    private StatusDia statusDia;

    @OneToMany(mappedBy = "agendaServidor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<AgendaAtendimentoServidor> ids = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "ids", allowSetters = true)
    private Servidor servidor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Mes getMes() {
        return mes;
    }

    public AgendaServidor mes(Mes mes) {
        this.mes = mes;
        return this;
    }

    public void setMes(Mes mes) {
        this.mes = mes;
    }

    public Horario getHorario() {
        return horario;
    }

    public AgendaServidor horario(Horario horario) {
        this.horario = horario;
        return this;
    }

    public void setHorario(Horario horario) {
        this.horario = horario;
    }

    public DiaMes getDiaMes() {
        return diaMes;
    }

    public AgendaServidor diaMes(DiaMes diaMes) {
        this.diaMes = diaMes;
        return this;
    }

    public void setDiaMes(DiaMes diaMes) {
        this.diaMes = diaMes;
    }

    public DiaSemana getDiaSemana() {
        return diaSemana;
    }

    public AgendaServidor diaSemana(DiaSemana diaSemana) {
        this.diaSemana = diaSemana;
        return this;
    }

    public void setDiaSemana(DiaSemana diaSemana) {
        this.diaSemana = diaSemana;
    }

    public StatusDia getStatusDia() {
        return statusDia;
    }

    public AgendaServidor statusDia(StatusDia statusDia) {
        this.statusDia = statusDia;
        return this;
    }

    public void setStatusDia(StatusDia statusDia) {
        this.statusDia = statusDia;
    }

    public Set<AgendaAtendimentoServidor> getIds() {
        return ids;
    }

    public AgendaServidor ids(Set<AgendaAtendimentoServidor> agendaAtendimentoServidors) {
        this.ids = agendaAtendimentoServidors;
        return this;
    }

    public AgendaServidor addId(AgendaAtendimentoServidor agendaAtendimentoServidor) {
        this.ids.add(agendaAtendimentoServidor);
        agendaAtendimentoServidor.setAgendaServidor(this);
        return this;
    }

    public AgendaServidor removeId(AgendaAtendimentoServidor agendaAtendimentoServidor) {
        this.ids.remove(agendaAtendimentoServidor);
        agendaAtendimentoServidor.setAgendaServidor(null);
        return this;
    }

    public void setIds(Set<AgendaAtendimentoServidor> agendaAtendimentoServidors) {
        this.ids = agendaAtendimentoServidors;
    }

    public Servidor getServidor() {
        return servidor;
    }

    public AgendaServidor servidor(Servidor servidor) {
        this.servidor = servidor;
        return this;
    }

    public void setServidor(Servidor servidor) {
        this.servidor = servidor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AgendaServidor)) {
            return false;
        }
        return id != null && id.equals(((AgendaServidor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AgendaServidor{" +
            "id=" + getId() +
            ", mes='" + getMes() + "'" +
            ", horario='" + getHorario() + "'" +
            ", diaMes='" + getDiaMes() + "'" +
            ", diaSemana='" + getDiaSemana() + "'" +
            ", statusDia='" + getStatusDia() + "'" +
            "}";
    }
}
