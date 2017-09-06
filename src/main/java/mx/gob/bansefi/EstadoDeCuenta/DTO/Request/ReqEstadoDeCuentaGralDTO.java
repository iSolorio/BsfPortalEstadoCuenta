package mx.gob.bansefi.EstadoDeCuenta.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class ReqEstadoDeCuentaGralDTO {
	@Getter
	@Setter
	private String idInternoPe;
	@Getter
	@Setter
	private String integrante;
	@Getter
	@Setter
	private String nombre;
	@Getter
	@Setter
	private String apePa;
	@Getter
	@Setter
	private String apeMa;
	@Getter
	@Setter
	private String razon;
	@Getter
	@Setter
	private String referencia;
	@Getter
	@Setter
	private String password;
	@Getter
	@Setter
	private String usuario;
	@Getter
	@Setter
	private String accion;
	@Getter
	@Setter
	private String entidad;
	@Getter
	@Setter
	private String terminal;
}