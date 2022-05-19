import { ArAr } from './ar-ar';
import { ArArFilter } from './ar-ar-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ModuleService } from "../../api";
import { ModelObject } from "../../api/model/model-object";

@Injectable()
export class ArArService {
  arArList: ArAr[] = [];
  api_module_name = 'AR_AR';

  constructor(private http: HttpClient, private moduleService: ModuleService) {
  }

  findById(id: string): Observable<ArAr> {
    return this.moduleService.moduleModuleNameIdGet<ArAr>(this.api_module_name, id);
  }

  load(filter: ArArFilter): void {
    this.find(filter).subscribe({
      next: result => {
        this.arArList = result;
      },
      error: err => {
        console.error('error loading', err);
      }
    });
  }

  find(filter: ArArFilter): Observable<ArAr[]> {
    const filters = [
      { 'column': 'document_name', 'operator': 'eq', 'values': [filter.document_name] },
      { 'column': 'prj_ar_date', 'operator': 'eq', 'values': [filter.prj_ar_date] },
      { 'column': 'accounts_ar_ar_1_name', 'operator': 'eq', 'values': [filter.accounts_ar_ar_1_name] },
      { 'column': 'project_ar_ar_1_name', 'operator': 'eq', 'values': [filter.project_ar_ar_1_name] },
      { 'column': 'ar_func_dropdown_forfilter_c', 'operator': 'eq', 'values': [filter.ar_func_dropdown_forfilter_c] },
      { 'column': 'ar_index_c', 'operator': 'eq', 'values': [filter.ar_index_c] },
      { 'column': 'ar_inter_co_text_c', 'operator': 'eq', 'values': [filter.ar_inter_co_text_c] },
      { 'column': 'ar_latest_comment_c', 'operator': 'eq', 'values': [filter.ar_latest_comment_c] },
      { 'column': 'ar_payment_date_comments_c', 'operator': 'eq', 'values': [filter.ar_payment_date_comments_c] },
      { 'column': 'ar_payment_delta_c', 'operator': 'eq', 'values': [filter.ar_payment_delta_c] },
      { 'column': 'ar_reg_dropdown_forfilter_c', 'operator': 'eq', 'values': [filter.ar_reg_dropdown_forfilter_c] },
      { 'column': 'prj_ar_amount_c', 'operator': 'eq', 'values': [filter.prj_ar_amount_c] },
      { 'column': 'prj_ar_amount_outstanding_c', 'operator': 'eq', 'values': [filter.prj_ar_amount_outstanding_c] },
      { 'column': 'prj_ar_billing_org_c', 'operator': 'eq', 'values': [filter.prj_ar_billing_org_c] },
      { 'column': 'prj_ar_days_c', 'operator': 'eq', 'values': [filter.prj_ar_days_c] },
      { 'column': 'prj_ar_evc_code_c', 'operator': 'eq', 'values': [filter.prj_ar_evc_code_c] },
      { 'column': 'prj_ar_evc_name_c', 'operator': 'eq', 'values': [filter.prj_ar_evc_name_c] },
      { 'column': 'prj_ar_inv_date_c', 'operator': 'eq', 'values': [filter.prj_ar_inv_date_c] },
      { 'column': 'prj_ar_inv_no_c', 'operator': 'eq', 'values': [filter.prj_ar_inv_no_c] },
      { 'column': 'prj_ar_pm_c', 'operator': 'eq', 'values': [filter.prj_ar_pm_c] },
      { 'column': 'prj_ar_proj_name_c', 'operator': 'eq', 'values': [filter.prj_ar_proj_name_c] },
      { 'column': 'prj_ar_proj_no_c', 'operator': 'eq', 'values': [filter.prj_ar_proj_no_c] },
    ];

    return this.moduleService.moduleModuleGet(this.api_module_name, filters);
  }

  save(entity: ArAr): Observable<ArAr> {
    let body: ModelObject = {
      data: {
        type: this.api_module_name,
        attributes: {
          ...entity,
        }
      }
    };

    if (entity.id) {
      body.data.id = entity.id;
      return this.moduleService.modulePatch(body);
    } else {
      return this.moduleService.modulePost(body);
    }
  }

  delete(entity: ArAr): Observable<ArAr> {
    if (entity.id) {
      return this.moduleService.moduleModuleNameIdDelete(this.api_module_name, entity.id);
    }
    return EMPTY;
  }
}

