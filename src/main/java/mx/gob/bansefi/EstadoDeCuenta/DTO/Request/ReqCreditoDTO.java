package mx.gob.bansefi.EstadoDeCuenta.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class ReqCreditoDTO {
	@Getter
	@Setter
	private String BsfOperador;
	@Getter
	@Setter
	private String credito;
}
