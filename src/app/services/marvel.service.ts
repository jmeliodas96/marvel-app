import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  timestamp = new Date().getTime();
  apiUrl: string = "";

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.marvelURL;
  }

    // This function get the list of characters from Marvel API
    getMarvelCharacters(offset?: number, limit?: number) {
      return this.http.get<any>(`${this.apiUrl}/v1/public/characters?apikey=${environment.publicApiKey}&hash=${this.generateMd5Hash()}&ts=${this.timestamp}&limit=${limit}&offset=${offset}`);
    }

    generateMd5Hash(){
    	// md5(ts+privateKey+publicKey)
    	const md5String =  this.timestamp + environment.privateApiKey + environment.publicApiKey;
    	const hash = CryptoJS.MD5(md5String);
    	const md5 = hash.toString();
    	return md5;
  	}
}
