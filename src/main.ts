import * as core from '@actions/core'
import { build } from "./build";

const dryrun = "false";
const dir = "";

async function run(): Promise<void> {
    try {
        const buildall = core.getInput("all", { required: false });
        const clean = core.getInput("clean", { required: false });
        const cleanfiles = core.getInput("clean-files", { required: false });
        const include = core.getInput("include", { required: false });
        const notest = core.getInput("no-test", {required: false });
        const scalaversion = core.getInput("scala-version", { required: false });
        const clonehome = core.getInput("clone-dir", { required: false });
        const local = core.getInput("local", { required: false });
        const branch = core.getInput("branch", { required: false });
        const proxy = core.getInput("proxy", { required: false });
        const publishm2 = core.getInput("publish-m2", { required: false });
        const sbtversion = core.getInput("sbt-version", { required: false });
        const verbose = core.getInput("verbose", { required: false });
        const trace = core.getInput("trace", { required: false });
        const project = core.getInput("project", { required: false });
        await build(dryrun, dir, buildall, clean, cleanfiles, include, notest, scalaversion, clonehome, local, branch, proxy, publishm2, sbtversion, verbose, trace, project);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
