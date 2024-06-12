import { JsonDB } from 'jayson.database'

const db = new JsonDB({
    path: 'test.json'
})

const run = async () => {
    db.set('abc', 'alphabet') // sets the value of abc to alphabet
    db.set('abcObject', {
        a: 1,
        b: 2,
        c: 3
    }) // sets the value of abcObject to an object with a, b, and c values
    db.set('abcObject.a', 4) // sets the value of abcObject.a to 4

    db.get('abc') // 'alphabet'
    db.get('abcObject') // { a: 4, b: 2, c: 3 }
    db.get('abcObject.a') // 4

    db.delete('abc') // deletes the value of abc
    db.delete('abcObject.a') // deletes the value of abcObject.a
    db.get('abc') // undefined
    db.get('abcObject.a') // undefined

    db.has('abc2') // false
    db.has('abcObject') // true

    db.clear() // clears the database
    db.get('abcObject') // undefined

    db.set('abc', 'alphabet')
    db.set('abcObject', {
        a: 1,
        b: 2,
        c: 3
    })
    db.all() // { abc: 'alphabet', abcObject: { a: 1, b: 2, c: 3 } }

}

run()