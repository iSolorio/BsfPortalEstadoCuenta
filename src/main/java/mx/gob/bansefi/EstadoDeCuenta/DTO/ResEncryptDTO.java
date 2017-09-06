package mx.gob.bansefi.EstadoDeCuenta.DTO;


/**
 * Created by AppWIns on 17/04/2017.
 */
public class ResEncryptDTO {

    private Integer codRet;
    private String error;
    private String respuesta;

    public ResEncryptDTO() {
    }

    public Integer getCodRet() {
        return codRet;
    }

    public void setCodRet(Integer codRet) {
        this.codRet = codRet;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

	public String getRespuesta() {
		return respuesta;
	}

	public void setRespuesta(String respuesta) {
		this.respuesta = respuesta;
	}
}
