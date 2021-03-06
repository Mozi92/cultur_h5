export default {
    name: "billie",
    props: {
        arr: {
            type: Array,
            default() {
                return []
            }
        },
    },
    computed: {
        styleObj() {
            if (this.arr.length > 1) {
                return {width: Math.floor(this.arr[0].value / (this.arr[0].value + this.arr[1].value) * 100) + '%'}
            }
            return {}
        }
    }
}
