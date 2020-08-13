package uni.com.br.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Servidor.
 */
@Entity
@Table(name = "servidor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Servidor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_siape")
    private Double codSiape;

    @Column(name = "nome_servidor")
    private String nomeServidor;

    @OneToMany(mappedBy = "servidor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<AgendaServidor> ids = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "nomeCargos", allowSetters = true)
    private Cargo cargo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getCodSiape() {
        return codSiape;
    }

    public Servidor codSiape(Double codSiape) {
        this.codSiape = codSiape;
        return this;
    }

    public void setCodSiape(Double codSiape) {
        this.codSiape = codSiape;
    }

    public String getNomeServidor() {
        return nomeServidor;
    }

    public Servidor nomeServidor(String nomeServidor) {
        this.nomeServidor = nomeServidor;
        return this;
    }

    public void setNomeServidor(String nomeServidor) {
        this.nomeServidor = nomeServidor;
    }

    public Set<AgendaServidor> getIds() {
        return ids;
    }

    public Servidor ids(Set<AgendaServidor> agendaServidors) {
        this.ids = agendaServidors;
        return this;
    }

    public Servidor addId(AgendaServidor agendaServidor) {
        this.ids.add(agendaServidor);
        agendaServidor.setServidor(this);
        return this;
    }

    public Servidor removeId(AgendaServidor agendaServidor) {
        this.ids.remove(agendaServidor);
        agendaServidor.setServidor(null);
        return this;
    }

    public void setIds(Set<AgendaServidor> agendaServidors) {
        this.ids = agendaServidors;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public Servidor cargo(Cargo cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Servidor)) {
            return false;
        }
        return id != null && id.equals(((Servidor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Servidor{" +
            "id=" + getId() +
            ", codSiape=" + getCodSiape() +
            ", nomeServidor='" + getNomeServidor() + "'" +
            "}";
    }
}
