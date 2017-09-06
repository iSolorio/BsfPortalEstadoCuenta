package mx.gob.bansefi.EstadoDeCuenta.DTO.Modelo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by AppWhere on 23/07/2017.
 */
@AllArgsConstructor
@NoArgsConstructor
public class ModeloMaestroDTO {

    @Getter
    @Setter
    String DatosGenerales;
    @Getter
    @Setter
    String DatosConstitucion;
    @Getter
    @Setter
    String DatosRelacion;
    @Getter
    @Setter
    String DatosCedula;
    @Getter
    @Setter
    String DatosAdicionales;
    @Getter
    @Setter
    String Centro;
}
