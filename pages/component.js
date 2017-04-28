(function () {
    'use strict';
}());
Vue.component('uge-title', {
    props: ['size', 'secondtitle', 'title'],
    computed: {
        computedsize: function () {
            var re = 'font-size:' + this.size + 'px;';
            re += '';
            return 'font-size:' + this.size + 'px';
        },
        titles: function () {
            var title = '<span>' + this.title.substring(0, this.title.length - 4) + '</span>';
            title += '<span style="color:#790000">' + this.title.substring(this.title.length - 4, this.title.length - 3) + '</span>';
            title += '<span style="color:#b90000">' + this.title.substring(this.title.length - 3, this.title.length - 2) + '</span>';
            title += '<span style="color:red">' + this.title.substring(this.title.length - 2, this.title.length - 1) + this.title.substring(this.title.length - 1, this.title.length).toUpperCase() + '</span>';
            return title;
        }
    },
    template: '<div class="logo" v-bind:style="computedsize"><span v-if="!title"><span>Upgr</span><span style="color:#790000">a</span><span style="color:#b90000">d</span><span style="color:red">e<strong>E</strong></span></span><span v-if="title" v-html="titles"></span><span v-if="secondtitle" style="color:white">|{{secondtitle}}</span></div>'
});
Vue.component('waiting', {
    props: ['title', 'name'],
    template: '<div class="row"><div class="col-xs-12 very-center"><uge-title v-bind:size="sizes" v-bind:title="title"></uge-title></div></div>',
    methods: {
        mutated: function (name) {
            if (name.length > 8)
                this.sizes = 65;
            Cp$.Caper(this, {
                elem: 'title',
                data: {
                    start: this.title,
                    end: name
                },
                mode: 'iter',
                duration: 60
            });
        }
    },
    data: function () {
        this.mutated(this.name);
        return {
            sizes: 80
        };
    }
});
Vue.component('login', {
    template: '<div class="row"><div class="col-xs-12 very-center"><uge-title v-bind:size="sizes" v-bind:title="title"></uge-title><span>你是?..</span><input v-model="id" type="text" placeholder="召唤师ID"><button class="" v-bind:disabled="buttonstat" v-on:click="logup">搜索</button></input></div></div>',
    methods: {
        logup: function () {
            var _this = this;
            this.buttonstat = true;
            this.$parent.sendSummorid(this.id, function (re, name) {
                if (re == 0) {
                    _this.buttonstat = false;
                    Cp$.Caper(_this, {
                        elem: 'title',
                        data: {
                            start: _this.title,
                            end: 'Id Not Found'
                        },
                        mode: 'iter',
                        duration: 50
                    });
                }
                else {
                    _this.$parent.user.name = name;
                    _this.$parent.switchtoWait(_this.title);
                }
            });
        }
    },
    data: function () {
        return {
            id: '',
            sizes: 80,
            buttonstat: false,
            title: 'UpgradeE'
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
