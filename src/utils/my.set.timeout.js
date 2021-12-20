/**
 * 因为传统的setTimeOut会被其他ui显示任务阻塞，所以我们只好自己写一个...
 */

export default function () {

    this.callbackFunc = null
    this.stopTime = 0 // 任务结束的时间
    this.running = false // 是否在运行中
    this.requestId = 0 // requestAnimationFrame 返回的id

    /**
     * 开始一个任务
     * @param callback 回调函数
     * @param delay 延时时间（毫秒)
     */
    this.start = function (callback, delay) {
        if (typeof callback === 'function' && delay > 0) {
            this.callbackFunc = callback
            this.stopTime = new Date().getTime() + delay
            this.running = true

            this.loop()
        } else {
            console.error('MySetTimeOut start() 参数非法')
        }
    }

    this.loop = function () {
        if (!this.running) {
            // 任务可以被取消， running是标志位
            return
        }

        let now = new Date().getTime()
        if (now > this.stopTime) {
            // 如果到时间了，就重置状态，然后调用回调函数
            this.running = false
            this.requestId = 0

            // 设置状态为完成
            this.reset()

            // 调用callback
            this.callbackFunc()
        } else {
            this.requestId = requestAnimationFrame(() => {
                this.loop()
            })
        }
    }

    /** 取消 */
    this.reset = function () {
        if (this.running) {
            cancelAnimationFrame(this.requestId)
        }
        this.running = false
        this.requestId = 0
    }
}
