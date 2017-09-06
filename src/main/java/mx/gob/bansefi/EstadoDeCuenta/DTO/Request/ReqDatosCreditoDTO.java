package mx.gob.bansefi.EstadoDeCuenta.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class ReqDatosCreditoDTO {
	@Getter
	@Setter
	private String credito;
	@Getter
	@Setter
	private String referencia;
	@Getter
	@Setter
	private String usuario;
	@Getter
	@Setter 
	private String password;
}
