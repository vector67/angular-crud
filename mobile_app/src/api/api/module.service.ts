/**
 * SalesAgility REST API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 8.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { ModelObject } from '../model/model-object';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { map } from "rxjs/operators";


@Injectable()
export class ModuleService {

  protected basePath = 'http://localhost/forkedSuite/Api/V8';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
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


  /**
   *
   * Returns a collections of beans
   * @param module Name of the module
   * @param fieldFilters Filtering attributes of each bean
   * @param pageSize Number of beans showed in a page
   * @param pageNumber Number of a page
   * @param sort Sorting the bean list based on this parameter. Ascending by default, but if sort is prefixed with a minus (U+002D HYPHEN-MINUS, &#x27;-&#x27;), sort will be descending
   * @param filterOperator Filtering the bean collection and using it between two or more conditions as logical operator. Only one level conditions are supported so far. Supported operators: AND, OR
   * @param filterNameEq Filtering the bean collections by conditions. The [name] is the  bean&#x27;s property, the [eq] is a comparison operator. Supported operators: EQ, NEQ, GT, GTE, LT, LTE
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public moduleModuleGetRaw(module: string, fieldFilters?: { column: string, operator: string, values: string[] }[], fields?: string, pageSize?: number, pageNumber?: number, sort?: string, filterOperator?: string, observe?: 'body', reportProgress?: boolean): Observable<any> {

    if (module === null || module === undefined) {
      throw new Error('Required parameter module was null or undefined when calling moduleModuleGet.');
    }
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (fields !== undefined && fields !== null) {
      queryParameters = queryParameters.set(`fields[${module}]`, <any>fields);
    }
    if (pageSize !== undefined && pageSize !== null) {
      queryParameters = queryParameters.set('page[size]', <any>pageSize);
    } else {
      queryParameters = queryParameters.set('page[size]', '30');
    }
    if (pageNumber !== undefined && pageNumber !== null) {
      queryParameters = queryParameters.set('page[number]', <any>pageNumber);
    } else {
      queryParameters = queryParameters.set('page[number]', '1');
    }
    if (sort !== undefined && sort !== null) {
      queryParameters = queryParameters.set('sort', <any>sort);
    }
    if (filterOperator !== undefined && filterOperator !== null) {
      queryParameters = queryParameters.set('filter[operator]', <any>filterOperator);
    }
    if (fieldFilters !== undefined && fieldFilters !== null) {
      fieldFilters.forEach(fieldFilter => {
        fieldFilter.values.forEach((value, index) => {
          queryParameters = queryParameters.set(`filter[${fieldFilter.column}][${fieldFilter.operator}][${index}]`, <any>value);
        })
      })
    }

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

    return this.httpClient.request<any>('get', `${this.basePath}/module/${encodeURIComponent(String(module))}`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    )
  }
  public moduleModuleGet(module: string, fieldFilters?: { column: string, operator: string, values: string[] }[], fields?: string, pageSize?: number, pageNumber?: number, sort?: string, filterOperator?: string, observe?: 'body', reportProgress?: boolean): Observable<any> {
    return this.moduleModuleGetRaw(module, fieldFilters, fields, pageSize, pageNumber, sort, filterOperator, observe, reportProgress)
      .pipe(
      map(response => {
          return response.data.map((value: any) => ({id: value.id, ...value.attributes}));
        }
      )
    );
  }
  /**
   *
   * Delete a bean with specific ID
   * @param moduleName Name of the module
   * @param id ID of the module
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public moduleModuleNameIdDelete(moduleName: string, id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public moduleModuleNameIdDelete(moduleName: string, id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public moduleModuleNameIdDelete(moduleName: string, id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public moduleModuleNameIdDelete(moduleName: string, id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (moduleName === null || moduleName === undefined) {
      throw new Error('Required parameter moduleName was null or undefined when calling moduleModuleNameIdDelete.');
    }

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling moduleModuleNameIdDelete.');
    }

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

    return this.httpClient.request<any>('delete', `${this.basePath}/module/${encodeURIComponent(String(moduleName))}/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   *
   * Returns a bean with the specific ID
   * @param moduleName Name of the module
   * @param id ID of the module
   * @param fieldsContacts Filtering attributes of the bean
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public moduleModuleNameIdGet<CRMModule>(moduleName: string, id: string, fieldsContacts?: string, observe?: 'body', reportProgress?: boolean): Observable<CRMModule> {

    if (moduleName === null || moduleName === undefined) {
      throw new Error('Required parameter moduleName was null or undefined when calling moduleModuleNameIdGet.');
    }

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling moduleModuleNameIdGet.');
    }


    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (fieldsContacts !== undefined && fieldsContacts !== null) {
      queryParameters = queryParameters.set('fields[Contacts]', <any>fieldsContacts);
    }

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

    return this.httpClient.request<any>('get', `${this.basePath}/module/${encodeURIComponent(String(moduleName))}/${encodeURIComponent(String(id))}`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    ).pipe(
      map(response => {
        return {id: response.data.id, ...response.data.attributes}
      })
    );
  }

  /**
   *
   *
   * @param body Update a module record. Type and ID are required, attributes have to be valid
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public modulePatch(body?: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any> {


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
    const consumes: string[] = [
      'application/vnd.api+json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('patch', `${this.basePath}/module`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    ).pipe(
      map(response => {
        return {id: response.data.id, ...response.data.attributes}
      })
    );
  }

  /**
   *
   *
   * @param body Create a module record. If ID is not set, it will be created automatically. Attributes is optional, if the new bean will be set with certain, valid properties
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public modulePost(body?: ModelObject, observe?: 'body', reportProgress?: boolean): Observable<any> {


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
    const consumes: string[] = [
      'application/vnd.api+json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('post', `${this.basePath}/module`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    ).pipe(
      map(response => {
        return {id: response.data.id, ...response.data.attributes}
      })
    );
  }

}