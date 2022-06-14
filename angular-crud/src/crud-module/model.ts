export interface CrudModel {
  title: string;
  entity: string;
  api: CrudEndpoints;
  fields: Field[];
  listViewOrder: string[];
  editPanels: Panel[];
  detailPanels: Panel[];
}

export interface CrudEndpoints {
  url: string;
  apiModuleName: string;
}
export interface Panel {
  name?: string;
  rows: PanelField[][];
}
export interface PanelField {
  name: string;
  label: string;
}

export interface Relationship {
  link: string;
  idName: string;
}

export interface Field {
  name: string;
  isId: boolean;
  readonly: boolean;
  type: TypeOptions;
  control: ControlOptions | string;
  label: string;
  default: any;
  validation: string;
  show: ShowOptions[] | string;
  options?: Record<string, string>;
  relationship?: Relationship;
}

export type TypeOptions = 'text' | 'number' | 'date' | 'url' | 'hidden'
    | 'email' | 'image' | 'phone' | 'datetimecombo' | 'iframe' | 'multienum'
    | 'parent' | 'dynamicenum' | 'manyenum' | 'Manyenum' | 'enum' | 'relate'
    | 'file';

export type ShowOptions = 'filter' | 'list' | 'insert' | 'update';
export type ControlOptions = 'text';
