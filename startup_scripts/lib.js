onEvent("loaded", e => {
    global.leonariz.circlePos = (event, target, r, particle) => {
        for (let angle = 0; angle < 6.3; angle += 0.1) {

            let x = (r * Math.sin(angle))
            let z = (r * Math.cos(angle))

            event.runCommandSilent(`/particle ${particle} ${target.x + x} ${target.y + 1} ${target.z + z} 0.2 0.2 0.2 0 5`)
        }
    }

    // Kubejs's rayTrace is limited to the reach distance, so here's a custom one
    global.leonariz.rayTraceEntities = (event, entity) => {
        let start = entity
        
        let ray = rayTrace(event, 200)

        let d = distance(start.x, (start.y + event.player.getEyeHeight()), start.z, ray.x, ray.y, ray.z)
        for (let i = -1; i < d*10; i++) {
            let delta = i / 10 / d
            let x = (1 - delta) * start.x + delta * (ray.x)
            let y = (1 - delta) * (start.y + event.player.getEyeHeight()) + delta * (ray.y)
            let z = (1 - delta) * start.z + delta * (ray.z)
            
            let entity = event.level.getEntitiesWithin(AABB.of(x - 0.2, y - 0.2, z - 0.2, x + 0.2, y + 0.2, z + 0.2))
            entity = entity.filter(i => !i.isPlayer() && i.isAlive() && i.isLiving())
            if (entity.length > 0) { 
                return entity[0]
            }
        }
    }
    // It works like the Kubejs's one, but returns the air block if the player is not facing any block
    global.leonariz.rayTrace = (event, distance) => {

        const x_rad = event.player.pitch * JavaMath.PI / 180;
        const y_rad = event.player.yaw * JavaMath.PI / 180;

        const dirV = {
            x: -Math.sin(y_rad) * Math.cos(x_rad),
            y: -Math.sin(x_rad),
            z: Math.cos(y_rad) * Math.cos(x_rad)
        };

        const PosVec = {
            x: event.player.x + (distance * dirV.x),
            y: (event.player.y + event.player.getEyeHeight()) + (distance * dirV.y),
            z: event.player.z + (distance * dirV.z)
        }

        for (let i = -1; i < distance*10; i++) {
            let delta = i / 10 / distance
            let x = (1 - delta) * event.player.x + delta * (PosVec.x)
            let y = (1 - delta) * (event.player.y + event.player.getEyeHeight()) + delta * (PosVec.y)
            let z = (1 - delta) * event.player.z + delta * (PosVec.z)
            let block = event.level.getBlock(x, y, z)
            if (!block.equals('minecraft:air') && !block.equals('minecraft:water')&& !block.equals('minecraft:lava')) {
                return {
                    block: block,
                    x: x,
                    y: y,
                    z: z
                }
            }
        }

        return {
            x: PosVec.x,
            y: PosVec.y,
            z: PosVec.z
        }
    }

    global.leonariz.distance = (x, y, z, x2, y2, z2) => {
        let dis = Math.abs(Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2) + Math.pow(z - z2, 2)))
        return dis
    }
    globlal.randNum = (min, max, int) => {
        let resul
        if (int) {
            resul = Math.floor((Math.random() * max) + min)
        } else {
            resul = ((Math.random() * max) + min).toFixed(2)
        }
        return resul
    }
})