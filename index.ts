import fs from 'node:fs'
import { get as _get, set as _set, unset as _unset } from 'lodash-es'

export interface DBOptions {
    path?: string;
}

export class JsonDB {
    private options: DBOptions
    private data: { [key: string]: any }

    /**
     * Represents a JSON database.
     * @constructor
     * @param {DBOptions} options - Options for the database.
     */

    constructor(options: DBOptions = {}) {
        options.path ??= 'database.json'
        this.options = options
        this.data = {}

        this.init()
    }

    private async init() {
        if (!fs.existsSync(this.options.path!)) {
            fs.writeFileSync(this.options.path!, '{}')
        }
        this.data = JSON.parse(fs.readFileSync(this.options.path!, 'utf-8'))
    }

    private async save() {
        fs.writeFileSync(this.options.path!, JSON.stringify(this.data))
    }

    /**
     * 
     * @returns {<any>} Returns all the data in the database.
     */

    async all() {
        return this.data
    }

    /**
     * Sets a value to a key in the database.
     * @param {string} key - The key to set the value to.
     * @param {any} value - The value to set to the key.
     */

    async set(key: string, value: any) {

        if (typeof key !== 'string') {
            throw new Error(`Type of first arguement (key) must be a string. Received ${typeof key}`)
        }

        _set(this.data, key, value)
        this.save()
    }

    /**
     * Gets a value from the database.
     * @param {string} key - The key to get the value from.
     * @returns {any} Returns the value of the key.   
     */

    async get(key: string) {
        if (typeof key !== 'string') {
            throw new Error(`Type of first arguement (key) must be a string. Received ${typeof key}`)
        }

        return _get(this.data, key)
    }

    /**
     * Deletes a key from the database.
     * @param {string} key - The key to delete from the database.
     */

    async delete(key: string) {
        _unset(this.data, key)
        this.save()
    }

    /**
     * Clears the database.
     */

    async clear() {
        this.data = {}
        this.save()
    }

    /**
     * 
     * @param {string} key - The key to check if it exists in the database.
     * @returns {boolean} Returns true if the key exists in the database, false if it doesn't.
     */

    async has(key: string) {
        return !!this.get(key)
    }

}