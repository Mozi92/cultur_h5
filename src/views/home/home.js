export default {
    name: "index", data() {
        let optionInstance = new this.$chartConfig();
        return {
            show: false,
            titles: {
                first: '景区数据统计及分析',
                second: '文旅项目数据分析',
                third: '实时客流（人次）：567,544',
                fourth: '实时消费数据（元）：567,544',
                fifth: '节假日客流趋势分析',
                sixth: '节假日消费趋势分析',
                seventh: '投诉数据分析',
                gth: '游客分布排行',
                ten: '游客来源排行',
                eve: '游客群体画像分析',
                twl: '满意度分析'
            },
            arr: [{text: '景区', value: '50'}, {text: '餐饮场所', value: '50'}, {text: '酒店', value: '50'}, {
                text: '购物场所',
                value: '50'
            }, {text: '娱乐场所', value: '50'}, {text: '旅行社', value: '50'}, {text: '导游人数', value: '50'}, {
                text: '旅游厕所',
                value: '50'
            }, {text: '景点', value: '50'},],
            arr2: [{text: '今年累计', value: '212121'}, {text: '去年累计', value: '212121'}, {text: '前年累计', value: '212121'}],
            arr3: [{text: '今年累计(万元)', value: '212121'}, {text: '去年累计(万元)', value: '212121'}, {
                text: '前年累计(万元)',
                value: '212121'
            }],
            arr4: [
                {text: '1三星堆', value: '30'},
                {text: '2三星堆', value: '88'},
                {text: '3三星堆', value: '77'},
                {text: '4三星堆', value: '66'},
                {text: '5三星堆', value: '11'},
                {text: '6三星堆', value: '15'}
            ],
            columns: {
                first: ['按项目数量', '按投资总额'],
                second: ['元旦', '春节', '中秋', '清明', '端午', '国庆'],
                third: ['今天', '本周', '本月', '本季度', '本年']
            },
            desc: {
                first: [{text: '累计流量：546,222'}, {text: '同比增幅：32.32%'},],
                second: [{text: '累计流量：546,222'}, {text: '同比增幅：32.32%'},],
                third: [{text: '累计投诉数：32323232'},]
            },
            tabs: {
                first: {
                    title: '游客流量趋势分析', tabs: [{id: 1, text: '按日'}, {id: 2, text: '按月'}, {id: 3, text: '按年'},]
                },
                second: {
                    title: '游客消费趋势分析', tabs: [{id: 1, text: '按日'}, {id: 2, text: '按月'}, {id: 3, text: '按年'},]
                }
            },
            renderOption: {},
            renderOptionA: {},
            renderOptionB: {},
            renderOptionC: {},
            renderOptionD: {},
            optionInstance: optionInstance
        }
    }, mounted() {
        this.createBar()
        this.createA()
        this.createB()
        this.createC()
        this.createD()
    }, activated() {
    }, deactivated() {
    }, methods: {
        selected(value) {
            console.log(value)
        }, createBar() {
            let _this = this;
            let xAxis = ['旌阳区', '曹阳区', '李阳区', '贵阳区', '华阳区', '林阳区', '和阳区']
            let series = ['新开工项目', '续建项目', '储备项目']
            let legend = [{name: '新开工项目', color: _this.$colors.A}, {name: '续建项目', color: _this.$colors.B}, {
                name: '储备项目', color: _this.$colors.D
            }]
            this.renderOption = this.optionInstance.createBarOption(xAxis, series, legend)
        }, createA() {
            let _this = this;
            let xAxis = ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
            let series = [{
                name: '游客流量', color: _this.$colors.B
            }]
            this.renderOptionA = this.optionInstance.createLineOption(xAxis, series)
        }, createB() {
            let _this = this;
            let xAxis = ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
            let series = [{
                name: '游客流量', color: _this.$colors.B
            }]
            this.renderOptionB = this.optionInstance.createLineOption(xAxis, series)
        },
        createC() {
            let _this = this;
            let xAxis = ['第一天', '第二天', '第三天', '第四天', '第五天', '第六天']
            let series = [{
                name: '今年', color: _this.$colors.A
            }, {
                name: '去年', color: _this.$colors.B
            }, {
                name: '前年', color: _this.$colors.D
            }]
            this.renderOptionC = this.optionInstance.createLineOption(xAxis, series, series)
        },
        createD() {
            this.renderOptionD = this.optionInstance.createEmptyCirclePie({
                showLegend: true,
                data: [
                    {value: 5890, name: '投诉类型A', itemStyle: {color: '#73DEB4'}},
                    {value: 1820, name: '投诉类型B', itemStyle: {color: '#7686A3'}},
                    {value: 1570, name: '投诉类型C', itemStyle: {color: '#74A0FA'}},
                    {value: 1340, name: '投诉类型D', itemStyle: {color: '#EC7F66'}},
                    {value: 223, name: '投诉类型E', itemStyle: {color: '#F7C73A'}},
                ],
                position: 'inner', radius: '100%', right: '50%', formatter: '{c}', left: '60%', top: 'center'
            })
        }
    }, beforeDestroy() {
    }
}
