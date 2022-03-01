import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {

  /**
   * Bejelentkezett felhasználó tokene.
   */
  loadToken() {
    return localStorage.getItem("token");
  }

  /**
   * Bejelentkezett felhasználó neve.
   */
  loadUsername() {
    return localStorage.getItem("userName");
  }

  /**
   * Bejelentkezett felhasználó jogosultsága.
   */
  loadPermission() {
    return localStorage.getItem("permission")
  }

  /**
   * Bejelentkezett felhasználó token eltávolítása.
   */
  clearToken() {
    localStorage.removeItem("token");
  }

  /**
   * LocalStorage ürítése.
   */
  clearAll() {
    localStorage.clear();
  }

}
