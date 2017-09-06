package mx.gob.bansefi.EstadoDeCuenta.DTO;

public class Responce {
	private int status;
	private String descripcion;

	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
}
