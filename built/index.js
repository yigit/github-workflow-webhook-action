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
        var workflow, repo, ref, sha, workFlowPaylod, GITHUB_RUN_ID, contextUrl, targetWorkflowRun, headSha, sender, additionalContextInfo, refFromTargetWorkflow, repoFromTargetWorkflow, notifyOnFailure, additionalPayload, requestBody, requestConfig, response;
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
            additionalContextInfo = null;
            refFromTargetWorkflow = null;
            if (targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_branch) {
                refFromTargetWorkflow = "refs/heads/" + targetWorkflowRun.head_branch;
            }
            if ((targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.name) && (targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.html_url)) {
                additionalContextInfo = "This workflow was triggered by \"" + targetWorkflowRun.name + "\" (" + targetWorkflowRun.html_url + ")";
            }
            core.info("ref from workflow target: " + refFromTargetWorkflow);
            repoFromTargetWorkflow = null;
            if (((_g = (_f = targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_repository) === null || _f === void 0 ? void 0 : _f.owner) === null || _g === void 0 ? void 0 : _g.login) && ((_h = targetWorkflowRun === null || targetWorkflowRun === void 0 ? void 0 : targetWorkflowRun.head_repository) === null || _h === void 0 ? void 0 : _h.name)) {
                repoFromTargetWorkflow = {
                    "owner": targetWorkflowRun.head_repository.owner.login,
                    "repo": targetWorkflowRun.head_repository.name
                };
            }
            core.info("repo from workflow target: " + JSON.stringify(repoFromTargetWorkflow));
            notifyOnFailure = sender === 'copybara-service[bot]';
            additionalPayload = JSON.parse(payload);
            requestBody = __assign({ 'workflow': workflow, 'repo': repoFromTargetWorkflow !== null && repoFromTargetWorkflow !== void 0 ? repoFromTargetWorkflow : repo, 'ref': refFromTargetWorkflow !== null && refFromTargetWorkflow !== void 0 ? refFromTargetWorkflow : ref, 'sha': headSha, 'notifyOnFailure': notifyOnFailure, 'additionalContextInfo': additionalContextInfo }, additionalPayload);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFDM0MsK0JBQWdFO0FBT2hFLFNBQWUsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFjLEVBQUUsT0FBZTs7Ozs7WUFDM0QsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ25DLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQixHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDekIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3pCLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN0QyxhQUFhLEdBQUssT0FBTyxDQUFDLEdBQUcsY0FBaEIsQ0FBaUI7WUFDbEMsVUFBVSxHQUFrQixJQUFJLENBQUM7WUFFckMsOENBQThDO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQWtCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUM7WUFFOUQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLFVBQVUsR0FBRyx3QkFBc0IsSUFBSSxDQUFDLEtBQUssU0FBSSxJQUFJLENBQUMsSUFBSSxzQkFBaUIsYUFBZSxDQUFDO2dCQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFrQixVQUFZLENBQUMsQ0FBQzthQUMzQztZQUVLLGlCQUFpQixHQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxZQUFZLENBQUE7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFB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QUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2pDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLG1DQUFpQyxHQUFLLENBQUMsQ0FBQztvQkFDbkMscUJBQU0sT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUE1QyxNQUFNLEdBQUcsU0FBbUM7b0JBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBVSxNQUFNLENBQUMsTUFBTSxVQUFLLE1BQU0sQ0FBQyxVQUFZLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7b0JBRWhELElBQUksQ0FBQyxTQUFTLENBQUMsZ0NBQThCLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7Q0FFekQsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgPSByZXF1aXJlKCdmcycpO1xuaW1wb3J0IGNvcmUgPSByZXF1aXJlKCdAYWN0aW9ucy9jb3JlJyk7XG5pbXBvcnQgZ2l0aHViID0gcmVxdWlyZSgnQGFjdGlvbnMvZ2l0aHViJyk7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NQcm9taXNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICdheGlvcyc7XG5cbmludGVyZmFjZSBSZXBvIHtcbiAgcmVwbzogc3RyaW5nO1xuICBvd25lcjogc3RyaW5nO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWxpdmVyKHVybDogc3RyaW5nLCBzZWNyZXQ6IHN0cmluZywgcGF5bG9hZDogc3RyaW5nKTogUHJvbWlzZTxBeGlvc1Byb21pc2U8e30+PiB7XG4gIGNvbnN0IHdvcmtmbG93ID0gZ2l0aHViLmNvbnRleHQud29ya2Zsb3c7XG4gIGNvbnN0IHJlcG8gPSBnaXRodWIuY29udGV4dC5yZXBvO1xuICBjb25zdCByZWYgPSBnaXRodWIuY29udGV4dC5yZWY7XG4gIGNvbnN0IHNoYSA9IGdpdGh1Yi5jb250ZXh0LnNoYTtcbiAgY29uc3Qgd29ya0Zsb3dQYXlsb2QgPSBnaXRodWIuY29udGV4dC5wYXlsb2FkO1xuICBjb25zdCB7IEdJVEhVQl9SVU5fSUQgfSA9IHByb2Nlc3MuZW52O1xuICBsZXQgY29udGV4dFVybDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLy8gTG9nIHRoZSBhY3R1YWwgZ2l0aHViIGNvbnRleHQgZm9yIGRlYnVnZ2luZ1xuICBjb3JlLmluZm8oYEdpdEh1YiBDb250ZXh0ICR7SlNPTi5zdHJpbmdpZnkoZ2l0aHViLmNvbnRleHQpfWApO1xuXG4gIGlmIChHSVRIVUJfUlVOX0lEKSB7XG4gICAgY29udGV4dFVybCA9IGBodHRwczovL2dpdGh1Yi5jb20vJHtyZXBvLm93bmVyfS8ke3JlcG8ucmVwb30vYWN0aW9ucy9ydW5zLyR7R0lUSFVCX1JVTl9JRH1gO1xuICAgIGNvcmUuaW5mbyhgR2l0SHViIENvbnRleHQgJHtjb250ZXh0VXJsfWApO1xuICB9XG4gIC8vIElmIHRoaXMgd29ya2Zsb3cgaXMgdHJpZ2dlcmVkIGJ5IGFub3RoZXIgd29ya2Zsb3csIHVzZSB0aGF0IHJ1bidzIHBhcmFtZXRlcnNcbiAgY29uc3QgdGFyZ2V0V29ya2Zsb3dSdW4gPSB3b3JrRmxvd1BheWxvZD8ud29ya2Zsb3dfcnVuXG4gIGNvcmUuaW5mbyhgVGFyZ2V0IHdvcmtmbG93IHJ1bjogJHtKU09OLnN0cmluZ2lmeSh0YXJnZXRXb3JrZmxvd1J1bil9YClcbiAgY29uc3QgaGVhZFNoYSA9IHdvcmtGbG93UGF5bG9kPy5wdWxsX3JlcXVlc3Q/LmhlYWQ/LnNoYSA/PyB0YXJnZXRXb3JrZmxvd1J1bj8uaGVhZF9zaGEgPz8gc2hhO1xuICBjb25zdCBzZW5kZXIgPSB3b3JrRmxvd1BheWxvZD8uc2VuZGVyPy5sb2dpbjtcbiAgbGV0IGFkZGl0aW9uYWxDb250ZXh0SW5mbzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGxldCByZWZGcm9tVGFyZ2V0V29ya2Zsb3c6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAodGFyZ2V0V29ya2Zsb3dSdW4/LmhlYWRfYnJhbmNoKSB7XG4gICAgcmVmRnJvbVRhcmdldFdvcmtmbG93ID0gYHJlZnMvaGVhZHMvJHt0YXJnZXRXb3JrZmxvd1J1bi5oZWFkX2JyYW5jaH1gXG4gIH1cbiAgaWYgKHRhcmdldFdvcmtmbG93UnVuPy5uYW1lICYmIHRhcmdldFdvcmtmbG93UnVuPy5odG1sX3VybCkge1xuICAgIGFkZGl0aW9uYWxDb250ZXh0SW5mbyA9IGBUaGlzIHdvcmtmbG93IHdhcyB0cmlnZ2VyZWQgYnkgXCIke3RhcmdldFdvcmtmbG93UnVuLm5hbWV9XCIgKCR7dGFyZ2V0V29ya2Zsb3dSdW4uaHRtbF91cmx9KWBcbiAgfVxuICBjb3JlLmluZm8oYHJlZiBmcm9tIHdvcmtmbG93IHRhcmdldDogJHtyZWZGcm9tVGFyZ2V0V29ya2Zsb3d9YClcblxuICBsZXQgcmVwb0Zyb21UYXJnZXRXb3JrZmxvdzogUmVwbyB8IG51bGwgPSBudWxsO1xuICBpZiAodGFyZ2V0V29ya2Zsb3dSdW4/LmhlYWRfcmVwb3NpdG9yeT8ub3duZXI/LmxvZ2luICYmXG4gICAgdGFyZ2V0V29ya2Zsb3dSdW4/LmhlYWRfcmVwb3NpdG9yeT8ubmFtZSkge1xuICAgIHJlcG9Gcm9tVGFyZ2V0V29ya2Zsb3cgPSB7XG4gICAgICBcIm93bmVyXCI6IHRhcmdldFdvcmtmbG93UnVuLmhlYWRfcmVwb3NpdG9yeS5vd25lci5sb2dpbixcbiAgICAgIFwicmVwb1wiOiB0YXJnZXRXb3JrZmxvd1J1bi5oZWFkX3JlcG9zaXRvcnkubmFtZVxuICAgIH1cbiAgfVxuICBjb3JlLmluZm8oYHJlcG8gZnJvbSB3b3JrZmxvdyB0YXJnZXQ6ICR7SlNPTi5zdHJpbmdpZnkocmVwb0Zyb21UYXJnZXRXb3JrZmxvdyl9YClcbiAgLy8gTm90aWZ5IGJ1aWxkIGZhaWx1cmVzIGlmIGl0cyBjb3B5YmFyYS1ib3QgbWVyZ2luZyB0aGUgY2hhbmdlcy5cbiAgY29uc3Qgbm90aWZ5T25GYWlsdXJlID0gc2VuZGVyID09PSAnY29weWJhcmEtc2VydmljZVtib3RdJztcblxuICBjb25zdCBhZGRpdGlvbmFsUGF5bG9hZCA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG4gIGNvbnN0IHJlcXVlc3RCb2R5ID0ge1xuICAgICd3b3JrZmxvdyc6IHdvcmtmbG93LFxuICAgICdyZXBvJzogcmVwb0Zyb21UYXJnZXRXb3JrZmxvdyA/PyByZXBvLFxuICAgICdyZWYnOiByZWZGcm9tVGFyZ2V0V29ya2Zsb3cgPz8gcmVmLFxuICAgICdzaGEnOiBoZWFkU2hhLFxuICAgICdub3RpZnlPbkZhaWx1cmUnOiBub3RpZnlPbkZhaWx1cmUsXG4gICAgJ2FkZGl0aW9uYWxDb250ZXh0SW5mbyc6IGFkZGl0aW9uYWxDb250ZXh0SW5mbyxcbiAgICAuLi5hZGRpdGlvbmFsUGF5bG9hZFxuICB9O1xuXG4gIGlmIChjb250ZXh0VXJsKSB7XG4gICAgcmVxdWVzdEJvZHlbJ3B1bGxSZXF1ZXN0VXJsJ10gPSBjb250ZXh0VXJsO1xuICB9XG5cbiAgY29yZS5pbmZvKGBEZWxpdmVyaW5nICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpfSB0byAke3VybH1gKTtcblxuICBjb25zdCByZXF1ZXN0Q29uZmlnOiBBeGlvc1JlcXVlc3RDb25maWcgPSB7XG4gICAgdXJsOiB1cmwsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgZGF0YTogcmVxdWVzdEJvZHlcbiAgfTtcbiAgaWYgKHNlY3JldCkge1xuICAgIHJlcXVlc3RDb25maWdbJ2hlYWRlcnMnXSA9IHtcbiAgICAgICdYLUdpdEh1Yi1TZWNyZXQnOiBgJHtzZWNyZXR9YFxuICAgIH1cbiAgfVxuICBjb25zdCByZXNwb25zZSA9IGF4aW9zKHJlcXVlc3RDb25maWcpO1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gY29yZS5nZXRJbnB1dCgndXJsJyk7XG4gICAgY29uc3Qgc2VjcmV0ID0gY29yZS5nZXRJbnB1dCgnc2VjcmV0Jyk7XG4gICAgY29uc3QgcGF5bG9hZCA9IGNvcmUuZ2V0SW5wdXQoJ3BheWxvYWQnKTtcbiAgICBjb3JlLmluZm8oYE1ha2luZyBhIEhUVFAgUE9TVCByZXF1ZXN0IHRvICR7dXJsfWApO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRlbGl2ZXIodXJsLCBzZWNyZXQsIHBheWxvYWQpO1xuICAgIGNvcmUuaW5mbyhgUmVzdWx0ICR7cmVzdWx0LnN0YXR1c306ICR7cmVzdWx0LnN0YXR1c1RleHR9YCk7XG4gICAgY29yZS5zZXRPdXRwdXQoJ3N0YXR1cycsIHJlc3VsdC5zdGF0dXMpO1xuICAgIGNvcmUuc2V0T3V0cHV0KCdzdGF0dXNUZXh0JywgcmVzdWx0LnN0YXR1c1RleHQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvcmUuc2V0RmFpbGVkKGBVbmFibGUgdG8gZGVsaXZlciBXZWIgSG9vayAke2Vycm9yfWApO1xuICB9XG59KSgpO1xuIl19