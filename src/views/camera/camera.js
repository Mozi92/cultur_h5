import { VideoStream } from "@/utils/videoStream";
export default {
    name: "camera",
    data() {
        return {
            categories: [],
            categories_c: [],
            all: [],
            current: '',
        }
    },
    mounted() {
        this.getRtsp()
    },
    methods: {
        back() {
            this.$router.replace('/')
        },
        createRtspData(url, port) {
            return {
                url: url,
                port: port.toString(),
                type: 'hk',
                coverSrc: '',
                canvas: this.$refs.videoCanvas
            }
        },
        play() {
            let _this = this;
            if (_this.rtspData && _this.rtspData.length > 0) {
                let videoStream = new VideoStream();
                videoStream.rtsp(_this.rtspData)
            }
        },
        getRtsp() {
            let _this = this;
            this.$ajax.get('/api/video/getAll', {}, {}).then((data) => {
                if (data.code === 200) {
                    data.data.forEach((x, i) => {
                        let obj = _this.categories.find(y => y === x.Category)
                        if (!obj) {
                            _this.categories.push(x.Category)
                        }
                        if (i === 0) {
                            data.data[i].active = true;
                        } else {
                            data.data[i].active = false;
                        }
                    })

                    _this.all = data.data
                    _this.categories_c = data.data
                    let obj = []
                    data.data.forEach((x, i) => {
                        obj.push(_this.createRtspData(x.Rtsp, 30036 + i))
                    })
                    _this.rtspData = obj
                    _this.play()
                } else {
                    console.log(data)
                }
            }).catch(reason => {
                console.log(reason)
            })
        },
        selected(v) {
            console.log(v)
        }
    }
}