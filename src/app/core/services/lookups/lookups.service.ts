import { inject, Injectable } from '@angular/core';
import { CommonHttpService } from '../shardServices/common.service';
import { ToasterService } from '../uiServices/toaster.service';
import { HttpPaths } from '../../constants/http-paths';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { ILookup } from '../../models/shard/IGeneralResponse';

@Injectable({
  providedIn: 'root',
})
export class LookupsService {
  private _commonHttp = inject(CommonHttpService);
  private _toast = inject(ToasterService);
  constructor() {}

  getAllRoles() : Observable<ILookup[]>{
    return this._commonHttp.CommonGetRequests(`${environment.baseUrl + HttpPaths.API_LIST_OF_ROLES}`).pipe(
      map((res) => {
        if (res.isSuccess) {
          return res.data;
        }
      }),
      catchError((err) => {
        this._toast.error('Error' + err);
        return of([]);
      }),
    );
  }

  getAllNationalities() : Observable<ILookup[]> {
    return this._commonHttp.CommonGetRequests(`${environment.baseUrl + HttpPaths.API_LIST_OF_NATIONALITIES}`).pipe(
      map((res) => {
        if (res.isSuccess) {
          return res.data;
        }
      }),
      catchError((err) => {
        this._toast.error('Error' + err);
        return of([]);
      }),
    );
  }

  getAllCountries() : Observable<ILookup[]> {
    return this._commonHttp.CommonGetRequests(`${environment.baseUrl + HttpPaths.API_LIST_OF_COUNTRIES}`).pipe(
      map((res) => {
        if (res.isSuccess) {
          return res.data;
        }
      }),
      catchError((err) => {
        this._toast.error('Error' + err);
        return of([]);
      }),
    );
  }
}
