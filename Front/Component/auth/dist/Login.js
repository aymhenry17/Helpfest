"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.updateSearch = function (password) {
            _this.setState({ password: password });
            console.log(password);
        };
        _this.send_Data = function () {
            fetch("http://172.104.156.69:8000/api/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // Authorization: "Bearer " + this.state.tokenlog,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: _this.state.id_log,
                    password: _this.state.password
                })
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                // this.setState({ token: data.token });
                _this.onUserLogged(data.token);
            })["catch"](function (error) {
                console.log('There has beonUserLoggeden a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });
        };
        _this.storeToken = function (tokenValue) { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, async_storage_1["default"].setItem("token", tokenValue)];
                    case 1:
                        _a.sent();
                        this.setState({ tokenAPP: tokenValue });
                        console.log("je suis dans app", this.state.tokenAPP);
                        return [2 /*return*/, tokenValue];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.UpdateToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var value, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, async_storage_1["default"].getItem("token")];
                    case 1:
                        value = _a.sent();
                        if (value !== null) {
                            this.setState({ tokenAPP: value });
                            console.log("getdata", this.state.tokenAPP);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            id_log: "",
            password: "",
            tokenlog: _this.props.token
        };
        // this.send_Data();
        _this.onUserLogged = props.onUserLogged.bind(_this);
        return _this;
    }
    Login.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(react_native_1.Text, null,
                "ok",
                this.state.token),
            react_1["default"].createElement(react_native_1.View, { style: { backgroundColor: "green" } }),
            react_1["default"].createElement(react_native_1.View, { style: styles.top_view }),
            react_1["default"].createElement(react_native_1.View, { style: styles.bottom_view },
                react_1["default"].createElement(react_native_1.Text, { style: { fontSize: 28, color: "black", marginLeft: 30 } }, "Se connecter"),
                react_1["default"].createElement(react_native_1.TextInput, { style: styles.input1, onChangeText: this.Login, value: this.id_log, autoCompleteType: "off", placeholder: "Identifiant tente" }),
                react_1["default"].createElement(react_native_1.TextInput, { style: styles.input2, onChangeText: this.updateSearch, value: this.password, secureTextEntry: true, placeholder: "mot de passe", autoCompleteType: "password" }),
                react_1["default"].createElement(react_native_1.Text, { onPress: function () { return _this.props.navigation.navigate("Register"); }, style: { color: "#E4D6A7", marginLeft: 30, marginTop: 10 } }, "s'inscrire"),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.valid_button, onPress: function () {
                        _this.send_Data();
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: { textAlign: "center", marginTop: 11 } }, "Se connecter")),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.valid_button, onPress: function () { return _this.onUserLogged("fake_token"); } },
                    react_1["default"].createElement(react_native_1.Text, { style: { textAlign: "center", marginTop: 11 } }, "CHEAT Se connecter")))));
    };
    return Login;
}(react_1["default"].Component));
exports["default"] = Login;
var styles = react_native_1.StyleSheet.create({
    top_view: {
        backgroundColor: "white",
        width: "100%",
        height: "40%"
    },
    bottom_view: {
        backgroundColor: "white",
        width: "100%",
        height: "60%"
    },
    input1: {
        alignSelf: "center",
        borderWidth: 1,
        marginTop: 42,
        width: "85%",
        height: 45,
        borderRadius: 5,
        paddingLeft: 30,
        borderColor: "#E4D6A7"
    },
    input2: {
        alignSelf: "center",
        borderWidth: 1,
        marginTop: 15,
        width: "85%",
        height: 45,
        borderRadius: 5,
        paddingLeft: 30,
        borderColor: "#E4D6A7"
    },
    valid_button: {
        alignSelf: "center",
        marginTop: 10,
        width: "85%",
        height: 45,
        borderRadius: 5,
        backgroundColor: "#E4D6A7",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    }
});
