(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.sanUpdateFP = global.sanUpdateFP || {})));
}(this, (function (exports) {

/**
 * san-update
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file utility module
 * @author otakustay
 */

var clone = function clone(target) {
    var result = {};
    /* eslint-disable guard-for-in */
    for (var key in target) {
        result[key] = target[key];
    }
    /* eslint-enable guard-for-in */

    return result;
};

var find = function find(array, fn) {
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (fn(item)) {
            return item;
        }
    }

    return undefined;
};

var notEmpty = function notEmpty(o) {
    if (!o) {
        return false;
    }

    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            return true;
        }
    }

    return false;
};

var indexOf = function indexOf(array, o) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === o) {
            return i;
        }
    }

    return -1;
};

var diffObject = function diffObject(type, oldValue, newValue) {
    return {
        $change: type,
        oldValue: oldValue,
        newValue: newValue
    };
};

var arrayDiffObject = function arrayDiffObject(oldValue, newValue, spliceIndex, deleteCount, insertions) {
    return {
        $change: 'change',
        oldValue: oldValue,
        newValue: newValue,
        splice: {
            index: spliceIndex,
            deleteCount: deleteCount,
            insertions: insertions
        }
    };
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();











var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * san-update
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file all available commands
 * @author otakustay
 */

/**
 * @private
 *
 * 当指令返回这个对象的时候，说明要把这个属性移除
 */
var OMIT_THIS_PROPERTY = {};

/**
 * @private
 */
var availableCommands = {
    $set: function $set(container, propertyName, newValue) {
        var oldValue = container[propertyName];
        if (newValue === oldValue) {
            return [newValue, null];
        }

        return [newValue, diffObject(container.hasOwnProperty(propertyName) ? 'change' : 'add', oldValue, newValue)];
    },
    $push: function $push(container, propertyName, item) {
        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $push command on non array object is forbidden.');
        }

        var newValue = array.concat([item]);
        return [newValue, arrayDiffObject(array, newValue, array.length, 0, [item])];
    },
    $unshift: function $unshift(container, propertyName, item) {
        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $unshift command on non array object is forbidden.');
        }

        var newValue = [item].concat(array);
        return [newValue, arrayDiffObject(array, newValue, 0, 0, [item])];
    },
    $pop: function $pop(container, propertyName, assert) {
        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $pop command on non array object is forbidden.');
        }

        if (array.length && (assert === true || typeof assert === 'function' && assert(array))) {
            var newValue = array.slice(0, -1);
            return [newValue, arrayDiffObject(array, newValue, array.length, 1, [])];
        }

        return [array, null];
    },
    $shift: function $shift(container, propertyName, assert) {
        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $shift command on non array object is forbidden.');
        }

        if (array.length && (assert === true || typeof assert === 'function' && assert(array))) {
            var newValue = array.slice(1);
            return [newValue, arrayDiffObject(array, newValue, array.length, 1, [])];
        }

        return [array, null];
    },
    $removeAt: function $removeAt(container, propertyName, index) {
        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $removeAt command on non array object is forbidden.');
        }

        if (index >= array.length || index < 0) {
            return [array, null];
        }

        var newValue = array.slice(0, index).concat(array.slice(index + 1));
        return [newValue, arrayDiffObject(array, newValue, index, 1, [])];
    },
    $remove: function $remove(container, propertyName, item) {
        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $removeAt command on non array object is forbidden.');
        }

        var index = indexOf(array, item);

        if (index === -1) {
            return [array, null];
        }

        var newValue = array.slice(0, index).concat(array.slice(index + 1));
        return [newValue, arrayDiffObject(array, newValue, index, 1, [])];
    },
    $splice: function $splice(container, propertyName, _ref) {
        var _ref2 = toArray(_ref),
            start = _ref2[0],
            deleteCount = _ref2[1],
            items = _ref2.slice(2);

        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $splice command on non array object is forbidden.');
        }

        var newValue = array.slice(0, start).concat(items).concat(array.slice(start + deleteCount));
        return [newValue, arrayDiffObject(array, newValue, start, deleteCount, items)];
    },
    $map: function $map(container, propertyName, callback) {
        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $map command on non array object is forbidden.');
        }

        var newValue = array.map(callback);
        return [newValue, diffObject('change', array, newValue)];
    },
    $filter: function $filter(container, propertyName, callback) {
        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $filter command on non array object is forbidden.');
        }

        var newValue = array.filter(callback);
        return [newValue, diffObject('change', array, newValue)];
    },
    $reduce: function $reduce(container, propertyName, args) {
        var array = container[propertyName];

        if (!Array.isArray(array)) {
            throw new Error('Usage of $reduce command on non array object is forbidden.');
        }

        // .reduce(callback) : .reduce(callback, initialValue)
        var newValue = typeof args === 'function' ? array.reduce(args) : array.reduce.apply(array, toConsumableArray(args));
        return [newValue, diffObject('change', array, newValue)];
    },
    $merge: function $merge(container, propertyName, extensions) {
        var target = container[propertyName] || {};
        var newValue = clone(target);
        var diff = {};
        for (var key in extensions) {
            if (extensions.hasOwnProperty(key)) {
                var newPropertyValue = extensions[key];
                var oldPropertyValue = target[key];
                if (newPropertyValue !== oldPropertyValue) {
                    newValue[key] = newPropertyValue;
                    var changeType = target.hasOwnProperty(key) ? 'change' : 'add';
                    diff[key] = diffObject(changeType, oldPropertyValue, newPropertyValue);
                }
            }
        }

        return [newValue, diff];
    },
    $defaults: function $defaults(container, propertyName, defaults$$1) {
        var target = container[propertyName];
        var newValue = clone(target);
        var diff = {};
        for (var key in defaults$$1) {
            if (defaults$$1.hasOwnProperty(key) && newValue[key] === undefined) {
                newValue[key] = defaults$$1[key];
                diff[key] = diffObject('add', undefined, defaults$$1[key]);
            }
        }

        return [newValue, diff];
    },
    $apply: function $apply(container, propertyName, factory) {
        var newValue = factory(container[propertyName]);
        return [newValue, diffObject(container.hasOwnProperty(propertyName) ? 'change' : 'add', container[propertyName], newValue)];
    },
    $omit: function $omit(container, propertyName, assert) {
        var value = container[propertyName];

        if (assert === true || typeof assert === 'function' && assert(value)) {
            return [OMIT_THIS_PROPERTY, diffObject('remove', value, undefined)];
        }

        return [value, null];
    },
    $composeBefore: function $composeBefore(container, propertyName, before) {
        var fn = container[propertyName];

        if (typeof fn !== 'function') {
            throw new Error('Usage of $composeBefore command on non function object is forbidden.');
        }

        if (typeof before !== 'function') {
            throw new Error('Passing non function object to $composeBefore command is forbidden');
        }

        var newValue = function newValue() {
            return fn(before.apply(undefined, arguments));
        };
        return [newValue, diffObject('change', fn, newValue)];
    },
    $composeAfter: function $composeAfter(container, propertyName, after) {
        var fn = container[propertyName];

        if (typeof fn !== 'function') {
            throw new Error('Usage of $composeAfter command on non function object is forbidden.');
        }

        if (typeof after !== 'function') {
            throw new Error('Passing non function object to $composeAfter command is forbidden');
        }

        var newValue = function newValue() {
            return after(fn.apply(undefined, arguments));
        };
        return [newValue, diffObject('change', fn, newValue)];
    }
};

