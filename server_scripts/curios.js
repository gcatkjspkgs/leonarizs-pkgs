onEvent('item.tags', event => {
    global["customCurios"].forEach(i => {
        event.add(`curios:${i.slot}`, i.curio)
    })
})

onEvent('player.logged_in', event => {
    event.server.scheduleInTicks(30, event, callback => {
        global["customCurios"].forEach(c => {
            if (checkCurios(event, c.curio)) c.func(event)
        })
        callback.reschedule()
    })
})

function getCurios(event) {
    let output = {}
    for (let s in event.player.fullNBT.ForgeCaps['curios:inventory'].Curios) {
        let slot = event.player.fullNBT.ForgeCaps['curios:inventory'].Curios[s]
        if (!output[slot.Identifier]) output[slot.Identifier] = []
        for (let i in slot.StacksHandler.Stacks.Items) {
          let item = slot.StacksHandler.Stacks.Items[i]
            output[slot.Identifier].push(item.id)
        }
    }
    return output
}

function checkCurios(event, curio) {
    return JSON.stringify(getCurios(event)).includes(curio)
}