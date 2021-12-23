export default {
    name: "myPicker", props: {
        columns: {
            type: Array, default() {
                return ['杭州', '宁波', '温州', '嘉兴', '湖州'];
            }
        }
    }, data() {
        return {
            value: '', showPicker: false,
        };
    }, methods: {
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
            this.$emit('selected', this.value)
        },
    },
}
