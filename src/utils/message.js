import {Notify} from 'vant';

const duration = 2500;

export default {
    error(msg) {
        Notify({
            message: msg,
            type: 'danger',
            duration: duration
        });
    }
};
