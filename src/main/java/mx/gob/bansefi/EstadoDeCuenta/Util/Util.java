package mx.gob.bansefi.EstadoDeCuenta.Util;

import com.google.gson.Gson;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;


@Component
public final class Util<T> {

  

    /*
     * Método utilitario para convertir un json a un objeto.
     */
    public Object jsonToObject(T objectRes, String json, ArrayList<String> nodos) throws ParseException {
        Gson gson = new Gson();
        JSONParser parser = new JSONParser();
        Object objRes = parser.parse(json);
        JSONObject jsonObject  = (JSONObject) objRes;
        for (String nodo : nodos){
            jsonObject = (JSONObject) jsonObject.get(nodo);
        }
        String jsonResponse = jsonObject.toJSONString();
        try {
            return gson.fromJson(jsonResponse, ((T)objectRes).getClass());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    /*
     * Método utilitario para convertir un json a un objeto sin nodos.
     */
    public Object jsonToObject(T objectRes, String json) throws ParseException {
        Gson gson = new Gson();
        JSONParser parser = new JSONParser();
        Object objRes = parser.parse(json);
        JSONObject jsonObject  = (JSONObject) objRes;
        String jsonResponse = jsonObject.toJSONString();
        try {
            return gson.fromJson(jsonResponse, ((T)objectRes).getClass());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /*
     * Método utilitario para convertir un objeto a un json.
     */
    public String objectToJson(Object obj) {
        Gson gson = new Gson();
        return gson.toJson(obj);
    }

    /*
     * Método utilitario para realizar llamada REST por el método POST
     */
    public String callRestPost(Object obj, String uri) {
       
        String output = "";
        try {
            String input = this.objectToJson(obj);
            URL restServiceURL = new URL(uri);
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
            BufferedReader responseBuffer = new BufferedReader(
                    new InputStreamReader((httpConnection.getInputStream()), "UTF8"));
            String outputline;
            while ((outputline = responseBuffer.readLine()) != null) {
                output += outputline;
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return output;
    }

}