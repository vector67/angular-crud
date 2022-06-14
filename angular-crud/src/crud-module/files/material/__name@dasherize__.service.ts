import { <%= classify(name) %> } from './<%=dasherize(name)%>';
import { <%= classify(name) %>Filter } from './<%=dasherize(name)%>-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModuleService } from "../../../api";
import { ModelObject } from "../../../api/model/model-object";


@Injectable()
export class <%= classify(name) %>Service {
  <%=camelize(name)%>List: <%=classify(name)%>[] = [];<% const id = getId(model); %>
  api_module_name = '<%= model.api.apiModuleName %>';

  constructor(private http: HttpClient, private moduleService: ModuleService) {
  }

  findById(id: string): Observable<<%= classify(name) %>> {
    return this.moduleService.moduleModuleNameIdGet<<%= classify(name) %>>(this.api_module_name, id);
  }

  load(filter: <%= classify(name) %>Filter): void {
    this.find(filter).subscribe({
      next: result => {
        this.<%=camelize(name)%>List = result;
      },
      error: err => {
        console.error('error loading', err);
      }
    });
  }

  find(filter: <%= classify(name) %>Filter): Observable<<%= classify(name) %>[]> {
    const filters: any[] = [];
    <%_ for (const field of getFilterFields(model)) { -%>
    if (filter.<%=field.name%>) {
      filters.push({ 'column': '<%=field.name%>', 'operator': 'eq', 'values': [filter.<%=field.name%>] });
    }
    <%_ } -%>
    return this.moduleService.moduleModuleGet(this.api_module_name, filters);
  }
  

  save(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {
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

  delete(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    if (entity.id) {
      return this.moduleService.moduleModuleNameIdDelete(this.api_module_name, entity.id);
    }
    return EMPTY;
  }
}

