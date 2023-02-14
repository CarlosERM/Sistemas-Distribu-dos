import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

import javax.swing.JOptionPane;

public class App {
    public static void main(String[] args) throws Exception {
        Socket s = new Socket("10.1.6.157", 4999);
        PrintWriter pr = new PrintWriter(s.getOutputStream());
        InputStreamReader in = new InputStreamReader(s.getInputStream());
        BufferedReader bf = new BufferedReader(in);

        String serverMessage = bf.readLine();
        System.out.println(serverMessage);

        pr.println(JOptionPane.showInputDialog("Digite o seu email: "));
        pr.flush();

        String senha = bf.readLine();
        System.out.println(senha);

        pr.println(JOptionPane.showInputDialog(senha));
        pr.flush();

        String autenticado = bf.readLine();
        System.out.println(autenticado);

        pr.println(JOptionPane.showInputDialog(autenticado));
        pr.flush();


        String usuario = bf.readLine();
        System.out.println(usuario);

        pr.println(JOptionPane.showInputDialog(usuario));
        pr.flush();

        String out = bf.readLine();
        System.out.println(out);

        pr.println(JOptionPane.showInputDialog(out));
        pr.flush();

        String criar = bf.readLine();
        System.out.println(criar);

        pr.println(JOptionPane.showInputDialog(criar));
        pr.flush();

        String logar = bf.readLine();
        System.out.println(logar);

        pr.println(JOptionPane.showInputDialog(logar));
        pr.flush();

        String teste = bf.readLine();
        System.out.println(teste);

        pr.println(JOptionPane.showInputDialog(teste));
        pr.flush();

        s.close();
    }
}
