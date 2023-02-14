package Aula_01.client;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

import javax.swing.JOptionPane;

public class index {
  public static void main(String[] args) {
    try {
      Socket socket = new Socket("localhost", 4999);
      String username = null;

      do {
        InputStreamReader input = new InputStreamReader(socket.getInputStream());
        BufferedReader buffer = new BufferedReader(input);
        String str = buffer.readLine();

        String values[] = str.split("@#");
        String message = "";
        
        if(values.length > 1) {
          username = values[0];
          message = values[1];
        }
        else {
          message = values[0];
        }
        
        PrintWriter pr = new PrintWriter(socket.getOutputStream());
        pr.println(JOptionPane.showInputDialog(null, message, username, 1));
        pr.flush();


      } while (true);

    } catch (Exception e) {
      // TODO: handle exception
    }
  }
}
