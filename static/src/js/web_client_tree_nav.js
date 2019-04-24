odoo.define('tree_nav.WebClientWithTreeNav', function (require) {
"use strict";

var WebClient = require('web.WebClient');

return WebClient.extend({
    instanciate_menu_widgets: function() {
        var self = this;
        this._super.apply(this, arguments);
        this.load_menus().then(function(menu_data){
                            var tree_nav = self.createList(menu_data);
                            var nav = document.createElement('div');
                            nav.setAttribute('id', 'tree_nav');
                            nav.append(tree_nav);
                            $('.o_main').prepend(nav);
                            $('#tree_nav').easytree();
                        });
    },
    createList: function(data, parent_id = null) {
        var self = this;
        if(!data.children.length) return;
        var ul = document.createElement('ul');
        data.children.forEach(function(ch){
            var menu_id = ch.parent_id? parent_id:ch.id; 
            var link = ch.action? ("#menu_id=" + menu_id + "&amp;action=" + ch.action.split(',')[1]) : '#';
            var li = document.createElement('li');
            if(ch.children.length) {
                li.setAttribute('class', 'isFolder');
                li.innerText = ch.name;
                li.appendChild(self.createList(ch, menu_id));
            } else {
                var a = document.createElement('a');
                a.setAttribute('href', link);
                a.innerText = ch.name;
                li.appendChild(a);
            }
            ul.appendChild(li);
        });
        return ul;
    }
});

});
