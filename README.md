# My actionhero Project

*visit www.actionherojs.com for more information*

## To install:
(assuming you have [node](http://nodejs.org/) and NPM installed)

`npm install`

## To Run:
`npm start`

## To Test:
`npm test`

DAVID------------
dvdyzag@gmail.com
COMANDO SEQUELIZE CLI LOCAL
sudo node_modules/.bin/sequelize 

# Crear modelo con sequelize cli

sequelize model:create --name MyUser --attributes firstName:string, lastName:string, email:string, passwordHash:text, passwordSalt:text


# Ejecutar migraciones pendientes

sequelize db:migrate

# Crear Actions

node_modules/.bin/actionhero generateAction --name=myAction

# Relaciones

[relaciones](http://stackoverflow.com/questions/22958683/how-to-implement-many-to-many-association-in-sequelize)

## angular - bootstrap - cors

[abc](https://github.com/evantahler/actionhero-angular-bootstrap-cors-csrf)

## satellizer para consumo de apis vía angular
[satellizer](https://github.com/sahat/satellizer)