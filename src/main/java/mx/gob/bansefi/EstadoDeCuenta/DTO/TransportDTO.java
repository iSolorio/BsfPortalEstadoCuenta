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
public class TransportDTO {
	@Getter
	@Setter
	private String IDEXTERNO_PM;
	@Getter
	@Setter
	private String NOMBRE_PM;
	@Getter
	@Setter
	private String URLACTION;
	@Getter
	@Setter
	private String TITULO;
	@Getter
	@Setter
	private String DATOSANTERIORES;
	
	@Getter	@Setter
	private String TIPOPER;
	@Getter	@Setter
	private String IDINTERNOPE;
}
