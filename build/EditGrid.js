"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NcGrid = require("./NcGrid");

var _NcGrid2 = _interopRequireDefault(_NcGrid);

var _RenderColumn = require("./RenderColumn");

var _RenderColumn2 = _interopRequireDefault(_RenderColumn);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.clonedeep");

var _lodash4 = _interopRequireDefault(_lodash3);

var _tinperBee = require("tinper-bee");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    onChange: _propTypes2["default"].func, //数据改变回调
    clsfix: _propTypes2["default"].string,
    onOpenChange: _propTypes2["default"].func, //展开收起回调
    title: _propTypes2["default"].string
};

var defaultProps = {
    title: '标题',
    clsfix: 'ac-edit-grid',
    data: [],
    columns: [],
    onChange: function onChange() {},
    onOpenChange: function onOpenChange() {}
};

var EditGrid = function (_Component) {
    _inherits(EditGrid, _Component);

    function EditGrid(props) {
        _classCallCheck(this, EditGrid);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onChange = function (index, key, value) {
            //改变data
            var data = _this.state.data.slice();
            data[index][key] = value;
            _this.setState({
                data: data
            });
            _this.props.onChange(data);
        };

        _this.getSelectedDataFunc = function (selectData) {
            var data = _this.state.data.slice();
            data.forEach(function (item) {
                item._checked = false;
            });
            selectData.forEach(function (item) {
                data[item.index - 1]._checked = !data[item.index - 1]._checked;
            });
            _this.setState({
                selectData: selectData,
                data: data
            });
        };

        _this.open = function () {
            _this.props.onOpenChange(!_this.state.open);
            _this.setState({
                open: !_this.state.open
            });
        };

        _this.addRow = function () {
            var data = _this.state.data.slice();
            var length = data.length;
            var obj = (0, _lodash4["default"])(data[0]);
            for (var attr in obj) {
                if (attr == 'index') {
                    obj.index = length + 1;
                } else if (attr == 'key') {
                    obj.key = "" + (length + 1);
                } else {
                    obj[attr] = '';
                }
            }
            data.push(obj);
            _this.setState({
                data: data
            });
        };

        _this.delRow = function () {
            var _this$state = _this.state,
                selectData = _this$state.selectData,
                data = _this$state.data;

            data.splice(selectData.index - 1, 1);
            _this.setState({
                data: data
            });
            _this.props.onChange(data);
        };

        _this.copyRow = function () {
            _this.setState({
                copying: true
            });
        };

        _this.copyToEnd = function () {
            var _this$state2 = _this.state,
                selectData = _this$state2.selectData,
                data = _this$state2.data;

            selectData.forEach(function (item, index) {
                item.index = data.length + index + 1;
                item.key = data.length + index + 1 + '';
                item._checked = false;
            });
            data = data.concat(selectData);
            _this.setState({
                data: data,
                copying: false
            });
            _this.props.onChange(data);
        };

        _this.cancelCopy = function () {
            _this.setState({
                copying: false
            });
        };

        _this.max = function () {};

        _this.onRowHover = function (index, record) {
            _this.currentIndex = index;
        };

        _this.hoverContent = function () {
            if (_this.state.copying) {
                return _react2["default"].createElement(
                    "span",
                    { onClick: _this.copyToHere, className: "copy-to-here" },
                    "\u7C98\u8D34\u81F3\u6B64\u5904"
                );
            } else {
                return '';
            }
        };

        _this.copyToHere = function () {
            var index = _this.currentIndex;
            var data = _this.state.data.slice();
            var selectData = _this.state.selectData;
            selectData.forEach(function (item, i) {
                item._checked = false;
                item.index = i + index + 1;
                item.key = i + index + 1 + '';
            });
            data.splice.apply(data, [index, 0].concat(_toConsumableArray(selectData)));
            data.forEach(function (item, i) {
                if (item.index != i + 1) {
                    item.index = i + 1;
                    item.key = i + 1 + '';
                }
            });
            _this.setState({
                data: data,
                copying: false
            });

            _this.props.onChange(data);
        };

        _this.state = {
            columns: props.columns,
            data: props.data,
            selectData: [], //选中的数据
            copying: false, //是否正在拷贝
            open: props.open || true
        };
        return _this;
    }

    EditGrid.prototype.componentWillMount = function componentWillMount() {
        var _this2 = this;

        var columns = this.state.columns.slice();
        columns.forEach(function (item) {
            if (item.type) {
                item.render = function (text, record, index) {
                    return _react2["default"].createElement(_RenderColumn2["default"], {
                        type: item.type,
                        index: index,
                        dataIndex: item.dataIndex,
                        value: text,
                        options: item.options,
                        onChange: _this2.onChange
                    });
                };
            }
        });
        this.setState({
            columns: columns
        });

        //给data加index
        var data = this.state.data.slice();
        if (data[0].index == 1) return;
        data.forEach(function (item, index) {
            item.index = index + 1;
        });
        this.setState({
            data: data
        });
    };

    //选中数据的回调


    EditGrid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!(0, _lodash2["default"])(nextProps.data, this.state.data)) {
            this.setState({
                data: data
            });
        }
        if ('open' in nextProps) {
            this.setState({
                open: open
            });
        }
    };

    //打开关闭


    //增行


    //删行

    //复制行

    //粘贴至末行

    //取消复制


    //最大化

    //行hover


    //粘贴至此处按钮

    //粘贴至此处


    // resetIndex=(data)=>{
    //     console.log(this)
    //     console.log('-----',data)
    //     let d = data.slice();
    //     d.forEach((item,i)=>{
    //         if(item.index+1!==i){
    //             item.index=i+1;
    //             item.key=(i+1).toString()
    //         }
    //     })
    //     console.log(d)
    //     return d;
    // }

    EditGrid.prototype.render = function render() {
        var _props = this.props,
            exportData = _props.exportData,
            clsfix = _props.clsfix,
            title = _props.title,
            propsData = _props.data,
            cl = _props.columns,
            otherProps = _objectWithoutProperties(_props, ["exportData", "clsfix", "title", "data", "columns"]);

        var _state = this.state,
            data = _state.data,
            open = _state.open,
            columns = _state.columns,
            copying = _state.copying;

        var _exportData = exportData || data;
        return _react2["default"].createElement(
            "div",
            { className: clsfix },
            _react2["default"].createElement(
                "div",
                { className: clsfix + "-panel " + (open ? '' : 'close') },
                _react2["default"].createElement(
                    "span",
                    { onClick: this.open },
                    _react2["default"].createElement(
                        "span",
                        { className: clsfix + "-panel-icon" },
                        open ? _react2["default"].createElement(_tinperBee.Icon, { type: "uf-triangle-down" }) : _react2["default"].createElement(_tinperBee.Icon, { type: "uf-triangle-right" })
                    ),
                    _react2["default"].createElement(
                        "span",
                        { className: clsfix + "-panel-title" },
                        title
                    )
                ),
                _react2["default"].createElement(
                    "span",
                    { className: clsfix + "-panel-btns" },
                    copying ? _react2["default"].createElement(
                        _tinperBee.ButtonGroup,
                        null,
                        _react2["default"].createElement(
                            _tinperBee.Button,
                            { bordered: true, onClick: this.copyToEnd },
                            "\u7C98\u8D34\u81F3\u672B\u884C"
                        ),
                        _react2["default"].createElement(
                            _tinperBee.Button,
                            { bordered: true, onClick: this.cancelCopy },
                            "\u53D6\u6D88"
                        )
                    ) : _react2["default"].createElement(
                        _tinperBee.ButtonGroup,
                        null,
                        _react2["default"].createElement(
                            _tinperBee.Button,
                            { bordered: true, onClick: this.addRow },
                            "\u589E\u884C"
                        ),
                        _react2["default"].createElement(
                            _tinperBee.Button,
                            { bordered: true, onClick: this.delRow },
                            "\u5220\u884C"
                        ),
                        _react2["default"].createElement(
                            _tinperBee.Button,
                            { bordered: true, onClick: this.copyRow },
                            "\u590D\u5236\u884C"
                        ),
                        _react2["default"].createElement(
                            _tinperBee.Button,
                            { bordered: true, onClick: this.max },
                            _react2["default"].createElement(_tinperBee.Icon, { type: "uf-maxmize" })
                        )
                    )
                )
            ),
            _react2["default"].createElement(
                _tinperBee.Collapse,
                { "in": open },
                _react2["default"].createElement(_NcGrid2["default"], _extends({}, otherProps, {
                    columns: columns,
                    data: data,
                    exportData: _exportData,
                    paginationObj: "none",
                    getSelectedDataFunc: this.getSelectedDataFunc,
                    hoverContent: this.hoverContent,
                    onRowHover: this.onRowHover
                }))
            )
        );
    };

    return EditGrid;
}(_react.Component);

EditGrid.defaultProps = defaultProps;
EditGrid.propTypes = propTypes;
exports["default"] = EditGrid;
module.exports = exports["default"];