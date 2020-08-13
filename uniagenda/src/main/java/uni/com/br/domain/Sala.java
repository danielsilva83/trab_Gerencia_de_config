package uni.com.br.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Sala.
 */
@Entity
@Table(name = "sala")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sala implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_sala")
    private String nomeSala;

    @Column(name = "codigo_sala")
    private String codigoSala;

    @OneToMany(mappedBy = "sala")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<AgendaSala> codigoSalas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeSala() {
        return nomeSala;
    }

    public Sala nomeSala(String nomeSala) {
        this.nomeSala = nomeSala;
        return this;
    }

    public void setNomeSala(String nomeSala) {
        this.nomeSala = nomeSala;
    }

    public String getCodigoSala() {
        return codigoSala;
    }

    public Sala codigoSala(String codigoSala) {
        this.codigoSala = codigoSala;
        return this;
    }

    public void setCodigoSala(String codigoSala) {
        this.codigoSala = codigoSala;
    }

    public Set<AgendaSala> getCodigoSalas() {
        return codigoSalas;
    }

    public Sala codigoSalas(Set<AgendaSala> agendaSalas) {
        this.codigoSalas = agendaSalas;
        return this;
    }

    public Sala addCodigoSala(AgendaSala agendaSala) {
        this.codigoSalas.add(agendaSala);
        agendaSala.setSala(this);
        return this;
    }

    public Sala removeCodigoSala(AgendaSala agendaSala) {
        this.codigoSalas.remove(agendaSala);
        agendaSala.setSala(null);
        return this;
    }

    public void setCodigoSalas(Set<AgendaSala> agendaSalas) {
        this.codigoSalas = agendaSalas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sala)) {
            return false;
        }
        return id != null && id.equals(((Sala) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sala{" +
            "id=" + getId() +
            ", nomeSala='" + getNomeSala() + "'" +
            ", codigoSala='" + getCodigoSala() + "'" +
            "}";
    }
}
