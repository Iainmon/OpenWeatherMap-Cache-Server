class Thread {
    /**
     * Creates task or thread.
     * @param {function} execute
     * @param {number} dtime
     * @param {boolean} startNow
     * @return {Thread}
     */
    constructor(execute, dtime = 0, startNow = true) {
        this.execute = execute;
        this.dtime = dtime;
        this.stop = false;
        this.fireTimes = 0;
        if (startNow) {
            execute();
            this.fireTimes++;
            this.fireTimes++;
        }
        this.main();
    }

    main() {
        this.loop = setInterval(() => {
            this.fireTimes++;
            this.execute();
        }, this.dtime);
    }

    toggle() {
        this.stop = !this.stop;
        if (this.stop) {
            clearInterval(this.loop);
        } else {
            this.main();
        }
    }

    kill() {
        clearInterval(this.loop);
        this.main = this.toggle = this.dtime = this.stop = this.execute = this.loop = undefined;
        this.kill = null;
    }
}

/**
* Creates delayed function.
* @param {function} execute
* @param {number} dtime
* @return {void}
*/
Thread.spawn = function (execute, dtime = 0) {
    setTimeout(execute, dtime);
};

/**
 * Does function asynchronously.
 * @param {function} execute
 * @return {void}
 */
Thread.do = function (execute) {
    setTimeout(execute, 0);
};

module.exports = Thread;