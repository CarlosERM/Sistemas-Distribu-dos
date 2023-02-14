import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

import javax.swing.JOptionPane;

public class Principal {
    public static void main(String[] args) throws UnknownHostException, IOException {
        Socket s = new Socket("localhost", 4999);
        PrintWriter pr = new PrintWriter(s.getOutputStream());
        pr.println(JOptionPane.showInputDialog("Digite o token de identificação: "));
        pr.flush();

        InputStreamReader in = new InputStreamReader(s.getInputStream());
        BufferedReader bf = new BufferedReader(in);
        String userData = bf.readLine();
        System.out.println("Dados do usuário: " + userData);


        pr.println(JOptionPane.showInputDialog("Fotos: "));
        pr.flush();

        String fotos = bf.readLine();
        System.out.println("Fotos do usuário: " + fotos);

        pr.println(JOptionPane.showInputDialog("Token, ID, Delete: "));
        pr.flush();

        String fotoDeletada = bf.readLine();
        System.out.println("Foto deletada: " + fotoDeletada);

        s.close();
    }
}