/**
 * @private
 */
var availableCommandKeys = Object.keys(availableCommands);

/**
 * @private
 */
var availableCommandNames = availableCommandKeys.map(function (key) {
    return key.slice(1);
});

/**
 * san-update
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file update helper module
 * @author otakustay
 */

/**
 * 根据提供的指令更新一个对象，返回更新后的新对象及差异对象，原对象不会作任何的修改
 *
 * 现有支持的指令包括：
 *
 * - `$set`：修改指定的属性值
 * - `$push`：向类型为数组的属性尾部添加元素
 * - `$unshift`：向类型为数组的属性头部添加元素
 * - `$pop`：移除类型为数组的属性的尾部元素
 * - `$shift`：移除类型为数组的属性的头部元素
 * - `$removeAt`：移除类型为数组的属性的指定位置的元素
 * - `$remove`：移除类型为数组的属性的指定元素，使用`===`判等且仅移除第一个遇到的元素
 * - `$splice`：通过索引、移除数目、插入元素操作类型为数组的属性
 * - `$map`：对类型为数组的属性进行`map`操作
 * - `$filter`：对类型为数组的属性进行`filter`操作
 * - `$reduce`：对类型为数组的属性进行`reduce`操作
 * - `$merge`：将2个对象进行浅合并（不递归）
 * - `$defaults`：将指定对象的属性值填到原属性为'undefined`的'性上
 * - `$apply`：用一个工厂函数的返回值作为`$set`指令的输入，工厂函数接受属性的旧值作为唯一的参数
 * - `$omit`：用于移除某个属性，传递`boolean`值来确认是否移除（`true`为移除），也可传递一个函数（参数为旧值）用其返回值确认是否移除
 * - `$composeBefore`：组合类型为函数的属性为一个新的函数，新函数首先调用compose提供的函数，随后调用原函数
 * - `$composeAfter`：组合类型为函数的属性为一个新的函数，新函数首先调用原函数，随后调用compose提供的函数
 *
 * 可以在一次更新操作中对不同的属性用不同的指令：
 *
 * ```javascript
 * import {withDiff} from 'san-update';
 *
 * let [newObject, diff] = withDiff(
 *     source,
 *     {
 *         foo: {bar: {$set: 1}},
 *         alice: {$push: 1},
 *         tom: {jack: {$set: {x: 1}}
 *     }
 * );
 * ```
 *
 * @param {Object} source 待更新的对象
 * @param {Object} commands 用于更新的指令
 * @return {[Object, Object]} 返回一个Tuple数组，其中第1项为更新结果，第2项为差异对象
 */
