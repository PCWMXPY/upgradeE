(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
declare var VueRouter: any;
const router_index = {
    template: '<div class="row"><div class="col-xs-offset-3 col-xs-6 very-center"><uge-title size="80"></uge-title><span>你是?..</span><input v-model="id" type="text" placeholder="召唤师ID"><button v-on:click="test">T</button></input>1{{id}}1</div></div>',
    data: function () {
        console.log(this);
        return {
            id: 'ss'
        }
    },
    methods: {
        test: () => {
            console.log('testfromrouter');
            test();
        }
    }
}
const routes = [{
    path: '/',
    component: router_index
}]
const router = new VueRouter({
    routes
})
const router_app = new Vue({
    router
}).$mount('#app');