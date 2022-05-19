import { Component, OnInit } from '@angular/core';
import { ArArFilter } from '../ar-ar-filter';
import { ArArService } from '../ar-ar.service';
import { ArAr } from '../ar-ar';

@Component({
  selector: 'app-ar-ar',
  templateUrl: 'ar-ar-list.component.html',
  styles: [
    // todo: figure out how to make width dynamic
    'table { min-width: 600px }',
  ]
})
export class ArArListComponent implements OnInit {
  displayedColumns = ['id','name','date_entered','date_modified','modified_user_id','modified_by_name','created_by','created_by_name','description','deleted','created_by_link','modified_user_link','assigned_user_id','assigned_user_name','assigned_user_link','SecurityGroups','document_name','filename','file_ext','file_mime_type','uploadfile','active_date','exp_date','category_id','subcategory_id','status_id','status','prj_ar_date','prj_ar_text1','prj_ar_text2','prj_ar_int1','accounts_ar_ar_1','accounts_ar_ar_1_name','accounts_ar_ar_1accounts_ida','arc_ar_comments_ar_ar','l1_legal_ar_ar','l1_legal_ar_ar_name','l1_legal_ar_arl1_legal_ida','project_ar_ar_1','project_ar_ar_1_name','project_ar_ar_1project_ida','ar_amt31_60_c','ar_amt_0_30_c','ar_amt_61_90_c','ar_amt_91_120_c','ar_amt_over_120_c','ar_bool_0_30_c','ar_bool_31_60_c','ar_bool_61_90_c','ar_bool_91_120_c','ar_bool_over_120_c','ar_client_days_c','ar_func_dropdown_forfilter_c','ar_index_c','ar_inter_company_c','ar_inter_co_text_c','ar_latest_comment_c','ar_latest_inv_amount_c','ar_legal_action_c','ar_legal_case_no_c','ar_legal_comments_c','ar_original_inv_amnt_c','ar_payment_calculated_date_c','ar_payment_date_comments_c','ar_payment_delta_c','ar_payment_status_c','ar_pd_c','ar_reg_dropdown_forfilter_c','ar_withholding_tax_c','currency_id','prj_ar_amount_c','prj_ar_amount_outstanding_c','prj_ar_billing_function_c','prj_ar_billing_org_c','prj_ar_billing_region_c','prj_ar_comment_history_c','prj_ar_cons_client_c','prj_ar_days_c','prj_ar_evc_code_c','prj_ar_evc_name_c','prj_ar_gl_accout_code_c','prj_ar_inv_date_c','prj_ar_inv_no_c','prj_ar_new_comment_c','prj_ar_over365d_c','prj_ar_payment_amount_c','prj_ar_pm_c','prj_ar_proj_name_c','prj_ar_proj_no_c','prj_ar_unique_id_hidden_c','actions'];
  filter = new ArArFilter();
  selectedArAr!: ArAr;
  feedback: any = {};

  get arArList(): ArAr[] {
    return this.arArService.arArList;
  }

  constructor(private arArService: ArArService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.arArService.load(this.filter);
  }

  select(selected: ArAr): void {
    this.selectedArAr = selected;
  }

  delete(arAr: ArAr): void {
    if (confirm('Are you sure?')) {
      this.arArService.delete(arAr).subscribe({
        next: () => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      });
    }
  }
}
