//priority: 2
/**
 * @param {*} e server.load event
 */
function initDB(e) {
    if (!e.server.persistentData.kjsid) genID(e)

    let obj = JsonIO.read('.saves/db.json')
    if (obj == null) {
        obj = {}
        JsonIO.write('.saves/db.json', obj)
    }
    if (!obj[e.server.persistentData.kjsid]) {
        obj[e.server.persistentData.kjsid] = {}
        JsonIO.write('.saves/db.json', obj)
    }

    e.server.data.db = obj[e.server.persistentData.kjsid].db
}

onEvent('server.load', e => {
    initDB(e)
})

onEvent('server.unload', e => {
    let obj = JsonIO.read('.saves/db.json')
    obj[e.server.persistentData.kjsid] = e.server.data
    JsonIO.write('.saves/db.json', obj)
})

function genID(e) {
    let id = JSON.stringify(e.server.getOverworld().seed).split("")
    for (let i = id.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let tmp = id[i]
        id[i] = id[j]
        id[j] = tmp
    }
    id = id.join("")
    e.server.persistentData.kjsid = id
}