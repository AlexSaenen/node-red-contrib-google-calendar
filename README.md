# node-red-contrib-google-calendar

## Installation
`run npm -g install node-red-contrib-google-calendar`

## Features
- Adding an event to google-calendar
- Getting an event from google-calendar
- Updating an event on google-calendar

## Example node

Get event from google calendar...
``` node
[{"id":"a139a0ea.d03e9","type":"inject","z":"d0a72042.8c99f","name":"","props":[{"p":"event","v":"qsj4v3s1lfsqj18uife40a6h20","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":170,"y":480,"wires":[["14b399ae.619466"]]},{"id":"14b399ae.619466","type":"get-event","z":"d0a72042.8c99f","google":"","name":"","calendar":"maestro-corporation.com_6siji6ng8ntc7lfid83bbqbt80@group.calendar.google.com","x":400,"y":480,"wires":[["cbaabfb1.f809f"]]},{"id":"cbaabfb1.f809f","type":"debug","z":"d0a72042.8c99f","name":"fetched event","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":640,"y":480,"wires":[]}]
```

Add event to google calendar...
``` node
[{"id":"e41dae67.837e","type":"add-event","z":"d0a72042.8c99f","google":"","name":"","calendar":"maestro-corporation.com_6siji6ng8ntc7lfid83bbqbt80@group.calendar.google.com","x":400,"y":400,"wires":[["2b844f3.d5fe6b"]]},{"id":"5bff0fe.54330f","type":"inject","z":"d0a72042.8c99f","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"summary\":\"Some test event\",\"location\":\"Le bikini, ramonville\",\"description\":\"Un event de test\",\"start\":{\"dateTime\":\"2024-04-20T18:00:00Z\"},\"end\":{\"dateTime\":\"2024-04-20T20:00:00Z\"}}","payloadType":"json","x":170,"y":400,"wires":[["e41dae67.837e"]]},{"id":"2b844f3.d5fe6b","type":"debug","z":"d0a72042.8c99f","name":"created event","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":640,"y":400,"wires":[]}]
```

Update event in google calendar...
``` node
[{"id":"20a3de6f.3758c2","type":"inject","z":"d0a72042.8c99f","name":"","props":[{"p":"event","v":"qsj4v3s1lfsqj18uife40a6h20","vt":"str"},{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"summary\":\"Some updated test event\",\"location\":\"De school, amsterdam\",\"description\":\"Un updaté d'event de test\",\"start\":{\"dateTime\":\"2024-04-19T18:00:00Z\"},\"end\":{\"dateTime\":\"2024-04-19T20:00:00Z\"}}","payloadType":"json","x":160,"y":560,"wires":[["654aa017.a1241"]]},{"id":"654aa017.a1241","type":"update-event","z":"d0a72042.8c99f","google":"","name":"","calendar":"maestro-corporation.com_6siji6ng8ntc7lfid83bbqbt80@group.calendar.google.com","x":410,"y":560,"wires":[["610e4837.ccd568"]]},{"id":"610e4837.ccd568","type":"debug","z":"d0a72042.8c99f","name":"updated event","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":640,"y":560,"wires":[]}]
```

## Reference
node-red-node-google
