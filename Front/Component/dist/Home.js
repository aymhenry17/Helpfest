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
var react_native_qrcode_svg_1 = require("react-native-qrcode-svg");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            search: "",
            point: 0,
            array_of_product: [],
            modalVisible: false,
            username: "t",
            usertable: []
        };
        _this.getToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, async_storage_1["default"].getItem("username")];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.setState({ username: result })];
                    case 2:
                        _a.sent();
                        console.log("je recup de la data bg ", this.state.username);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.updateSearch = function (search) { return __awaiter(_this, void 0, void 0, function () {
            var response, json, array_of_product, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ search: search });
                        console.log(search);
                        console.log(this.state.array_of_product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("http://172.104.156.69:8000/api/product")];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        json = _a.sent();
                        array_of_product = json;
                        this.setState({ array_of_product: array_of_product });
                        console.log(this.state.array_of_product);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.SchowProduct = function () {
            console.log("array of product = " + _this.state.array_of_product.length);
            console.log("i");
            return _this.state.array_of_product.map(function (product) {
                return (react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () {
                        _this.props.navigation.navigate("Product", { id: product.id });
                    } },
                    react_1["default"].createElement(react_native_1.View, { style: styles.card },
                        react_1["default"].createElement(react_native_1.Image, { style: {
                                width: 120,
                                height: 120,
                                alignSelf: "center",
                                marginTop: 7,
                                zIndex: 2,
                                borderRadius: 12
                            }, 
                            // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
                            source: { uri: product.image } }),
                        react_1["default"].createElement(react_native_1.View, { style: { justifyContent: "space-between", flexDirection: "row" } },
                            react_1["default"].createElement(react_native_1.Text, { style: { marginLeft: 17, fontSize: 15 } }, product.name),
                            react_1["default"].createElement(react_native_1.Text, { style: { marginRight: 17, fontSize: 12 } },
                                product.price,
                                "\u20AC")))));
            });
        };
        return _this;
    }
    Home.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, array_of_product, error_2, response, usertable, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://172.104.156.69:8000/api/product")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        array_of_product = _a.sent();
                        this.setState({ array_of_product: array_of_product });
                        console.log(this.state.array_of_product, "az");
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 4];
                    case 4:
                        this.getToken();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, fetch("http://172.104.156.69:8000/api/infoUser/" + this.state.username)];
                    case 6:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 7:
                        usertable = _a.sent();
                        this.setState({ usertable: usertable });
                        console.log(this.state.usertable, "az");
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _a.sent();
                        console.error(error_3);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.render = function () {
        var _this = this;
        var _a = this.state, search = _a.search, modalVisible = _a.modalVisible;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: "row" } },
                react_1["default"].createElement(react_native_1.TextInput, { style: styles.searchbar, placeholder: "rechercher", onChangeText: this.updateSearch, value: search }),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () {
                        _this.setState({ modalVisible: true });
                    }, style: styles.qr_button },
                    react_1["default"].createElement(react_native_1.Image, { style: {
                            width: 29,
                            height: 29,
                            alignSelf: "center",
                            alignItems: "center",
                            marginTop: 5,
                            zIndex: 2
                        }, source: require("../assets/g1173.png") }))),
            react_1["default"].createElement(react_native_1.View, { style: styles.show_coin },
                react_1["default"].createElement(react_native_1.Text, { style: { color: "white", fontSize: 23 } },
                    "Vous avez ",
                    this.state.usertable["coin"]),
                react_1["default"].createElement(react_native_1.Image, { style: { height: 40, width: 40, zIndex: 2 }, source: require("../assets/ruby.png") })),
            react_1["default"].createElement(react_native_1.Image, { style: {
                    width: 300,
                    height: 100,
                    zIndex: 2,
                    alignSelf: "center",
                    marginTop: 20
                }, source: require("../assets/treasure.png") }),
            react_1["default"].createElement(react_native_1.View, { style: styles.circle }),
            react_1["default"].createElement(react_native_1.Modal, { transparent: true, visible: this.state.modalVisible },
                react_1["default"].createElement(react_native_1.View, { style: {
                        backgroundColor: "white",
                        width: 250,
                        height: 260,
                        alignSelf: "center",
                        marginTop: 200,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "black"
                    } },
                    react_1["default"].createElement(react_native_1.View, { style: { alignSelf: "center", marginTop: 72 } },
                        react_1["default"].createElement(react_native_qrcode_svg_1["default"], { value: "le qrcode c une id\u00E9e de merde" }),
                        react_1["default"].createElement(react_native_1.Button, { title: "fermer", onPress: function () {
                                _this.SchowProduct();
                                _this.setState({ modalVisible: false });
                            } }),
                        react_1["default"].createElement(react_native_1.Text, null, modalVisible)))),
            react_1["default"].createElement(react_native_1.ScrollView, null,
                react_1["default"].createElement(react_native_1.View, { style: { flexWrap: "wrap", flexDirection: "row", flex: 1 } }, this.SchowProduct()))));
    };
    return Home;
}(react_1["default"].Component));
exports["default"] = Home;
var styles = react_native_1.StyleSheet.create({
    ok: {
        width: 200
    },
    circle: {
        marginTop: -647,
        alignSelf: "center",
        backgroundColor: "black",
        width: 500,
        height: "100%",
        borderRadius: 500,
        zIndex: 0
    },
    searchbar: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        height: 43,
        textAlign: "left",
        paddingLeft: 30,
        width: 220,
        zIndex: 2,
        backgroundColor: "white",
        marginTop: 50,
        marginLeft: 20
    },
    card: {
        backgroundColor: "white",
        height: 200,
        width: 152,
        marginLeft: 20,
        borderRadius: 17,
        marginTop: 22,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    qr_button: {
        backgroundColor: "black",
        zIndex: 2,
        width: 42,
        height: 42,
        marginTop: 50,
        marginLeft: 30,
        borderRadius: 10
    },
    category: {
        flexDirection: "row"
    },
    category_p: {
        zIndex: 2,
        height: 75,
        width: 70,
        borderRadius: 15,
        backgroundColor: "white",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 17,
        borderWidth: 1
    },
    show_coin: {
        alignSelf: "center",
        alignItems: "center",
        zIndex: 2,
        flexDirection: "row"
    }
});
