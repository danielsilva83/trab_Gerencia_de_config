package uni.com.br.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import uni.com.br.web.rest.TestUtil;

public class AgendaAtendimentoServidorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgendaAtendimentoServidor.class);
        AgendaAtendimentoServidor agendaAtendimentoServidor1 = new AgendaAtendimentoServidor();
        agendaAtendimentoServidor1.setId(1L);
        AgendaAtendimentoServidor agendaAtendimentoServidor2 = new AgendaAtendimentoServidor();
        agendaAtendimentoServidor2.setId(agendaAtendimentoServidor1.getId());
        assertThat(agendaAtendimentoServidor1).isEqualTo(agendaAtendimentoServidor2);
        agendaAtendimentoServidor2.setId(2L);
        assertThat(agendaAtendimentoServidor1).isNotEqualTo(agendaAtendimentoServidor2);
        agendaAtendimentoServidor1.setId(null);
        assertThat(agendaAtendimentoServidor1).isNotEqualTo(agendaAtendimentoServidor2);
    }
}
