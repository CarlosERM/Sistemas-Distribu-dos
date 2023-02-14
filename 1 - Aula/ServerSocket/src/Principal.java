import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class Principal {
    public static void main(String[] args) throws IOException {
        ServerSocket ss = new ServerSocket(4999);
        Socket s = ss.accept();

        // Apresentar print.
        InputStreamReader in = new InputStreamReader(s.getInputStream());
        BufferedReader bf = new BufferedReader(in);
        String token = bf.readLine();

        PrintWriter pr = new PrintWriter(s.getOutputStream());

        // [Client - Server] - Token de identificação.
        if(token.equals("189")) {
            // [Server - Client] - Se correto, envia os dados do usuário.
            pr.println("{sucess: true, data: {id: 1, nome: Arlequina66, email: giovanagata55@hotmail.com}}");
        } else {
            pr.println("{sucess: false, msg: O token é 189.}");
        }

        pr.flush();

        String fotos =  "{id: 1, image: PipocaMaluca.jpg}, {id:2, image: JujubaVermelha.jpg},{id:3, image: História.jpg}";
        String tokenEPhotos = bf.readLine();
        // [Client - Server] - Token de identificação, '/photos'.
        if(tokenEPhotos.equals("189, '/photo'")) {
            // [Server - Client] - Retorna as fotos do usuário.
            pr.println("{sucess: true, data:" + fotos);
        } else {
            pr.println("{sucess: false, msg: Token ou rota inválidos.");  
        }
        pr.flush();


        // [Client - Server] - ID Photo, Delete. 
        String idDelete = bf.readLine();
        String foto = "{sucess: false, msg: Não tem nada aqui.}";
        if(idDelete.equals("189, 1, DELETE")) {
            foto =  "{sucess: true, data: {id: 1, image: PipocaMaluca.jpg}}";
        } else if(idDelete.equals("189, 2, DELETE")) {
            foto =  "{sucess: true, data: {id: 2, image: JujubaVermelha.jpg}}";
        } else if(idDelete.equals("189, 3, DELETE")) {
            foto =  "{sucess: true, data: {id: 3, image: História.jpg}}";
        } else {
            foto ="{sucess: false, msg: Deu errado.}";
        }
        pr.println(foto);
        pr.flush();
  
    }
}
