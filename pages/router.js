(function () {
    'use strict';
}());
var router_index = {
    template: '<div class="row"><div class="col-xs-offset-3 col-xs-6 very-center"><uge-title size="80"></uge-title><span>你是?..</span><input v-model="id" type="text" placeholder="召唤师ID"><button v-on:click="test">T</button></input>1{{id}}1</div></div>',
    data: function () {
        console.log(this);
        return {
            id: 'ss'
        };
    },
    methods: {
        test: function () {
            console.log('testfromrouter');
            test();
        }
    }
};
var routes = [{
        path: '/',
        component: router_index
    }];
var router = new VueRouter({
    routes: routes
});
var router_app = new Vue({
    router: router
}).$mount('#app');
