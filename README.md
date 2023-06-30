# Register curios using KubeJS

[![kjspkg-available](https://github-production-user-asset-6210df.s3.amazonaws.com/79367505/250114674-fb848719-d52e-471b-a6cf-2c0ea6729f1c.svg)](https://kjspkglookup.modernmodpacks.site/#curios-registry)

## Config example

```js
global["customCurios"] = [
    {
        curio: 'minecraft:dirt',
        slot: 'ring',
        func: () => {
            // Curio code here
        }
    }
]
```
