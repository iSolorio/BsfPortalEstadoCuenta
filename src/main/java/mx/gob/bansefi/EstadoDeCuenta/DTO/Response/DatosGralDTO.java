package mx.gob.bansefi.EstadoDeCuenta.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class DatosGralDTO {
	@Getter @Setter
	private String credito;
	@Getter @Setter
    private String producto;
	@Getter @Setter
    private String cliente;
	@Getter @Setter
    private String rfc;
	@Getter @Setter
    private String refer;
}
