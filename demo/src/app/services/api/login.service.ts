import { Inject, Injectable, Optional } from "@angular/core";
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BASE_PATH, Configuration } from "../../../api";
import { Observable } from "rxjs";
import { LoginRequestModel } from "./login-request-model";

@Injectable()
export class LoginService {

  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  protected basePath = 'http://localhost/forkedSuite/Api/V8';

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      if (basePath.includes('/V8')) {
        basePath = basePath.substring(0, basePath.length - 3);
      }
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   *
   * Logging out
   * @param body body of the request which should contain the username and password
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public loginPost(body: LoginRequestModel, observe?: 'body', reportProgress?: boolean): Observable<any>;

  public loginPost(body: LoginRequestModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;

  public loginPost(body: LoginRequestModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;

  public loginPost(body: LoginRequestModel, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];
    body.grant_type = "password";
    body.client_id = "64369fa2-4dbe-89d5-7b61-6148258144d3";

    return this.httpClient.request<any>('post', `${this.basePath}/access_token`,
      {
        withCredentials: this.configuration.withCredentials,
        body: body,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

}
