package uni.com.br.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import uni.com.br.web.rest.TestUtil;

public class AgendaReservaSalaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgendaReservaSala.class);
        AgendaReservaSala agendaReservaSala1 = new AgendaReservaSala();
        agendaReservaSala1.setId(1L);
        AgendaReservaSala agendaReservaSala2 = new AgendaReservaSala();
        agendaReservaSala2.setId(agendaReservaSala1.getId());
        assertThat(agendaReservaSala1).isEqualTo(agendaReservaSala2);
        agendaReservaSala2.setId(2L);
        assertThat(agendaReservaSala1).isNotEqualTo(agendaReservaSala2);
        agendaReservaSala1.setId(null);
        assertThat(agendaReservaSala1).isNotEqualTo(agendaReservaSala2);
    }
}
