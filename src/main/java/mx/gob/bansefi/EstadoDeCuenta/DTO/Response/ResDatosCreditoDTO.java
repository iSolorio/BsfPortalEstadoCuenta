package mx.gob.bansefi.EstadoDeCuenta.DTO.Response;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
public class ResDatosCreditoDTO {
	@Getter @Setter
	private ResAperturaPuestoDTO datos;
	@Getter @Setter
	private ArrayList<DatosCreditoDTO> datosCredito;
}
