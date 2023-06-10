function maximoDivisorComum(a, h) {
    // É uma função que retorna o máximo divisor comum.
    let temp;
    while (true) {
        temp = a % h;
        if (temp == 0) return h;
        a = h;
        h = temp;
    }
}

let p = 3;
let q = 7;

// Armazena a primeira parte da chave pública.
let n = p * q;

// Achando a outra parte da chave pública. 
// e significa encriptar.
let e = 2;
let phi = (p - 1) * (q - 1);

while (e < phi) {
    // e e phi tem que ser primos entre si, e o e tem que ser menor que phi.
    if (maximoDivisorComum(e, phi) == 1) break;
    else e++;
}

let k = 2; // Um valor constante.
let d = (1 + (k * phi)) / e;

// A mensagem que vai ser encriptada.
let msg = 12;

console.log("Mensagem = " + msg);

// Encriptação c = (msg^e) % n.
let c = Math.pow(msg, e);
c = c % n;

console.log("Dados encriptados = " + c);

// Decriptação m = (c ^ d) % n.
let m = Math.pow(c, d);
m = m % n;
console.log("Mensagem original= " + m);
    

// Créditos: Sundaram.
// Fonte: https://www.geeksforgeeks.org/rsa-algorithm-cryptography/