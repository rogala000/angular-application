import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Campaign } from './campaigns';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/campaign';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched campaigns')),
        catchError(this.handleError('getCampaigns', []))
      );
  }

  getCampaign(id: number): Observable<Campaign> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Campaign>(url).pipe(
      tap(_ => console.log(`fetched campaign id=${id}`)),
      catchError(this.handleError<Campaign>(`getCampaign id=${id}`))
    );
  }

  addCampaign(campaign): Observable<Campaign> {
    return this.http.post<Campaign>(apiUrl, campaign, httpOptions).pipe(
      tap((campaign: Campaign) => console.log(`added campaign w/ id=${campaign.id}`)),
      catchError(this.handleError<Campaign>('addCampaign'))
    );
  }

  updateCampaign(id, campaign): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, campaign, httpOptions).pipe(
      tap(_ => console.log(`updated campaign id=${id}`)),
      catchError(this.handleError<any>('updateCampaign'))
    );
  }

  deleteCampaign(id): Observable<Campaign> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Campaign>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted campaign id=${id}`)),
      catchError(this.handleError<Campaign>('deleteCampaign'))
    );
  }

}
