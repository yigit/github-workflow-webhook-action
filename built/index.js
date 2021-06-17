"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var github = require("@actions/github");
var axios_1 = require("axios");
function deliver(url, secret, payload) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function () {
        var workflow, repo, ref, sha, workFlowPaylod, GITHUB_RUN_ID, contextUrl, targetWorkflowRun, headSha, sender, refFromTargetWorkflow, repoFromTargetWorkflow, notifyOnFailure, additionalPayload, requestBody, requestConfig, response;
        return __generator(this, function (_j) {
            workflow = github.context.workflow;
            repo = github.context.repo;
            ref = github.context.ref;
            sha = github.context.sha;
            workFlowPaylod = github.context.payload;
            GITHUB_RUN_ID = process.env.GITHUB_RUN_ID;
            contextUrl = null;
            // Log the actual github context for debugging
            core.info("GitHub Context " + JSON.stringify(github.context));
            if (GITHUB_RUN_ID) {
                contextUrl = "https://github.com/" + repo.owner + "/" + repo.repo + "/actions/runs/" + GITHUB_RUN_ID;
                core.info("GitHub Context " + contextUrl);
            }
            targetWorkflowRun = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.workflow_run;
            core.info("Target workflow run: " + JSON.stringify(targetWorkflowRun));
            headSha = (_d = (_c = (_b = (_a = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.pull_request) === null || _a === void 0 ? void 0 : _a.head) === null || _b === void 0 ? void 0 : _b.sha) !== null && _c !== void 0 ? _c : targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_sha) !== null && _d !== void 0 ? _d : sha;
            sender = (_e = workFlowPaylod === null || workFlowPaylod === void 0 ? void 0 : workFlowPaylod.sender) === null || _e === void 0 ? void 0 : _e.login;
            refFromTargetWorkflow = null;
            if (targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_branch) {
                refFromTargetWorkflow = "refs/heads/" + targetWorkflowRun.head_branch;
            }
            repoFromTargetWorkflow = null;
            if (((_g = (_f = targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_repository) === null || _f === void 0 ? void 0 : _f.owner) === null || _g === void 0 ? void 0 : _g.login) && ((_h = targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_repository) === null || _h === void 0 ? void 0 : _h.name)) {
                repoFromTargetWorkflow = {
                    "owner": targetWorkflowRun.head_repository.owner.login,
                    "repo": targetWorkflowRun.head_repository.name
                };
            }
            core.info("ref from workflow target: " + refFromTargetWorkflow);
            notifyOnFailure = sender === 'copybara-service[bot]';
            additionalPayload = JSON.parse(payload);
            requestBody = __assign({ 'workflow': workflow, 'repo': repoFromTargetWorkflow !== null && repoFromTargetWorkflow !== void 0 ? repoFromTargetWorkflow : repo, 'ref': refFromTargetWorkflow !== null && refFromTargetWorkflow !== void 0 ? refFromTargetWorkflow : ref, 'sha': headSha, 'notifyOnFailure': notifyOnFailure }, additionalPayload);
            if (contextUrl) {
                requestBody['pullRequestUrl'] = contextUrl;
            }
            core.info("Delivering " + JSON.stringify(requestBody) + " to " + url);
            requestConfig = {
                url: url,
                method: 'POST',
                data: requestBody
            };
            if (secret) {
                requestConfig['headers'] = {
                    'X-GitHub-Secret': "" + secret
                };
            }
            response = axios_1.default(requestConfig);
            return [2 /*return*/, response];
        });
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var url, secret, payload, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    url = core.getInput('url');
                    secret = core.getInput('secret');
                    payload = core.getInput('payload');
                    core.info("Making a HTTP POST request to " + url);
                    return [4 /*yield*/, deliver(url, secret, payload)];
                case 1:
                    result = _a.sent();
                    core.info("Result " + result.status + ": " + result.statusText);
                    core.setOutput('status', result.status);
                    core.setOutput('statusText', result.statusText);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    core.setFailed("Unable to deliver Web Hook " + error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFDM0MsK0JBQWdFO0FBT2hFLFNBQWUsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFjLEVBQUUsT0FBZTs7Ozs7WUFDM0QsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ25DLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQixHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDekIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3pCLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN0QyxhQUFhLEdBQUssT0FBTyxDQUFDLEdBQUcsY0FBaEIsQ0FBaUI7WUFDbEMsVUFBVSxHQUFrQixJQUFJLENBQUM7WUFFckMsOENBQThDO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQWtCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUM7WUFFOUQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLFVBQVUsR0FBRyx3QkFBc0IsSUFBSSxDQUFDLEtBQUssU0FBSSxJQUFJLENBQUMsSUFBSSxzQkFBaUIsYUFBZSxDQUFDO2dCQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFrQixVQUFZLENBQUMsQ0FBQzthQUMzQztZQUVLLGlCQUFpQixHQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxZQUFZLENBQUE7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFB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QUssTUFBTSxDQUFDLFVBQVksQ0FBQyxDQUFDO29CQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztvQkFFaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQ0FBOEIsT0FBTyxDQUFDLENBQUM7Ozs7OztDQUV6RCxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5pbXBvcnQgY29yZSA9IHJlcXVpcmUoJ0BhY3Rpb25zL2NvcmUnKTtcbmltcG9ydCBnaXRodWIgPSByZXF1aXJlKCdAYWN0aW9ucy9naXRodWInKTtcbmltcG9ydCBheGlvcywgeyBBeGlvc1Byb21pc2UsIEF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gJ2F4aW9zJztcblxuaW50ZXJmYWNlIFJlcG8ge1xuICByZXBvOiBzdHJpbmc7XG4gIG93bmVyOiBzdHJpbmc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGl2ZXIodXJsOiBzdHJpbmcsIHNlY3JldDogc3RyaW5nLCBwYXlsb2FkOiBzdHJpbmcpOiBQcm9taXNlPEF4aW9zUHJvbWlzZTx7fT4+IHtcbiAgY29uc3Qgd29ya2Zsb3cgPSBnaXRodWIuY29udGV4dC53b3JrZmxvdztcbiAgY29uc3QgcmVwbyA9IGdpdGh1Yi5jb250ZXh0LnJlcG87XG4gIGNvbnN0IHJlZiA9IGdpdGh1Yi5jb250ZXh0LnJlZjtcbiAgY29uc3Qgc2hhID0gZ2l0aHViLmNvbnRleHQuc2hhO1xuICBjb25zdCB3b3JrRmxvd1BheWxvZCA9IGdpdGh1Yi5jb250ZXh0LnBheWxvYWQ7XG4gIGNvbnN0IHsgR0lUSFVCX1JVTl9JRCB9ID0gcHJvY2Vzcy5lbnY7XG4gIGxldCBjb250ZXh0VXJsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvLyBMb2cgdGhlIGFjdHVhbCBnaXRodWIgY29udGV4dCBmb3IgZGVidWdnaW5nXG4gIGNvcmUuaW5mbyhgR2l0SHViIENvbnRleHQgJHtKU09OLnN0cmluZ2lmeShnaXRodWIuY29udGV4dCl9YCk7XG5cbiAgaWYgKEdJVEhVQl9SVU5fSUQpIHtcbiAgICBjb250ZXh0VXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS8ke3JlcG8ub3duZXJ9LyR7cmVwby5yZXBvfS9hY3Rpb25zL3J1bnMvJHtHSVRIVUJfUlVOX0lEfWA7XG4gICAgY29yZS5pbmZvKGBHaXRIdWIgQ29udGV4dCAke2NvbnRleHRVcmx9YCk7XG4gIH1cbiAgLy8gSWYgdGhpcyB3b3JrZmxvdyBpcyB0cmlnZ2VyZWQgYnkgYW5vdGhlciB3b3JrZmxvdywgdXNlIHRoYXQgcnVuJ3MgcGFyYW1ldGVyc1xuICBjb25zdCB0YXJnZXRXb3JrZmxvd1J1biA9IHdvcmtGbG93UGF5bG9kPy53b3JrZmxvd19ydW5cbiAgY29yZS5pbmZvKGBUYXJnZXQgd29ya2Zsb3cgcnVuOiAke0pTT04uc3RyaW5naWZ5KHRhcmdldFdvcmtmbG93UnVuKX1gKVxuICBjb25zdCBoZWFkU2hhID0gd29ya0Zsb3dQYXlsb2Q/LnB1bGxfcmVxdWVzdD8uaGVhZD8uc2hhID8/IHRhcmdldFdvcmtmbG93UnVuPy5oZWFkX3NoYSA/PyBzaGE7XG4gIGNvbnN0IHNlbmRlciA9IHdvcmtGbG93UGF5bG9kPy5zZW5kZXI/LmxvZ2luO1xuICBsZXQgcmVmRnJvbVRhcmdldFdvcmtmbG93OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgaWYgKHRhcmdldFdvcmtmbG93UnVuPy5oZWFkX2JyYW5jaCkge1xuICAgIHJlZkZyb21UYXJnZXRXb3JrZmxvdyA9IGByZWZzL2hlYWRzLyR7dGFyZ2V0V29ya2Zsb3dSdW4uaGVhZF9icmFuY2h9YFxuICB9XG5cbiAgbGV0IHJlcG9Gcm9tVGFyZ2V0V29ya2Zsb3c6IFJlcG8gfCBudWxsID0gbnVsbDtcbiAgaWYgKHRhcmdldFdvcmtmbG93UnVuPy5oZWFkX3JlcG9zaXRvcnk/Lm93bmVyPy5sb2dpbiAmJlxuICAgIHRhcmdldFdvcmtmbG93UnVuPy5oZWFkX3JlcG9zaXRvcnk/Lm5hbWUpIHtcbiAgICByZXBvRnJvbVRhcmdldFdvcmtmbG93ID0ge1xuICAgICAgXCJvd25lclwiOiB0YXJnZXRXb3JrZmxvd1J1bi5oZWFkX3JlcG9zaXRvcnkub3duZXIubG9naW4sXG4gICAgICBcInJlcG9cIjogdGFyZ2V0V29ya2Zsb3dSdW4uaGVhZF9yZXBvc2l0b3J5Lm5hbWVcbiAgICB9XG4gIH1cbiAgY29yZS5pbmZvKGByZWYgZnJvbSB3b3JrZmxvdyB0YXJnZXQ6ICR7cmVmRnJvbVRhcmdldFdvcmtmbG93fWApXG4gIC8vIE5vdGlmeSBidWlsZCBmYWlsdXJlcyBpZiBpdHMgY29weWJhcmEtYm90IG1lcmdpbmcgdGhlIGNoYW5nZXMuXG4gIGNvbnN0IG5vdGlmeU9uRmFpbHVyZSA9IHNlbmRlciA9PT0gJ2NvcHliYXJhLXNlcnZpY2VbYm90XSc7XG5cbiAgY29uc3QgYWRkaXRpb25hbFBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuICBjb25zdCByZXF1ZXN0Qm9keSA9IHtcbiAgICAnd29ya2Zsb3cnOiB3b3JrZmxvdyxcbiAgICAncmVwbyc6IHJlcG9Gcm9tVGFyZ2V0V29ya2Zsb3cgPz8gcmVwbyxcbiAgICAncmVmJzogcmVmRnJvbVRhcmdldFdvcmtmbG93ID8/IHJlZixcbiAgICAnc2hhJzogaGVhZFNoYSxcbiAgICAnbm90aWZ5T25GYWlsdXJlJzogbm90aWZ5T25GYWlsdXJlLFxuICAgIC4uLmFkZGl0aW9uYWxQYXlsb2FkXG4gIH07XG5cbiAgaWYgKGNvbnRleHRVcmwpIHtcbiAgICByZXF1ZXN0Qm9keVsncHVsbFJlcXVlc3RVcmwnXSA9IGNvbnRleHRVcmw7XG4gIH1cblxuICBjb3JlLmluZm8oYERlbGl2ZXJpbmcgJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSl9IHRvICR7dXJsfWApO1xuXG4gIGNvbnN0IHJlcXVlc3RDb25maWc6IEF4aW9zUmVxdWVzdENvbmZpZyA9IHtcbiAgICB1cmw6IHVybCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBkYXRhOiByZXF1ZXN0Qm9keVxuICB9O1xuICBpZiAoc2VjcmV0KSB7XG4gICAgcmVxdWVzdENvbmZpZ1snaGVhZGVycyddID0ge1xuICAgICAgJ1gtR2l0SHViLVNlY3JldCc6IGAke3NlY3JldH1gXG4gICAgfVxuICB9XG4gIGNvbnN0IHJlc3BvbnNlID0gYXhpb3MocmVxdWVzdENvbmZpZyk7XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1cmwgPSBjb3JlLmdldElucHV0KCd1cmwnKTtcbiAgICBjb25zdCBzZWNyZXQgPSBjb3JlLmdldElucHV0KCdzZWNyZXQnKTtcbiAgICBjb25zdCBwYXlsb2FkID0gY29yZS5nZXRJbnB1dCgncGF5bG9hZCcpO1xuICAgIGNvcmUuaW5mbyhgTWFraW5nIGEgSFRUUCBQT1NUIHJlcXVlc3QgdG8gJHt1cmx9YCk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVsaXZlcih1cmwsIHNlY3JldCwgcGF5bG9hZCk7XG4gICAgY29yZS5pbmZvKGBSZXN1bHQgJHtyZXN1bHQuc3RhdHVzfTogJHtyZXN1bHQuc3RhdHVzVGV4dH1gKTtcbiAgICBjb3JlLnNldE91dHB1dCgnc3RhdHVzJywgcmVzdWx0LnN0YXR1cyk7XG4gICAgY29yZS5zZXRPdXRwdXQoJ3N0YXR1c1RleHQnLCByZXN1bHQuc3RhdHVzVGV4dCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29yZS5zZXRGYWlsZWQoYFVuYWJsZSB0byBkZWxpdmVyIFdlYiBIb29rICR7ZXJyb3J9YCk7XG4gIH1cbn0pKCk7XG4iXX0=