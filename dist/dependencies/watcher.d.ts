/**
 * Sets up a file watcher on the specified paths and triggers a server reload
 * according to the provided reload rules when changes are detected.
 *
 * @param pathsToWatch - An array of file paths to monitor for changes.
 * @param reloadRules  - A function that returns the rules to determine how the server should be reloaded.
 */
export declare function useWatcher(pathsToWatch: string[], reloadRules: Function): void;
