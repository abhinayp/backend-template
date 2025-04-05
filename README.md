# PROJECTNAME

## Quick Start
```bash
make up
```
Server starts in port 5001

## Cheat Sheet
Install packages
```bash
make install
```

Run npm commands inside docker
```bash
make npm command="run test"
```

Start Servers
```bash
make up
```

Stop Server
```bash
make down
```

Restart Server
```bash
make reload
```

## Folder Structure
| Directory | Description |
|-----------|-------------|
| `src/api` | For all modules that has controllers |
| `src/middlewares` | For all global middlewares (controller modules will have middlewares specific to thier controllers) |
| `src/interceptors` | For all global interceptors (controller modules will have interceptors specific to thier controllers) |
| `src/guards` | For all global guards (controller modules will have guards specific to thier controllers) |
| `src/datasources` | For database modules |
| `src/modules` | For all other modules |
| `src/util` | For global utilities |
| `src/consumers/topics` | For kafka consumer topics |
| `src/consumers` | Register consumer topics in consumer.controller.ts and consumer.module.ts |
| `src/gateway` | For websocket namespaces |
| `src/adaptors` | For adaptors like redis |
