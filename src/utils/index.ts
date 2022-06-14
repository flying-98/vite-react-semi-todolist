
interface dbTableType {
    [propsName: string]: string[]
}

export class Db {
    private db: Promise<IDBDatabase | undefined>
    constructor(dbName: string, dbTable: dbTableType) {
        this.db = new Promise<IDBDatabase>((resolve, reject) => {
            const res = window.indexedDB.open(dbName)
            res.onsuccess = (e) => {
                console.log('打开indexedDB成功');
                resolve((e.target as IDBOpenDBRequest).result)
            }

            res.onerror = () => {
                console.log('打开indexedDB失败');
                reject()
            }
            res.onupgradeneeded = (e) => {
                const db = (e.target as IDBOpenDBRequest).result
                console.log("indexedDB升级");
                if (!db.objectStoreNames.contains(dbName)) {
                    // const objectStore = db.createObjectStore(name, { autoIncrement: true })
                    this.createdDbTable(db, dbTable)
                }
                resolve(db)
            }
        })
    }
    private createdDbTable(db: IDBDatabase, dbTable: dbTableType) {
        for (const table in dbTable) {
            if (Object.prototype.hasOwnProperty.call(dbTable, table)) {
                const objectStore = db.createObjectStore(table, { autoIncrement: true, keyPath: "id" })
                dbTable[table].forEach(indexName => {
                    objectStore.createIndex(indexName, indexName, { unique: true })
                })
            }
        }
    }

    /**
     * @param table 表名
     * @param data 数据
     */
    add(table: string, data: any): Promise<[any, Error | undefined]> {
        return catchError(async (resolve, reject) => {
            const IDBDatabase = await this.db
            if (IDBDatabase) {
                const request = IDBDatabase.transaction(table, "readwrite").objectStore(table).add(data)
                request.onerror = (e) => {
                    reject(e)
                }
                request.onsuccess = () => {
                    resolve()
                }
            }
        })
    }

    findByKey(table: string, key?: any): Promise<[any, Error | undefined]> {
        if (key === undefined || key === null) {
            return this.findAll(table)
        }

        return catchError(async (resolve, reject) => {
            const IDBDatabase = await this.db
            if (IDBDatabase) {
                const res = IDBDatabase.transaction(table, "readonly").objectStore(table).get(key)
                res.onerror = (e) => {
                    reject(e)
                }
                res.onsuccess = () => {
                    resolve(res.result)
                }
            }
        })
    }
    findAll(table: string): Promise<[any, Error | undefined]> {
        return catchError(async (resolve, reject) => {
            const IDBDatabase = await this.db

            if (IDBDatabase) {
                const data: any[] = []
                const res = IDBDatabase.transaction(table, "readonly").objectStore(table).openCursor()
                res.onsuccess = (e) => {
                    const cursor: IDBCursorWithValue = (e.target as IDBRequest).result;
                    if (cursor) {
                        data.push(cursor.value)
                        cursor.continue();
                    } else {
                        resolve(data)
                    }
                }
                res.onerror = (e) => {
                    reject(e)
                }
            }
        })
    }
    /**
     * 
     * @param table 表名
     * @param index 索引
     */
    findByIndex(table: string, indexName: any, value: any): Promise<[any, Error | undefined]> {
        return catchError(async (resolve, reject) => {
            const IDBDatabase = await this.db
            if (IDBDatabase) {
                const res = IDBDatabase.transaction(table, "readonly").objectStore(table).index(indexName).get(value)
                res.onerror = (e) => {
                    reject(e)
                }
                res.onsuccess = () => {
                    resolve(res.result)
                }
            }
        })
    }
    update(table: string, value: any) {
        return catchError(async (resolve, reject) => {
            const IDBDatabase = await this.db
            if (IDBDatabase) {
                const res = IDBDatabase.transaction(table, "readwrite").objectStore(table).put(value)
                res.onerror = (e) => {
                    reject(e)
                }
                res.onsuccess = () => {
                    resolve()
                }
            }
        })
    }
    deleteByKey(table: string, key: any) {
        return catchError(async (resolve, reject) => {
            const IDBDatabase = await this.db
            if (IDBDatabase) {
                const res = IDBDatabase.transaction(table, "readwrite").objectStore(table).delete(key)
                res.onerror = (e) => {
                    reject(e)
                }
                res.onsuccess = () => {
                    resolve()
                }
            }
        })
    }
}



async function catchError(callback: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<[any, Error | undefined]> {
    let res, error
    try {
        res = await new Promise((resolve, reject) => {
            callback(resolve, reject)
        })
    } catch (error) {
        error = error
    }
    return [res, error]

}