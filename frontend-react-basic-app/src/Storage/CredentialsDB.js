class CredentialDB {
    constructor() {
        if (typeof CredentialDB.instance === 'object') {
            return CredentialDB.instance;
        }
        CredentialDB.instance = this;
        return this;
    }

    async _init() {
        const {kvsEnvStorage} = await import("https://unpkg.com/@kvs/env?module");
        this.storage = await kvsEnvStorage({
            name: "CredentialDB",
            version: 1
        });
    }

    async _initWithDependency(storage) {
        this.storage = storage
    }

    static async createWithDependency(storage) {
        const o = new CredentialDB();
        await o._initWithDependency(storage);
        return o;
    }

    static async create() {
        const o = new CredentialDB();
        await o._init();
        return o;
    }

    save(key, value) {
        return (async () => {
            try {
                await this.storage.set(key, value)
                return true;
            } catch (err) {
                return false;
            }
        })();
    }

    get(key) {
        return (async () => {
            try {
                return await this.storage.get(key);
            } catch (err) {
                throw new Error('Parameter is not a exist better save first!');
            }
        })();
    }

    isExist(key) {
        return (async () => {
            try {
                let return_bool = this.storage.has(key)
                return return_bool;
            } catch (err) {
                return false;
            }
        })();
    }

    getAll() {
        return (async () => {
            var arr = [];
            try {
                for await (const [key, value] of this.storage) {
                    arr.push({key: key, value: value})
                }
                return arr
            } catch (err) {
                return arr;
            }
        })();
    }

}

export default CredentialDB;