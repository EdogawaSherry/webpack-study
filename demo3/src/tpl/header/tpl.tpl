<div class="header-tpl"><%= obj.title %></div>
<ul>
    <% for (var i = 0; i < obj.lists.length; i ++) { %>
        <li><%= obj.lists[i] %></li>
    <% } %>
</ul>
