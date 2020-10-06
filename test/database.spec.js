const firebase = require("@firebase/rules-unit-testing");
const http = require("http");
const fs = require("fs");

/**
 * The emulator will accept any database name for testing.
 */
const DATABASE_NAME = "database-emulator-example";

/**
 * The FIREBASE_DATABASE_EMULATOR_HOST environment variable is set automatically
 * by "firebase emulators:exec"
 */
const COVERAGE_URL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/.inspect/coverage?ns=${DATABASE_NAME}`;

/**
 * Creates a new client FirebaseApp with authentication and returns the Database instance.
 */
function getAuthedDatabase(auth) {
  return firebase
    .initializeTestApp({ databaseName: DATABASE_NAME, auth })
    .database();
}

/**
 * Creates a new admin FirebaseApp and returns the Database instance.
 */
function getAdminDatabase() {
  return firebase
    .initializeAdminApp({ databaseName: DATABASE_NAME })
    .database();
}

before(async () => {
  // Set database rules before running these tests
  const rules = fs.readFileSync("database.rules.json", "utf8");
  await firebase.loadDatabaseRules({
    databaseName: DATABASE_NAME,
    rules: rules,
  });
});

beforeEach(async () => {
  // Clear the database between tests
  await getAdminDatabase().ref().set(null);
});

after(async () => {
  // Close any open apps
  await Promise.all(firebase.apps().map((app) => app.delete()));

  // Write the coverage report to a file
  const coverageFile = 'database-coverage.html';
  const fstream = fs.createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
      http.get(COVERAGE_URL, (res) => {
        res.pipe(fstream, { end: true });

        res.on("end", resolve);
        res.on("error", reject);
      });
  });

  console.log(`View database rule coverage information at ${coverageFile}\n`);
});

describe("profile read rules", () => {
  it("should allow anyone to read profiles", async () => {
    const edison = getAuthedDatabase({ uid: "Pd3UkfX2SWNIgfyUUDqkpBfegpB2" });
    const test = getAuthedDatabase({ uid: "uxyw9TkqPJfewN15zNvURZ8Q5703" });
    const noone = getAuthedDatabase(null);

    await getAdminDatabase().ref("users/uxyw9TkqPJfewN15zNvURZ8Q5703").set({
      first: "test"
    });

    await firebase.assertSucceeds(edison.ref("users/Pd3UkfX2SWNIgfyUUDqkpBfegpB2").once("value"));
    await firebase.assertSucceeds(test.ref("users/Pd3UkfX2SWNIgfyUUDqkpBfegpB2").once("value"));
    await firebase.assertSucceeds(noone.ref("users/Pd3UkfX2SWNIgfyUUDqkpBfegpB2").once("value"));
  });

  it("should only allow users to modify their own profiles", async () => {
    const edison = getAuthedDatabase({ uid: "Pd3UkfX2SWNIgfyUUDqkpBfegpB2" });
    const test = getAuthedDatabase({ uid: "uxyw9TkqPJfewN15zNvURZ8Q5703" });
    const noone = getAuthedDatabase(null);

    await firebase.assertSucceeds(
      edison.ref("users/Pd3UkfX2SWNIgfyUUDqkpBfegpB2").update({
        favorite_color: "blue",
      })
    );
    await firebase.assertFails(
      test.ref("users/Pd3UkfX2SWNIgfyUUDqkpBfegpB2").update({
        favorite_color: "red",
      })
    );
    await firebase.assertFails(
      noone.ref("users/Pd3UkfX2SWNIgfyUUDqkpBfegpB2").update({
        favorite_color: "orange",
      })
    );
  });
});
