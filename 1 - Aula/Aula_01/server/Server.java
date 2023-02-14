package Aula_01.server;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;

import Aula_01.server.module.User;

public class Server {
  public enum UserOptions {
    AUTH, OUT, CREATE, EDIT, PROFILE
  }

  public ArrayList<User> users = new ArrayList<>();
  private User authUser;

  public Server() {
    this.authUser = null;
    users.add(new User("Adriano Costa", "adrianocosta@gmail.com", 20));
    users.add(new User("Danilo dos Santos", "danilo@gmail.cc", 18));
    users.add(new User("Moto Moto", "moto@gmail.com", 32));
    users.add(new User("root", "root@gmail.com", 0));
    users.add(new User("Paulo Costa", "paulo.costa@gmail.com", 33));
  }

  public void app() {
    Boolean hasAuth = false;

    try {
      ServerSocket app = new ServerSocket(4999);
      Socket socket = app.accept();

      PrintWriter defaultPrint = new PrintWriter(socket.getOutputStream());
      if (socket.isConnected()) {
        defaultPrint.println(socket.getInetAddress() + " conectado na porta " + socket.getLocalPort());
        defaultPrint.flush();
      }
      do {
        if (this.authUser != null) {
          hasAuth = true;
        }
        else {
          hasAuth = false;
        }

        PrintWriter printWriter = new PrintWriter(socket.getOutputStream());
        InputStreamReader input = new InputStreamReader(socket.getInputStream());
        BufferedReader buffer = new BufferedReader(input);

        String str = buffer.readLine();
        String values[] = str.split(" ");

        if (hasAuth) {
          if (values[0].equals(UserOptions.CREATE.toString())) {
            if (values.length < 4) {
              printWriter.println("Nao ha argumentos suficientes!");
              printWriter.flush();
            } else {
              int newUserIdade = Integer.parseInt(values[3]);
              User newUser = new User(values[1], values[2], newUserIdade);
              if (this.users.add(newUser)) {
                printWriter.println("Usuario criado com sucesso!");
                printWriter.flush();
              } else {
                printWriter.println("Houve um erro ao criar o usuario!");
                printWriter.flush();
              }

            }

          } else if (values[0].equals(UserOptions.EDIT.toString())) {
            printWriter.println("EDIT");
            printWriter.flush();
          } else if (values[0].equals(UserOptions.OUT.toString())) {
            printWriter.println("...disconnected");
            printWriter.flush();
            this.authUser = null;
          } else if (values[0].equals(UserOptions.PROFILE.toString())) {
            printWriter.println("Name - "
                + this.authUser.getName() + ", E-mail - "
                + this.authUser.getEmail() + ", Idade - " + this.authUser.getIdade());
            printWriter.flush();
          } else if (values[0].equals("EXIT")) {
            printWriter.println("Bye bye " + this.authUser.getName());
            printWriter.flush();
            socket.close();
          } else {
            printWriter.println("Comando nao encontrado");
            printWriter.flush();
          }

        } else {
          if (values[0].equals(UserOptions.AUTH.toString())) {
            String email = values[1];
            User user = null;
            for (int i = 0; i < this.users.size(); i++) {
              if (this.users.get(i).getEmail().equals(email)) {
                user = this.users.get(i);
                printWriter.println("Informe o password:");
                printWriter.flush();
                break;
              }
            }
            if (user == null) {
              printWriter.println("Usuario não encontrado!");
              printWriter.flush();
            } else {
              InputStreamReader passwordInput = new InputStreamReader(socket.getInputStream());
              BufferedReader passwordBuffer = new BufferedReader(passwordInput);

              String password = passwordBuffer.readLine();
              if (user.verifyPassword(password)) {
                this.authUser = user;
                printWriter.println(this.authUser.getName() + "@# Autenticado com sucesso!");
                printWriter.flush();
              }
            }
          } else if (values[0].equals("EXIT")) {
            printWriter.println("Bye bye");
            printWriter.flush();
            socket.close();
          } else {
            printWriter.println("Command not found");
            printWriter.flush();
          }
        }

      } while (socket.isConnected());

    } catch (Exception e) {
      System.out.println("Erro - " + e.getMessage());
    }

  }

}
