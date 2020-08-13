package uni.com.br.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cargo.
 */
@Entity
@Table(name = "cargo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cargo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_cargo")
    private String nomeCargo;

    @OneToMany(mappedBy = "cargo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Servidor> nomeCargos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCargo() {
        return nomeCargo;
    }

    public Cargo nomeCargo(String nomeCargo) {
        this.nomeCargo = nomeCargo;
        return this;
    }

    public void setNomeCargo(String nomeCargo) {
        this.nomeCargo = nomeCargo;
    }

    public Set<Servidor> getNomeCargos() {
        return nomeCargos;
    }

    public Cargo nomeCargos(Set<Servidor> servidors) {
        this.nomeCargos = servidors;
        return this;
    }

    public Cargo addNomeCargo(Servidor servidor) {
        this.nomeCargos.add(servidor);
        servidor.setCargo(this);
        return this;
    }

    public Cargo removeNomeCargo(Servidor servidor) {
        this.nomeCargos.remove(servidor);
        servidor.setCargo(null);
        return this;
    }

    public void setNomeCargos(Set<Servidor> servidors) {
        this.nomeCargos = servidors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cargo)) {
            return false;
        }
        return id != null && id.equals(((Cargo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cargo{" +
            "id=" + getId() +
            ", nomeCargo='" + getNomeCargo() + "'" +
            "}";
    }
}
