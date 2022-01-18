import httpAjax from "@/utils/http.ajax";
import {MyJsmpeg} from "./my.jsmpeg";
import $ from "jquery";

export class VideoStream {
    constructor() {

    }

    keep() {
        httpAjax.get('/VIID/token/alive/keep', {}, {}).then(data => {
            console.log('keep success', data)
        }).catch(reason => {
            console.log('keep error', reason)
        })
    }

    oath() {
        httpAjax.post('/VIID/login', {}, {}).then(data => {
            console.log('first auth result', data)
            // httpAjax.get('/VIID/login')
        }).catch(reason => {
            console.log('first auth error', reason)
        })
    }

    rtsp(rtspData) {
        // httpAjax.post('/startRtspVideo', {urls: JSON.stringify(rtspData)}, {}).then(data => {
        //     console.log('rtsp result', data)
        //     play()
        // }).catch(reason => {
        //     console.log('first auth error', reason)
        // })

        $.ajax({
            url: process.env.VUE_APP_VIDEO_SERVER + '/startRtspVideo',
            type: 'post',
            data: {
                urls: JSON.stringify(rtspData)
            },
            success: function (res) {
                console.log(res)
                play()
            },
            error: function (err) {
                console.log(err)
            }
        })

        function play() {
            let players = []
            players.forEach(item => {
                if (item) {
                    item.destroy()
                }
            })
            rtspData.forEach(item => {
                let url = process.env.VUE_APP_WS + ':' + item.port
                let player = new MyJsmpeg.Player(url, {
                    canvas: item.canvas,
                    audio: false,
                    pauseWhenHidden: false,
                    disableGl: true,
                    disableWebAssembly: true
                    // videoBufferSize: 1024 * 1024 * 4
                })
                players.push(player)
            })
        }
    }
}
