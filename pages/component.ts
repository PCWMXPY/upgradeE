(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
Vue.component('uge-title', {
    props: ['size', 'secondtitle', 'title'],
    computed: {
        computedsize: function () {
            let re = 'font-size:' + this.size + 'px;';
            re += '';
            return 'font-size:' + this.size + 'px';
        },
        titles: function () {
            let title = '<span>' + this.title.substring(0, this.title.length - 4) + '</span>';
            title += '<span style="color:#790000">' + this.title.substring(this.title.length - 4, this.title.length - 3) + '</span>';
            title += '<span style="color:#b90000">' + this.title.substring(this.title.length - 3, this.title.length - 2) + '</span>';
            title += '<span style="color:red">' + this.title.substring(this.title.length - 2, this.title.length - 1) + this.title.substring(this.title.length - 1, this.title.length).toUpperCase() + '</span>'
            return title;
        }
    },
    template: '<div class="logo" v-bind:style="computedsize"><span v-if="!title"><span>Upgr</span><span style="color:#790000">a</span><span style="color:#b90000">d</span><span style="color:red">e<strong>E</strong></span></span><span v-if="title" v-html="titles"></span><span v-if="secondtitle" style="color:white">|{{secondtitle}}</span></div>'
});
Vue.component('login', {
    template: '<div class="row"><div class="col-xs-offset-3 col-xs-6 very-center"><uge-title size="80" v-bind:title="title"></uge-title>123<span>你是?..</span><input v-model="id" type="text" placeholder="召唤师ID"><button class="" v-bind:disabled="buttonstat" v-on:click="logup">搜索</button></input></div></div>',
    methods: {
        logup: function () {
            this.buttonstat = true;
            this.$parent.sendSummorid(this.id, (re: number) => {
                if (re == 0) {
                    this.buttonstat = false;
                    // this.title = 'NotFound';
                    Cp$.Caper(this, {
                        elem: 'title',
                        data: {
                            start: this.title,
                            end: 'NotFound'
                        },
                        mode: 'iter',
                        duration: 50
                    })
                } else {
                    this.buttonstat = true;
                }
            });
        }
    },
    data: function () {
        return {
            id: '',
            buttonstat: false,
            title: 'UpgradeE'
        }
    }
})
Vue.component('version', {
    props: ['version', 'realversion'],
    data: function () {
        return {
            style: 'color: #454545'
        }
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
                } else {
                    this.style = 'color: #4635ed;';
                    return '推荐更新' + this.realversion.str + '版本';
                }
            } else {
                return '主E蕹鵺猛如虎';
            }
        }
    },
    template: '<div v-bind:style="style"><span>{{versions}}</span><br><span>{{displays}}</span></div>'
})
Vue.component('re-credit', {
    template: '<div><p style="color:#565656"><i class="fa fa-code"></i> Review.md with <i class="fa fa-heart"></i> by WMXPY@<a href="http://mengw.io">mengw.io</a> 2016</p></div>'
});