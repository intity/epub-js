import Defer from "./defer";

/**
 * Queue for handling tasks one at a time
 * @extends {Array}
 */
class Queue extends Array {
    /**
     * Constructor
     * @param {object} context what this will resolve to in the tasks
     */
    constructor(context) {

        super();

        this.context = context;
        this.running = false;
        this.paused = false;
    }

    /**
     * Add an item to the queue
     * @param {any} task
     * @param {any[]} [args]
     * @return {Promise<any>}
     */
    enqueue(task, ...args) {

        let queued;
        if (typeof task === "function") {
            const deferred = new Defer();
            const promise = deferred.promise;
            queued = {
                task,
                args,
                deferred,
                promise
            };
        } else {
            // Task is a promise
            queued = {
                promise: task
            };
        }

        this.push(queued);

        // Wait to start queue flush
        if (this.paused === false && !this.running) {
            this.run();
        }

        return queued.promise;
    }

    /**
     * Run one item
     * @return {Promise<any>}
     */
    dequeue() {

        let inwait;
        if (this.length && !this.paused) {
            inwait = this.shift();
            const task = inwait.task;
            if (task) {
                const result = task.apply(this.context, inwait.args);
                if (result && typeof result["then"] === "function") {
                    // Task is a function that returns a promise
                    return result.then((val) => {
                        inwait.deferred.resolve(val);
                    }, (err) => {
                        inwait.deferred.reject(err);
                    });
                } else {
                    // Task resolves immediately
                    inwait.deferred.resolve(result);
                    return inwait.promise;
                }
            } else if (inwait.promise) {
                // Task is a promise
                return inwait.promise;
            }
        } else {
            inwait = new Defer();
            inwait.deferred.resolve();
            return inwait.promise;
        }
    }

    /**
     * Run All Immediately
     */
    dump() {

        while (this.length) {
            this.dequeue();
        }
    }

    /**
     * Run all tasks sequentially, at convince
     * @return {Promise<any>}
     */
    run() {

        if (this.running === false) {
            this.running = true;
            this.deferred = new Defer();
        }

        requestAnimationFrame(() => {

            if (this.length) {
                this.dequeue().then(() => {
                    this.run();
                });
            } else {
                this.deferred.resolve();
                this.running = false;
            }
        });

        if (this.paused) {
            this.paused = false;
        }

        return this.deferred.promise;
    }

    /**
     * Clear all items in wait
     */
    clear() {

        this.splice(0);
    }

    /**
     * Pause a running queue
     */
    pause() {

        this.paused = true;
    }

    /**
     * End the queue
     */
    stop() {

        this.splice(0);
        this.running = false;
        this.paused = true;
    }

    /**
     * Destroy the Queue object
     */
    destroy() {

        this.splice(0);
        this.running = undefined;
        this.paused = undefined;
    }
}

export default Queue;