import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBookCharacter } from '../models/bookcharacter';

/**
 * Provides services related to `IBookCharacter` objects.
 */
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  /**
   * URL to backend server
   */
  private url = environment.backendUrl;

  /**
   * Character selected in the `character-list` component and displayed in the `modify-character` component
   */
  targetedCharacter: IBookCharacter | null = null;

  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieve a list of all existing characters from backend.
   * @returns Observable containing the character list
   */
  getAllCharacters(): Observable<IBookCharacter[]> {
    return this.httpClient.get<IBookCharacter[]>(`${this.url}/characters`);
  }

  getTargetedCharacter(): IBookCharacter | null {
    return this.targetedCharacter;
  }

  setTargetedCharacter(targetedCharacter: IBookCharacter) {
    this.targetedCharacter = targetedCharacter;
  }

  /**
   * Send given character to backend to be registered.
   * @param bookCharacter The character to be registered
   * @returns             Observable containing the registered character
   */
  registerCharacter(bookCharacter: IBookCharacter): Observable<IBookCharacter> {
    const httpPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<IBookCharacter>(`${this.url}/characters`, bookCharacter, httpPost);
  }

  /**
   * Sends given character to backend to be updated.
   * @param bookCharacter The character to be updated
   * @returns             Observable containing the updated character
   */
  updateCharacter(bookCharacter: IBookCharacter): Observable<IBookCharacter> {
    const httpPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put<IBookCharacter>(`${this.url}/characters`, bookCharacter, httpPost);
  }

  /**
   * Send request to delete a character of given id to backend.
   * @param id  The id of the character to be deleted
   * @returns   
   */
  deleteCharacter(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.url}/characters?id=${id}`);
  }
}
