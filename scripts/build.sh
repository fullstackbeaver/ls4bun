#!/bin/bash

##### nettoyage
if [ -d "./dist" ]; then
    rm -r "./dist"
fi

##### compilation typage des fonctions
npx tsc --project tsconfig.json

##### ajout des déclarations
cp src/router/*.d.ts     dist/router/
cp src/server/*.d.ts     dist/server/

##### compilation de l'application
bun build ./src/index.ts --outdir ./dist --minify --target bun