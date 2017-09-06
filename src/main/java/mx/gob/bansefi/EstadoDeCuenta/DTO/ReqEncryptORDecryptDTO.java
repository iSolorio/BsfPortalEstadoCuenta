package mx.gob.bansefi.EstadoDeCuenta.DTO;

/**
 * Created by AppWIns on 17/04/2017.
 */
public class ReqEncryptORDecryptDTO {

    private String text;

    public ReqEncryptORDecryptDTO() {
    }

    public ReqEncryptORDecryptDTO(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
