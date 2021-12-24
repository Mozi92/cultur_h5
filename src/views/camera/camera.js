export default {
    name: "camera",
    data() {
        return {
            columns: {
                first: ['全部视频', '类型1', '类型2', '类型3'],
            },
            videos: [
                {desc: '备注位置信息'},
                {desc: '备注位置信息'},
                {desc: '备注位置信息'},
                {desc: '备注位置信息'},
                {desc: '备注位置信息'},
                {desc: '备注位置信息'},
                {desc: '备注位置信息'},
            ]
        }
    },
    methods: {
        back() {
            this.$router.replace('/')
        },
        selected(v) {
            console.log(v)
        }
    }
}
