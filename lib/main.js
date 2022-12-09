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
const build_1 = require("./build");
const dryrun = "false";
const dir = "";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const buildall = core.getInput("all", { required: false });
            const clean = core.getInput("clean", { required: false });
            const cleanfiles = core.getInput("clean-files", { required: false });
            const include = core.getInput("include", { required: false });
            const notest = core.getInput("no-test", { required: false });
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
            yield build_1.build(dryrun, dir, buildall, clean, cleanfiles, include, notest, scalaversion, clonehome, local, branch, proxy, publishm2, sbtversion, verbose, trace, project);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
