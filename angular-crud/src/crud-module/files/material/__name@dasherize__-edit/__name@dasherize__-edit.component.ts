import { Component, OnInit<%= modelHasFileFields(model)?', ElementRef, ViewChild':''%>} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { <%= classify(name) %>Service } from '../<%=dasherize(name)%>.service';
import { <%= classify(name) %> } from '../<%=dasherize(name)%>';
import { map, switchMap } from 'rxjs/operators';
import { of<%= modelHasFileFields(model)?', Observable, Subject':''%>} from 'rxjs';
import { ModuleSearchComponent } from "../../../components/module-search/module-search.component";
import { MatDialog } from "@angular/material/dialog";
import { ModuleSearchDialogData } from "../../../components/module-search/module-search";

@Component({
  selector: 'app-<%=dasherize(name)%>-edit',
  templateUrl: './<%=dasherize(name)%>-edit.component.html',
  styleUrls: ['./<%=dasherize(name)%>-edit.component.scss'],
  styles: [
    // todo: figure out how to make width dynamic
    'form { display: flex; flex-direction: column; min-width: 500px; }',
    'form > * { width: 100% }'
  ]
})
export class <%=classify(name)%>EditComponent implements OnInit {

  id!: string;
  <%=camelize(name)%>!: <%=classify(name)%>;
  feedback: any = {};
  public loading: boolean = true;
  public fileName: string = '';
  <%_ if (modelHasDynamicEnumFields(model)) { -%>
  public dynamicEnums = {
    <%_ for (let field of model.fields) { -%>
    <%_   if (field.type === 'dynamicenum') { -%>
    '<%= field.name %>': [<% for (let option of field.options) { %>['<%= option[0] %>', '<%= option[1].replace(/'/g, "\\\'") %>'],<% }%>],
    <%_   } -%>
    <%_ } -%>
  };
  public filterOptions(options: string[][], prefix: string) {
    return options.filter(option => option[0].startsWith(prefix));
  }
  <%_ } -%>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private <%=camelize(name)%>Service: <%=classify(name)%>Service,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p['id']),
        switchMap(id => {
          if (id === 'new') {
            return of(new <%=classify(name)%>());
          }
          return this.<%=camelize(name)%>Service.findById(id);
        })
      )
      .subscribe({
        next: <%=camelize(name)%> => {
          this.<%=camelize(name)%> = <%=camelize(name)%>;
          this.feedback = {};
          this.loading = false;
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
          this.loading = false;
        },

      });
  }

  save() {
    this.loading = true;
    let serviceObservable;
    <%_ if (modelHasFileFields(model)) { -%>
    if (this.fileName) {
      serviceObservable = 
        this.convertFileToBase64().pipe(
          switchMap(base64 => {
            if (base64) {
              this.<%=camelize(name)%>.document_name = this.fileName;
              this.<%=camelize(name)%>.filename = this.fileName;
              this.<%=camelize(name)%>.filecontents = base64;
            }
            return this.<%=camelize(name)%>Service.save(this.<%=camelize(name)%>);
          })
        );
    } else {
    <%_ } -%>
      serviceObservable = this.<%=camelize(name)%>Service.save(this.<%=camelize(name)%>);
    <%_ if (modelHasFileFields(model)) { -%>
    }
    <%_ } -%>
    serviceObservable.subscribe({
      next: <%=camelize(name)%> => {
        this.<%=camelize(name)%> = <%=camelize(name)%>;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        this.loading = false;
        setTimeout(async () => {
          await this.router.navigate(['/<%=pluralize(name)%>']);
        }, 1000);
      },
      error: err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
        this.loading = false;
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/<%=pluralize(name)%>']);
  }
  <%_ if (modelHasRelateFields(model)) { -%>

  openDialog(moduleName: string, moduleId: string, fieldName: string, hiddenFieldName: string, dirty: boolean | null) {
    // @ts-ignore
    const searchName = dirty ? this.<%=camelize(name)%>[fieldName] : '';
    const dialogRef = this.dialog.open(ModuleSearchComponent, {
      data: {moduleName, moduleId, searchName},
    });

    dialogRef.afterClosed().subscribe((result: ModuleSearchDialogData) => {
      if (result) {
        // @ts-ignore
        this.<%=camelize(name)%>[fieldName] = result.selectedName;
        // @ts-ignore
        this.<%=camelize(name)%>[hiddenFieldName] = result.selectedId;
      }
    });
  }

  clear(fieldName: string, hiddenFieldName: string) {
    // @ts-ignore
    this.<%=camelize(name)%>[fieldName] = '';
    // @ts-ignore
    this.<%=camelize(name)%>[hiddenFieldName] = '';
  }
  <%_ } -%>
  <%_ if (modelHasFileFields(model)) { -%>
  private fileSelected?: Blob;
  @ViewChild('file_opener') fileOpener!: ElementRef;

  chooseFile() {
    this.fileOpener.nativeElement.click();
  }

  handleFileChange($event: any) {
    const files = $event.target.files;
    this.fileSelected = files[0];
    this.fileName = files[0].name;
  }

  convertFileToBase64(): Observable<string> {
    if (this.fileSelected) {
      let reader = new FileReader();
      reader.readAsBinaryString(this.fileSelected as Blob);

      let base64 = new Subject<string>();
      reader.onloadend = () => {
        base64.next(btoa(reader.result as string));
      }
      return base64;
    }
    return of('');
  }
  <%_ } -%>
}
