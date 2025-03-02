#!/bin/bash

##### nettoyage
if [ -d "./dist" ]; then
    rm -r "./dist"
fi

##### compilation typage des fonctions
npx tsc --project tsconfig.json

##### ajout des déclarations
cp src/core/*.d.ts          dist/core/
# cp src/dependencies/*.d.ts  dist/dependencies/

##### compilation de l'application
bun build ./src/index.ts --outdir ./dist --minify --target bun