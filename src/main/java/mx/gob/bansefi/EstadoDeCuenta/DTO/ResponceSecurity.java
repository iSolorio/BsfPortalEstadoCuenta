package mx.gob.bansefi.EstadoDeCuenta.DTO;

public class ResponceSecurity {

	private String msgError;
	private int status;
	private String responce;
	public ResponceSecurity() {
		super();
	}
	public String getMsgError() {
		return msgError;
	}
	public void setMsgError(String msgError) {
		this.msgError = msgError;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getResponce() {
		return responce;
	}
	public void setResponce(String responce) {
		this.responce = responce;
	}
}
