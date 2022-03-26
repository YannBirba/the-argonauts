import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Argonaut } from 'src/models/argonaut.model';

@Injectable({
  providedIn: 'root',
})
export class ArgonautService {
  private readonly API_ENDPOINT = 'argonauts';

  constructor(private http: HttpClient) {}
  getAll(): Observable<Argonaut[]> {
    return this.http
      .get<{ data: Argonaut[] }>(environment.API_URL + this.API_ENDPOINT)
      .pipe(map((argonauts) => argonauts.data || []));
  }
  get(id: number): Observable<Argonaut> {
    return this.http
      .get<{ data: Argonaut }>(
        environment.API_URL + this.API_ENDPOINT + '/' + id
      )
      .pipe(map((argonaut) => argonaut.data));
  }
  create(argonaut: Argonaut): Observable<any> {
    return this.http.post<Argonaut>(
      environment.API_URL + this.API_ENDPOINT,
      argonaut
    );
  }
  update(argonaut: Argonaut): Observable<Argonaut> {
    return this.http.put<Argonaut>(
      environment.API_URL + this.API_ENDPOINT + '/' + argonaut.id,
      argonaut
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Argonaut>(
      environment.API_URL + this.API_ENDPOINT + '/' + id
    );
  }
}
