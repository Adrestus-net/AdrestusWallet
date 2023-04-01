import TransactionDB from '../Storage/TransactionDB.js';
import CredentialsDB from '../Storage/CredentialsDB';
import { kvsEnvStorage } from "@kvs/env";


test('TransactionDB/Insert/Get/Hash/All', () => {
    (async () => {
        const storage = await kvsEnvStorage({
            name: "TransactionDB",
            version: 1
        });
        var db = await TransactionDB.createWithDependency(storage);
        var db2 = await TransactionDB.createWithDependency(storage);

        let save1 = await db.save("a1", "key");
        let save2 = await db.save("a2", "key2");
        var get1 = await db.get("a1");
        var get2 = await db2.get("a1");
        var get3 = await db2.get("a2");
        var arr = await db.getAll();
        expect(db).toBe(db2)
        expect(save1).toBe(true)
        expect(save2).toBe(true)
        expect(get1).toBe("key")
        expect(get2).toBe("key")
        expect(get3).toBe("key2")
        expect(arr[0].key).toBe("a1")
        expect(arr[1].key).toBe("a2")
        expect(arr[0].value).toBe("key")
        expect(arr[1].value).toBe("key2")
    })();
});

test('CredentialsDB/Insert/Get/Hash/All', () => {
    (async () => {
        const storage = await kvsEnvStorage({
            name: "CredentialsDB",
            version: 1
        });
        var db = await CredentialsDB.createWithDependency(storage);
        var db2 = await CredentialsDB.createWithDependency(storage);

        let save1 = await db.save("a1", "key");
        let save2 = await db.save("a2", "key2");
        var get1 = await db.get("a1");
        var get2 = await db2.get("a1");
        var get3 = await db2.get("a2");
        var arr = await db.getAll();
        expect(db).toBe(db2)
        expect(save1).toBe(true)
        expect(save2).toBe(true)
        expect(get1).toBe("key")
        expect(get2).toBe("key")
        expect(get3).toBe("key2")
        expect(arr[0].key).toBe("a1")
        expect(arr[1].key).toBe("a2")
        expect(arr[0].value).toBe("key")
        expect(arr[1].value).toBe("key2")
    })();
});
