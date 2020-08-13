package uni.com.br.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import uni.com.br.web.rest.TestUtil;

public class AgendaSalaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgendaSala.class);
        AgendaSala agendaSala1 = new AgendaSala();
        agendaSala1.setId(1L);
        AgendaSala agendaSala2 = new AgendaSala();
        agendaSala2.setId(agendaSala1.getId());
        assertThat(agendaSala1).isEqualTo(agendaSala2);
        agendaSala2.setId(2L);
        assertThat(agendaSala1).isNotEqualTo(agendaSala2);
        agendaSala1.setId(null);
        assertThat(agendaSala1).isNotEqualTo(agendaSala2);
    }
}
