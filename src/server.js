import app from './app.js';
import { authenticated, syncUp } from './config/database/database.js';
import { envs } from './config/env/enviroments.js';
import initModel from './config/database/assosiation.js';

async function main() {
  try {
    await authenticated()
    initModel()
    await syncUp()
  } catch (error) {
    console.log(error);
  }
}
main();

app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`)
});
