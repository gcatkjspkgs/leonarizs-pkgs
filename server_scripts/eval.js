onEvent('player.chat', event => {
    if (event.player.persistentData.devMode == true) {
        if (event.message.startsWith('eval ')) {
        event.player.tell(eval(event.message.slice(5)))
        event.cancel()
        }       
    }
})