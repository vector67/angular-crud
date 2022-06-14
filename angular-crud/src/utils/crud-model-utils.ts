import { CrudModel, Field, PanelField, ShowOptions } from '../crud-module/model';
import { SchematicsException } from '@angular-devkit/schematics/src/exception/exception';
import { camelize } from '@angular-devkit/core/src/utils/strings';

function createFieldSelector(selector: ShowOptions) {
    return function (field: Field): boolean {

        let show: string[];
        if (!field) return false;
        if (!field.show) return false;

        if (typeof field.show === 'string') {
            show = field.show.split(' ');
        } else {
            show = field.show;
        }

        return show.indexOf(selector) > -1;

    }
}

function createModelFieldListSelector(selector: (field: Field) => boolean) {
    return (model: CrudModel): Field[] => {
        return model.fields.filter(selector);
    }
}

export const isFilterField = createFieldSelector('filter');
export const getFilterFields = createModelFieldListSelector(isFilterField);
export const isListField = createFieldSelector('list');

export function getListFields(model: CrudModel) {
    return model.listViewOrder.map(column_name => {
        return model.fields.find(field => field.name === column_name);
    });
}

export const isInsertField = createFieldSelector('insert');
export const getInsertFields = createModelFieldListSelector(isInsertField);
export const isUpdateField = createFieldSelector('update');
export const getUpdateFields = createModelFieldListSelector(isUpdateField);

export function isStringTypeField(field: Field) {
    return field.type === 'hidden' || field.type === 'url'
        || field.type === 'email' || field.type === 'image' || field.type === 'phone'
        || field.type === 'datetimecombo' || field.type === 'iframe' || field.type === 'multienum'
        || field.type === 'parent' || field.type === 'dynamicenum' || field.type === 'manyenum'
        || field.type === 'Manyenum' || field.type === 'enum' || field.type === 'relate'
        || field.type === 'file';
}

export function getModelField(model: CrudModel, panelField: PanelField): Field {
    let field = model.fields.find(f => f.name === panelField.name);
    if (!field) throw new SchematicsException('No field found with name' + panelField.name);
    field.label = panelField.label;
    return field;
}

function createModelHasFieldFunction(selector: string) {
    return (model: CrudModel): boolean => {
        return model.fields.some(field => field.type == selector);
    }
}

export const modelHasRelateFields = createModelHasFieldFunction('relate');
export const modelHasDynamicEnumFields = createModelHasFieldFunction('dynamicenum');
export const modelHasFileFields = createModelHasFieldFunction('file');

export function getId(model: CrudModel): Field {
    let id = model.fields.find(f => f.isId);
    if (!id) throw new SchematicsException('No id found');
    return id;
}

/**
 Returns the plural form of a string
 ```javascript
 'innerHTML'.pluralize()         // 'InnerHTMLs'
 'action_name'.pluralize()       // 'actionNames'
 'css-class-name'.pluralize()    // 'cssClassNames'
 'regex'.pluralize()            // 'regexes'
 'user'.pluralize()             // 'users'
 ```
 */
export function pluralize(str: string): string {
    return camelize(
        [/([^aeiou])y$/, /()fe?$/, /([^aeiou]o|[sxz]|[cs]h)$/].map(
            (c, i) => (str = str.replace(c, `$1${'iv'[i] || ''}e`))
        ) && str + 's'
    );
}
