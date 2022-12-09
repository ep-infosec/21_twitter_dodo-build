import * as core from '@actions/core'

import * as shell from "shelljs";
import * as path from "path";

const homedir = require("os").homedir();
const dodoUrl = `https://raw.githubusercontent.com/twitter/dodo/develop/bin/build`;

export async function build(
    dryrun: string,
    dir: string,
    buildall: string,
    clean: string,
    cleanfiles: string,
    include: string,
    notest: string,
    scalaversion: string,
    clonehome: string,
    local: string,
    branch: string,
    proxy: string,
    publishm2: string,
    sbtversion: string,
    verbose: string,
    trace: string,
    project: string) {
    
    setEnvironmentVariableCI();
    
    var bin = path.join(homedir, "bin");
    if (dir != "") { bin = path.join(dir, "bin") }

    core.addPath(bin);
    const exists = shell.ls(bin)
    if (exists.code > 0) {
        shell.mkdir(bin);
    }
    const dodo = path.join(bin, "dodo");
    shell.set("-ev");
    shell.exec(`curl -sL -o ${dodo} ${dodoUrl}`, { silent: true });
    shell.chmod(755, dodo);

    const _dryrun = setToggleOption(dryrun, "dry-run");
    const _all = setToggleOption(buildall, "all");
    const _clean = setToggleOption(clean, "clean");
    const _cleanfiles = setToggleOption(cleanfiles, "clean-files");
    const _include = setToggleOption(include, "include");
    const _notest = setToggleOption(notest, "no-test");
    const _scalaversion = setValueOption(scalaversion, "scala-version");
    const _clonehome = setValueOption(clonehome, "clone-dir");
    const _local = setToggleOption(local, "local");
    const _branch = setValueOption(branch, "branch");
    const _proxy = setValueOption(proxy, "proxy");
    const _publishm2 = setToggleOption(publishm2, "publish-m2");
    const _verbose = setToggleOption(verbose, "verbose");
    const _trace = setToggleOption(trace, "trace");
    const _project = setOption(project);
    
    const result = shell.exec(`${dodo} ${_local}${_clean}${_cleanfiles}${_branch}${_notest}${_clonehome}${_proxy}${_scalaversion}${_publishm2}${_dryrun}${_verbose}${_all}${_include}${_project}`);
    if (result.code > 0) {
        core.setFailed(`Failed to run Dodo Build: ${result.stderr}`);
        return;
    }
    core.endGroup();
}

function setEnvironmentVariableCI() {
    core.exportVariable("CI", "true");
}

function setToggleOption(inputOption: string, command: string) {
    var opt = "";
    if (inputOption && inputOption === "true") {
        opt = ` --${command}`; 
    }
    return opt;
}

function setValueOption(inputOption: string, command: string) {
    var opt = "";
    if (inputOption) {
        opt = ` --${command} ${inputOption}`;
    }
    return opt;
}

function setOption(inputOption: string) {
    var opt = "";
    if (inputOption) {
        opt = ` ${inputOption}`;
    }
    return opt;
}

function curl(url: string, outputFile: string) {
    shell.exec(`curl -sL ${url}`, { silent: true }).to(outputFile);
    shell.chmod(755, outputFile);
    shell.cat(outputFile);
    console.log(`Downloaded '${path.basename(outputFile)}' to ${outputFile}`);
}