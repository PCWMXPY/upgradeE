(function () {
    'use strict';
}());
Vue.component('uge-title', {
    props: ['size', 'secondtitle'],
    computed: {
        computedsize: function () {
            var re = 'font-size:' + this.size + 'px;';
            re += '';
            return 'font-size:' + this.size + 'px';
        }
    },
    template: '<div class="logo" v-bind:style="computedsize"><span>Upgr</span><span style="color:#790000">a</span><span style="color:#b90000">d</span><span style="color:red">e<strong>E</strong></span><span v-if="secondtitle" style="color:white">|{{secondtitle}}</span></div>'
});
Vue.component('login', {
    template: '<div class="row"><div class="col-xs-offset-3 col-xs-6 very-center"><uge-title size="80"></uge-title><span>你是?..</span><input v-model="id" type="text" placeholder="召唤师ID"><button v-on:click="logup">T</button></input>{{id}}</div></div>',
    methods: {
        logup: function () {
            this.$parent.test(this.id);
        }
    },
    data: function () {
        return {
            id: ''
        };
    }
});
Vue.component('version', {
    props: ['version', 'realversion'],
    data: function () {
        return {
            style: 'color: #454545'
        };
    },
    computed: {
        versions: function () {
            if (this.realversion.int > this.version.int) {
                return this.version.str + '->' + this.realversion.str;
            }
            return this.version.str;
        },
        displays: function () {
            if (this.realversion.int > this.version.int) {
                if (this.realversion.emer > this.version.int) {
                    this.style = 'color: #c60000;';
                    return '需要立即更新';
                }
                else {
                    this.style = 'color: #4635ed;';
                    return '推荐更新' + this.realversion.str + '版本';
                }
            }
            else {
                return '主E蕹鵺猛如虎';
            }
        }
    },
    template: '<div v-bind:style="style"><span>{{versions}}</span><br><span>{{displays}}</span></div>'
});
Vue.component('re-credit', {
    template: '<div><p style="color:#565656"><i class="fa fa-code"></i> Review.md with <i class="fa fa-heart"></i> by WMXPY@<a href="http://mengw.io">mengw.io</a> 2016</p></div>'
});
