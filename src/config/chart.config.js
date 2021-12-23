import colorConfig from "@/config/color.config";

export class ChartConfig {
    constructor() {
    }

    static createLegend(data) {
        let r = []
        data.forEach(x => {
            r.push({
                name: x.name, textStyle: {color: x.color}, itemStyle: {color: x.color}, lineStyle: {color: x.color}
            })
        })
        return {
            itemWidth: 12, itemHeight: 8, lineStyle: {
                width: 1
            }, left: 0, data: r, show: data.length > 0 && !data[0].show ? true : false
        }
    }

    static createXAxis(data) {
        let r = []
        data.forEach(x => {
            if (typeof x === 'string') {
                r.push({
                    value: x, textStyle: {color: colorConfig.D, fontSize: 12}
                })
            } else {
                r.push({
                    value: x.name, textStyle: {color: x.color | colorConfig.D, fontSize: x.color | 12}
                })
            }
        })
        return {
            type: 'category', data: r, axisPointer: {
                type: 'shadow'
            }, axisTick: {show: false}, axisLine: {show: false}, splitLine: {
                show: false,
            }, axisLabel: {
                interval: 0,
                rotate: 45
            }
        }
    }

    static createYAxis(data) {
        if (data) return {
            name: data.name, type: 'value', nameGap: 15, nameTextStyle: {
                padding: [0, 24, 0, 0]
            }, splitLine: {
                show: true, lineStyle: {
                    color: colorConfig.H, type: 'dashed'
                }
            }, axisLine: {
                lineStyle: {
                    color: colorConfig.D
                }
            }, axisLabel: {
                color: colorConfig.D
            }
        }
        return {
            type: 'value', nameTextStyle: {
                padding: [0, 64, 0, 0]
            }, splitLine: {
                show: true, lineStyle: {
                    color: colorConfig.H, type: 'dashed'
                }
            }, axisLine: {
                lineStyle: {
                    color: colorConfig.D
                }
            }, axisLabel: {
                color: colorConfig.D
            }
        }
    }

    static createBarSeries(data, legend) {
        let r = []
        data.forEach((x, i) => {
            if (typeof x === 'string') {
                r.push({
                    name: x,
                    type: 'bar',
                    barGap: '50%',
                    data: ChartConfig.createData(7, 100, 500),
                    barWidth: "10%",
                    itemStyle: {
                        color: legend ? legend.data[i].itemStyle.color : '', borderRadius: [5, 5, 0, 0]
                    },
                })
            } else {
                r.push({
                    name: x.name,
                    type: 'bar',
                    barGap: '50%',
                    data: x.data | ChartConfig.createData(7, 100, 500),
                    barWidth: "10%",
                    itemStyle: {
                        color: legend ? legend.data[i].itemStyle.color : '', borderRadius: [5, 5, 0, 0]
                    },
                })
            }
        })
        return r
    }

    static createLineSeries(data) {
        let r = []
        let showSym = true;
        if (data.length > 1) {
            showSym = false
        }
        data.forEach(x => {
            r.push({
                name: x.name,
                type: 'line',
                stack: 'Total',
                symbol: "circle",
                showSymbol: showSym,
                symbolSize: 6,
                data: x.data ? x.data : ChartConfig.createData(7, 10, 200),
                lineStyle: {
                    color: x.color, width: 1
                },
                itemStyle: {
                    color: colorConfig.I
                }
            })
        })
        return r
    }

    createBarOption(xAxis, series, legend, name) {
        legend = ChartConfig.createLegend(legend)
        xAxis = ChartConfig.createXAxis(xAxis)
        series = ChartConfig.createBarSeries(series, legend)
        return {
            legend: legend, xAxis: xAxis, yAxis: [ChartConfig.createYAxis({name: name})], series: series, grid: {
                left: 0, right: 0, bottom: '3%', top: '15%', containLabel: true
            }, tooltip: {
                trigger: 'axis', axisPointer: {
                    type: 'cross', crossStyle: {
                        color: '#999'
                    }
                }
            },
        };
    }

