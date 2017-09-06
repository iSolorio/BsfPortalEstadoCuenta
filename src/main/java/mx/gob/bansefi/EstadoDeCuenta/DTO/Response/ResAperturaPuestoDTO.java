package mx.gob.bansefi.EstadoDeCuenta.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class ResAperturaPuestoDTO {
	@Getter
	@Setter
	private String tranid;
	@Getter
	@Setter
	private String estatus;
	@Getter
	@Setter
	private String codigo;
	@Getter
	@Setter
	private String mensaje;
	@Getter
	@Setter
	private String numtask;
}
