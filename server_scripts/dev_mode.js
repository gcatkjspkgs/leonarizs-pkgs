onEvent('item.right_click', e => {
	if (e.hand == MAIN_HAND) {
		if (e.item.id == 'minecraft:command_block' && !e.player.persistentData.devMode) {
			e.player.persistentData.devMode = true
			e.entity.tell('Dev Mode: On')
			e.player.addItemCooldown('minecraft:command_block', 20)
		} else if (e.item.id == 'minecraft:command_block' && e.player.persistentData.devMode == true) {
			e.player.persistentData.devMode = false
			e.entity.tell('Dev Mode: Off')
			e.player.addItemCooldown('minecraft:command_block', 20)
		}
	}
})