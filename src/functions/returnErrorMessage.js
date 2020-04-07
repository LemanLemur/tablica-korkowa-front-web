export function returnErrorMsg(code) {
  switch (code) {
    case "auth/wrong-password": {
      return "Nieprawidłowe hasło.";
    }
    case "auth/invalid-email": {
      return "Nieprawidłowy format maila.";
    }
    case "auth/success-login": {
      return "Logowanie zakończone sukcesem.";
    }
    default:
      return "Nieoczekiwany błąd!";
  }
}
