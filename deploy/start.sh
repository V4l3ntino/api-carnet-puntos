#!/bin/bash

# bash start.sh accion ../.env dcbdincidencias.yml ($1-->up,down,config, ${rutaEnv}, docker-compose.yml)
set -e

rutaEnv="../.env"

echo $1

if [[ $1 = "up" ]] 
then
    echo "Compilar ..."
    docker-compose --env-file ${rutaEnv} -f docker-compose.yml up -d --build
elif [[ $1 = "down" ]] 
then
    echo "Apagar"
    docker-compose --env-file ${rutaEnv} -f docker-compose.yml down
elif [[ $1 = "config" ]] 
then
    echo "Configurar"
    docker-compose --env-file ${rutaEnv} -f docker-compose.yml config
fi

