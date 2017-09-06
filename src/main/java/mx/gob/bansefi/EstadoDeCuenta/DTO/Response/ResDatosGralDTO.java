package mx.gob.bansefi.EstadoDeCuenta.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class ResDatosGralDTO{
	@Getter @Setter
	private ResAperturaPuestoDTO datos;
	@Getter @Setter
	private CatalogoDatosGralDTO creditos;
}
