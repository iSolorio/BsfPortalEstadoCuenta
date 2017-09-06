package mx.gob.bansefi.EstadoDeCuenta.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by AppWhere on 4/28/2017.
 */
@AllArgsConstructor
@NoArgsConstructor
public class BsfOperadorIDTO extends Responce{
    @Getter
    @Setter
    private String ENTIDAD;
    @Getter
    @Setter
    private String CENTRO;
    @Getter
    @Setter
    private String TERMINAL;
    @Getter
    @Setter
    private String USERTCB;
    @Getter
    @Setter
    private String SESSIONID;
    @Getter
    @Setter
    private String PASSTCB;
    @Getter
    @Setter
    private TransportDTO TRANSPORT;
}
