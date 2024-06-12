import fs from 'node:fs'
import { get as _get, set as _set } from 'lodash-es'

export interface DBOptions {
    path?: string;
}

export class JsonDB {
    private options: DBOptions
    data: { [key: string]: any }

    constructor(options: DBOptions = {}) {
        options.path ??= 'db.json'
        this.options = options
        this.data = {}
    }

    async init() {
        if (!fs.existsSync(this.options.path!)) {
            fs.writeFileSync(this.options.path!, '{}')
        }
        this.data = JSON.parse(fs.readFileSync(this.options.path!, 'utf-8'))
    }

    private async save() {
        fs.writeFileSync(this.options.path!, JSON.stringify(this.data))
    }

    async all() {
        return this.data
    }

    async set(key: string, value: any) {

        if (typeof key !== 'string') {
            throw new Error(`Type of first arguement (key) must be a string. Received ${typeof key}`)
        }

        _set(this.data, key, value)
        this.save()
    }

    async get(key: string) {
        if (typeof key !== 'string') {
            throw new Error(`Type of first arguement (key) must be a string. Received ${typeof key}`)
        }

        return _get(this.data, key)
    }

    async delete(key: string) {
        delete this.data[key]
        this.save()
    }

    async clear() {
        this.data = {}
        this.save()
    }

    async has(key: string) {
        return !!this.data[key]
    }

}