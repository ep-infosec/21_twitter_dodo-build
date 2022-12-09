import { build } from "../src/build";

test("build: branch=develop,project=fintara,scala-version=2.12.8,verbose=true", async () => {
  await build("true", "/tmp", "", "", "", "", "", "2.12.8", "", "", "", "", "", "", "true", "", "finatra");
});

test("build: branch=develop,project=finatra,scala-version=all,verbose=true", async () => {
  await build("true", "/tmp", "", "", "", "", "", "", "", "", "", "", "", "", "true", "", "finatra");
});

test("build: branch=develop,project=fintara,scala-version=all,verbose=false", async () => {
  await build("true", "/tmp", "", "", "", "", "", "", "", "", "", "", "", "", "false", "", "finatra");
});

test("build: branch=release,project=fintara,scala-version=2.12.8,verbose=true", async () => {
  await build("true", "/tmp", "", "", "", "", "", "2.12.8", "", "", "release", "", "", "", "true", "", "finatra");
});

test("build: branch=release,project=finatra,scala-version=all,verbose=true", async () => {
  await build("true", "/tmp", "", "", "", "", "", "", "", "", "release", "", "", "", "true", "", "finatra");
});

test("build: branch=release,project=fintara,scala-version=all,verbose=false", async () => {
  await build("true", "/tmp", "", "", "", "", "", "", "", "", "release", "", "", "", "false", "", "finatra");
});

test("build: branch=develop,project=all,scala-version=2.12.8,verbose=true", async () => {
  await build("true", "/tmp", "true", "", "", "", "", "2.12.8", "", "", "", "", "", "", "true", "", "");
});

test("build: branch=develop,project=all,scala-version=all,verbose=true", async () => {
  await build("true", "/tmp", "true", "", "", "", "", "", "", "", "", "", "", "", "true", "", "");
});

test("build: branch=develop,project=all,scala-version=all,verbose=false", async () => {
  await build("true", "/tmp", "true", "", "", "", "", "", "", "", "", "", "", "", "false", "", "");
});

test("build: branch=release,project=all,scala-version=2.12.8,verbose=true", async () => {
  await build("true", "/tmp", "true", "", "", "", "", "2.12.8", "", "", "release", "", "", "", "true", "", "");
});

test("build: branch=release,project=all,scala-version=all,verbose=true", async () => {
  await build("true", "/tmp", "true", "", "", "", "", "", "", "", "release", "", "", "", "true", "", "");
});

test("build: branch=release,project=all,scala-version=all,verbose=false", async () => {
  await build("true", "/tmp", "true", "", "", "", "", "", "", "", "release", "", "", "", "false", "", "");
});



