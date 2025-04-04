// run-tests.ts
import { setTimeout } from "timers/promises";
import { spawnSync }  from "child_process";

// Lancer l"application
const appProcess = Bun.spawn(["bun", "run", "./example/index.ts"], {
  stderr: "pipe",
  stdout: "pipe"
});

console.log("Application lancée, attente de 2 secondes pour être sûr qu\"elle est prête...");
await setTimeout(2000);

try {
  const testProcess = spawnSync("bun", ["test"], { //NOSONAR
    stdio: "inherit",
  });

  if (testProcess.status !== 0) {
    console.error("Les tests ont échoué");
    process.exit(1);
  }
 
  console.log("Tous les tests ont réussi");
} finally {
  appProcess.kill();
  console.log("Application arrêtée");
}