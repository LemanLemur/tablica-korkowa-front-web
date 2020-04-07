export function returnErrorMsg(code) {
  switch (code) {
    case "auth/wrong-password": {
      return "Nieprawidłowe hasło.";
    }
    case "auth/invalid-email": {
      return "Nieprawidłowy format maila.";
    }
    case "auth/email-already-in-use": {
      return "Ten adres e-mail jest już w użyciu.";
    }
    case "auth/success-login": {
      return "Logowanie zakończone sukcesem.";
    }
    case "auth/success-register": {
      return "Rejestracja zakończona sukcesem.";
    }
    default:
      return "Nieoczekiwany błąd!";
  }
}
