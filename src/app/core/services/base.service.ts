import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable } from "rxjs";
import { apiUrl } from "../../../environments/environment";

/**
 * Base Service a crud műveletekhez.
 * @typeParam Generic type
 * @author david.balogh
 * @export
 * @class
 */
export class BaseService<Type> {

  private http: HttpClient;

  constructor(protected injector: Injector, private endpoint: string) {
    this.http = injector.get(HttpClient);
  };

  /**
   * {Type} típusú objektumok lekérése.
   * @return {Observable}
   */
  fetchData(from: number, to: number, other: string = ""): Observable<Type[]> {
    return this.http.get<Type[]>(`${apiUrl}/${this.endpoint}/${from}/${to}/${other}`);
  }

  /**
   * {Type} típusú objektum lekérése id szerint.
   * @param typeId - Objektum azonosítója.
   * @return {Observable}
   */
  findBy(typeId: string): Observable<Type> {
    return this.http.get<Type>(`${apiUrl}/${this.endpoint}/${typeId}`);
  }

  /**
   * {Type} típusú objektum lekérése felhasználónév szerint.
   * @param userName - Entitás felhasználóneve.
   * @return {Observable}
   */
  findByUserName(userName: string): Observable<Type> {
    return this.http.get<Type>(`${apiUrl}/${this.endpoint}?userName=${userName}`);
  }

  /**
   * {Type} típusú objektum törlése id szerint.
   * @param typeId - Objektum azonosítója.
   * @return {Observable}
   */
  deleteBy(typeId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${apiUrl}/${this.endpoint}/${typeId}`);
  }

  /**
   * Entitás létrehozása.
   * @param entity entitás
   * @return {Observable}
   */
  create(entity: Type): Observable<Type> {
    return this.http.post<Type>(`${apiUrl}/${this.endpoint}`, entity);
  }

  /**
   * Entitás módosítása.
   * @param entity entitás
   * @param id entitás azonosítója
   * @return {Observable}
   */
  update(entity: Type, id: string): Observable<Type> {
    return this.http.put<Type>(`${apiUrl}/${this.endpoint}/${id}`, entity);
  }
}
