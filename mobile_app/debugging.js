return  function(obj) {
  obj || (obj = {});
  let __t;
  let __p = '';
  const __escapes = {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;","`":"&#96;"};
  const __escapesre = new RegExp('[&<>"\\\'`]', 'g');

  const __e = function(s) {
    return s ? s.replace(__escapesre, function(key) { return __escapes[key]; }) : '';
  };
  with (obj) {
    __p += "<nav aria-label=\"breadcrumb\">\n    <ol class=\"breadcrumb\">\n        <li class=\"breadcrumb-item\"><a routerLink=\"/\">Home</a></li>\n        <li class=\"breadcrumb-item active\">";
    __p += ((__t = (model.title)) == null) ? '' : __t;
    __p += "</li>\n    </ol>\n</nav>\n<!-- todo: figure out better material styling for alerts -->\n\n<mat-card>\n    <mat-card-title>";
    __p += ((__t = (model.title)) == null) ? '' : __t;
    __p += " Detail</mat-card-title>\n    <div *ngIf=\"loading\" class=\"cover\"></div>\n    <mat-card-content>\n        <div *ngIf=\"feedback.message\" class=\"alert alert-{{feedback.type}}\">{{ feedback.message }}</div>\n        <form *ngIf=\"";
    __p += ((__t = (camelize(name))) == null) ? '' : __t;
    __p += "\" #editForm=\"ngForm\" (ngSubmit)=\"save()\">\n";
    for (let panel of model.editPanels) {
      __p += "            <div>\n";
      for (let row of panel.rows) {
        __p += "                <div class=\"row\">\n";
        for (let field of row) { field = getModelField(model, field);
          if (field.type !== 'relate') {
            __p += "                    <mat-form-field class=\"half-width\">\n                        <mat-label ";
            if (!field.readonly) {
              __p += "for=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\"";
            }
            __p += ">";
            __p += ((__t = (field.label)) == null) ? '' : __t;
            __p += "</mat-label>\n";
            if (field.readonly) {
              __p += "                        <input matInput [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" placeholder=\"";
              __p += ((__t = (field.label)) == null) ? '' : __t;
              __p += "\" readonly>\n";
            } else if (field.type === 'date') {
              __p += "                        <input matInput [matDatepicker]=\"picker\" [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" placeholder=\"";
              __p += ((__t = (field.label)) == null) ? '' : __t;
              __p += "\"><mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle><mat-datepicker #picker></mat-datepicker>\n";
            } else if (field.type === 'number') {
              __p += "                        <input matInput type=\"number\" [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" placeholder=\"";
              __p += ((__t = (field.label)) == null) ? '' : __t;
              __p += "\">\n";
            } else if (field.type === 'hidden') {
              __p += "                        <input type=\"hidden\" [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" placeholder=\"";
              __p += ((__t = (field.label)) == null) ? '' : __t;
              __p += "\">\n";
            } else if (field.type === 'email') {
              __p += "                        <input matInput type=\"email\" [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" placeholder=\"";
              __p += ((__t = (field.label)) == null) ? '' : __t;
              __p += "\">\n";
            } else if (field.type === 'Manyenum' or field.type === 'manyenum') {
              __p += "                        <input matInput type=\"text\" [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" placeholder=\"";
              __p += ((__t = (field.label)) == null) ? '' : __t;
              __p += "\" readonly>\n";
            } else if (field.type === 'phone') {
              __p += "                        <input matInput type=\"phone\" [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" placeholder=\"";
              __p += ((__t = (field.label)) == null) ? '' : __t;
              __p += "\">\n";
            } else if (field.type === 'enum') {
              __p += "                        <mat-select [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\">\n";
              for (let option of field.options) {
                __p += "                          <mat-option value=\"";
                __p += ((__t = ( option[0] )) == null) ? '' : __t;
                __p += "\">";
                __p += ((__t = ( option[1] )) == null) ? '' : __t;
                __p += "</mat-option>\n";
              }
              __p += "                        </mat-select>\n";
            } else if (field.type === 'dynamicenum') {
              __p += "                        <mat-select [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\">\n                          <mat-option *ngFor=\"let option of filterOptions(dynamicEnums['";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "'], ";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.parentenum)) == null) ? '' : __t;
              __p += ")\" [value]=\"option[0]\">{{ option[1] }}</mat-option>\n                        </mat-select>\n";
            } else {
              __p += "                        <input matInput [(ngModel)]=\"";
              __p += ((__t = (camelize(name))) == null) ? '' : __t;
              __p += ".";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" id=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" name=\"";
              __p += ((__t = (field.name)) == null) ? '' : __t;
              __p += "\" placeholder=\"";
              __p += ((__t = (field.label)) == null) ? '' : __t;
              __p += "\">\n";
            }
            __p += "                    </mat-form-field>\n";
          } else { /* relate type fields */
            __p += "                    <div class=\"half-width horizontal-children\">\n                      <mat-form-field class=\"left-side\">\n                        <mat-label for=\"";
            __p += ((__t = (field.name)) == null) ? '' : __t;
            __p += "\">";
            __p += ((__t = ( field.relationship.moduleName)) == null) ? '' : __t;
            __p += "</mat-label>\n                        <input matInput #";
            __p += ((__t = (field.name)) == null) ? '' : __t;
            __p += "=\"ngModel\" type=\"string\" [(ngModel)]=\"";
            __p += ((__t = (camelize(name))) == null) ? '' : __t;
            __p += ".";
            __p += ((__t = (field.name)) == null) ? '' : __t;
            __p += "\" id=\"";
            __p += ((__t = (field.name)) == null) ? '' : __t;
            __p += "\" name=\"";
            __p += ((__t = (field.name)) == null) ? '' : __t;
            __p += "\"\n                               placeholder=\"";
            __p += ((__t = ( field.relationship.moduleName)) == null) ? '' : __t;
            __p += "\">\n                        <input type=\"hidden\" [(ngModel)]=\"";
            __p += ((__t = (camelize(name))) == null) ? '' : __t;
            __p += ".";
            __p += ((__t = (field.relationship.idName)) == null) ? '' : __t;
            __p += "\"\n                               id=\"";
            __p += ((__t = (field.relationship.idName)) == null) ? '' : __t;
            __p += "\" name=\"";
            __p += ((__t = (field.relationship.idName)) == null) ? '' : __t;
            __p += "\">\n                      </mat-form-field>\n                      <button mat-raised-button class=\"right-side\" type=\"button\" (click)=\"openDialog('";
            __p += ((__t = ( field.relationship.moduleName)) == null) ? '' : __t;
            __p += "', '";
            __p += ((__t = ( field.relationship.moduleId)) == null) ? '' : __t;
            __p += "', '";
            __p += ((__t = (field.name)) == null) ? '' : __t;
            __p += "', '";
            __p += ((__t = (field.relationship.idName)) == null) ? '' : __t;
            __p += "', ";
            __p += ((__t = (field.name)) == null) ? '' : __t;
            __p += ".dirty)\">\n                        <mat-icon aria-hidden=\"false\" aria-label=\"search icon\">search</mat-icon>\n                      </button>\n                      <button mat-raised-button class=\"right-side\" type=\"button\" (click)=\"clear('";
            __p += ((__t = (field.name)) == null) ? '' : __t;
            __p += "', '";
            __p += ((__t = (field.relationship.idName)) == null) ? '' : __t;
            __p += "')\">\n                        <mat-icon aria-hidden=\"false\" aria-label=\"search icon\">delete</mat-icon>\n                      </button>\n                    </div>\n";
          }
        }
        __p += "                </div>\n";
      }
      __p += "            </div>\n";
    }
    __p += "            <div class=\"button-row\" role=\"group\">\n                <button type=\"submit\" mat-raised-button color=\"primary\" [disabled]=\"!editForm.form.valid\">Save</button>\n                <button type=\"button\" mat-button color=\"accent\" (click)=\"cancel()\">Cancel</button>\n            </div>\n        </form>\n<mat-spinner *ngIf=\"loading\" color=\"accent\"></mat-spinner>\n</mat-card-content>\n</mat-card>";
  }

  return __p;
};