var withDiff = function withDiff(source, commands) {
    // 如果根节点就是个指令，那么直接对输入的对象进行操作，不需要再遍历属性了
    var possibleRootCommand = find(availableCommandKeys, function (key) {
        return commands.hasOwnProperty(key);
    });
    if (possibleRootCommand) {
        var wrapper = { source: source };
        var commandValue = commands[possibleRootCommand];
        return availableCommands[possibleRootCommand](wrapper, 'source', commandValue);
    }

    // ({string} key) => [newValue, diff]
    var executeCommand = function executeCommand(key) {
        var propertyCommand = commands[key];
        var availableCommand = find(availableCommandKeys, function (key) {
            return propertyCommand.hasOwnProperty(key);
        });

        // 找到指令节点后，对当前属性进行更新，
        // 如果这个节点不代表指令，那么肯定它的某个属性（或子属性）是指令，继续递归往下找
        return availableCommand ? availableCommands[availableCommand](source, key, propertyCommand[availableCommand]) : withDiff(source[key] || {}, propertyCommand);
    };

    // 因为可能通过指令增加一些原本没有的属性，所以最后还要对`commands`做一次遍历来确保没有漏掉
    var patchNewProperties = function patchNewProperties(result, diff) {
        for (var key in commands) {
            if (result.hasOwnProperty(key) || !commands.hasOwnProperty(key)) {
                continue;
            }

            var _executeCommand = executeCommand(key),
                _executeCommand2 = slicedToArray(_executeCommand, 2),
                newValue = _executeCommand2[0],
                propertyDiff = _executeCommand2[1];
            // 理论上因为全是新属性，所以这里的`propertyDiff`不可能是空的


            diff[key] = propertyDiff;

            if (newValue !== OMIT_THIS_PROPERTY) {
                result[key] = newValue;
            }
        }

        return [result, diff];
    };

    if (Array.isArray(source)) {
        var _result = [];
        var _diff = {};
        for (var i = 0; i < source.length; i++) {
            // 没有对应的指令，自然是不更新的，直接复制过去
            if (!commands.hasOwnProperty(i)) {
                _result.push(source[i]);
                continue;
            }

            var _executeCommand3 = executeCommand(i),
                _executeCommand4 = slicedToArray(_executeCommand3, 2),
                newValue = _executeCommand4[0],
                propertyDiff = _executeCommand4[1];

            if (notEmpty(propertyDiff)) {
                _diff[i] = propertyDiff;
            }
            if (newValue !== OMIT_THIS_PROPERTY) {
                _result.push(newValue);
            }
        }

        return patchNewProperties(_result, _diff);
    }

    var result = {};
    var diff = {};
    for (var key in source) {
        // 没有对应的指令，自然是不更新的，直接复制过去
        if (!commands.hasOwnProperty(key)) {
            result[key] = source[key];
            continue;
        }

        var _executeCommand5 = executeCommand(key),
            _executeCommand6 = slicedToArray(_executeCommand5, 2),
            newValue = _executeCommand6[0],
            propertyDiff = _executeCommand6[1];

        if (notEmpty(propertyDiff)) {
            diff[key] = propertyDiff;
        }
        if (newValue !== OMIT_THIS_PROPERTY) {
            result[key] = newValue;
        }
    }

    return patchNewProperties(result, diff);
};

