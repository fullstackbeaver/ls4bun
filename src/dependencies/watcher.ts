import * as path        from "path";
import { reloadServer } from "../../ununsed/core/httpServer";
import { watch }        from "chokidar";

/**
 * Sets up a file watcher on the specified paths and triggers a server reload
 * according to the provided reload rules when changes are detected.
 *
 * @param pathsToWatch - An array of file paths to monitor for changes.
 * @param reloadRules  - A function that returns the rules to determine how the server should be reloaded.
 */

export function useWatcher(pathsToWatch: string[], reloadRules:Function) {
  const watcher = watch(pathsToWatch, { persistent: true });

  const restartScript = async (filePath: string) => {

    console.log(`Change detected in the file : ${filePath}`); //TODO supprimer une foi le debug fini
    console.log(`File folder modified : ${path.dirname(filePath)}`);

    const extra = [] as string[];

    filePath.endsWith(".scss") && extra.push("css");
    // filePath.endsWith(".json") && extra.push("generateFileTree"); //TODO mettre à jour au moment de l'enregistrement

    reloadServer(reloadRules());
  };

  watcher.on("change", (filePath: string) => {
    restartScript(filePath);
  });
}