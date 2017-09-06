package mx.gob.bansefi.EstadoDeCuenta.DTO.Modelo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class DatosBasicosDTO {
	@Getter
	@Setter
	private String idInternoPe;
	@Getter
	@Setter
	private String BsfOperador;
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
}