/**
 * 根据提供的指令更新一个对象，返回更新后的新对象，原对象不会作任何的修改
 *
 * 具体详情参考`withDiff`的文档
 *
 * ```javascript
 * import {update} from 'san-update';
 *
 * let newObject = withDiff(
 *     source,
 *     {
 *         foo: {bar: {$set: 1}},
 *         alice: {$push: 1},
 *         tom: {jack: {$set: {x: 1}}
 *     }
 * );
 * ```
 *
 * @param {Object} source 待更新的对象
 * @param {Object} commands 用于更新的指令
 * @return {Object} 更新后的对象
 */
var update = function update(source, commands) {
    return withDiff(source, commands)[0];
};

/**
 * san-update
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file parse property name
 * @author otakustay
 */

var LEFT_SQUARE_BRACKET = '['.charCodeAt(0);

var parseName = (function (source) {
    if (Array.isArray(source)) {
        return source;
    }

    // 这个简易的非状态机的实现是有缺陷的
    // 比如 a['dd.cc'].b 这种就有问题了，不过我们不考虑这种场景
    var terms = (source + '').split('.');
    var result = [];

    for (var i = 0; i < terms.length; i++) {
        var term = terms[i];
        var propAccessorStart = term.indexOf('[');

        if (propAccessorStart >= 0) {
            if (propAccessorStart > 0) {
                result.push(term.slice(0, propAccessorStart));
                term = term.slice(propAccessorStart);
            }

            while (term.charCodeAt(0) === LEFT_SQUARE_BRACKET) {
                var propAccessorEnd = term.indexOf(']');
                if (propAccessorEnd < 0) {
                    throw new Error('Property path syntax error: ' + source);
                }

                var propAccessorLiteral = term.slice(1, propAccessorEnd);
                if (/^[0-9]+$/.test(propAccessorLiteral)) {
                    // for number
                    result.push(+propAccessorLiteral);
                } else if (/^(['"])([^\1]+)\1$/.test(propAccessorLiteral)) {
                    // for string literal
                    result.push(new Function('return ' + propAccessorLiteral)());
                } else {
                    throw new Error('Property path syntax error: ' + source);
                }

                term = term.slice(propAccessorEnd + 1);
            }
        } else {
            result.push(term);
        }
    }

    return result;
});

/**
 * san-update
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file shortcut functions
 * @author otakustay
 */

var buildPathObject = function buildPathObject(propertyName, value) {
  if (propertyName == null) {
    return value;
  }

  var path = parseName(propertyName);

  var result = {};
  var current = result;
  for (var i = 0; i < path.length - 1; i++) {
    current = current[path[i]] = {};
  }
  current[path[path.length - 1]] = value;
  return result;
};

/**
 * 针对`$set`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Object} 更新后的新对象
 */
var set$1 = function set$$1(source, path, value) {
  return update(source, buildPathObject(path, { $set: value }));
};

/**
 * 针对`$push`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Object} 更新后的新对象
 */
var push$1 = function push(source, path, value) {
  return update(source, buildPathObject(path, { $push: value }));
};

/**
 * 针对`$unshift`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Object} 更新后的新对象
 */
var unshift$1 = function unshift(source, path, value) {
  return update(source, buildPathObject(path, { $unshift: value }));
};

/**
 * 针对`$pop`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {boolean|Function} assert 用于确认是否要移除属性的判断条件或函数
 * @return {Object} 更新后的新对象
 */
var pop$1 = function pop(source, path, assert) {
  return update(source, buildPathObject(path, { $pop: assert }));
};

/**
 * 针对`$shift`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {boolean|Function} assert 用于确认是否要移除属性的判断条件或函数
 * @return {Object} 更新后的新对象
 */
var shift$1 = function shift(source, path, assert) {
  return update(source, buildPathObject(path, { $shift: assert }));
};

/**
 * 针对`$removeAt`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {number} index 需要删除的索引
 * @return {Object} 更新后的新对象
 */
var removeAt$1 = function removeAt(source, path, index) {
  return update(source, buildPathObject(path, { $removeAt: index }));
};

/**
 * 针对`$remove`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 需要删除的值
 * @return {Object} 更新后的新对象
 */
var remove$1 = function remove(source, path, value) {
  return update(source, buildPathObject(path, { $remove: value }));
};

/**
 * 针对`$splice`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {number} start 插入起始位置
 * @param {number} deleteCount 删除的元素个数
 * @param {...*} items 插入的元素
 * @return {Object} 更新后的新对象
 */
var splice$1 = function splice(source, path, start, deleteCount) {
  for (var _len = arguments.length, items = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    items[_key - 4] = arguments[_key];
  }

  var args = [start, deleteCount].concat(items);
  return update(source, buildPathObject(path, { $splice: args }));
};

/**
 * 针对`$map`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} callback 回调函数
 * @return {Object} 更新后的新对象
 */
var map$1 = function map(source, path, callback) {
  return update(source, buildPathObject(path, { $map: callback }));
};

/**
 * 针对`$filter`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} callback 回调函数
 * @return {Object} 更新后的新对象
 */
var filter$1 = function filter(source, path, callback) {
  return update(source, buildPathObject(path, { $filter: callback }));
};

/**
 * 针对`$reduce`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {...*} args 调用`reduce`时的参数，可以为`{Function} callback`或`{Function} callback, {*} initialValue`
 * @return {Object} 更新后的新对象
 */
var reduce$1 = function reduce(source, path) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  var command = args.length === 1 ? { $reduce: args[0] } : { $reduce: args };
  return update(source, buildPathObject(path, command));
};

/**
 * 针对`$merge`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Object} 更新后的新对象
 */
var merge$1 = function merge(source, path, value) {
  return update(source, buildPathObject(path, { $merge: value }));
};

/**
 * 针对`$defaults`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Object} 更新后的新对象
 */
var defaults$1 = function defaults$$1(source, path, value) {
  return update(source, buildPathObject(path, { $defaults: value }));
};

/**
 * 针对`$apply`指令的快捷函数
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} factory 用于生成新值的工厂函数
 * @return {Object} 更新后的新对象
 */
var apply$1 = function apply(source, path, factory) {
  return update(source, buildPathObject(path, { $apply: factory }));
};

/**
 * 针对`$omit`指令的快捷函数，其中`assert`参数默认值为`true`
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {boolean|Function} assert 用于确认是否要移除属性的判断条件或函数
 * @return {Object} 更新后的新对象
 */
var omit$1 = function omit(source, path) {
  var assert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return update(source, buildPathObject(path, { $omit: assert }));
};

/**
 * 针对`$omit`指令的快捷函数，其中`assert`参数默认值为`true`
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} before 包装函数，该函数会在原函数前执行，且返回值传递给原函数作为参数
 * @return {Object} 更新后的新对象
 */
var composeBefore$1 = function composeBefore(source, path, before) {
  return update(source, buildPathObject(path, { $composeBefore: before }));
};

/**
 * 针对`$omit`指令的快捷函数，其中`assert`参数默认值为`true`
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} after 包装函数，该函数会在原函数后执行，且接收原函数返回值作为参数
 * @return {Object} 更新后的新对象
 */
var composeAfter$1 = function composeAfter(source, path, after) {
  return update(source, buildPathObject(path, { $composeAfter: after }));
};

/**
 * 支持通过依赖计算属性值的更新快捷函数
 *
 * 此函数仅有快捷方式，在`update`函数时不能使用此指令
 *
 * 此函数必须指定`path`参数，不能直接对对象本身使用
 *
 * @param {Object} source 待更新的对象
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组
 * @param {Function|Array.<Function>} selectors 用于获取`factory`的依赖参数的函数，每个函数返回一个值作为`factory`的参数
 * @param {Function} factory 用于生成新值的工厂函数，该函数前n个参数是`selectors`参数的返回值，最后一个参数为需要更新的属性的当前值
 * @return {Object} 更新后的新对象
 */
var applyWith$1 = function applyWith(source, path, selectors, factory) {
  if (Array.isArray(selectors)) {
    var _ret = function () {
      var dependencies = selectors.map(function (select) {
        return select(source);
      });
      var boundFactory = function boundFactory(value) {
        return factory.apply(undefined, toConsumableArray(dependencies).concat([value]));
      };
      return {
        v: apply$1(source, path, boundFactory)
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  var dependency = selectors(source);
  var boundFactory = function boundFactory(value) {
    return factory(dependency, value);
  };
  return apply$1(source, path, boundFactory);
};

/**
 * san-update
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file functional programming module
 * @author otakustay
 */

var wrap = function wrap(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (source) {
      return fn.apply(undefined, [source].concat(args));
    };
  };
};

/**
 * 构建一个针对`$set`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var set$$1 = wrap(set$1);

/**
 * 构建一个针对`$push`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var push$$1 = wrap(push$1);

/**
 * 构建一个针对`$unshift`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var unshift$$1 = wrap(unshift$1);

/**
 * 构建一个针对`$pop`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {boolean|Function} assert 用于确认是否要移除属性的判断条件或函数
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var pop$$1 = wrap(pop$1);

/**
 * 构建一个针对`$shift`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {boolean|Function} assert 用于确认是否要移除属性的判断条件或函数
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var shift$$1 = wrap(shift$1);

/**
 * 构建一个针对`$removeAt`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {number} index 需要删除的索引
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var removeAt$$1 = wrap(removeAt$1);

/**
 * 构建一个针对`$remove`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 需要删除的值
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var remove$$1 = wrap(remove$1);

/**
 * 构建一个针对`$splice`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {number} start 插入起始位置
 * @param {number} deleteCount 删除的元素个数
 * @param {...*} items 插入的元素
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var splice$$1 = wrap(splice$1);

/**
 * 构建一个针对`$map`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} callback 回调函数
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var map$$1 = wrap(map$1);

/**
 * 构建一个针对`$filter`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} callback 回调函数
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var filter$$1 = wrap(filter$1);

/**
 * 构建一个针对`$reduce`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {...*} args 调用`reduce`时的参数，可以为`{Function} callback`或`{Function} callback, {*} initialValue`
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var reduce$$1 = wrap(reduce$1);

/**
 * 构建一个针对`$merge`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var merge$$1 = wrap(merge$1);

/**
 * 构建一个针对`$defaults`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {*} value 用于更新的值
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var defaults$$1 = wrap(defaults$1);

/**
 * 构建一个针对`$apply`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} factory 用于生成新值的工厂函数
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var apply$$1 = wrap(apply$1);

/**
 * 构建一个针对`$omit`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {boolean|Function} assert 用于确认是否要移除属性的判断条件或函数
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var omit$$1 = wrap(omit$1);

/**
 * 构建一个针对`$omit`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} before 包装函数，该函数会在原函数前执行，且返回值传递给原函数作为参数
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var composeBefore$$1 = wrap(composeBefore$1);

/**
 * 构建一个针对`$omit`指令的更新函数
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组，
 *     如果该参数为'undefined`或`null`，则会直接对`source`对象进行更'操作
 * @param {Function} after 包装函数，该函数会在原函数后执行，且接收原函数返回值作为参数
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var composeAfter$$1 = wrap(composeAfter$1);

/**
 * 构建一个针对`applyWith`快捷函数的更新对象
 *
 * 此函数在`update`函数时不能使用此指令
 *
 * 此函数必须指定`path`参数，不能直接对对象本身使用
 *
 * @param {string?|Array.<string>|number?|Array.<number>} path 属性的路径，如果更新二层以上的属性则需要提供一个字符串数组
 * @param {Function|Array.<Function>} selectors 用于获取`factory`的依赖参数的函数，每个函数返回一个值作为`factory`的参数
 * @param {Function} factory 用于生成新值的工厂函数，该函数前n个参数是`selectors`参数的返回值，最后一个参数为需要更新的属性的当前值
 * @return {Function} 返回更新函数，该函数接收对象后依据指令进行更新并返回新对象
 */
var applyWith$$1 = wrap(applyWith$1);

exports.set = set$$1;
exports.push = push$$1;
exports.unshift = unshift$$1;
exports.pop = pop$$1;
exports.shift = shift$$1;
exports.removeAt = removeAt$$1;
exports.remove = remove$$1;
exports.splice = splice$$1;
exports.map = map$$1;
exports.filter = filter$$1;
exports.reduce = reduce$$1;
exports.merge = merge$$1;
exports.defaults = defaults$$1;
exports.apply = apply$$1;
exports.omit = omit$$1;
exports.composeBefore = composeBefore$$1;
exports.composeAfter = composeAfter$$1;
exports.applyWith = applyWith$$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=map/fp.js.map
