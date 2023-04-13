onEvent('entity.spawned', event => {
    if (!event.entity.type.equals('minecraft:item')) return
    if (event.entity.getFullNBT().Item.id == "minecraft:wheat_seeds") {
        let timeOnDirt
        event.server.scheduleInTicks(20, callback => {
            let nbt = event.entity.getFullNBT()
            if (event.entity.block.equals('minecraft:farmland')) {
                if (!timeOnDirt) timeOnDirt = 0
                timeOnDirt++
                if (timeOnDirt >= 5) {
                    if (event.entity.block.up.id.equals('minecraft:air')) {
                        event.entity.block.up.set('minecraft:wheat')
                        if (nbt.Item.Count < 2) {
                            event.entity.kill()
                        } else {
                            nbt.Item.Count--
                            event.entity.setFullNBT(nbt)
                        }
                        timeOnDirt = 0
                    }
                }
            } else {
                timeOnDirt = 0
            }
            if (event.entity.isAlive()) callback.reschedule()
        })
    }
})