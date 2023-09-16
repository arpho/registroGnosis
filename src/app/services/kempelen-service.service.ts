import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KempelenService {

  constructor(private http: HttpClient
    ) { }

headersFactory(token:string){
  return new HttpHeaders()
  .set("x-jwt",`Bearer ${token}`)
  .set('Content-Type', 'application/json')
  .set("Access-Control-Allow-Origin","localhost:8100/home")



}

    fetchProjectsList(token:string){
      const url = "https://dev.thinkingadditive.com/v0/providers/export/requests?field=_id,options,issued,arguments&sort=-issued"
      const options = {
        headers: this.headersFactory(token),
        observe: 'body' as const,
        responseType: 'json' as const,
        withCredentials: true
      };
      return this.http.get(url,options)

    }
   fetchAsset(ownerKey,assetId,token){
    
 
    //.set("Access-Control-Allow-Origin","localhost:8100")
    
  /*   const params = new HttpParams()
    params.set("owner",ownerKey).set('id',assetId) */
     const options = {
      headers: this.headersFactory(token),
      observe: 'body' as const,
      responseType: 'json' as const,
      withCredentials: true
    };

    const urlFactory= (url:string,owner:string,assetId:string)=>{
     return  `${url}?owner=${owner}&id=${assetId}`
    }

    const url ="https://dev.thinkingadditive.com/v0/providers/export/requests"
return this.http.get(urlFactory(url,ownerKey,assetId),options)
  }
}
