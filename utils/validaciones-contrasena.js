// ------------------- VALIDAR CONTRASEÑA --------------------

function validarContrasena(contrasena) {
  if (contrasena.length < 5) {
    return false;
  }

  let tieneMayuscula = false;
  let tieneMinuscula = false;
  let tieneNumero = false;
  let todasValidas = false;

  for (let i = 0; i < contrasena.length; i++) {
    let caracter = contrasena.charAt(i);

    if (caracter >= "A" && caracter <= "Z") {
      tieneMayuscula = true;
    }

    if (caracter >= "a" && caracter <= "z") {
      tieneMinuscula = true;
    }

    if (caracter >= "0" && caracter <= "9") {
      tieneNumero = true;
    }

    if (tieneMayuscula && tieneMinuscula && tieneNumero) {
      todasValidas = true;
      break;
    }
  }

  if (todasValidas) {
    return true;
  } else {
    return false;
  }
}
