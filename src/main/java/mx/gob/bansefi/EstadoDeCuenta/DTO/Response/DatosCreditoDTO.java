package mx.gob.bansefi.EstadoDeCuenta.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class DatosCreditoDTO {
	@Getter
	@Setter
	private String credito;
	@Getter
	@Setter
	private String nombreto;
	@Getter
	@Setter
	private String apod_LEGAL;
	@Getter
	@Setter
	private String tipo_CONTRATO;
	@Getter
	@Setter
	private String fecha_CONTRA;
	@Getter
	@Setter
	private String monto_LINEA;
	@Getter
	@Setter
	private String fecha_CORTE;
	@Getter
	@Setter
	private String monto_DEUDA;
	@Getter
	@Setter
	private String tipo_CRED;
	@Getter
	@Setter
	private String vencimiento;
	@Getter
	@Setter
	private String tasa;
	@Getter
	@Setter
	private String cap_ENTREGADO;
	@Getter
	@Setter
	private String revi_DE_TASA;
	@Getter
	@Setter
	private String tasa_MOR;
	@Getter
	@Setter
	private String cap_VIGENTE;
	@Getter
	@Setter
	private String cap_VENCIDO;
	@Getter
	@Setter
	private String int_VIG;
	@Getter
	@Setter
	private String int_VENCIDO;
	@Getter
	@Setter
	private String int_MORA;
	@Getter
	@Setter
	private String fecha_INCIAL;
	@Getter
	@Setter
	private String fecha_FINAL;
	@Getter
	@Setter
	private String dias_INTER;
	@Getter
	@Setter
	private String capital;
	@Getter
	@Setter
	private String capital_VENCIDO;
	@Getter
	@Setter
	private String tasa_ORDINARIA;
	@Getter
	@Setter
	private String tasa_MORATORIA;
	@Getter
	@Setter
	private String interes_VIGENTE;
	@Getter
	@Setter
	private String interes_VENCIDO;
	@Getter
	@Setter
	private String interes_MORATORIO;
	@Getter
	@Setter
	private String iva;
	@Getter
	@Setter
	private String saldo;
	@Getter
	@Setter
	private String pago_CAPITAL;
	@Getter
	@Setter
	private String pago_INTERES;
	@Getter
	@Setter
	private String pago_IVA;
	// -------------------------------
	@Getter
	@Setter
	private String bio_FECHA_INCIAL;
	@Getter
	@Setter
	private String bio_FECHA_FINAL;
	@Getter
	@Setter
	private String bio_SALDO;
	@Getter
	@Setter
	private String io_FECHA_INCIAL;
	@Getter
	@Setter
	private String io_FECHA_FINAL;
	@Getter
	@Setter
	private String saldo_FINAL;
	@Getter
	@Setter
	private String pi_REVI_DE_TASA;
	@Getter
	@Setter
	private String fc_FECHA_FINAL;
	@Getter
	@Setter
	private String pc_FECHA_FINAL;
	@Getter
	@Setter
	private String fi_FECHA_FINAL;
	@Getter
	@Setter
	private String pi_FECHA_FINAL;
	@Getter
	@Setter
	private String piv_FECHA_FINAL;
	@Getter
	@Setter
	private String fiv_FECHA_FINAL;
	@Getter
	@Setter
	private String pc_PAGO_CAPITAL;
	@Getter
	@Setter
	private String pi_PAGO_INTERES;
	@Getter
	@Setter
	private String fi_PAGO_IVA;
	// -------------------------------
	@Getter
	@Setter
	private String tipocta;
	@Getter
	@Setter
	private String domicilio;
	@Getter
	@Setter
	private String rfc;
	@Getter
	@Setter
	private String dispEnPeriodo;
	@Getter
	@Setter
	private String numAbonos;
	@Getter
	@Setter
	private String montoDeAbonos;
	@Getter
	@Setter
	private String comisionPer;
	@Getter
	@Setter
	private String sucursal;
	@Getter
	@Setter
	private String cat;
	@Getter
	@Setter
	private String moneda;
	@Getter
	@Setter
	private String disLineaDeCred;
	@Getter
	@Setter
	private String totalPagar;
	@Getter
	@Setter
	private String fechaLimite;
}
