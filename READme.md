## Postable RESTful API

El proyecto se centra en la creación de una API RESTful diseñada para una red social, ofreciendo a los usuarios la posibilidad de interactuar con publicaciones (Posts). Esta API ha sido desarrollada con la capacidad de gestionar diversas operaciones, adaptándose a las necesidades de usuarios registrados y no registrados.

### Configuracion

#### Clonar el Repositorio

Ejecuta en tu terminal:
```ruby 
git clone git@github.com:codeableorg/postable-api-Hellionfrs.git
```

#### Instalar Dependencias

Ubicado en la raiz del proyecto ejecuta el siguiente codigo en la terminal:
```ruby
npm install
```

### Migraciones
1. Antes de comenzar con las migraciones es necesario que tengas Postgresql y un usuario con permisos especiales
1. Crea una db con el usuario con permisos que nos servira de admin
1. Crea un archivo .env en la raiz del proyecto y completa segun tu usario de Postgresql, recuerda que el PGDATABASE y PGADMINDATABASE deben ser distintos
1. Puedes resetear todo la base de datos y crearla denuevo (recomiendo hacer esto al inicio luego del npm install)
 ```ruby
npm run db:reset
``` 
```ruby
PGHOST=localhost
PGDATABASE=database
PGPORT=5432
PGUSER=pg_user
PGPASSWORD=pg_password
PGADMINDATABASE=admin_database
```
1.  Crea la base de datos que usaremos!
```ruby 
npm run db:create  
```
1. Crea las tablas!
```ruby
npm run db:migrate up
```
1. Si quieres seguir agregar migraciones para que todos nos pongamos al dia 
```ruby
npm run db:migrate create -- --name create-users.ts 
```
