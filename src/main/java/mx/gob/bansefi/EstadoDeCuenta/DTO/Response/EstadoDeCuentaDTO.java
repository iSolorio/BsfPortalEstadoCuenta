package mx.gob.bansefi.EstadoDeCuenta.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
public class EstadoDeCuentaDTO {
	@Getter
	@Setter
	private ResDatosGralDTO resDatosGral;
	@Getter
	@Setter
	private ResDatosCreditoDTO resDatosCredito;
}
