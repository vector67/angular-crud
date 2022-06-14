import { Component, OnInit } from '@angular/core';
import { <%= classify(name) %>Filter } from '../<%=dasherize(name)%>-filter';
import { <%= classify(name) %>Service } from '../<%=dasherize(name)%>.service';
import { <%= classify(name) %> } from '../<%=dasherize(name)%>';

@Component({
  selector: 'app-<%=dasherize(name)%>',
  templateUrl: '<%=dasherize(name)%>-list.component.html',
  styles: [
    // todo: figure out how to make width dynamic
    'table { min-width: 600px }',
  ]
})
export class <%= classify(name) %>ListComponent implements OnInit {
  displayedColumns = [<% for (let field of getListFields(model)) { %>'<%=field.name%>',<% } %>'actions'];
  filter = new <%= classify(name) %>Filter();
  selected<%=classify(name)%>!: <%= classify(name) %>;
  feedback: any = {};
  enums: any = {
    <%_ for (let field of getListFields(model).filter(field => field.type === 'enum' || field.type === 'dynamicenum')) { -%>
    '<%= field.name %>': {
      <%_ for (let option of field.options) { -%>
      '<%= option[0] %>':'<%= option[1].replace(/'/g, "\\\'") %>',
      <%_ } -%>
    },
    <%_ } -%>
  };

  get <%=camelize(name)%>List(): <%= classify(name) %>[] {
    return this.<%=camelize(name)%>Service.<%=camelize(name)%>List;
  }

  constructor(private <%=camelize(name)%>Service: <%= classify(name) %>Service) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.<%=camelize(name)%>Service.load(this.filter);
  }

  select(selected: <%= classify(name) %>): void {
    this.selected<%= classify(name) %> = selected;
  }

  delete(<%=camelize(name)%>: <%= classify(name) %>): void {
    if (confirm('Are you sure?')) {
      this.<%=camelize(name)%>Service.delete(<%=camelize(name)%>).subscribe({
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
