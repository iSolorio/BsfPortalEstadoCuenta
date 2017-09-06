package mx.gob.bansefi.EstadoDeCuenta.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.json.JSONObject;

import mx.gob.bansefi.EstadoDeCuenta.DTO.ResponceSecurity;




public class SecurityService {

	private static final Logger log = LogManager.getLogger(SecurityService.class);

	// Metodo que encripta un mensaje
	public static ResponceSecurity Encriptar(String Cadena, String urlEncrypt) {
		String Salida = "";
		ResponceSecurity responceSecurity = new ResponceSecurity();

		String input = "";
		try {
			JSONObject jsonObject = new JSONObject().put("text", Cadena);
			input = jsonObject.toString();
			URL restServiceURL = new URL(urlEncrypt);
			HttpURLConnection httpConnection = (HttpURLConnection) restServiceURL.openConnection();
			httpConnection.setDoOutput(true);
			httpConnection.setRequestMethod("POST");
			httpConnection.setRequestProperty("Content-Type", "application/json");
			OutputStream outputStream = httpConnection.getOutputStream();
			outputStream.write(input.getBytes());
			outputStream.flush();
			if (httpConnection.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + httpConnection.getResponseCode());
			}
			BufferedReader responseBuffer = new BufferedReader(new InputStreamReader((httpConnection.getInputStream()), "UTF8"));
			String output;
			while ((output = responseBuffer.readLine()) != null) {
				Salida += output;
			}
			JSONObject json = new JSONObject(Salida);

			responceSecurity.setResponce(json.getString("respuesta"));
			responceSecurity.setMsgError(json.getString("error"));

			responceSecurity.setStatus(Integer.parseInt(json.getString("codRet")));
			httpConnection.disconnect();

		} catch (Exception ex) {
			responceSecurity.setMsgError(ex.getMessage());
			responceSecurity.setStatus(0);
			log.error(
					"\nError en el metodo Encriptar(String Cadena, String urlEncrypt)" + "\nParametros de entrada ( " + Cadena + ", " + urlEncrypt + " )" + "\nException Message: " + ex.getMessage());
		}
		return responceSecurity;
	}

	// Metodo que desepcripta un mensaje
	public static ResponceSecurity DesEncriptar(String Cadena, String urlDecrypt) {
		String Salida = "";
		ResponceSecurity responceSecurity = new ResponceSecurity();
		String input = "";
		try {
			JSONObject jsonObject = new JSONObject().put("text", Cadena);
			input = jsonObject.toString();
			URL restServiceURL = new URL(urlDecrypt);
			HttpURLConnection httpConnection = (HttpURLConnection) restServiceURL.openConnection();
			httpConnection.setDoOutput(true);
			httpConnection.setRequestMethod("POST");
			httpConnection.setRequestProperty("Content-Type", "application/json");
			OutputStream outputStream = httpConnection.getOutputStream();
			outputStream.write(input.getBytes());
			outputStream.flush();
			if (httpConnection.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + httpConnection.getResponseCode());
			}
			BufferedReader responseBuffer = new BufferedReader(new InputStreamReader((httpConnection.getInputStream()), "UTF8"));
			String output;
			while ((output = responseBuffer.readLine()) != null) {
				Salida += output;
			}
			JSONObject json = new JSONObject(Salida);
			responceSecurity.setResponce(json.getString("respuesta"));
			responceSecurity.setMsgError(json.getString("error"));
			responceSecurity.setStatus(Integer.parseInt(json.getString("codRet")));
			httpConnection.disconnect();
		} catch (Exception ex) {
			responceSecurity.setMsgError(ex.getMessage());
			responceSecurity.setStatus(0);
			log.error("\nError en el metodo DesEncriptar(String Cadena, String urlDecrypt)" + "\nParametros de entrada ( " + Cadena + ", " + urlDecrypt + " )" + "\nException Message: "
					+ ex.getMessage());
		}
		return responceSecurity;
	}
}
