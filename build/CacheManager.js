"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WeatherRequest_1 = require("./WeatherRequest");
var keys = __importStar(require("./keys.json"));
var CacheManager = /** @class */ (function () {
    function CacheManager() {
    }
    CacheManager.validateLocation = function (location) {
        return !(isNaN(location.longitude) || isNaN(location.latitude));
    };
    CacheManager.newRequest = function (location) {
        var newRequestOptions = {
            location: location,
        };
        var newWeatherRequest = new WeatherRequest_1.WeatherRequest(newRequestOptions);
        CacheManager.requests.push(newWeatherRequest);
        return newWeatherRequest.getData(CacheManager.keys[0]);
    };
    CacheManager.response = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var distances, lowestNumber, lowestIndex, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!CacheManager.validateLocation(location)) {
                            return [2 /*return*/, {
                                    error: 400,
                                    message: 'Location not valid.'
                                }];
                        }
                        if (!(CacheManager.requests.length < 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, CacheManager.newRequest(location)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        distances = Array();
                        CacheManager.requests.forEach(function (request) {
                            distances.push(request.location.getDistance(location));
                        });
                        lowestNumber = distances[0];
                        lowestIndex = 0;
                        for (i = 0; i < distances.length; i++) {
                            if (distances[i] < lowestNumber) {
                                lowestNumber = distances[i];
                                lowestIndex = i;
                            }
                        }
                        if (!(lowestNumber <= CacheManager.acceptableRaidius)) return [3 /*break*/, 4];
                        return [4 /*yield*/, CacheManager.requests[lowestIndex].getData(CacheManager.keys[0])];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [4 /*yield*/, CacheManager.newRequest(location)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CacheManager.requests = Array();
    CacheManager.acceptableRaidius = 1; // degree
    CacheManager.keys = keys['keys'];
    return CacheManager;
}());
exports.default = CacheManager;
