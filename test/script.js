import { JsonDB } from 'file-database'
const db = new JsonDB()
db.set('foo', 'bar')
;(async () => {
    let data = await db.get('foo')
    console.log(data)
})()