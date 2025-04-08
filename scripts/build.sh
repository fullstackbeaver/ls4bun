#!/bin/bash

##### nettoyage
if [ -d "./lib" ]; then
    rm -r "./lib"
fi

##### compilation typage des fonctions
bun tsc --project tsconfig.json

##### ajout des déclarations
cp src/router/*.d.ts     lib/router/
cp src/server/*.d.ts     lib/server/

##### compilation de l'application
bun build ./src/index.ts --outdir ./lib --minify --target bun --minify --packages external