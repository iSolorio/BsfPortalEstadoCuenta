package mx.gob.bansefi.EstadoDeCuenta.Service;

import java.util.ArrayList;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import mx.gob.bansefi.EstadoDeCuenta.DTO.BsfOperadorDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.ReqEncryptORDecryptDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.ResEncryptORDecryptDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Modelo.BsfOperador;
import mx.gob.bansefi.EstadoDeCuenta.Util.Util;



@Service
public class SecurityWS {
	
	@Autowired
	Util util;
	private String urlEncrypt;
	private String urlDecrypt;
	
	private static final Logger log = LogManager.getLogger(SecurityWS.class);

	public SecurityWS(@Value("${domain.services}") String domainServices, @Value("${path.encrypt}") String pathEncrypt, @Value("${path.decrypt}") String pathDecrypt) {
		this.urlDecrypt = domainServices + pathDecrypt;
		this.urlEncrypt = domainServices + pathEncrypt;
	}

	public BsfOperadorDTO decriptBsfOperador(ReqEncryptORDecryptDTO req) {
		ResEncryptORDecryptDTO res = null;
		BsfOperadorDTO bsfOperador = new BsfOperadorDTO();
		try {
			String jsonRes = util.callRestPost(req, urlDecrypt);
			res = new ResEncryptORDecryptDTO();
			ArrayList<String> nodos = new ArrayList<String>();
			res = (ResEncryptORDecryptDTO) util.jsonToObject(res, jsonRes, nodos);
			if (res.getCodRet() == 1) {
				res.setError(res.getError().replace('\\', ' '));
				res.setRespuesta(res.getRespuesta().replace('\\', ' '));
				bsfOperador = (BsfOperadorDTO) util.jsonToObject(bsfOperador, res.getRespuesta(), nodos);
				bsfOperador.getBSFOPERADOR().setStatus(res.getCodRet());
			} else {
				log.error("\nError en el servicio decript URL:" + urlDecrypt + " \nStatus: " + res.getCodRet() + "\nMsgError: " + res.getError());
				bsfOperador.getBSFOPERADOR().setStatus(res.getCodRet());
				bsfOperador.getBSFOPERADOR().setDescripcion(res.getError());
			}
		} catch (Exception ex) {
			log.error("\nError en el metodo decriptBsfOperador(ReqEncryptDTO req, String Url)" + "\nException Message: " + ex.getMessage());
			bsfOperador.getBSFOPERADOR().setStatus(0);
		}
		return bsfOperador;
	}


	public ResEncryptORDecryptDTO encriptBsfOperador(ReqEncryptORDecryptDTO req) {
		ResEncryptORDecryptDTO res = null;
		ResEncryptORDecryptDTO response = new ResEncryptORDecryptDTO();
		try {
			String jsonRes = util.callRestPost(req, urlEncrypt);
			res = new ResEncryptORDecryptDTO();
			ArrayList<String> nodos = new ArrayList<String>();
			res = (ResEncryptORDecryptDTO) util.jsonToObject(res, jsonRes, nodos);
			if (res.getCodRet() == 1) {
				response.setCodRet(res.getCodRet());
				response.setRespuesta(res.getRespuesta());
				response.setError(res.getError());
			} else {
				log.error("\nError en el servicio decript URL:" + urlEncrypt + " \nStatus: " + res.getCodRet() + "\nMsgError: " + res.getError());
				response.setCodRet(res.getCodRet());
				response.setError(res.getError());
			}
		} catch (Exception ex) {
			log.error("\nError en el metodo decriptBsfOperador(ReqEncryptDTO req, String Url)" + "\nException Message: " + ex.getMessage());
			response.setCodRet(0);
		}
		return response;
	}
}