    createLineOption(xAxis, series, legend) {
        if (legend) {
            legend = ChartConfig.createLegend(legend)
        } else {
            legend = {show: false}
        }
        xAxis = ChartConfig.createXAxis(xAxis)
        series = ChartConfig.createLineSeries(series)
        return {
            legend: legend,
            xAxis: xAxis, yAxis: [ChartConfig.createYAxis()], series: series, grid: {
                left: 0, right: 0, bottom: '3%', top: '15%', containLabel: true
            }, tooltip: {
                trigger: 'axis'
            },
        };
    }

    createPieOption() {
        return {
            title: {
                text: 'Referer of a Website', subtext: 'Fake Data', left: 'center', show: false
            }, tooltip: {
                trigger: 'item'
            }, legend: {
                orient: 'vertical', left: 'left'
            }, plotOptions: {
                pie: {
                    allowPointSelect: true, cursor: 'pointer', depth: 35, dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        connectorWidth: 1,
                        distance: 3,
                        color: "#0BF1FF",
                        connectorColor: "#0BF1FF",
                    },
                }
            }, series: [{
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [{value: 1048, name: 'Search Engine'}, {value: 735, name: 'Direct'}, {
                    value: 580,
                    name: 'Email'
                }, {value: 484, name: 'Union Ads'}, {value: 300, name: 'Video Ads'}],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        }
    }

    createEmptyCirclePie(opt) {
        let o = {
            name: '测试数据',
            // legend: ['Allocated Budget', 'Actual Spending'],
            showLegend: true,
            showLabel: true,
            data: [{value: 1048, name: 'Search Engine'}, {value: 735, name: 'Direct'}, {
                value: 580,
                name: 'Email'
            }, {value: 484, name: 'Union Ads'}, {value: 300, name: 'Video Ads'}],
            radius: ['40%', '80%'],
            right: 'auto',
            formatter: '{b}',
            orient: 'vertical',
            top: 'center',
            left: '5%',
        }
        if (opt) {
            o = Object.assign(o, opt)
        }
        return {
            tooltip: {
                trigger: 'item'
            }, legend: {
                top: o.top, left: o.left, show: o.showLegend, orient: o.orient, textStyle: {
                    color: colorConfig.D
                },
                // data: o.legend
            }, series: [{
                name: o.name, type: 'pie', radius: o.radius, avoidLabelOverlap: true, label: {
                    show: o.showLabel, position: o.position, color: '#fff', fontSize: 10, formatter: o.formatter,
                }, right: o.right, emphasis: {
                    // label: {
                    //     show: true,
                    //     color: colorConfig.D
                    // }
                }, labelLine: {
                    show: true
                }, data: o.data
            }]
        }
    }

    createRadarOption(opt) {
        let o = {
            showLegend: true,
            legend: ['Allocated Budget', 'Actual Spending'],
            data: [{
                name: 'Budget vs spending', type: 'radar', data: [{
                    value: [4200, 3000, 20000, 35000, 50000, 18000], name: 'Allocated Budget'
                }, {
                    value: [5000, 14000, 28000, 26000, 42000, 21000], name: 'Actual Spending'
                }]
            }],
            radius: ['40%', '80%'],
            right: 'auto',
            formatter: '{b}',
            orient: 'vertical',
            top: 'center',
            left: '5%',
            indicator: [
                {name: '吃', max: 6500},
                {name: 'Administration', max: 16000},
                {name: 'Information Technology', max: 30000},
                {name: 'Customer Support', max: 38000},
                {name: 'Development', max: 52000},
                {name: 'Marketing', max: 25000}]
        }
        if (opt) {
            o = Object.assign(o, opt)
        }
        return {
            legend: {
                data: o.legend,
                // top: o.top, left: o.left, show: o.showLegend, orient: o.orient, textStyle: {
                //     color: colorConfig.D
                // }
            }, radar: {
                // shape: 'circle',
                indicator: o.indicator, radius: '60%'
            },
            series: o.data
        }
    }

    static createData(len, min, max) {
        let arr = []
        for (let i = 0; i < len; i++) {
            arr.push(Math.round(Math.random() * max) + min)
        }
        return arr
    }
}
