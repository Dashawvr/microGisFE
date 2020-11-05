import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {ServerResponse, File} from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient
  ) {
  }


  save(file: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('files', file);
    return this.http.post<any>('/files', formData);
  }

  delete(id: string): Observable<any> {
    return this.http.delete('/files/' + id);
  }

  getAll(): Observable<File[]> {
    return this.http.get<ServerResponse<File>>('/files')
      .pipe(
        map(res => res.data)
      );
  }

  getById(id: number): Observable<any> {
    return this.http.get('/files/' + id);
  }

}
