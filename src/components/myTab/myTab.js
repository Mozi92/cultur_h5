export default {
    name: "myTab",
    props: {
        title: {
            type: String,
            default: ''
        },
        arr: {
            type: Array,
            default() {
                return [];
            }
        }
    }, data() {
        return {
            current: 1
        };
    }, methods: {
        clickTab(tab) {
            this.current = tab.id
            this.$emit('tabChange', tab)
        },
    },
}
