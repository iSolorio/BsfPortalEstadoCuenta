package mx.gob.bansefi.EstadoDeCuenta.Service;

import java.util.ArrayList;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import mx.gob.bansefi.EstadoDeCuenta.DTO.BsfOperadorDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.ReqEncryptORDecryptDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Modelo.DatosBasicosDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Request.ReqCreditoDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Request.ReqDatosCreditoDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Request.ReqEstadoDeCuentaGralDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Request.ReqPDFDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Request.RequestAltaDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.EstadoDeCuentaDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.ResAperturaPuestoDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.ResDatosCreditoDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.ResDatosGralDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.ResEstadoDeCuentaDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.ResponseDTO;
import mx.gob.bansefi.EstadoDeCuenta.Util.Util;


@Service
public class WsService {
	@Autowired
	Util util;
	@Autowired
	SecurityWS securityWs;
	 @Value("${Estado.consultaDatos}")
	 private String EstadoConsultaDatos;
	 @Value("${Estado.consultaPDF}")
	 private String EstadoConsultaPDF;
	 @Value("${Estado.consultaCreditos}")
	 private String EstadoConsultaCreditos;
	 @Value("${Estado.accionIdInternoP}")
	 private String accionIdInternoP;
	 @Value("${Estado.accionNombre}")
	 private String accionNombre;
	 @Value("${Estado.accionRazon}")
	 private String accionRazon;
	 @Value("${mensaje.errorGeneral}")
	 private String errorGeneral;
	 @Value("${mensaje.errorStatus}")
	 private String errorStatus;
	
	public ResDatosGralDTO consultaDatos(DatosBasicosDTO request)
	{
		ResDatosGralDTO response= new ResDatosGralDTO();
		BsfOperadorDTO bsfOperadorDecrypt = securityWs.decriptBsfOperador(new ReqEncryptORDecryptDTO(request.getBsfOperador()));
		ReqEstadoDeCuentaGralDTO req=new ReqEstadoDeCuentaGralDTO();
		request.setIdInternoPe(request.getIdInternoPe()==null?"":request.getIdInternoPe());
		request.setNombre(request.getNombre()==null?"":request.getNombre());
		request.setApeMa(request.getApeMa()==null?"":request.getApeMa());
		request.setRazon(request.getRazon()==null?"":request.getRazon());
		request.setReferencia(request.getReferencia()==null?"":request.getReferencia());
		request.setApePa(request.getApePa()==null?"":request.getApePa());
		if(!request.getNombre().equals(""))
		{
			req.setAccion(accionNombre);
		}
		else
		{
			if(!request.getIdInternoPe().equals(""))
			{
				req.setAccion(accionIdInternoP);
			}
			else
			{
				if(!request.getRazon().equals(""))
				{
					req.setAccion(accionRazon);
				}
				
			}
		}
		
		req.setApeMa(request.getApeMa());
		req.setApePa(request.getApePa());
		req.setIdInternoPe(request.getIdInternoPe());
		req.setNombre(request.getNombre());
		req.setPassword(bsfOperadorDecrypt.getBSFOPERADOR().getPASSTCB());
		req.setRazon(request.getRazon());
		req.setReferencia(request.getReferencia());
		req.setIntegrante("");
		req.setUsuario(bsfOperadorDecrypt.getBSFOPERADOR().getUSERTCB());
		req.setTerminal(bsfOperadorDecrypt.getBSFOPERADOR().getTERMINAL());
		req.setEntidad(bsfOperadorDecrypt.getBSFOPERADOR().getENTIDAD());
		
		req.setReferencia(req.getReferencia()==null?"1":req.getReferencia());
		if(req.getReferencia().equals(""))
		{
			req.setReferencia("1");
		}
		String jsonRes = this.util.callRestPost(req, EstadoConsultaDatos);
		String cadena = jsonRes;
		
		System.out.println(cadena+"||"+bsfOperadorDecrypt.getBSFOPERADOR().getTERMINAL()+"||"+bsfOperadorDecrypt.getBSFOPERADOR().getUSERTCB()+"||"+req.getAccion()+"||"+req.getReferencia());
		
		if(!jsonRes.equals(""))
		{
			try {
				 response = (ResDatosGralDTO) this.util.jsonToObject(response, cadena);
			} catch (ParseException e) {
				e.printStackTrace();
				ResAperturaPuestoDTO datos= new ResAperturaPuestoDTO();
				datos.setMensaje(errorGeneral+e.getMessage());
				datos.setEstatus(errorStatus);
				response.setDatos(datos);
			}
		}
		else
		{
			ResAperturaPuestoDTO datos= new ResAperturaPuestoDTO();
			datos.setMensaje(errorGeneral);
			datos.setEstatus(errorStatus);
			response.setDatos(datos);
		}
		System.out.println(response.getDatos().getMensaje()+response.getCreditos().getResponseBansefi().get(0).getProducto());
		System.out.println(response.getDatos().getMensaje()+response.getCreditos().getResponseBansefi().get(0).getCliente());
		System.out.println(response.getDatos().getMensaje()+response.getCreditos().getResponseBansefi().get(0).getRefer());
		System.out.println(response.getDatos().getMensaje()+response.getCreditos().getResponseBansefi().get(0).getRfc());
		return response;
	}
	
