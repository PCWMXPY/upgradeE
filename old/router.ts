(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
//迷， 感觉暂时不用这个了
//如果不用webpack这个不好用啊
// template: '<div v-bind:style="computedsize"><span style="background-color:#6f6f6f;">Upgr</span><span style="background-color:#4a4a4a;color:#790000">a</span><span style="background-color:#414141;color:#b90000">d</span><span style="background-color:#363636;color:red">e<strong>E</strong></span><span v-if="secondtitle" style="background-color:#6f6f6f;color:white">|{{secondtitle}}</span></div>'
declare var VueRouter: any;
const router_index = {
    template: '<div class="row"><div class="col-xs-offset-3 col-xs-6 very-center"><uge-title size="80"></uge-title><span>你是?..</span><input v-model="id" type="text" placeholder="召唤师ID"><button onclick="test()">T</button></input>1{{id}}1</div></div>',
    data: function () {
        return {
            id: 'ss'
        }
    },
    methods: {
        test: function () {
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