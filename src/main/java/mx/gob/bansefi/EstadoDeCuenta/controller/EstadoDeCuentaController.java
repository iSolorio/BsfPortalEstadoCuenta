package mx.gob.bansefi.EstadoDeCuenta.controller;


import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import mx.gob.bansefi.EstadoDeCuenta.DTO.BsfOperadorDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.DatosGeneralesDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.ReqEncryptORDecryptDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Modelo.DatosBasicosDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Modelo.ModeloMaestroDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Request.ReqCreditoDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Request.ReqDatosCreditoDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Request.ReqPDFDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.ResDatosCreditoDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.ResDatosGralDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.ResEstadoDeCuentaDTO;
import mx.gob.bansefi.EstadoDeCuenta.DTO.Response.ResponseDTO;
import mx.gob.bansefi.EstadoDeCuenta.Service.SecurityWS;
import mx.gob.bansefi.EstadoDeCuenta.Service.WsService;


@RestController
public class EstadoDeCuentaController {
	
	@Autowired
	SecurityWS securityWs;
	@Autowired 
	WsService wsService;
    public String operador;

    // ===========================================================Mapping desde la ventana de datos generales===========================//
    // Mapping de datos Generales a Los otros Modulos
    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ModelAndView Index(@RequestParam("BSFOPERADOR") String bsfOperador) // Inicio del flujo
    {
    	System.out.println(bsfOperador);
        if (!bsfOperador.equals("")) {
            operador = bsfOperador;
            BsfOperadorDTO bsfOperadorDecrypt = securityWs.decriptBsfOperador(new ReqEncryptORDecryptDTO(bsfOperador));
            System.out.println(bsfOperadorDecrypt.getBSFOPERADOR().getUSERTCB()); 
            DatosBasicosDTO Model = new DatosBasicosDTO();
            try {
                ReqEncryptORDecryptDTO reqEncryptORDecryptDTO = new ReqEncryptORDecryptDTO(bsfOperador);
                BsfOperadorDTO bsfOperadorDTO = securityWs.decriptBsfOperador(reqEncryptORDecryptDTO);
                ModeloMaestroDTO ModelMaster = new ModeloMaestroDTO();
                ModelMaster.setCentro(bsfOperadorDecrypt.getBSFOPERADOR().getCENTRO());
                Model.setBsfOperador(bsfOperador);
                
            } catch (Exception ex) {
                System.out.print(ex.getMessage());
            }
            return new ModelAndView("Estado/DatosBasicos").addObject("Model", Model);
        } else {
            return new ModelAndView("error/500").addObject("msgError", "ERROR A RECIBIR LOS DATOS");

        }
    }
 @RequestMapping(value="/prueba")
    public ModelAndView pruaba() {
	 System.out.println(new ModelAndView("Estado/pruebaPost.html"));
	 ModelAndView m= new ModelAndView("Estado/pruebaPost");
	System.out.println( m.getStatus()+"mdmdmdm");
        return m;
    }
 @RequestMapping(value="/consultaPDF",method=RequestMethod.POST)
 public ResponseDTO consultaPDF(@RequestBody ReqPDFDTO request)
 {	
	
	 System.out.println(request.getCredito());
	 return wsService.consultaPDF(request);
 }
 @RequestMapping(value = "/consultaDatos", method = RequestMethod.POST)
 public ResDatosGralDTO consultaDatos(@RequestBody DatosBasicosDTO request) {
	 
	 System.out.println(request.getIdInternoPe()+"|||||"+request.getApeMa()+"||||"+request.getBsfOperador());
	 
	 return   wsService.consultaDatos(request);
 }
 
 @RequestMapping(value = "/consultaCredito", method = RequestMethod.POST)
 public ResDatosCreditoDTO consultaCredito(@RequestBody ReqCreditoDTO request) {
	 System.out.println("Entra");
	 System.out.println(request.getCredito()+"credito!!!");
	 return   wsService.consultaCredito(request);
 }
 
 @RequestMapping(value="test")
 public ModelAndView te() {
	 return new ModelAndView("fragments/prueba");
 }

}