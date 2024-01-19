## Postable RESTful API

El proyecto se centra en la creación de una API RESTful diseñada para una red social, ofreciendo a los usuarios la posibilidad de interactuar con publicaciones (Posts). Esta API ha sido desarrollada con la capacidad de gestionar diversas operaciones, adaptándose a las necesidades de usuarios registrados y no registrados.

### Configuracion

#### Clonar el Repositorio

Ejecuta en tu terminal `git clone git@github.com:codeableorg/postable-api-Hellionfrs.git`

#### Instalar Dependencias

Ubicado en la raiz del proyecto ejecuta el siguiente codigo en la terminal `npm install`

### Migraciones
1. Antes de comenzar con las migraciones es necesario que tengas Postgresql y un usuario con permisos especiales
1. Crea una db con el usuario con permisos que nos servira de admin
1. Crea un archivo .env en la raiz del proyecto y completa segun tu usario de Postgresql, recuerda que el PGDATABASE y PGADMINDATABASE deben ser distintos
    - tu archivo .env tiene que verse asi:
```ruby
PGHOST=localhost
PGDATABASE=database
PGPORT=5432
PGUSER=pg_user
PGPASSWORD=pg_password
PGADMINDATABASE=admin_database
```

1. npm run db:migrate create -- --name create-users.ts "crea archivos para migrar"
- npm run db:create "crea la base de datos"
- npm run db:migrate up "para ejecutar las migraciones"
