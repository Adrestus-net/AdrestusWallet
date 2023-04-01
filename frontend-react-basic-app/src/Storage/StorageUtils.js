function StorageUtils() {
    StorageUtils.prototype.check = function check() {
        try {
            return process.env.JEST_WORKER_ID !== undefined;
        } catch (err) {
            return undefined;
        }
    }
}

export default StorageUtils;