	public  ResDatosCreditoDTO consultaCredito(ReqCreditoDTO req)
	{
		ResDatosCreditoDTO response= new ResDatosCreditoDTO();
		ReqDatosCreditoDTO request= new ReqDatosCreditoDTO();
		req.setCredito(req.getCredito()==null?"":req.getCredito());
		req.setBsfOperador(req.getBsfOperador()==null?"":req.getBsfOperador());
		BsfOperadorDTO bsfOperadorDecrypt = securityWs.decriptBsfOperador(new ReqEncryptORDecryptDTO(req.getBsfOperador()));
		request.setUsuario(bsfOperadorDecrypt.getBSFOPERADOR().getUSERTCB());
		request.setPassword(bsfOperadorDecrypt.getBSFOPERADOR().getPASSTCB());
		request.setReferencia("1");
		request.setCredito(req.getCredito());
		System.out.println(request.getCredito()+"..."+request.getPassword()+"..."+request.getReferencia()+".."+request.getUsuario());
		String jsonRes = this.util.callRestPost(request, EstadoConsultaCreditos);
		System.out.println(jsonRes);
		if(!jsonRes.equals(""))
		{
			try {
				 response = (ResDatosCreditoDTO) this.util.jsonToObject(response, jsonRes);
			} catch (ParseException e) {
				e.printStackTrace();
				ResAperturaPuestoDTO datos= new ResAperturaPuestoDTO();
				datos.setMensaje(errorGeneral+e.getMessage());
				datos.setEstatus(errorStatus);
				response.getDatosCredito().get(0).getFecha_INCIAL();
				response.getDatosCredito().get(0).getFecha_FINAL();
				response.getDatosCredito().get(0).getNombreto();
				response.setDatos(datos);
			}
		}
		else
		{
			ResAperturaPuestoDTO datos= new ResAperturaPuestoDTO();
			datos.setMensaje(errorGeneral);
			datos.setEstatus(errorStatus);
			response.setDatos(datos);
		}
		response.getDatosCredito().get(0).getFecha_INCIAL();
		response.getDatosCredito().get(0).getFecha_FINAL();
		response.getDatosCredito().get(0).getNombreto();
		return response;
		
	}
	public ResponseDTO consultaPDF(ReqPDFDTO req)
	{
		ResponseDTO response= new ResponseDTO();
		ReqCreditoDTO requestCredito= new ReqCreditoDTO();
		req.setCredito(req.getCredito()==null?"":req.getCredito());
		req.setBsfOperador(req.getBsfOperador()==null?"":req.getBsfOperador());
		requestCredito.setCredito(req.getCredito());
		requestCredito.setBsfOperador(req.getBsfOperador());
		BsfOperadorDTO bsfOperadorDecrypt = securityWs.decriptBsfOperador(new ReqEncryptORDecryptDTO(req.getBsfOperador()));
		ResDatosCreditoDTO responseCredito=consultaCredito(requestCredito);
		RequestAltaDTO request= new RequestAltaDTO();
		for(int i=0;i<responseCredito.getDatosCredito().size();i++)
		{
			
			if(req.getFecinicio().equals(responseCredito.getDatosCredito().get(i).getFecha_INCIAL())==true  && req.getFecfin().equals(responseCredito.getDatosCredito().get(i).getFecha_FINAL())==true)
			{
				
				request.setAPOD_LEGAL(responseCredito.getDatosCredito().get(0).getApod_LEGAL());
				request.setBIO_FECHA_FINAL(responseCredito.getDatosCredito().get(i).getBio_FECHA_FINAL());
				request.setBIO_FECHA_INCIAL(responseCredito.getDatosCredito().get(i).getBio_FECHA_INCIAL());
				request.setBIO_SALDO(responseCredito.getDatosCredito().get(i).getBio_SALDO());
				request.setCAP_ENTREGADO(responseCredito.getDatosCredito().get(i).getCap_ENTREGADO());
				request.setCAP_VENCIDO(responseCredito.getDatosCredito().get(i).getCap_VENCIDO());
				request.setCAP_VIGENTE(responseCredito.getDatosCredito().get(i).getCap_VIGENTE());
				request.setCAPITAL(responseCredito.getDatosCredito().get(i).getCapital());
				request.setCAPITAL_VENCIDO(responseCredito.getDatosCredito().get(i).getCapital_VENCIDO());
				request.setCat(responseCredito.getDatosCredito().get(i).getCat());
				request.setComisionPer(responseCredito.getDatosCredito().get(i).getComisionPer());
				request.setCREDITO(responseCredito.getDatosCredito().get(i).getCredito());
				request.setDIAS_INTER(responseCredito.getDatosCredito().get(i).getDias_INTER());
				request.setDisLineaDeCred(responseCredito.getDatosCredito().get(i).getDisLineaDeCred());
				request.setDispEnPeriodo(responseCredito.getDatosCredito().get(i).getDispEnPeriodo());
				request.setDomicilio(responseCredito.getDatosCredito().get(i).getDomicilio());
				request.setFC_FECHA_FINAL(responseCredito.getDatosCredito().get(i).getFc_FECHA_FINAL());
				request.setFECHA_CONTRA(responseCredito.getDatosCredito().get(i).getFecha_CONTRA());
				request.setFECHA_CORTE(responseCredito.getDatosCredito().get(i).getFecha_CORTE());
				request.setFECHA_FINAL(responseCredito.getDatosCredito().get(i).getFecha_FINAL());
				request.setFECHA_INCIAL(responseCredito.getDatosCredito().get(i).getFecha_INCIAL());
				request.setFechaLimite(responseCredito.getDatosCredito().get(i).getFechaLimite());
				request.setFI_FECHA_FINAL(responseCredito.getDatosCredito().get(i).getFi_FECHA_FINAL());
				request.setFI_PAGO_IVA(responseCredito.getDatosCredito().get(i).getFi_PAGO_IVA());
				request.setFIV_FECHA_FINAL(responseCredito.getDatosCredito().get(i).getFiv_FECHA_FINAL());
				request.setINT_MORA(responseCredito.getDatosCredito().get(i).getInt_MORA());
				request.setINT_VENCIDO(responseCredito.getDatosCredito().get(i).getInt_VENCIDO());
				request.setINT_VIG(responseCredito.getDatosCredito().get(i).getInt_VIG());
				request.setINTERES_MORATORIO(responseCredito.getDatosCredito().get(i).getInteres_MORATORIO());
				request.setINTERES_VENCIDO(responseCredito.getDatosCredito().get(i).getInteres_VENCIDO());
				request.setINTERES_VIGENTE(responseCredito.getDatosCredito().get(i).getInteres_VIGENTE());
				request.setIO_FECHA_FINAL(responseCredito.getDatosCredito().get(i).getIo_FECHA_FINAL());
				request.setIO_FECHA_INCIAL(responseCredito.getDatosCredito().get(i).getIo_FECHA_INCIAL());
				request.setIVA(responseCredito.getDatosCredito().get(i).getIva());
				request.setMoneda(responseCredito.getDatosCredito().get(i).getMoneda());
				request.setMONTO_DEUDA(responseCredito.getDatosCredito().get(i).getMonto_DEUDA());
				request.setMONTO_LINEA(responseCredito.getDatosCredito().get(i).getMonto_LINEA());
				request.setMontoDeAbonos(responseCredito.getDatosCredito().get(i).getMontoDeAbonos());
				request.setNOMBRETO(responseCredito.getDatosCredito().get(i).getNombreto());
				request.setNombre(responseCredito.getDatosCredito().get(i).getNombreto());
				request.setNumAbonos(responseCredito.getDatosCredito().get(i).getNumAbonos());
				request.setNumSecAc(req.getCredito());
				request.setPAGO_CAPITAL(responseCredito.getDatosCredito().get(i).getPago_CAPITAL());
				request.setPAGO_INTERES(responseCredito.getDatosCredito().get(i).getPago_INTERES());
				request.setPAGO_IVA(responseCredito.getDatosCredito().get(i).getPago_IVA());
				request.setPC_FECHA_FINAL(responseCredito.getDatosCredito().get(i).getPc_FECHA_FINAL());
				request.setPC_PAGO_CAPITAL(responseCredito.getDatosCredito().get(i).getPc_PAGO_CAPITAL());
				request.setPI_FECHA_FINAL(responseCredito.getDatosCredito().get(i).getPi_FECHA_FINAL());
				request.setPI_PAGO_INTERES(responseCredito.getDatosCredito().get(i).getPi_PAGO_INTERES());
				request.setPI_REVI_DE_TASA(responseCredito.getDatosCredito().get(i).getPi_REVI_DE_TASA());
				request.setPIV_FECHA_FINAL(responseCredito.getDatosCredito().get(i).getPiv_FECHA_FINAL());
				request.setREVI_DE_TASA(responseCredito.getDatosCredito().get(i).getRevi_DE_TASA());
				request.setRfc(req.getRfc());/*hay que cambiarlo por el rfc que esta en el front*/
				System.out.println(request.getRfc());
				request.setSALDO(responseCredito.getDatosCredito().get(i).getSaldo());
				request.setSALDO_FINAL(responseCredito.getDatosCredito().get(i).getSaldo_FINAL());
				request.setSucursal(responseCredito.getDatosCredito().get(i).getSucursal());
				request.setTASA(responseCredito.getDatosCredito().get(i).getTasa());
				request.setTASA_MOR(responseCredito.getDatosCredito().get(i).getTasa_MOR());
				request.setTASA_MORATORIA(responseCredito.getDatosCredito().get(i).getTasa_MORATORIA());
				request.setTASA_ORDINARIA(responseCredito.getDatosCredito().get(i).getTasa_ORDINARIA());
				request.setTerminal(bsfOperadorDecrypt.getBSFOPERADOR().getTERMINAL());
				request.setTIPO_CONTRATO(responseCredito.getDatosCredito().get(i).getTipo_CONTRATO());
				request.setTIPO_CRED(responseCredito.getDatosCredito().get(i).getTipo_CRED());
				request.setTIPOCTA("");/*Hay que cambiarlo por el producto que viene en el front end*/
				request.setTotalPagar(responseCredito.getDatosCredito().get(i).getTotalPagar());
				request.setUsuario(bsfOperadorDecrypt.getBSFOPERADOR().getUSERTCB());
				request.setVENCIMIENTO(responseCredito.getDatosCredito().get(i).getVencimiento());
				
			}
			
		}
		System.out.println(this.util.objectToJson(request));
		
		String jsonRes = this.util.callRestPost(request, EstadoConsultaPDF);
		System.out.println("json pdf"+jsonRes+"nada");
		if(!jsonRes.equals(""))
		{
			try {
				 response = (ResponseDTO) this.util.jsonToObject(response, jsonRes);
			} catch (ParseException e) {
				e.printStackTrace();
				response.setMensajeInterno(errorGeneral+e.getMessage());
				response.setStatus(errorStatus);
			}
		}
		else
		{
			response.setMensajeInterno(errorGeneral+"error en if");
			response.setStatus(errorStatus);
		}
		System.out.println(response.getMensajeInterno());
		return response;
	}
}
