package mx.gob.bansefi.EstadoDeCuenta.DTO.Response;


import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class CatalogoDatosGralDTO {
	@Getter @Setter
	private ArrayList<DatosGralDTO> responseBansefi;  
}
