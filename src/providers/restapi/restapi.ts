import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestapiProvider {
  apiUrlUser:string = 'http://www.vrammdev.com/docppt_rest/Controller/UserController.php';
  apiUrlArchives: string = 'http://www.vrammdev.com/docppt_rest/Controller/ArchiveController.php';

  constructor(public http: HttpClient) {
    console.log('Hello RestapiProvider Provider');
  }

  async insertArchive(data) {
    console.log("sasasa"+data);
    return await this.http.post(`${this.apiUrlArchives}`, data).toPromise();
  }
  async deleteArchive(data) {
    console.log("sasasa"+data);
    return await this.http.post(`${this.apiUrlArchives}`, data).toPromise();
  }
  async insertLogin(data) {
    console.log("sasasa"+data);
    return await this.http.post(`${this.apiUrlUser}`, data).toPromise();
  }
}
