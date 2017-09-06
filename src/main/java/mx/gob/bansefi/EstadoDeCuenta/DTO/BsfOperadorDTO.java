package mx.gob.bansefi.EstadoDeCuenta.DTO;



public class BsfOperadorDTO {

	private BsfOperadorIDTO BSFOPERADOR;

	
	public BsfOperadorDTO() {
		super();
		BSFOPERADOR = new BsfOperadorIDTO();
	}

	public BsfOperadorIDTO getBSFOPERADOR() {
		return BSFOPERADOR;
	}

	public void setBSFOPERADOR(BsfOperadorIDTO bSFOPERADOR) {
		BSFOPERADOR = bSFOPERADOR;
	}
}
