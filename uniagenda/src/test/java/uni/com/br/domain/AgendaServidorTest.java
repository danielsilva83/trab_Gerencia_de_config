package uni.com.br.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import uni.com.br.web.rest.TestUtil;

public class AgendaServidorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgendaServidor.class);
        AgendaServidor agendaServidor1 = new AgendaServidor();
        agendaServidor1.setId(1L);
        AgendaServidor agendaServidor2 = new AgendaServidor();
        agendaServidor2.setId(agendaServidor1.getId());
        assertThat(agendaServidor1).isEqualTo(agendaServidor2);
        agendaServidor2.setId(2L);
        assertThat(agendaServidor1).isNotEqualTo(agendaServidor2);
        agendaServidor1.setId(null);
        assertThat(agendaServidor1).isNotEqualTo(agendaServidor2);
    }
}
