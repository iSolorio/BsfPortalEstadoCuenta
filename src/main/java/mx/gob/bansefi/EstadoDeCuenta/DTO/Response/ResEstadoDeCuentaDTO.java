package mx.gob.bansefi.EstadoDeCuenta.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class ResEstadoDeCuentaDTO {
	@Getter
	@Setter
	private String status;
	@Getter
	@Setter
	private String mensaje;
	@Getter
	@Setter
	private EstadoDeCuentaDTO EstadoDeCuenta;
}
