[![build-test](https://github.com/twitter/dodo-build/workflows/build-test/badge.svg?branch=master)](https://github.com/twitter/dodo-build/actions/)
# Dodo Build Github Action

A GitHub Action to run [Dodo](https://github.com/twitter/dodo), the Twitter OSS project builder.

## Usage:

In your GitHub Actions workflow, create a "dodo-build" job which will run the builder. Then specify this job in the [`jobs.<job_id>.needs`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idneeds). 

Note: it is best if this action is used with caches for maven (when `publish-m2` is 'true'), ivy, and the [Dodo](https://github.com/twitter/dodo) Twitter OSS project builder state.

```diff
+++ .github/workflows/ci.yml
  name: CI
  on:
    push:
  jobs:
+   dodo-build:
+     runs-on: ubuntu-latest
+     steps:
+       - uses: actions/setup-java@v1
+         with:
+           java-version: 1.8
+       - name: cache/maven
+         uses: actions/cache@v1
+         with:
+           path: ~/.m2/repository
+           key: ${{ runner.os }}-maven-${{ hashFiles('**/pom.xml') }}
+           restore-keys: |
+             ${{ runner.os }}-maven-
+       - name: cache/ivy2-cache
+         uses: actions/cache@v1
+         with:
+           path: ~/.ivy2/cache
+           key: ${{ runner.os }}-sbt-ivy-cache-
+       - name: cache/ivy2-local
+         uses: actions/cache@v1
+         with:
+           path: ~/.ivy2/local/com.twitter
+           key: ${{ runner.os }}-sbt-ivy-local-
+       - name: cache/dodo
+         uses: actions/cache@v1
+         with:
+           path: ~/.dodo
+           key: ${{ runner.os }}-dodo-
+       - name: dodo/run
+         uses: twitter/dodo-build@v3
+         with:
+           project: scrooge
+           publish-m2: true
    test:
+     needs: dodo-build
      runs-on: ubuntu-latest
```

## Options

Supports all of the main input options and projects as [Dodo](https://github.com/twitter/dodo), the Twitter OSS project builder: 

```
all             Build all projects in the DAG list (overrides --include). Default: false.
clean           Delete any sbt-launch.jar and run \"sbt clean\" before running other sbt commands.
                Default: false.
clean-files     Delete all $NAME caches, e.g., $DODO_DIRECTORY/caches, $DODO_DIRECTORY/clones, 
                and $DODO_DIRECTORY/builds. Default: false.
include         Include building of the given project. Default: false.
no-test         Do not run tests (will still compile tests via test:compile). 
                Default: false (run tests).
scala-version   If set, do not cross-compile instead use this specific version for building all projects.
                Default: unset (cross-compile).
clone-dir       Directory into which to clone remotes. Default: $HOME/.dodo/clones
local           Build source from local filesystem instead of Github. 
                Default: false (use Github sources).
branch          Branch to use when building from Github sources. Default: develop.
proxy           Base URL from which to resolve artifacts when working offline, (e.g., the sbt-launch.jar),
                Example: --proxy https://my.internal.company.repo/sbt-repo. NOTE: you MUST set 
                --local and --sbt-version with this option. Default: unset.
publish-m2      Also publish artifacts to the local ~/.m2 repository. Default: false.
sbt-version     The sbt version to use when downloading the sbt launch jar.
                Default: unset, the project defined sbt version will used.
dry-run         Output, but do not execute the sbt build commands. If using remotes
                they will still be cloned. Default: false.
verbose         Run in verbose mode. Default: false.
trace           Run in trace mode. Note: extremely verbose. Default: false.
project         [OPTIONAL] Individual project for which to build all dependencies. Optional if '--all' is passed. Required otherwise."
```

The only difference being in how to signal "toggle" options. 

Most [Dodo](https://github.com/twitter/dodo) options are
toggles (or switches). "On" or 'true' is denoted by adding the option, "off" or 'false' is denoted by exclusion or absence from the command line input. 

With the `dodo-build` Github Action, to signal 'true', set the value of the desired key to 'true'. Setting the value to 'false', empty string, or using the default are all equivalent to setting 'false' for these [Dodo](https://github.com/twitter/dodo) options.
			
E.g.,

explicitly set to 'false':

```
uses: twitter/dodo-build@v3
with:
  project: scrooge
  verbose: false
```

set to empty string:

```
uses: twitter/dodo-build@v3
with:
  project: scrooge
  verbose: ''
```

do not include (uses default):

```
uses: twitter/dodo-build@v3
with:
  project: scrooge
```

All signal 'false' in this case for the `verbose` option. This is equivalent to running the [Dodo](https://github.com/twitter/dodo) script **without** the `--verbose` option.

Other options expect values and setting them with the `dodo-build` action is straightforward. Include the key with a value. Exclusion will result in the default value being used.

E.g.,

```
uses: twitter/dodo-build@v3
with:
  project: twitter-server
  branch: release
```

Lastly, the `project` option is special and is expected to be the value of a supported project for which to build dependencies. It is meant to be specified last when included. When using the `dodo-build` action, include the key with a value as shown the above examples.
