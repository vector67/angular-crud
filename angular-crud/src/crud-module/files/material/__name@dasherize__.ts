export class <%= classify(name) %> {
  <%_ for (let field of model.fields) { -%>
  <%=field.name%>!: <%if (field.type === 'date') { %>Date<% } else if (isStringTypeField(field)) { %>string<% } else { %><%=field.type%><% } %>;
  <%_ } -%>
  <%_ if (modelHasFileFields(model)) { -%>
  filecontents!: any;
  <%_ } -%>
}
