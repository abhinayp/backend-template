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
- `src/api` - for all modules that has controllers
- `src/middlewares` - for all global middlewares (controller modules will have middlewares specific to thier controllers)
- `src/interceptors` - for all global interceptors (controller modules will have interceptors specific to thier controllers)
- `src/guards` - for all global guards (controller modules will have guards specific to thier controllers)
- `src/datasources` - for database modules
- `src/modules` - for all other modules
- `src/util` - for global utilities
