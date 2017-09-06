package mx.gob.bansefi.EstadoDeCuenta.DTO;

public class ResEncryptORDecryptDTO{

	private int codRet;
	private String error;
	private String respuesta;
	public ResEncryptORDecryptDTO() {
		super();
	}

	public int getCodRet() {
		return codRet;
	}

	public void setCodRet(int codRet) {
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
