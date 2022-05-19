export class <%= classify(name) %> {<% for (let field of model.fields) { %>
  <%=field.name%>!: <%if (field.type === 'date') { %>Date<% } else if (field.type==='hidden') { %>string<% } else { %><%=field.type%><% } %>;<% } %>
}
