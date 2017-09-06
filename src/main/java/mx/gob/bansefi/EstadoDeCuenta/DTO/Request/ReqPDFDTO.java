package mx.gob.bansefi.EstadoDeCuenta.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class ReqPDFDTO {
	@Getter
	@Setter
	private String fecinicio;
	@Getter
	@Setter
	private String BsfOperador;
	@Getter
	@Setter
	private String fecfin;
	@Getter
	@Setter
	private String credito;
	@Getter
	@Setter
	private String rfc;
}
