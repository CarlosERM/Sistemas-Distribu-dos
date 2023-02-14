package Aula_01.server.module;


public class User {
  private String name = "";
  private String email = "";
  private int idade;
  private String password = "";
  
  public User(String name, String email, int idade ) {
    this.name = name;
    this.email = email;
    this.idade = idade;
    this.password = "root";
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public int getIdade() {
    return idade;
  }

  public void setIdade(int idade) {
    this.idade = idade;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public boolean verifyPassword(String password){
    if(this.password.equalsIgnoreCase((password))){
      return true;
    }
    return false;
  }
  
}
