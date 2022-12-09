"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const shell = __importStar(require("shelljs"));
const path = __importStar(require("path"));
const homedir = require("os").homedir();
const dodoUrl = `https://raw.githubusercontent.com/twitter/dodo/develop/bin/build`;
function build(dryrun, dir, buildall, clean, cleanfiles, include, notest, scalaversion, clonehome, local, branch, proxy, publishm2, sbtversion, verbose, trace, project) {
    return __awaiter(this, void 0, void 0, function* () {
        setEnvironmentVariableCI();
        var bin = path.join(homedir, "bin");
        if (dir != "") {
            bin = path.join(dir, "bin");
        }
        core.addPath(bin);
        const exists = shell.ls(bin);
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
    });
}
exports.build = build;
function setEnvironmentVariableCI() {
    core.exportVariable("CI", "true");
}
function setToggleOption(inputOption, command) {
    var opt = "";
    if (inputOption && inputOption === "true") {
        opt = ` --${command}`;
    }
    return opt;
}
function setValueOption(inputOption, command) {
    var opt = "";
    if (inputOption) {
        opt = ` --${command} ${inputOption}`;
    }
    return opt;
}
function setOption(inputOption) {
    var opt = "";
    if (inputOption) {
        opt = ` ${inputOption}`;
    }
    return opt;
}
function curl(url, outputFile) {
    shell.exec(`curl -sL ${url}`, { silent: true }).to(outputFile);
    shell.chmod(755, outputFile);
    shell.cat(outputFile);
    console.log(`Downloaded '${path.basename(outputFile)}' to ${outputFile}`);
}
