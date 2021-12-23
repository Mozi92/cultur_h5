export default {
    name: "lineUp",
    props: {
        arr: {
            type: Array,
            default() {
                return []
            }
        },
        cols: {
            type: Number,
            default: 3
        }
    },
    computed: {
        styleObj() {
            return {width: Math.floor((1 / this.cols) * 100) + '%'}
        }
    }
}
