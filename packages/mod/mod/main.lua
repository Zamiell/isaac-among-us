--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]

local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file, ...)
    if ____moduleCache[file] then
        return ____moduleCache[file].value
    end
    if ____modules[file] then
        local module = ____modules[file]
        ____moduleCache[file] = { value = (select("#", ...) > 0) and module(...) or module(file) }
        return ____moduleCache[file].value
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["lualib_bundle"] = function(...) 
function __TS__ArrayIsArray(value)
    return (type(value) == "table") and ((value[1] ~= nil) or (next(value, nil) == nil))
end

function __TS__ArrayConcat(arr1, ...)
    local args = {...}
    local out = {}
    for ____, val in ipairs(arr1) do
        out[#out + 1] = val
    end
    for ____, arg in ipairs(args) do
        if __TS__ArrayIsArray(arg) then
            local argAsArray = arg
            for ____, val in ipairs(argAsArray) do
                out[#out + 1] = val
            end
        else
            out[#out + 1] = arg
        end
    end
    return out
end

function __TS__ArrayEntries(array)
    local key = 0
    return {
        [Symbol.iterator] = function(self)
            return self
        end,
        next = function(self)
            local result = {done = array[key + 1] == nil, value = {key, array[key + 1]}}
            key = key + 1
            return result
        end
    }
end

function __TS__ArrayEvery(arr, callbackfn)
    do
        local i = 0
        while i < #arr do
            if not callbackfn(_G, arr[i + 1], i, arr) then
                return false
            end
            i = i + 1
        end
    end
    return true
end

function __TS__ArrayFilter(arr, callbackfn)
    local result = {}
    do
        local i = 0
        while i < #arr do
            if callbackfn(_G, arr[i + 1], i, arr) then
                result[#result + 1] = arr[i + 1]
            end
            i = i + 1
        end
    end
    return result
end

function __TS__ArrayForEach(arr, callbackFn)
    do
        local i = 0
        while i < #arr do
            callbackFn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
end

function __TS__ArrayFind(arr, predicate)
    local len = #arr
    local k = 0
    while k < len do
        local elem = arr[k + 1]
        if predicate(_G, elem, k, arr) then
            return elem
        end
        k = k + 1
    end
    return nil
end

function __TS__ArrayFindIndex(arr, callbackFn)
    do
        local i = 0
        local len = #arr
        while i < len do
            if callbackFn(_G, arr[i + 1], i, arr) then
                return i
            end
            i = i + 1
        end
    end
    return -1
end

function __TS__ArrayIncludes(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    local k = fromIndex
    if fromIndex < 0 then
        k = len + fromIndex
    end
    if k < 0 then
        k = 0
    end
    for i = k, len do
        if self[i + 1] == searchElement then
            return true
        end
    end
    return false
end

function __TS__ArrayIndexOf(arr, searchElement, fromIndex)
    local len = #arr
    if len == 0 then
        return -1
    end
    local n = 0
    if fromIndex then
        n = fromIndex
    end
    if n >= len then
        return -1
    end
    local k
    if n >= 0 then
        k = n
    else
        k = len + n
        if k < 0 then
            k = 0
        end
    end
    do
        local i = k
        while i < len do
            if arr[i + 1] == searchElement then
                return i
            end
            i = i + 1
        end
    end
    return -1
end

function __TS__ArrayJoin(self, separator)
    if separator == nil then
        separator = ","
    end
    local result = ""
    for index, value in ipairs(self) do
        if index > 1 then
            result = result .. separator
        end
        result = result .. tostring(value)
    end
    return result
end

function __TS__ArrayMap(arr, callbackfn)
    local newArray = {}
    do
        local i = 0
        while i < #arr do
            newArray[i + 1] = callbackfn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
    return newArray
end

function __TS__ArrayPush(arr, ...)
    local items = {...}
    for ____, item in ipairs(items) do
        arr[#arr + 1] = item
    end
    return #arr
end

function __TS__ArrayReduce(arr, callbackFn, ...)
    local len = #arr
    local k = 0
    local accumulator = nil
    if select("#", ...) ~= 0 then
        accumulator = select(1, ...)
    elseif len > 0 then
        accumulator = arr[1]
        k = 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k, len - 1 do
        accumulator = callbackFn(_G, accumulator, arr[i + 1], i, arr)
    end
    return accumulator
end

function __TS__ArrayReduceRight(arr, callbackFn, ...)
    local len = #arr
    local k = len - 1
    local accumulator = nil
    if select("#", ...) ~= 0 then
        accumulator = select(1, ...)
    elseif len > 0 then
        accumulator = arr[k + 1]
        k = k - 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k, 0, -1 do
        accumulator = callbackFn(_G, accumulator, arr[i + 1], i, arr)
    end
    return accumulator
end

function __TS__ArrayReverse(arr)
    local i = 0
    local j = #arr - 1
    while i < j do
        local temp = arr[j + 1]
        arr[j + 1] = arr[i + 1]
        arr[i + 1] = temp
        i = i + 1
        j = j - 1
    end
    return arr
end

function __TS__ArrayShift(arr)
    return table.remove(arr, 1)
end

function __TS__ArrayUnshift(arr, ...)
    local items = {...}
    do
        local i = #items - 1
        while i >= 0 do
            table.insert(arr, 1, items[i + 1])
            i = i - 1
        end
    end
    return #arr
end

function __TS__ArraySort(arr, compareFn)
    if compareFn ~= nil then
        table.sort(
            arr,
            function(a, b) return compareFn(_G, a, b) < 0 end
        )
    else
        table.sort(arr)
    end
    return arr
end

function __TS__ArraySlice(list, first, last)
    local len = #list
    local relativeStart = first or 0
    local k
    if relativeStart < 0 then
        k = math.max(len + relativeStart, 0)
    else
        k = math.min(relativeStart, len)
    end
    local relativeEnd = last
    if last == nil then
        relativeEnd = len
    end
    local final
    if relativeEnd < 0 then
        final = math.max(len + relativeEnd, 0)
    else
        final = math.min(relativeEnd, len)
    end
    local out = {}
    local n = 0
    while k < final do
        out[n + 1] = list[k + 1]
        k = k + 1
        n = n + 1
    end
    return out
end

function __TS__ArraySome(arr, callbackfn)
    do
        local i = 0
        while i < #arr do
            if callbackfn(_G, arr[i + 1], i, arr) then
                return true
            end
            i = i + 1
        end
    end
    return false
end

function __TS__ArraySplice(list, ...)
    local len = #list
    local actualArgumentCount = select("#", ...)
    local start = select(1, ...)
    local deleteCount = select(2, ...)
    local actualStart
    if start < 0 then
        actualStart = math.max(len + start, 0)
    else
        actualStart = math.min(start, len)
    end
    local itemCount = math.max(actualArgumentCount - 2, 0)
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - actualStart
    else
        actualDeleteCount = math.min(
            math.max(deleteCount or 0, 0),
            len - actualStart
        )
    end
    local out = {}
    do
        local k = 0
        while k < actualDeleteCount do
            local from = actualStart + k
            if list[from + 1] then
                out[k + 1] = list[from + 1]
            end
            k = k + 1
        end
    end
    if itemCount < actualDeleteCount then
        do
            local k = actualStart
            while k < (len - actualDeleteCount) do
                local from = k + actualDeleteCount
                local to = k + itemCount
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k + 1
            end
        end
        do
            local k = len
            while k > ((len - actualDeleteCount) + itemCount) do
                list[k] = nil
                k = k - 1
            end
        end
    elseif itemCount > actualDeleteCount then
        do
            local k = len - actualDeleteCount
            while k > actualStart do
                local from = (k + actualDeleteCount) - 1
                local to = (k + itemCount) - 1
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k - 1
            end
        end
    end
    local j = actualStart
    for i = 3, actualArgumentCount do
        list[j + 1] = select(i, ...)
        j = j + 1
    end
    do
        local k = #list - 1
        while k >= ((len - actualDeleteCount) + itemCount) do
            list[k + 1] = nil
            k = k - 1
        end
    end
    return out
end

function __TS__ArrayToObject(array)
    local object = {}
    do
        local i = 0
        while i < #array do
            object[i] = array[i + 1]
            i = i + 1
        end
    end
    return object
end

function __TS__ArrayFlat(array, depth)
    if depth == nil then
        depth = 1
    end
    local result = {}
    for ____, value in ipairs(array) do
        if (depth > 0) and __TS__ArrayIsArray(value) then
            result = __TS__ArrayConcat(
                result,
                __TS__ArrayFlat(value, depth - 1)
            )
        else
            result[#result + 1] = value
        end
    end
    return result
end

function __TS__ArrayFlatMap(array, callback)
    local result = {}
    do
        local i = 0
        while i < #array do
            local value = callback(_G, array[i + 1], i, array)
            if (type(value) == "table") and __TS__ArrayIsArray(value) then
                result = __TS__ArrayConcat(result, value)
            else
                result[#result + 1] = value
            end
            i = i + 1
        end
    end
    return result
end

function __TS__ArraySetLength(arr, length)
    if (((length < 0) or (length ~= length)) or (length == math.huge)) or (math.floor(length) ~= length) then
        error(
            "invalid array length: " .. tostring(length),
            0
        )
    end
    do
        local i = #arr - 1
        while i >= length do
            arr[i + 1] = nil
            i = i - 1
        end
    end
    return length
end

____symbolMetatable = {
    __tostring = function(self)
        return ("Symbol(" .. (self.description or "")) .. ")"
    end
}
function __TS__Symbol(description)
    return setmetatable({description = description}, ____symbolMetatable)
end
Symbol = {
    iterator = __TS__Symbol("Symbol.iterator"),
    hasInstance = __TS__Symbol("Symbol.hasInstance"),
    species = __TS__Symbol("Symbol.species"),
    toStringTag = __TS__Symbol("Symbol.toStringTag")
}

function __TS__InstanceOf(obj, classTbl)
    if type(classTbl) ~= "table" then
        error("Right-hand side of 'instanceof' is not an object", 0)
    end
    if classTbl[Symbol.hasInstance] ~= nil then
        return not (not classTbl[Symbol.hasInstance](classTbl, obj))
    end
    if type(obj) == "table" then
        local luaClass = obj.constructor
        while luaClass ~= nil do
            if luaClass == classTbl then
                return true
            end
            luaClass = luaClass.____super
        end
    end
    return false
end

function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

function __TS__AsyncAwaiter(generator)
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            local adopt, fulfilled, rejected, step, asyncCoroutine
            function adopt(self, value)
                return ((__TS__InstanceOf(value, __TS__Promise) and (function() return value end)) or (function() return __TS__Promise.resolve(value) end))()
            end
            function fulfilled(self, value)
                local success, errorOrErrorHandler, resultOrError = coroutine.resume(asyncCoroutine, value)
                if success then
                    step(_G, resultOrError, errorOrErrorHandler)
                else
                    reject(_G, resultOrError)
                end
            end
            function rejected(self, handler)
                if handler then
                    return function(____, value)
                        local success, valueOrError = pcall(handler, value)
                        if success then
                            step(_G, valueOrError, handler)
                        else
                            reject(_G, valueOrError)
                        end
                    end
                else
                    return function(____, value)
                        reject(_G, value)
                    end
                end
            end
            function step(self, result, errorHandler)
                if coroutine.status(asyncCoroutine) == "dead" then
                    resolve(_G, result)
                else
                    (function()
                        local ____self = adopt(_G, result)
                        return ____self["then"](
                            ____self,
                            fulfilled,
                            rejected(_G, errorHandler)
                        )
                    end)()
                end
            end
            asyncCoroutine = coroutine.create(generator)
            local success, errorOrErrorHandler, resultOrError = coroutine.resume(asyncCoroutine)
            if success then
                step(_G, resultOrError, errorOrErrorHandler)
            else
                reject(_G, errorOrErrorHandler)
            end
        end
    )
end
function __TS__Await(errorHandler, thing)
    return coroutine.yield(errorHandler, thing)
end

function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

function __TS__ClassExtends(target, base)
    target.____super = base
    local staticMetatable = setmetatable({__index = base}, base)
    setmetatable(target, staticMetatable)
    local baseMetatable = getmetatable(base)
    if baseMetatable then
        if type(baseMetatable.__index) == "function" then
            staticMetatable.__index = baseMetatable.__index
        end
        if type(baseMetatable.__newindex) == "function" then
            staticMetatable.__newindex = baseMetatable.__newindex
        end
    end
    setmetatable(target.prototype, base.prototype)
    if type(base.prototype.__index) == "function" then
        target.prototype.__index = base.prototype.__index
    end
    if type(base.prototype.__newindex) == "function" then
        target.prototype.__newindex = base.prototype.__newindex
    end
    if type(base.prototype.__tostring) == "function" then
        target.prototype.__tostring = base.prototype.__tostring
    end
end

function __TS__CloneDescriptor(____bindingPattern0)
    local enumerable
    enumerable = ____bindingPattern0.enumerable
    local configurable
    configurable = ____bindingPattern0.configurable
    local get
    get = ____bindingPattern0.get
    local set
    set = ____bindingPattern0.set
    local writable
    writable = ____bindingPattern0.writable
    local value
    value = ____bindingPattern0.value
    local descriptor = {enumerable = enumerable == true, configurable = configurable == true}
    local hasGetterOrSetter = (get ~= nil) or (set ~= nil)
    local hasValueOrWritableAttribute = (writable ~= nil) or (value ~= nil)
    if hasGetterOrSetter and hasValueOrWritableAttribute then
        error("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute.", 0)
    end
    if get or set then
        descriptor.get = get
        descriptor.set = set
    else
        descriptor.value = value
        descriptor.writable = writable == true
    end
    return descriptor
end

function __TS__ObjectGetOwnPropertyDescriptor(object, key)
    local metatable = getmetatable(object)
    if not metatable then
        return
    end
    if not rawget(metatable, "_descriptors") then
        return
    end
    return rawget(metatable, "_descriptors")[key]
end

function ____descriptorIndex(self, key)
    local value = rawget(self, key)
    if value ~= nil then
        return value
    end
    local metatable = getmetatable(self)
    while metatable do
        local rawResult = rawget(metatable, key)
        if rawResult ~= nil then
            return rawResult
        end
        local descriptors = rawget(metatable, "_descriptors")
        if descriptors then
            local descriptor = descriptors[key]
            if descriptor then
                if descriptor.get then
                    return descriptor.get(self)
                end
                return descriptor.value
            end
        end
        metatable = getmetatable(metatable)
    end
end
function ____descriptorNewindex(self, key, value)
    local metatable = getmetatable(self)
    while metatable do
        local descriptors = rawget(metatable, "_descriptors")
        if descriptors then
            local descriptor = descriptors[key]
            if descriptor then
                if descriptor.set then
                    descriptor.set(self, value)
                else
                    if descriptor.writable == false then
                        error(
                            ((("Cannot assign to read only property '" .. key) .. "' of object '") .. tostring(self)) .. "'",
                            0
                        )
                    end
                    descriptor.value = value
                end
                return
            end
        end
        metatable = getmetatable(metatable)
    end
    rawset(self, key, value)
end
function __TS__SetDescriptor(target, key, desc, isPrototype)
    if isPrototype == nil then
        isPrototype = false
    end
    local metatable = ((isPrototype and (function() return target end)) or (function() return getmetatable(target) end))()
    if not metatable then
        metatable = {}
        setmetatable(target, metatable)
    end
    local value = rawget(target, key)
    if value ~= nil then
        rawset(target, key, nil)
    end
    if not rawget(metatable, "_descriptors") then
        metatable._descriptors = {}
    end
    local descriptor = __TS__CloneDescriptor(desc)
    metatable._descriptors[key] = descriptor
    metatable.__index = ____descriptorIndex
    metatable.__newindex = ____descriptorNewindex
end

function __TS__ObjectAssign(to, ...)
    local sources = {...}
    if to == nil then
        return to
    end
    for ____, source in ipairs(sources) do
        for key in pairs(source) do
            to[key] = source[key]
        end
    end
    return to
end

function __TS__Decorate(decorators, target, key, desc)
    local result = target
    do
        local i = #decorators
        while i >= 0 do
            local decorator = decorators[i + 1]
            if decorator then
                local oldResult = result
                if key == nil then
                    result = decorator(_G, result)
                elseif desc == true then
                    local value = rawget(target, key)
                    local descriptor = __TS__ObjectGetOwnPropertyDescriptor(target, key) or ({configurable = true, writable = true, value = value})
                    local desc = decorator(_G, target, key, descriptor) or descriptor
                    local isSimpleValue = (((desc.configurable == true) and (desc.writable == true)) and (not desc.get)) and (not desc.set)
                    if isSimpleValue then
                        rawset(target, key, desc.value)
                    else
                        __TS__SetDescriptor(
                            target,
                            key,
                            __TS__ObjectAssign({}, descriptor, desc)
                        )
                    end
                elseif desc == false then
                    result = decorator(_G, target, key, desc)
                else
                    result = decorator(_G, target, key)
                end
                result = result or oldResult
            end
            i = i - 1
        end
    end
    return result
end

function __TS__DecorateParam(paramIndex, decorator)
    return function(____, target, key) return decorator(_G, target, key, paramIndex) end
end

function __TS__ObjectGetOwnPropertyDescriptors(object)
    local metatable = getmetatable(object)
    if not metatable then
        return {}
    end
    return rawget(metatable, "_descriptors") or ({})
end

function __TS__Delete(target, key)
    local descriptors = __TS__ObjectGetOwnPropertyDescriptors(target)
    local descriptor = descriptors[key]
    if descriptor then
        if not descriptor.configurable then
            error(
                ((("Cannot delete property " .. tostring(key)) .. " of ") .. tostring(target)) .. ".",
                0
            )
        end
        descriptors[key] = nil
        return true
    end
    if target[key] ~= nil then
        target[key] = nil
        return true
    end
    return false
end

function __TS__StringAccess(self, index)
    if (index >= 0) and (index < #self) then
        return string.sub(self, index + 1, index + 1)
    end
end

function __TS__DelegatedYield(iterable)
    if type(iterable) == "string" then
        for index = 0, #iterable - 1 do
            coroutine.yield(
                __TS__StringAccess(iterable, index)
            )
        end
    elseif iterable.____coroutine ~= nil then
        local co = iterable.____coroutine
        while true do
            local status, value = coroutine.resume(co)
            if not status then
                error(value, 0)
            end
            if coroutine.status(co) == "dead" then
                return value
            else
                coroutine.yield(value)
            end
        end
    elseif iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                return result.value
            else
                coroutine.yield(result.value)
            end
        end
    else
        for ____, value in ipairs(iterable) do
            coroutine.yield(value)
        end
    end
end

function __TS__GetErrorStack(self, constructor)
    local level = 1
    while true do
        local info = debug.getinfo(level, "f")
        level = level + 1
        if not info then
            level = 1
            break
        elseif info.func == constructor then
            break
        end
    end
    return debug.traceback(nil, level)
end
function __TS__WrapErrorToString(self, getDescription)
    return function(self)
        local description = getDescription(self)
        local caller = debug.getinfo(3, "f")
        if (_VERSION == "Lua 5.1") or (caller and (caller.func ~= error)) then
            return description
        else
            return (tostring(description) .. "\n") .. self.stack
        end
    end
end
function __TS__InitErrorClass(self, Type, name)
    Type.name = name
    return setmetatable(
        Type,
        {
            __call = function(____, _self, message) return __TS__New(Type, message) end
        }
    )
end
Error = __TS__InitErrorClass(
    _G,
    (function()
        local ____ = __TS__Class()
        ____.name = ""
        function ____.prototype.____constructor(self, message)
            if message == nil then
                message = ""
            end
            self.message = message
            self.name = "Error"
            self.stack = __TS__GetErrorStack(_G, self.constructor.new)
            local metatable = getmetatable(self)
            if not metatable.__errorToStringPatched then
                metatable.__errorToStringPatched = true
                metatable.__tostring = __TS__WrapErrorToString(_G, metatable.__tostring)
            end
        end
        function ____.prototype.__tostring(self)
            return (((self.message ~= "") and (function() return (self.name .. ": ") .. self.message end)) or (function() return self.name end))()
        end
        return ____
    end)(),
    "Error"
)
for ____, errorName in ipairs({"RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"}) do
    _G[errorName] = __TS__InitErrorClass(
        _G,
        (function()
            local ____ = __TS__Class()
            ____.name = ____.name
            __TS__ClassExtends(____, Error)
            function ____.prototype.____constructor(self, ...)
                Error.prototype.____constructor(self, ...)
                self.name = errorName
            end
            return ____
        end)(),
        errorName
    )
end

__TS__Unpack = table.unpack or unpack

function __TS__FunctionBind(fn, thisArg, ...)
    local boundArgs = {...}
    return function(____, ...)
        local args = {...}
        do
            local i = 0
            while i < #boundArgs do
                table.insert(args, i + 1, boundArgs[i + 1])
                i = i + 1
            end
        end
        return fn(
            thisArg,
            __TS__Unpack(args)
        )
    end
end

function __TS__GeneratorIterator(self)
    return self
end
function __TS__GeneratorNext(self, ...)
    local co = self.____coroutine
    if coroutine.status(co) == "dead" then
        return {done = true}
    end
    local status, value = coroutine.resume(co, ...)
    if not status then
        error(value, 0)
    end
    return {
        value = value,
        done = coroutine.status(co) == "dead"
    }
end
function __TS__Generator(fn)
    return function(...)
        local args = {...}
        local argsLength = select("#", ...)
        return {
            ____coroutine = coroutine.create(
                function() return fn(
                    (unpack or table.unpack)(args, 1, argsLength)
                ) end
            ),
            [Symbol.iterator] = __TS__GeneratorIterator,
            next = __TS__GeneratorNext
        }
    end
end

function __TS__InstanceOfObject(value)
    local valueType = type(value)
    return (valueType == "table") or (valueType == "function")
end

function __TS__IteratorGeneratorStep(self)
    local co = self.____coroutine
    local status, value = coroutine.resume(co)
    if not status then
        error(value, 0)
    end
    if coroutine.status(co) == "dead" then
        return
    end
    return true, value
end
function __TS__IteratorIteratorStep(self)
    local result = self:next()
    if result.done then
        return
    end
    return true, result.value
end
function __TS__IteratorStringStep(self, index)
    index = index + 1
    if index > #self then
        return
    end
    return index, string.sub(self, index, index)
end
function __TS__Iterator(iterable)
    if type(iterable) == "string" then
        return __TS__IteratorStringStep, iterable, 0
    elseif iterable.____coroutine ~= nil then
        return __TS__IteratorGeneratorStep, iterable
    elseif iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        return __TS__IteratorIteratorStep, iterator
    else
        return ipairs(iterable)
    end
end

Map = (function()
    local Map = __TS__Class()
    Map.name = "Map"
    function Map.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "Map"
        self.items = {}
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self:set(value[1], value[2])
            end
        else
            local array = entries
            for ____, kvp in ipairs(array) do
                self:set(kvp[1], kvp[2])
            end
        end
    end
    function Map.prototype.clear(self)
        self.items = {}
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Map.prototype.delete(self, key)
        local contains = self:has(key)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[key]
            local previous = self.previousKey[key]
            if next and previous then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[key] = nil
            self.previousKey[key] = nil
        end
        self.items[key] = nil
        return contains
    end
    function Map.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(
            self:keys()
        ) do
            callback(_G, self.items[key], key, self)
        end
    end
    function Map.prototype.get(self, key)
        return self.items[key]
    end
    function Map.prototype.has(self, key)
        return (self.nextKey[key] ~= nil) or (self.lastKey == key)
    end
    function Map.prototype.set(self, key, value)
        local isNewValue = not self:has(key)
        if isNewValue then
            self.size = self.size + 1
        end
        self.items[key] = value
        if self.firstKey == nil then
            self.firstKey = key
            self.lastKey = key
        elseif isNewValue then
            self.nextKey[self.lastKey] = key
            self.previousKey[key] = self.lastKey
            self.lastKey = key
        end
        return self
    end
    Map.prototype[Symbol.iterator] = function(self)
        return self:entries()
    end
    function Map.prototype.entries(self)
        local ____ = self
        local items = ____.items
        local nextKey = ____.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, items[key]}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.values(self)
        local ____ = self
        local items = ____.items
        local nextKey = ____.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = items[key]}
                key = nextKey[key]
                return result
            end
        }
    end
    Map[Symbol.species] = Map
    return Map
end)()

__TS__MathAtan2 = math.atan2 or math.atan

function __TS__Number(value)
    local valueType = type(value)
    if valueType == "number" then
        return value
    elseif valueType == "string" then
        local numberValue = tonumber(value)
        if numberValue then
            return numberValue
        end
        if value == "Infinity" then
            return math.huge
        end
        if value == "-Infinity" then
            return -math.huge
        end
        local stringWithoutSpaces = string.gsub(value, "%s", "")
        if stringWithoutSpaces == "" then
            return 0
        end
        return 0 / 0
    elseif valueType == "boolean" then
        return (value and 1) or 0
    else
        return 0 / 0
    end
end

function __TS__NumberIsFinite(value)
    return (((type(value) == "number") and (value == value)) and (value ~= math.huge)) and (value ~= -math.huge)
end

function __TS__NumberIsNaN(value)
    return value ~= value
end

____radixChars = "0123456789abcdefghijklmnopqrstuvwxyz"
function __TS__NumberToString(self, radix)
    if ((((radix == nil) or (radix == 10)) or (self == math.huge)) or (self == -math.huge)) or (self ~= self) then
        return tostring(self)
    end
    radix = math.floor(radix)
    if (radix < 2) or (radix > 36) then
        error("toString() radix argument must be between 2 and 36", 0)
    end
    local integer, fraction = math.modf(
        math.abs(self)
    )
    local result = ""
    if radix == 8 then
        result = string.format("%o", integer)
    elseif radix == 16 then
        result = string.format("%x", integer)
    else
        repeat
            do
                result = __TS__StringAccess(____radixChars, integer % radix) .. result
                integer = math.floor(integer / radix)
            end
        until not (integer ~= 0)
    end
    if fraction ~= 0 then
        result = result .. "."
        local delta = 1e-16
        repeat
            do
                fraction = fraction * radix
                delta = delta * radix
                local digit = math.floor(fraction)
                result = result .. __TS__StringAccess(____radixChars, digit)
                fraction = fraction - digit
            end
        until not (fraction >= delta)
    end
    if self < 0 then
        result = "-" .. result
    end
    return result
end

function __TS__ObjectDefineProperty(target, key, desc)
    local luaKey = (((type(key) == "number") and (function() return key + 1 end)) or (function() return key end))()
    local value = rawget(target, luaKey)
    local hasGetterOrSetter = (desc.get ~= nil) or (desc.set ~= nil)
    local descriptor
    if hasGetterOrSetter then
        if value ~= nil then
            error(
                "Cannot redefine property: " .. tostring(key),
                0
            )
        end
        descriptor = desc
    else
        local valueExists = value ~= nil
        descriptor = {
            set = desc.set,
            get = desc.get,
            configurable = (((desc.configurable ~= nil) and (function() return desc.configurable end)) or (function() return valueExists end))(),
            enumerable = (((desc.enumerable ~= nil) and (function() return desc.enumerable end)) or (function() return valueExists end))(),
            writable = (((desc.writable ~= nil) and (function() return desc.writable end)) or (function() return valueExists end))(),
            value = (((desc.value ~= nil) and (function() return desc.value end)) or (function() return value end))()
        }
    end
    __TS__SetDescriptor(target, luaKey, descriptor)
    return target
end

function __TS__ObjectEntries(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = {key, obj[key]}
    end
    return result
end

function __TS__ObjectFromEntries(entries)
    local obj = {}
    local iterable = entries
    if iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                break
            end
            local value = result.value
            obj[value[1]] = value[2]
        end
    else
        for ____, entry in ipairs(entries) do
            obj[entry[1]] = entry[2]
        end
    end
    return obj
end

function __TS__ObjectKeys(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = key
    end
    return result
end

function __TS__ObjectRest(target, usedProperties)
    local result = {}
    for property in pairs(target) do
        if not usedProperties[property] then
            result[property] = target[property]
        end
    end
    return result
end

function __TS__ObjectValues(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = obj[key]
    end
    return result
end

function __TS__OptionalChainAccess(____table, key)
    if ____table then
        return ____table[key]
    end
    return nil
end

function __TS__OptionalFunctionCall(f, ...)
    if f then
        return f(...)
    end
    return nil
end

function __TS__OptionalMethodCall(____table, methodName, isMethodOptional, ...)
    if ____table then
        local method = ____table[methodName]
        if method then
            return method(____table, ...)
        elseif not isMethodOptional then
            error(methodName .. " is not a function", 0)
        end
    end
    return nil
end

function __TS__ParseFloat(numberString)
    local infinityMatch = string.match(numberString, "^%s*(-?Infinity)")
    if infinityMatch then
        return (((__TS__StringAccess(infinityMatch, 0) == "-") and (function() return -math.huge end)) or (function() return math.huge end))()
    end
    local number = tonumber(
        string.match(numberString, "^%s*(-?%d+%.?%d*)")
    )
    return number or (0 / 0)
end

function __TS__StringSubstr(self, from, length)
    if from ~= from then
        from = 0
    end
    if length ~= nil then
        if (length ~= length) or (length <= 0) then
            return ""
        end
        length = length + from
    end
    if from >= 0 then
        from = from + 1
    end
    return string.sub(self, from, length)
end

function __TS__StringSubstring(self, start, ____end)
    if ____end ~= ____end then
        ____end = 0
    end
    if (____end ~= nil) and (start > ____end) then
        start, ____end = ____end, start
    end
    if start >= 0 then
        start = start + 1
    else
        start = 1
    end
    if (____end ~= nil) and (____end < 0) then
        ____end = 0
    end
    return string.sub(self, start, ____end)
end

__TS__parseInt_base_pattern = "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTvVwWxXyYzZ"
function __TS__ParseInt(numberString, base)
    if base == nil then
        base = 10
        local hexMatch = string.match(numberString, "^%s*-?0[xX]")
        if hexMatch then
            base = 16
            numberString = ((string.match(hexMatch, "-") and (function() return "-" .. __TS__StringSubstr(numberString, #hexMatch) end)) or (function() return __TS__StringSubstr(numberString, #hexMatch) end))()
        end
    end
    if (base < 2) or (base > 36) then
        return 0 / 0
    end
    local allowedDigits = (((base <= 10) and (function() return __TS__StringSubstring(__TS__parseInt_base_pattern, 0, base) end)) or (function() return __TS__StringSubstr(__TS__parseInt_base_pattern, 0, 10 + (2 * (base - 10))) end))()
    local pattern = ("^%s*(-?[" .. allowedDigits) .. "]*)"
    local number = tonumber(
        string.match(numberString, pattern),
        base
    )
    if number == nil then
        return 0 / 0
    end
    if number >= 0 then
        return math.floor(number)
    else
        return math.ceil(number)
    end
end

__TS__PromiseState = __TS__PromiseState or ({})
__TS__PromiseState.Pending = 0
__TS__PromiseState[__TS__PromiseState.Pending] = "Pending"
__TS__PromiseState.Fulfilled = 1
__TS__PromiseState[__TS__PromiseState.Fulfilled] = "Fulfilled"
__TS__PromiseState.Rejected = 2
__TS__PromiseState[__TS__PromiseState.Rejected] = "Rejected"
function __TS__PromiseDeferred(self)
    local resolve
    local reject
    local promise = __TS__New(
        __TS__Promise,
        function(____, res, rej)
            resolve = res
            reject = rej
        end
    )
    return {promise = promise, resolve = resolve, reject = reject}
end
function __TS__IsPromiseLike(self, thing)
    return __TS__InstanceOf(thing, __TS__Promise)
end
__TS__Promise = __TS__Class()
__TS__Promise.name = "__TS__Promise"
function __TS__Promise.prototype.____constructor(self, executor)
    self.state = __TS__PromiseState.Pending
    self.fulfilledCallbacks = {}
    self.rejectedCallbacks = {}
    self.finallyCallbacks = {}
    do
        local function ____catch(e)
            self:reject(e)
        end
        local ____try, ____hasReturned = pcall(
            function()
                executor(
                    _G,
                    __TS__FunctionBind(self.resolve, self),
                    __TS__FunctionBind(self.reject, self)
                )
            end
        )
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
    end
end
function __TS__Promise.resolve(data)
    local promise = __TS__New(
        __TS__Promise,
        function()
        end
    )
    promise.state = __TS__PromiseState.Fulfilled
    promise.value = data
    return promise
end
function __TS__Promise.reject(reason)
    local promise = __TS__New(
        __TS__Promise,
        function()
        end
    )
    promise.state = __TS__PromiseState.Rejected
    promise.rejectionReason = reason
    return promise
end
__TS__Promise.prototype["then"] = function(self, onFulfilled, onRejected)
    local ____ = __TS__PromiseDeferred(_G)
    local promise = ____.promise
    local resolve = ____.resolve
    local reject = ____.reject
    local isFulfilled = self.state == __TS__PromiseState.Fulfilled
    local isRejected = self.state == __TS__PromiseState.Rejected
    if onFulfilled then
        local internalCallback = self:createPromiseResolvingCallback(onFulfilled, resolve, reject)
        __TS__ArrayPush(self.fulfilledCallbacks, internalCallback)
        if isFulfilled then
            internalCallback(_G, self.value)
        end
    else
        __TS__ArrayPush(
            self.fulfilledCallbacks,
            function() return resolve(_G, nil) end
        )
    end
    if onRejected then
        local internalCallback = self:createPromiseResolvingCallback(onRejected, resolve, reject)
        __TS__ArrayPush(self.rejectedCallbacks, internalCallback)
        if isRejected then
            internalCallback(_G, self.rejectionReason)
        end
    end
    if isFulfilled then
        resolve(_G, self.value)
    end
    if isRejected then
        reject(_G, self.rejectionReason)
    end
    return promise
end
function __TS__Promise.prototype.catch(self, onRejected)
    return self["then"](self, nil, onRejected)
end
function __TS__Promise.prototype.finally(self, onFinally)
    if onFinally then
        __TS__ArrayPush(self.finallyCallbacks, onFinally)
        if self.state ~= __TS__PromiseState.Pending then
            onFinally(_G)
        end
    end
    return self
end
function __TS__Promise.prototype.resolve(self, data)
    if self.state == __TS__PromiseState.Pending then
        self.state = __TS__PromiseState.Fulfilled
        self.value = data
        for ____, callback in ipairs(self.fulfilledCallbacks) do
            callback(_G, data)
        end
        for ____, callback in ipairs(self.finallyCallbacks) do
            callback(_G)
        end
    end
end
function __TS__Promise.prototype.reject(self, reason)
    if self.state == __TS__PromiseState.Pending then
        self.state = __TS__PromiseState.Rejected
        self.rejectionReason = reason
        for ____, callback in ipairs(self.rejectedCallbacks) do
            callback(_G, reason)
        end
        for ____, callback in ipairs(self.finallyCallbacks) do
            callback(_G)
        end
    end
end
function __TS__Promise.prototype.createPromiseResolvingCallback(self, f, resolve, reject)
    return function(____, value)
        do
            local function ____catch(e)
                reject(_G, e)
            end
            local ____try, ____hasReturned = pcall(
                function()
                    self:handleCallbackData(
                        f(_G, value),
                        resolve,
                        reject
                    )
                end
            )
            if not ____try then
                ____hasReturned, ____returnValue = ____catch(____hasReturned)
            end
        end
    end
end
function __TS__Promise.prototype.handleCallbackData(self, data, resolve, reject)
    if __TS__IsPromiseLike(_G, data) then
        local nextpromise = data
        if nextpromise.state == __TS__PromiseState.Fulfilled then
            resolve(_G, nextpromise.value)
        elseif nextpromise.state == __TS__PromiseState.Rejected then
            reject(_G, nextpromise.rejectionReason)
        else
            data["then"](data, resolve, reject)
        end
    else
        resolve(_G, data)
    end
end

function __TS__PromiseAll(iterable)
    local results = {}
    local toResolve = {}
    local numToResolve = 0
    local i = 0
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == __TS__PromiseState.Fulfilled then
                results[i + 1] = item.value
            elseif item.state == __TS__PromiseState.Rejected then
                return __TS__Promise.reject(item.rejectionReason)
            else
                numToResolve = numToResolve + 1
                toResolve[i] = item
            end
        else
            results[i + 1] = item
        end
        i = i + 1
    end
    if numToResolve == 0 then
        return __TS__Promise.resolve(results)
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for index, promise in pairs(toResolve) do
                promise["then"](
                    promise,
                    function(____, data)
                        results[index + 1] = data
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(_G, results)
                        end
                    end,
                    function(____, reason)
                        reject(_G, reason)
                    end
                )
            end
        end
    )
end

function __TS__PromiseAllSettled(iterable)
    local results = {}
    local toResolve = {}
    local numToResolve = 0
    local i = 0
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == __TS__PromiseState.Fulfilled then
                results[i + 1] = {status = "fulfilled", value = item.value}
            elseif item.state == __TS__PromiseState.Rejected then
                results[i + 1] = {status = "rejected", reason = item.rejectionReason}
            else
                numToResolve = numToResolve + 1
                toResolve[i] = item
            end
        else
            results[i + 1] = {status = "fulfilled", value = item}
        end
        i = i + 1
    end
    if numToResolve == 0 then
        return __TS__Promise.resolve(results)
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve)
            for index, promise in pairs(toResolve) do
                promise["then"](
                    promise,
                    function(____, data)
                        results[index + 1] = {status = "fulfilled", value = data}
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(_G, results)
                        end
                    end,
                    function(____, reason)
                        results[index + 1] = {status = "rejected", reason = reason}
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(_G, results)
                        end
                    end
                )
            end
        end
    )
end

function __TS__PromiseAny(iterable)
    local rejections = {}
    local pending = {}
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == __TS__PromiseState.Fulfilled then
                return __TS__Promise.resolve(item.value)
            elseif item.state == __TS__PromiseState.Rejected then
                __TS__ArrayPush(rejections, item.rejectionReason)
            else
                __TS__ArrayPush(pending, item)
            end
        else
            return __TS__Promise.resolve(item)
        end
    end
    if #pending == 0 then
        return __TS__Promise.reject("No promises to resolve with .any()")
    end
    local numResolved = 0
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for ____, promise in ipairs(pending) do
                promise["then"](
                    promise,
                    function(____, data)
                        resolve(_G, data)
                    end,
                    function(____, reason)
                        __TS__ArrayPush(rejections, reason)
                        numResolved = numResolved + 1
                        if numResolved == #pending then
                            reject(_G, {name = "AggregateError", message = "All Promises rejected", errors = rejections})
                        end
                    end
                )
            end
        end
    )
end

function __TS__PromiseRace(iterable)
    local pending = {}
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == __TS__PromiseState.Fulfilled then
                return __TS__Promise.resolve(item.value)
            elseif item.state == __TS__PromiseState.Rejected then
                return __TS__Promise.reject(item.rejectionReason)
            else
                __TS__ArrayPush(pending, item)
            end
        else
            return __TS__Promise.resolve(item)
        end
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for ____, promise in ipairs(pending) do
                promise["then"](
                    promise,
                    function(____, value) return resolve(_G, value) end,
                    function(____, reason) return reject(_G, reason) end
                )
            end
        end
    )
end

Set = (function()
    local Set = __TS__Class()
    Set.name = "Set"
    function Set.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "Set"
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self:add(result.value)
            end
        else
            local array = values
            for ____, value in ipairs(array) do
                self:add(value)
            end
        end
    end
    function Set.prototype.add(self, value)
        local isNewValue = not self:has(value)
        if isNewValue then
            self.size = self.size + 1
        end
        if self.firstKey == nil then
            self.firstKey = value
            self.lastKey = value
        elseif isNewValue then
            self.nextKey[self.lastKey] = value
            self.previousKey[value] = self.lastKey
            self.lastKey = value
        end
        return self
    end
    function Set.prototype.clear(self)
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Set.prototype.delete(self, value)
        local contains = self:has(value)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[value]
            local previous = self.previousKey[value]
            if next and previous then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[value] = nil
            self.previousKey[value] = nil
        end
        return contains
    end
    function Set.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(
            self:keys()
        ) do
            callback(_G, key, key, self)
        end
    end
    function Set.prototype.has(self, value)
        return (self.nextKey[value] ~= nil) or (self.lastKey == value)
    end
    Set.prototype[Symbol.iterator] = function(self)
        return self:values()
    end
    function Set.prototype.entries(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, key}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.values(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    Set[Symbol.species] = Set
    return Set
end)()

WeakMap = (function()
    local WeakMap = __TS__Class()
    WeakMap.name = "WeakMap"
    function WeakMap.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "WeakMap"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self.items[value[1]] = value[2]
            end
        else
            for ____, kvp in ipairs(entries) do
                self.items[kvp[1]] = kvp[2]
            end
        end
    end
    function WeakMap.prototype.delete(self, key)
        local contains = self:has(key)
        self.items[key] = nil
        return contains
    end
    function WeakMap.prototype.get(self, key)
        return self.items[key]
    end
    function WeakMap.prototype.has(self, key)
        return self.items[key] ~= nil
    end
    function WeakMap.prototype.set(self, key, value)
        self.items[key] = value
        return self
    end
    WeakMap[Symbol.species] = WeakMap
    return WeakMap
end)()

WeakSet = (function()
    local WeakSet = __TS__Class()
    WeakSet.name = "WeakSet"
    function WeakSet.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "WeakSet"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self.items[result.value] = true
            end
        else
            for ____, value in ipairs(values) do
                self.items[value] = true
            end
        end
    end
    function WeakSet.prototype.add(self, value)
        self.items[value] = true
        return self
    end
    function WeakSet.prototype.delete(self, value)
        local contains = self:has(value)
        self.items[value] = nil
        return contains
    end
    function WeakSet.prototype.has(self, value)
        return self.items[value] == true
    end
    WeakSet[Symbol.species] = WeakSet
    return WeakSet
end)()

function __TS__SourceMapTraceBack(fileName, sourceMap)
    _G.__TS__sourcemap = _G.__TS__sourcemap or ({})
    _G.__TS__sourcemap[fileName] = sourceMap
    if _G.__TS__originalTraceback == nil then
        _G.__TS__originalTraceback = debug.traceback
        debug.traceback = function(thread, message, level)
            local trace
            if ((thread == nil) and (message == nil)) and (level == nil) then
                trace = _G.__TS__originalTraceback()
            else
                trace = _G.__TS__originalTraceback(thread, message, level)
            end
            if type(trace) ~= "string" then
                return trace
            end
            local function replacer(____, file, srcFile, line)
                local fileSourceMap = _G.__TS__sourcemap[file]
                if fileSourceMap and fileSourceMap[line] then
                    local data = fileSourceMap[line]
                    if type(data) == "number" then
                        return (srcFile .. ":") .. tostring(data)
                    end
                    return (tostring(data.file) .. ":") .. tostring(data.line)
                end
                return (file .. ":") .. line
            end
            local result = string.gsub(
                trace,
                "(%S+)%.lua:(%d+)",
                function(file, line) return replacer(_G, file .. ".lua", file .. ".ts", line) end
            )
            result = string.gsub(
                result,
                "(%[string \"[^\"]+\"%]):(%d+)",
                function(file, line) return replacer(_G, file, "unknown", line) end
            )
            return result
        end
    end
end

function __TS__Spread(iterable)
    local arr = {}
    if type(iterable) == "string" then
        do
            local i = 0
            while i < #iterable do
                arr[#arr + 1] = __TS__StringAccess(iterable, i)
                i = i + 1
            end
        end
    else
        for ____, item in __TS__Iterator(iterable) do
            arr[#arr + 1] = item
        end
    end
    return __TS__Unpack(arr)
end

function __TS__StringCharAt(self, pos)
    if pos ~= pos then
        pos = 0
    end
    if pos < 0 then
        return ""
    end
    return string.sub(self, pos + 1, pos + 1)
end

function __TS__StringCharCodeAt(self, index)
    if index ~= index then
        index = 0
    end
    if index < 0 then
        return 0 / 0
    end
    return string.byte(self, index + 1) or (0 / 0)
end

function __TS__StringConcat(str1, ...)
    local args = {...}
    local out = str1
    for ____, arg in ipairs(args) do
        out = out .. arg
    end
    return out
end

function __TS__StringEndsWith(self, searchString, endPosition)
    if (endPosition == nil) or (endPosition > #self) then
        endPosition = #self
    end
    return string.sub(self, (endPosition - #searchString) + 1, endPosition) == searchString
end

function __TS__StringIncludes(self, searchString, position)
    if not position then
        position = 1
    else
        position = position + 1
    end
    local index = string.find(self, searchString, position, true)
    return index ~= nil
end

function __TS__StringPadEnd(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if (maxLength == -math.huge) or (maxLength == math.huge) then
        error("Invalid string length", 0)
    end
    if (#self >= maxLength) or (#fillString == 0) then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return self .. string.sub(
        fillString,
        1,
        math.floor(maxLength)
    )
end

function __TS__StringPadStart(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if (maxLength == -math.huge) or (maxLength == math.huge) then
        error("Invalid string length", 0)
    end
    if (#self >= maxLength) or (#fillString == 0) then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return string.sub(
        fillString,
        1,
        math.floor(maxLength)
    ) .. self
end

function __TS__StringReplace(source, searchValue, replaceValue)
    local startPos, endPos = string.find(source, searchValue, nil, true)
    if not startPos then
        return source
    end
    local sub = string.sub
    local before = sub(source, 1, startPos - 1)
    local replacement = (((type(replaceValue) == "string") and (function() return replaceValue end)) or (function() return replaceValue(_G, searchValue, startPos - 1, source) end))()
    local after = sub(source, endPos + 1)
    return (before .. replacement) .. after
end

function __TS__StringReplaceAll(source, searchValue, replaceValue)
    local replacer
    if type(replaceValue) == "string" then
        replacer = function() return replaceValue end
    else
        replacer = replaceValue
    end
    local parts = {}
    local partsIndex = 1
    local sub = string.sub
    if #searchValue == 0 then
        parts[1] = replacer(_G, "", 0, source)
        partsIndex = 2
        for i = 1, #source do
            parts[partsIndex] = sub(source, i, i)
            parts[partsIndex + 1] = replacer(_G, "", i, source)
            partsIndex = partsIndex + 2
        end
    else
        local find = string.find
        local currentPos = 1
        while true do
            local startPos, endPos = find(source, searchValue, currentPos, true)
            if not startPos then
                break
            end
            parts[partsIndex] = sub(source, currentPos, startPos - 1)
            parts[partsIndex + 1] = replacer(_G, searchValue, startPos - 1, source)
            partsIndex = partsIndex + 2
            currentPos = endPos + 1
        end
        parts[partsIndex] = sub(source, currentPos)
    end
    return table.concat(parts)
end

function __TS__StringSlice(self, start, ____end)
    if (start == nil) or (start ~= start) then
        start = 0
    end
    if ____end ~= ____end then
        ____end = 0
    end
    if start >= 0 then
        start = start + 1
    end
    if (____end ~= nil) and (____end < 0) then
        ____end = ____end - 1
    end
    return string.sub(self, start, ____end)
end

function __TS__StringSplit(source, separator, limit)
    if limit == nil then
        limit = 4294967295
    end
    if limit == 0 then
        return {}
    end
    local out = {}
    local index = 0
    local count = 0
    if (separator == nil) or (separator == "") then
        while (index < (#source - 1)) and (count < limit) do
            out[count + 1] = __TS__StringAccess(source, index)
            count = count + 1
            index = index + 1
        end
    else
        local separatorLength = #separator
        local nextIndex = (string.find(source, separator, nil, true) or 0) - 1
        while (nextIndex >= 0) and (count < limit) do
            out[count + 1] = __TS__StringSubstring(source, index, nextIndex)
            count = count + 1
            index = nextIndex + separatorLength
            nextIndex = (string.find(
                source,
                separator,
                math.max(index + 1, 1),
                true
            ) or 0) - 1
        end
    end
    if count < limit then
        out[count + 1] = __TS__StringSubstring(source, index)
    end
    return out
end

function __TS__StringStartsWith(self, searchString, position)
    if (position == nil) or (position < 0) then
        position = 0
    end
    return string.sub(self, position + 1, #searchString + position) == searchString
end

function __TS__StringTrim(self)
    local result = string.gsub(self, "^[%s ﻿]*(.-)[%s ﻿]*$", "%1")
    return result
end

function __TS__StringTrimEnd(self)
    local result = string.gsub(self, "[%s ﻿]*$", "")
    return result
end

function __TS__StringTrimStart(self)
    local result = string.gsub(self, "^[%s ﻿]*", "")
    return result
end

____symbolRegistry = {}
function __TS__SymbolRegistryFor(key)
    if not ____symbolRegistry[key] then
        ____symbolRegistry[key] = __TS__Symbol(key)
    end
    return ____symbolRegistry[key]
end
function __TS__SymbolRegistryKeyFor(sym)
    for key in pairs(____symbolRegistry) do
        if ____symbolRegistry[key] == sym then
            return key
        end
    end
end

function __TS__TypeOf(value)
    local luaType = type(value)
    if luaType == "table" then
        return "object"
    elseif luaType == "nil" then
        return "undefined"
    else
        return luaType
    end
end

 end,
["common.src.constants"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.IS_DEV = true
____exports.TCP_PORT = 9122
____exports.UDP_PORT = 9123
____exports.MIN_PLAYERS = 4
____exports.MAX_PLAYERS = 15
____exports.NOT_VOTED_YET = -1
____exports.VOTE_SKIP = -2
return ____exports
 end,
["common.src.types.SkeldRoom"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local TASK_ROOM_VARIANT = 98
____exports.SkeldRoom = SkeldRoom or ({})
____exports.SkeldRoom.CAFETERIA = 0
____exports.SkeldRoom[____exports.SkeldRoom.CAFETERIA] = "CAFETERIA"
____exports.SkeldRoom.ADMIN_HALL = 1
____exports.SkeldRoom[____exports.SkeldRoom.ADMIN_HALL] = "ADMIN_HALL"
____exports.SkeldRoom.ADMIN = 2
____exports.SkeldRoom[____exports.SkeldRoom.ADMIN] = "ADMIN"
____exports.SkeldRoom.STORAGE = 3
____exports.SkeldRoom[____exports.SkeldRoom.STORAGE] = "STORAGE"
____exports.SkeldRoom.MEDBAY_HALL = 4
____exports.SkeldRoom[____exports.SkeldRoom.MEDBAY_HALL] = "MEDBAY_HALL"
____exports.SkeldRoom.MEDBAY = 5
____exports.SkeldRoom[____exports.SkeldRoom.MEDBAY] = "MEDBAY"
____exports.SkeldRoom.UPPER_ENGINE = 6
____exports.SkeldRoom[____exports.SkeldRoom.UPPER_ENGINE] = "UPPER_ENGINE"
____exports.SkeldRoom.ENGINE_HALL = 7
____exports.SkeldRoom[____exports.SkeldRoom.ENGINE_HALL] = "ENGINE_HALL"
____exports.SkeldRoom.REACTOR = 8
____exports.SkeldRoom[____exports.SkeldRoom.REACTOR] = "REACTOR"
____exports.SkeldRoom.SECURITY = 9
____exports.SkeldRoom[____exports.SkeldRoom.SECURITY] = "SECURITY"
____exports.SkeldRoom.LOWER_ENGINE = 10
____exports.SkeldRoom[____exports.SkeldRoom.LOWER_ENGINE] = "LOWER_ENGINE"
____exports.SkeldRoom.ELECTRICAL_HALL = 11
____exports.SkeldRoom[____exports.SkeldRoom.ELECTRICAL_HALL] = "ELECTRICAL_HALL"
____exports.SkeldRoom.ELECTRICAL = 12
____exports.SkeldRoom[____exports.SkeldRoom.ELECTRICAL] = "ELECTRICAL"
____exports.SkeldRoom.WEAPONS = 13
____exports.SkeldRoom[____exports.SkeldRoom.WEAPONS] = "WEAPONS"
____exports.SkeldRoom.O2_HALL = 14
____exports.SkeldRoom[____exports.SkeldRoom.O2_HALL] = "O2_HALL"
____exports.SkeldRoom.O2 = 15
____exports.SkeldRoom[____exports.SkeldRoom.O2] = "O2"
____exports.SkeldRoom.NAVIGATION = 16
____exports.SkeldRoom[____exports.SkeldRoom.NAVIGATION] = "NAVIGATION"
____exports.SkeldRoom.NAVIGATION_HALL = 17
____exports.SkeldRoom[____exports.SkeldRoom.NAVIGATION_HALL] = "NAVIGATION_HALL"
____exports.SkeldRoom.SHIELDS = 18
____exports.SkeldRoom[____exports.SkeldRoom.SHIELDS] = "SHIELDS"
____exports.SkeldRoom.COMMUNICATION_HALL = 19
____exports.SkeldRoom[____exports.SkeldRoom.COMMUNICATION_HALL] = "COMMUNICATION_HALL"
____exports.SkeldRoom.COMMUNICATION = 20
____exports.SkeldRoom[____exports.SkeldRoom.COMMUNICATION] = "COMMUNICATION"
____exports.SkeldRoom.TASK = TASK_ROOM_VARIANT
____exports.SkeldRoom[____exports.SkeldRoom.TASK] = "TASK"
return ____exports
 end,
["common.src.types.Task"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.Task = Task or ({})
____exports.Task.SHORT_DESTROY_GIANT_POOP = 0
____exports.Task[____exports.Task.SHORT_DESTROY_GIANT_POOP] = "SHORT_DESTROY_GIANT_POOP"
____exports.Task.SHORT_BOMB_ROCKS = 1
____exports.Task[____exports.Task.SHORT_BOMB_ROCKS] = "SHORT_BOMB_ROCKS"
____exports.Task.SHORT_IDENTIFY_ITEMS = 2
____exports.Task[____exports.Task.SHORT_IDENTIFY_ITEMS] = "SHORT_IDENTIFY_ITEMS"
____exports.Task.SHORT_IDENTIFY_TRINKETS = 3
____exports.Task[____exports.Task.SHORT_IDENTIFY_TRINKETS] = "SHORT_IDENTIFY_TRINKETS"
____exports.Task.SHORT_LOAD_SLOT_MACHINES = 4
____exports.Task[____exports.Task.SHORT_LOAD_SLOT_MACHINES] = "SHORT_LOAD_SLOT_MACHINES"
____exports.Task.SHORT_MAKE_PENTAGRAM = 5
____exports.Task[____exports.Task.SHORT_MAKE_PENTAGRAM] = "SHORT_MAKE_PENTAGRAM"
____exports.Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE = 6
____exports.Task[____exports.Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE] = "SHORT_PRESS_BUTTONS_WITH_GRUDGE"
____exports.Task.SHORT_FIX_WIRES = 7
____exports.Task[____exports.Task.SHORT_FIX_WIRES] = "SHORT_FIX_WIRES"
____exports.Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES = 8
____exports.Task[____exports.Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES] = "SHORT_WALK_DIAGONALLY_THROUGH_SPIKES"
____exports.Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS = 9
____exports.Task[____exports.Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS] = "SHORT_WALK_BETWEEN_SUCTION_PITFALLS"
____exports.Task.SHORT_WALK_BETWEEN_SLIDES = 10
____exports.Task[____exports.Task.SHORT_WALK_BETWEEN_SLIDES] = "SHORT_WALK_BETWEEN_SLIDES"
____exports.Task.SHORT_PUSH_TNT_BARREL = 11
____exports.Task[____exports.Task.SHORT_PUSH_TNT_BARREL] = "SHORT_PUSH_TNT_BARREL"
____exports.Task.LONG_IDENTIFY_PICKUPS_IN_ORDER = 12
____exports.Task[____exports.Task.LONG_IDENTIFY_PICKUPS_IN_ORDER] = "LONG_IDENTIFY_PICKUPS_IN_ORDER"
____exports.Task.LONG_COLLECT_GOLDEN_PENNY = 13
____exports.Task[____exports.Task.LONG_COLLECT_GOLDEN_PENNY] = "LONG_COLLECT_GOLDEN_PENNY"
____exports.Task.LONG_KILL_WORMS = 14
____exports.Task[____exports.Task.LONG_KILL_WORMS] = "LONG_KILL_WORMS"
____exports.Task.LONG_BUTTONS_BEHIND_KEY_BLOCKS = 15
____exports.Task[____exports.Task.LONG_BUTTONS_BEHIND_KEY_BLOCKS] = "LONG_BUTTONS_BEHIND_KEY_BLOCKS"
____exports.Task.LONG_DODGE_RETRACTING_SPIKES = 16
____exports.Task[____exports.Task.LONG_DODGE_RETRACTING_SPIKES] = "LONG_DODGE_RETRACTING_SPIKES"
____exports.Task.LONG_PUSH_BUTTONS_IN_ORDER = 17
____exports.Task[____exports.Task.LONG_PUSH_BUTTONS_IN_ORDER] = "LONG_PUSH_BUTTONS_IN_ORDER"
____exports.Task.LONG_DODGE_STONE_SHOOTERS = 18
____exports.Task[____exports.Task.LONG_DODGE_STONE_SHOOTERS] = "LONG_DODGE_STONE_SHOOTERS"
____exports.Task.LONG_DEFEAT_MONSTRO = 19
____exports.Task[____exports.Task.LONG_DEFEAT_MONSTRO] = "LONG_DEFEAT_MONSTRO"
return ____exports
 end,
["common.src.types.TaskType"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.TaskType = TaskType or ({})
____exports.TaskType.SHORT = "short"
____exports.TaskType.LONG = "long"
____exports.TaskType.COMMON = "common"
return ____exports
 end,
["common.src.types.TaskDescription"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["common.src.taskDescriptions"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____SkeldRoom = require("common.src.types.SkeldRoom")
local SkeldRoom = ____SkeldRoom.SkeldRoom
local ____Task = require("common.src.types.Task")
local Task = ____Task.Task
local ____TaskType = require("common.src.types.TaskType")
local TaskType = ____TaskType.TaskType
____exports.taskDescriptions = {[Task.SHORT_DESTROY_GIANT_POOP] = {name = "Toilet Cleaning", taskType = TaskType.SHORT, room = SkeldRoom.CAFETERIA, gridIndex = 418, returnGridIndex = 416}, [Task.SHORT_BOMB_ROCKS] = {name = "Debris Clearing", taskType = TaskType.SHORT, room = SkeldRoom.UPPER_ENGINE, gridIndex = 228, returnGridIndex = 230}, [Task.SHORT_IDENTIFY_ITEMS] = {name = "Item Calibration", taskType = TaskType.SHORT, room = SkeldRoom.SECURITY, gridIndex = 56, returnGridIndex = 54}, [Task.SHORT_IDENTIFY_TRINKETS] = {name = "Trinket Calibration", taskType = TaskType.SHORT, room = SkeldRoom.SECURITY, gridIndex = 102, returnGridIndex = 100}, [Task.SHORT_LOAD_SLOT_MACHINES] = {name = "Engine Boosting", taskType = TaskType.SHORT, room = SkeldRoom.LOWER_ENGINE, gridIndex = 368, returnGridIndex = 370}, [Task.SHORT_MAKE_PENTAGRAM] = {name = "Summon Devil", taskType = TaskType.SHORT, room = SkeldRoom.COMMUNICATION, gridIndex = 108, returnGridIndex = 110}, [Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE] = {name = "Shutdown Robotics", taskType = TaskType.SHORT, room = SkeldRoom.SHIELDS, gridIndex = 91, returnGridIndex = 93}, [Task.SHORT_FIX_WIRES] = {name = "Fix Wires", taskType = TaskType.SHORT, room = SkeldRoom.ELECTRICAL, gridIndex = 57, returnGridIndex = 55}, [Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES] = {name = "Disengage Thruster", taskType = TaskType.SHORT, room = SkeldRoom.WEAPONS, gridIndex = 101, returnGridIndex = 99}, [Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS] = {name = "Repair Ship Hull", taskType = TaskType.SHORT, room = SkeldRoom.STORAGE, gridIndex = 190, returnGridIndex = 192}, [Task.SHORT_WALK_BETWEEN_SLIDES] = {name = "Deactivate Drones", taskType = TaskType.SHORT, room = SkeldRoom.ELECTRICAL, gridIndex = 48, returnGridIndex = 50}, [Task.SHORT_PUSH_TNT_BARREL] = {name = "Explode Excess Material", taskType = TaskType.SHORT, room = SkeldRoom.REACTOR, gridIndex = 106, returnGridIndex = 108}, [Task.LONG_IDENTIFY_PICKUPS_IN_ORDER] = {name = "Pickup Calibration", taskType = TaskType.LONG, room = SkeldRoom.ADMIN, gridIndex = 118, returnGridIndex = 116}, [Task.LONG_COLLECT_GOLDEN_PENNY] = {name = "Collect Spare Cash", taskType = TaskType.LONG, room = SkeldRoom.ADMIN, gridIndex = 17, returnGridIndex = 47}, [Task.LONG_KILL_WORMS] = {name = "Kill Space Worms", taskType = TaskType.LONG, room = SkeldRoom.MEDBAY, gridIndex = 109, returnGridIndex = 111}, [Task.LONG_BUTTONS_BEHIND_KEY_BLOCKS] = {name = "Recover Locked Hard Drives", taskType = TaskType.LONG, room = SkeldRoom.COMMUNICATION, gridIndex = 46, returnGridIndex = 48}, [Task.LONG_DODGE_RETRACTING_SPIKES] = {name = "Retrieve Fuel", taskType = TaskType.LONG, room = SkeldRoom.STORAGE, gridIndex = 170, returnGridIndex = 168}, [Task.LONG_PUSH_BUTTONS_IN_ORDER] = {name = "Plot Ship Course", taskType = TaskType.LONG, room = SkeldRoom.NAVIGATION, gridIndex = 71, returnGridIndex = 69}, [Task.LONG_DODGE_STONE_SHOOTERS] = {name = "Suppress Enemy Fire", taskType = TaskType.LONG, room = SkeldRoom.WEAPONS, gridIndex = 244, returnGridIndex = 242}, [Task.LONG_DEFEAT_MONSTRO] = {name = "Defeat Space Blob", taskType = TaskType.LONG, room = SkeldRoom.O2, gridIndex = 61, returnGridIndex = 63}}
return ____exports
 end,
["mod.src.constants"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local ISAAC_FRAMES_PER_SECOND = ____isaacscript_2Dcommon.ISAAC_FRAMES_PER_SECOND
local ____constants = require("common.src.constants")
local IS_DEV = ____constants.IS_DEV
do
    local ____constants = require("common.src.constants")
    local IS_DEV = ____constants.IS_DEV
    local MAX_PLAYERS = ____constants.MAX_PLAYERS
    local NOT_VOTED_YET = ____constants.NOT_VOTED_YET
    local TCP_PORT = ____constants.TCP_PORT
    local UDP_PORT = ____constants.UDP_PORT
    ____exports.IS_DEV = IS_DEV
    ____exports.MAX_PLAYERS = MAX_PLAYERS
    ____exports.NOT_VOTED_YET = NOT_VOTED_YET
    ____exports.TCP_PORT = TCP_PORT
    ____exports.UDP_PORT = UDP_PORT
end
do
    local ____taskDescriptions = require("common.src.taskDescriptions")
    local taskDescriptions = ____taskDescriptions.taskDescriptions
    ____exports.taskDescriptions = taskDescriptions
end
____exports.MOD_NAME = "Among Us"
____exports.LOBBY_ROOM_INDEX = 1000
____exports.REMOTE_HOSTNAME = (IS_DEV and "192.168.1.10") or "isaacracing.net"
____exports.SOCKET_CONNECT_TIMEOUT_SECONDS = 1
____exports.SOCKET_CLIENT_RETURN_SUCCESS = 1
____exports.UDP_BEACON_INTERVAL = 10 * ISAAC_FRAMES_PER_SECOND
____exports.UDP_BEACON_FIELDS = {"gameID", "userID", "message"}
____exports.UDP_BEACON_DATA_FORMAT = "IIc5"
____exports.UDP_BEACON_MESSAGE = "HELLO"
____exports.UDP_POSITION_FIELDS = {"gameID", "userID", "x", "y", "roomIndex", "animation", "animationFrame", "overlayAnimation", "overlayAnimationFrame"}
____exports.UDP_POSITION_DATA_FORMAT = "IIffIc20Ic20I"
____exports.VERSION = "0.0.1"
return ____exports
 end,
["mod.src.types.CutsceneState"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.CutsceneState = CutsceneState or ({})
____exports.CutsceneState.DISABLED = 0
____exports.CutsceneState[____exports.CutsceneState.DISABLED] = "DISABLED"
____exports.CutsceneState.FADING_TO_BLACK = 1
____exports.CutsceneState[____exports.CutsceneState.FADING_TO_BLACK] = "FADING_TO_BLACK"
____exports.CutsceneState.TEXT_FADING_IN = 2
____exports.CutsceneState[____exports.CutsceneState.TEXT_FADING_IN] = "TEXT_FADING_IN"
____exports.CutsceneState.TEXT = 3
____exports.CutsceneState[____exports.CutsceneState.TEXT] = "TEXT"
____exports.CutsceneState.TEXT_FADING_OUT = 4
____exports.CutsceneState[____exports.CutsceneState.TEXT_FADING_OUT] = "TEXT_FADING_OUT"
____exports.CutsceneState.FADING_TO_GAME = 5
____exports.CutsceneState[____exports.CutsceneState.FADING_TO_GAME] = "FADING_TO_GAME"
return ____exports
 end,
["mod.src.types.EndMeetingState"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.EndMeetingState = EndMeetingState or ({})
____exports.EndMeetingState.DISABLED = 0
____exports.EndMeetingState[____exports.EndMeetingState.DISABLED] = "DISABLED"
____exports.EndMeetingState.FADING_TO_BLACK = 1
____exports.EndMeetingState[____exports.EndMeetingState.FADING_TO_BLACK] = "FADING_TO_BLACK"
____exports.EndMeetingState.TEXT_FADING_IN = 2
____exports.EndMeetingState[____exports.EndMeetingState.TEXT_FADING_IN] = "TEXT_FADING_IN"
____exports.EndMeetingState.TEXT = 3
____exports.EndMeetingState[____exports.EndMeetingState.TEXT] = "TEXT"
____exports.EndMeetingState.TEXT_FADING_OUT = 4
____exports.EndMeetingState[____exports.EndMeetingState.TEXT_FADING_OUT] = "TEXT_FADING_OUT"
____exports.EndMeetingState.FADING_TO_GAME = 5
____exports.EndMeetingState[____exports.EndMeetingState.FADING_TO_GAME] = "FADING_TO_GAME"
return ____exports
 end,
["common.src.types.MeetingPhase"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.MeetingPhase = MeetingPhase or ({})
____exports.MeetingPhase.PRE_VOTING = 0
____exports.MeetingPhase[____exports.MeetingPhase.PRE_VOTING] = "PRE_VOTING"
____exports.MeetingPhase.VOTING = 1
____exports.MeetingPhase[____exports.MeetingPhase.VOTING] = "VOTING"
return ____exports
 end,
["common.src.types.MeetingType"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.MeetingType = MeetingType or ({})
____exports.MeetingType.NONE = 0
____exports.MeetingType[____exports.MeetingType.NONE] = "NONE"
____exports.MeetingType.REPORT_BODY = 1
____exports.MeetingType[____exports.MeetingType.REPORT_BODY] = "REPORT_BODY"
____exports.MeetingType.EMERGENCY = 2
____exports.MeetingType[____exports.MeetingType.EMERGENCY] = "EMERGENCY"
return ____exports
 end,
["common.src.types.Meeting"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["mod.src.types.Meeting"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["common.src.types.MeetingResolution"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.MeetingResolution = MeetingResolution or ({})
____exports.MeetingResolution.NO_EJECT = 0
____exports.MeetingResolution[____exports.MeetingResolution.NO_EJECT] = "NO_EJECT"
____exports.MeetingResolution.EJECT = 1
____exports.MeetingResolution[____exports.MeetingResolution.EJECT] = "EJECT"
return ____exports
 end,
["mod.src.types.MeetingResolution"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
do
    local ____export = require("common.src.types.MeetingResolution")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
return ____exports
 end,
["mod.src.types.PlayerData"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["common.src.types.Role"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.Role = Role or ({})
____exports.Role.CREW = 0
____exports.Role[____exports.Role.CREW] = "CREW"
____exports.Role.IMPOSTER = 1
____exports.Role[____exports.Role.IMPOSTER] = "IMPOSTER"
return ____exports
 end,
["mod.src.types.Role"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
do
    local ____export = require("common.src.types.Role")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
return ____exports
 end,
["common.src.types.PlayerType"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.PlayerType = PlayerType or ({})
____exports.PlayerType.PLAYER_ISAAC = 0
____exports.PlayerType[____exports.PlayerType.PLAYER_ISAAC] = "PLAYER_ISAAC"
____exports.PlayerType.PLAYER_MAGDALENA = 1
____exports.PlayerType[____exports.PlayerType.PLAYER_MAGDALENA] = "PLAYER_MAGDALENA"
____exports.PlayerType.PLAYER_CAIN = 2
____exports.PlayerType[____exports.PlayerType.PLAYER_CAIN] = "PLAYER_CAIN"
____exports.PlayerType.PLAYER_JUDAS = 3
____exports.PlayerType[____exports.PlayerType.PLAYER_JUDAS] = "PLAYER_JUDAS"
____exports.PlayerType.PLAYER_EVE = 5
____exports.PlayerType[____exports.PlayerType.PLAYER_EVE] = "PLAYER_EVE"
____exports.PlayerType.PLAYER_SAMSON = 6
____exports.PlayerType[____exports.PlayerType.PLAYER_SAMSON] = "PLAYER_SAMSON"
____exports.PlayerType.PLAYER_LAZARUS = 8
____exports.PlayerType[____exports.PlayerType.PLAYER_LAZARUS] = "PLAYER_LAZARUS"
____exports.PlayerType.PLAYER_EDEN = 9
____exports.PlayerType[____exports.PlayerType.PLAYER_EDEN] = "PLAYER_EDEN"
____exports.PlayerType.PLAYER_LILITH = 13
____exports.PlayerType[____exports.PlayerType.PLAYER_LILITH] = "PLAYER_LILITH"
____exports.PlayerType.PLAYER_BETHANY = 18
____exports.PlayerType[____exports.PlayerType.PLAYER_BETHANY] = "PLAYER_BETHANY"
____exports.PlayerType.PLAYER_JACOB = 19
____exports.PlayerType[____exports.PlayerType.PLAYER_JACOB] = "PLAYER_JACOB"
____exports.PlayerType.PLAYER_ISAAC_B = 21
____exports.PlayerType[____exports.PlayerType.PLAYER_ISAAC_B] = "PLAYER_ISAAC_B"
____exports.PlayerType.PLAYER_MAGDALENA_B = 22
____exports.PlayerType[____exports.PlayerType.PLAYER_MAGDALENA_B] = "PLAYER_MAGDALENA_B"
____exports.PlayerType.PLAYER_CAIN_B = 23
____exports.PlayerType[____exports.PlayerType.PLAYER_CAIN_B] = "PLAYER_CAIN_B"
____exports.PlayerType.PLAYER_JUDAS_B = 24
____exports.PlayerType[____exports.PlayerType.PLAYER_JUDAS_B] = "PLAYER_JUDAS_B"
return ____exports
 end,
["common.src.types.TaskList"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["common.src.types.SocketCommands"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____MeetingType = require("common.src.types.MeetingType")
local MeetingType = ____MeetingType.MeetingType
local ____SkeldRoom = require("common.src.types.SkeldRoom")
local SkeldRoom = ____SkeldRoom.SkeldRoom
____exports.SocketCommandModToServer = SocketCommandModToServer or ({})
____exports.SocketCommandModToServer.PING = "ping"
____exports.SocketCommandModToServer.CHECK_USERNAME = "checkUsername"
____exports.SocketCommandModToServer.LOGIN = "login"
____exports.SocketCommandModToServer.GAME_LIST = "gameList"
____exports.SocketCommandModToServer.CREATE = "create"
____exports.SocketCommandModToServer.JOIN = "join"
____exports.SocketCommandModToServer.LEAVE = "leave"
____exports.SocketCommandModToServer.CHAT = "chat"
____exports.SocketCommandModToServer.START = "start"
____exports.SocketCommandModToServer.RECONNECT = "reconnect"
____exports.SocketCommandModToServer.ROOM = "room"
____exports.SocketCommandModToServer.KILL = "kill"
____exports.SocketCommandModToServer.MEETING = "meeting"
____exports.SocketCommandModToServer.VOTE = "vote"
____exports.SocketCommandModToServer.TASK_COMPLETE = "taskComplete"
____exports.SocketCommandModToServer.TERMINATE = "terminate"
____exports.SocketCommandModToServer.DEBUG = "debug"
____exports.CheckUsernameDataToServer = __TS__Class()
local CheckUsernameDataToServer = ____exports.CheckUsernameDataToServer
CheckUsernameDataToServer.name = "CheckUsernameDataToServer"
function CheckUsernameDataToServer.prototype.____constructor(self)
    self.username = ""
end
____exports.LoginDataToServer = __TS__Class()
local LoginDataToServer = ____exports.LoginDataToServer
LoginDataToServer.name = "LoginDataToServer"
function LoginDataToServer.prototype.____constructor(self)
    self.username = ""
    self.password = ""
end
____exports.CreateDataToServer = __TS__Class()
local CreateDataToServer = ____exports.CreateDataToServer
CreateDataToServer.name = "CreateDataToServer"
function CreateDataToServer.prototype.____constructor(self)
    self.name = ""
end
____exports.JoinDataToServer = __TS__Class()
local JoinDataToServer = ____exports.JoinDataToServer
JoinDataToServer.name = "JoinDataToServer"
function JoinDataToServer.prototype.____constructor(self)
    self.name = ""
    self.created = false
end
____exports.LeaveDataToServer = __TS__Class()
local LeaveDataToServer = ____exports.LeaveDataToServer
LeaveDataToServer.name = "LeaveDataToServer"
function LeaveDataToServer.prototype.____constructor(self)
    self.gameID = 0
end
____exports.ChatDataToServer = __TS__Class()
local ChatDataToServer = ____exports.ChatDataToServer
ChatDataToServer.name = "ChatDataToServer"
function ChatDataToServer.prototype.____constructor(self)
    self.gameID = 0
    self.msg = ""
end
____exports.StartDataToServer = __TS__Class()
local StartDataToServer = ____exports.StartDataToServer
StartDataToServer.name = "StartDataToServer"
function StartDataToServer.prototype.____constructor(self)
    self.gameID = 0
end
____exports.ReconnectDataToServer = __TS__Class()
local ReconnectDataToServer = ____exports.ReconnectDataToServer
ReconnectDataToServer.name = "ReconnectDataToServer"
function ReconnectDataToServer.prototype.____constructor(self)
    self.gameID = 0
end
____exports.RoomDataToServer = __TS__Class()
local RoomDataToServer = ____exports.RoomDataToServer
RoomDataToServer.name = "RoomDataToServer"
function RoomDataToServer.prototype.____constructor(self)
    self.gameID = 0
    self.room = SkeldRoom.CAFETERIA
    self.enterDoor = 0
end
____exports.KillDataToServer = __TS__Class()
local KillDataToServer = ____exports.KillDataToServer
KillDataToServer.name = "KillDataToServer"
function KillDataToServer.prototype.____constructor(self)
    self.gameID = 0
    self.userIDKilled = 0
    self.room = SkeldRoom.CAFETERIA
    self.x = 0
    self.y = 0
end
____exports.MeetingDataToServer = __TS__Class()
local MeetingDataToServer = ____exports.MeetingDataToServer
MeetingDataToServer.name = "MeetingDataToServer"
function MeetingDataToServer.prototype.____constructor(self)
    self.gameID = 0
    self.meetingType = MeetingType.NONE
    self.userIDKilled = 0
end
____exports.VoteDataToServer = __TS__Class()
local VoteDataToServer = ____exports.VoteDataToServer
VoteDataToServer.name = "VoteDataToServer"
function VoteDataToServer.prototype.____constructor(self)
    self.gameID = 0
    self.userIDVotedFor = 0
    self.skip = false
end
____exports.TaskCompleteDataToServer = __TS__Class()
local TaskCompleteDataToServer = ____exports.TaskCompleteDataToServer
TaskCompleteDataToServer.name = "TaskCompleteDataToServer"
function TaskCompleteDataToServer.prototype.____constructor(self)
    self.gameID = 0
    self.task = 0
end
____exports.TerminateDataToServer = __TS__Class()
local TerminateDataToServer = ____exports.TerminateDataToServer
TerminateDataToServer.name = "TerminateDataToServer"
function TerminateDataToServer.prototype.____constructor(self)
    self.gameID = 0
end
____exports.NoData = __TS__Class()
local NoData = ____exports.NoData
NoData.name = "NoData"
function NoData.prototype.____constructor(self)
end
____exports.SocketCommandModToServerData = {[____exports.SocketCommandModToServer.PING] = ____exports.NoData, [____exports.SocketCommandModToServer.CHECK_USERNAME] = ____exports.CheckUsernameDataToServer, [____exports.SocketCommandModToServer.LOGIN] = ____exports.LoginDataToServer, [____exports.SocketCommandModToServer.GAME_LIST] = ____exports.NoData, [____exports.SocketCommandModToServer.CREATE] = ____exports.CreateDataToServer, [____exports.SocketCommandModToServer.JOIN] = ____exports.JoinDataToServer, [____exports.SocketCommandModToServer.LEAVE] = ____exports.LeaveDataToServer, [____exports.SocketCommandModToServer.CHAT] = ____exports.ChatDataToServer, [____exports.SocketCommandModToServer.START] = ____exports.StartDataToServer, [____exports.SocketCommandModToServer.RECONNECT] = ____exports.ReconnectDataToServer, [____exports.SocketCommandModToServer.ROOM] = ____exports.RoomDataToServer, [____exports.SocketCommandModToServer.KILL] = ____exports.KillDataToServer, [____exports.SocketCommandModToServer.MEETING] = ____exports.MeetingDataToServer, [____exports.SocketCommandModToServer.VOTE] = ____exports.VoteDataToServer, [____exports.SocketCommandModToServer.TASK_COMPLETE] = ____exports.TaskCompleteDataToServer, [____exports.SocketCommandModToServer.TERMINATE] = ____exports.TerminateDataToServer, [____exports.SocketCommandModToServer.DEBUG] = ____exports.NoData}
____exports.SocketCommandServerToMod = SocketCommandServerToMod or ({})
____exports.SocketCommandServerToMod.ERROR = "error"
____exports.SocketCommandServerToMod.USERNAME = "username"
____exports.SocketCommandServerToMod.LOGGED_IN = "loggedIn"
____exports.SocketCommandServerToMod.GAME_LIST = "gameList"
____exports.SocketCommandServerToMod.JOINED = "joined"
____exports.SocketCommandServerToMod.LEFT = "left"
____exports.SocketCommandServerToMod.GAME_DESCRIPTION = "gameDescription"
____exports.SocketCommandServerToMod.CHAT = "chat"
____exports.SocketCommandServerToMod.STARTED = "started"
____exports.SocketCommandServerToMod.RECONNECT = "reconnect"
____exports.SocketCommandServerToMod.KILLED = "killed"
____exports.SocketCommandServerToMod.START_MEETING = "startMeeting"
____exports.SocketCommandServerToMod.START_VOTING = "startVoting"
____exports.SocketCommandServerToMod.VOTE = "vote"
____exports.SocketCommandServerToMod.END_MEETING = "endMeeting"
____exports.SocketCommandServerToMod.END_GAME = "endGame"
____exports.SocketCommandServerToMod.TERMINATED = "terminated"
____exports.ErrorDataToMod = __TS__Class()
local ErrorDataToMod = ____exports.ErrorDataToMod
ErrorDataToMod.name = "ErrorDataToMod"
function ErrorDataToMod.prototype.____constructor(self)
end
____exports.UsernameDataToMod = __TS__Class()
local UsernameDataToMod = ____exports.UsernameDataToMod
UsernameDataToMod.name = "UsernameDataToMod"
function UsernameDataToMod.prototype.____constructor(self)
end
____exports.LoggedInDataToMod = __TS__Class()
local LoggedInDataToMod = ____exports.LoggedInDataToMod
LoggedInDataToMod.name = "LoggedInDataToMod"
function LoggedInDataToMod.prototype.____constructor(self)
end
____exports.GameListDataToMod = __TS__Class()
local GameListDataToMod = ____exports.GameListDataToMod
GameListDataToMod.name = "GameListDataToMod"
function GameListDataToMod.prototype.____constructor(self)
end
____exports.GameListDescription = __TS__Class()
local GameListDescription = ____exports.GameListDescription
GameListDescription.name = "GameListDescription"
function GameListDescription.prototype.____constructor(self)
end
____exports.JoinedDataToMod = __TS__Class()
local JoinedDataToMod = ____exports.JoinedDataToMod
JoinedDataToMod.name = "JoinedDataToMod"
function JoinedDataToMod.prototype.____constructor(self)
end
____exports.LeftDataToMod = __TS__Class()
local LeftDataToMod = ____exports.LeftDataToMod
LeftDataToMod.name = "LeftDataToMod"
function LeftDataToMod.prototype.____constructor(self)
end
____exports.GameDescriptionDataToMod = __TS__Class()
local GameDescriptionDataToMod = ____exports.GameDescriptionDataToMod
GameDescriptionDataToMod.name = "GameDescriptionDataToMod"
function GameDescriptionDataToMod.prototype.____constructor(self)
end
____exports.GameDescriptionPlayer = __TS__Class()
local GameDescriptionPlayer = ____exports.GameDescriptionPlayer
GameDescriptionPlayer.name = "GameDescriptionPlayer"
function GameDescriptionPlayer.prototype.____constructor(self)
end
____exports.ChatDataToMod = __TS__Class()
local ChatDataToMod = ____exports.ChatDataToMod
ChatDataToMod.name = "ChatDataToMod"
function ChatDataToMod.prototype.____constructor(self)
end
____exports.StartedDataToMod = __TS__Class()
local StartedDataToMod = ____exports.StartedDataToMod
StartedDataToMod.name = "StartedDataToMod"
function StartedDataToMod.prototype.____constructor(self)
end
____exports.ReconnectDataToMod = __TS__Class()
local ReconnectDataToMod = ____exports.ReconnectDataToMod
ReconnectDataToMod.name = "ReconnectDataToMod"
function ReconnectDataToMod.prototype.____constructor(self)
end
____exports.KilledDataToMod = __TS__Class()
local KilledDataToMod = ____exports.KilledDataToMod
KilledDataToMod.name = "KilledDataToMod"
function KilledDataToMod.prototype.____constructor(self)
end
____exports.StartMeetingDataToMod = __TS__Class()
local StartMeetingDataToMod = ____exports.StartMeetingDataToMod
StartMeetingDataToMod.name = "StartMeetingDataToMod"
function StartMeetingDataToMod.prototype.____constructor(self)
end
____exports.StartVotingDataToMod = __TS__Class()
local StartVotingDataToMod = ____exports.StartVotingDataToMod
StartVotingDataToMod.name = "StartVotingDataToMod"
function StartVotingDataToMod.prototype.____constructor(self)
end
____exports.VoteDataToMod = __TS__Class()
local VoteDataToMod = ____exports.VoteDataToMod
VoteDataToMod.name = "VoteDataToMod"
function VoteDataToMod.prototype.____constructor(self)
end
____exports.TaskCompleteDataToMod = __TS__Class()
local TaskCompleteDataToMod = ____exports.TaskCompleteDataToMod
TaskCompleteDataToMod.name = "TaskCompleteDataToMod"
function TaskCompleteDataToMod.prototype.____constructor(self)
end
____exports.EndMeetingDataToMod = __TS__Class()
local EndMeetingDataToMod = ____exports.EndMeetingDataToMod
EndMeetingDataToMod.name = "EndMeetingDataToMod"
function EndMeetingDataToMod.prototype.____constructor(self)
end
____exports.EndGameDataToMod = __TS__Class()
local EndGameDataToMod = ____exports.EndGameDataToMod
EndGameDataToMod.name = "EndGameDataToMod"
function EndGameDataToMod.prototype.____constructor(self)
end
____exports.TerminatedDataToMod = __TS__Class()
local TerminatedDataToMod = ____exports.TerminatedDataToMod
TerminatedDataToMod.name = "TerminatedDataToMod"
function TerminatedDataToMod.prototype.____constructor(self)
end
____exports.SocketCommandServerToModData = {[____exports.SocketCommandServerToMod.ERROR] = ____exports.ErrorDataToMod, [____exports.SocketCommandServerToMod.USERNAME] = ____exports.UsernameDataToMod, [____exports.SocketCommandServerToMod.LOGGED_IN] = ____exports.LoggedInDataToMod, [____exports.SocketCommandServerToMod.GAME_LIST] = ____exports.GameListDataToMod, [____exports.SocketCommandServerToMod.JOINED] = ____exports.JoinedDataToMod, [____exports.SocketCommandServerToMod.LEFT] = ____exports.LeftDataToMod, [____exports.SocketCommandServerToMod.GAME_DESCRIPTION] = ____exports.GameDescriptionDataToMod, [____exports.SocketCommandServerToMod.CHAT] = ____exports.ChatDataToMod, [____exports.SocketCommandServerToMod.STARTED] = ____exports.StartedDataToMod, [____exports.SocketCommandServerToMod.RECONNECT] = ____exports.ReconnectDataToMod, [____exports.SocketCommandServerToMod.KILLED] = ____exports.KilledDataToMod, [____exports.SocketCommandServerToMod.START_MEETING] = ____exports.StartMeetingDataToMod, [____exports.SocketCommandServerToMod.START_VOTING] = ____exports.StartVotingDataToMod, [____exports.SocketCommandServerToMod.VOTE] = ____exports.VoteDataToMod, [____exports.SocketCommandServerToMod.END_MEETING] = ____exports.EndMeetingDataToMod, [____exports.SocketCommandServerToMod.END_GAME] = ____exports.EndGameDataToMod, [____exports.SocketCommandServerToMod.TERMINATED] = ____exports.TerminatedDataToMod}
return ____exports
 end,
["mod.src.types.SocketCommands"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
do
    local ____export = require("common.src.types.SocketCommands")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
return ____exports
 end,
["mod.src.types.StartMeetingState"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.StartMeetingState = StartMeetingState or ({})
____exports.StartMeetingState.DISABLED = 0
____exports.StartMeetingState[____exports.StartMeetingState.DISABLED] = "DISABLED"
____exports.StartMeetingState.ALERT_STRIP = 1
____exports.StartMeetingState[____exports.StartMeetingState.ALERT_STRIP] = "ALERT_STRIP"
____exports.StartMeetingState.FADING_TO_BLACK_WITH_ALERT_STRIP = 2
____exports.StartMeetingState[____exports.StartMeetingState.FADING_TO_BLACK_WITH_ALERT_STRIP] = "FADING_TO_BLACK_WITH_ALERT_STRIP"
____exports.StartMeetingState.FADING_TO_GAME = 3
____exports.StartMeetingState[____exports.StartMeetingState.FADING_TO_GAME] = "FADING_TO_GAME"
return ____exports
 end,
["mod.src.types.Task"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
do
    local ____export = require("common.src.types.Task")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
return ____exports
 end,
["mod.src.types.TaskList"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["mod.src.types.TaskType"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
do
    local ____export = require("common.src.types.TaskType")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
return ____exports
 end,
["mod.src.types.AmongUsGame"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____CutsceneState = require("mod.src.types.CutsceneState")
local CutsceneState = ____CutsceneState.CutsceneState
local ____EndMeetingState = require("mod.src.types.EndMeetingState")
local EndMeetingState = ____EndMeetingState.EndMeetingState
local ____MeetingResolution = require("mod.src.types.MeetingResolution")
local MeetingResolution = ____MeetingResolution.MeetingResolution
local ____Role = require("mod.src.types.Role")
local Role = ____Role.Role
local ____StartMeetingState = require("mod.src.types.StartMeetingState")
local StartMeetingState = ____StartMeetingState.StartMeetingState
local ____TaskType = require("mod.src.types.TaskType")
local TaskType = ____TaskType.TaskType
____exports.AmongUsGame = __TS__Class()
local AmongUsGame = ____exports.AmongUsGame
AmongUsGame.name = "AmongUsGame"
function AmongUsGame.prototype.____constructor(self, id, name)
    self.started = false
    self.imposters = nil
    self.meeting = nil
    self.players = {}
    self.playerMap = __TS__New(Map)
    self.role = Role.CREW
    self.usedEmergencyMeeting = false
    self.ourTasks = {[TaskType.SHORT] = {}, [TaskType.LONG] = {}, [TaskType.COMMON] = {}}
    self.currentTask = nil
    self.cutscene = {state = CutsceneState.DISABLED, startFrame = nil}
    self.startMeeting = {state = StartMeetingState.DISABLED, startFrame = nil}
    self.endMeeting = {state = EndMeetingState.DISABLED, startFrame = nil, meetingResolution = MeetingResolution.EJECT, userIDEjected = nil}
    self.id = id
    self.name = name
end
function AmongUsGame.prototype.getNumAlivePlayers(self)
    local numAlivePlayers = 0
    for ____, player in ipairs(self.players) do
        if player.alive then
            numAlivePlayers = numAlivePlayers + 1
        end
    end
    return numAlivePlayers
end
function AmongUsGame.prototype.getPlayerIndexFromUserID(self, userID)
    do
        local i = 0
        while i < #self.players do
            local player = self.players[i + 1]
            if player.userID == userID then
                return i
            end
            i = i + 1
        end
    end
    error(
        "Failed to find the index of the player with a user ID of: " .. tostring(userID)
    )
    return -1
end
function AmongUsGame.prototype.getPlayerFromUserID(self, userID)
    for ____, player in ipairs(self.players) do
        if player.userID == userID then
            return player
        end
    end
    return nil
end
function AmongUsGame.prototype.getPlayerFromUsername(self, username)
    for ____, player in ipairs(self.players) do
        if player.username == username then
            return player
        end
    end
    return nil
end
return ____exports
 end,
["mod.src.types.Globals"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
____exports.Globals = __TS__Class()
local Globals = ____exports.Globals
Globals.name = "Globals"
function Globals.prototype.____constructor(self)
    self.loggedIn = false
    self.userID = nil
    self.username = nil
    self.game = nil
end
return ____exports
 end,
["mod.src.globals"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____Globals = require("mod.src.types.Globals")
local Globals = ____Globals.Globals
local globals = __TS__New(Globals)
____exports.default = globals
g = globals
return ____exports
 end,
["mod.src.minimapAPI"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local TASK_ROOM_MINIMAP_ID = 22
function ____exports.enableMinimapAPI(self, enabled)
    if MinimapAPI == nil then
        return
    end
    MinimapAPI.OverrideConfig.Disable = not enabled
end
function ____exports.setMapToFullVisibility(self)
    if MinimapAPI == nil then
        return
    end
    ____exports.enableMinimapAPI(nil, true)
    local minimapAPILevel = MinimapAPI:GetLevel()
    for ____, room in ipairs(minimapAPILevel) do
        if room.ID ~= TASK_ROOM_MINIMAP_ID then
            room.Visited = true
            room.Clear = true
            room.DisplayFlags = 1 | 4
        end
    end
end
function ____exports.setMinimapAPIRoomIcon(self, mapID, icon)
    if MinimapAPI == nil then
        return
    end
    local minimapAPILevel = MinimapAPI:GetLevel()
    for ____, room in ipairs(minimapAPILevel) do
        if room.ID == mapID then
            room.ItemIcons = {icon}
            return
        end
    end
end
return ____exports
 end,
["mod.src.types.PlayerMessage"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["mod.src.network.pack"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local jsonDecode = ____isaacscript_2Dcommon.jsonDecode
local jsonEncode = ____isaacscript_2Dcommon.jsonEncode
local log = ____isaacscript_2Dcommon.log
local ____constants = require("mod.src.constants")
local UDP_POSITION_DATA_FORMAT = ____constants.UDP_POSITION_DATA_FORMAT
local UDP_POSITION_FIELDS = ____constants.UDP_POSITION_FIELDS
local struct = require("mod.src.network.struct")
local DATA_SEPARATOR = " "
local DEBUG = true
function ____exports.packTCPMsg(self, command, data)
    if data == nil then
        return command .. "\n"
    end
    local dataString = jsonEncode(nil, data)
    return ((command .. DATA_SEPARATOR) .. dataString) .. "\n"
end
function ____exports.unpackTCPMsg(self, msg)
    msg = __TS__StringTrim(msg)
    local msgArray = __TS__StringSplit(msg, DATA_SEPARATOR)
    local command = msgArray[1]
    local dataArray = __TS__ArraySlice(msgArray, 1)
    local dataString = table.concat(dataArray, DATA_SEPARATOR or ",")
    local data = jsonDecode(nil, dataString)
    return {command, data}
end
function ____exports.unpackUDPPlayerMessage(self, rawData)
    if DEBUG then
        log(nil, "Unpacking UDP message:")
    end
    local dataArray = {
        struct:unpack(UDP_POSITION_DATA_FORMAT, rawData)
    }
    local playerMessage = {}
    do
        local i = 0
        while i < #UDP_POSITION_FIELDS do
            local field = UDP_POSITION_FIELDS[i + 1]
            local fieldData = dataArray[i + 1]
            if type(fieldData) == "string" then
                fieldData = __TS__StringTrim(fieldData)
            end
            playerMessage[field] = fieldData
            if DEBUG then
                log(
                    nil,
                    (("- " .. field) .. " - ") .. tostring(fieldData)
                )
            end
            i = i + 1
        end
    end
    return playerMessage
end
return ____exports
 end,
["mod.src.types.ChatMessage"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["mod.src.chat"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
local chatMessages = {}
function ____exports.add(self, data, ____local)
    if ____local == nil then
        ____local = false
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    local chatMessage = {
        time = os.date("%X"),
        username = data.from,
        msg = data.msg,
        frameReceived = isaacFrameCount,
        ["local"] = ____local
    }
    __TS__ArrayUnshift(chatMessages, chatMessage)
end
function ____exports.addLocal(self, msg)
    local data = {gameID = -1, from = "", msg = msg}
    ____exports.add(nil, data, true)
    log(nil, msg)
end
function ____exports.getAll(self)
    return {
        table.unpack(chatMessages)
    }
end
return ____exports
 end,
["mod.src.sprite"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local getFileNum
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local MAX_VANILLA_COLLECTIBLE_TYPE = ____isaacscript_2Dcommon.MAX_VANILLA_COLLECTIBLE_TYPE
function getFileNum(self, itemID)
    local defaultReturn = "NEW"
    if itemID < 1 then
        return defaultReturn
    end
    if (itemID >= CollectibleType.COLLECTIBLE_SAD_ONION) and (itemID <= MAX_VANILLA_COLLECTIBLE_TYPE) then
        return __TS__StringPadStart(
            tostring(itemID),
            3,
            "0"
        )
    end
    if (itemID > MAX_VANILLA_COLLECTIBLE_TYPE) and (itemID < 2001) then
        return defaultReturn
    end
    if (itemID >= 2001) and (itemID <= 2189) then
        return tostring(itemID)
    end
    if (itemID > 2189) and (itemID < 32769) then
        return defaultReturn
    end
    if (itemID >= 32769) and (itemID <= 32957) then
        return tostring(itemID)
    end
    return defaultReturn
end
local GLOWING_IMAGE_TRINKET_OFFSET = 2000
function ____exports.initSprite(self, anm2Path, pngPath)
    local sprite = Sprite()
    if pngPath == nil then
        sprite:Load(anm2Path, true)
    else
        sprite:Load(anm2Path, false)
        sprite:ReplaceSpritesheet(0, pngPath)
        sprite:LoadGraphics()
    end
    sprite:SetFrame("Default", 0)
    return sprite
end
function ____exports.initGlowingItemSprite(self, collectibleOrTrinketType, trinket)
    if trinket == nil then
        trinket = false
    end
    if trinket then
        collectibleOrTrinketType = collectibleOrTrinketType + GLOWING_IMAGE_TRINKET_OFFSET
    end
    local fileNum = getFileNum(nil, collectibleOrTrinketType)
    return ____exports.initSprite(nil, "gfx/glowing_item.anm2", ("gfx/items-glowing/collectibles_" .. fileNum) .. ".png")
end
function ____exports.setSpriteOpacity(self, sprite, opacity)
    sprite.Color = Color(1, 1, 1, opacity, 0, 0, 0)
end
return ____exports
 end,
["mod.src.types.BlackSpriteState"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.BlackSpriteState = BlackSpriteState or ({})
____exports.BlackSpriteState.DISABLED = 0
____exports.BlackSpriteState[____exports.BlackSpriteState.DISABLED] = "DISABLED"
____exports.BlackSpriteState.FADING_TO_BLACK = 1
____exports.BlackSpriteState[____exports.BlackSpriteState.FADING_TO_BLACK] = "FADING_TO_BLACK"
____exports.BlackSpriteState.SOLID = 2
____exports.BlackSpriteState[____exports.BlackSpriteState.SOLID] = "SOLID"
____exports.BlackSpriteState.FADING_TO_GAME = 3
____exports.BlackSpriteState[____exports.BlackSpriteState.FADING_TO_GAME] = "FADING_TO_GAME"
return ____exports
 end,
["mod.src.features.blackSprite"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local drawBlackSprite, getBlackSpriteOpacity, sprite, state, startFrame
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____sprite = require("mod.src.sprite")
local initSprite = ____sprite.initSprite
local setSpriteOpacity = ____sprite.setSpriteOpacity
local ____BlackSpriteState = require("mod.src.types.BlackSpriteState")
local BlackSpriteState = ____BlackSpriteState.BlackSpriteState
function drawBlackSprite(self)
    if (g.game == nil) or (state == BlackSpriteState.DISABLED) then
        return
    end
    local opacity = getBlackSpriteOpacity(nil)
    setSpriteOpacity(nil, sprite, opacity)
    sprite:RenderLayer(0, Vector.Zero)
end
function getBlackSpriteOpacity(self)
    if (state == BlackSpriteState.SOLID) or (startFrame == nil) then
        return 1
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    local framesPassed = isaacFrameCount - startFrame
    local opacity = framesPassed / ____exports.FADE_TO_BLACK_FRAMES
    if state == BlackSpriteState.FADING_TO_BLACK then
        return opacity
    end
    if state == BlackSpriteState.FADING_TO_GAME then
        return 1 - opacity
    end
    return 1
end
____exports.FADE_TO_BLACK_FRAMES = 90
sprite = initSprite(nil, "gfx/black.anm2")
sprite.Scale = Vector(5000, 5000)
state = BlackSpriteState.DISABLED
startFrame = nil
function ____exports.postRender(self)
    drawBlackSprite(nil)
end
function ____exports.setBlackSpriteState(self, newState)
    local isaacFrameCount = Isaac.GetFrameCount()
    state = newState
    startFrame = isaacFrameCount
end
return ____exports
 end,
["mod.src.enums"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.EntityTypeCustom = EntityTypeCustom or ({})
____exports.EntityTypeCustom.BOX = Isaac.GetEntityTypeByName("Large Box")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.BOX] = "BOX"
____exports.EntityTypeCustom.TABLE = Isaac.GetEntityTypeByName("Table")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.TABLE] = "TABLE"
____exports.EntityTypeCustom.ADMIN_TABLE = Isaac.GetEntityTypeByName("Admin Table")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.ADMIN_TABLE] = "ADMIN_TABLE"
____exports.EntityTypeCustom.ADMIN_TOP = Isaac.GetEntityTypeByName("Admin Top")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.ADMIN_TOP] = "ADMIN_TOP"
____exports.EntityTypeCustom.STORAGE = Isaac.GetEntityTypeByName("Storage")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.STORAGE] = "STORAGE"
____exports.EntityTypeCustom.BED = Isaac.GetEntityTypeByName("Bed")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.BED] = "BED"
____exports.EntityTypeCustom.ENGINE = Isaac.GetEntityTypeByName("Engine")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.ENGINE] = "ENGINE"
____exports.EntityTypeCustom.REACTOR = Isaac.GetEntityTypeByName("Reactor")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.REACTOR] = "REACTOR"
____exports.EntityTypeCustom.SECURITY_TABLE = Isaac.GetEntityTypeByName("Security Table")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.SECURITY_TABLE] = "SECURITY_TABLE"
____exports.EntityTypeCustom.ELECTRICAL = Isaac.GetEntityTypeByName("Electrical")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.ELECTRICAL] = "ELECTRICAL"
____exports.EntityTypeCustom.WIRE_SIGN = Isaac.GetEntityTypeByName("Wire Sign")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.WIRE_SIGN] = "WIRE_SIGN"
____exports.EntityTypeCustom.LINE = Isaac.GetEntityTypeByName("Line")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.LINE] = "LINE"
____exports.EntityTypeCustom.WEAPONS = Isaac.GetEntityTypeByName("Weapons")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.WEAPONS] = "WEAPONS"
____exports.EntityTypeCustom.TANK = Isaac.GetEntityTypeByName("Tank")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.TANK] = "TANK"
____exports.EntityTypeCustom.SHIP_CONTROLS = Isaac.GetEntityTypeByName("Ship Controls")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.SHIP_CONTROLS] = "SHIP_CONTROLS"
____exports.EntityTypeCustom.SHIELDS = Isaac.GetEntityTypeByName("Shields")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.SHIELDS] = "SHIELDS"
____exports.EntityTypeCustom.COMPUTER = Isaac.GetEntityTypeByName("Computer")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.COMPUTER] = "COMPUTER"
____exports.EntityTypeCustom.RADIO = Isaac.GetEntityTypeByName("Radio")
____exports.EntityTypeCustom[____exports.EntityTypeCustom.RADIO] = "RADIO"
____exports.BoxVariant = BoxVariant or ({})
____exports.BoxVariant.LARGE = Isaac.GetEntityVariantByName("Large Box")
____exports.BoxVariant[____exports.BoxVariant.LARGE] = "LARGE"
____exports.BoxVariant.SMALL = Isaac.GetEntityVariantByName("Small Box")
____exports.BoxVariant[____exports.BoxVariant.SMALL] = "SMALL"
____exports.EffectVariantCustom = EffectVariantCustom or ({})
____exports.EffectVariantCustom.STAGE_API_DOOR = Isaac.GetEntityVariantByName("StageAPIDoor")
____exports.EffectVariantCustom[____exports.EffectVariantCustom.STAGE_API_DOOR] = "STAGE_API_DOOR"
____exports.EffectVariantCustom.VENT = Isaac.GetEntityVariantByName("Vent")
____exports.EffectVariantCustom[____exports.EffectVariantCustom.VENT] = "VENT"
____exports.EffectVariantCustom.BUTTON = Isaac.GetEntityVariantByName("Button")
____exports.EffectVariantCustom[____exports.EffectVariantCustom.BUTTON] = "BUTTON"
____exports.EffectVariantCustom.BLOCK = Isaac.GetEntityVariantByName("Block")
____exports.EffectVariantCustom[____exports.EffectVariantCustom.BLOCK] = "BLOCK"
____exports.CarpetSubTypeCustom = CarpetSubTypeCustom or ({})
____exports.CarpetSubTypeCustom.BLOCK = 11
____exports.CarpetSubTypeCustom[____exports.CarpetSubTypeCustom.BLOCK] = "BLOCK"
____exports.ButtonSubType = ButtonSubType or ({})
____exports.ButtonSubType.GO_TO_TASK = 0
____exports.ButtonSubType[____exports.ButtonSubType.GO_TO_TASK] = "GO_TO_TASK"
____exports.ButtonSubType.EMERGENCY = 1
____exports.ButtonSubType[____exports.ButtonSubType.EMERGENCY] = "EMERGENCY"
____exports.ButtonSubType.CAMERA = 2
____exports.ButtonSubType[____exports.ButtonSubType.CAMERA] = "CAMERA"
____exports.ButtonSubType.LIGHTS = 3
____exports.ButtonSubType[____exports.ButtonSubType.LIGHTS] = "LIGHTS"
____exports.ButtonSubType.COMMS = 4
____exports.ButtonSubType[____exports.ButtonSubType.COMMS] = "COMMS"
____exports.ButtonSubType.O2 = 5
____exports.ButtonSubType[____exports.ButtonSubType.O2] = "O2"
____exports.ButtonSubType.TASK_1 = 6
____exports.ButtonSubType[____exports.ButtonSubType.TASK_1] = "TASK_1"
____exports.ButtonSubType.TASK_2 = 7
____exports.ButtonSubType[____exports.ButtonSubType.TASK_2] = "TASK_2"
____exports.ButtonSubType.TASK_3 = 8
____exports.ButtonSubType[____exports.ButtonSubType.TASK_3] = "TASK_3"
____exports.ButtonSubType.TASK_4 = 9
____exports.ButtonSubType[____exports.ButtonSubType.TASK_4] = "TASK_4"
____exports.ButtonSubType.TASK_5 = 10
____exports.ButtonSubType[____exports.ButtonSubType.TASK_5] = "TASK_5"
____exports.ButtonSubType.TASK_6 = 11
____exports.ButtonSubType[____exports.ButtonSubType.TASK_6] = "TASK_6"
____exports.ButtonSubType.TASK_7 = 12
____exports.ButtonSubType[____exports.ButtonSubType.TASK_7] = "TASK_7"
____exports.ButtonSubType.TASK_8 = 13
____exports.ButtonSubType[____exports.ButtonSubType.TASK_8] = "TASK_8"
return ____exports
 end,
["mod.src.fonts"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.fonts = {
    droid = Font(),
    pf = Font()
}
____exports.fonts.droid:Load("font/droid.fnt")
____exports.fonts.pf:Load("font/pftempestasevencondensed.fnt")
return ____exports
 end,
["mod.src.util"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local ensureAllCases = ____isaacscript_2Dcommon.ensureAllCases
local getScreenBottomRightPos = ____isaacscript_2Dcommon.getScreenBottomRightPos
local log = ____isaacscript_2Dcommon.log
local setBlindfold = ____isaacscript_2Dcommon.setBlindfold
local ____fonts = require("mod.src.fonts")
local fonts = ____fonts.fonts
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Role = require("mod.src.types.Role")
local Role = ____Role.Role
function ____exports.amOwner(self)
    if g.game == nil then
        return false
    end
    local firstPlayer = g.game.players[1]
    if firstPlayer == nil then
        return false
    end
    return firstPlayer.username == g.username
end
function ____exports.consoleCommand(self, command)
    log(nil, "Executing console command: " .. command)
    Isaac.ExecuteCommand(command)
    log(nil, "Finished executing console command: " .. command)
end
function ____exports.disableShooting(self)
    local player = Isaac.GetPlayer()
    setBlindfold(nil, player, true)
    player:TryRemoveNullCostume(NullItemID.ID_BLINDFOLD)
end
function ____exports.drawFontText(self, text, position, opacity)
    if opacity == nil then
        opacity = 1
    end
    local scale = 1
    local length = fonts.droid:GetStringWidthUTF8(text) * scale
    local color = KColor(1, 1, 1, opacity)
    fonts.droid:DrawString(text, position.X - (length / 2), position.Y, color, 0, true)
end
function ____exports.enableShooting(self)
    local player = Isaac.GetPlayer()
    setBlindfold(nil, player, false)
end
function ____exports.getRoleText(self, role)
    repeat
        local ____switch10 = role
        local ____cond10 = ____switch10 == Role.CREW
        if ____cond10 then
            do
                return "Crew"
            end
        end
        ____cond10 = ____cond10 or (____switch10 == Role.IMPOSTER)
        if ____cond10 then
            do
                return "Imposter"
            end
        end
        do
            do
                ensureAllCases(nil, role)
                return "Unknown"
            end
        end
    until true
end
function ____exports.getScreenPosition(self, x, y)
    local bottomRightPos = getScreenBottomRightPos(nil)
    return Vector(x * bottomRightPos.X, y * bottomRightPos.Y)
end
function ____exports.movePlayerToGridIndex(self, gridIndex)
    local game = Game()
    local room = game:GetRoom()
    local position = room:GetGridPosition(gridIndex)
    local player = Isaac.GetPlayer()
    player.Position = position
    player.Velocity = Vector.Zero
end
function ____exports.removeGridEntity(self, gridEntity)
    local game = Game()
    local room = game:GetRoom()
    local gridIndex = gridEntity:GetGridIndex()
    room:RemoveGridEntity(gridIndex, 0, false)
    room:Update()
end
function ____exports.restart(self)
    ____exports.consoleCommand(nil, "restart")
end
function ____exports.spawnEntity(self, entityType, variant, subType, gridIndex, depthOffset)
    if depthOffset == nil then
        depthOffset = -100
    end
    local game = Game()
    local room = game:GetRoom()
    local position = room:GetGridPosition(gridIndex)
    local entity = Isaac.Spawn(entityType, variant, subType, position, Vector.Zero, nil)
    entity:ClearEntityFlags(EntityFlag.FLAG_APPEAR)
    entity.DepthOffset = depthOffset
    return entity
end
function ____exports.traceback(self)
    print(
        debug.traceback()
    )
end
return ____exports
 end,
["mod.src.network.socketClient"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local getClient, socket
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
local chat = require("mod.src.chat")
local ____constants = require("mod.src.constants")
local REMOTE_HOSTNAME = ____constants.REMOTE_HOSTNAME
local SOCKET_CLIENT_RETURN_SUCCESS = ____constants.SOCKET_CLIENT_RETURN_SUCCESS
local SOCKET_CONNECT_TIMEOUT_SECONDS = ____constants.SOCKET_CONNECT_TIMEOUT_SECONDS
local TCP_PORT = ____constants.TCP_PORT
local UDP_PORT = ____constants.UDP_PORT
local ____blackSprite = require("mod.src.features.blackSprite")
local setBlackSpriteState = ____blackSprite.setBlackSpriteState
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____BlackSpriteState = require("mod.src.types.BlackSpriteState")
local BlackSpriteState = ____BlackSpriteState.BlackSpriteState
local ____util = require("mod.src.util")
local restart = ____util.restart
function getClient(self, port, useTCP)
    if useTCP == nil then
        useTCP = true
    end
    if socket == nil then
        return nil
    end
    local protocol = (useTCP and "tcp") or "udp"
    local url = (((protocol .. "://") .. REMOTE_HOSTNAME) .. ":") .. tostring(port)
    local socketClient
    if protocol == "tcp" then
        socketClient = socket.tcp()
        socketClient:settimeout(SOCKET_CONNECT_TIMEOUT_SECONDS)
        local err, errMsg = socketClient:connect(REMOTE_HOSTNAME, port)
        if err ~= SOCKET_CLIENT_RETURN_SUCCESS then
            log(nil, (("Error: Failed to connect on \"" .. url) .. "\": ") .. errMsg)
            return nil
        end
    elseif protocol == "udp" then
        socketClient = socket.udp()
        socketClient:setpeername(REMOTE_HOSTNAME, port)
    else
        error(
            "Unknown protocol: " .. tostring(protocol)
        )
    end
    socketClient:settimeout(0)
    log(nil, "Connected to: " .. url)
    return socketClient
end
socket = nil
local clientTCP = nil
local clientUDP = nil
function ____exports.init(self)
    local ok, requiredSocket = pcall(require, "socket")
    if ok then
        socket = requiredSocket
    end
end
function ____exports.connect(self)
    clientTCP = getClient(nil, TCP_PORT, true)
    if clientTCP == nil then
        return false
    end
    clientUDP = getClient(nil, UDP_PORT, false)
    if clientUDP == nil then
        return false
    end
    return true
end
function ____exports.disconnect(self)
    if clientTCP ~= nil then
        clientTCP:close()
    end
    clientTCP = nil
    if clientUDP ~= nil then
        clientUDP:close()
    end
    clientUDP = nil
    g.game = nil
    g.loggedIn = false
    g.userID = nil
    g.username = nil
    chat:addLocal("Disconnected!")
    restart(nil)
    setBlackSpriteState(nil, BlackSpriteState.DISABLED)
end
function ____exports.send(self, packedMsg, useTCP)
    local client = ((useTCP and (function() return clientTCP end)) or (function() return clientUDP end))()
    local protocol = (useTCP and "TCP") or "UDP"
    if client == nil then
        return {nil, protocol .. " client is not initialized"}
    end
    return {
        client:send(packedMsg)
    }
end
function ____exports.receive(self, useTCP)
    local client = ((useTCP and (function() return clientTCP end)) or (function() return clientUDP end))()
    local protocol = (useTCP and "TCP") or "UDP"
    if client == nil then
        return {nil, protocol .. " client is not initialized"}
    end
    return {
        client:receive()
    }
end
function ____exports.isConnected(self)
    return (clientTCP ~= nil) and (clientUDP ~= nil)
end
function ____exports.isLuaDebugEnabled(self)
    return socket ~= nil
end
function ____exports.getTime(self)
    if socket == nil then
        return 0
    end
    return socket.gettime()
end
return ____exports
 end,
["mod.src.network.send"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
local ____pack = require("mod.src.network.pack")
local packTCPMsg = ____pack.packTCPMsg
local socketClient = require("mod.src.network.socketClient")
function ____exports.sendTCP(self, command, data)
    if not socketClient:isConnected() then
        return
    end
    local packedMsg = packTCPMsg(nil, command, data)
    local sentBytes, errMsg = table.unpack(
        socketClient:send(packedMsg, true)
    )
    if sentBytes == nil then
        log(nil, "Failed to send data over the TCP socket: " .. errMsg)
        socketClient:disconnect()
    end
    if command ~= SocketCommandModToServer.PING then
        log(nil, "Sent TCP message: " .. packedMsg)
    end
end
function ____exports.sendUDP(self, data)
    if not socketClient:isConnected() then
        return
    end
    local sentBytes, errMsg = table.unpack(
        socketClient:send(data, false)
    )
    if sentBytes == nil then
        log(nil, "Failed to send data over the UDP socket: " .. errMsg)
        socketClient:disconnect()
    end
end
return ____exports
 end,
["mod.src.setupPlayersAndUI"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local disableHUD, removeAllItems, removeActiveItems, setStats, fullHeal
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getEnumValues = ____isaacscript_2Dcommon.getEnumValues
local ____util = require("mod.src.util")
local disableShooting = ____util.disableShooting
function disableHUD(self)
    local game = Game()
    local hud = game:GetHUD()
    hud:SetVisible(false)
    if MinimapAPI ~= nil then
        MinimapAPI.OverrideConfig.DisplayOnNoHUD = true
    end
end
function removeAllItems(self, player)
    removeActiveItems(nil, player)
    player:AddCoins(-99)
    player:AddBombs(-99)
    player:AddKeys(-99)
    player:TryRemoveTrinket(TrinketType.TRINKET_PETRIFIED_POOP)
    player:RemoveCollectible(CollectibleType.COLLECTIBLE_BLACK_POWDER)
end
function removeActiveItems(self, player)
    for ____, activeSlot in ipairs(
        getEnumValues(nil, ActiveSlot)
    ) do
        local activeItem = player:GetActiveItem(activeSlot)
        if activeItem ~= 0 then
            player:RemoveCollectible(activeItem)
        end
    end
end
function setStats(self, player)
    player:AddCacheFlags(CacheFlag.CACHE_ALL)
    player:EvaluateItems()
end
function fullHeal(self, player)
    player:AddHearts(24)
end
function ____exports.setupPlayerAndUI(self)
    local player = Isaac.GetPlayer()
    disableHUD(nil)
    disableShooting(nil)
    removeAllItems(nil, player)
    setStats(nil, player)
    fullHeal(nil, player)
end
return ____exports
 end,
["mod.src.types.SkeldRoom"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
do
    local ____export = require("common.src.types.SkeldRoom")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
return ____exports
 end,
["mod.src.skeldRoomMap"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____SkeldRoom = require("mod.src.types.SkeldRoom")
local SkeldRoom = ____SkeldRoom.SkeldRoom
____exports.skeldRoomMap = __TS__New(Map, {{"Cafeteria", SkeldRoom.CAFETERIA}, {"Admin Hall", SkeldRoom.ADMIN_HALL}, {"Admin", SkeldRoom.ADMIN}, {"Storage", SkeldRoom.STORAGE}, {"Medbay Hall", SkeldRoom.MEDBAY_HALL}, {"Medbay", SkeldRoom.MEDBAY}, {"Upper Engine", SkeldRoom.UPPER_ENGINE}, {"Engine Hall", SkeldRoom.ENGINE_HALL}, {"Reactor", SkeldRoom.REACTOR}, {"Security", SkeldRoom.SECURITY}, {"Lower Engine", SkeldRoom.LOWER_ENGINE}, {"Electrical Hall", SkeldRoom.ELECTRICAL_HALL}, {"Electrical", SkeldRoom.ELECTRICAL}, {"Weapons", SkeldRoom.WEAPONS}, {"O2 Hall", SkeldRoom.O2_HALL}, {"O2", SkeldRoom.O2}, {"Navigation", SkeldRoom.NAVIGATION}, {"Navigation Hall", SkeldRoom.NAVIGATION_HALL}, {"Shields", SkeldRoom.SHIELDS}, {"Communication Hall", SkeldRoom.COMMUNICATION_HALL}, {"Communication", SkeldRoom.COMMUNICATION}, {"Task", SkeldRoom.TASK}})
____exports.skeldRoomReverseMap = {[SkeldRoom.CAFETERIA] = "Cafeteria", [SkeldRoom.ADMIN_HALL] = "Admin Hall", [SkeldRoom.ADMIN] = "Admin", [SkeldRoom.STORAGE] = "Storage", [SkeldRoom.MEDBAY_HALL] = "Medbay Hall", [SkeldRoom.MEDBAY] = "Medbay", [SkeldRoom.UPPER_ENGINE] = "Upper Engine", [SkeldRoom.ENGINE_HALL] = "Engine Hall", [SkeldRoom.REACTOR] = "Reactor", [SkeldRoom.SECURITY] = "Security", [SkeldRoom.LOWER_ENGINE] = "Lower Engine", [SkeldRoom.ELECTRICAL_HALL] = "Electrical Hall", [SkeldRoom.ELECTRICAL] = "Electrical", [SkeldRoom.WEAPONS] = "Weapons", [SkeldRoom.O2_HALL] = "O2 Hall", [SkeldRoom.O2] = "O2", [SkeldRoom.NAVIGATION] = "Navigation", [SkeldRoom.NAVIGATION_HALL] = "Navigation Hall", [SkeldRoom.SHIELDS] = "Shields", [SkeldRoom.COMMUNICATION_HALL] = "Communication Hall", [SkeldRoom.COMMUNICATION] = "Communication", [SkeldRoom.TASK] = "Task"}
return ____exports
 end,
["mod.src.stageAPI"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local getStageAPIRoomID
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____skeldRoomMap = require("mod.src.skeldRoomMap")
local skeldRoomMap = ____skeldRoomMap.skeldRoomMap
local ____SkeldRoom = require("mod.src.types.SkeldRoom")
local SkeldRoom = ____SkeldRoom.SkeldRoom
function ____exports.getStageAPIRoomName(self)
    local defaultReturn = "Unknown"
    if StageAPI == nil then
        return defaultReturn
    end
    local stageAPIRoom = StageAPI.GetCurrentRoom()
    if stageAPIRoom == nil then
        return defaultReturn
    end
    return stageAPIRoom.Layout.Name
end
function getStageAPIRoomID(self, levelMap, roomName)
    for ____, roomData in ipairs(levelMap.Map) do
        local levelRoom = levelMap:GetRoom(roomData)
        if levelRoom.Layout.Name == roomName then
            return roomData.MapID
        end
    end
    return nil
end
local NULL_STAGE_API_ANIMATION = -1
local DEFAULT_BACKDROP_TYPE = "security"
local backdropMap = __TS__New(Map, {{SkeldRoom.CAFETERIA, "cafeteria"}, {SkeldRoom.ELECTRICAL, "electrical"}, {SkeldRoom.SECURITY, "security"}})
function ____exports.fixRoomEntrancePosition(self)
    local game = Game()
    local level = game:GetLevel()
    local room = game:GetRoom()
    local player = Isaac.GetPlayer()
    if level.EnterDoor == -1 then
        return
    end
    local doorPos = room:GetDoorSlotPosition(level.EnterDoor)
    local playerEnterPos = room:FindFreeTilePosition(doorPos, 0)
    player.Position = playerEnterPos
end
function ____exports.getStageAPIRoomMapID(self, skeldRoom)
    if StageAPI == nil then
        return nil
    end
    local levelMap = StageAPI.GetCurrentLevelMap()
    for ____, roomData in ipairs(levelMap.Map) do
        local levelRoom = levelMap:GetRoom(roomData)
        if levelRoom.Layout.Variant == skeldRoom then
            return roomData.MapID
        end
    end
    return nil
end
function ____exports.getSkeldRoom(self)
    local roomName = ____exports.getStageAPIRoomName(nil)
    local skeldRoom = skeldRoomMap:get(roomName)
    return (((skeldRoom == nil) and (function() return nil end)) or (function() return skeldRoom end))()
end
function ____exports.getStageAPIDoors(self)
    if StageAPI == nil then
        error("StageAPI was not initialized.")
    end
    return StageAPI.GetCustomGrids(nil, "CustomDoor")
end
function ____exports.goToStageAPIRoom(self, roomName, enterDoor)
    if StageAPI == nil then
        return
    end
    local game = Game()
    local level = game:GetLevel()
    local levelMap = StageAPI.GetCurrentLevelMap()
    local roomID = getStageAPIRoomID(nil, levelMap, roomName)
    if roomID == nil then
        return
    end
    StageAPI.ExtraRoomTransition(roomID, Direction.NO_DIRECTION, NULL_STAGE_API_ANIMATION, levelMap)
    if enterDoor ~= nil then
        level.EnterDoor = enterDoor
    end
    ____exports.fixRoomEntrancePosition(nil)
end
function ____exports.loadBackdrops(self)
    if (g.game == nil) or (StageAPI == nil) then
        return
    end
    local roomName = ____exports.getStageAPIRoomName(nil)
    local room = skeldRoomMap:get(roomName)
    if room == nil then
        return
    end
    local backdropType = backdropMap:get(room)
    if backdropType == nil then
        backdropType = DEFAULT_BACKDROP_TYPE
    end
    local backdrops = StageAPI.BackdropHelper({Walls = {"wall"}, NFloors = {"nfloor"}, LFloors = {"lfloor"}, Corners = {"corner"}}, ("gfx/backdrop/" .. backdropType) .. "/", ".png")
    local backdrop = backdrops[1]
    if backdrop == nil then
        return
    end
    StageAPI.ChangeBackdrop(backdrop, false, true)
end
return ____exports
 end,
["mod.src.wall"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ONE_BY_ONE_ROOM_WIDTH = 15
local ONE_BY_ONE_ROOM_HEIGHT = 9
local TOP_LEFT_GRID_INDEX = 0
local TOP_WALL_GRID_INDEXES = {}
do
    local i = TOP_LEFT_GRID_INDEX
    while i < (TOP_LEFT_GRID_INDEX + ONE_BY_ONE_ROOM_WIDTH) do
        __TS__ArrayPush(TOP_WALL_GRID_INDEXES, i)
        i = i + 1
    end
end
local BOTTOM_LEFT_GRID_INDEX = 120
local BOTTOM_WALL_GRID_INDEXES = {}
do
    local i = BOTTOM_LEFT_GRID_INDEX
    while i < (BOTTOM_LEFT_GRID_INDEX + ONE_BY_ONE_ROOM_WIDTH) do
        __TS__ArrayPush(BOTTOM_WALL_GRID_INDEXES, i)
        i = i + 1
    end
end
local LEFT_WALL_GRID_INDEXES = {}
do
    local i = 0
    while i < ONE_BY_ONE_ROOM_HEIGHT do
        local gridIndex = TOP_LEFT_GRID_INDEX + (i * ONE_BY_ONE_ROOM_WIDTH)
        __TS__ArrayPush(LEFT_WALL_GRID_INDEXES, gridIndex)
        i = i + 1
    end
end
local TOP_RIGHT_GRID_INDEX = 14
local RIGHT_WALL_GRID_INDEXES = {}
do
    local i = 0
    while i < ONE_BY_ONE_ROOM_HEIGHT do
        local gridIndex = TOP_RIGHT_GRID_INDEX + (i * ONE_BY_ONE_ROOM_WIDTH)
        __TS__ArrayPush(RIGHT_WALL_GRID_INDEXES, gridIndex)
        i = i + 1
    end
end
local ALL_WALL_GRID_INDEXES = __TS__New(Set)
for ____, gridIndexArray in ipairs({TOP_WALL_GRID_INDEXES, BOTTOM_WALL_GRID_INDEXES, LEFT_WALL_GRID_INDEXES, RIGHT_WALL_GRID_INDEXES}) do
    for ____, gridIndex in ipairs(gridIndexArray) do
        ALL_WALL_GRID_INDEXES:add(gridIndex)
    end
end
function ____exports.isWallGridIndex(self, gridIndex)
    return ALL_WALL_GRID_INDEXES:has(gridIndex)
end
return ____exports
 end,
["mod.src.features.taskSubroutines"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local removeAllNPCs, removeAllGridEntities
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local arrayRemoveInPlace = ____isaacscript_2Dcommon.arrayRemoveInPlace
local getNPCs = ____isaacscript_2Dcommon.getNPCs
local removeAllMatchingEntities = ____isaacscript_2Dcommon.removeAllMatchingEntities
local ____constants = require("mod.src.constants")
local taskDescriptions = ____constants.taskDescriptions
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____minimapAPI = require("mod.src.minimapAPI")
local enableMinimapAPI = ____minimapAPI.enableMinimapAPI
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local ____setupPlayersAndUI = require("mod.src.setupPlayersAndUI")
local setupPlayerAndUI = ____setupPlayersAndUI.setupPlayerAndUI
local ____skeldRoomMap = require("mod.src.skeldRoomMap")
local skeldRoomReverseMap = ____skeldRoomMap.skeldRoomReverseMap
local ____stageAPI = require("mod.src.stageAPI")
local goToStageAPIRoom = ____stageAPI.goToStageAPIRoom
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
local ____util = require("mod.src.util")
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
local removeGridEntity = ____util.removeGridEntity
local ____wall = require("mod.src.wall")
local isWallGridIndex = ____wall.isWallGridIndex
function ____exports.taskLeave(self)
    if (g.game == nil) or (g.game.currentTask == nil) then
        return
    end
    local taskDescription = taskDescriptions[g.game.currentTask]
    local roomName = skeldRoomReverseMap[taskDescription.room]
    if roomName == nil then
        error(
            "Failed to get the room name for room: " .. tostring(taskDescription.room)
        )
    end
    g.game.currentTask = nil
    setupPlayerAndUI(nil)
    enableMinimapAPI(nil, true)
    ____exports.clearRoomEntities(nil)
    goToStageAPIRoom(nil, roomName)
    movePlayerToGridIndex(nil, taskDescription.returnGridIndex)
end
function ____exports.clearRoomEntities(self)
    removeAllMatchingEntities(nil, EntityType.ENTITY_BOMBDROP)
    removeAllMatchingEntities(nil, EntityType.ENTITY_PICKUP)
    removeAllNPCs(nil)
    removeAllGridEntities(nil)
end
function removeAllNPCs(self)
    local npcs = getNPCs(nil)
    for ____, npc in ipairs(npcs) do
        npc:Remove()
    end
end
function removeAllGridEntities(self)
    local game = Game()
    local room = game:GetRoom()
    do
        local gridIndex = 0
        while gridIndex < room:GetGridSize() do
            do
                if isWallGridIndex(nil, gridIndex) then
                    goto __continue12
                end
                local gridEntity = room:GetGridEntity(gridIndex)
                if gridEntity ~= nil then
                    removeGridEntity(nil, gridEntity)
                end
            end
            ::__continue12::
            gridIndex = gridIndex + 1
        end
    end
end
local sfx = SFXManager()
function ____exports.taskComplete(self)
    if (g.game == nil) or (g.game.currentTask == nil) then
        return
    end
    local task = g.game.currentTask
    sfx:Stop(SoundEffect.SOUND_THUMBSUP)
    sfx:Play(SoundEffect.SOUND_1UP)
    sendTCP(nil, SocketCommandModToServer.TASK_COMPLETE, {gameID = g.game.id, task = task})
    for ____, tasks in ipairs(
        __TS__ObjectValues(g.game.ourTasks)
    ) do
        arrayRemoveInPlace(nil, tasks, task)
    end
    ____exports.taskLeave(nil)
end
return ____exports
 end,
["mod.src.callbacks.entityTakeDmg"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local entityTakeDmgPlayer, sfx, frameReturningFromTask
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskLeave = ____taskSubroutines.taskLeave
local ____globals = require("mod.src.globals")
local g = ____globals.default
function entityTakeDmgPlayer(self, tookDamage, _damageAmount, _damageFlags, _damageSource, _damageCountdownFrames)
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    if gameFrameCount == frameReturningFromTask then
        return false
    end
    if (g.game == nil) or (g.game.currentTask == nil) then
        return nil
    end
    local player = tookDamage:ToPlayer()
    if player == nil then
        return nil
    end
    sfx:Play(SoundEffect.SOUND_THUMBS_DOWN)
    frameReturningFromTask = gameFrameCount
    taskLeave(nil)
    return false
end
sfx = SFXManager()
frameReturningFromTask = nil
function ____exports.init(self, mod)
    mod:AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, entityTakeDmgPlayer, EntityType.ENTITY_PLAYER)
end
return ____exports
 end,
["mod.src.callbacks.evaluateCache"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("mod.src.constants")
local IS_DEV = ____constants.IS_DEV
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
function ____exports.speed(self, player)
    if g.game == nil then
        return
    end
    player.MoveSpeed = 0.75
    if g.game.currentTask == Task.SHORT_MAKE_PENTAGRAM then
        player.MoveSpeed = 2
    end
    if IS_DEV then
        player.MoveSpeed = 2
    end
end
function ____exports.init(self, mod)
    mod:AddCallback(ModCallbacks.MC_EVALUATE_CACHE, ____exports.speed, CacheFlag.CACHE_SPEED)
end
return ____exports
 end,
["mod.src.chatCommands.connect"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local chat = require("mod.src.chat")
local ____constants = require("mod.src.constants")
local MOD_NAME = ____constants.MOD_NAME
local socketClient = require("mod.src.network.socketClient")
function ____exports.connectChatCommand(self, autoLogin)
    if socketClient:isConnected() then
        chat:addLocal(("You are already connected to the " .. MOD_NAME) .. " server.")
        return
    end
    if not socketClient:connect() then
        chat:addLocal(("Failed to connect to the " .. MOD_NAME) .. " server.")
        return
    end
    if not autoLogin then
        chat:addLocal("Connected!")
        chat:addLocal("Next, select your username with the \"/username\" command.")
        chat:addLocal("For example: \"/username Alice\"")
    end
end
return ____exports
 end,
["mod.src.features.autoLogin"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local DEBUG_FIRST_MOD, DEBUG_GAME_NAME, autoLogin
local ____connect = require("mod.src.chatCommands.connect")
local connectChatCommand = ____connect.connectChatCommand
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local socketClient = require("mod.src.network.socketClient")
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
function ____exports.onGameList(self)
    if (not autoLogin) or (g.game ~= nil) then
        return
    end
    if DEBUG_FIRST_MOD then
        sendTCP(nil, SocketCommandModToServer.CREATE, {name = DEBUG_GAME_NAME})
    else
        sendTCP(nil, SocketCommandModToServer.JOIN, {name = DEBUG_GAME_NAME, created = false})
    end
end
DEBUG_FIRST_MOD = true
local DEBUG_USERNAME = (DEBUG_FIRST_MOD and "Test1") or "Test2"
local DEBUG_PASSWORD = "test"
DEBUG_GAME_NAME = "testGame"
autoLogin = false
function ____exports.startAutoLogin(self)
    autoLogin = true
    if not socketClient:isConnected() then
        connectChatCommand(nil, true)
    end
    if g.loggedIn then
        ____exports.onGameList(nil)
    else
        sendTCP(nil, SocketCommandModToServer.LOGIN, {username = DEBUG_USERNAME, password = DEBUG_PASSWORD})
    end
end
function ____exports.onGameDescription(self)
    if ((not autoLogin) or (g.game == nil)) or g.game.started then
        return
    end
    sendTCP(nil, SocketCommandModToServer.START, {gameID = g.game.id})
end
return ____exports
 end,
["mod.src.types.MeetingType"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
do
    local ____export = require("common.src.types.MeetingType")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
return ____exports
 end,
["mod.src.debugFunction"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local postUpdateHotkey1, hotkeyFunction1, postUpdateHotkey2, hotkeyFunction2, DEBUG_HOTKEY1, DEBUG_HOTKEY2, hotkeyPressed1, hotkeyPressed2
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local isKeyboardPressed = ____isaacscript_2Dcommon.isKeyboardPressed
local ____constants = require("mod.src.constants")
local IS_DEV = ____constants.IS_DEV
local ____autoLogin = require("mod.src.features.autoLogin")
local startAutoLogin = ____autoLogin.startAutoLogin
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local ____MeetingType = require("mod.src.types.MeetingType")
local MeetingType = ____MeetingType.MeetingType
local ____SkeldRoom = require("mod.src.types.SkeldRoom")
local SkeldRoom = ____SkeldRoom.SkeldRoom
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
function postUpdateHotkey1(self)
    if isKeyboardPressed(nil, DEBUG_HOTKEY1) then
        if not hotkeyPressed1 then
            hotkeyFunction1(nil)
        end
        hotkeyPressed1 = true
    else
        hotkeyPressed1 = false
    end
end
function hotkeyFunction1(self)
    startAutoLogin(nil)
end
function postUpdateHotkey2(self)
    if isKeyboardPressed(nil, DEBUG_HOTKEY2) then
        if not hotkeyPressed2 then
            hotkeyFunction2(nil)
        end
        hotkeyPressed2 = true
    else
        hotkeyPressed2 = false
    end
end
function hotkeyFunction2(self)
    if g.game == nil then
        return
    end
    sendTCP(nil, SocketCommandModToServer.MEETING, {meetingType = MeetingType.EMERGENCY, gameID = g.game.id, userIDKilled = 0})
end
DEBUG_HOTKEY1 = Keyboard.KEY_F1
DEBUG_HOTKEY2 = Keyboard.KEY_F2
hotkeyPressed1 = false
hotkeyPressed2 = false
function ____exports.debugFunction(self)
end
function ____exports.postUpdate(self)
    postUpdateHotkey1(nil)
    postUpdateHotkey2(nil)
end
function ____exports.injectTestPlayers(self)
    if ((g.game == nil) or (#g.game.players ~= 1)) or (not IS_DEV) then
        return
    end
    local testPlayerNames = {"antizoubilamaka", "Hispa", "Gamonymous", "MoucheronQuipet", "leo_ze_tron", "AshD0wn", "Slash_SP", "Marcus", "thereisnofuture", "Dea1h", "Fawkeyes", "toooschi", "CrafterLynx", "Adrayon"}
    local testPlayerCharacters = {1, 2, 3, 5, 6, 8, 9, 13, 18, 19, 21, 22, 23, 24}
    do
        local i = 0
        while i < #testPlayerNames do
            local alive = true
            if ((((i == 1) or (i == 3)) or (i == 8)) or (i == 10)) or (i == 13) then
                alive = false
            end
            __TS__ArrayPush(g.game.players, {userID = 100 + i, username = testPlayerNames[i + 1], connected = true, character = testPlayerCharacters[i + 1], alive = alive, room = SkeldRoom.CAFETERIA, usedEmergencyMeeting = false})
            i = i + 1
        end
    end
end
return ____exports
 end,
["mod.src.callbacks.executeCmdSubroutines"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
function ____exports.list(self, all)
    if all == nil then
        all = false
    end
    log(nil, "Entities in the room:")
    local roomEntities = Isaac.GetRoomEntities()
    do
        local i = 0
        while i < #roomEntities do
            do
                local entity = roomEntities[i + 1]
                if ((not all) and (entity.Type == EntityType.ENTITY_EFFECT)) and ((((entity.Variant == EffectVariant.TINY_BUG) or (entity.Variant == EffectVariant.WALL_BUG)) or (entity.Variant == EffectVariant.FALLING_EMBER)) or (entity.Variant == EffectVariant.LIGHT)) then
                    goto __continue3
                end
                local debugString = (((((tostring(i + 1) .. " - ") .. tostring(entity.Type)) .. ".") .. tostring(entity.Variant)) .. ".") .. tostring(entity.SubType)
                local bomb = entity:ToBomb()
                if bomb ~= nil then
                    debugString = debugString .. " (bomb)"
                end
                local effect = entity:ToEffect()
                if effect ~= nil then
                    debugString = debugString .. (("." .. tostring(effect.State)) .. " (effect)")
                end
                local familiar = entity:ToFamiliar()
                if familiar ~= nil then
                    debugString = debugString .. (("." .. tostring(familiar.State)) .. " (familiar)")
                end
                local knife = entity:ToKnife()
                if knife ~= nil then
                    debugString = debugString .. " (knife)"
                end
                local laser = entity:ToLaser()
                if laser ~= nil then
                    debugString = debugString .. " (laser)"
                end
                local npc = entity:ToNPC()
                if npc ~= nil then
                    debugString = debugString .. (("." .. tostring(npc.State)) .. " (NPC)")
                end
                local pickup = entity:ToPickup()
                if pickup ~= nil then
                    debugString = debugString .. (("." .. tostring(pickup.State)) .. " (pickup)")
                end
                local player = entity:ToPlayer()
                if player ~= nil then
                    debugString = debugString .. " (player)"
                end
                local projectile = entity:ToProjectile()
                if projectile ~= nil then
                    debugString = debugString .. " (projectile)"
                end
                local tear = entity:ToTear()
                if tear ~= nil then
                    debugString = debugString .. " (tear)"
                end
                debugString = debugString .. ((" (InitSeed: " .. tostring(entity.InitSeed)) .. ")")
                debugString = debugString .. ((((" (Position: " .. tostring(entity.Position.X)) .. ", ") .. tostring(entity.Position.Y)) .. ")")
                log(nil, debugString)
            end
            ::__continue3::
            i = i + 1
        end
    end
    print("Logged the entities in the room to the \"log.txt\" file.")
end
return ____exports
 end,
["mod.src.callbacks.executeCmd"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local functionMap
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getGridEntities = ____isaacscript_2Dcommon.getGridEntities
local getRoomIndex = ____isaacscript_2Dcommon.getRoomIndex
local log = ____isaacscript_2Dcommon.log
local ____debugFunction = require("mod.src.debugFunction")
local debugFunction = ____debugFunction.debugFunction
local ____skeldRoomMap = require("mod.src.skeldRoomMap")
local skeldRoomReverseMap = ____skeldRoomMap.skeldRoomReverseMap
local ____stageAPI = require("mod.src.stageAPI")
local goToStageAPIRoom = ____stageAPI.goToStageAPIRoom
local ____util = require("mod.src.util")
local removeGridEntity = ____util.removeGridEntity
local ____executeCmdSubroutines = require("mod.src.callbacks.executeCmdSubroutines")
local list = ____executeCmdSubroutines.list
function ____exports.main(self, command, parameters)
    local debugString = "MC_EXECUTE_CMD - " .. command
    if parameters ~= "" then
        debugString = debugString .. (" " .. parameters)
    end
    log(nil, debugString)
    local lowercaseCommand = string.lower(command)
    local executeCmdFunction = functionMap:get(lowercaseCommand)
    if executeCmdFunction ~= nil then
        executeCmdFunction(nil, parameters)
    else
        print("Unknown vanilla or Among Us command.")
    end
end
functionMap = __TS__New(Map)
functionMap:set(
    "center",
    function()
        local game = Game()
        local room = game:GetRoom()
        local centerPos = room:GetCenterPos()
        local player = Isaac.GetPlayer()
        player.Position = centerPos
    end
)
functionMap:set(
    "debug",
    function()
        debugFunction(nil)
    end
)
functionMap:set(
    "list",
    function(____, _params)
        list(nil)
    end
)
functionMap:set(
    "listall",
    function(____, _params)
        list(nil, true)
    end
)
functionMap:set(
    "pos",
    function()
        local player = Isaac.GetPlayer()
        print(
            ((("Player position: (" .. tostring(player.Position.X)) .. ", ") .. tostring(player.Position.Y)) .. ")"
        )
    end
)
functionMap:set(
    "w",
    function(____, params)
        local roomName
        local num = tonumber(params)
        if num == nil then
            roomName = params
        else
            local skeldRoom = num
            roomName = skeldRoomReverseMap[skeldRoom]
            if roomName == nil then
                print(
                    "Failed to find the room name for room ID: " .. tostring(skeldRoom)
                )
                return
            end
        end
        goToStageAPIRoom(nil, roomName)
        print("Warped to room: " .. roomName)
    end
)
functionMap:set(
    "removeallgrid",
    function()
        for ____, gridEntity in ipairs(
            getGridEntities(nil)
        ) do
            removeGridEntity(nil, gridEntity)
        end
    end
)
functionMap:set(
    "roomindex",
    function()
        local roomIndex = getRoomIndex(nil)
        print(roomIndex)
    end
)
return ____exports
 end,
["mod.src.loadMap"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local loadStageAPICustomLevel, MAP_ROOM_VARIANT
local ____constants = require("mod.src.constants")
local MOD_NAME = ____constants.MOD_NAME
local taskDescriptions = ____constants.taskDescriptions
local mapData = require("mod.src.data.map")
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____minimapAPI = require("mod.src.minimapAPI")
local setMapToFullVisibility = ____minimapAPI.setMapToFullVisibility
local setMinimapAPIRoomIcon = ____minimapAPI.setMinimapAPIRoomIcon
local ____setupPlayersAndUI = require("mod.src.setupPlayersAndUI")
local setupPlayerAndUI = ____setupPlayersAndUI.setupPlayerAndUI
local ____stageAPI = require("mod.src.stageAPI")
local getStageAPIRoomMapID = ____stageAPI.getStageAPIRoomMapID
function loadStageAPICustomLevel(self)
    if StageAPI == nil then
        return
    end
    local roomsList = StageAPI.RoomsList(MOD_NAME, mapData)
    local levelMap = StageAPI.CreateMapFromRoomsList(roomsList, MAP_ROOM_VARIANT)
    StageAPI.InitCustomLevel(levelMap, true)
end
function ____exports.setTasksOnMap(self)
    if g.game == nil then
        return
    end
    for ____, taskList in ipairs(
        __TS__ObjectValues(g.game.ourTasks)
    ) do
        for ____, task in ipairs(taskList) do
            local taskDescription = taskDescriptions[task]
            local taskRoom = taskDescription.room
            local mapID = getStageAPIRoomMapID(nil, taskRoom)
            if mapID ~= nil then
                setMinimapAPIRoomIcon(nil, mapID, "Item")
            end
        end
    end
end
MAP_ROOM_VARIANT = 99
function ____exports.loadMap(self)
    setupPlayerAndUI(nil)
    loadStageAPICustomLevel(nil)
    setMapToFullVisibility(nil)
    ____exports.setTasksOnMap(nil)
end
return ____exports
 end,
["mod.src.features.cutscene"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local postRenderFadingToBlack, postRenderTextFadingIn, postRenderText, postRenderTextFadingOut, postRenderFadingToGame, drawText, getTextOpacity, drawItem, hasFadeFinished, setState, setSprite, ITEM_SPRITE_OFFSET, itemSprite
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local ensureAllCases = ____isaacscript_2Dcommon.ensureAllCases
local getScreenCenterPos = ____isaacscript_2Dcommon.getScreenCenterPos
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____loadMap = require("mod.src.loadMap")
local loadMap = ____loadMap.loadMap
local ____minimapAPI = require("mod.src.minimapAPI")
local enableMinimapAPI = ____minimapAPI.enableMinimapAPI
local ____sprite = require("mod.src.sprite")
local setSpriteOpacity = ____sprite.setSpriteOpacity
local ____BlackSpriteState = require("mod.src.types.BlackSpriteState")
local BlackSpriteState = ____BlackSpriteState.BlackSpriteState
local ____CutsceneState = require("mod.src.types.CutsceneState")
local CutsceneState = ____CutsceneState.CutsceneState
local ____Role = require("mod.src.types.Role")
local Role = ____Role.Role
local ____util = require("mod.src.util")
local drawFontText = ____util.drawFontText
local getRoleText = ____util.getRoleText
local ____blackSprite = require("mod.src.features.blackSprite")
local FADE_TO_BLACK_FRAMES = ____blackSprite.FADE_TO_BLACK_FRAMES
local setBlackSpriteState = ____blackSprite.setBlackSpriteState
function postRenderFadingToBlack(self)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, CutsceneState.TEXT_FADING_IN)
        setBlackSpriteState(nil, BlackSpriteState.SOLID)
        loadMap(nil)
    end
end
function postRenderTextFadingIn(self)
    drawText(nil)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, CutsceneState.TEXT)
    end
end
function postRenderText(self)
    drawText(nil)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, CutsceneState.TEXT_FADING_OUT)
    end
end
function postRenderTextFadingOut(self)
    drawText(nil)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, CutsceneState.FADING_TO_GAME)
        setBlackSpriteState(nil, BlackSpriteState.FADING_TO_GAME)
        enableMinimapAPI(nil, true)
    end
end
function postRenderFadingToGame(self)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, CutsceneState.DISABLED)
    end
end
function drawText(self)
    if g.game == nil then
        return
    end
    local opacity = getTextOpacity(nil)
    local centerPos = getScreenCenterPos(nil)
    local offset = Vector(0, 10)
    drawFontText(nil, "Your role:", centerPos - offset, opacity)
    local roleText = getRoleText(nil, g.game.role)
    drawFontText(nil, roleText, centerPos + offset, opacity)
    drawItem(nil, centerPos, opacity)
end
function getTextOpacity(self)
    if ((g.game == nil) or (g.game.cutscene.state == CutsceneState.TEXT)) or (g.game.cutscene.startFrame == nil) then
        return 1
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    local framesPassed = isaacFrameCount - g.game.cutscene.startFrame
    local opacity = framesPassed / FADE_TO_BLACK_FRAMES
    if g.game.cutscene.state == CutsceneState.TEXT_FADING_IN then
        return opacity
    end
    if g.game.cutscene.state == CutsceneState.TEXT_FADING_OUT then
        return 1 - opacity
    end
    return 1
end
function drawItem(self, centerPos, opacity)
    local position = centerPos + ITEM_SPRITE_OFFSET
    setSpriteOpacity(nil, itemSprite, opacity)
    itemSprite:RenderLayer(0, position)
end
function hasFadeFinished(self)
    if (g.game == nil) or (g.game.cutscene.startFrame == nil) then
        return false
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    local framesPassed = isaacFrameCount - g.game.cutscene.startFrame
    return framesPassed >= FADE_TO_BLACK_FRAMES
end
function setState(self, state)
    if (g.game == nil) or (not g.game.started) then
        return
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    g.game.cutscene.state = state
    g.game.cutscene.startFrame = isaacFrameCount
end
function setSprite(self)
    if g.game == nil then
        return
    end
    local collectibleType = ((g.game.role == Role.CREW) and CollectibleType.COLLECTIBLE_YUM_HEART) or CollectibleType.COLLECTIBLE_MOMS_KNIFE
    local itemConfig = Isaac.GetItemConfig()
    local itemConfigItem = itemConfig:GetCollectible(collectibleType)
    if itemConfigItem == nil then
        return
    end
    local gfxFileName = itemConfigItem.GfxFileName
    itemSprite:ReplaceSpritesheet(0, gfxFileName)
    itemSprite:LoadGraphics()
end
ITEM_SPRITE_OFFSET = Vector(0, -30)
itemSprite = Sprite()
itemSprite:Load("gfx/item.anm2", false)
itemSprite:SetFrame("Default", 0)
function ____exports.postRender(self)
    if (g.game == nil) or (not g.game.started) then
        return
    end
    repeat
        local ____switch4 = g.game.cutscene.state
        local ____cond4 = ____switch4 == CutsceneState.DISABLED
        if ____cond4 then
            do
                break
            end
        end
        ____cond4 = ____cond4 or (____switch4 == CutsceneState.FADING_TO_BLACK)
        if ____cond4 then
            do
                postRenderFadingToBlack(nil)
                break
            end
        end
        ____cond4 = ____cond4 or (____switch4 == CutsceneState.TEXT_FADING_IN)
        if ____cond4 then
            do
                postRenderTextFadingIn(nil)
                return
            end
        end
        ____cond4 = ____cond4 or (____switch4 == CutsceneState.TEXT)
        if ____cond4 then
            do
                postRenderText(nil)
                return
            end
        end
        ____cond4 = ____cond4 or (____switch4 == CutsceneState.TEXT_FADING_OUT)
        if ____cond4 then
            do
                postRenderTextFadingOut(nil)
                return
            end
        end
        ____cond4 = ____cond4 or (____switch4 == CutsceneState.FADING_TO_GAME)
        if ____cond4 then
            do
                postRenderFadingToGame(nil)
                return
            end
        end
        do
            do
                ensureAllCases(nil, g.game.cutscene.state)
            end
        end
    until true
end
function ____exports.startCutscene(self)
    setSprite(nil)
    setState(nil, CutsceneState.FADING_TO_BLACK)
    setBlackSpriteState(nil, BlackSpriteState.FADING_TO_BLACK)
    enableMinimapAPI(nil, false)
end
function ____exports.inCutscene(self)
    if g.game == nil then
        return false
    end
    return g.game.cutscene.state ~= CutsceneState.DISABLED
end
return ____exports
 end,
["mod.src.features.buttonSubroutines"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local EMERGENCY_BUTTON_ANIMATION_SUFFIX, SPECIAL_BUTTON_ANIMATION_SUFFIX
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local ensureAllCases = ____isaacscript_2Dcommon.ensureAllCases
local ____enums = require("mod.src.enums")
local ButtonSubType = ____enums.ButtonSubType
local EffectVariantCustom = ____enums.EffectVariantCustom
function ____exports.resetButton(self, button)
    local effect = button:ToEffect()
    if effect == nil then
        return
    end
    effect.State = 0
    local sprite = effect:GetSprite()
    local animationSuffix = ____exports.getButtonAnimationSuffix(nil, effect.SubType)
    local animation = "Off" .. animationSuffix
    sprite:Play(animation, true)
end
function ____exports.getButtonAnimationSuffix(self, buttonSubType)
    repeat
        local ____switch13 = buttonSubType
        local ____cond13 = ((((((((____switch13 == ButtonSubType.GO_TO_TASK) or (____switch13 == ButtonSubType.TASK_1)) or (____switch13 == ButtonSubType.TASK_2)) or (____switch13 == ButtonSubType.TASK_3)) or (____switch13 == ButtonSubType.TASK_4)) or (____switch13 == ButtonSubType.TASK_5)) or (____switch13 == ButtonSubType.TASK_6)) or (____switch13 == ButtonSubType.TASK_7)) or (____switch13 == ButtonSubType.TASK_8)
        if ____cond13 then
            do
                return ""
            end
        end
        ____cond13 = ____cond13 or (____switch13 == ButtonSubType.EMERGENCY)
        if ____cond13 then
            do
                return EMERGENCY_BUTTON_ANIMATION_SUFFIX
            end
        end
        ____cond13 = ____cond13 or ((((____switch13 == ButtonSubType.CAMERA) or (____switch13 == ButtonSubType.LIGHTS)) or (____switch13 == ButtonSubType.COMMS)) or (____switch13 == ButtonSubType.O2))
        if ____cond13 then
            do
                return SPECIAL_BUTTON_ANIMATION_SUFFIX
            end
        end
        do
            do
                ensureAllCases(nil, buttonSubType)
                return ""
            end
        end
    until true
end
EMERGENCY_BUTTON_ANIMATION_SUFFIX = "Pentagram"
SPECIAL_BUTTON_ANIMATION_SUFFIX = "Red"
function ____exports.allButtonsPressed(self)
    local buttons = Isaac.FindByType(EntityType.ENTITY_EFFECT, EffectVariantCustom.BUTTON)
    for ____, button in ipairs(buttons) do
        do
            local effect = button:ToEffect()
            if effect == nil then
                goto __continue3
            end
            local pressed = effect.State == 3
            if not pressed then
                return false
            end
        end
        ::__continue3::
    end
    return true
end
function ____exports.resetAllButtons(self)
    local buttons = Isaac.FindByType(EntityType.ENTITY_EFFECT, EffectVariantCustom.BUTTON)
    for ____, button in ipairs(buttons) do
        ____exports.resetButton(nil, button)
    end
end
function ____exports.removeEmergencyButton(self)
    local buttons = Isaac.FindByType(EntityType.ENTITY_EFFECT, EffectVariantCustom.BUTTON, ButtonSubType.EMERGENCY)
    for ____, button in ipairs(buttons) do
        button:Remove()
    end
end
return ____exports
 end,
["mod.src.features.buttonSpawn"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local getTaskButtonSubType
local ____constants = require("mod.src.constants")
local taskDescriptions = ____constants.taskDescriptions
local ____enums = require("mod.src.enums")
local ButtonSubType = ____enums.ButtonSubType
local EffectVariantCustom = ____enums.EffectVariantCustom
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____stageAPI = require("mod.src.stageAPI")
local getSkeldRoom = ____stageAPI.getSkeldRoom
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
local ____buttonSubroutines = require("mod.src.features.buttonSubroutines")
local getButtonAnimationSuffix = ____buttonSubroutines.getButtonAnimationSuffix
function getTaskButtonSubType(self, num)
    repeat
        local ____switch14 = num
        local ____cond14 = ____switch14 == 1
        if ____cond14 then
            do
                return ButtonSubType.TASK_1
            end
        end
        ____cond14 = ____cond14 or (____switch14 == 2)
        if ____cond14 then
            do
                return ButtonSubType.TASK_2
            end
        end
        ____cond14 = ____cond14 or (____switch14 == 3)
        if ____cond14 then
            do
                return ButtonSubType.TASK_3
            end
        end
        ____cond14 = ____cond14 or (____switch14 == 4)
        if ____cond14 then
            do
                return ButtonSubType.TASK_4
            end
        end
        ____cond14 = ____cond14 or (____switch14 == 5)
        if ____cond14 then
            do
                return ButtonSubType.TASK_5
            end
        end
        do
            do
                return ButtonSubType.TASK_1
            end
        end
    until true
end
local EMERGENCY_BUTTON_GRID_INDEX = 265
local function spawnButton(self, buttonSubType, gridIndex, enabled)
    local button = spawnEntity(nil, EntityType.ENTITY_EFFECT, EffectVariantCustom.BUTTON, buttonSubType, gridIndex):ToEffect()
    if button == nil then
        error("Failed to convert the button to an effect.")
    end
    button.State = (enabled and 0) or 3
    local sprite = button:GetSprite()
    local animationSuffix = getButtonAnimationSuffix(nil, buttonSubType)
    local verb = (enabled and "Off") or "On"
    local animation = verb .. animationSuffix
    sprite:Play(animation, true)
    return button
end
function ____exports.spawnGoToTaskButtons(self)
    if g.game == nil then
        return
    end
    local room = getSkeldRoom(nil)
    if room == nil then
        return
    end
    for ____, ____value in ipairs(
        __TS__ObjectEntries(taskDescriptions)
    ) do
        local key
        key = ____value[1]
        local taskDescription
        taskDescription = ____value[2]
        do
            if taskDescription.room ~= room then
                goto __continue7
            end
            local task = tonumber(key)
            if task == nil then
                goto __continue7
            end
            local ourTasksOfThisType = g.game.ourTasks[taskDescription.taskType]
            local enabled = __TS__ArrayIncludes(ourTasksOfThisType, task)
            local button = spawnButton(nil, ButtonSubType.GO_TO_TASK, taskDescription.gridIndex, enabled)
            local data = button:GetData()
            data.task = task
        end
        ::__continue7::
    end
end
function ____exports.spawnEmergencyButton(self)
    if g.game == nil then
        return
    end
    spawnButton(nil, ButtonSubType.EMERGENCY, EMERGENCY_BUTTON_GRID_INDEX, not g.game.usedEmergencyMeeting)
end
function ____exports.spawnTaskButton(self, gridIndex, num)
    local buttonSubType = getTaskButtonSubType(nil, num)
    return spawnButton(nil, buttonSubType, gridIndex, true)
end
return ____exports
 end,
["mod.src.rooms.cafeteria"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local spawnCafeteriaTable
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnEmergencyButton = ____buttonSpawn.spawnEmergencyButton
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function spawnCafeteriaTable(self, gridIndex, num)
    local ____table = spawnEntity(nil, EntityTypeCustom.TABLE, 0, 0, gridIndex)
    local sprite = ____table:GetSprite()
    sprite:ReplaceSpritesheet(
        0,
        ("gfx/cafeteria/table" .. tostring(num)) .. ".png"
    )
    sprite:LoadGraphics()
end
____exports.CENTER_TABLE_GRID_INDEX = 209
function ____exports.spawnCafeteriaObjects(self)
    spawnCafeteriaTable(nil, 119, 1)
    spawnCafeteriaTable(nil, 132, 2)
    spawnCafeteriaTable(nil, ____exports.CENTER_TABLE_GRID_INDEX, 3)
    spawnCafeteriaTable(nil, 315, 4)
    spawnCafeteriaTable(nil, 328, 5)
    spawnEmergencyButton(nil)
end
return ____exports
 end,
["mod.src.features.setupMeeting"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local enablePlayer, enableButton, MEETING_CENTER_OFFSET, MEETING_CIRCLE_RADIUS, MEETING_CIRCLE_Y_MULTIPLIER
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local DISTANCE_OF_GRID_TILE = ____isaacscript_2Dcommon.DISTANCE_OF_GRID_TILE
local getCircleDiscretizedPoints = ____isaacscript_2Dcommon.getCircleDiscretizedPoints
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____minimapAPI = require("mod.src.minimapAPI")
local enableMinimapAPI = ____minimapAPI.enableMinimapAPI
local ____cafeteria = require("mod.src.rooms.cafeteria")
local CENTER_TABLE_GRID_INDEX = ____cafeteria.CENTER_TABLE_GRID_INDEX
local ____stageAPI = require("mod.src.stageAPI")
local getSkeldRoom = ____stageAPI.getSkeldRoom
local goToStageAPIRoom = ____stageAPI.goToStageAPIRoom
local ____SkeldRoom = require("mod.src.types.SkeldRoom")
local SkeldRoom = ____SkeldRoom.SkeldRoom
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnEmergencyButton = ____buttonSpawn.spawnEmergencyButton
local ____buttonSubroutines = require("mod.src.features.buttonSubroutines")
local removeEmergencyButton = ____buttonSubroutines.removeEmergencyButton
function enablePlayer(self, enable)
    if (g.game == nil) or (g.userID == nil) then
        return
    end
    local game = Game()
    local room = game:GetRoom()
    local centerPos = room:GetGridPosition(CENTER_TABLE_GRID_INDEX)
    local ourPlayerIndex = g.game:getPlayerIndexFromUserID(g.userID)
    local circlePoints = ____exports.getMeetingCirclePoints(nil)
    local endMeetingPos = circlePoints[ourPlayerIndex + 1]
    local player = Isaac.GetPlayer()
    player.Visible = enable
    player.EntityCollisionClass = (enable and EntityCollisionClass.ENTCOLL_ALL) or EntityCollisionClass.ENTCOLL_NONE
    player.Position = (enable and endMeetingPos) or centerPos
end
function enableButton(self, enable)
    if enable then
        spawnEmergencyButton(nil)
    else
        removeEmergencyButton(nil)
    end
end
function ____exports.getMeetingCirclePoints(self)
    if g.game == nil then
        error("Failed to get the meeting circle points since the game is null.")
    end
    local game = Game()
    local room = game:GetRoom()
    local centerTablePos = room:GetGridPosition(CENTER_TABLE_GRID_INDEX)
    local meetingCenterPos = centerTablePos + MEETING_CENTER_OFFSET
    return getCircleDiscretizedPoints(nil, meetingCenterPos, MEETING_CIRCLE_RADIUS, #g.game.players, 1, MEETING_CIRCLE_Y_MULTIPLIER)
end
MEETING_CENTER_OFFSET = Vector(0, 10)
MEETING_CIRCLE_RADIUS = DISTANCE_OF_GRID_TILE * 4
MEETING_CIRCLE_Y_MULTIPLIER = 0.75
function ____exports.setupMeeting(self, meetingEnded)
    if g.game == nil then
        return
    end
    local room = getSkeldRoom(nil)
    if room ~= SkeldRoom.CAFETERIA then
        goToStageAPIRoom(nil, "Cafeteria", DoorSlot.DOWN0)
    end
    enableMinimapAPI(nil, meetingEnded)
    enablePlayer(nil, meetingEnded)
    enableButton(nil, meetingEnded)
end
return ____exports
 end,
["mod.src.features.endMeeting"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local postRenderFadingToBlack, postRenderTextFadingIn, postRenderText, postRenderTextFadingOut, postRenderFadingToGame, drawText, getEndOfMeetingText, getTextOpacity, hasFadeFinished, setState
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local ensureAllCases = ____isaacscript_2Dcommon.ensureAllCases
local getScreenCenterPos = ____isaacscript_2Dcommon.getScreenCenterPos
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____minimapAPI = require("mod.src.minimapAPI")
local enableMinimapAPI = ____minimapAPI.enableMinimapAPI
local ____BlackSpriteState = require("mod.src.types.BlackSpriteState")
local BlackSpriteState = ____BlackSpriteState.BlackSpriteState
local ____EndMeetingState = require("mod.src.types.EndMeetingState")
local EndMeetingState = ____EndMeetingState.EndMeetingState
local ____MeetingResolution = require("mod.src.types.MeetingResolution")
local MeetingResolution = ____MeetingResolution.MeetingResolution
local ____util = require("mod.src.util")
local drawFontText = ____util.drawFontText
local ____blackSprite = require("mod.src.features.blackSprite")
local FADE_TO_BLACK_FRAMES = ____blackSprite.FADE_TO_BLACK_FRAMES
local setBlackSpriteState = ____blackSprite.setBlackSpriteState
local ____setupMeeting = require("mod.src.features.setupMeeting")
local setupMeeting = ____setupMeeting.setupMeeting
function postRenderFadingToBlack(self)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, EndMeetingState.TEXT_FADING_IN)
        setBlackSpriteState(nil, BlackSpriteState.SOLID)
    end
end
function postRenderTextFadingIn(self)
    drawText(nil)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, EndMeetingState.TEXT)
    end
end
function postRenderText(self)
    drawText(nil)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, EndMeetingState.TEXT_FADING_OUT)
    end
end
function postRenderTextFadingOut(self)
    drawText(nil)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, EndMeetingState.FADING_TO_GAME)
        setBlackSpriteState(nil, BlackSpriteState.FADING_TO_GAME)
        enableMinimapAPI(nil, true)
        setupMeeting(nil, true)
    end
end
function postRenderFadingToGame(self)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, EndMeetingState.DISABLED)
    end
end
function drawText(self)
    if g.game == nil then
        return
    end
    local opacity = getTextOpacity(nil)
    local centerPos = getScreenCenterPos(nil)
    local text = getEndOfMeetingText(nil)
    drawFontText(nil, text, centerPos, opacity)
end
function getEndOfMeetingText(self)
    local defaultValue = "Unknown"
    if g.game == nil then
        return defaultValue
    end
    if g.game.endMeeting.meetingResolution == MeetingResolution.NO_EJECT then
        return "No one was ejected."
    end
    if (g.game.endMeeting.meetingResolution == MeetingResolution.EJECT) and (g.game.endMeeting.userIDEjected ~= nil) then
        local player = g.game:getPlayerFromUserID(g.game.endMeeting.userIDEjected)
        if player ~= nil then
            return ((player.username .. " was ejected. (") .. tostring(
                g.game:getNumAlivePlayers()
            )) .. " players remain.)"
        end
    end
    return defaultValue
end
function getTextOpacity(self)
    if ((g.game == nil) or (g.game.endMeeting.state == EndMeetingState.TEXT)) or (g.game.endMeeting.startFrame == nil) then
        return 1
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    local framesPassed = isaacFrameCount - g.game.endMeeting.startFrame
    local opacity = framesPassed / FADE_TO_BLACK_FRAMES
    if g.game.endMeeting.state == EndMeetingState.TEXT_FADING_IN then
        return opacity
    end
    if g.game.endMeeting.state == EndMeetingState.TEXT_FADING_OUT then
        return 1 - opacity
    end
    return 1
end
function hasFadeFinished(self)
    if (g.game == nil) or (g.game.endMeeting.startFrame == nil) then
        return false
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    local framesPassed = isaacFrameCount - g.game.endMeeting.startFrame
    return framesPassed >= FADE_TO_BLACK_FRAMES
end
function setState(self, state)
    if (g.game == nil) or (not g.game.started) then
        return
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    g.game.endMeeting.state = state
    g.game.endMeeting.startFrame = isaacFrameCount
    if state == EndMeetingState.DISABLED then
        g.game.endMeeting.userIDEjected = nil
    end
end
function ____exports.postRender(self)
    if (g.game == nil) or (not g.game.started) then
        return
    end
    repeat
        local ____switch4 = g.game.endMeeting.state
        local ____cond4 = ____switch4 == EndMeetingState.DISABLED
        if ____cond4 then
            do
                break
            end
        end
        ____cond4 = ____cond4 or (____switch4 == EndMeetingState.FADING_TO_BLACK)
        if ____cond4 then
            do
                postRenderFadingToBlack(nil)
                break
            end
        end
        ____cond4 = ____cond4 or (____switch4 == EndMeetingState.TEXT_FADING_IN)
        if ____cond4 then
            do
                postRenderTextFadingIn(nil)
                return
            end
        end
        ____cond4 = ____cond4 or (____switch4 == EndMeetingState.TEXT)
        if ____cond4 then
            do
                postRenderText(nil)
                return
            end
        end
        ____cond4 = ____cond4 or (____switch4 == EndMeetingState.TEXT_FADING_OUT)
        if ____cond4 then
            do
                postRenderTextFadingOut(nil)
                return
            end
        end
        ____cond4 = ____cond4 or (____switch4 == EndMeetingState.FADING_TO_GAME)
        if ____cond4 then
            do
                postRenderFadingToGame(nil)
                return
            end
        end
        do
            do
                ensureAllCases(nil, g.game.endMeeting.state)
            end
        end
    until true
end
function ____exports.endMeeting(self)
    setState(nil, EndMeetingState.FADING_TO_BLACK)
    setBlackSpriteState(nil, BlackSpriteState.FADING_TO_BLACK)
end
function ____exports.inEndMeeting(self)
    if g.game == nil then
        return false
    end
    return g.game.endMeeting.state ~= EndMeetingState.DISABLED
end
return ____exports
 end,
["mod.src.callbacks.inputAction"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local disablePreRunMovement, disableCutsceneInputs, shouldDisableCutsceneInputs, disableVanillaConsole, disableReset, MOVEMENT_BUTTONS
local ____constants = require("mod.src.constants")
local IS_DEV = ____constants.IS_DEV
local ____cutscene = require("mod.src.features.cutscene")
local inCutscene = ____cutscene.inCutscene
local ____endMeeting = require("mod.src.features.endMeeting")
local inEndMeeting = ____endMeeting.inEndMeeting
local ____globals = require("mod.src.globals")
local g = ____globals.default
function disablePreRunMovement(self, inputHook, buttonAction)
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    if gameFrameCount > 0 then
        return nil
    end
    if MOVEMENT_BUTTONS:has(buttonAction) then
        return ((inputHook == InputHook.GET_ACTION_VALUE) and 0) or false
    end
    return nil
end
function disableCutsceneInputs(self, inputHook, buttonAction)
    if buttonAction == ButtonAction.ACTION_CONSOLE then
        return nil
    end
    if shouldDisableCutsceneInputs(nil) then
        return ((inputHook == InputHook.GET_ACTION_VALUE) and 0) or false
    end
    return nil
end
function shouldDisableCutsceneInputs(self)
    if g.game == nil then
        return false
    end
    return (inCutscene(nil) or (g.game.meeting ~= nil)) or inEndMeeting(nil)
end
function disableVanillaConsole(self, inputHook, buttonAction)
    if IS_DEV then
        return nil
    end
    if buttonAction == ButtonAction.ACTION_CONSOLE then
        return ((inputHook == InputHook.GET_ACTION_VALUE) and 0) or false
    end
    return nil
end
function disableReset(self, inputHook, buttonAction)
    if IS_DEV then
        return nil
    end
    if buttonAction == ButtonAction.ACTION_RESTART then
        return ((inputHook == InputHook.GET_ACTION_VALUE) and 0) or false
    end
    return nil
end
MOVEMENT_BUTTONS = __TS__New(Set, {ButtonAction.ACTION_LEFT, ButtonAction.ACTION_RIGHT, ButtonAction.ACTION_UP, ButtonAction.ACTION_DOWN})
function ____exports.main(self, _entity, inputHook, buttonAction)
    if g.game == nil then
        return nil
    end
    local returnValue
    returnValue = disablePreRunMovement(nil, inputHook, buttonAction)
    if returnValue ~= nil then
        return returnValue
    end
    returnValue = disableCutsceneInputs(nil, inputHook, buttonAction)
    if returnValue ~= nil then
        return returnValue
    end
    returnValue = disableVanillaConsole(nil, inputHook, buttonAction)
    if returnValue ~= nil then
        return returnValue
    end
    returnValue = disableReset(nil, inputHook, buttonAction)
    if returnValue ~= nil then
        return returnValue
    end
    return nil
end
return ____exports
 end,
["mod.src.callbacks.postCurseEval"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.main(self)
    return LevelCurse.CURSE_NONE
end
return ____exports
 end,
["mod.src.collisionObjects"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local DISTANCE_OF_GRID_TILE = ____isaacscript_2Dcommon.DISTANCE_OF_GRID_TILE
local collisionObjects = require("mod.src.lib.collisionObjects")
function ____exports.addCollision(self, topLeftGridIndex, bottomRightGridIndex, bottomRightXModifier, bottomRightYModifier)
    if bottomRightGridIndex == nil then
        bottomRightGridIndex = topLeftGridIndex
    end
    if bottomRightXModifier == nil then
        bottomRightXModifier = 0
    end
    if bottomRightYModifier == nil then
        bottomRightYModifier = 0
    end
    local game = Game()
    local room = game:GetRoom()
    local halfTileDistance = DISTANCE_OF_GRID_TILE / 2
    local halfTileVectorPlus = Vector(halfTileDistance, halfTileDistance)
    local halfTileVectorMinus = halfTileVectorPlus * -1
    local topLeftGridPosition = room:GetGridPosition(topLeftGridIndex)
    local topLeftOfGridIndex = topLeftGridPosition + halfTileVectorMinus
    local bottomRightGridPosition = room:GetGridPosition(bottomRightGridIndex)
    local bottomRightOfGridIndex = bottomRightGridPosition + halfTileVectorPlus
    local modifier = Vector(bottomRightXModifier, bottomRightYModifier)
    local bottomRightPos = bottomRightOfGridIndex + modifier
    collisionObjects:setCollisionRect(topLeftOfGridIndex, bottomRightPos)
end
return ____exports
 end,
["mod.src.features.teleporter"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getPlayerCloserThan = ____isaacscript_2Dcommon.getPlayerCloserThan
local log = ____isaacscript_2Dcommon.log
local spawnGridEntity = ____isaacscript_2Dcommon.spawnGridEntity
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskLeave = ____taskSubroutines.taskLeave
local TELEPORTER_ACTIVATION_DISTANCE = 20
function ____exports.spawnTeleporter(self, gridIndex)
    spawnGridEntity(nil, GridEntityType.GRID_TELEPORTER, gridIndex)
end
function ____exports.postGridEntityUpdateTeleporter(self, gridEntity)
    if (g.game == nil) or (g.game.currentTask == nil) then
        return
    end
    local playerTouching = getPlayerCloserThan(nil, gridEntity.Position, TELEPORTER_ACTIVATION_DISTANCE)
    if playerTouching == nil then
        return
    end
    log(nil, "Player touched teleporter.")
    taskLeave(nil)
end
return ____exports
 end,
["mod.src.spawnObjects"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local getGridIncrement
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local spawnGridEntity = ____isaacscript_2Dcommon.spawnGridEntity
local ____enums = require("mod.src.enums")
local BoxVariant = ____enums.BoxVariant
local CarpetSubTypeCustom = ____enums.CarpetSubTypeCustom
local EffectVariantCustom = ____enums.EffectVariantCustom
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function getGridIncrement(self, direction)
    local game = Game()
    local room = game:GetRoom()
    local gridWidth = room:GetGridWidth()
    repeat
        local ____switch9 = direction
        local ____cond9 = ____switch9 == Direction.LEFT
        if ____cond9 then
            do
                return -1
            end
        end
        ____cond9 = ____cond9 or (____switch9 == Direction.UP)
        if ____cond9 then
            do
                return -gridWidth
            end
        end
        ____cond9 = ____cond9 or (____switch9 == Direction.RIGHT)
        if ____cond9 then
            do
                return 1
            end
        end
        ____cond9 = ____cond9 or (____switch9 == Direction.DOWN)
        if ____cond9 then
            do
                return gridWidth
            end
        end
        do
            do
                error(
                    "Unknown direction: " .. tostring(direction)
                )
                return 0
            end
        end
    until true
end
function ____exports.spawnBlock(self, gridIndex, visible)
    if visible == nil then
        visible = true
    end
    local gridEntityType = (visible and GridEntityType.GRID_ROCKB) or GridEntityType.GRID_WALL
    local gridEntity = spawnGridEntity(nil, gridEntityType, gridIndex)
    return gridEntity
end
function ____exports.spawnFakeBlock(self, gridIndex)
    spawnEntity(nil, EntityType.ENTITY_EFFECT, EffectVariant.ISAACS_CARPET, CarpetSubTypeCustom.BLOCK, gridIndex)
end
function ____exports.spawnFakeBlockLine(self, gridIndex, num, direction)
    local gridIncrement = getGridIncrement(nil, direction)
    do
        local i = 0
        while i < num do
            ____exports.spawnFakeBlock(nil, gridIndex)
            gridIndex = gridIndex + gridIncrement
            i = i + 1
        end
    end
end
function ____exports.spawnBlockLine(self, gridIndex, num, direction, visible)
    if visible == nil then
        visible = true
    end
    local gridIncrement = getGridIncrement(nil, direction)
    do
        local i = 0
        while i < num do
            ____exports.spawnBlock(nil, gridIndex, visible)
            gridIndex = gridIndex + gridIncrement
            i = i + 1
        end
    end
end
function ____exports.spawnBox(self, gridIndex, large)
    local variant = (large and BoxVariant.LARGE) or BoxVariant.SMALL
    return spawnEntity(nil, EntityTypeCustom.BOX, variant, 0, gridIndex)
end
function ____exports.spawnEngine(self, gridIndex)
    spawnEntity(nil, EntityTypeCustom.ENGINE, 0, 0, gridIndex)
    local topLeftBlockGridIndex = gridIndex - 88
    ____exports.spawnBlockLine(nil, topLeftBlockGridIndex, 9, Direction.RIGHT)
    local topRightBlockGridIndex = gridIndex - 79
    ____exports.spawnBlockLine(nil, topRightBlockGridIndex, 7, Direction.DOWN)
    local bottomLeftBlockGridIndex = gridIndex + 80
    ____exports.spawnBlockLine(nil, bottomLeftBlockGridIndex, 9, Direction.RIGHT)
    local electricBoxGridIndex = gridIndex + 108
    ____exports.spawnBlockLine(nil, electricBoxGridIndex, 3, Direction.RIGHT, false)
end
local function spawnSpikes(self, gridIndex)
    spawnGridEntity(nil, GridEntityType.GRID_SPIKES, gridIndex)
end
function ____exports.spawnSpikesLine(self, gridIndex, num, direction)
    local gridIncrement = getGridIncrement(nil, direction)
    do
        local i = 0
        while i < num do
            spawnSpikes(nil, gridIndex)
            gridIndex = gridIndex + gridIncrement
            i = i + 1
        end
    end
end
function ____exports.spawnVent(self, gridIndex)
    spawnEntity(nil, EntityType.ENTITY_EFFECT, EffectVariantCustom.VENT, 0, gridIndex)
end
return ____exports
 end,
["mod.src.tasks.buttonsBehindKeyBlocks"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local spawnKeys
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local spawnGridEntity = ____isaacscript_2Dcommon.spawnGridEntity
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnTaskButton = ____buttonSpawn.spawnTaskButton
local ____buttonSubroutines = require("mod.src.features.buttonSubroutines")
local allButtonsPressed = ____buttonSubroutines.allButtonsPressed
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnFakeBlockLine = ____spawnObjects.spawnFakeBlockLine
local ____util = require("mod.src.util")
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
local spawnEntity = ____util.spawnEntity
function spawnKeys(self, gridIndex)
    local bombs = spawnEntity(nil, EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_KEY, KeySubType.KEY_DOUBLEPACK, gridIndex)
    local sprite = bombs:GetSprite()
    sprite:SetLastFrame()
end
function ____exports.buttonsBehindKeyBlocks(self)
    local leftGridIndex = 62
    movePlayerToGridIndex(nil, leftGridIndex)
    local topRightGridIndex = 42
    spawnTeleporter(nil, topRightGridIndex)
    spawnKeys(nil, 35)
    spawnKeys(nil, 36)
    spawnKeys(nil, 37)
    spawnKeys(nil, 38)
    spawnKeys(nil, 39)
    spawnTaskButton(nil, 110, 1)
    spawnTaskButton(nil, 112, 1)
    spawnTaskButton(nil, 114, 1)
    spawnFakeBlockLine(nil, 64, 4, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 64, 109)
        end
    )
    spawnFakeBlockLine(nil, 66, 4, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 66, 111)
        end
    )
    spawnFakeBlockLine(nil, 68, 4, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 68, 113)
        end
    )
    spawnFakeBlockLine(nil, 70, 4, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 70, 115)
        end
    )
    spawnGridEntity(nil, GridEntityType.GRID_LOCK, 65)
    spawnGridEntity(nil, GridEntityType.GRID_LOCK, 80)
    spawnGridEntity(nil, GridEntityType.GRID_LOCK, 95)
    spawnGridEntity(nil, GridEntityType.GRID_LOCK, 67)
    spawnGridEntity(nil, GridEntityType.GRID_LOCK, 82)
    spawnGridEntity(nil, GridEntityType.GRID_LOCK, 97)
    spawnGridEntity(nil, GridEntityType.GRID_LOCK, 69)
    spawnGridEntity(nil, GridEntityType.GRID_LOCK, 84)
    spawnGridEntity(nil, GridEntityType.GRID_LOCK, 99)
end
function ____exports.buttonsBehindKeyBlocksButtonPressed(self)
    if allButtonsPressed(nil) then
        taskComplete(nil)
    end
end
return ____exports
 end,
["mod.src.tasks.fixWires"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local leftSideButtonPressed, rightSideButtonPressed, resetLeftButtons, buttonColorActive, colorsComplete, lineSprites
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local arrayShuffle = ____isaacscript_2Dcommon.arrayShuffle
local getEnumValues = ____isaacscript_2Dcommon.getEnumValues
local ____enums = require("mod.src.enums")
local ButtonSubType = ____enums.ButtonSubType
local EffectVariantCustom = ____enums.EffectVariantCustom
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnTaskButton = ____buttonSpawn.spawnTaskButton
local ____buttonSubroutines = require("mod.src.features.buttonSubroutines")
local resetButton = ____buttonSubroutines.resetButton
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local taskLeave = ____taskSubroutines.taskLeave
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____util = require("mod.src.util")
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
local spawnEntity = ____util.spawnEntity
function ____exports.fixWiresResetButtonColorActive(self)
    buttonColorActive = nil
end
function leftSideButtonPressed(self, color, button)
    resetLeftButtons(nil, color)
    buttonColorActive = color
    local spriteDescription = lineSprites[buttonColorActive]
    spriteDescription.startPosition = Isaac.WorldToRenderPosition(button.Position)
end
function rightSideButtonPressed(self, color)
    if color ~= buttonColorActive then
        taskLeave(nil)
        return
    end
    local spriteDescription = lineSprites[buttonColorActive]
    spriteDescription.finished = true
    __TS__ArrayPush(colorsComplete, buttonColorActive)
    buttonColorActive = nil
    local allColors = getEnumValues(nil, ____exports.WireColor)
    if #colorsComplete == #allColors then
        taskComplete(nil)
    end
end
function resetLeftButtons(self, exceptColor)
    local buttons = Isaac.FindByType(EntityType.ENTITY_EFFECT, EffectVariantCustom.BUTTON, ButtonSubType.TASK_1)
    for ____, button in ipairs(buttons) do
        local data = button:GetData()
        local color = data.color
        if (color ~= exceptColor) and (not __TS__ArrayIncludes(colorsComplete, color)) then
            resetButton(nil, button)
        end
    end
end
local THIS_TASK = Task.SHORT_FIX_WIRES
local NUM_BUTTONS = 4
local WIRE_SIGN_OFFSET = Vector(-28, 0)
____exports.WireColor = WireColor or ({})
____exports.WireColor.YELLOW = 0
____exports.WireColor[____exports.WireColor.YELLOW] = "YELLOW"
____exports.WireColor.BLUE = 1
____exports.WireColor[____exports.WireColor.BLUE] = "BLUE"
____exports.WireColor.RED = 2
____exports.WireColor[____exports.WireColor.RED] = "RED"
____exports.WireColor.MAGENTA = 3
____exports.WireColor[____exports.WireColor.MAGENTA] = "MAGENTA"
local WIRE_COLORS = {
    [____exports.WireColor.YELLOW] = Color(1, 1, 0),
    [____exports.WireColor.BLUE] = Color(0, 0, 1),
    [____exports.WireColor.RED] = Color(1, 0, 0),
    [____exports.WireColor.MAGENTA] = Color(1, 0, 1)
}
buttonColorActive = nil
colorsComplete = {}
lineSprites = {
    [____exports.WireColor.YELLOW] = {
        startPosition = nil,
        endPosition = nil,
        sprite = Sprite(),
        finished = false
    },
    [____exports.WireColor.BLUE] = {
        startPosition = nil,
        endPosition = nil,
        sprite = Sprite(),
        finished = false
    },
    [____exports.WireColor.RED] = {
        startPosition = nil,
        endPosition = nil,
        sprite = Sprite(),
        finished = false
    },
    [____exports.WireColor.MAGENTA] = {
        startPosition = nil,
        endPosition = nil,
        sprite = Sprite(),
        finished = false
    }
}
for ____, spriteDescription in ipairs(
    __TS__ObjectValues(lineSprites)
) do
    local sprite = spriteDescription.sprite
    sprite:Load("gfx/electrical/line.anm2", true)
    sprite:SetFrame("Default", 0)
end
function ____exports.fixWires(self)
    local game = Game()
    local room = game:GetRoom()
    local gridWidth = room:GetGridWidth()
    local centerGridIndex = 52
    movePlayerToGridIndex(nil, centerGridIndex)
    local bottomGridIndex = 97
    spawnTeleporter(nil, bottomGridIndex)
    local topLeftGridIndex = 16
    do
        local i = 0
        while i < NUM_BUTTONS do
            local gridIndex = topLeftGridIndex + ((i * gridWidth) * 2)
            local button = spawnTaskButton(nil, gridIndex, 1)
            local data = button:GetData()
            data.color = i
            local sign = spawnEntity(nil, EntityTypeCustom.WIRE_SIGN, 0, 0, gridIndex)
            local sprite = sign:GetSprite()
            sprite.Offset = WIRE_SIGN_OFFSET
            sprite:SetFrame(i)
            i = i + 1
        end
    end
    local topRightGridIndex = 28
    local wireColors = getEnumValues(nil, ____exports.WireColor)
    local randomWireColors = arrayShuffle(nil, wireColors)
    do
        local i = 0
        while i < NUM_BUTTONS do
            local color = randomWireColors[i + 1]
            local gridIndex = topRightGridIndex + ((i * gridWidth) * 2)
            local button = spawnTaskButton(nil, gridIndex, 2)
            local data = button:GetData()
            data.color = color
            local sign = spawnEntity(nil, EntityTypeCustom.WIRE_SIGN, 0, 0, gridIndex)
            local sprite = sign:GetSprite()
            sprite.Offset = WIRE_SIGN_OFFSET * -1
            sprite:SetFrame(color)
            i = i + 1
        end
    end
    ____exports.fixWiresResetButtonColorActive(nil)
end
function ____exports.fixWiresButtonPressed(self, button, num)
    local data = button:GetData()
    local color = data.color
    if num == 1 then
        leftSideButtonPressed(nil, color, button)
    else
        rightSideButtonPressed(nil, color)
    end
end
function ____exports.postRender(self)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    local player = Isaac.GetPlayer()
    if buttonColorActive ~= nil then
        local spriteDescription = lineSprites[buttonColorActive]
        spriteDescription.endPosition = Isaac.WorldToRenderPosition(player.Position)
    end
    for ____, ____value in ipairs(
        __TS__ObjectEntries(lineSprites)
    ) do
        local colorString
        colorString = ____value[1]
        local spriteDescription
        spriteDescription = ____value[2]
        do
            local color = colorString
            local startPosition = spriteDescription.startPosition
            local endPosition = spriteDescription.endPosition
            local sprite = spriteDescription.sprite
            local finished = spriteDescription.finished
            if (startPosition == nil) or (endPosition == nil) then
                goto __continue20
            end
            if (color ~= buttonColorActive) and (not finished) then
                goto __continue20
            end
            local combinedVector = endPosition - startPosition
            sprite.Rotation = combinedVector:GetAngleDegrees()
            sprite.Scale = Vector(
                combinedVector:Length(),
                1
            )
            sprite.Color = WIRE_COLORS[color]
            sprite:Render(startPosition, Vector.Zero, Vector.Zero)
        end
        ::__continue20::
    end
end
return ____exports
 end,
["mod.src.tasks.identifyItems"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local spawnButtons, setupRound, getRandomItems, correctSelection, incorrectSelection, drawItemSprites, drawItemText, NUM_ROUNDS, ROW_LENGTH, TEXT_GRID_INDEX, sfx, itemSprites, currentRound, currentItem, correctItemIndex
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local arrayEmpty = ____isaacscript_2Dcommon.arrayEmpty
local getCollectibleSet = ____isaacscript_2Dcommon.getCollectibleSet
local getItemName = ____isaacscript_2Dcommon.getItemName
local getRandomArrayElement = ____isaacscript_2Dcommon.getRandomArrayElement
local getRandomArrayIndex = ____isaacscript_2Dcommon.getRandomArrayIndex
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnTaskButton = ____buttonSpawn.spawnTaskButton
local ____buttonSubroutines = require("mod.src.features.buttonSubroutines")
local resetAllButtons = ____buttonSubroutines.resetAllButtons
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local taskLeave = ____taskSubroutines.taskLeave
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____sprite = require("mod.src.sprite")
local initGlowingItemSprite = ____sprite.initGlowingItemSprite
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____util = require("mod.src.util")
local drawFontText = ____util.drawFontText
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
function spawnButtons(self)
    local gridIndex = ____exports.IDENTIFY_ITEMS_BUTTON_1_GRID_INDEX
    do
        local i = 0
        while i < ____exports.IDENTIFY_ITEMS_NUM_RANDOM_ITEMS do
            spawnTaskButton(nil, gridIndex, i + 1)
            gridIndex = gridIndex + ____exports.IDENTIFY_ITEMS_BUTTON_SPACING
            i = i + 1
        end
    end
end
function setupRound(self)
    local startGridIndex = 97
    movePlayerToGridIndex(nil, startGridIndex)
    local randomItems = getRandomItems(nil)
    arrayEmpty(nil, itemSprites)
    do
        local i = 0
        while i < ____exports.IDENTIFY_ITEMS_NUM_RANDOM_ITEMS do
            local randomItem = randomItems[i + 1]
            local sprite = initGlowingItemSprite(nil, randomItem)
            __TS__ArrayPush(itemSprites, sprite)
            i = i + 1
        end
    end
    local randomIndex = getRandomArrayIndex(nil, randomItems)
    local randomItem = randomItems[randomIndex + 1]
    correctItemIndex = randomIndex
    currentItem = getItemName(nil, randomItem)
    resetAllButtons(nil)
end
function getRandomItems(self)
    local collectibleSet = getCollectibleSet(nil)
    local collectibleArray = {}
    for ____, collectibleType in __TS__Iterator(
        collectibleSet:values()
    ) do
        __TS__ArrayPush(collectibleArray, collectibleType)
    end
    local randomItems = {}
    while #randomItems < ____exports.IDENTIFY_ITEMS_NUM_RANDOM_ITEMS do
        local randomItem = getRandomArrayElement(nil, collectibleArray)
        if not __TS__ArrayIncludes(randomItems, randomItem) then
            __TS__ArrayPush(randomItems, randomItem)
        end
    end
    return randomItems
end
function correctSelection(self)
    sfx:Play(SoundEffect.SOUND_THUMBSUP)
    currentRound = currentRound + 1
    if currentRound >= NUM_ROUNDS then
        taskComplete(nil)
    else
        setupRound(nil)
    end
end
function incorrectSelection(self)
    sfx:Play(SoundEffect.SOUND_THUMBS_DOWN)
    taskLeave(nil)
end
function drawItemSprites(self)
    local game = Game()
    local room = game:GetRoom()
    local buttonGridIndex = ____exports.IDENTIFY_ITEMS_BUTTON_1_GRID_INDEX
    do
        local i = 0
        while i < ____exports.IDENTIFY_ITEMS_NUM_RANDOM_ITEMS do
            local spriteGridIndex = buttonGridIndex - ROW_LENGTH
            local gamePosition = room:GetGridPosition(spriteGridIndex)
            local position = Isaac.WorldToRenderPosition(gamePosition)
            local sprite = itemSprites[i + 1]
            if sprite ~= nil then
                sprite:RenderLayer(0, position)
            end
            buttonGridIndex = buttonGridIndex + ____exports.IDENTIFY_ITEMS_BUTTON_SPACING
            i = i + 1
        end
    end
end
function drawItemText(self)
    local game = Game()
    local room = game:GetRoom()
    local worldPosition = room:GetGridPosition(TEXT_GRID_INDEX)
    local position = Isaac.WorldToRenderPosition(worldPosition)
    local text = "Find: " .. currentItem
    drawFontText(nil, text, position)
end
____exports.IDENTIFY_ITEMS_NUM_RANDOM_ITEMS = 5
____exports.IDENTIFY_ITEMS_BUTTON_SPACING = 2
____exports.IDENTIFY_ITEMS_BUTTON_1_GRID_INDEX = 48
local THIS_TASK = Task.SHORT_IDENTIFY_ITEMS
NUM_ROUNDS = 5
ROW_LENGTH = 15
TEXT_GRID_INDEX = 86
local STARTING_ROUND = 1
sfx = SFXManager()
itemSprites = {}
currentRound = STARTING_ROUND
currentItem = ""
correctItemIndex = 0
function ____exports.identifyItems(self)
    local bottomLeftGridIndex = 92
    spawnTeleporter(nil, bottomLeftGridIndex)
    spawnButtons(nil)
    currentRound = STARTING_ROUND
    setupRound(nil)
end
function ____exports.identifyItemButtonPressed(self, num)
    Isaac.DebugString(
        "correctItemIndex: " .. tostring(correctItemIndex)
    )
    if num == (correctItemIndex + 1) then
        correctSelection(nil)
    else
        incorrectSelection(nil)
    end
end
function ____exports.postRender(self)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    drawItemSprites(nil)
    drawItemText(nil)
end
return ____exports
 end,
["mod.src.tasks.identifyPickupsInOrder"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local setupRound, drawPickupText, drawPickupSprites, spawnButtons, TEXT_GRID_INDEX, TEXT_SHOW_FRAMES, BUTTON_GRID_INDEXES, ROW_LENGTH, SPRITE_OFFSET, PickupType, pickupDescriptions, currentRound, showingPickupIndex, showingPickupFrame, pickupSprites, currentPickupOrder
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local arrayEmpty = ____isaacscript_2Dcommon.arrayEmpty
local getEnumValues = ____isaacscript_2Dcommon.getEnumValues
local getRandomArrayElement = ____isaacscript_2Dcommon.getRandomArrayElement
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnTaskButton = ____buttonSpawn.spawnTaskButton
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskLeave = ____taskSubroutines.taskLeave
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____util = require("mod.src.util")
local drawFontText = ____util.drawFontText
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
function setupRound(self)
    local centerGridIndex = 82
    movePlayerToGridIndex(nil, centerGridIndex)
    do
        local i = 0
        while i < currentRound do
            local pickupType = getEnumValues(nil, PickupType)
            local randomPickupType = getRandomArrayElement(nil, pickupType)
            __TS__ArrayPush(currentPickupOrder, randomPickupType)
            i = i + 1
        end
    end
    showingPickupIndex = 0
    showingPickupFrame = Isaac.GetFrameCount()
end
function drawPickupText(self)
    if (showingPickupIndex == nil) or (showingPickupFrame == nil) then
        return
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    if isaacFrameCount >= (showingPickupFrame + TEXT_SHOW_FRAMES) then
        showingPickupIndex = showingPickupIndex + 1
        showingPickupFrame = isaacFrameCount
        if showingPickupIndex >= #currentPickupOrder then
            showingPickupIndex = nil
            showingPickupFrame = nil
            spawnButtons(nil)
            return
        end
    end
    local game = Game()
    local room = game:GetRoom()
    local worldPosition = room:GetGridPosition(TEXT_GRID_INDEX)
    local position = Isaac.WorldToRenderPosition(worldPosition)
    local pickupType = currentPickupOrder[showingPickupIndex + 1]
    local pickupDescription = pickupDescriptions[pickupType]
    local text = pickupDescription.name
    drawFontText(nil, text, position)
end
function drawPickupSprites(self)
    if (showingPickupIndex ~= nil) or (showingPickupFrame ~= nil) then
        return
    end
    local game = Game()
    local room = game:GetRoom()
    do
        local i = 0
        while i < #BUTTON_GRID_INDEXES do
            local buttonGridIndex = BUTTON_GRID_INDEXES[i + 1]
            local spriteGridIndex = buttonGridIndex - ROW_LENGTH
            local gamePosition = room:GetGridPosition(spriteGridIndex)
            local renderPosition = Isaac.WorldToRenderPosition(gamePosition)
            local position = renderPosition + SPRITE_OFFSET
            local sprite = pickupSprites[i + 1]
            if sprite ~= nil then
                sprite:RenderLayer(0, position)
            end
            i = i + 1
        end
    end
end
function spawnButtons(self)
    local pickupTypes = getEnumValues(nil, PickupType)
    do
        local i = 0
        while i < #pickupTypes do
            local gridIndex = BUTTON_GRID_INDEXES[i + 1]
            local button = spawnTaskButton(nil, gridIndex, 1)
            local data = button:GetData()
            data.pickupType = pickupTypes[i + 1]
            i = i + 1
        end
    end
end
local THIS_TASK = Task.LONG_IDENTIFY_PICKUPS_IN_ORDER
local STARTING_ROUND = 1
TEXT_GRID_INDEX = 86
TEXT_SHOW_FRAMES = 30
BUTTON_GRID_INDEXES = {32, 62, 92, 42, 72, 102, 35, 37, 39}
ROW_LENGTH = 15
SPRITE_OFFSET = Vector(0, 10)
local MAX_ROUNDS = 6
PickupType = PickupType or ({})
PickupType.HEART = 0
PickupType[PickupType.HEART] = "HEART"
PickupType.COIN = 1
PickupType[PickupType.COIN] = "COIN"
PickupType.BOMB = 2
PickupType[PickupType.BOMB] = "BOMB"
PickupType.KEY = 3
PickupType[PickupType.KEY] = "KEY"
PickupType.PILL = 4
PickupType[PickupType.PILL] = "PILL"
PickupType.CARD = 5
PickupType[PickupType.CARD] = "CARD"
PickupType.CHEST = 6
PickupType[PickupType.CHEST] = "CHEST"
PickupType.SACK = 7
PickupType[PickupType.SACK] = "SACK"
PickupType.BATTERY = 8
PickupType[PickupType.BATTERY] = "BATTERY"
pickupDescriptions = {[PickupType.HEART] = {name = "Heart", gfx = "gfx/005.011_heart.anm2"}, [PickupType.COIN] = {name = "Coin", gfx = "gfx/005.021_penny.anm2"}, [PickupType.BOMB] = {name = "Bomb", gfx = "gfx/005.041_bomb.anm2"}, [PickupType.KEY] = {name = "Key", gfx = "gfx/005.031_key.anm2"}, [PickupType.PILL] = {name = "Pill", gfx = "gfx/005.071_pill blue-blue.anm2"}, [PickupType.CARD] = {name = "Card", gfx = "gfx/005.301_tarot card.anm2"}, [PickupType.CHEST] = {name = "Chest", gfx = "gfx/005.050_chest.anm2"}, [PickupType.SACK] = {name = "Sack", gfx = "gfx/005.069_grabbag.anm2"}, [PickupType.BATTERY] = {name = "Battery", gfx = "gfx/005.090_littlebattery.anm2"}}
local sfx = SFXManager()
currentRound = STARTING_ROUND
showingPickupIndex = nil
showingPickupFrame = nil
pickupSprites = {}
currentPickupOrder = {}
local currentChoosingIndex = 0
do
    local i = 0
    while i < #getEnumValues(nil, PickupType) do
        local pickupDescription = pickupDescriptions[i]
        local sprite = Sprite()
        sprite:Load(pickupDescription.gfx, true)
        sprite:SetFrame("Idle", 0)
        __TS__ArrayPush(pickupSprites, sprite)
        i = i + 1
    end
end
function ____exports.identifyPickupsInOrder(self)
    local bottomGridIndex = 112
    spawnTeleporter(nil, bottomGridIndex)
    currentRound = STARTING_ROUND
    arrayEmpty(nil, currentPickupOrder)
    setupRound(nil)
end
function ____exports.postRender(self)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    drawPickupText(nil)
    drawPickupSprites(nil)
end
function ____exports.identiyPickupsInOrderButtonPressed(self, button)
    local data = button:GetData()
    local pickupType = data.pickupType
    if pickupType == nil then
        return
    end
    local correctPickup = currentPickupOrder[currentChoosingIndex + 1]
end
local function incorrectSelection(self)
    sfx:Play(SoundEffect.SOUND_THUMBS_DOWN)
    taskLeave(nil)
end
return ____exports
 end,
["mod.src.tasks.identifyTrinkets"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local spawnButtons, setupRound, getRandomTrinkets, correctSelection, incorrectSelection, drawTrinketSprites, drawTrinketText, NUM_ROUNDS, ROW_LENGTH, TEXT_GRID_INDEX, trinketSprites, currentTrinket, sfx, currentRound, correctTrinketIndex
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local arrayEmpty = ____isaacscript_2Dcommon.arrayEmpty
local getItemName = ____isaacscript_2Dcommon.getItemName
local getRandomArrayElement = ____isaacscript_2Dcommon.getRandomArrayElement
local getRandomArrayIndex = ____isaacscript_2Dcommon.getRandomArrayIndex
local getTrinketSet = ____isaacscript_2Dcommon.getTrinketSet
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnTaskButton = ____buttonSpawn.spawnTaskButton
local ____buttonSubroutines = require("mod.src.features.buttonSubroutines")
local resetAllButtons = ____buttonSubroutines.resetAllButtons
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local taskLeave = ____taskSubroutines.taskLeave
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____sprite = require("mod.src.sprite")
local initGlowingItemSprite = ____sprite.initGlowingItemSprite
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____util = require("mod.src.util")
local drawFontText = ____util.drawFontText
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
function spawnButtons(self)
    local gridIndex = ____exports.IDENTIFY_TRINKETS_BUTTON_1_GRID_INDEX
    do
        local i = 0
        while i < ____exports.IDENTIFY_TRINKETS_NUM_RANDOM_TRINKETS do
            spawnTaskButton(nil, gridIndex, i + 1)
            gridIndex = gridIndex + ____exports.IDENTIFY_TRINKETS_BUTTON_SPACING
            i = i + 1
        end
    end
end
function setupRound(self)
    local startGridIndex = 97
    movePlayerToGridIndex(nil, startGridIndex)
    local randomTrinkets = getRandomTrinkets(nil)
    arrayEmpty(nil, trinketSprites)
    do
        local i = 0
        while i < ____exports.IDENTIFY_TRINKETS_NUM_RANDOM_TRINKETS do
            local randomTrinket = randomTrinkets[i + 1]
            local sprite = initGlowingItemSprite(nil, randomTrinket, true)
            __TS__ArrayPush(trinketSprites, sprite)
            i = i + 1
        end
    end
    local randomIndex = getRandomArrayIndex(nil, randomTrinkets)
    local randomTrinket = randomTrinkets[randomIndex + 1]
    correctTrinketIndex = randomIndex
    currentTrinket = getItemName(nil, randomTrinket, true)
    resetAllButtons(nil)
end
function getRandomTrinkets(self)
    local trinketSet = getTrinketSet(nil)
    local trinketArray = {}
    for ____, trinketType in __TS__Iterator(
        trinketSet:values()
    ) do
        __TS__ArrayPush(trinketArray, trinketType)
    end
    local randomTrinkets = {}
    while #randomTrinkets < ____exports.IDENTIFY_TRINKETS_NUM_RANDOM_TRINKETS do
        local randomTrinket = getRandomArrayElement(nil, trinketArray)
        if not __TS__ArrayIncludes(randomTrinkets, randomTrinket) then
            __TS__ArrayPush(randomTrinkets, randomTrinket)
        end
    end
    return randomTrinkets
end
function correctSelection(self)
    sfx:Play(SoundEffect.SOUND_THUMBSUP)
    currentRound = currentRound + 1
    if currentRound >= NUM_ROUNDS then
        taskComplete(nil)
    else
        setupRound(nil)
    end
end
function incorrectSelection(self)
    sfx:Play(SoundEffect.SOUND_THUMBS_DOWN)
    taskLeave(nil)
end
function drawTrinketSprites(self)
    local game = Game()
    local room = game:GetRoom()
    local buttonGridIndex = ____exports.IDENTIFY_TRINKETS_BUTTON_1_GRID_INDEX
    do
        local i = 0
        while i < ____exports.IDENTIFY_TRINKETS_NUM_RANDOM_TRINKETS do
            local spriteGridIndex = buttonGridIndex - ROW_LENGTH
            local gamePosition = room:GetGridPosition(spriteGridIndex)
            local position = Isaac.WorldToRenderPosition(gamePosition)
            local sprite = trinketSprites[i + 1]
            if sprite ~= nil then
                sprite:RenderLayer(0, position)
            end
            buttonGridIndex = buttonGridIndex + ____exports.IDENTIFY_TRINKETS_BUTTON_SPACING
            i = i + 1
        end
    end
end
function drawTrinketText(self)
    local game = Game()
    local room = game:GetRoom()
    local worldPosition = room:GetGridPosition(TEXT_GRID_INDEX)
    local position = Isaac.WorldToRenderPosition(worldPosition)
    local text = "Find: " .. currentTrinket
    drawFontText(nil, text, position)
end
____exports.IDENTIFY_TRINKETS_NUM_RANDOM_TRINKETS = 5
____exports.IDENTIFY_TRINKETS_BUTTON_SPACING = 2
____exports.IDENTIFY_TRINKETS_BUTTON_1_GRID_INDEX = 48
local THIS_TASK = Task.SHORT_IDENTIFY_TRINKETS
NUM_ROUNDS = 5
ROW_LENGTH = 15
TEXT_GRID_INDEX = 86
local STARTING_ROUND = 1
trinketSprites = {}
currentTrinket = ""
sfx = SFXManager()
currentRound = STARTING_ROUND
correctTrinketIndex = 0
function ____exports.identifyTrinkets(self)
    local bottomLeftGridIndex = 92
    spawnTeleporter(nil, bottomLeftGridIndex)
    spawnButtons(nil)
    currentRound = STARTING_ROUND
    setupRound(nil)
end
function ____exports.identifyTrinketButtonPressed(self, num)
    if num == (correctTrinketIndex + 1) then
        correctSelection(nil)
    else
        incorrectSelection(nil)
    end
end
function ____exports.postRender(self)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    drawTrinketSprites(nil)
    drawTrinketText(nil)
end
return ____exports
 end,
["mod.src.tasks.pressButtonsWithGrudge"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnTaskButton = ____buttonSpawn.spawnTaskButton
local ____buttonSubroutines = require("mod.src.features.buttonSubroutines")
local allButtonsPressed = ____buttonSubroutines.allButtonsPressed
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____util = require("mod.src.util")
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
local spawnEntity = ____util.spawnEntity
function ____exports.pressButtonsWithGrudge(self)
    local centerGridIndex = 67
    movePlayerToGridIndex(nil, centerGridIndex)
    local bottomLeftGridIndex = 73
    spawnTeleporter(nil, bottomLeftGridIndex)
    local cornerGridIndexes = {16, 28, 106, 118}
    for ____, gridIndex in ipairs(cornerGridIndexes) do
        spawnEntity(nil, EntityType.ENTITY_GRUDGE, 0, 0, gridIndex)
    end
    local buttonGridIndexes = {19, 25, 109, 115, 61, 43, 103}
    for ____, gridIndex in ipairs(buttonGridIndexes) do
        spawnTaskButton(nil, gridIndex, 1)
    end
end
function ____exports.pressButtonsWithGrudgeButtonPressed(self)
    if allButtonsPressed(nil) then
        taskComplete(nil)
    end
end
return ____exports
 end,
["mod.src.features.button"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local checkIfButtonIsPressed, buttonPressed, buttonPressedGoToTask, buttonPressedEmergency, buttonPressedTask, BUTTON_ACTIVATION_DISTANCE
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local ensureAllCases = ____isaacscript_2Dcommon.ensureAllCases
local getPlayerCloserThan = ____isaacscript_2Dcommon.getPlayerCloserThan
local ____enums = require("mod.src.enums")
local ButtonSubType = ____enums.ButtonSubType
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local ____stageAPI = require("mod.src.stageAPI")
local goToStageAPIRoom = ____stageAPI.goToStageAPIRoom
local ____buttonsBehindKeyBlocks = require("mod.src.tasks.buttonsBehindKeyBlocks")
local buttonsBehindKeyBlocksButtonPressed = ____buttonsBehindKeyBlocks.buttonsBehindKeyBlocksButtonPressed
local ____fixWires = require("mod.src.tasks.fixWires")
local fixWiresButtonPressed = ____fixWires.fixWiresButtonPressed
local ____identifyItems = require("mod.src.tasks.identifyItems")
local identifyItemButtonPressed = ____identifyItems.identifyItemButtonPressed
local ____identifyPickupsInOrder = require("mod.src.tasks.identifyPickupsInOrder")
local identiyPickupsInOrderButtonPressed = ____identifyPickupsInOrder.identiyPickupsInOrderButtonPressed
local ____identifyTrinkets = require("mod.src.tasks.identifyTrinkets")
local identifyTrinketButtonPressed = ____identifyTrinkets.identifyTrinketButtonPressed
local ____pressButtonsWithGrudge = require("mod.src.tasks.pressButtonsWithGrudge")
local pressButtonsWithGrudgeButtonPressed = ____pressButtonsWithGrudge.pressButtonsWithGrudgeButtonPressed
local ____MeetingType = require("mod.src.types.MeetingType")
local MeetingType = ____MeetingType.MeetingType
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____buttonSubroutines = require("mod.src.features.buttonSubroutines")
local getButtonAnimationSuffix = ____buttonSubroutines.getButtonAnimationSuffix
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
function checkIfButtonIsPressed(self, effect)
    if effect.State == 3 then
        return
    end
    local player = getPlayerCloserThan(nil, effect.Position, BUTTON_ACTIVATION_DISTANCE)
    if player == nil then
        return
    end
    effect.State = 3
    local sprite = effect:GetSprite()
    local animationSuffix = getButtonAnimationSuffix(nil, effect.SubType)
    local animation = "Switched" .. animationSuffix
    sprite:Play(animation, true)
    local sfx = SFXManager()
    sfx:Play(SoundEffect.SOUND_BUTTON_PRESS)
    buttonPressed(nil, effect)
end
function buttonPressed(self, button)
    local buttonSubType = button.SubType
    repeat
        local ____switch7 = buttonSubType
        local ____cond7 = ____switch7 == ButtonSubType.GO_TO_TASK
        if ____cond7 then
            do
                buttonPressedGoToTask(nil, button)
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.EMERGENCY)
        if ____cond7 then
            do
                buttonPressedEmergency(nil)
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.CAMERA)
        if ____cond7 then
            do
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.LIGHTS)
        if ____cond7 then
            do
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.COMMS)
        if ____cond7 then
            do
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.O2)
        if ____cond7 then
            do
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.TASK_1)
        if ____cond7 then
            do
                buttonPressedTask(nil, button, 1)
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.TASK_2)
        if ____cond7 then
            do
                buttonPressedTask(nil, button, 2)
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.TASK_3)
        if ____cond7 then
            do
                buttonPressedTask(nil, button, 3)
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.TASK_4)
        if ____cond7 then
            do
                buttonPressedTask(nil, button, 4)
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.TASK_5)
        if ____cond7 then
            do
                buttonPressedTask(nil, button, 5)
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.TASK_6)
        if ____cond7 then
            do
                buttonPressedTask(nil, button, 6)
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.TASK_7)
        if ____cond7 then
            do
                buttonPressedTask(nil, button, 7)
                break
            end
        end
        ____cond7 = ____cond7 or (____switch7 == ButtonSubType.TASK_8)
        if ____cond7 then
            do
                buttonPressedTask(nil, button, 8)
                break
            end
        end
        do
            do
                ensureAllCases(nil, buttonSubType)
            end
        end
    until true
end
function buttonPressedGoToTask(self, effect)
    if g.game == nil then
        return
    end
    local data = effect:GetData()
    local task = data.task
    if task == nil then
        error("Failed to read the task from a task button.")
    end
    g.game.currentTask = task
    goToStageAPIRoom(nil, "Task")
end
function buttonPressedEmergency(self)
    if g.game == nil then
        return
    end
    sendTCP(nil, SocketCommandModToServer.MEETING, {meetingType = MeetingType.EMERGENCY, gameID = g.game.id, userIDKilled = 0})
end
function buttonPressedTask(self, button, num)
    if (g.game == nil) or (g.game.currentTask == nil) then
        return
    end
    repeat
        local ____switch30 = g.game.currentTask
        local ____cond30 = ____switch30 == Task.SHORT_IDENTIFY_ITEMS
        if ____cond30 then
            do
                identifyItemButtonPressed(nil, num)
                break
            end
        end
        ____cond30 = ____cond30 or (____switch30 == Task.SHORT_IDENTIFY_TRINKETS)
        if ____cond30 then
            do
                identifyTrinketButtonPressed(nil, num)
                break
            end
        end
        ____cond30 = ____cond30 or (____switch30 == Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE)
        if ____cond30 then
            do
                pressButtonsWithGrudgeButtonPressed(nil)
                break
            end
        end
        ____cond30 = ____cond30 or (____switch30 == Task.SHORT_FIX_WIRES)
        if ____cond30 then
            do
                fixWiresButtonPressed(nil, button, num)
                break
            end
        end
        ____cond30 = ____cond30 or (____switch30 == Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES)
        if ____cond30 then
            do
                taskComplete(nil)
                break
            end
        end
        ____cond30 = ____cond30 or (____switch30 == Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS)
        if ____cond30 then
            do
                taskComplete(nil)
                break
            end
        end
        ____cond30 = ____cond30 or (____switch30 == Task.SHORT_WALK_BETWEEN_SLIDES)
        if ____cond30 then
            do
                taskComplete(nil)
                break
            end
        end
        ____cond30 = ____cond30 or (____switch30 == Task.LONG_IDENTIFY_PICKUPS_IN_ORDER)
        if ____cond30 then
            do
                identiyPickupsInOrderButtonPressed(nil, button)
                break
            end
        end
        ____cond30 = ____cond30 or (____switch30 == Task.LONG_BUTTONS_BEHIND_KEY_BLOCKS)
        if ____cond30 then
            do
                buttonsBehindKeyBlocksButtonPressed(nil)
                break
            end
        end
        do
            do
                break
            end
        end
    until true
end
BUTTON_ACTIVATION_DISTANCE = 20
function ____exports.postEffectUpdateButton(self, effect)
    checkIfButtonIsPressed(nil, effect)
end
return ____exports
 end,
["mod.src.tasks.makePentagram"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local getText
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____util = require("mod.src.util")
local drawFontText = ____util.drawFontText
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
function getText(self)
    local pentagrams = Isaac.FindByType(EntityType.ENTITY_EFFECT, EffectVariant.PENTAGRAM_BLACKPOWDER)
    if #pentagrams == 0 then
        return "Make a pentagram."
    end
    return "Not big enough!"
end
local THIS_TASK = Task.SHORT_MAKE_PENTAGRAM
local REQUIRED_PENTAGRAM_SIZE = 250
local TEXT_GRID_INDEX = 93
function ____exports.makePentagram(self)
    local game = Game()
    local room = game:GetRoom()
    local centerPos = room:GetCenterPos()
    local startGridIndex = 100
    movePlayerToGridIndex(nil, startGridIndex)
    local player = Isaac.GetPlayer()
    player:AddCacheFlags(CacheFlag.CACHE_SPEED)
    player:EvaluateItems()
    local topRightGridIndex = 42
    spawnTeleporter(nil, topRightGridIndex)
    Isaac.Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, CollectibleType.COLLECTIBLE_BLACK_POWDER, centerPos, Vector.Zero, nil)
end
function ____exports.postRender(self)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    local game = Game()
    local room = game:GetRoom()
    local worldPosition = room:GetGridPosition(TEXT_GRID_INDEX)
    local position = Isaac.WorldToRenderPosition(worldPosition)
    local text = getText(nil)
    drawFontText(nil, text, position)
end
function ____exports.postEffectUpdatePentagramBlackPowder(self, effect)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    if effect.Scale > REQUIRED_PENTAGRAM_SIZE then
        taskComplete(nil)
    end
end
return ____exports
 end,
["mod.src.callbacks.postEffectUpdate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local pentagramBlackPowder, postEffectUpdateButton
local ____enums = require("mod.src.enums")
local EffectVariantCustom = ____enums.EffectVariantCustom
local button = require("mod.src.features.button")
local makePentagram = require("mod.src.tasks.makePentagram")
function pentagramBlackPowder(self, effect)
    makePentagram:postEffectUpdatePentagramBlackPowder(effect)
end
function postEffectUpdateButton(self, effect)
    button:postEffectUpdateButton(effect)
end
function ____exports.init(self, mod)
    mod:AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, pentagramBlackPowder, EffectVariant.PENTAGRAM_BLACKPOWDER)
    mod:AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, postEffectUpdateButton, EffectVariantCustom.BUTTON)
end
return ____exports
 end,
["mod.src.tasks.killWorms"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getAliveNPCs = ____isaacscript_2Dcommon.getAliveNPCs
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____util = require("mod.src.util")
local enableShooting = ____util.enableShooting
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
local THIS_TASK = Task.LONG_KILL_WORMS
function ____exports.killWorms(self)
    local game = Game()
    local room = game:GetRoom()
    local centerGridIndex = 67
    movePlayerToGridIndex(nil, centerGridIndex)
    enableShooting(nil)
    local rightGridIndex = 73
    spawnTeleporter(nil, rightGridIndex)
    local wormGridIndexes = {32, 37, 42, 92, 97, 102, 62, 72}
    for ____, gridIndex in ipairs(wormGridIndexes) do
        local position = room:GetGridPosition(gridIndex)
        Isaac.Spawn(EntityType.ENTITY_ROUND_WORM, 0, 0, position, Vector.Zero, nil)
    end
end
function ____exports.postEntityKill(self)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    local aliveNPCs = getAliveNPCs(nil)
    if #aliveNPCs == 0 then
        taskComplete(nil)
    end
end
return ____exports
 end,
["mod.src.callbacks.postEntityKill"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local killWorms = require("mod.src.tasks.killWorms")
function ____exports.main(self, _entity)
    killWorms:postEntityKill()
end
return ____exports
 end,
["mod.src.features.disableMultiplayer"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local endRun
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getPlayers = ____isaacscript_2Dcommon.getPlayers
local isChildPlayer = ____isaacscript_2Dcommon.isChildPlayer
local saveDataManager = ____isaacscript_2Dcommon.saveDataManager
function endRun(self)
    local game = Game()
    game:Fadeout(0.05, 2)
end
local ENABLED = true
local v = {run = {firstPlayerControllerIndex = nil}}
function ____exports.init(self)
    saveDataManager(nil, "disableMultiplayer", v)
end
function ____exports.postPlayerInit(self, player)
    if not ENABLED then
        return
    end
    if v.run.firstPlayerControllerIndex == nil then
        v.run.firstPlayerControllerIndex = player.ControllerIndex
    end
end
function ____exports.postGameStarted(self)
    if not ENABLED then
        return
    end
    local controllerIndexes = {}
    for ____, player in ipairs(
        getPlayers(nil)
    ) do
        if not __TS__ArrayIncludes(controllerIndexes, player.ControllerIndex) then
            __TS__ArrayPush(controllerIndexes, player.ControllerIndex)
        end
    end
    if #controllerIndexes > 1 then
        endRun(nil)
    end
end
function ____exports.preGameExit(self, shouldSave)
    if not ENABLED then
        return
    end
    if not shouldSave then
        v.run.firstPlayerControllerIndex = nil
    end
end
function ____exports.postPlayerInitLate(self, player)
    if not ENABLED then
        return
    end
    if isChildPlayer(nil, player) then
        return
    end
    if player.ControllerIndex ~= v.run.firstPlayerControllerIndex then
        endRun(nil)
    end
end
return ____exports
 end,
["mod.src.features.errors"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local areOtherModsEnabled, drawText, wordWrap, STARTING_X, STARTING_Y, SPACE_BETWEEN_LINES, MAX_CHARACTERS, v
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getMaxCollectibleID = ____isaacscript_2Dcommon.getMaxCollectibleID
local log = ____isaacscript_2Dcommon.log
local MAX_VANILLA_COLLECTIBLE_TYPE = ____isaacscript_2Dcommon.MAX_VANILLA_COLLECTIBLE_TYPE
local saveDataManager = ____isaacscript_2Dcommon.saveDataManager
local ____constants = require("mod.src.constants")
local MOD_NAME = ____constants.MOD_NAME
local ____socketClient = require("mod.src.network.socketClient")
local isLuaDebugEnabled = ____socketClient.isLuaDebugEnabled
function areOtherModsEnabled(self)
    local maxCollectibleID = getMaxCollectibleID(nil)
    local correctMaxCollectibleID = MAX_VANILLA_COLLECTIBLE_TYPE
    if maxCollectibleID ~= correctMaxCollectibleID then
        log(
            nil,
            ((("Error: Other mods detected. (The highest collectible ID is " .. tostring(maxCollectibleID)) .. ", but it should be ") .. tostring(correctMaxCollectibleID)) .. ".)"
        )
        v.run.otherModsEnabled = true
    end
    return v.run.otherModsEnabled
end
function drawText(self, text)
    local x = STARTING_X
    local y = STARTING_Y
    for ____, rawLine in ipairs(
        __TS__StringSplit(text, "\n")
    ) do
        local lines = wordWrap(nil, rawLine)
        for ____, line in ipairs(lines) do
            Isaac.RenderText(line, x, y, 2, 2, 2, 2)
            y = y + SPACE_BETWEEN_LINES
        end
    end
end
function wordWrap(self, line)
    local spaceLeft = MAX_CHARACTERS
    local words = __TS__StringSplit(line, " ")
    do
        local i = 0
        while i < #words do
            local word = words[i + 1]
            if (#word + 1) > spaceLeft then
                words[i + 1] = "\n" .. word
                spaceLeft = MAX_CHARACTERS - #word
            else
                spaceLeft = spaceLeft - (#word + 1)
            end
            i = i + 1
        end
    end
    return __TS__StringSplit(
        table.concat(words, " " or ","),
        "\n"
    )
end
STARTING_X = 115
STARTING_Y = 70
SPACE_BETWEEN_LINES = 12
MAX_CHARACTERS = 55
local LUA_DEBUG_ERROR_TEXT = "Error: You do not have the \"--luadebug\" launch option turned on. This option is needed so that Isaac can communicate with Internet servers.\n\nTo turn on \"--luadebug\", perform the following steps:\n- Open Steam.\n- Click on the \"Library\" tab near the top of the screen.\n- Right-click on \"The Binding of Isaac: Rebirth\" and select \"Properties\".\n- Click on the \"General\" tab on the left.\n- At the bottom of the screen, there will be a box to specify \"Launch Options\".\n- Enter \"--luadebug\" in the box (without the quotations).\n- Close the window and then completely close and re-open the game."
v = {run = {corrupted = false, incompleteSave = false, otherModsEnabled = false}}
function ____exports.init(self)
    saveDataManager(nil, "errors", v)
end
function ____exports.check(self)
    return areOtherModsEnabled(nil)
end
function ____exports.postRender(self)
    if REPENTANCE == nil then
        drawText(nil, ("Error: You must have the Repentance DLC installed in order to use the " .. MOD_NAME) .. " mod.")
        return true
    end
    if not isLuaDebugEnabled(nil) then
        drawText(nil, LUA_DEBUG_ERROR_TEXT)
        return true
    end
    if StageAPI == nil then
        drawText(nil, "Error: You do not have StageAPI loaded. Please subscribe to StageAPI on the Steam Workshop, enable it in the mods menu, and then completely close and re-open the game.")
        return true
    end
    if MinimapAPI == nil then
        drawText(nil, "Error: You do not have MinimapAPI loaded. Please subscribe to MinimapAPI on the Steam Workshop, enable it in the mods menu, and then completely close and re-open the game.")
        return true
    end
    if v.run.otherModsEnabled then
        drawText(nil, ("Error: You have illegal mods enabled.\n\nMake sure that the " .. MOD_NAME) .. " mod, StageAPI, and MinimapAPI are the only mods enabled in your mod list and then completely close and re-open the game.")
        return true
    end
    return false
end
return ____exports
 end,
["mod.src.features.restartOnNextFrame"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local validateChallenge, validateCharacter, validateSeed, AMONG_US_CHARACTER, AMONG_US_SEED
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____util = require("mod.src.util")
local consoleCommand = ____util.consoleCommand
function validateChallenge(self)
    local challenge = Isaac.GetChallenge()
    return challenge == Challenge.CHALLENGE_NULL
end
function validateCharacter(self)
    local player = Isaac.GetPlayer()
    local character = player:GetPlayerType()
    return character == AMONG_US_CHARACTER
end
function validateSeed(self)
    local game = Game()
    local seeds = game:GetSeeds()
    local startSeedString = seeds:GetStartSeedString()
    return startSeedString == AMONG_US_SEED
end
AMONG_US_CHARACTER = PlayerType.PLAYER_ISAAC
AMONG_US_SEED = "L8AK PRCH"
local AMONG_US_CHALLENGE = Challenge.CHALLENGE_NULL
local restartOnNextFrame = false
function ____exports.postRender(self)
    if not restartOnNextFrame then
        return
    end
    restartOnNextFrame = false
    if not validateChallenge(nil) then
        consoleCommand(
            nil,
            "challenge " .. tostring(AMONG_US_CHALLENGE)
        )
    end
    if not validateCharacter(nil) then
        consoleCommand(
            nil,
            "restart " .. tostring(AMONG_US_CHARACTER)
        )
    end
    if not validateSeed(nil) then
        consoleCommand(nil, "seed " .. AMONG_US_SEED)
    end
end
function ____exports.postGameStarted(self)
    if g.game == nil then
        return
    end
    if ((not validateChallenge(nil)) or (not validateCharacter(nil))) or (not validateSeed(nil)) then
        restartOnNextFrame = true
    end
end
return ____exports
 end,
["mod.src.features.welcomeNotification"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getScreenBottomRightPos = ____isaacscript_2Dcommon.getScreenBottomRightPos
local ____constants = require("mod.src.constants")
local MOD_NAME = ____constants.MOD_NAME
local ____fonts = require("mod.src.fonts")
local fonts = ____fonts.fonts
local ____globals = require("mod.src.globals")
local g = ____globals.default
local NOTIFICATION_LENGTH = 600
local NOTIFICATION_TEXT = ("Welcome to the " .. MOD_NAME) .. " mod!\n\nPress enter, type /help, and then press enter again for\ninstructions on how to connect to the server."
local displayedNotification = false
local timer = nil
function ____exports.postRender(self)
    if g.game ~= nil then
        return
    end
    if timer == nil then
        return
    end
    timer = timer - 1
    if timer == 0 then
        timer = nil
        return
    end
    local game = Game()
    local isPaused = game:IsPaused()
    if isPaused then
        return
    end
    local bottomRightPos = getScreenBottomRightPos(nil)
    local closeToBottom = bottomRightPos.Y - 58
    local alpha = (math.min(timer, 60) / 60) * 0.5
    local color = KColor(1, 1, 0, alpha)
    local y = closeToBottom
    for ____, line in ipairs(
        __TS__StringSplit(NOTIFICATION_TEXT, "\n")
    ) do
        fonts.pf:DrawString(line, 0, y, color, bottomRightPos.X, true)
        y = y + 10
    end
end
function ____exports.postGameStarted(self)
    if displayedNotification then
        return
    end
    displayedNotification = true
    timer = NOTIFICATION_LENGTH
end
return ____exports
 end,
["mod.src.callbacks.postGameStarted"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
local disableMultiplayer = require("mod.src.features.disableMultiplayer")
local errors = require("mod.src.features.errors")
local restartOnNextFrame = require("mod.src.features.restartOnNextFrame")
local welcomeNotification = require("mod.src.features.welcomeNotification")
local ____minimapAPI = require("mod.src.minimapAPI")
local enableMinimapAPI = ____minimapAPI.enableMinimapAPI
function ____exports.main(self, isContinued)
    local game = Game()
    local seeds = game:GetSeeds()
    local startSeedString = seeds:GetStartSeedString()
    local isaacFrameCount = Isaac.GetFrameCount()
    log(
        nil,
        (((("MC_POST_GAME_STARTED - Seed: " .. startSeedString) .. " - IsaacFrame: ") .. tostring(isaacFrameCount)) .. " - Continued: ") .. tostring(isContinued)
    )
    enableMinimapAPI(nil, true)
    if errors:check() then
        return
    end
    disableMultiplayer:postGameStarted()
    restartOnNextFrame:postGameStarted()
    welcomeNotification:postGameStarted()
end
return ____exports
 end,
["mod.src.features.lobby"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local gotoLobby, shouldGoToLobby, setupLobby, spawnEntities, flipSprite, STAGE_ARGUMENT_FOR_LOBBY, STAGE_FOR_LOBBY, STAGE_TYPE_FOR_LOBBY, STAGE_ID_FOR_LOBBY, ROOM_VARIANT_FOR_LOBBY
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local forceNewLevelCallback = ____isaacscript_2Dcommon.forceNewLevelCallback
local forceNewRoomCallback = ____isaacscript_2Dcommon.forceNewRoomCallback
local getEffectiveStage = ____isaacscript_2Dcommon.getEffectiveStage
local getNPCs = ____isaacscript_2Dcommon.getNPCs
local getPlayers = ____isaacscript_2Dcommon.getPlayers
local getRoomIndex = ____isaacscript_2Dcommon.getRoomIndex
local getRoomStageID = ____isaacscript_2Dcommon.getRoomStageID
local getRoomVariant = ____isaacscript_2Dcommon.getRoomVariant
local removeEntities = ____isaacscript_2Dcommon.removeEntities
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____minimapAPI = require("mod.src.minimapAPI")
local enableMinimapAPI = ____minimapAPI.enableMinimapAPI
local ____setupPlayersAndUI = require("mod.src.setupPlayersAndUI")
local setupPlayerAndUI = ____setupPlayersAndUI.setupPlayerAndUI
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnBox = ____spawnObjects.spawnBox
local ____util = require("mod.src.util")
local consoleCommand = ____util.consoleCommand
function gotoLobby(self)
    if ____exports.inLobby(nil) then
        return
    end
    if not shouldGoToLobby(nil) then
        return
    end
    local game = Game()
    local level = game:GetLevel()
    local stageType = level:GetStageType()
    local effectiveStage = getEffectiveStage(nil)
    if (effectiveStage ~= STAGE_FOR_LOBBY) or (stageType ~= STAGE_TYPE_FOR_LOBBY) then
        forceNewLevelCallback(nil)
        consoleCommand(nil, "stage " .. STAGE_ARGUMENT_FOR_LOBBY)
    end
    forceNewRoomCallback(nil)
    consoleCommand(
        nil,
        "goto d." .. tostring(ROOM_VARIANT_FOR_LOBBY)
    )
end
function ____exports.inLobby(self)
    local roomIndex = getRoomIndex(nil)
    local roomStageID = getRoomStageID(nil)
    local roomVariant = getRoomVariant(nil)
    return ((roomIndex == GridRooms.ROOM_DEBUG_IDX) and (roomStageID == STAGE_ID_FOR_LOBBY)) and (roomVariant == ROOM_VARIANT_FOR_LOBBY)
end
function shouldGoToLobby(self)
    return (g.game ~= nil) and (not g.game.started)
end
function setupLobby(self)
    if not ____exports.inLobby(nil) then
        return
    end
    setupPlayerAndUI(nil)
    enableMinimapAPI(nil, false)
    local game = Game()
    local room = game:GetRoom()
    local centerPos = room:GetCenterPos()
    local NPCs = getNPCs(nil)
    removeEntities(nil, NPCs)
    room:SetClear(true)
    do
        local i = 0
        while i < 4 do
            room:RemoveDoor(i)
            i = i + 1
        end
    end
    for ____, player in ipairs(
        getPlayers(nil)
    ) do
        player.Position = centerPos
    end
    spawnEntities(nil)
end
function spawnEntities(self)
    local gridIndexLeft = 93
    spawnBox(nil, gridIndexLeft, true)
    local gridIndexRight = 71
    local boxRight = spawnBox(nil, gridIndexRight, true)
    flipSprite(nil, boxRight)
    local gridIndexTopLeft = 35
    spawnBox(nil, gridIndexTopLeft, false)
end
function flipSprite(self, entity)
    local sprite = entity:GetSprite()
    sprite.FlipX = true
end
STAGE_ARGUMENT_FOR_LOBBY = "1a"
STAGE_FOR_LOBBY = 1
STAGE_TYPE_FOR_LOBBY = StageType.STAGETYPE_WOTL
STAGE_ID_FOR_LOBBY = 2
ROOM_VARIANT_FOR_LOBBY = 5
function ____exports.postNewRoom(self)
    gotoLobby(nil)
    setupLobby(nil)
end
return ____exports
 end,
["mod.src.callbacks.postNewRoom"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getRoomStageID = ____isaacscript_2Dcommon.getRoomStageID
local getRoomVariant = ____isaacscript_2Dcommon.getRoomVariant
local log = ____isaacscript_2Dcommon.log
local lobby = require("mod.src.features.lobby")
function ____exports.main(self)
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    local level = game:GetLevel()
    local stage = level:GetStage()
    local stageType = level:GetStageType()
    local roomStageID = getRoomStageID(nil)
    local roomVariant = getRoomVariant(nil)
    log(
        nil,
        ((((((((("MC_POST_NEW_ROOM - " .. tostring(roomStageID)) .. ".") .. tostring(roomVariant)) .. " (on stage ") .. tostring(stage)) .. ".") .. tostring(stageType)) .. ") (game frame ") .. tostring(gameFrameCount)) .. ")"
    )
    lobby:postNewRoom()
end
return ____exports
 end,
["mod.src.callbacks.postNPCRender"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local keepStationary
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
function keepStationary(self, npc)
    if npc.Type >= EntityType.ENTITY_EFFECT then
        return
    end
    local data = npc:GetData()
    if data.position == nil then
        data.position = npc.Position
    end
    npc.Position = data.position
    npc.Velocity = Vector.Zero
end
function ____exports.init(self, mod)
    mod:AddCallback(ModCallbacks.MC_POST_NPC_RENDER, keepStationary, EntityTypeCustom.BOX)
    mod:AddCallback(ModCallbacks.MC_POST_NPC_RENDER, keepStationary, EntityTypeCustom.TABLE)
    mod:AddCallback(ModCallbacks.MC_POST_NPC_RENDER, keepStationary, EntityTypeCustom.ADMIN_TABLE)
end
return ____exports
 end,
["mod.src.callbacks.postPlayerInit"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local disableMultiplayer = require("mod.src.features.disableMultiplayer")
function ____exports.main(self, player)
    disableMultiplayer:postPlayerInit(player)
end
return ____exports
 end,
["mod.src.types.Colors"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.Colors = Colors or ({})
____exports.Colors.WHITE = "±ffffff"
____exports.Colors.YELLOW = "±ffff00"
____exports.Colors.GREEN = "±33aa33"
____exports.COLOR_BYTE = "±"
return ____exports
 end,
["mod.src.chatCommands.password"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local chat = require("mod.src.chat")
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
function ____exports.passwordChatCommand(self, args)
    if #args == 0 then
        chat:addLocal("You must provide a password. (e.g. \"/password hunter2\")")
        return
    end
    local username = g.username
    if username == nil then
        chat:addLocal("You must specify a username first with the \"/username\" command. (e.g. \"/username Alice\")")
        return
    end
    local password = table.concat(args, " " or ",")
    sendTCP(nil, SocketCommandModToServer.LOGIN, {username = username, password = password})
end
return ____exports
 end,
["mod.src.chatCommands.username"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local chat = require("mod.src.chat")
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
function ____exports.usernameChatCommand(self, args)
    if #args == 0 then
        chat:addLocal("You must provide a username. (e.g. \"/username Alice\")")
        return
    end
    if #args ~= 1 then
        local username = table.concat(args, " " or ",")
        chat:addLocal(("The username of \"" .. username) .. "\" is invalid; usernames cannot contain spaces.")
        return
    end
    local username = args[1]
    local match = {
        string.match(username, "%W")
    }
    if #match > 0 then
        chat:addLocal(("The username of \"" .. username) .. "\" is invalid; username must only contain English letters and numbers.")
        return
    end
    sendTCP(nil, SocketCommandModToServer.CHECK_USERNAME, {username = username})
end
return ____exports
 end,
["mod.src.chatCommandFunctions"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local chat = require("mod.src.chat")
local ____connect = require("mod.src.chatCommands.connect")
local connectChatCommand = ____connect.connectChatCommand
local ____password = require("mod.src.chatCommands.password")
local passwordChatCommand = ____password.passwordChatCommand
local ____username = require("mod.src.chatCommands.username")
local usernameChatCommand = ____username.usernameChatCommand
local ____constants = require("mod.src.constants")
local NOT_VOTED_YET = ____constants.NOT_VOTED_YET
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local socketClient = require("mod.src.network.socketClient")
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
local ____util = require("mod.src.util")
local amOwner = ____util.amOwner
local restart = ____util.restart
____exports.chatCommandFunctions = __TS__New(Map)
____exports.chatCommandFunctions:set(
    "connect",
    function()
        connectChatCommand(nil, false)
    end
)
____exports.chatCommandFunctions:set(
    "create",
    function(____, args)
        if #args == 0 then
            chat:addLocal("You must provide a game name. (e.g. \"/create Alice's game\")")
            return
        end
        local name = table.concat(args, " " or ",")
        sendTCP(nil, SocketCommandModToServer.CREATE, {name = name})
    end
)
____exports.chatCommandFunctions:set(
    "disconnect",
    function(____, _args)
        socketClient:disconnect()
    end
)
____exports.chatCommandFunctions:set(
    "echo",
    function(____, args)
        local text = table.concat(args, " " or ",")
        chat:addLocal(text)
    end
)
____exports.chatCommandFunctions:set(
    "gamelist",
    function(____, _args)
        sendTCP(nil, SocketCommandModToServer.GAME_LIST, {})
    end
)
____exports.chatCommandFunctions:set(
    "help",
    function(____, _args)
        chat:addLocal("To connect to the server, use the \"/connect\" command.")
        chat:addLocal("Hint: You can use tab to auto-complete commands.")
    end
)
____exports.chatCommandFunctions:set(
    "join",
    function(____, args)
        if #args == 0 then
            chat:addLocal("You must provide a game name. (e.g. \"/join Alice's game\")")
            return
        end
        if g.game ~= nil then
            chat:addLocal("You are already in a game, so you cannot join a new one.")
            return
        end
        local name = table.concat(args, " " or ",")
        sendTCP(nil, SocketCommandModToServer.JOIN, {name = name, created = false})
    end
)
____exports.chatCommandFunctions:set(
    "leave",
    function(____, _args)
        if g.game == nil then
            chat:addLocal("You are not in a game, so you cannot leave.")
            return
        end
        sendTCP(nil, SocketCommandModToServer.LEAVE, {gameID = g.game.id})
    end
)
____exports.chatCommandFunctions:set("password", passwordChatCommand)
____exports.chatCommandFunctions:set(
    "restart",
    function(____, _args)
        restart(nil)
    end
)
____exports.chatCommandFunctions:set(
    "start",
    function(____, _args)
        if g.game == nil then
            chat:addLocal("You are not in a game, so you cannot start it.")
            return
        end
        if not amOwner(nil) then
            chat:addLocal("You are not the owner of this game, so you cannot start it.")
            return
        end
        sendTCP(nil, SocketCommandModToServer.START, {gameID = g.game.id})
    end
)
____exports.chatCommandFunctions:set(
    "terminate",
    function(____, _args)
        if g.game == nil then
            chat:addLocal("You are not in a game, so you cannot terminate it.")
            return
        end
        if not amOwner(nil) then
            chat:addLocal("You are not the owner of this game, so you cannot terminate it.")
            return
        end
        sendTCP(nil, SocketCommandModToServer.TERMINATE, {gameID = g.game.id})
    end
)
____exports.chatCommandFunctions:set("username", usernameChatCommand)
____exports.chatCommandFunctions:set(
    "vote",
    function(____, args)
        if #args == 0 then
            chat:addLocal("You must provide a player name. (e.g. \"/vote Alice\")")
            return
        end
        if g.game == nil then
            chat:addLocal("You can only perform that command in a game.")
            return
        end
        if g.game.meeting == nil then
            chat:addLocal("You can only perform that command in a meeting.")
            return
        end
        if g.userID == nil then
            return
        end
        local ourPlayerIndex = g.game:getPlayerIndexFromUserID(g.userID)
        local ourPreviousVote = g.game.meeting.votes[ourPlayerIndex + 1]
        if ourPreviousVote ~= NOT_VOTED_YET then
            chat:addLocal("You have already voted.")
            return
        end
        local nameVotedFor = args[1]
        local playerVotedFor = g.game:getPlayerFromUsername(nameVotedFor)
        if playerVotedFor == nil then
            chat:addLocal(("The player of \"" .. nameVotedFor) .. "\" is not in this game.")
            return
        end
        sendTCP(nil, SocketCommandModToServer.VOTE, {gameID = g.game.id, userIDVotedFor = playerVotedFor.userID, skip = false})
    end
)
____exports.chatCommandFunctions:set(
    "voteskip",
    function(____, _args)
        if g.game == nil then
            chat:addLocal("You can only perform that command in a game.")
            return
        end
        if g.game.meeting == nil then
            chat:addLocal("You can only perform that command in a meeting.")
            return
        end
        if g.userID == nil then
            return
        end
        local ourPlayerIndex = g.game:getPlayerIndexFromUserID(g.userID)
        local ourPreviousVote = g.game.meeting.votes[ourPlayerIndex + 1]
        if ourPreviousVote ~= NOT_VOTED_YET then
            chat:addLocal("You have already voted.")
            return
        end
        sendTCP(nil, SocketCommandModToServer.VOTE, {gameID = g.game.id, userIDVotedFor = 0, skip = true})
    end
)
return ____exports
 end,
["mod.src.keyboardMap"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
____exports.KEYBOARD_MAP = __TS__New(Map, {{Keyboard.KEY_0, {"0", ")"}}, {Keyboard.KEY_1, {"1", "!"}}, {Keyboard.KEY_2, {"2", "@"}}, {Keyboard.KEY_3, {"3", "#"}}, {Keyboard.KEY_4, {"4", "$"}}, {Keyboard.KEY_5, {"5", "%"}}, {Keyboard.KEY_6, {"6", "^"}}, {Keyboard.KEY_7, {"7", "&"}}, {Keyboard.KEY_8, {"8", "*"}}, {Keyboard.KEY_9, {"9", "("}}, {Keyboard.KEY_A, {"a", "A"}}, {Keyboard.KEY_APOSTROPHE, {"'", "\""}}, {Keyboard.KEY_B, {"b", "B"}}, {Keyboard.KEY_BACKSLASH, {"\\", "|"}}, {Keyboard.KEY_C, {"c", "C"}}, {Keyboard.KEY_COMMA, {",", "<"}}, {Keyboard.KEY_D, {"d", "D"}}, {Keyboard.KEY_E, {"e", "E"}}, {Keyboard.KEY_EQUAL, {"=", "+"}}, {Keyboard.KEY_F, {"f", "F"}}, {Keyboard.KEY_G, {"g", "G"}}, {Keyboard.KEY_GRAVE_ACCENT, {"`", "~"}}, {Keyboard.KEY_H, {"h", "H"}}, {Keyboard.KEY_I, {"i", "I"}}, {Keyboard.KEY_J, {"j", "J"}}, {Keyboard.KEY_K, {"k", "K"}}, {Keyboard.KEY_KP_0, {"0", "0"}}, {Keyboard.KEY_KP_1, {"1", "1"}}, {Keyboard.KEY_KP_2, {"2", "2"}}, {Keyboard.KEY_KP_3, {"3", "3"}}, {Keyboard.KEY_KP_4, {"4", "4"}}, {Keyboard.KEY_KP_5, {"5", "5"}}, {Keyboard.KEY_KP_6, {"6", "6"}}, {Keyboard.KEY_KP_7, {"7", "7"}}, {Keyboard.KEY_KP_8, {"8", "8"}}, {Keyboard.KEY_KP_9, {"9", "9"}}, {Keyboard.KEY_KP_ADD, {"+", "+"}}, {Keyboard.KEY_KP_DECIMAL, {".", "."}}, {Keyboard.KEY_KP_DIVIDE, {"/", "/"}}, {Keyboard.KEY_KP_MULTIPLY, {"*", "*"}}, {Keyboard.KEY_KP_SUBTRACT, {"-", "-"}}, {Keyboard.KEY_L, {"l", "L"}}, {Keyboard.KEY_LEFT_BRACKET, {"[", "{"}}, {Keyboard.KEY_M, {"m", "M"}}, {Keyboard.KEY_MINUS, {"-", "_"}}, {Keyboard.KEY_N, {"n", "N"}}, {Keyboard.KEY_O, {"o", "O"}}, {Keyboard.KEY_P, {"p", "P"}}, {Keyboard.KEY_PERIOD, {".", ">"}}, {Keyboard.KEY_Q, {"q", "Q"}}, {Keyboard.KEY_R, {"r", "R"}}, {Keyboard.KEY_RIGHT_BRACKET, {"]", "}"}}, {Keyboard.KEY_S, {"s", "S"}}, {Keyboard.KEY_SEMICOLON, {";", ":"}}, {Keyboard.KEY_SLASH, {"/", "?"}}, {Keyboard.KEY_SPACE, {" ", " "}}, {Keyboard.KEY_T, {"t", "T"}}, {Keyboard.KEY_U, {"u", "U"}}, {Keyboard.KEY_V, {"v", "V"}}, {Keyboard.KEY_W, {"w", "W"}}, {Keyboard.KEY_X, {"x", "X"}}, {Keyboard.KEY_Y, {"y", "Y"}}, {Keyboard.KEY_Z, {"z", "Z"}}})
return ____exports
 end,
["mod.src.features.drawText"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local hexToKColor = ____isaacscript_2Dcommon.hexToKColor
local ____fonts = require("mod.src.fonts")
local fonts = ____fonts.fonts
local ____Colors = require("mod.src.types.Colors")
local Colors = ____Colors.Colors
local COLOR_BYTE = ____Colors.COLOR_BYTE
____exports.DEFAULT_OPACITY = 0.75
local SIZE_OF_HEX_STRING = 6
function ____exports.drawText(self, text, position, alpha)
    if alpha == nil then
        alpha = ____exports.DEFAULT_OPACITY
    end
    local x = position.X
    local y = position.Y
    local textSegments = __TS__StringSplit(text, COLOR_BYTE)
    do
        local i = 0
        while i < #textSegments do
            local textSegment = textSegments[i + 1]
            if textSegment == "" then
                return
            end
            local hexColor
            local textWithoutColor
            if i == 0 then
                hexColor = __TS__StringSlice(Colors.WHITE, #COLOR_BYTE)
                textWithoutColor = textSegment
            else
                hexColor = __TS__StringSubstr(textSegment, 0, SIZE_OF_HEX_STRING)
                textWithoutColor = __TS__StringSlice(textSegment, SIZE_OF_HEX_STRING)
            end
            local kColor = hexToKColor(nil, hexColor, alpha)
            fonts.pf:DrawString(textWithoutColor, x, y, kColor, 0, true)
            x = x + fonts.pf:GetStringWidth(textWithoutColor)
            i = i + 1
        end
    end
end
return ____exports
 end,
["mod.src.features.console"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local checkAllKeyboardInput, checkKeyboardInput, keyPressed, isShiftPressed, insertNewCharacter, executeChatCommand, appendHistory, drawConsole, MAX_HISTORY_LENGTH, REPEAT_KEY_DELAY_IN_RENDER_FRAMES, COMMAND_PREFIX, OFFLINE_COMMANDS, consoleOpen, inputText, inputTextIndex, keysPressed, v, keyFunctionMap
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local disableAllInputs = ____isaacscript_2Dcommon.disableAllInputs
local enableAllInputs = ____isaacscript_2Dcommon.enableAllInputs
local getEnumValues = ____isaacscript_2Dcommon.getEnumValues
local ISAAC_FRAMES_PER_SECOND = ____isaacscript_2Dcommon.ISAAC_FRAMES_PER_SECOND
local isKeyboardPressed = ____isaacscript_2Dcommon.isKeyboardPressed
local saveDataManager = ____isaacscript_2Dcommon.saveDataManager
local chat = require("mod.src.chat")
local ____chatCommandFunctions = require("mod.src.chatCommandFunctions")
local chatCommandFunctions = ____chatCommandFunctions.chatCommandFunctions
local ____constants = require("mod.src.constants")
local MOD_NAME = ____constants.MOD_NAME
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____keyboardMap = require("mod.src.keyboardMap")
local KEYBOARD_MAP = ____keyboardMap.KEYBOARD_MAP
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local socketClient = require("mod.src.network.socketClient")
local ____Colors = require("mod.src.types.Colors")
local Colors = ____Colors.Colors
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
local ____util = require("mod.src.util")
local getScreenPosition = ____util.getScreenPosition
local ____drawText = require("mod.src.features.drawText")
local drawText = ____drawText.drawText
function checkAllKeyboardInput(self, isaacFrameCount)
    for ____, keyboardValue in ipairs(
        getEnumValues(nil, Keyboard)
    ) do
        checkKeyboardInput(nil, keyboardValue, isaacFrameCount)
    end
end
function checkKeyboardInput(self, keyboardValue, isaacFrameCount)
    local pressed = isKeyboardPressed(nil, keyboardValue)
    if not pressed then
        keysPressed:delete(keyboardValue)
        return
    end
    local framePressed = keysPressed:get(keyboardValue)
    if framePressed == nil then
        framePressed = isaacFrameCount
        keysPressed:set(keyboardValue, framePressed)
    end
    local pressedOnThisFrame = framePressed == isaacFrameCount
    local framesSinceKeyPressed = isaacFrameCount - framePressed
    local shouldTriggerRepeatPress = (framesSinceKeyPressed > REPEAT_KEY_DELAY_IN_RENDER_FRAMES) and ((framesSinceKeyPressed % 2) == 0)
    local shouldPress = pressedOnThisFrame or shouldTriggerRepeatPress
    if shouldPress then
        keyPressed(nil, keyboardValue)
    end
end
function keyPressed(self, keyboardValue)
    if ((((keysPressed:has(Keyboard.KEY_LEFT_CONTROL) or keysPressed:has(Keyboard.KEY_RIGHT_CONTROL)) or keysPressed:has(Keyboard.KEY_LEFT_ALT)) or keysPressed:has(Keyboard.KEY_RIGHT_ALT)) or keysPressed:has(Keyboard.KEY_LEFT_SUPER)) or keysPressed:has(Keyboard.KEY_RIGHT_SUPER) then
        return
    end
    local keyFunction = keyFunctionMap:get(keyboardValue)
    if (keyFunction ~= nil) and (not isShiftPressed(nil)) then
        keyFunction(nil)
        return
    end
    local keyStringArray = KEYBOARD_MAP:get(keyboardValue)
    if keyStringArray ~= nil then
        insertNewCharacter(nil, keyStringArray)
    end
end
function isShiftPressed(self)
    return keysPressed:has(Keyboard.KEY_LEFT_SHIFT) or keysPressed:has(Keyboard.KEY_RIGHT_SHIFT)
end
function insertNewCharacter(self, keyStringArray)
    local lowercaseCharacter, uppercaseCharacter = table.unpack(keyStringArray)
    local character = (isShiftPressed(nil) and uppercaseCharacter) or lowercaseCharacter
    local front = __TS__StringSubstring(inputText, 0, inputTextIndex)
    local back = __TS__StringSubstring(inputText, inputTextIndex)
    inputText = (front .. character) .. back
    inputTextIndex = inputTextIndex + 1
end
function executeChatCommand(self, msg)
    if not __TS__StringStartsWith(msg, COMMAND_PREFIX) then
        if g.game == nil then
            chat:addLocal("You must be in a game to chat with other players.")
            return
        end
        sendTCP(nil, SocketCommandModToServer.CHAT, {gameID = g.game.id, msg = msg})
        return
    end
    msg = __TS__StringSlice(msg, #COMMAND_PREFIX)
    local segments = __TS__StringSplit(msg, " ")
    local command = __TS__ArrayShift(segments)
    if command == nil then
        return
    end
    local lowercaseCommand = string.lower(command)
    local args = {
        table.unpack(segments)
    }
    local chatCommandFunction = chatCommandFunctions:get(lowercaseCommand)
    if chatCommandFunction == nil then
        chat:addLocal("Unknown command: " .. command)
        return
    end
    local onlineCommand = not OFFLINE_COMMANDS:has(lowercaseCommand)
    if onlineCommand and (not socketClient:isConnected()) then
        chat:addLocal(("You can only perform this command when connected to the " .. MOD_NAME) .. " server.")
        return
    end
    chatCommandFunction(nil, args)
end
function appendHistory(self)
    if #v.persistent.inputHistory > 0 then
        local lastHistory = v.persistent.inputHistory[1]
        if inputText == lastHistory then
            return
        end
    end
    __TS__ArrayUnshift(v.persistent.inputHistory, inputText)
    if #v.persistent.inputHistory >= MAX_HISTORY_LENGTH then
        table.remove(v.persistent.inputHistory)
    end
end
function drawConsole(self)
    if not consoleOpen then
        return
    end
    local front = __TS__StringSubstring(inputText, 0, inputTextIndex)
    local back = __TS__StringSubstring(inputText, inputTextIndex)
    local text = ((((">" .. front) .. Colors.YELLOW) .. "|") .. Colors.WHITE) .. back
    local position = ((__TS__OptionalChainAccess(g.game, "meeting") ~= nil) and ____exports.CONSOLE_POSITION_LEFT) or ____exports.CONSOLE_POSITION
    drawText(nil, text, position)
end
____exports.SPACING_FROM_LEFT_EDGE = 0.167
local SPACING_FROM_LEFT_EDGE_CLOSER = 0.02
local SPACING_FROM_TOP_EDGE = 0.6
____exports.CONSOLE_POSITION = getScreenPosition(nil, ____exports.SPACING_FROM_LEFT_EDGE, SPACING_FROM_TOP_EDGE)
____exports.CONSOLE_POSITION_LEFT = getScreenPosition(nil, SPACING_FROM_LEFT_EDGE_CLOSER, SPACING_FROM_TOP_EDGE)
MAX_HISTORY_LENGTH = 100
REPEAT_KEY_DELAY_IN_RENDER_FRAMES = ISAAC_FRAMES_PER_SECOND * 0.5
COMMAND_PREFIX = "/"
OFFLINE_COMMANDS = __TS__New(Set, {"help", "connect", "echo"})
consoleOpen = false
inputText = ""
inputTextIndex = 0
local savedText = ""
local historyIndex = -1
keysPressed = __TS__New(Map)
v = {persistent = {inputHistory = {}}}
function ____exports.init(self)
    saveDataManager(nil, "console", v)
end
function ____exports.postRender(self)
    local game = Game()
    local isPaused = game:IsPaused()
    local isaacFrameCount = Isaac.GetFrameCount()
    if isPaused then
        return
    end
    if (ModConfigMenu ~= nil) and ModConfigMenu.IsVisible then
        return
    end
    if not consoleOpen then
        checkKeyboardInput(nil, Keyboard.KEY_ENTER, isaacFrameCount)
        checkKeyboardInput(nil, Keyboard.KEY_SLASH, isaacFrameCount)
        return
    end
    checkAllKeyboardInput(nil, isaacFrameCount)
    drawConsole(nil)
end
local function open(self)
    consoleOpen = true
    disableAllInputs(nil)
    AwaitingTextInput = true
end
local function close(self, execute)
    if execute == nil then
        execute = true
    end
    consoleOpen = false
    enableAllInputs(nil)
    AwaitingTextInput = false
    if (not execute) or (inputText == "") then
        savedText = ""
        historyIndex = -1
        return
    end
    executeChatCommand(nil, inputText)
    appendHistory(nil)
    inputText = ""
    inputTextIndex = 0
    savedText = ""
    historyIndex = -1
end
keyFunctionMap = __TS__New(Map)
keyFunctionMap:set(
    Keyboard.KEY_ESCAPE,
    function()
        close(nil, false)
    end
)
keyFunctionMap:set(
    Keyboard.KEY_ENTER,
    function()
        if consoleOpen then
            close(nil)
        else
            open(nil)
        end
    end
)
keyFunctionMap:set(
    Keyboard.KEY_TAB,
    function()
        if not __TS__StringStartsWith(inputText, COMMAND_PREFIX) then
            return
        end
        local partialCommand = __TS__StringSlice(inputText, #COMMAND_PREFIX)
        local commands = chatCommandFunctions:keys()
        for ____, command in __TS__Iterator(commands) do
            if __TS__StringStartsWith(command, partialCommand) then
                inputText = COMMAND_PREFIX .. command
                inputTextIndex = #inputText
                return
            end
        end
    end
)
keyFunctionMap:set(
    Keyboard.KEY_BACKSPACE,
    function()
        if inputTextIndex == 0 then
            return
        end
        local front = __TS__StringSubstring(inputText, 0, inputTextIndex)
        local back = __TS__StringSubstring(inputText, inputTextIndex)
        local frontWithLastCharRemoved = string.sub(front, 1, -2)
        inputText = frontWithLastCharRemoved .. back
        inputTextIndex = inputTextIndex - 1
    end
)
keyFunctionMap:set(
    Keyboard.KEY_RIGHT,
    function()
        if inputTextIndex == #inputText then
            return
        end
        inputTextIndex = inputTextIndex + 1
    end
)
keyFunctionMap:set(
    Keyboard.KEY_LEFT,
    function()
        if inputTextIndex == 0 then
            return
        end
        inputTextIndex = inputTextIndex - 1
    end
)
keyFunctionMap:set(
    Keyboard.KEY_DOWN,
    function()
        if historyIndex == -1 then
            return
        end
        historyIndex = historyIndex - 1
        if historyIndex == -1 then
            inputText = savedText
            inputTextIndex = #savedText
            return
        end
        local inputHistoryText = v.persistent.inputHistory[historyIndex + 1]
        if inputHistoryText == nil then
            return
        end
        inputText = inputHistoryText
        inputTextIndex = #inputHistoryText
    end
)
keyFunctionMap:set(
    Keyboard.KEY_UP,
    function()
        if historyIndex == -1 then
            savedText = inputText
        end
        if historyIndex >= MAX_HISTORY_LENGTH then
            return
        end
        local newHistoryIndex = historyIndex + 1
        if newHistoryIndex >= #v.persistent.inputHistory then
            return
        end
        historyIndex = newHistoryIndex
        local inputHistoryText = v.persistent.inputHistory[historyIndex + 1]
        if inputHistoryText == nil then
            return
        end
        inputText = inputHistoryText
        inputTextIndex = #inputHistoryText
    end
)
keyFunctionMap:set(
    Keyboard.KEY_HOME,
    function()
        inputTextIndex = 0
    end
)
keyFunctionMap:set(
    Keyboard.KEY_END,
    function()
        inputTextIndex = #inputText
    end
)
keyFunctionMap:set(
    Keyboard.KEY_SLASH,
    function()
        if consoleOpen then
            insertNewCharacter(nil, {"/", "/"})
        else
            open(nil)
            inputText = "/"
            inputTextIndex = 1
        end
    end
)
function ____exports.isConsoleOpen(self)
    return consoleOpen
end
return ____exports
 end,
["mod.src.features.chatCallbacks"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local drawChat, wordWrap, CHAT_POSITION, CHAT_POSITION_LEFT, MAX_TEXT_WIDTH, WIDTH_OF_SPACE, LINE_LENGTH, MAX_CHAT_MESSAGES, FRAMES_FOR_CHAT_TO_SHOW
local chat = require("mod.src.chat")
local ____fonts = require("mod.src.fonts")
local fonts = ____fonts.fonts
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Colors = require("mod.src.types.Colors")
local Colors = ____Colors.Colors
local ____util = require("mod.src.util")
local getScreenPosition = ____util.getScreenPosition
local ____console = require("mod.src.features.console")
local CONSOLE_POSITION = ____console.CONSOLE_POSITION
local CONSOLE_POSITION_LEFT = ____console.CONSOLE_POSITION_LEFT
local isConsoleOpen = ____console.isConsoleOpen
local SPACING_FROM_LEFT_EDGE = ____console.SPACING_FROM_LEFT_EDGE
local ____drawText = require("mod.src.features.drawText")
local DEFAULT_OPACITY = ____drawText.DEFAULT_OPACITY
local drawText = ____drawText.drawText
function drawChat(self)
    local isaacFrameCount = Isaac.GetFrameCount()
    local consoleOpen = isConsoleOpen(nil)
    local alpha = DEFAULT_OPACITY
    local x = ((__TS__OptionalChainAccess(g.game, "meeting") ~= nil) and CHAT_POSITION_LEFT.X) or CHAT_POSITION.X
    local y = CHAT_POSITION.Y
    local numMessagesDrawn = 0
    for ____, chatMessage in ipairs(
        chat:getAll()
    ) do
        local modifiedAlpha = (chatMessage["local"] and DEFAULT_OPACITY) or alpha
        local framesElapsed = isaacFrameCount - chatMessage.frameReceived
        if (not consoleOpen) and (framesElapsed > FRAMES_FOR_CHAT_TO_SHOW) then
            local framesOverThreshold = framesElapsed - FRAMES_FOR_CHAT_TO_SHOW
            modifiedAlpha = modifiedAlpha - (framesOverThreshold / (FRAMES_FOR_CHAT_TO_SHOW * 2))
        end
        if modifiedAlpha <= 0 then
            break
        end
        local text = ""
        if (chatMessage.time ~= "") and (not chatMessage["local"]) then
            text = text .. (("[" .. chatMessage.time) .. "] ")
        end
        if chatMessage.username ~= "" then
            text = text .. (((((Colors.GREEN .. "<") .. chatMessage.username) .. ">") .. Colors.WHITE) .. " ")
        end
        text = text .. chatMessage.msg
        local lines = wordWrap(nil, text)
        y = y - ((#lines - 1) * LINE_LENGTH)
        do
            local i = 0
            while i < #lines do
                local line = lines[i + 1]
                drawText(
                    nil,
                    line,
                    Vector(x, y),
                    modifiedAlpha
                )
                y = y + LINE_LENGTH
                i = i + 1
            end
        end
        y = y - ((#lines + 1) * LINE_LENGTH)
        numMessagesDrawn = numMessagesDrawn + 1
        if numMessagesDrawn > MAX_CHAT_MESSAGES then
            break
        end
    end
end
function wordWrap(self, line)
    local spaceLeft = MAX_TEXT_WIDTH
    local words = __TS__StringSplit(line, " ")
    do
        local i = 0
        while i < #words do
            local word = words[i + 1]
            local wordWidth = fonts.pf:GetStringWidth(word)
            if (wordWidth + WIDTH_OF_SPACE) > spaceLeft then
                words[i + 1] = "\n" .. word
                spaceLeft = MAX_TEXT_WIDTH - wordWidth
            else
                spaceLeft = spaceLeft - (wordWidth + WIDTH_OF_SPACE)
            end
            i = i + 1
        end
    end
    return __TS__StringSplit(
        table.concat(words, " " or ","),
        "\n"
    )
end
local CHAT_POSITION_VERTICAL_OFFSET = Vector(0, -15)
CHAT_POSITION = CONSOLE_POSITION + CHAT_POSITION_VERTICAL_OFFSET
CHAT_POSITION_LEFT = CONSOLE_POSITION_LEFT + CHAT_POSITION_VERTICAL_OFFSET
local rightSideTextCutoffX = getScreenPosition(nil, 1 - SPACING_FROM_LEFT_EDGE, 0).X
MAX_TEXT_WIDTH = rightSideTextCutoffX - CHAT_POSITION.X
WIDTH_OF_SPACE = fonts.pf:GetStringWidth(" ")
LINE_LENGTH = 13
MAX_CHAT_MESSAGES = 10
FRAMES_FOR_CHAT_TO_SHOW = 120
function ____exports.postRender(self)
    drawChat(nil)
end
return ____exports
 end,
["mod.src.features.connectedIcon"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getScreenBottomRightPos = ____isaacscript_2Dcommon.getScreenBottomRightPos
local socketClient = require("mod.src.network.socketClient")
local ICON_OFFSET = Vector(-33, -30)
local connectedSprite = Sprite()
connectedSprite:Load("gfx/wifi.anm2", true)
connectedSprite:SetFrame("Default", 0)
function ____exports.postRender(self)
    if not socketClient:isConnected() then
        return
    end
    local bottomRightPos = getScreenBottomRightPos(nil)
    local position = bottomRightPos + ICON_OFFSET
    connectedSprite:RenderLayer(0, position)
end
return ____exports
 end,
["mod.src.types.MeetingPhase"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
do
    local ____export = require("common.src.types.MeetingPhase")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
return ____exports
 end,
["mod.src.players"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("mod.src.globals")
local g = ____globals.default
function ____exports.getPlayer(self, userID, players)
    do
        local i = 0
        while i < #players do
            local player = players[i + 1]
            if player.userID == userID then
                return player
            end
            i = i + 1
        end
    end
    error(
        "Failed to get the player for user ID: " .. tostring(userID)
    )
    return players[1]
end
function ____exports.getOurPlayer(self, players)
    if g.userID == nil then
        error("Failed to get our player since our user ID is null.")
    end
    return ____exports.getPlayer(nil, g.userID, players)
end
function ____exports.getPlayerCharacter(self, userID, players)
    local player = ____exports.getPlayer(nil, userID, players)
    return player.character
end
function ____exports.getPlayerUsername(self, userID, players)
    local player = ____exports.getPlayer(nil, userID, players)
    return player.username
end
function ____exports.updatePlayerMap(self, playerMessage)
    if g.game == nil then
        return
    end
    if playerMessage.gameID ~= g.game.id then
        return
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    local playerData = {userID = playerMessage.userID, x = playerMessage.x, y = playerMessage.y, roomIndex = playerMessage.roomIndex, animation = playerMessage.animation, animationFrame = playerMessage.animationFrame, overlayAnimation = playerMessage.overlayAnimation, overlayAnimationFrame = playerMessage.overlayAnimationFrame, frameUpdated = isaacFrameCount}
    g.game.playerMap:set(playerData.userID, playerData)
end
return ____exports
 end,
["mod.src.features.startMeeting"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local postRenderAlertStrip, postRenderFadingToBlackWithAlertStrip, postRenderFadingToGame, drawAlertStrip, getAlertText, hasFadeFinished, setState, TEXT_OFFSET, blackSprite
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local ensureAllCases = ____isaacscript_2Dcommon.ensureAllCases
local getScreenBottomRightPos = ____isaacscript_2Dcommon.getScreenBottomRightPos
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____minimapAPI = require("mod.src.minimapAPI")
local enableMinimapAPI = ____minimapAPI.enableMinimapAPI
local ____players = require("mod.src.players")
local getPlayer = ____players.getPlayer
local ____sprite = require("mod.src.sprite")
local initSprite = ____sprite.initSprite
local ____BlackSpriteState = require("mod.src.types.BlackSpriteState")
local BlackSpriteState = ____BlackSpriteState.BlackSpriteState
local ____MeetingType = require("mod.src.types.MeetingType")
local MeetingType = ____MeetingType.MeetingType
local ____StartMeetingState = require("mod.src.types.StartMeetingState")
local StartMeetingState = ____StartMeetingState.StartMeetingState
local ____util = require("mod.src.util")
local drawFontText = ____util.drawFontText
local ____blackSprite = require("mod.src.features.blackSprite")
local FADE_TO_BLACK_FRAMES = ____blackSprite.FADE_TO_BLACK_FRAMES
local setBlackSpriteState = ____blackSprite.setBlackSpriteState
local ____setupMeeting = require("mod.src.features.setupMeeting")
local setupMeeting = ____setupMeeting.setupMeeting
function postRenderAlertStrip(self)
    drawAlertStrip(nil)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, StartMeetingState.FADING_TO_BLACK_WITH_ALERT_STRIP)
        setBlackSpriteState(nil, BlackSpriteState.FADING_TO_BLACK)
    end
end
function postRenderFadingToBlackWithAlertStrip(self)
    drawAlertStrip(nil)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, StartMeetingState.FADING_TO_GAME)
        setBlackSpriteState(nil, BlackSpriteState.FADING_TO_GAME)
        setupMeeting(nil, false)
    end
end
function postRenderFadingToGame(self)
    if (g.game ~= nil) and hasFadeFinished(nil) then
        setState(nil, StartMeetingState.DISABLED)
        setBlackSpriteState(nil, BlackSpriteState.DISABLED)
    end
end
function drawAlertStrip(self)
    local bottomRightPos = getScreenBottomRightPos(nil)
    local position = Vector(0, bottomRightPos.Y / 3)
    blackSprite:RenderLayer(0, position)
    local opacity = 1
    local centerPos = bottomRightPos / 2
    local aboveCenterPos = centerPos + TEXT_OFFSET
    local text = getAlertText(nil)
    drawFontText(nil, text, aboveCenterPos, opacity)
end
function getAlertText(self)
    local defaultValue = "???"
    if (g.game == nil) or (g.game.meeting == nil) then
        return defaultValue
    end
    local playerInitiated = getPlayer(nil, g.game.meeting.userIDInitiated, g.game.players)
    if g.game.meeting.meetingType == MeetingType.REPORT_BODY then
        local playerKilled = getPlayer(nil, g.game.meeting.userIDKilled, g.game.players)
        return (playerInitiated.username .. " reported a dead body: ") .. playerKilled.username
    end
    if g.game.meeting.meetingType == MeetingType.EMERGENCY then
        return playerInitiated.username .. " called an emergency meeting!"
    end
    return defaultValue
end
function hasFadeFinished(self)
    if (g.game == nil) or (g.game.startMeeting.startFrame == nil) then
        return false
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    local framesPassed = isaacFrameCount - g.game.startMeeting.startFrame
    return framesPassed >= FADE_TO_BLACK_FRAMES
end
function setState(self, state)
    if (g.game == nil) or (not g.game.started) then
        return
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    g.game.startMeeting.state = state
    g.game.startMeeting.startFrame = isaacFrameCount
end
TEXT_OFFSET = Vector(0, -10)
blackSprite = initSprite(nil, "gfx/black.anm2")
function ____exports.postRender(self)
    if (g.game == nil) or (not g.game.started) then
        return
    end
    repeat
        local ____switch4 = g.game.startMeeting.state
        local ____cond4 = ____switch4 == StartMeetingState.DISABLED
        if ____cond4 then
            do
                break
            end
        end
        ____cond4 = ____cond4 or (____switch4 == StartMeetingState.ALERT_STRIP)
        if ____cond4 then
            do
                postRenderAlertStrip(nil)
                break
            end
        end
        ____cond4 = ____cond4 or (____switch4 == StartMeetingState.FADING_TO_BLACK_WITH_ALERT_STRIP)
        if ____cond4 then
            do
                postRenderFadingToBlackWithAlertStrip(nil)
                break
            end
        end
        ____cond4 = ____cond4 or (____switch4 == StartMeetingState.FADING_TO_GAME)
        if ____cond4 then
            do
                postRenderFadingToGame(nil)
                return
            end
        end
        do
            do
                ensureAllCases(nil, g.game.startMeeting.state)
            end
        end
    until true
end
function ____exports.startMeeting(self)
    local player = Isaac.GetPlayer()
    player.Velocity = Vector.Zero
    local bottomRightPos = getScreenBottomRightPos(nil)
    blackSprite.Scale = Vector(bottomRightPos.X, bottomRightPos.Y / 3)
    setState(nil, StartMeetingState.ALERT_STRIP)
    enableMinimapAPI(nil, false)
end
function ____exports.inStartMeeting(self)
    if (g.game == nil) or (g.game.meeting == nil) then
        return false
    end
    return (g.game.startMeeting.state ~= StartMeetingState.DISABLED) and (g.game.startMeeting.state ~= StartMeetingState.FADING_TO_GAME)
end
return ____exports
 end,
["mod.src.features.drawMeeting"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local drawTimeLeftText, getMeetingPhaseSecondsRemaining, drawVoteHelpText, TIME_LEFT_POS, VOTE_HELP_POS, LINE_SPACING
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____socketClient = require("mod.src.network.socketClient")
local getTime = ____socketClient.getTime
local ____MeetingPhase = require("mod.src.types.MeetingPhase")
local MeetingPhase = ____MeetingPhase.MeetingPhase
local ____util = require("mod.src.util")
local drawFontText = ____util.drawFontText
local getScreenPosition = ____util.getScreenPosition
local ____console = require("mod.src.features.console")
local isConsoleOpen = ____console.isConsoleOpen
local ____endMeeting = require("mod.src.features.endMeeting")
local inEndMeeting = ____endMeeting.inEndMeeting
local ____startMeeting = require("mod.src.features.startMeeting")
local inStartMeeting = ____startMeeting.inStartMeeting
function drawTimeLeftText(self)
    if (g.game == nil) or (g.game.meeting == nil) then
        return
    end
    local line1Pos = TIME_LEFT_POS
    drawFontText(nil, "Time until", line1Pos)
    local line2Pos = line1Pos + LINE_SPACING
    local verb = ((g.game.meeting.meetingPhase == MeetingPhase.PRE_VOTING) and "starts") or "ends"
    drawFontText(nil, ("voting " .. verb) .. ":", line2Pos)
    local line3Pos = line2Pos + Vector(0, 25)
    local secondsRemaining = getMeetingPhaseSecondsRemaining(nil, g.game.meeting)
    drawFontText(
        nil,
        tostring(secondsRemaining) .. " seconds",
        line3Pos
    )
end
function getMeetingPhaseSecondsRemaining(self, meeting)
    local endMeetingTime = meeting.timePhaseStarted + meeting.phaseLengthSeconds
    local now = getTime(nil)
    local secondsRemaining = endMeetingTime - now
    if secondsRemaining < 0 then
        secondsRemaining = 0
    end
    return math.ceil(secondsRemaining)
end
function drawVoteHelpText(self)
    if ((g.game == nil) or (g.game.meeting == nil)) or (g.game.meeting.meetingPhase ~= MeetingPhase.VOTING) then
        return
    end
    local line1Pos = VOTE_HELP_POS
    drawFontText(nil, "Vote with the", line1Pos)
    local line2Pos = line1Pos + LINE_SPACING
    drawFontText(nil, "/vote or /voteskip", line2Pos)
    local line3Pos = line2Pos + LINE_SPACING
    drawFontText(nil, "commands.", line3Pos)
end
local TEXT_X = 0.85
TIME_LEFT_POS = getScreenPosition(nil, TEXT_X, 0.45)
VOTE_HELP_POS = getScreenPosition(nil, TEXT_X, 0.15)
LINE_SPACING = Vector(0, 15)
function ____exports.postRender(self)
    if ((((g.game == nil) or (g.game.meeting == nil)) or inStartMeeting(nil)) or inEndMeeting(nil)) or isConsoleOpen(nil) then
        return
    end
    drawTimeLeftText(nil)
    drawVoteHelpText(nil)
end
return ____exports
 end,
["mod.src.characters"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
____exports.CHARACTER_PNG_PREFIX = "gfx/characters/costumes/"
____exports.DEFAULT_CHARACTER_PNG = "character_001_isaac.png"
____exports.CHARACTER_PNG_MAP = __TS__New(Map, {{PlayerType.PLAYER_ISAAC, "character_001_isaac.png"}, {PlayerType.PLAYER_MAGDALENA, "character_002_magdalene.png"}, {PlayerType.PLAYER_CAIN, "character_003_cain.png"}, {PlayerType.PLAYER_JUDAS, "character_004_judas.png"}, {PlayerType.PLAYER_XXX, "character_006_bluebaby.png"}, {PlayerType.PLAYER_EVE, "character_005_eve.png"}, {PlayerType.PLAYER_SAMSON, "character_007_samson.png"}, {PlayerType.PLAYER_AZAZEL, "character_008_azazel.png"}, {PlayerType.PLAYER_LAZARUS, "character_009_lazarus.png"}, {PlayerType.PLAYER_EDEN, "character_009_eden.png"}, {PlayerType.PLAYER_THELOST, "character_012_thelost.png"}, {PlayerType.PLAYER_LAZARUS2, "character_010_lazarus2.png"}, {PlayerType.PLAYER_BLACKJUDAS, "character_013_blackjudas.png"}, {PlayerType.PLAYER_LILITH, "character_014_lilith.png"}, {PlayerType.PLAYER_KEEPER, "character_015_keeper.png"}, {PlayerType.PLAYER_APOLLYON, "character_016_apollyon.png"}, {PlayerType.PLAYER_THEFORGOTTEN, "character_017_theforgotten.png"}, {PlayerType.PLAYER_THESOUL, "character_018_thesoul.png"}, {PlayerType.PLAYER_BETHANY, "character_001x_bethany.png"}, {PlayerType.PLAYER_JACOB, "character_002x_jacob.png"}, {PlayerType.PLAYER_ESAU, "character_003x_esau.png"}, {PlayerType.PLAYER_ISAAC_B, "character_001b_isaac.png"}, {PlayerType.PLAYER_MAGDALENA_B, "character_002b_magdalene.png"}, {PlayerType.PLAYER_CAIN_B, "character_003b_cain.png"}, {PlayerType.PLAYER_JUDAS_B, "character_004b_judas.png"}, {PlayerType.PLAYER_XXX_B, "character_005b_bluebaby.png"}, {PlayerType.PLAYER_EVE_B, "character_006b_eve.png"}, {PlayerType.PLAYER_SAMSON_B, "character_007b_samson.png"}, {PlayerType.PLAYER_AZAZEL_B, "character_008b_azazel.png"}, {PlayerType.PLAYER_LAZARUS_B, "character_009b_lazarus.png"}, {PlayerType.PLAYER_EDEN_B, "character_009_eden.png"}, {PlayerType.PLAYER_THELOST_B, "character_012b_thelost.png"}, {PlayerType.PLAYER_LILITH_B, "character_014b_lilith.png"}, {PlayerType.PLAYER_KEEPER_B, "character_015b_keeper.png"}, {PlayerType.PLAYER_APOLLYON_B, "character_016b_apollyon.png"}, {PlayerType.PLAYER_THEFORGOTTEN_B, "character_016b_theforgotten.png"}, {PlayerType.PLAYER_BETHANY_B, "character_018b_bethany.png"}, {PlayerType.PLAYER_JACOB_B, "character_019b_jacob.png"}, {PlayerType.PLAYER_LAZARUS2_B, "character_009b_lazarus2.png"}, {PlayerType.PLAYER_JACOB2_B, "character_019b_jacob2.png"}, {PlayerType.PLAYER_THESOUL_B, "character_017b_thesoul.png"}})
____exports.CHARACTER_COSTUME_PREFIX = "gfx/characters/"
____exports.DEFAULT_CHARACTER_COSTUME = "none.anm2"
____exports.CHARACTER_COSTUME_PNG_MAP = __TS__New(Map, {{PlayerType.PLAYER_ISAAC, "none.anm2"}, {PlayerType.PLAYER_MAGDALENA, "character_002_magdalenehead.anm2"}, {PlayerType.PLAYER_CAIN, "character_003_cainseyepatch.anm2"}, {PlayerType.PLAYER_JUDAS, "character_004_judasfez.anm2"}, {PlayerType.PLAYER_EVE, "character_005_evehead.anm2"}, {PlayerType.PLAYER_SAMSON, "character_007_samsonhead.anm2"}, {PlayerType.PLAYER_LAZARUS, "character_lazarushair1.anm2"}, {PlayerType.PLAYER_EDEN, "character_009_edenhair1.anm2"}, {PlayerType.PLAYER_LILITH, "character_lilithhair.anm2"}, {PlayerType.PLAYER_BETHANY, "character_001x_bethanyhead.anm2"}, {PlayerType.PLAYER_JACOB, "character_002x_jacobhead.anm2"}, {PlayerType.PLAYER_ISAAC_B, "character_b01_isaac.anm2"}, {PlayerType.PLAYER_MAGDALENA_B, "character_b02_magdalene.anm2"}, {PlayerType.PLAYER_CAIN_B, "character_b03_cain.anm2"}, {PlayerType.PLAYER_JUDAS_B, "character_b04_judas.anm2"}})
return ____exports
 end,
["mod.src.features.drawOtherPlayers"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local drawOtherPlayersFromUDP, drawOtherPlayersMeeting, getPlayerSprites, setSpriteCharacter, setSpriteAnimation, drawSprites, USERNAME_TEXT_OFFSET, USERNAME_FADE, USERNAME_FADE_DEATH, CHARACTER_LAYER_ID, DEATH_SPRITE_OFFSET, DEATH_COSTUME_OFFSET, DEATH_ANIMATION_FINAL_FRAME, spriteMap, spriteCostumeMap, spriteCharacterMap
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getRoomIndex = ____isaacscript_2Dcommon.getRoomIndex
local ISAAC_FRAMES_PER_SECOND = ____isaacscript_2Dcommon.ISAAC_FRAMES_PER_SECOND
local ____characters = require("mod.src.characters")
local CHARACTER_COSTUME_PNG_MAP = ____characters.CHARACTER_COSTUME_PNG_MAP
local CHARACTER_COSTUME_PREFIX = ____characters.CHARACTER_COSTUME_PREFIX
local CHARACTER_PNG_MAP = ____characters.CHARACTER_PNG_MAP
local CHARACTER_PNG_PREFIX = ____characters.CHARACTER_PNG_PREFIX
local DEFAULT_CHARACTER_COSTUME = ____characters.DEFAULT_CHARACTER_COSTUME
local DEFAULT_CHARACTER_PNG = ____characters.DEFAULT_CHARACTER_PNG
local ____constants = require("mod.src.constants")
local LOBBY_ROOM_INDEX = ____constants.LOBBY_ROOM_INDEX
local ____debugFunction = require("mod.src.debugFunction")
local injectTestPlayers = ____debugFunction.injectTestPlayers
local ____fonts = require("mod.src.fonts")
local fonts = ____fonts.fonts
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____players = require("mod.src.players")
local getPlayerCharacter = ____players.getPlayerCharacter
local getPlayerUsername = ____players.getPlayerUsername
local ____console = require("mod.src.features.console")
local isConsoleOpen = ____console.isConsoleOpen
local ____endMeeting = require("mod.src.features.endMeeting")
local inEndMeeting = ____endMeeting.inEndMeeting
local ____setupMeeting = require("mod.src.features.setupMeeting")
local getMeetingCirclePoints = ____setupMeeting.getMeetingCirclePoints
local ____startMeeting = require("mod.src.features.startMeeting")
local inStartMeeting = ____startMeeting.inStartMeeting
function drawOtherPlayersFromUDP(self)
    if (g.game == nil) or (g.game.meeting ~= nil) then
        return
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    local roomIndex = getRoomIndex(nil)
    if roomIndex == GridRooms.ROOM_DEBUG_IDX then
        roomIndex = LOBBY_ROOM_INDEX
    end
    for ____, playerData in __TS__Iterator(
        g.game.playerMap:values()
    ) do
        do
            local framesSinceLastUpdate = isaacFrameCount - playerData.frameUpdated
            if framesSinceLastUpdate > (1 * ISAAC_FRAMES_PER_SECOND) then
                goto __continue7
            end
            if playerData.roomIndex ~= roomIndex then
                goto __continue7
            end
            local mainSprite, costumeSprite = table.unpack(
                getPlayerSprites(nil, playerData.userID)
            )
            setSpriteCharacter(nil, mainSprite, costumeSprite, playerData.userID)
            setSpriteAnimation(nil, mainSprite, costumeSprite, playerData.animation, playerData.animationFrame, playerData.overlayAnimation, playerData.overlayAnimationFrame)
            local position = Vector(playerData.x, playerData.y)
            drawSprites(nil, mainSprite, nil, position)
            local username = getPlayerUsername(nil, playerData.userID, g.game.players)
            ____exports.drawUsername(nil, position, username)
        end
        ::__continue7::
    end
end
function drawOtherPlayersMeeting(self)
    if (((g.game == nil) or (g.game.meeting == nil)) or inStartMeeting(nil)) or inEndMeeting(nil) then
        return
    end
    local circlePoints = getMeetingCirclePoints(nil)
    injectTestPlayers(nil)
    do
        local i = 0
        while i < #g.game.players do
            local player = g.game.players[i + 1]
            local mainSprite, costumeSprite = table.unpack(
                getPlayerSprites(nil, player.userID)
            )
            setSpriteCharacter(nil, mainSprite, costumeSprite, player.userID)
            if player.alive then
                setSpriteAnimation(nil, mainSprite, costumeSprite, "WalkDown", 0, "HeadDown", 0)
            else
                setSpriteAnimation(nil, mainSprite, costumeSprite, "Death", DEATH_ANIMATION_FINAL_FRAME, "", 0)
            end
            local position = circlePoints[i + 1]
            if position ~= nil then
                drawSprites(nil, mainSprite, costumeSprite, position)
            end
            i = i + 1
        end
    end
    do
        local i = 0
        while i < #g.game.players do
            local player = g.game.players[i + 1]
            local position = circlePoints[i + 1]
            if position ~= nil then
                local opacity = ((player.alive and (function() return nil end)) or (function() return USERNAME_FADE_DEATH end))()
                local isImpostor = (g.game.imposters ~= nil) and __TS__ArrayIncludes(g.game.imposters, player.userID)
                ____exports.drawUsername(nil, position, player.username, opacity, isImpostor)
            end
            i = i + 1
        end
    end
end
function getPlayerSprites(self, userID)
    local mainSprite = spriteMap:get(userID)
    if mainSprite == nil then
        mainSprite = Sprite()
        mainSprite:Load("gfx/001.000_Player.anm2", true)
        spriteMap:set(userID, mainSprite)
    end
    local costumeSprite = spriteCostumeMap:get(userID)
    if costumeSprite == nil then
        costumeSprite = Sprite()
        local defaultCharacterCostume = CHARACTER_COSTUME_PREFIX .. DEFAULT_CHARACTER_COSTUME
        costumeSprite:Load(defaultCharacterCostume, true)
        spriteCostumeMap:set(userID, costumeSprite)
    end
    return {mainSprite, costumeSprite}
end
function setSpriteCharacter(self, mainSprite, costumeSprite, userID)
    if g.game == nil then
        return
    end
    local spriteCharacter = spriteCharacterMap:get(userID)
    if spriteCharacter == nil then
        spriteCharacter = -1
    end
    local character = getPlayerCharacter(nil, userID, g.game.players)
    if spriteCharacter == character then
        return
    end
    spriteCharacterMap:set(userID, character)
    local characterPNG = CHARACTER_PNG_MAP:get(character)
    if characterPNG == nil then
        characterPNG = DEFAULT_CHARACTER_PNG
    end
    local characterSpritePath = CHARACTER_PNG_PREFIX .. characterPNG
    mainSprite:ReplaceSpritesheet(CHARACTER_LAYER_ID, characterSpritePath)
    mainSprite:LoadGraphics()
    local characterCostume = CHARACTER_COSTUME_PNG_MAP:get(character)
    if characterCostume == nil then
        characterCostume = DEFAULT_CHARACTER_COSTUME
    end
    local characterCostumePath = CHARACTER_COSTUME_PREFIX .. characterCostume
    costumeSprite:Load(characterCostumePath, true)
end
function setSpriteAnimation(self, mainSprite, costumeSprite, animation, animationFrame, overlayAnimation, overlayAnimationFrame)
    mainSprite:SetFrame(animation, animationFrame)
    if overlayAnimation == "" then
        mainSprite:RemoveOverlay()
    else
        mainSprite:SetOverlayFrame(overlayAnimation, overlayAnimationFrame)
    end
    if animation == "Death" then
        mainSprite.Offset = DEATH_SPRITE_OFFSET
        costumeSprite.Offset = DEATH_COSTUME_OFFSET
        costumeSprite:SetFrame("HeadDown", 0)
        costumeSprite.Rotation = 90
    else
        mainSprite.Offset = Vector.Zero
        costumeSprite.Offset = Vector.Zero
        costumeSprite:SetFrame(overlayAnimation, overlayAnimationFrame)
        costumeSprite.Rotation = 0
    end
end
function drawSprites(self, mainSprite, costumeSprite, positionGame)
    local position = Isaac.WorldToScreen(positionGame)
    mainSprite:Render(position, Vector.Zero, Vector.Zero)
    if costumeSprite ~= nil then
        costumeSprite:Render(position, Vector.Zero, Vector.Zero)
    end
end
function ____exports.drawUsername(self, positionGame, username, opacity, red)
    if opacity == nil then
        opacity = USERNAME_FADE
    end
    if red == nil then
        red = false
    end
    if isConsoleOpen(nil) then
        return
    end
    local positionSprite = Isaac.WorldToScreen(positionGame)
    local position = positionSprite + USERNAME_TEXT_OFFSET
    local color = (red and KColor(1, 0, 0, opacity)) or KColor(1, 1, 1, opacity)
    local scale = 1
    local length = fonts.pf:GetStringWidthUTF8(username) * scale
    fonts.pf:DrawStringScaled(username, position.X - (length / 2), position.Y, scale, scale, color, 0, true)
end
USERNAME_TEXT_OFFSET = Vector(0, -50)
USERNAME_FADE = 0.75
USERNAME_FADE_DEATH = 0.25
CHARACTER_LAYER_ID = 0
DEATH_SPRITE_OFFSET = Vector(-20, -10)
DEATH_COSTUME_OFFSET = Vector(-14, -15)
DEATH_ANIMATION_FINAL_FRAME = 55
spriteMap = __TS__New(Map)
spriteCostumeMap = __TS__New(Map)
spriteCharacterMap = __TS__New(Map)
function ____exports.postRender(self)
    if g.game == nil then
        return
    end
    drawOtherPlayersFromUDP(nil)
    drawOtherPlayersMeeting(nil)
end
return ____exports
 end,
["mod.src.features.drawOurUsername"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____console = require("mod.src.features.console")
local isConsoleOpen = ____console.isConsoleOpen
local ____drawOtherPlayers = require("mod.src.features.drawOtherPlayers")
local drawUsername = ____drawOtherPlayers.drawUsername
function ____exports.postRender(self)
    if ((g.game == nil) or (g.username == nil)) or isConsoleOpen(nil) then
        return
    end
    local player = Isaac.GetPlayer()
    if not player.Visible then
        return
    end
    local amImposter = g.game.imposters ~= nil
    drawUsername(nil, player.Position, g.username, nil, amImposter)
end
return ____exports
 end,
["mod.src.tasks.bombRocks"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local spawnBombs, spawnRocks, spawnRock, everyRockBroken, NUM_ROCKS_TO_SPAWN, LEFT_SIDE_GRID_INDEXES, seed, rockBrokenMap
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local nextSeed = ____isaacscript_2Dcommon.nextSeed
local spawnGridEntity = ____isaacscript_2Dcommon.spawnGridEntity
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____util = require("mod.src.util")
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
local spawnEntity = ____util.spawnEntity
function spawnBombs(self, gridIndex)
    local bombs = spawnEntity(nil, EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_BOMB, BombSubType.BOMB_DOUBLEPACK, gridIndex)
    local sprite = bombs:GetSprite()
    sprite:SetLastFrame()
end
function spawnRocks(self)
    rockBrokenMap:clear()
    do
        local i = 0
        while i < NUM_ROCKS_TO_SPAWN do
            spawnRock(nil)
            i = i + 1
        end
    end
end
function spawnRock(self)
    local game = Game()
    local room = game:GetRoom()
    if seed == nil then
        seed = room:GetSpawnSeed()
    end
    local gridIndex
    local gridEntity
    repeat
        do
            seed = nextSeed(nil, seed)
            gridIndex = room:GetRandomTileIndex(seed)
            gridEntity = room:GetGridEntity(gridIndex)
        end
    until not ((gridEntity ~= nil) or __TS__ArrayIncludes(LEFT_SIDE_GRID_INDEXES, gridIndex))
    spawnGridEntity(nil, GridEntityType.GRID_ROCK, gridIndex)
    rockBrokenMap:set(gridIndex, false)
end
function everyRockBroken(self)
    for ____, broken in __TS__Iterator(
        rockBrokenMap:values()
    ) do
        if not broken then
            return false
        end
    end
    return true
end
local THIS_TASK = Task.SHORT_BOMB_ROCKS
NUM_ROCKS_TO_SPAWN = 20
local TOP_LEFT_GRID_INDEX = 16
local ONE_BY_ONE_ROOM_HEIGHT_WITHOUT_WALLS = 7
local ONE_BY_ONE_ROOM_WIDTH = 15
LEFT_SIDE_GRID_INDEXES = {}
do
    local i = 0
    while i < ONE_BY_ONE_ROOM_HEIGHT_WITHOUT_WALLS do
        local gridIndex = TOP_LEFT_GRID_INDEX + (i * ONE_BY_ONE_ROOM_WIDTH)
        __TS__ArrayPush(LEFT_SIDE_GRID_INDEXES, gridIndex)
        i = i + 1
    end
end
seed = nil
rockBrokenMap = __TS__New(Map)
function ____exports.bombRocks(self)
    spawnTeleporter(nil, TOP_LEFT_GRID_INDEX)
    local belowTeleporterGridIndex = 46
    movePlayerToGridIndex(nil, belowTeleporterGridIndex)
    spawnBombs(nil, 76)
    spawnBombs(nil, 91)
    spawnBombs(nil, 106)
    spawnRocks(nil)
end
function ____exports.postGridEntityUpdateRock(self, gridEntity)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    local game = Game()
    local room = game:GetRoom()
    local gridIndex = room:GetGridIndex(gridEntity.Position)
    local broken = gridEntity.State == 2
    rockBrokenMap:set(gridIndex, broken)
    if everyRockBroken(nil) then
        taskComplete(nil)
    end
end
return ____exports
 end,
["mod.src.tasks.destroyGiantPoop"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local spawnGiantPoop = ____isaacscript_2Dcommon.spawnGiantPoop
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____util = require("mod.src.util")
local enableShooting = ____util.enableShooting
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
function ____exports.destroyGiantPoop(self)
    local centerLeftGridIndex = 62
    movePlayerToGridIndex(nil, centerLeftGridIndex)
    enableShooting(nil)
    local topLeftGridIndex = 32
    spawnTeleporter(nil, topLeftGridIndex)
    local centerRightGridIndex = 52
    spawnGiantPoop(nil, centerRightGridIndex)
end
function ____exports.postGridEntityUpdatePoop(self, gridEntity)
    if gridEntity.State == 1000 then
        taskComplete(nil)
    end
end
return ____exports
 end,
["mod.src.tasks.loadSlotMachines"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local removeAllMatchingEntities = ____isaacscript_2Dcommon.removeAllMatchingEntities
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____util = require("mod.src.util")
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
local spawnEntity = ____util.spawnEntity
local THIS_TASK = Task.SHORT_LOAD_SLOT_MACHINES
local NUM_SLOT_MACHINES = 4
local SLOT_MACHINE_SPACING = 2
function ____exports.loadSlotMachines(self)
    local topRightGridIndex = 42
    movePlayerToGridIndex(nil, topRightGridIndex)
    local bottomRightGridIndex = 102
    spawnTeleporter(nil, bottomRightGridIndex)
    local startingGridIndex = 49
    do
        local i = 0
        while i < NUM_SLOT_MACHINES do
            local gridIndex = startingGridIndex + (i * SLOT_MACHINE_SPACING)
            spawnEntity(nil, EntityType.ENTITY_SLOT, 1, 0, gridIndex)
            i = i + 1
        end
    end
    local coinGridIndexes = {79, 80, 81, 82, 83, 84, 85}
    for ____, gridIndex in ipairs(coinGridIndexes) do
        local coins = spawnEntity(nil, EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COIN, CoinSubType.COIN_DOUBLEPACK, gridIndex)
        local sprite = coins:GetSprite()
        sprite:SetLastFrame()
    end
end
function ____exports.postUpdate(self)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    removeAllMatchingEntities(nil, EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE)
    local player = Isaac.GetPlayer()
    local numCoins = player:GetNumCoins()
    local coins = Isaac.FindByType(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COIN)
    if (numCoins == 0) and (#coins == 0) then
        taskComplete(nil)
    end
end
return ____exports
 end,
["mod.src.tasks.pushTNTBarrel"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local allRocksBroken
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getGridEntities = ____isaacscript_2Dcommon.getGridEntities
local spawnGridEntity = ____isaacscript_2Dcommon.spawnGridEntity
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local taskComplete = ____taskSubroutines.taskComplete
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
local ____util = require("mod.src.util")
local enableShooting = ____util.enableShooting
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
function allRocksBroken(self)
    local rocks = getGridEntities(nil, GridEntityType.GRID_ROCK)
    for ____, rock in ipairs(rocks) do
        if rock.State == 1 then
            return false
        end
    end
    return true
end
local THIS_TASK = Task.SHORT_PUSH_TNT_BARREL
function ____exports.pushTNTBarrel(self)
    local game = Game()
    local room = game:GetRoom()
    local bottomLeftGridIndex = 92
    movePlayerToGridIndex(nil, bottomLeftGridIndex)
    enableShooting(nil)
    local topLeftGridIndex = 32
    spawnTeleporter(nil, topLeftGridIndex)
    local leftGridIndex = 63
    local position = room:GetGridPosition(leftGridIndex)
    Isaac.Spawn(EntityType.ENTITY_MOVABLE_TNT, 0, 0, position, Vector.Zero, nil)
    local rockGridIndexes = {55, 56, 57, 85, 86, 87, 72}
    for ____, gridIndex in ipairs(rockGridIndexes) do
        spawnGridEntity(nil, GridEntityType.GRID_ROCK, gridIndex)
    end
end
function ____exports.postUpdate(self)
    if (g.game == nil) or (g.game.currentTask ~= THIS_TASK) then
        return
    end
    if allRocksBroken(nil) then
        taskComplete(nil)
    end
end
return ____exports
 end,
["mod.src.tasks.walkBetweenSlides"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnTaskButton = ____buttonSpawn.spawnTaskButton
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnFakeBlockLine = ____spawnObjects.spawnFakeBlockLine
local ____util = require("mod.src.util")
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
local spawnEntity = ____util.spawnEntity
function ____exports.walkBetweenSlides(self)
    local topLeftGridIndex = 32
    movePlayerToGridIndex(nil, topLeftGridIndex)
    local bottomLeftGridIndex = 92
    spawnTeleporter(nil, bottomLeftGridIndex)
    local rightGridIndex = 72
    spawnTaskButton(nil, rightGridIndex, 1)
    spawnFakeBlockLine(nil, 19, 3, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 19, 49)
        end
    )
    spawnFakeBlockLine(nil, 79, 3, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 79, 109)
        end
    )
    spawnFakeBlockLine(nil, 21, 2, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 21, 36)
        end
    )
    spawnFakeBlockLine(nil, 66, 4, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 66, 111)
        end
    )
    spawnFakeBlockLine(nil, 23, 4, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 23, 68)
        end
    )
    spawnFakeBlockLine(nil, 98, 2, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 98, 113)
        end
    )
    spawnFakeBlockLine(nil, 25, 3, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 25, 55)
        end
    )
    spawnFakeBlockLine(nil, 85, 3, Direction.DOWN)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 85, 115)
        end
    )
    local slideGridIndexes = {20, 110, 22, 112, 24, 114}
    for ____, gridIndex in ipairs(slideGridIndexes) do
        spawnEntity(nil, EntityType.ENTITY_POKY, 1, 0, gridIndex)
    end
end
return ____exports
 end,
["mod.src.tasks.walkBetweenSuctionPitfalls"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnTaskButton = ____buttonSpawn.spawnTaskButton
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnBlockLine = ____spawnObjects.spawnBlockLine
local spawnSpikesLine = ____spawnObjects.spawnSpikesLine
local ____util = require("mod.src.util")
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
local spawnEntity = ____util.spawnEntity
function ____exports.walkBetweenSuctionPitfalls(self)
    local bottomLeftGridIndex = 106
    spawnTeleporter(nil, bottomLeftGridIndex)
    local aboveTeleporterGridIndex = 91
    movePlayerToGridIndex(nil, aboveTeleporterGridIndex)
    spawnBlockLine(nil, 77, 3, Direction.DOWN)
    spawnBlockLine(nil, 27, 3, Direction.DOWN)
    local topRightGridIndex = 28
    spawnTaskButton(nil, topRightGridIndex, 1)
    spawnSpikesLine(nil, 108, 11, Direction.RIGHT)
    spawnSpikesLine(nil, 78, 2, Direction.DOWN)
    spawnSpikesLine(nil, 64, 2, Direction.DOWN)
    spawnSpikesLine(nil, 80, 2, Direction.DOWN)
    spawnSpikesLine(nil, 84, 2, Direction.DOWN)
    spawnSpikesLine(nil, 70, 2, Direction.DOWN)
    spawnSpikesLine(nil, 86, 2, Direction.DOWN)
    spawnSpikesLine(nil, 16, 11, Direction.RIGHT)
    spawnSpikesLine(nil, 31, 6, Direction.RIGHT)
    spawnSpikesLine(nil, 38, 4, Direction.RIGHT)
    spawnSpikesLine(nil, 46, 2, Direction.RIGHT)
    spawnSpikesLine(nil, 51, 3, Direction.RIGHT)
    spawnSpikesLine(nil, 67, 2, Direction.DOWN)
    spawnSpikesLine(nil, 87, 2, Direction.DOWN)
    spawnSpikesLine(nil, 88, 2, Direction.DOWN)
    for ____, gridIndex in ipairs({94, 100, 37}) do
        spawnEntity(nil, EntityType.ENTITY_PITFALL, 1, 0, gridIndex)
    end
end
return ____exports
 end,
["mod.src.tasks.walkDiagonallyThroughSpikes"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local spawnGridEntity = ____isaacscript_2Dcommon.spawnGridEntity
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnTaskButton = ____buttonSpawn.spawnTaskButton
local ____teleporter = require("mod.src.features.teleporter")
local spawnTeleporter = ____teleporter.spawnTeleporter
local ____util = require("mod.src.util")
local movePlayerToGridIndex = ____util.movePlayerToGridIndex
function ____exports.walkDiagonallyThroughSpikes(self)
    local topLeftGridIndex = 32
    movePlayerToGridIndex(nil, topLeftGridIndex)
    local bottomLeftGridIndex = 92
    spawnTeleporter(nil, bottomLeftGridIndex)
    local bottomRightGridIndex = 117
    spawnTaskButton(nil, bottomRightGridIndex, 1)
    local spikeGridIndexes = {19, 20, 21, 22, 23, 25, 26, 27, 28, 34, 35, 36, 37, 39, 41, 42, 43, 49, 50, 51, 53, 54, 55, 57, 58, 65, 67, 68, 69, 71, 72, 73, 79, 81, 82, 83, 85, 86, 87, 88, 94, 95, 96, 97, 98, 99, 101, 102, 103, 109, 110, 111, 112, 113, 114, 115, 118}
    for ____, gridIndex in ipairs(spikeGridIndexes) do
        spawnGridEntity(nil, GridEntityType.GRID_SPIKES, gridIndex)
    end
end
return ____exports
 end,
["mod.src.taskFunctions"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____bombRocks = require("mod.src.tasks.bombRocks")
local bombRocks = ____bombRocks.bombRocks
local ____buttonsBehindKeyBlocks = require("mod.src.tasks.buttonsBehindKeyBlocks")
local buttonsBehindKeyBlocks = ____buttonsBehindKeyBlocks.buttonsBehindKeyBlocks
local ____destroyGiantPoop = require("mod.src.tasks.destroyGiantPoop")
local destroyGiantPoop = ____destroyGiantPoop.destroyGiantPoop
local ____fixWires = require("mod.src.tasks.fixWires")
local fixWires = ____fixWires.fixWires
local ____identifyItems = require("mod.src.tasks.identifyItems")
local identifyItems = ____identifyItems.identifyItems
local ____identifyPickupsInOrder = require("mod.src.tasks.identifyPickupsInOrder")
local identifyPickupsInOrder = ____identifyPickupsInOrder.identifyPickupsInOrder
local ____identifyTrinkets = require("mod.src.tasks.identifyTrinkets")
local identifyTrinkets = ____identifyTrinkets.identifyTrinkets
local ____killWorms = require("mod.src.tasks.killWorms")
local killWorms = ____killWorms.killWorms
local ____loadSlotMachines = require("mod.src.tasks.loadSlotMachines")
local loadSlotMachines = ____loadSlotMachines.loadSlotMachines
local ____makePentagram = require("mod.src.tasks.makePentagram")
local makePentagram = ____makePentagram.makePentagram
local ____pressButtonsWithGrudge = require("mod.src.tasks.pressButtonsWithGrudge")
local pressButtonsWithGrudge = ____pressButtonsWithGrudge.pressButtonsWithGrudge
local ____pushTNTBarrel = require("mod.src.tasks.pushTNTBarrel")
local pushTNTBarrel = ____pushTNTBarrel.pushTNTBarrel
local ____walkBetweenSlides = require("mod.src.tasks.walkBetweenSlides")
local walkBetweenSlides = ____walkBetweenSlides.walkBetweenSlides
local ____walkBetweenSuctionPitfalls = require("mod.src.tasks.walkBetweenSuctionPitfalls")
local walkBetweenSuctionPitfalls = ____walkBetweenSuctionPitfalls.walkBetweenSuctionPitfalls
local ____walkDiagonallyThroughSpikes = require("mod.src.tasks.walkDiagonallyThroughSpikes")
local walkDiagonallyThroughSpikes = ____walkDiagonallyThroughSpikes.walkDiagonallyThroughSpikes
local ____Task = require("mod.src.types.Task")
local Task = ____Task.Task
____exports.taskFunctions = __TS__New(Map)
____exports.taskFunctions:set(Task.SHORT_DESTROY_GIANT_POOP, destroyGiantPoop)
____exports.taskFunctions:set(Task.SHORT_BOMB_ROCKS, bombRocks)
____exports.taskFunctions:set(Task.SHORT_IDENTIFY_ITEMS, identifyItems)
____exports.taskFunctions:set(Task.SHORT_IDENTIFY_TRINKETS, identifyTrinkets)
____exports.taskFunctions:set(Task.SHORT_LOAD_SLOT_MACHINES, loadSlotMachines)
____exports.taskFunctions:set(Task.SHORT_MAKE_PENTAGRAM, makePentagram)
____exports.taskFunctions:set(Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE, pressButtonsWithGrudge)
____exports.taskFunctions:set(Task.SHORT_FIX_WIRES, fixWires)
____exports.taskFunctions:set(Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES, walkDiagonallyThroughSpikes)
____exports.taskFunctions:set(Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS, walkBetweenSuctionPitfalls)
____exports.taskFunctions:set(Task.SHORT_WALK_BETWEEN_SLIDES, walkBetweenSlides)
____exports.taskFunctions:set(Task.SHORT_PUSH_TNT_BARREL, pushTNTBarrel)
____exports.taskFunctions:set(Task.LONG_IDENTIFY_PICKUPS_IN_ORDER, identifyPickupsInOrder)
____exports.taskFunctions:set(Task.LONG_KILL_WORMS, killWorms)
____exports.taskFunctions:set(Task.LONG_BUTTONS_BEHIND_KEY_BLOCKS, buttonsBehindKeyBlocks)
return ____exports
 end,
["mod.src.features.task"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local setupTaskRoom
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____minimapAPI = require("mod.src.minimapAPI")
local enableMinimapAPI = ____minimapAPI.enableMinimapAPI
local ____stageAPI = require("mod.src.stageAPI")
local getStageAPIRoomName = ____stageAPI.getStageAPIRoomName
local ____taskFunctions = require("mod.src.taskFunctions")
local taskFunctions = ____taskFunctions.taskFunctions
local ____taskSubroutines = require("mod.src.features.taskSubroutines")
local clearRoomEntities = ____taskSubroutines.clearRoomEntities
function ____exports.inTask(self)
    local roomName = getStageAPIRoomName(nil)
    return roomName == "Task"
end
function setupTaskRoom(self)
    if ((not ____exports.inTask(nil)) or (g.game == nil)) or (g.game.currentTask == nil) then
        return
    end
    enableMinimapAPI(nil, false)
    clearRoomEntities(nil)
    local taskFunction = taskFunctions:get(g.game.currentTask)
    if taskFunction ~= nil then
        taskFunction(nil)
    end
end
function ____exports.postStageAPINewRoom(self)
    setupTaskRoom(nil)
end
return ____exports
 end,
["mod.src.features.drawRoomDescription"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("mod.src.constants")
local IS_DEV = ____constants.IS_DEV
local MAX_PLAYERS = ____constants.MAX_PLAYERS
local taskDescriptions = ____constants.taskDescriptions
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____stageAPI = require("mod.src.stageAPI")
local getSkeldRoom = ____stageAPI.getSkeldRoom
local getStageAPIRoomName = ____stageAPI.getStageAPIRoomName
local ____util = require("mod.src.util")
local drawFontText = ____util.drawFontText
local ____console = require("mod.src.features.console")
local isConsoleOpen = ____console.isConsoleOpen
local ____endMeeting = require("mod.src.features.endMeeting")
local inEndMeeting = ____endMeeting.inEndMeeting
local ____lobby = require("mod.src.features.lobby")
local inLobby = ____lobby.inLobby
local ____task = require("mod.src.features.task")
local inTask = ____task.inTask
local TEXT_GRID_INDEX = 7
local SECOND_LINE_OFFSET = Vector(0, 20)
function ____exports.postRender(self)
    if ((((StageAPI == nil) or (g.game == nil)) or (g.game.meeting ~= nil)) or inEndMeeting(nil)) or isConsoleOpen(nil) then
        return
    end
    local game = Game()
    local room = game:GetRoom()
    local worldPosition = room:GetGridPosition(TEXT_GRID_INDEX)
    local position = Isaac.WorldToRenderPosition(worldPosition)
    if inTask(nil) and (g.game.currentTask ~= nil) then
        local taskDescription = taskDescriptions[g.game.currentTask]
        drawFontText(nil, "Task: " .. taskDescription.name, position)
        return
    end
    if inLobby(nil) then
        drawFontText(nil, "Lobby", position)
        local positionBelow = position + SECOND_LINE_OFFSET
        drawFontText(
            nil,
            (tostring(#g.game.players) .. " / ") .. tostring(MAX_PLAYERS),
            positionBelow
        )
        return
    end
    local roomName = getStageAPIRoomName(nil)
    local skeldRoom = getSkeldRoom(nil)
    if room == nil then
        skeldRoom = -1
    end
    local roomDescription = (IS_DEV and (((roomName .. " (") .. tostring(skeldRoom)) .. ")")) or roomName
    drawFontText(nil, roomDescription, position)
end
return ____exports
 end,
["mod.src.commands.chat"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local chat = require("mod.src.chat")
function ____exports.commandChat(self, data)
    chat:add(data)
end
return ____exports
 end,
["mod.src.commands.endGame"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("mod.src.globals")
local g = ____globals.default
function ____exports.commandEndGame(self, _data)
    if g.game == nil then
        return
    end
    local foo = "todo"
end
return ____exports
 end,
["mod.src.commands.endMeeting"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____endMeeting = require("mod.src.features.endMeeting")
local endMeeting = ____endMeeting.endMeeting
local ____globals = require("mod.src.globals")
local g = ____globals.default
function ____exports.commandEndMeeting(self, data)
    if g.game == nil then
        return
    end
    g.game.meeting = nil
    g.game.endMeeting.meetingResolution = data.meetingResolution
    g.game.endMeeting.userIDEjected = data.userIDEjected
    endMeeting(nil)
end
return ____exports
 end,
["mod.src.commands.error"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local chat = require("mod.src.chat")
function ____exports.commandError(self, data)
    chat:addLocal("Error: " .. data.msg)
end
return ____exports
 end,
["mod.src.commands.gameDescription"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local autoLogin = require("mod.src.features.autoLogin")
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____players = require("mod.src.players")
local getOurPlayer = ____players.getOurPlayer
function ____exports.commandGameDescription(self, data)
    if g.game == nil then
        return
    end
    g.game.players = data.players
    g.game.started = data.started
    g.game.meeting = data.meeting
    local player = getOurPlayer(nil, data.players)
    g.game.usedEmergencyMeeting = player.usedEmergencyMeeting
    autoLogin:onGameDescription()
end
return ____exports
 end,
["mod.src.commands.gameList"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local chat = require("mod.src.chat")
local autoLogin = require("mod.src.features.autoLogin")
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
function ____exports.commandGameList(self, data)
    if #data.gameList == 0 then
        chat:addLocal("No current games. (Create one with the \"/create\" command.)")
        autoLogin:onGameList()
        return
    end
    local joinedToGameID = nil
    chat:addLocal("Current games:")
    local i = 1
    for ____, started in ipairs({false, true}) do
        for ____, game in ipairs(data.gameList) do
            do
                if game.started ~= started then
                    goto __continue5
                end
                local startedText = (started and "ongoing") or "unstarted"
                local joinedText = (game.joined and " (current game)") or ""
                chat:addLocal(
                    (((((tostring(i) .. ") ") .. game.name) .. " (") .. startedText) .. ")") .. joinedText
                )
                i = i + 1
                if game.joined then
                    joinedToGameID = game.id
                end
            end
            ::__continue5::
        end
    end
    if (joinedToGameID ~= nil) and (g.game == nil) then
        sendTCP(nil, SocketCommandModToServer.RECONNECT, {gameID = joinedToGameID})
        return
    end
    autoLogin:onGameList()
end
return ____exports
 end,
["mod.src.commands.joined"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local getChatMessage
local chat = require("mod.src.chat")
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____AmongUsGame = require("mod.src.types.AmongUsGame")
local AmongUsGame = ____AmongUsGame.AmongUsGame
local ____util = require("mod.src.util")
local restart = ____util.restart
function getChatMessage(self, data)
    if data.reconnected then
        return "Reconnected to game: " .. data.name
    end
    if data.created then
        return "Created game: " .. data.name
    end
    return "Joined game: " .. data.name
end
function ____exports.commandJoined(self, data)
    g.game = __TS__New(AmongUsGame, data.gameID, data.name)
    local msg = getChatMessage(nil, data)
    chat:addLocal(msg)
    restart(nil)
end
return ____exports
 end,
["mod.src.commands.killed"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("mod.src.globals")
local g = ____globals.default
function ____exports.commandKilled(self, _data)
    if g.game == nil then
        return
    end
    print("TODO")
end
return ____exports
 end,
["mod.src.commands.left"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____util = require("mod.src.util")
local restart = ____util.restart
function ____exports.commandLeft(self, data)
    if (g.game == nil) or (g.game.id ~= data.gameID) then
        return
    end
    g.game = nil
    restart(nil)
end
return ____exports
 end,
["mod.src.commands.loggedIn"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local chat = require("mod.src.chat")
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
function ____exports.commandLoggedIn(self, data)
    g.loggedIn = true
    g.userID = data.userID
    g.username = data.username
    chat:addLocal("Successfully logged in.")
    sendTCP(nil, SocketCommandModToServer.GAME_LIST, {})
end
return ____exports
 end,
["mod.src.features.sendGameEvents"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local ____skeldRoomMap = require("mod.src.skeldRoomMap")
local skeldRoomMap = ____skeldRoomMap.skeldRoomMap
local ____stageAPI = require("mod.src.stageAPI")
local getStageAPIRoomName = ____stageAPI.getStageAPIRoomName
local ____SkeldRoom = require("mod.src.types.SkeldRoom")
local SkeldRoom = ____SkeldRoom.SkeldRoom
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
local sendEvents = true
function ____exports.postRoomLoad(self)
    if (((StageAPI == nil) or (g.game == nil)) or (not g.game.started)) or (not sendEvents) then
        return
    end
    local game = Game()
    local level = game:GetLevel()
    local roomName = getStageAPIRoomName(nil)
    local room = skeldRoomMap:get(roomName)
    if (room == nil) or (room == SkeldRoom.TASK) then
        return
    end
    sendTCP(nil, SocketCommandModToServer.ROOM, {gameID = g.game.id, room = room, enterDoor = level.EnterDoor})
end
function ____exports.enableSendingEvents(self, enable)
    sendEvents = enable
end
return ____exports
 end,
["mod.src.commands.reconnect"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____sendGameEvents = require("mod.src.features.sendGameEvents")
local enableSendingEvents = ____sendGameEvents.enableSendingEvents
local ____setupMeeting = require("mod.src.features.setupMeeting")
local setupMeeting = ____setupMeeting.setupMeeting
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____loadMap = require("mod.src.loadMap")
local loadMap = ____loadMap.loadMap
local ____skeldRoomMap = require("mod.src.skeldRoomMap")
local skeldRoomReverseMap = ____skeldRoomMap.skeldRoomReverseMap
local ____stageAPI = require("mod.src.stageAPI")
local fixRoomEntrancePosition = ____stageAPI.fixRoomEntrancePosition
local goToStageAPIRoom = ____stageAPI.goToStageAPIRoom
local ____AmongUsGame = require("mod.src.types.AmongUsGame")
local AmongUsGame = ____AmongUsGame.AmongUsGame
local ____Role = require("mod.src.types.Role")
local Role = ____Role.Role
local ____SkeldRoom = require("mod.src.types.SkeldRoom")
local SkeldRoom = ____SkeldRoom.SkeldRoom
function ____exports.commandReconnect(self, data)
    if g.userID == nil then
        return
    end
    local game = Game()
    local level = game:GetLevel()
    g.game = __TS__New(AmongUsGame, data.gameID, data.name)
    g.game.players = data.players
    g.game.started = true
    g.game.imposters = data.imposters
    g.game.ourTasks = data.tasks
    g.game.role = ((data.imposters == nil) and Role.CREW) or Role.IMPOSTER
    g.game.meeting = data.meeting
    local player = g.game:getPlayerFromUserID(g.userID)
    if player == nil then
        return
    end
    g.game.usedEmergencyMeeting = player.usedEmergencyMeeting
    enableSendingEvents(nil, false)
    loadMap(nil)
    if g.game.meeting ~= nil then
        setupMeeting(nil, false)
        enableSendingEvents(nil, true)
        return
    end
    if data.room == SkeldRoom.CAFETERIA then
        level.EnterDoor = data.enterDoor
        fixRoomEntrancePosition(nil)
    else
        local roomName = skeldRoomReverseMap[data.room]
        if roomName == nil then
            error(
                "Failed to get the room name for room: " .. tostring(data.room)
            )
        end
        goToStageAPIRoom(nil, roomName, data.enterDoor)
    end
    enableSendingEvents(nil, true)
end
return ____exports
 end,
["mod.src.commands.started"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local chat = require("mod.src.chat")
local cutscene = require("mod.src.features.cutscene")
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____Role = require("mod.src.types.Role")
local Role = ____Role.Role
function ____exports.commandStarted(self, data)
    if g.game == nil then
        return
    end
    g.game.started = true
    g.game.imposters = data.imposters
    g.game.role = ((data.imposters == nil) and Role.CREW) or Role.IMPOSTER
    g.game.ourTasks = data.tasks
    chat:addLocal("The game has started!")
    cutscene:startCutscene()
end
return ____exports
 end,
["mod.src.commands.startMeeting"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____startMeeting = require("mod.src.features.startMeeting")
local startMeeting = ____startMeeting.startMeeting
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____MeetingPhase = require("mod.src.types.MeetingPhase")
local MeetingPhase = ____MeetingPhase.MeetingPhase
local ____MeetingType = require("mod.src.types.MeetingType")
local MeetingType = ____MeetingType.MeetingType
function ____exports.commandStartMeeting(self, data)
    if g.game == nil then
        return
    end
    g.game.meeting = {meetingType = data.meetingType, userIDInitiated = data.userIDInitiated, userIDKilled = data.userIDKilled, playersKilledSinceLastMeeting = data.playersKilledSinceLastMeeting, meetingPhase = MeetingPhase.PRE_VOTING, timePhaseStarted = data.timePhaseStarted, phaseLengthSeconds = data.phaseLengthSeconds, votes = data.votes}
    if (data.meetingType == MeetingType.EMERGENCY) and (data.userIDInitiated == g.userID) then
        g.game.usedEmergencyMeeting = true
    end
    startMeeting(nil)
end
return ____exports
 end,
["mod.src.commands.startVoting"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____MeetingPhase = require("mod.src.types.MeetingPhase")
local MeetingPhase = ____MeetingPhase.MeetingPhase
function ____exports.commandStartVoting(self, data)
    if (g.game == nil) or (g.game.meeting == nil) then
        return
    end
    g.game.meeting.meetingPhase = MeetingPhase.VOTING
    g.game.meeting.timePhaseStarted = data.timePhaseStarted
    g.game.meeting.phaseLengthSeconds = data.phaseLengthSeconds
end
return ____exports
 end,
["mod.src.commands.terminated"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____util = require("mod.src.util")
local restart = ____util.restart
function ____exports.commandTerminated(self, _data)
    if g.game == nil then
        return
    end
    g.game = nil
    restart(nil)
end
return ____exports
 end,
["mod.src.commands.username"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local chat = require("mod.src.chat")
local ____globals = require("mod.src.globals")
local g = ____globals.default
function ____exports.commandUsername(self, data)
    g.username = data.username
    if data.exists then
        chat:addLocal(("The username of \"" .. data.username) .. "\" has already been registered.")
        chat:addLocal("To login as this user, enter the correct password with the \"/password\" command.")
    else
        chat:addLocal(("That username of \"" .. data.username) .. "\" is available.")
        chat:addLocal("Please register the account by providing a password with the \"/password\" command.")
    end
end
return ____exports
 end,
["mod.src.commands.vote"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("mod.src.globals")
local g = ____globals.default
function ____exports.commandVote(self, data)
    if (g.game == nil) or (g.game.meeting == nil) then
        return
    end
    g.game.meeting.votes = data.votes
end
return ____exports
 end,
["mod.src.commandMap"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____chat = require("mod.src.commands.chat")
local commandChat = ____chat.commandChat
local ____endGame = require("mod.src.commands.endGame")
local commandEndGame = ____endGame.commandEndGame
local ____endMeeting = require("mod.src.commands.endMeeting")
local commandEndMeeting = ____endMeeting.commandEndMeeting
local ____error = require("mod.src.commands.error")
local commandError = ____error.commandError
local ____gameDescription = require("mod.src.commands.gameDescription")
local commandGameDescription = ____gameDescription.commandGameDescription
local ____gameList = require("mod.src.commands.gameList")
local commandGameList = ____gameList.commandGameList
local ____joined = require("mod.src.commands.joined")
local commandJoined = ____joined.commandJoined
local ____killed = require("mod.src.commands.killed")
local commandKilled = ____killed.commandKilled
local ____left = require("mod.src.commands.left")
local commandLeft = ____left.commandLeft
local ____loggedIn = require("mod.src.commands.loggedIn")
local commandLoggedIn = ____loggedIn.commandLoggedIn
local ____reconnect = require("mod.src.commands.reconnect")
local commandReconnect = ____reconnect.commandReconnect
local ____started = require("mod.src.commands.started")
local commandStarted = ____started.commandStarted
local ____startMeeting = require("mod.src.commands.startMeeting")
local commandStartMeeting = ____startMeeting.commandStartMeeting
local ____startVoting = require("mod.src.commands.startVoting")
local commandStartVoting = ____startVoting.commandStartVoting
local ____terminated = require("mod.src.commands.terminated")
local commandTerminated = ____terminated.commandTerminated
local ____username = require("mod.src.commands.username")
local commandUsername = ____username.commandUsername
local ____vote = require("mod.src.commands.vote")
local commandVote = ____vote.commandVote
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandServerToMod = ____SocketCommands.SocketCommandServerToMod
____exports.commandMap = {[SocketCommandServerToMod.ERROR] = commandError, [SocketCommandServerToMod.USERNAME] = commandUsername, [SocketCommandServerToMod.LOGGED_IN] = commandLoggedIn, [SocketCommandServerToMod.GAME_LIST] = commandGameList, [SocketCommandServerToMod.JOINED] = commandJoined, [SocketCommandServerToMod.LEFT] = commandLeft, [SocketCommandServerToMod.GAME_DESCRIPTION] = commandGameDescription, [SocketCommandServerToMod.CHAT] = commandChat, [SocketCommandServerToMod.STARTED] = commandStarted, [SocketCommandServerToMod.RECONNECT] = commandReconnect, [SocketCommandServerToMod.KILLED] = commandKilled, [SocketCommandServerToMod.START_MEETING] = commandStartMeeting, [SocketCommandServerToMod.START_VOTING] = commandStartVoting, [SocketCommandServerToMod.VOTE] = commandVote, [SocketCommandServerToMod.END_MEETING] = commandEndMeeting, [SocketCommandServerToMod.END_GAME] = commandEndGame, [SocketCommandServerToMod.TERMINATED] = commandTerminated}
return ____exports
 end,
["mod.src.network.socket"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local readTCP, validateTCPData, readUDP, DEBUG
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
local ____commandMap = require("mod.src.commandMap")
local commandMap = ____commandMap.commandMap
local ____globals = require("mod.src.globals")
local g = ____globals.default
local players = require("mod.src.players")
local ____SocketCommands = require("mod.src.types.SocketCommands")
local SocketCommandModToServer = ____SocketCommands.SocketCommandModToServer
local SocketCommandServerToMod = ____SocketCommands.SocketCommandServerToMod
local ____pack = require("mod.src.network.pack")
local unpackTCPMsg = ____pack.unpackTCPMsg
local unpackUDPPlayerMessage = ____pack.unpackUDPPlayerMessage
local ____send = require("mod.src.network.send")
local sendTCP = ____send.sendTCP
local socketClient = require("mod.src.network.socketClient")
function readTCP(self)
    if not socketClient:isConnected() then
        return false
    end
    local rawData, errMsg = table.unpack(
        socketClient:receive(true)
    )
    if rawData == nil then
        if errMsg ~= "timeout" then
            log(nil, "Failed to read data: " .. errMsg)
            socketClient:disconnect()
        end
        return false
    end
    if DEBUG then
        log(nil, "Got socket data: " .. rawData)
    end
    local command, dataObject = table.unpack(
        unpackTCPMsg(nil, rawData)
    )
    if not validateTCPData(nil, command, dataObject) then
        return true
    end
    local commandFunction = commandMap[command]
    if commandFunction ~= nil then
        commandFunction(nil, dataObject)
    else
        log(nil, "Error: Received an unknown socket command: " .. command)
    end
    return true
end
function validateTCPData(self, command, dataObject)
    if type(dataObject) ~= "table" then
        return false
    end
    local data = dataObject
    local gameID = data.gameID
    if gameID == nil then
        return true
    end
    if (command == SocketCommandServerToMod.JOINED) or (command == SocketCommandServerToMod.RECONNECT) then
        return true
    end
    if g.game == nil then
        return false
    end
    return g.game.id == gameID
end
function readUDP(self)
    if not socketClient:isConnected() then
        return false
    end
    local rawData, errMsg = table.unpack(
        socketClient:receive(false)
    )
    if rawData == nil then
        if errMsg ~= "timeout" then
            log(nil, "Failed to read data: " .. errMsg)
            socketClient:disconnect()
        end
        return false
    end
    local playerMessage = unpackUDPPlayerMessage(nil, rawData)
    players:updatePlayerMap(playerMessage)
    return true
end
DEBUG = true
function ____exports.postRender(self)
    if not socketClient:isConnected() then
        return
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    if (isaacFrameCount % 60) == 0 then
        sendTCP(nil, SocketCommandModToServer.PING, {})
    end
    if not socketClient:isConnected() then
        return
    end
    while readTCP(nil) do
    end
    while readUDP(nil) do
    end
end
return ____exports
 end,
["mod.src.network.udp"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local sendBeacon, sendPosition, lastBeaconFrame
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getRoomIndex = ____isaacscript_2Dcommon.getRoomIndex
local ____constants = require("mod.src.constants")
local LOBBY_ROOM_INDEX = ____constants.LOBBY_ROOM_INDEX
local UDP_BEACON_DATA_FORMAT = ____constants.UDP_BEACON_DATA_FORMAT
local UDP_BEACON_FIELDS = ____constants.UDP_BEACON_FIELDS
local UDP_BEACON_INTERVAL = ____constants.UDP_BEACON_INTERVAL
local UDP_BEACON_MESSAGE = ____constants.UDP_BEACON_MESSAGE
local UDP_POSITION_DATA_FORMAT = ____constants.UDP_POSITION_DATA_FORMAT
local UDP_POSITION_FIELDS = ____constants.UDP_POSITION_FIELDS
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____send = require("mod.src.network.send")
local sendUDP = ____send.sendUDP
local struct = require("mod.src.network.struct")
function sendBeacon(self)
    if g.game == nil then
        return
    end
    local isaacFrameCount = Isaac.GetFrameCount()
    if (lastBeaconFrame ~= nil) and (isaacFrameCount < (lastBeaconFrame + UDP_BEACON_INTERVAL)) then
        return
    end
    lastBeaconFrame = isaacFrameCount
    local structObject = {gameID = g.game.id, userID = g.userID, message = UDP_BEACON_MESSAGE}
    local structData = {}
    for ____, field in ipairs(UDP_BEACON_FIELDS) do
        local key = field
        local fieldData = structObject[key]
        __TS__ArrayPush(structData, fieldData)
    end
    local packedData = struct:pack(UDP_BEACON_DATA_FORMAT, structData)
    sendUDP(nil, packedData)
end
function sendPosition(self)
    if ((g.game == nil) or (g.userID == nil)) or (g.username == nil) then
        return
    end
    local player = Isaac.GetPlayer()
    local sprite = player:GetSprite()
    local animation = sprite:GetAnimation()
    local animationFrame = sprite:GetFrame()
    local overlayAnimation = sprite:GetOverlayAnimation()
    if sprite:IsOverlayPlaying(overlayAnimation) then
        overlayAnimation = ""
    end
    local overlayAnimationFrame = sprite:GetOverlayFrame()
    local roomIndex = getRoomIndex(nil)
    if roomIndex == GridRooms.ROOM_DEBUG_IDX then
        roomIndex = LOBBY_ROOM_INDEX
    end
    local structObject = {gameID = g.game.id, userID = g.userID, x = player.Position.X, y = player.Position.Y, roomIndex = roomIndex, animation = animation, animationFrame = animationFrame, overlayAnimation = overlayAnimation, overlayAnimationFrame = overlayAnimationFrame}
    local structData = {}
    for ____, field in ipairs(UDP_POSITION_FIELDS) do
        local key = field
        local fieldData = structObject[key]
        __TS__ArrayPush(structData, fieldData)
    end
    local packedData = struct:pack(
        UDP_POSITION_DATA_FORMAT,
        {
            table.unpack(structData)
        }
    )
    sendUDP(nil, packedData)
end
lastBeaconFrame = nil
function ____exports.postRender(self)
    if g.game == nil then
        return
    end
    sendBeacon(nil)
    sendPosition(nil)
end
return ____exports
 end,
["mod.src.callbacks.postRender"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local blackSprite = require("mod.src.features.blackSprite")
local chatCallbacks = require("mod.src.features.chatCallbacks")
local connectedIcon = require("mod.src.features.connectedIcon")
local console = require("mod.src.features.console")
local cutscene = require("mod.src.features.cutscene")
local drawMeeting = require("mod.src.features.drawMeeting")
local drawOtherPlayers = require("mod.src.features.drawOtherPlayers")
local drawOurUsername = require("mod.src.features.drawOurUsername")
local drawRoomDescription = require("mod.src.features.drawRoomDescription")
local endMeeting = require("mod.src.features.endMeeting")
local errors = require("mod.src.features.errors")
local restartOnNextFrame = require("mod.src.features.restartOnNextFrame")
local startMeeting = require("mod.src.features.startMeeting")
local welcomeNotification = require("mod.src.features.welcomeNotification")
local socket = require("mod.src.network.socket")
local udp = require("mod.src.network.udp")
local fixWires = require("mod.src.tasks.fixWires")
local identifyItems = require("mod.src.tasks.identifyItems")
local identifyPickupsInOrder = require("mod.src.tasks.identifyPickupsInOrder")
local identifyTrinkets = require("mod.src.tasks.identifyTrinkets")
local makePentagram = require("mod.src.tasks.makePentagram")
function ____exports.main(self)
    if errors:postRender() then
        return
    end
    restartOnNextFrame:postRender()
    socket:postRender()
    welcomeNotification:postRender()
    udp:postRender()
    drawRoomDescription:postRender()
    drawOtherPlayers:postRender()
    drawOurUsername:postRender()
    console:postRender()
    connectedIcon:postRender()
    chatCallbacks:postRender()
    blackSprite:postRender()
    cutscene:postRender()
    startMeeting:postRender()
    drawMeeting:postRender()
    endMeeting:postRender()
    identifyItems:postRender()
    identifyTrinkets:postRender()
    makePentagram:postRender()
    fixWires:postRender()
    identifyPickupsInOrder:postRender()
end
return ____exports
 end,
["mod.src.features.disconnectHotkey"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hotkeyFunction
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local isKeyboardPressed = ____isaacscript_2Dcommon.isKeyboardPressed
local ____socketClient = require("mod.src.network.socketClient")
local disconnect = ____socketClient.disconnect
function hotkeyFunction(self)
    disconnect(nil)
end
local DISCONNECT_HOTKEY = Keyboard.KEY_F4
local hotkeyPressed = false
function ____exports.postUpdate(self)
    if isKeyboardPressed(nil, DISCONNECT_HOTKEY) then
        if not hotkeyPressed then
            hotkeyFunction(nil)
        end
        hotkeyPressed = true
    else
        hotkeyPressed = false
    end
end
return ____exports
 end,
["mod.src.features.doors"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.postUpdate(self)
end
return ____exports
 end,
["mod.src.callbacks.postUpdate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local debugFunction = require("mod.src.debugFunction")
local disconnectHotkey = require("mod.src.features.disconnectHotkey")
local doors = require("mod.src.features.doors")
local loadSlotMachines = require("mod.src.tasks.loadSlotMachines")
local pushTNTBarrel = require("mod.src.tasks.pushTNTBarrel")
function ____exports.main(self)
    debugFunction:postUpdate()
    disconnectHotkey:postUpdate()
    doors:postUpdate()
    pushTNTBarrel:postUpdate()
    loadSlotMachines:postUpdate()
end
return ____exports
 end,
["mod.src.callbacks.preGameExit"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
local disableMultiplayer = require("mod.src.features.disableMultiplayer")
function ____exports.main(self, shouldSave)
    log(
        nil,
        "MC_PRE_GAME_EXIT - shouldSave: " .. tostring(shouldSave)
    )
    disableMultiplayer:preGameExit(shouldSave)
end
return ____exports
 end,
["mod.src.callbacksCustom.postGridEntityUpdate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local rock, poop, teleporter
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local ModCallbacksCustom = ____isaacscript_2Dcommon.ModCallbacksCustom
local featureTeleporter = require("mod.src.features.teleporter")
local bombRocks = require("mod.src.tasks.bombRocks")
local destroyGiantPoop = require("mod.src.tasks.destroyGiantPoop")
function rock(self, gridEntity)
    bombRocks:postGridEntityUpdateRock(gridEntity)
end
function poop(self, gridEntity)
    destroyGiantPoop:postGridEntityUpdatePoop(gridEntity)
end
function teleporter(self, gridEntity)
    featureTeleporter:postGridEntityUpdateTeleporter(gridEntity)
end
function ____exports.init(self, mod)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE, rock, GridEntityType.GRID_ROCK)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE, poop, GridEntityType.GRID_POOP)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE, teleporter, GridEntityType.GRID_TELEPORTER)
end
return ____exports
 end,
["mod.src.callbacksCustom.postPlayerInitLate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local disableMultiplayer = require("mod.src.features.disableMultiplayer")
function ____exports.main(self, player)
    disableMultiplayer:postPlayerInitLate(player)
end
return ____exports
 end,
["mod.src.features.disableRoomTransitionAnimation"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____stageAPI = require("mod.src.stageAPI")
local getStageAPIDoors = ____stageAPI.getStageAPIDoors
function ____exports.postRoomLoad(self, firstLoad)
    if (StageAPI == nil) or (not firstLoad) then
        return
    end
    local doors = getStageAPIDoors(nil)
    for ____, door in ipairs(doors) do
        door.PersistentData.TransitionAnim = -1
    end
end
return ____exports
 end,
["mod.src.rooms.admin"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local spawnAdminTable, spawnAdminTop
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnVent = ____spawnObjects.spawnVent
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function spawnAdminTable(self)
    local gridIndexCenter = 67
    spawnEntity(nil, EntityTypeCustom.ADMIN_TABLE, 0, 0, gridIndexCenter)
end
function spawnAdminTop(self)
    local topCenterGridIndex = 22
    spawnEntity(nil, EntityTypeCustom.ADMIN_TOP, 0, 0, topCenterGridIndex)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 19, 26)
        end
    )
end
function ____exports.spawnAdminObjects(self)
    local bottomLeftGridIndex = 106
    spawnAdminTable(nil)
    spawnVent(nil, bottomLeftGridIndex)
    spawnAdminTop(nil)
end
return ____exports
 end,
["mod.src.rooms.communication"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local spawnGridEntity = ____isaacscript_2Dcommon.spawnGridEntity
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnCommunicationObjects(self)
    local topLeftGridIndex = 16
    spawnEntity(nil, EntityTypeCustom.COMPUTER, 0, 0, topLeftGridIndex)
    local topRightGridIndex = 26
    spawnEntity(nil, EntityTypeCustom.RADIO, 0, 0, topRightGridIndex)
    local bottomLeftGridIndex = 106
    spawnGridEntity(nil, GridEntityType.GRID_STATUE, bottomLeftGridIndex)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 16, 35, -20)
            addCollision(nil, 26, 28)
        end
    )
end
return ____exports
 end,
["mod.src.rooms.electrical"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnVent = ____spawnObjects.spawnVent
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnElectricalObjects(self)
    local nextToTopLeftGridIndex = 17
    spawnEntity(nil, EntityTypeCustom.ELECTRICAL, 0, 0, nextToTopLeftGridIndex)
    local topLeftGridIndex = 16
    spawnVent(nil, topLeftGridIndex)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 17, 43)
        end
    )
end
return ____exports
 end,
["mod.src.rooms.lowerEngine"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnEngine = ____spawnObjects.spawnEngine
function ____exports.spawnLowerEngineObjects(self)
    local bottomRightGridIndex = 257
    spawnEngine(nil, bottomRightGridIndex)
end
return ____exports
 end,
["mod.src.rooms.medbay"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnMedbayObjects(self)
    for ____, gridIndex in ipairs({42, 72, 102}) do
        spawnEntity(nil, EntityTypeCustom.BED, 0, 0, gridIndex)
    end
    for ____, gridIndex in ipairs({32, 62, 92}) do
        local bed = spawnEntity(nil, EntityTypeCustom.BED, 0, 0, gridIndex)
        local sprite = bed:GetSprite()
        sprite.FlipX = true
    end
    runNextFrame(
        nil,
        function()
            addCollision(nil, 16, 108)
            addCollision(nil, 26, 118)
        end
    )
end
return ____exports
 end,
["mod.src.rooms.navigation"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnVent = ____spawnObjects.spawnVent
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnNavigationObjects(self)
    local rightGridIndex = 73
    spawnEntity(nil, EntityTypeCustom.SHIP_CONTROLS, 0, 0, rightGridIndex)
    local gridIndexTopLeft = 16
    spawnVent(nil, gridIndexTopLeft)
    local gridIndexBottomLeft = 106
    spawnVent(nil, gridIndexBottomLeft)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 27, 118)
        end
    )
end
return ____exports
 end,
["mod.src.rooms.o2"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnO2Objects(self)
    for ____, gridIndex in ipairs({17, 20, 23, 26}) do
        spawnEntity(nil, EntityTypeCustom.TANK, 0, 0, gridIndex)
    end
    runNextFrame(
        nil,
        function()
            addCollision(nil, 16, 57)
        end
    )
end
return ____exports
 end,
["mod.src.rooms.reactor"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnBlockLine = ____spawnObjects.spawnBlockLine
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnReactorObjects(self)
    local centerGridIndex = 52
    spawnEntity(nil, EntityTypeCustom.REACTOR, 0, 0, centerGridIndex, 0)
    spawnBlockLine(nil, 51, 3, Direction.RIGHT, false)
    spawnBlockLine(nil, 66, 3, Direction.RIGHT, false)
end
return ____exports
 end,
["mod.src.rooms.security"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnSecurityObjects(self)
    local rightWallGridIndex = 73
    spawnEntity(nil, EntityTypeCustom.SECURITY_TABLE, 0, 0, rightWallGridIndex)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 57, 88)
            addCollision(nil, 103)
        end
    )
end
return ____exports
 end,
["mod.src.rooms.shields"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local runNextFrame = ____isaacscript_2Dcommon.runNextFrame
local ____collisionObjects = require("mod.src.collisionObjects")
local addCollision = ____collisionObjects.addCollision
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnFakeBlockLine = ____spawnObjects.spawnFakeBlockLine
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnShieldsObjects(self)
    spawnFakeBlockLine(nil, 196, 13, Direction.RIGHT)
    spawnFakeBlockLine(nil, 211, 13, Direction.RIGHT)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 196, 223)
        end
    )
    spawnFakeBlockLine(nil, 151, 5, Direction.RIGHT)
    spawnFakeBlockLine(nil, 136, 5, Direction.RIGHT)
    spawnFakeBlockLine(nil, 121, 3, Direction.RIGHT)
    spawnFakeBlockLine(nil, 106, 2, Direction.RIGHT)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 121, 153)
            addCollision(nil, 139, 154)
            addCollision(nil, 155, 155, -20)
        end
    )
    spawnFakeBlockLine(nil, 187, 7, Direction.RIGHT)
    spawnFakeBlockLine(nil, 173, 6, Direction.RIGHT)
    spawnFakeBlockLine(nil, 159, 5, Direction.RIGHT)
    spawnFakeBlockLine(nil, 144, 5, Direction.RIGHT)
    spawnFakeBlockLine(nil, 129, 5, Direction.RIGHT)
    spawnFakeBlockLine(nil, 115, 4, Direction.RIGHT)
    spawnFakeBlockLine(nil, 100, 4, Direction.RIGHT)
    spawnFakeBlockLine(nil, 100, 4, Direction.RIGHT)
    spawnFakeBlockLine(nil, 84, 4, Direction.RIGHT)
    spawnFakeBlockLine(nil, 69, 4, Direction.RIGHT)
    spawnFakeBlockLine(nil, 54, 4, Direction.RIGHT)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 188, 193)
            addCollision(nil, 174, 178)
            addCollision(nil, 129, 163)
            addCollision(nil, 100, 148)
            addCollision(nil, 54, 87)
        end
    )
    spawnFakeBlockLine(nil, 61, 4, Direction.RIGHT)
    spawnFakeBlockLine(nil, 46, 5, Direction.RIGHT)
    spawnFakeBlockLine(nil, 31, 5, Direction.RIGHT)
    spawnFakeBlockLine(nil, 16, 13, Direction.RIGHT)
    runNextFrame(
        nil,
        function()
            addCollision(nil, 16, 63)
            addCollision(nil, 19, 49)
            addCollision(nil, 20, 28)
        end
    )
    local gridIndex = 111
    spawnEntity(nil, EntityTypeCustom.SHIELDS, 0, 0, gridIndex, -500)
end
return ____exports
 end,
["mod.src.rooms.storage"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnBlockLine = ____spawnObjects.spawnBlockLine
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnStorageObjects(self)
    local centerGridIndex = 127
    spawnEntity(nil, EntityTypeCustom.STORAGE, 0, 0, centerGridIndex, 0)
    spawnBlockLine(nil, 68, 4, Direction.RIGHT, false)
    spawnBlockLine(nil, 80, 7, Direction.RIGHT, false)
    spawnBlockLine(nil, 95, 7, Direction.RIGHT, false)
    spawnBlockLine(nil, 108, 9, Direction.RIGHT, false)
    spawnBlockLine(nil, 123, 9, Direction.RIGHT, false)
    spawnBlockLine(nil, 140, 7, Direction.RIGHT, false)
    spawnBlockLine(nil, 156, 6, Direction.RIGHT, false)
    spawnBlockLine(nil, 171, 5, Direction.RIGHT, false)
    spawnBlockLine(nil, 187, 3, Direction.RIGHT, false)
end
return ____exports
 end,
["mod.src.rooms.upperEngine"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnEngine = ____spawnObjects.spawnEngine
function ____exports.spawnUpperEngineObjects(self)
    local topLeftGridIndex = 117
    spawnEngine(nil, topLeftGridIndex)
end
return ____exports
 end,
["mod.src.rooms.weapons"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____spawnObjects = require("mod.src.spawnObjects")
local spawnBlockLine = ____spawnObjects.spawnBlockLine
local ____util = require("mod.src.util")
local spawnEntity = ____util.spawnEntity
function ____exports.spawnWeaponsObjects(self)
    local topRightCenterGridIndex = 132
    spawnEntity(nil, EntityTypeCustom.WEAPONS, topRightCenterGridIndex, 0, topRightCenterGridIndex)
    spawnBlockLine(nil, 103, 3, Direction.RIGHT)
    spawnBlockLine(nil, 131, 4, Direction.RIGHT)
    spawnBlockLine(nil, 159, 4, Direction.RIGHT)
end
return ____exports
 end,
["mod.src.features.roomObjects"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local emptyRoom, functionMap
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local getEnumValues = ____isaacscript_2Dcommon.getEnumValues
local getGridEntities = ____isaacscript_2Dcommon.getGridEntities
local removeEntities = ____isaacscript_2Dcommon.removeEntities
local ____enums = require("mod.src.enums")
local EntityTypeCustom = ____enums.EntityTypeCustom
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____admin = require("mod.src.rooms.admin")
local spawnAdminObjects = ____admin.spawnAdminObjects
local ____cafeteria = require("mod.src.rooms.cafeteria")
local spawnCafeteriaObjects = ____cafeteria.spawnCafeteriaObjects
local ____communication = require("mod.src.rooms.communication")
local spawnCommunicationObjects = ____communication.spawnCommunicationObjects
local ____electrical = require("mod.src.rooms.electrical")
local spawnElectricalObjects = ____electrical.spawnElectricalObjects
local ____lowerEngine = require("mod.src.rooms.lowerEngine")
local spawnLowerEngineObjects = ____lowerEngine.spawnLowerEngineObjects
local ____medbay = require("mod.src.rooms.medbay")
local spawnMedbayObjects = ____medbay.spawnMedbayObjects
local ____navigation = require("mod.src.rooms.navigation")
local spawnNavigationObjects = ____navigation.spawnNavigationObjects
local ____o2 = require("mod.src.rooms.o2")
local spawnO2Objects = ____o2.spawnO2Objects
local ____reactor = require("mod.src.rooms.reactor")
local spawnReactorObjects = ____reactor.spawnReactorObjects
local ____security = require("mod.src.rooms.security")
local spawnSecurityObjects = ____security.spawnSecurityObjects
local ____shields = require("mod.src.rooms.shields")
local spawnShieldsObjects = ____shields.spawnShieldsObjects
local ____storage = require("mod.src.rooms.storage")
local spawnStorageObjects = ____storage.spawnStorageObjects
local ____upperEngine = require("mod.src.rooms.upperEngine")
local spawnUpperEngineObjects = ____upperEngine.spawnUpperEngineObjects
local ____weapons = require("mod.src.rooms.weapons")
local spawnWeaponsObjects = ____weapons.spawnWeaponsObjects
local ____stageAPI = require("mod.src.stageAPI")
local getSkeldRoom = ____stageAPI.getSkeldRoom
local ____SkeldRoom = require("mod.src.types.SkeldRoom")
local SkeldRoom = ____SkeldRoom.SkeldRoom
local ____util = require("mod.src.util")
local removeGridEntity = ____util.removeGridEntity
local ____buttonSpawn = require("mod.src.features.buttonSpawn")
local spawnGoToTaskButtons = ____buttonSpawn.spawnGoToTaskButtons
function emptyRoom(self)
    for ____, entityType in ipairs(
        getEnumValues(nil, EntityTypeCustom)
    ) do
        local entities = Isaac.FindByType(entityType)
        removeEntities(nil, entities)
    end
    for ____, gridEntity in ipairs(
        getGridEntities(nil, GridEntityType.GRID_DECORATION, GridEntityType.GRID_ROCKB)
    ) do
        removeGridEntity(nil, gridEntity)
    end
end
function ____exports.postRoomLoad(self)
    if (g.game == nil) or (not g.game.started) then
        return
    end
    local skeldRoom = getSkeldRoom(nil)
    if skeldRoom == nil then
        return
    end
    emptyRoom(nil)
    spawnGoToTaskButtons(nil)
    local setupFunction = functionMap:get(skeldRoom)
    if setupFunction ~= nil then
        setupFunction(nil)
    end
end
functionMap = __TS__New(Map)
functionMap:set(SkeldRoom.CAFETERIA, spawnCafeteriaObjects)
functionMap:set(SkeldRoom.ADMIN, spawnAdminObjects)
functionMap:set(SkeldRoom.STORAGE, spawnStorageObjects)
functionMap:set(SkeldRoom.MEDBAY, spawnMedbayObjects)
functionMap:set(SkeldRoom.UPPER_ENGINE, spawnUpperEngineObjects)
functionMap:set(SkeldRoom.REACTOR, spawnReactorObjects)
functionMap:set(SkeldRoom.SECURITY, spawnSecurityObjects)
functionMap:set(SkeldRoom.LOWER_ENGINE, spawnLowerEngineObjects)
functionMap:set(SkeldRoom.ELECTRICAL, spawnElectricalObjects)
functionMap:set(SkeldRoom.WEAPONS, spawnWeaponsObjects)
functionMap:set(SkeldRoom.O2, spawnO2Objects)
functionMap:set(SkeldRoom.NAVIGATION, spawnNavigationObjects)
functionMap:set(SkeldRoom.SHIELDS, spawnShieldsObjects)
functionMap:set(SkeldRoom.COMMUNICATION, spawnCommunicationObjects)
return ____exports
 end,
["mod.src.callbacksCustom.postRoomLoad"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
local disableRoomTransitionAnimation = require("mod.src.features.disableRoomTransitionAnimation")
local roomObjects = require("mod.src.features.roomObjects")
local stageAPI = require("mod.src.stageAPI")
function ____exports.main(_currentRoom, firstLoad)
    log(
        nil,
        "POST_ROOM_LOAD - firstLoad: " .. tostring(firstLoad)
    )
    disableRoomTransitionAnimation:postRoomLoad(firstLoad)
    roomObjects:postRoomLoad()
    stageAPI:loadBackdrops()
end
return ____exports
 end,
["mod.src.callbacksCustom.postStageAPINewRoom"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local fixOffsetBug, warpToCafeteriaAndBack, NORMAL_TOP_LEFT_POS, warping
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
local sendGameEvents = require("mod.src.features.sendGameEvents")
local task = require("mod.src.features.task")
local ____globals = require("mod.src.globals")
local g = ____globals.default
local ____loadMap = require("mod.src.loadMap")
local setTasksOnMap = ____loadMap.setTasksOnMap
local ____stageAPI = require("mod.src.stageAPI")
local getStageAPIRoomName = ____stageAPI.getStageAPIRoomName
local goToStageAPIRoom = ____stageAPI.goToStageAPIRoom
function fixOffsetBug(self)
    local game = Game()
    local room = game:GetRoom()
    local topLeftPos = room:GetTopLeftPos()
    if (topLeftPos.X ~= NORMAL_TOP_LEFT_POS.X) or (topLeftPos.Y ~= NORMAL_TOP_LEFT_POS.Y) then
        log(nil, "Bugged room detected; attempting a warp fix.")
        warpToCafeteriaAndBack(nil)
    end
end
function warpToCafeteriaAndBack(self)
    if (StageAPI == nil) or (g.game == nil) then
        return
    end
    local game = Game()
    local level = game:GetLevel()
    local roomName = getStageAPIRoomName(nil)
    warping = true
    local enterDoor = level.EnterDoor
    goToStageAPIRoom(nil, "Cafeteria")
    level.EnterDoor = enterDoor
    goToStageAPIRoom(nil, roomName, enterDoor)
    warping = false
end
NORMAL_TOP_LEFT_POS = Vector(60, 140)
warping = false
function ____exports.main()
    log(nil, "POST_STAGE_API_NEW_ROOM")
    if warping then
        log(nil, "Warping; returning early.")
        return
    end
    sendGameEvents:postRoomLoad()
    setTasksOnMap(nil)
    fixOffsetBug(nil)
    task:postStageAPINewRoom()
end
return ____exports
 end,
["mod.src.initFeatures"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local console = require("mod.src.features.console")
local disableMultiplayer = require("mod.src.features.disableMultiplayer")
local errors = require("mod.src.features.errors")
local socketClient = require("mod.src.network.socketClient")
function ____exports.initFeatures(self)
    errors:init()
    disableMultiplayer:init()
    socketClient:init()
    console:init()
end
return ____exports
 end,
["mod.src.print"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local customPrint, getPrintMsg
function customPrint(...)
    local args = {...}
    local msg = getPrintMsg(nil, args)
    Isaac.DebugString(msg)
    local msgWithNewline = msg .. "\n"
    Isaac.ConsoleOutput(msgWithNewline)
end
function getPrintMsg(self, args)
    if args == nil then
        return tostring(nil)
    end
    local msg = ""
    for ____, arg in ipairs(args) do
        if msg ~= "" then
            msg = msg .. " "
        end
        local valueToPrint
        local metatable = getmetatable(arg)
        local isVector = (metatable ~= nil) and (metatable.__type == "Vector")
        if isVector then
            local vector = arg
            valueToPrint = ((("Vector(" .. tostring(vector.X)) .. ", ") .. tostring(vector.Y)) .. ")"
        else
            valueToPrint = tostring(arg)
        end
        msg = msg .. valueToPrint
    end
    return msg
end
function ____exports.fixPrintFunction(self)
    print = customPrint
end
return ____exports
 end,
["mod.src.main"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local initLibraries, initCallbacks, initCallbacksCustom, initCallbacksStageAPI, initExtra
local ____isaacscript_2Dcommon = require("mod.node_modules.isaacscript-common.dist.index")
local log = ____isaacscript_2Dcommon.log
local ModCallbacksCustom = ____isaacscript_2Dcommon.ModCallbacksCustom
local upgradeMod = ____isaacscript_2Dcommon.upgradeMod
local entityTakeDmg = require("mod.src.callbacks.entityTakeDmg")
local evaluateCache = require("mod.src.callbacks.evaluateCache")
local executeCmd = require("mod.src.callbacks.executeCmd")
local inputAction = require("mod.src.callbacks.inputAction")
local postCurseEval = require("mod.src.callbacks.postCurseEval")
local postEffectUpdate = require("mod.src.callbacks.postEffectUpdate")
local postEntityKill = require("mod.src.callbacks.postEntityKill")
local postGameStarted = require("mod.src.callbacks.postGameStarted")
local postNewRoom = require("mod.src.callbacks.postNewRoom")
local postNPCRender = require("mod.src.callbacks.postNPCRender")
local postPlayerInit = require("mod.src.callbacks.postPlayerInit")
local postRender = require("mod.src.callbacks.postRender")
local postUpdate = require("mod.src.callbacks.postUpdate")
local preGameExit = require("mod.src.callbacks.preGameExit")
local postGridEntityUpdate = require("mod.src.callbacksCustom.postGridEntityUpdate")
local postPlayerInitLate = require("mod.src.callbacksCustom.postPlayerInitLate")
local postRoomLoad = require("mod.src.callbacksCustom.postRoomLoad")
local postStageAPINewRoom = require("mod.src.callbacksCustom.postStageAPINewRoom")
local ____constants = require("mod.src.constants")
local MOD_NAME = ____constants.MOD_NAME
local VERSION = ____constants.VERSION
local ____initFeatures = require("mod.src.initFeatures")
local initFeatures = ____initFeatures.initFeatures
local collisionObjects = require("mod.src.lib.collisionObjects")
local ____print = require("mod.src.print")
local fixPrintFunction = ____print.fixPrintFunction
function initLibraries(self, mod)
    collisionObjects:init(mod)
end
function initCallbacks(self, mod)
    mod:AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate.main)
    mod:AddCallback(ModCallbacks.MC_POST_RENDER, postRender.main)
    mod:AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit.main)
    mod:AddCallback(ModCallbacks.MC_POST_CURSE_EVAL, postCurseEval.main)
    mod:AddCallback(ModCallbacks.MC_INPUT_ACTION, inputAction.main)
    mod:AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, preGameExit.main)
    mod:AddCallback(ModCallbacks.MC_EXECUTE_CMD, executeCmd.main)
    mod:AddCallback(ModCallbacks.MC_POST_ENTITY_KILL, postEntityKill.main)
end
function initCallbacksCustom(self, mod)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED, postNewRoom.main)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED, postGameStarted.main)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE, postPlayerInitLate.main)
end
function initCallbacksStageAPI(self)
    if StageAPI == nil then
        return
    end
    StageAPI.UnregisterCallbacks(MOD_NAME)
    local callbackPriority = 1
    StageAPI.AddCallback(MOD_NAME, "POST_STAGEAPI_NEW_ROOM", callbackPriority, postStageAPINewRoom.main)
    StageAPI.AddCallback(MOD_NAME, "POST_ROOM_LOAD", callbackPriority, postRoomLoad.main)
end
function initExtra(self, mod)
    entityTakeDmg:init(mod)
    evaluateCache:init(mod)
    postNPCRender:init(mod)
    postEffectUpdate:init(mod)
    postGridEntityUpdate:init(mod)
end
function ____exports.default(self)
    fixPrintFunction(nil)
    local modVanilla = RegisterMod("isaacAmongUsMod", 1)
    local mod = upgradeMod(nil, modVanilla)
    initLibraries(nil, mod)
    initFeatures(nil)
    initCallbacks(nil, mod)
    initCallbacksCustom(nil, mod)
    initCallbacksStageAPI(nil)
    initExtra(nil, mod)
    log(nil, ((MOD_NAME .. " ") .. VERSION) .. " initialized.")
end
return ____exports
 end,
["mod.src.bundleEntry"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____main = require("mod.src.main")
local main = ____main.default
main(nil)
return ____exports
 end,
["mod.src.tasks.breakAsteroids"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.breakAsteroids(self)
end
return ____exports
 end,
["mod.src.types.TaskDescription"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.index"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
do
    local ____reorderedCallbacks = require("mod.node_modules.isaacscript-common.dist.callbacks.reorderedCallbacks")
    local forceNewLevelCallback = ____reorderedCallbacks.forceNewLevelCallback
    local forceNewRoomCallback = ____reorderedCallbacks.forceNewRoomCallback
    ____exports.forceNewLevelCallback = forceNewLevelCallback
    ____exports.forceNewRoomCallback = forceNewRoomCallback
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.constants")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____disableInputs = require("mod.node_modules.isaacscript-common.dist.features.disableInputs")
    local disableAllInputs = ____disableInputs.disableAllInputs
    local disableAllInputsExceptFor = ____disableInputs.disableAllInputsExceptFor
    local disableMovementInputs = ____disableInputs.disableMovementInputs
    local disableShootingInputs = ____disableInputs.disableShootingInputs
    local enableAllInputs = ____disableInputs.enableAllInputs
    local enableAllInputsExceptFor = ____disableInputs.enableAllInputsExceptFor
    ____exports.disableAllInputs = disableAllInputs
    ____exports.disableAllInputsExceptFor = disableAllInputsExceptFor
    ____exports.disableMovementInputs = disableMovementInputs
    ____exports.disableShootingInputs = disableShootingInputs
    ____exports.enableAllInputs = enableAllInputs
    ____exports.enableAllInputsExceptFor = enableAllInputsExceptFor
end
do
    local ____forgottenSwitch = require("mod.node_modules.isaacscript-common.dist.features.forgottenSwitch")
    local forgottenSwitch = ____forgottenSwitch.forgottenSwitch
    ____exports.forgottenSwitch = forgottenSwitch
end
do
    local ____runInNFrames = require("mod.node_modules.isaacscript-common.dist.features.runInNFrames")
    local runInNFrames = ____runInNFrames.runInNFrames
    local runNextFrame = ____runInNFrames.runNextFrame
    ____exports.runInNFrames = runInNFrames
    ____exports.runNextFrame = runNextFrame
end
do
    local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
    local saveDataManager = ____main.saveDataManager
    local saveDataManagerSave = ____main.saveDataManagerSave
    local saveDataManagerSetGlobal = ____main.saveDataManagerSetGlobal
    ____exports.saveDataManager = saveDataManager
    ____exports.saveDataManagerSave = saveDataManagerSave
    ____exports.saveDataManagerSetGlobal = saveDataManagerSetGlobal
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.array")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.bitwise")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.collectibles")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____deepCopy = require("mod.node_modules.isaacscript-common.dist.functions.deepCopy")
    local deepCopy = ____deepCopy.deepCopy
    ____exports.deepCopy = deepCopy
end
do
    local ____deepCopyTests = require("mod.node_modules.isaacscript-common.dist.functions.deepCopyTests")
    local deepCopyTests = ____deepCopyTests.deepCopyTests
    ____exports.deepCopyTests = deepCopyTests
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.doors")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.entity")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.flag")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.gridEntity")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.input")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.items")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.json")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.log")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.math")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.pickups")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.player")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.random")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.revive")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.rooms")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.sprite")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.stage")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.tears")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.transformations")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.trinkets")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.ui")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.util")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.functions.vector")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____export = require("mod.node_modules.isaacscript-common.dist.transformationMap")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
do
    local ____HealthType = require("mod.node_modules.isaacscript-common.dist.types.HealthType")
    local HealthType = ____HealthType.default
    ____exports.HealthType = HealthType
end
do
    local ____ModCallbacksCustom = require("mod.node_modules.isaacscript-common.dist.types.ModCallbacksCustom")
    local ModCallbacksCustom = ____ModCallbacksCustom.default
    ____exports.ModCallbacksCustom = ModCallbacksCustom
end
do
    local ____ModUpgraded = require("mod.node_modules.isaacscript-common.dist.types.ModUpgraded")
    local ModUpgraded = ____ModUpgraded.default
    ____exports.ModUpgraded = ModUpgraded
end
do
    local ____PocketItemType = require("mod.node_modules.isaacscript-common.dist.types.PocketItemType")
    local PocketItemType = ____PocketItemType.default
    ____exports.PocketItemType = PocketItemType
end
do
    local ____upgradeMod = require("mod.node_modules.isaacscript-common.dist.upgradeMod")
    local upgradeMod = ____upgradeMod.upgradeMod
    ____exports.upgradeMod = upgradeMod
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.reorderedCallbacks"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hasSubscriptions, useItemGlowingHourGlass, postGameStartedVanilla, postNewLevelVanilla, postNewRoomVanilla, recordCurrentStage, currentStage, currentStageType, usedGlowingHourGlass, forceNewLevel, forceNewRoom
local postGameStartedReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGameStartedReordered")
local postNewLevelReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postNewLevelReordered")
local postNewRoomReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postNewRoomReordered")
function hasSubscriptions(self)
    return (postGameStartedReordered:hasSubscriptions() or postNewLevelReordered:hasSubscriptions()) or postNewRoomReordered:hasSubscriptions()
end
function useItemGlowingHourGlass(self)
    usedGlowingHourGlass = true
end
function postGameStartedVanilla(self, isContinued)
    if not hasSubscriptions(nil) then
        return
    end
    postGameStartedReordered:fire(isContinued)
    recordCurrentStage(nil)
    postNewLevelReordered:fire()
    postNewRoomReordered:fire()
end
function postNewLevelVanilla(self)
    if not hasSubscriptions(nil) then
        return
    end
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    if (gameFrameCount == 0) and (not forceNewLevel) then
        return
    end
    forceNewLevel = false
    recordCurrentStage(nil)
    postNewLevelReordered:fire()
    postNewRoomReordered:fire()
end
function postNewRoomVanilla(self)
    if not hasSubscriptions(nil) then
        return
    end
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    local level = game:GetLevel()
    local stage = level:GetStage()
    local stageType = level:GetStageType()
    if usedGlowingHourGlass then
        usedGlowingHourGlass = false
        if (currentStage ~= stage) or (currentStageType ~= stageType) then
            recordCurrentStage(nil)
            postNewLevelReordered:fire()
            postNewRoomReordered:fire()
            return
        end
    end
    if (((gameFrameCount == 0) or (currentStage ~= stage)) or (currentStageType ~= stageType)) and (not forceNewRoom) then
        return
    end
    forceNewRoom = false
    postNewRoomReordered:fire()
end
function recordCurrentStage(self)
    local game = Game()
    local level = game:GetLevel()
    local stage = level:GetStage()
    local stageType = level:GetStageType()
    currentStage = stage
    currentStageType = stageType
end
currentStage = nil
currentStageType = nil
usedGlowingHourGlass = false
forceNewLevel = false
forceNewRoom = false
function ____exports.init(self, mod)
    mod:AddCallback(ModCallbacks.MC_USE_ITEM, useItemGlowingHourGlass, CollectibleType.COLLECTIBLE_GLOWING_HOUR_GLASS)
    mod:AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStartedVanilla)
    mod:AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevelVanilla)
    mod:AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoomVanilla)
end
function ____exports.forceNewLevelCallback(self)
    forceNewLevel = true
end
function ____exports.forceNewRoomCallback(self)
    forceNewRoom = true
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGameStartedReordered"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self, isContinued)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil, isContinued)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postNewLevelReordered"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postNewRoomReordered"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.constants"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
____exports.CHARACTERS_WITH_NO_RED_HEARTS = __TS__New(Set, {PlayerType.PLAYER_XXX, PlayerType.PLAYER_BLACKJUDAS, PlayerType.PLAYER_JUDAS_B, PlayerType.PLAYER_XXX_B, PlayerType.PLAYER_THEFORGOTTEN_B, PlayerType.PLAYER_BETHANY_B})
____exports.DISTANCE_OF_GRID_TILE = 40
____exports.DOOR_HITBOX_DISTANCE = 11
____exports.FIRST_GLITCHED_COLLECTIBLE_TYPE = (1 << 32) - 1
____exports.GENESIS_ROOM_VARIANT = 1000
____exports.GOLDEN_TRINKET_SHIFT = 1 << 15
____exports.GRID_ENTITY_XML_MAP = __TS__New(Map, {{1000, {GridEntityType.GRID_ROCK, 0}}, {1001, {GridEntityType.GRID_ROCK_BOMB, 0}}, {1002, {GridEntityType.GRID_ROCK_ALT, 0}}, {1003, {GridEntityType.GRID_ROCKT, 0}}, {1008, {GridEntityType.GRID_ROCK_ALT2, 0}}, {1009, {GridEntityType.GRID_ROCK_ALT2, 1}}, {1010, {GridEntityType.GRID_ROCK_SPIKED, 0}}, {1011, {GridEntityType.GRID_ROCK_GOLD, 0}}, {1300, {GridEntityType.GRID_TNT, 0}}, {1490, {GridEntityType.GRID_POOP, 1}}, {1494, {GridEntityType.GRID_POOP, 4}}, {1495, {GridEntityType.GRID_POOP, 2}}, {1496, {GridEntityType.GRID_POOP, 3}}, {1497, {GridEntityType.GRID_POOP, 5}}, {1498, {GridEntityType.GRID_POOP, 6}}, {1500, {GridEntityType.GRID_POOP, 0}}, {1501, {GridEntityType.GRID_POOP, 11}}, {1900, {GridEntityType.GRID_ROCKB, 0}}, {1901, {GridEntityType.GRID_PILLAR, 0}}, {1930, {GridEntityType.GRID_SPIKES, 0}}, {1931, {GridEntityType.GRID_SPIKES_ONOFF, 0}}, {1940, {GridEntityType.GRID_SPIDERWEB, 0}}, {1999, {GridEntityType.GRID_WALL, 0}}, {3000, {GridEntityType.GRID_PIT, 0}}, {3001, {GridEntityType.GRID_PIT, 16}}, {3009, {GridEntityType.GRID_PIT, 0}}, {4000, {GridEntityType.GRID_LOCK, 0}}, {4500, {GridEntityType.GRID_PRESSURE_PLATE, 0}}, {5000, {GridEntityType.GRID_STATUE, 0}}, {5001, {GridEntityType.GRID_STATUE, 1}}, {6100, {GridEntityType.GRID_TELEPORTER, 0}}, {9000, {GridEntityType.GRID_TRAPDOOR, 0}}, {9100, {GridEntityType.GRID_STAIRS, 0}}, {10000, {GridEntityType.GRID_GRAVITY, 0}}})
____exports.GRID_INDEX_CENTER_OF_1X1_ROOM = 67
____exports.GAME_FRAMES_PER_SECOND = 30
____exports.ISAAC_FRAMES_PER_SECOND = 60
____exports.MAX_NUM_DOORS = 8
____exports.MAX_NUM_INPUTS = 4
____exports.MAX_PLAYER_POCKET_ITEM_SLOTS = 4
____exports.MAX_PLAYER_SPEED_IN_UNITS = 9.8
____exports.MAX_PLAYER_TRINKET_SLOTS = 2
____exports.MAX_ROOM_INDEX = 168
____exports.MAX_VANILLA_COLLECTIBLE_TYPE = CollectibleType.COLLECTIBLE_DECAP_ATTACK
____exports.ONE_BY_ONE_ROOM_GRID_SIZE = 135
____exports.SINGLE_USE_ACTIVE_COLLECTIBLE_TYPES = __TS__New(Set, {CollectibleType.COLLECTIBLE_FORGET_ME_NOW, CollectibleType.COLLECTIBLE_EDENS_SOUL, CollectibleType.COLLECTIBLE_ALABASTER_BOX, CollectibleType.COLLECTIBLE_PLAN_C, CollectibleType.COLLECTIBLE_MAMA_MEGA, CollectibleType.COLLECTIBLE_SACRIFICIAL_ALTAR, CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE, CollectibleType.COLLECTIBLE_R_KEY})
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.features.disableInputs"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local isActionPressed, isActionTriggered, getActionValue, getReturnValue, v
local ____errors = require("mod.node_modules.isaacscript-common.dist.errors")
local getUpgradeErrorMsg = ____errors.getUpgradeErrorMsg
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
function isActionPressed(self, _entity, _inputHook, buttonAction)
    return getReturnValue(nil, buttonAction, true)
end
function isActionTriggered(self, _entity, _inputHook, buttonAction)
    return getReturnValue(nil, buttonAction, true)
end
function getActionValue(self, _entity, _inputHook, buttonAction)
    return getReturnValue(nil, buttonAction, false)
end
function getReturnValue(self, buttonAction, booleanCallback)
    local disableValue = ((booleanCallback and (function() return false end)) or (function() return 0 end))()
    if not v.run.enableSomeInputs then
        return disableValue
    end
    if (v.run.whitelist ~= nil) and (not v.run.whitelist:has(buttonAction)) then
        return disableValue
    end
    if (v.run.blacklist ~= nil) and v.run.blacklist:has(buttonAction) then
        return disableValue
    end
    return nil
end
local FEATURE_NAME = "input disabler"
local MOVEMENT_BUTTONS = __TS__New(Set, {ButtonAction.ACTION_LEFT, ButtonAction.ACTION_RIGHT, ButtonAction.ACTION_UP, ButtonAction.ACTION_DOWN})
local SHOOTING_BUTTONS = __TS__New(Set, {ButtonAction.ACTION_SHOOTLEFT, ButtonAction.ACTION_SHOOTRIGHT, ButtonAction.ACTION_SHOOTUP, ButtonAction.ACTION_SHOOTDOWN})
local initialized = false
v = {run = {enableSomeInputs = true, whitelist = nil, blacklist = nil}}
function ____exports.init(self, mod)
    initialized = true
    saveDataManager(nil, "disableInputs", v)
    mod:AddCallback(ModCallbacks.MC_INPUT_ACTION, isActionPressed, InputHook.IS_ACTION_PRESSED)
    mod:AddCallback(ModCallbacks.MC_INPUT_ACTION, isActionTriggered, InputHook.IS_ACTION_TRIGGERED)
    mod:AddCallback(ModCallbacks.MC_INPUT_ACTION, getActionValue, InputHook.GET_ACTION_VALUE)
end
function ____exports.enableAllInputs(self)
    if not initialized then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    v.run.enableSomeInputs = true
    v.run.whitelist = nil
    v.run.blacklist = nil
end
function ____exports.disableAllInputs(self)
    if not initialized then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    v.run.enableSomeInputs = false
    v.run.whitelist = nil
    v.run.blacklist = nil
end
function ____exports.enableAllInputsExceptFor(self, blacklist)
    if not initialized then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    v.run.enableSomeInputs = true
    v.run.whitelist = nil
    v.run.blacklist = blacklist
end
function ____exports.disableAllInputsExceptFor(self, whitelist)
    if not initialized then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    v.run.enableSomeInputs = true
    v.run.whitelist = whitelist
    v.run.blacklist = nil
end
function ____exports.disableMovementInputs(self)
    ____exports.enableAllInputsExceptFor(nil, MOVEMENT_BUTTONS)
end
function ____exports.disableShootingInputs(self)
    ____exports.enableAllInputsExceptFor(nil, SHOOTING_BUTTONS)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.errors"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.getUpgradeErrorMsg(self, featureName)
    return ("The " .. featureName) .. " is not initialized. You must first upgrade your mod object by calling the \"upgradeMod()\" function."
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.features.saveDataManager.main"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local postPlayerInit, preGameExit, postNewLevel, postNewRoom, restoreDefaultsAll, restoreDefaults, clearAndCopyAllElements, FEATURE_NAME, mod, loadedDataOnThisRun, saveDataMap, saveDataDefaultsMap, saveDataConditionalFuncMap
local ____errors = require("mod.node_modules.isaacscript-common.dist.errors")
local getUpgradeErrorMsg = ____errors.getUpgradeErrorMsg
local ____deepCopy = require("mod.node_modules.isaacscript-common.dist.functions.deepCopy")
local deepCopy = ____deepCopy.deepCopy
local SerializationType = ____deepCopy.SerializationType
local ____util = require("mod.node_modules.isaacscript-common.dist.functions.util")
local tableClear = ____util.tableClear
local ____SaveData = require("mod.node_modules.isaacscript-common.dist.types.SaveData")
local SaveDataKeys = ____SaveData.SaveDataKeys
local ____load = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.load")
local loadFromDisk = ____load.loadFromDisk
local ____save = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.save")
local saveToDisk = ____save.saveToDisk
function postPlayerInit(self)
    if mod == nil then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    if loadedDataOnThisRun then
        return
    end
    loadedDataOnThisRun = true
    loadFromDisk(nil, mod, saveDataMap)
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    local isContinued = gameFrameCount ~= 0
    if not isContinued then
        restoreDefaultsAll(nil)
    end
end
function preGameExit(self)
    if mod == nil then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    saveToDisk(nil, mod, saveDataMap, saveDataConditionalFuncMap)
    restoreDefaultsAll(nil)
    loadedDataOnThisRun = false
end
function postNewLevel(self)
    restoreDefaults(nil, SaveDataKeys.Level)
end
function postNewRoom(self)
    restoreDefaults(nil, SaveDataKeys.Room)
end
function restoreDefaultsAll(self)
    restoreDefaults(nil, SaveDataKeys.Run)
    restoreDefaults(nil, SaveDataKeys.Level)
    restoreDefaults(nil, SaveDataKeys.Room)
end
function restoreDefaults(self, childTableName)
    if ((childTableName ~= SaveDataKeys.Run) and (childTableName ~= SaveDataKeys.Level)) and (childTableName ~= SaveDataKeys.Room) then
        error("Unknown child table name of: " .. childTableName)
    end
    for subscriberName, saveData in pairs(saveDataMap) do
        do
            local childTable = saveData[childTableName]
            if childTable == nil then
                goto __continue14
            end
            local saveDataDefaults = saveDataDefaultsMap[subscriberName]
            if saveDataDefaults == nil then
                error("Failed to find the default copy of the save data for subscriber: " .. subscriberName)
            end
            local childTableDefaults = saveDataDefaults[childTableName]
            if childTableDefaults == nil then
                error((("Failed to find the default copy of the child table \"" .. childTableName) .. "\" for subscriber: ") .. subscriberName)
            end
            local childTableDefaultsTable = childTableDefaults
            local childTableDefaultsTableCopy = deepCopy(nil, childTableDefaultsTable, SerializationType.NONE, (subscriberName .. " --> ") .. childTableName)
            clearAndCopyAllElements(nil, childTable, childTableDefaultsTableCopy)
        end
        ::__continue14::
    end
end
function clearAndCopyAllElements(self, oldTable, newTable)
    tableClear(nil, oldTable)
    for key, value in pairs(newTable) do
        oldTable[key] = value
    end
end
FEATURE_NAME = "save data manager"
mod = nil
loadedDataOnThisRun = false
saveDataMap = {}
saveDataDefaultsMap = {}
saveDataConditionalFuncMap = __TS__New(Map)
function ____exports.init(self, incomingMod)
    mod = incomingMod
    mod:AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit)
    mod:AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, preGameExit)
    mod:AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevel)
    mod:AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom)
end
function ____exports.saveDataManager(self, key, saveData, conditionalFunc)
    if mod == nil then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    local keyType = type(key)
    if keyType ~= "string" then
        error("The save data manager requires that keys are strings. You tried to use a key of type: " .. keyType)
    end
    if saveDataMap[key] ~= nil then
        error("The save data manager is already managing save data for a key of: " .. key)
    end
    saveDataMap[key] = saveData
    local saveDataTable = saveData
    local saveDataTableCopy = deepCopy(nil, saveDataTable, SerializationType.NONE, key)
    local saveDataCopy = saveDataTableCopy
    saveDataDefaultsMap[key] = saveDataCopy
    if conditionalFunc ~= nil then
        saveDataConditionalFuncMap:set(key, conditionalFunc)
    end
end
function ____exports.saveDataManagerSave(self)
    if mod == nil then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    saveToDisk(nil, mod, saveDataMap, saveDataConditionalFuncMap)
end
function ____exports.saveDataManagerSetGlobal(self)
    g = saveDataMap
    gd = saveDataDefaultsMap
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.deepCopy"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local isTSTLClass, cloneClass, getNewClassFromMetatable, deepCopyValue, copyVector, checkMetatable, validateValue, TSTL_CLASS_KEYS
local ____constantsInternal = require("mod.node_modules.isaacscript-common.dist.constantsInternal")
local TSTL_CLASS_BRAND = ____constantsInternal.TSTL_CLASS_BRAND
local TSTL_MAP_BRAND = ____constantsInternal.TSTL_MAP_BRAND
local TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND = ____constantsInternal.TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND
local TSTL_SET_BRAND = ____constantsInternal.TSTL_SET_BRAND
local VECTOR_BRAND = ____constantsInternal.VECTOR_BRAND
local ____debug = require("mod.node_modules.isaacscript-common.dist.debug")
local DEBUG = ____debug.DEBUG
local ____log = require("mod.node_modules.isaacscript-common.dist.functions.log")
local log = ____log.log
local ____vector = require("mod.node_modules.isaacscript-common.dist.functions.vector")
local isVector = ____vector.isVector
function ____exports.deepCopy(self, oldObject, serializationType, traversalDescription)
    if serializationType == nil then
        serializationType = ____exports.SerializationType.NONE
    end
    if traversalDescription == nil then
        traversalDescription = ""
    end
    local oldObjectType = type(oldObject)
    if oldObjectType ~= "table" then
        error(("The deepCopy function was given a " .. oldObjectType) .. " instead of a table.")
    end
    if DEBUG then
        local logString = "deepCopy is operating on: " .. traversalDescription
        if serializationType == ____exports.SerializationType.SERIALIZE then
            logString = logString .. " (serializing)"
        elseif serializationType == ____exports.SerializationType.DESERIALIZE then
            logString = logString .. " (deserializing)"
        end
        log(nil, logString)
    end
    local oldTable = oldObject
    local isClass = isTSTLClass(nil, oldTable)
    local hasTSTLMapBrand = false
    local hasTSTLSetBrand = false
    local hasTSTLClassBrand = false
    if ((not __TS__InstanceOf(oldObject, Map)) and (not __TS__InstanceOf(oldObject, Set))) and (not isClass) then
        checkMetatable(nil, oldTable, traversalDescription)
        hasTSTLMapBrand = oldTable[TSTL_MAP_BRAND] ~= nil
        hasTSTLSetBrand = oldTable[TSTL_SET_BRAND] ~= nil
        hasTSTLClassBrand = oldTable[TSTL_CLASS_BRAND] ~= nil
    end
    local newObject
    if ((serializationType == ____exports.SerializationType.NONE) and __TS__InstanceOf(oldObject, Map)) or ((serializationType == ____exports.SerializationType.DESERIALIZE) and hasTSTLMapBrand) then
        newObject = __TS__New(Map)
    elseif ((serializationType == ____exports.SerializationType.NONE) and __TS__InstanceOf(oldObject, Set)) or ((serializationType == ____exports.SerializationType.DESERIALIZE) and hasTSTLSetBrand) then
        newObject = __TS__New(Set)
    elseif ((serializationType == ____exports.SerializationType.NONE) and isClass) or ((serializationType == ____exports.SerializationType.DESERIALIZE) and hasTSTLClassBrand) then
        newObject = cloneClass(nil, oldObject)
    else
        newObject = {}
    end
    if serializationType == ____exports.SerializationType.SERIALIZE then
        local newTable = newObject
        if __TS__InstanceOf(oldObject, Map) then
            newTable[TSTL_MAP_BRAND] = ""
        elseif __TS__InstanceOf(oldObject, Set) then
            newTable[TSTL_SET_BRAND] = ""
        elseif isClass then
            newTable[TSTL_CLASS_BRAND] = ""
        end
    end
    if __TS__InstanceOf(oldObject, Map) then
        for ____, ____value in __TS__Iterator(
            oldObject:entries()
        ) do
            local key
            key = ____value[1]
            local value
            value = ____value[2]
            do
                if ____exports.isBrand(nil, key) then
                    goto __continue17
                end
                deepCopyValue(nil, oldObject, newObject, key, value, traversalDescription, serializationType)
            end
            ::__continue17::
        end
    elseif __TS__InstanceOf(oldObject, Set) then
        for ____, key in __TS__Iterator(
            oldObject:values()
        ) do
            do
                if ____exports.isBrand(nil, key) then
                    goto __continue20
                end
                local value = ""
                deepCopyValue(nil, oldObject, newObject, key, value, traversalDescription, serializationType)
            end
            ::__continue20::
        end
    else
        for key, value in pairs(oldObject) do
            do
                if ____exports.isBrand(nil, key) then
                    goto __continue23
                end
                deepCopyValue(nil, oldObject, newObject, key, value, traversalDescription, serializationType)
            end
            ::__continue23::
        end
    end
    return newObject
end
function isTSTLClass(self, object)
    local metatable = getmetatable(object)
    if metatable == nil then
        return false
    end
    if __TS__InstanceOf(object, Map) or __TS__InstanceOf(object, Set) then
        return false
    end
    local numKeys = 0
    for key in pairs(metatable) do
        numKeys = numKeys + 1
        if not TSTL_CLASS_KEYS:has(key) then
            return false
        end
    end
    return numKeys == TSTL_CLASS_KEYS.size
end
function cloneClass(self, oldClass)
    local metatable = getmetatable(oldClass)
    local newClass = getNewClassFromMetatable(nil, metatable)
    for key, value in pairs(oldClass) do
        newClass[key] = value
    end
    return newClass
end
function getNewClassFromMetatable(self, metatable)
    local instance = setmetatable({}, metatable.constructor.prototype)
    local newClass = instance
    newClass:____constructor()
    return newClass
end
function ____exports.isBrand(self, key)
    return ((((key == TSTL_MAP_BRAND) or (key == TSTL_SET_BRAND)) or (key == TSTL_CLASS_BRAND)) or (key == TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND)) or (key == VECTOR_BRAND)
end
function deepCopyValue(self, oldObject, newObject, key, value, traversalDescription, serializationType)
    local valueType = type(value)
    validateValue(nil, value, valueType, traversalDescription)
    local convertNumberKeysToString = false
    local isTSTLObject = __TS__InstanceOf(oldObject, Map) or __TS__InstanceOf(oldObject, Set)
    local keyType = type(key)
    if ((serializationType == ____exports.SerializationType.SERIALIZE) and isTSTLObject) and (keyType == "number") then
        convertNumberKeysToString = true
        local newTable = newObject
        newTable[TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND] = ""
        if DEBUG then
            log(nil, "deepCopy is converting a TSTL map with number keys to strings.")
        end
    end
    local newValue
    if isVector(nil, value) then
        local vector = value
        newValue = copyVector(nil, vector, serializationType)
    elseif ____exports.isSerializedVector(nil, value) and (serializationType == ____exports.SerializationType.DESERIALIZE) then
        local serializedVector = value
        newValue = ____exports.deserializeVector(nil, serializedVector)
    elseif valueType == "table" then
        local ____table = value
        traversalDescription = ____exports.addTraversalDescription(nil, key, traversalDescription)
        newValue = ____exports.deepCopy(nil, ____table, serializationType, traversalDescription)
    else
        newValue = value
    end
    if __TS__InstanceOf(newObject, Map) then
        newObject:set(key, newValue)
    elseif __TS__InstanceOf(newObject, Set) then
        newObject:add(key)
    else
        local keyToUse = (convertNumberKeysToString and tostring(key)) or key
        newObject[keyToUse] = newValue
    end
end
function copyVector(self, vector, serializationType)
    if serializationType == ____exports.SerializationType.SERIALIZE then
        local vectorTable = {}
        vectorTable.X = vector.X
        vectorTable.Y = vector.Y
        vectorTable[VECTOR_BRAND] = ""
        return vectorTable
    end
    local newVector = Vector(vector.X, vector.Y)
    return newVector
end
function ____exports.deserializeVector(self, vectorTable)
    local xString = vectorTable.X
    local x = tonumber(xString)
    if x == nil then
        error("Failed to read the X value of a serialized vector.")
    end
    local yString = vectorTable.Y
    local y = tonumber(yString)
    if y == nil then
        error("Failed to read the Y value of a serialized vector.")
    end
    return Vector(x, y)
end
function checkMetatable(self, ____table, traversalDescription)
    local metatable = getmetatable(____table)
    if metatable == nil then
        return
    end
    local tableDescription = ((traversalDescription == "") and "the table to copy") or (("\"" .. traversalDescription) .. "\"")
    error(("The deepCopy function detected that " .. tableDescription) .. " has a metatable. Copying tables with metatables is not supported (unless they are TypeScriptToLua Maps, Sets, or Classes).")
end
function validateValue(self, value, valueType, traversalDescription)
    if isVector(nil, value) then
        return
    end
    if (((valueType == "function") or (valueType == "nil")) or (valueType == "thread")) or (valueType == "userdata") then
        error(((("The deepCopy function detected that \"" .. traversalDescription) .. "\" is type ") .. valueType) .. ", which is not supported.")
    end
end
function ____exports.addTraversalDescription(self, key, traversalDescription)
    if traversalDescription ~= "" then
        traversalDescription = traversalDescription .. " --> "
    end
    traversalDescription = traversalDescription .. tostring(key)
    return traversalDescription
end
function ____exports.isSerializedVector(self, object)
    local objectType = type(object)
    if objectType ~= "table" then
        return false
    end
    local ____table = object
    return ((____table[VECTOR_BRAND] ~= nil) and (____table.X ~= nil)) and (____table.Y ~= nil)
end
____exports.SerializationType = SerializationType or ({})
____exports.SerializationType.NONE = 0
____exports.SerializationType[____exports.SerializationType.NONE] = "NONE"
____exports.SerializationType.SERIALIZE = 1
____exports.SerializationType[____exports.SerializationType.SERIALIZE] = "SERIALIZE"
____exports.SerializationType.DESERIALIZE = 2
____exports.SerializationType[____exports.SerializationType.DESERIALIZE] = "DESERIALIZE"
TSTL_CLASS_KEYS = __TS__New(Set, {"____constructor", "__index", "constructor"})
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.constantsInternal"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.TSTL_MAP_BRAND = "__TSTL_MAP"
____exports.TSTL_SET_BRAND = "__TSTL_SET"
____exports.TSTL_CLASS_BRAND = "__TSTL_CLASS"
____exports.TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND = "__TSTL_OBJECT_WITH_NUMBER_KEYS"
____exports.VECTOR_BRAND = "__VECTOR"
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.debug"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.DEBUG = false
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.log"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____array = require("mod.node_modules.isaacscript-common.dist.functions.array")
local arrayToString = ____array.arrayToString
local ____flag = require("mod.node_modules.isaacscript-common.dist.functions.flag")
local hasFlag = ____flag.hasFlag
function ____exports.getDebugPrependString(self, msg, numParentFunctions)
    if numParentFunctions == nil then
        numParentFunctions = 3
    end
    if debug ~= nil then
        local debugTable = debug.getinfo(numParentFunctions)
        if debugTable ~= nil then
            return (((tostring(debugTable.name) .. ":") .. tostring(debugTable.linedefined)) .. " - ") .. msg
        end
    end
    if getParentFunctionDescription ~= nil then
        return (getParentFunctionDescription(numParentFunctions + 1) .. " - ") .. msg
    end
    return msg
end
function ____exports.log(self, msg)
    local debugMsg = ____exports.getDebugPrependString(nil, msg)
    Isaac.DebugString(debugMsg)
end
function ____exports.logAllFlags(self, flags, flagEnum, description)
    if description == nil then
        description = ""
    end
    if description ~= "" then
        description = description .. " "
    end
    ____exports.log(nil, ("Logging all " .. description) .. "flags:")
    for key, value in pairs(flagEnum) do
        if hasFlag(nil, flags, value) then
            ____exports.log(
                nil,
                "- Has flag: " .. tostring(key)
            )
        end
    end
end
function ____exports.logAllDamageFlags(self, flags)
    ____exports.logAllFlags(nil, flags, DamageFlag, "damage")
end
function ____exports.logAllEntityFlags(self, flags)
    ____exports.logAllFlags(nil, flags, EntityFlag, "entity")
end
function ____exports.logAllGameStateFlags(self)
    local game = Game()
    ____exports.log(nil, "Logging all game state flags:")
    for ____, ____value in ipairs(
        __TS__ObjectEntries(GameStateFlag)
    ) do
        local key
        key = ____value[1]
        local value
        value = ____value[2]
        local gameStateFlag = value
        local flagValue = game:GetStateFlag(gameStateFlag)
        if flagValue then
            ____exports.log(nil, "- Has flag: " .. key)
        end
    end
end
function ____exports.logAllProjectileFlags(self, flags)
    ____exports.logAllFlags(nil, flags, ProjectileFlags, "projectile")
end
function ____exports.logAllUseFlags(self, flags)
    ____exports.logAllFlags(nil, flags, UseFlag, "use")
end
function ____exports.logArray(self, array)
    local arrayString = arrayToString(nil, array)
    ____exports.log(nil, "Array: " .. arrayString)
end
function ____exports.logColor(self, color)
    ____exports.log(
        nil,
        (((((((((((("Color: R" .. tostring(color.R)) .. ", G") .. tostring(color.G)) .. ", B") .. tostring(color.B)) .. ", A") .. tostring(color.A)) .. ", RO") .. tostring(color.RO)) .. ", BO") .. tostring(color.BO)) .. ", GO") .. tostring(color.GO)
    )
end
function ____exports.logEntity(self, entity)
    ____exports.log(
        nil,
        (((("Entity: " .. tostring(entity.Type)) .. ".") .. tostring(entity.Variant)) .. ".") .. tostring(entity.SubType)
    )
end
function ____exports.logKColor(self, kColor)
    ____exports.log(
        nil,
        (((((("Color: R" .. tostring(kColor.Red)) .. ", G") .. tostring(kColor.Green)) .. ", B") .. tostring(kColor.Blue)) .. ", A") .. tostring(kColor.Alpha)
    )
end
function ____exports.logMap(self, map)
    ____exports.log(nil, "Printing out a TSTL Map:")
    for ____, ____value in __TS__Iterator(
        map:entries()
    ) do
        local key
        key = ____value[1]
        local value
        value = ____value[2]
        ____exports.log(
            nil,
            (("  Key: " .. tostring(key)) .. ", Value: ") .. tostring(value)
        )
    end
    ____exports.log(
        nil,
        "The size of the map was: " .. tostring(map.size)
    )
end
function ____exports.logTable(self, ____table)
    ____exports.log(nil, "Printing out a Lua table:")
    for key, value in pairs(____table) do
        ____exports.log(
            nil,
            (("  Key: " .. tostring(key)) .. ", Value: ") .. tostring(value)
        )
    end
end
function ____exports.logSet(self, set)
    ____exports.log(nil, "Printing out a TSTL Set:")
    for ____, value in __TS__Iterator(
        set:values()
    ) do
        ____exports.log(
            nil,
            "  Value: " .. tostring(value)
        )
    end
    ____exports.log(
        nil,
        "The size of the set was: " .. tostring(set.size)
    )
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.array"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____random = require("mod.node_modules.isaacscript-common.dist.functions.random")
local getRandomInt = ____random.getRandomInt
function ____exports.getRandomArrayIndex(self, array, seed)
    if seed == nil then
        seed = Random()
    end
    if #array == 0 then
        error("Failed to get a random array index since the provided array is empty.")
    end
    local randomIndex = getRandomInt(nil, 0, #array - 1, seed)
    return randomIndex
end
function ____exports.arrayEmpty(self, array)
    __TS__ArraySplice(array, 0, #array)
end
function ____exports.arrayEquals(self, array1, array2)
    if #array1 ~= #array2 then
        return false
    end
    do
        local i = 0
        while i < #array1 do
            if array1[i + 1] ~= array2[i + 1] then
                return false
            end
            i = i + 1
        end
    end
    return true
end
function ____exports.arrayInArray(self, arrayToMatch, parentArray)
    for ____, element in ipairs(parentArray) do
        if ____exports.arrayEquals(nil, element, arrayToMatch) then
            return true
        end
    end
    return false
end
function ____exports.arrayInit(self, defaultValue, size)
    local array = {}
    do
        local i = 0
        while i < size do
            __TS__ArrayPush(array, defaultValue)
            i = i + 1
        end
    end
    return array
end
function ____exports.arrayShuffle(self, originalArray, seed)
    if seed == nil then
        seed = Random()
    end
    local array = {
        table.unpack(originalArray)
    }
    local currentIndex = #array
    local randomIndex
    while currentIndex ~= 0 do
        randomIndex = ____exports.getRandomArrayIndex(nil, array, seed)
        currentIndex = currentIndex - 1
        array[currentIndex + 1], array[randomIndex + 1] = array[randomIndex + 1], array[currentIndex + 1]
    end
    return array
end
function ____exports.arraySum(self, array)
    local sum = 0
    for ____, element in ipairs(array) do
        sum = sum + element
    end
    return sum
end
function ____exports.arrayToString(self, array)
    local strings = {}
    for ____, value in ipairs(array) do
        __TS__ArrayPush(
            strings,
            tostring(value)
        )
    end
    return ("[" .. table.concat(strings, ", " or ",")) .. "]"
end
function ____exports.arrayRemove(self, originalArray, element)
    local array = {
        table.unpack(originalArray)
    }
    local index = __TS__ArrayIndexOf(array, element)
    __TS__ArraySplice(array, index, 1)
    return array
end
function ____exports.arrayRemoveInPlace(self, array, element)
    local index = __TS__ArrayIndexOf(array, element)
    if index == -1 then
        return false
    end
    __TS__ArraySplice(array, index, 1)
    return true
end
function ____exports.getRandomArrayElement(self, array, seed)
    if seed == nil then
        seed = Random()
    end
    local randomIndex = ____exports.getRandomArrayIndex(nil, array, seed)
    return array[randomIndex + 1]
end
function ____exports.isArray(self, ____table)
    local metatable = getmetatable(____table)
    if metatable ~= nil then
        return false
    end
    local numEntries = 0
    for key in pairs(____table) do
        numEntries = numEntries + 1
        local keyType = type(key)
        if keyType ~= "number" then
            return false
        end
    end
    do
        local i = 1
        while i <= numEntries do
            local element = ____table[i]
            if element == nil then
                return false
            end
            i = i + 1
        end
    end
    return true
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.random"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local RECOMMENDED_SHIFT_IDX
function ____exports.initRNG(self, seed)
    if seed == nil then
        seed = Random()
    end
    if seed == 0 then
        error("You cannot initialize an RNG object with a seed of 0, or the game will crash.")
    end
    local rng = RNG()
    rng:SetSeed(seed, RECOMMENDED_SHIFT_IDX)
    return rng
end
RECOMMENDED_SHIFT_IDX = 35
function ____exports.getRandom(self, seed)
    local rng = ____exports.initRNG(nil, seed)
    return rng:RandomFloat()
end
function ____exports.getRandomFloat(self, min, max, seed)
    if seed == nil then
        seed = Random()
    end
    return min + (____exports.getRandom(nil, seed) * (max - min))
end
function ____exports.getRandomInt(self, min, max, seed)
    if seed == nil then
        seed = Random()
    end
    local rng = ____exports.initRNG(nil, seed)
    return rng:RandomInt((max - min) + 1) + min
end
function ____exports.nextSeed(self, seed)
    local rng = ____exports.initRNG(nil, seed)
    rng:Next()
    return rng:GetSeed()
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.flag"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.addFlag(self, flags, ...)
    local flag = {...}
    for ____, f in ipairs(flag) do
        flags = flags | f
    end
    return flags
end
function ____exports.hasFlag(self, flags, ...)
    local flag = {...}
    for ____, f in ipairs(flag) do
        if not ((flags & f) == f) then
            return false
        end
    end
    return true
end
function ____exports.removeFlag(self, flags, ...)
    local flag = {...}
    for ____, f in ipairs(flag) do
        flags = flags & ~f
    end
    return flags
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.vector"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____util = require("mod.node_modules.isaacscript-common.dist.functions.util")
local ensureAllCases = ____util.ensureAllCases
function ____exports.directionToVector(self, direction)
    repeat
        local ____switch3 = direction
        local ____cond3 = ____switch3 == Direction.DOWN
        if ____cond3 then
            do
                return Vector(0, 1)
            end
        end
        ____cond3 = ____cond3 or (____switch3 == Direction.LEFT)
        if ____cond3 then
            do
                return Vector(-1, 0)
            end
        end
        ____cond3 = ____cond3 or (____switch3 == Direction.RIGHT)
        if ____cond3 then
            do
                return Vector(1, 0)
            end
        end
        ____cond3 = ____cond3 or (____switch3 == Direction.UP)
        if ____cond3 then
            do
                return Vector(0, -1)
            end
        end
        ____cond3 = ____cond3 or (____switch3 == Direction.NO_DIRECTION)
        if ____cond3 then
            do
                return Vector.Zero
            end
        end
        do
            do
                ensureAllCases(nil, direction)
                return Vector.Zero
            end
        end
    until true
end
function ____exports.isVector(self, object)
    local objectType = type(object)
    if objectType ~= "userdata" then
        return false
    end
    local metatable = getmetatable(object)
    if metatable == nil then
        return false
    end
    local vectorMetatable = metatable
    return vectorMetatable.__type == "Vector"
end
function ____exports.vectorToDirection(self, vector)
    local degrees = vector:GetAngleDegrees()
    if (degrees > -45) and (degrees < 45) then
        return Direction.RIGHT
    end
    if (degrees >= 45) and (degrees <= 135) then
        return Direction.DOWN
    end
    if (degrees <= -45) and (degrees >= -135) then
        return Direction.UP
    end
    if (degrees > 135) or (degrees < -135) then
        return Direction.LEFT
    end
    return Direction.NO_DIRECTION
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.util"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local HEX_STRING_LENGTH = 6
function ____exports.copySet(self, oldSet)
    local newSet = __TS__New(Set)
    for ____, value in __TS__Iterator(
        oldSet:values()
    ) do
        newSet:add(value)
    end
    return newSet
end
____exports.ensureAllCases = function(____, obj) return obj end
function ____exports.getEnumValues(self, transpiledEnum)
    local enumValues = {}
    for key, value in pairs(transpiledEnum) do
        if type(key) == "string" then
            __TS__ArrayPush(enumValues, value)
        end
    end
    __TS__ArraySort(enumValues)
    return enumValues
end
function ____exports.hexToKColor(self, hexString, alpha)
    hexString = __TS__StringReplace(hexString, "#", "")
    if #hexString ~= HEX_STRING_LENGTH then
        error(
            ("Hex strings must be of length " .. tostring(HEX_STRING_LENGTH)) .. "."
        )
    end
    local rString = __TS__StringSubstr(hexString, 0, 2)
    local R = tonumber("0x" .. rString)
    if R == nil then
        error(("Failed to convert `0x" .. rString) .. "` to a number.")
    end
    local gString = __TS__StringSubstr(hexString, 2, 2)
    local G = tonumber("0x" .. gString)
    if G == nil then
        error(("Failed to convert `0x" .. gString) .. "` to a number.")
    end
    local bString = __TS__StringSubstr(hexString, 4, 2)
    local B = tonumber("0x" .. bString)
    if B == nil then
        error(("Failed to convert `0x" .. bString) .. "` to a number.")
    end
    local base = 255
    return KColor(R / base, G / base, B / base, alpha)
end
function ____exports.isGreedMode(self)
    local game = Game()
    return (game.Difficulty == Difficulty.DIFFICULTY_GREED) or (game.Difficulty == Difficulty.DIFFICULTY_GREEDIER)
end
function ____exports.onSetSeed(self)
    local game = Game()
    local seeds = game:GetSeeds()
    local customRun = seeds:IsCustomRun()
    local challenge = Isaac.GetChallenge()
    return (challenge == Challenge.CHALLENGE_NULL) and customRun
end
function ____exports.tableClear(self, ____table)
    for key in pairs(____table) do
        ____table[key] = nil
    end
end
function ____exports.teleport(self, roomIndex, direction, roomTransitionAnim)
    if direction == nil then
        direction = Direction.NO_DIRECTION
    end
    if roomTransitionAnim == nil then
        roomTransitionAnim = RoomTransitionAnim.TELEPORT
    end
    local game = Game()
    local level = game:GetLevel()
    level.LeaveDoor = -1
    game:StartRoomTransition(roomIndex, direction, roomTransitionAnim)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.types.SaveData"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.SaveDataKeys = SaveDataKeys or ({})
____exports.SaveDataKeys.Persistent = "persistent"
____exports.SaveDataKeys.Run = "run"
____exports.SaveDataKeys.Level = "level"
____exports.SaveDataKeys.Room = "room"
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.features.saveDataManager.load"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local readSaveDatFile, tryLoadModData, DEFAULT_MOD_DATA
local ____debug = require("mod.node_modules.isaacscript-common.dist.debug")
local DEBUG = ____debug.DEBUG
local ____json = require("mod.node_modules.isaacscript-common.dist.functions.json")
local jsonDecode = ____json.jsonDecode
local ____log = require("mod.node_modules.isaacscript-common.dist.functions.log")
local log = ____log.log
local ____merge = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.merge")
local merge = ____merge.merge
function readSaveDatFile(self, mod)
    local isaacFrameCount = Isaac.GetFrameCount()
    local ok, jsonStringOrErrMsg = pcall(tryLoadModData, mod)
    if not ok then
        log(
            nil,
            (("Failed to read from the \"save#.dat\" file on Isaac frame " .. tostring(isaacFrameCount)) .. ": ") .. jsonStringOrErrMsg
        )
        return DEFAULT_MOD_DATA
    end
    if jsonStringOrErrMsg == nil then
        return DEFAULT_MOD_DATA
    end
    local jsonStringTrimmed = __TS__StringTrim(jsonStringOrErrMsg)
    if jsonStringTrimmed == "" then
        return DEFAULT_MOD_DATA
    end
    return jsonStringTrimmed
end
function tryLoadModData(mod)
    return mod:LoadData()
end
DEFAULT_MOD_DATA = "{}"
function ____exports.loadFromDisk(self, mod, oldSaveData)
    if not mod:HasData() then
        return
    end
    local jsonString = readSaveDatFile(nil, mod)
    local newSaveData = jsonDecode(nil, jsonString)
    if DEBUG then
        log(nil, "Converted data from the \"save#.dat\" to a Lua table.")
    end
    for key, value in pairs(newSaveData) do
        do
            local keyType = type(key)
            if keyType ~= "string" then
                goto __continue5
            end
            local valueType = type(value)
            if valueType ~= "table" then
                goto __continue5
            end
            local oldSaveDataForSubscriber = oldSaveData[key]
            if oldSaveDataForSubscriber == nil then
                goto __continue5
            end
            if DEBUG then
                log(
                    nil,
                    "Merging in stored data for feature: " .. tostring(key)
                )
            end
            merge(nil, oldSaveDataForSubscriber, value, key)
        end
        ::__continue5::
    end
    log(nil, "The save data manager loaded data from the \"save#.dat\" file.")
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.json"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local tryEncode, tryDecode
local json = require("json")
local ____log = require("mod.node_modules.isaacscript-common.dist.functions.log")
local log = ____log.log
function tryEncode(____table)
    return json.encode(____table)
end
function tryDecode(jsonString)
    return json.decode(jsonString)
end
function ____exports.jsonEncode(self, ____table)
    local ok, jsonStringOrErrMsg = pcall(tryEncode, ____table)
    if not ok then
        error("Failed to convert the Lua table to JSON: " .. jsonStringOrErrMsg)
    end
    return jsonStringOrErrMsg
end
function ____exports.jsonDecode(self, jsonString)
    local ok, luaTableOrErrMsg = pcall(tryDecode, jsonString)
    if not ok then
        log(nil, "Failed to convert the JSON string to a Lua table: " .. jsonString)
        return {}
    end
    return luaTableOrErrMsg
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.features.saveDataManager.merge"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local mergeArray, mergeTSTLObject, mergeTable, mergeVector
local ____constantsInternal = require("mod.node_modules.isaacscript-common.dist.constantsInternal")
local TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND = ____constantsInternal.TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND
local ____debug = require("mod.node_modules.isaacscript-common.dist.debug")
local DEBUG = ____debug.DEBUG
local ____array = require("mod.node_modules.isaacscript-common.dist.functions.array")
local isArray = ____array.isArray
local ____deepCopy = require("mod.node_modules.isaacscript-common.dist.functions.deepCopy")
local addTraversalDescription = ____deepCopy.addTraversalDescription
local deepCopy = ____deepCopy.deepCopy
local deserializeVector = ____deepCopy.deserializeVector
local isBrand = ____deepCopy.isBrand
local isSerializedVector = ____deepCopy.isSerializedVector
local SerializationType = ____deepCopy.SerializationType
local ____log = require("mod.node_modules.isaacscript-common.dist.functions.log")
local log = ____log.log
local ____util = require("mod.node_modules.isaacscript-common.dist.functions.util")
local tableClear = ____util.tableClear
function ____exports.merge(self, oldObject, newTable, traversalDescription)
    local oldObjectType = type(oldObject)
    if oldObjectType ~= "table" then
        error("The first argument given to the merge function is not a table.")
    end
    local newTableType = type(newTable)
    if newTableType ~= "table" then
        error("The second argument given to the merge function is not a table.")
    end
    if DEBUG then
        log(nil, "merge is operating on: " .. traversalDescription)
    end
    if mergeArray(nil, oldObject, newTable) then
        return
    end
    if __TS__InstanceOf(oldObject, Map) or __TS__InstanceOf(oldObject, Set) then
        mergeTSTLObject(nil, oldObject, newTable, traversalDescription)
    else
        mergeTable(nil, oldObject, newTable, traversalDescription)
    end
end
function mergeArray(self, oldObject, newTable)
    local oldArray = oldObject
    if (not isArray(nil, oldArray)) or (not isArray(nil, newTable)) then
        return false
    end
    tableClear(nil, oldArray)
    for key, value in pairs(newTable) do
        oldArray[key] = value
    end
    return true
end
function mergeTSTLObject(self, oldObject, newTable, traversalDescription)
    oldObject:clear()
    local convertStringKeysToNumbers = newTable[TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND] ~= nil
    for key, value in pairs(newTable) do
        do
            if isBrand(nil, key) then
                goto __continue13
            end
            local keyToUse = key
            if convertStringKeysToNumbers then
                local numberKey = tonumber(key)
                if numberKey == nil then
                    goto __continue13
                end
                keyToUse = numberKey
            end
            if __TS__InstanceOf(oldObject, Map) then
                local valueType = type(value)
                local valueCopy
                if valueType == "table" then
                    valueCopy = deepCopy(nil, value, SerializationType.DESERIALIZE, traversalDescription)
                else
                    valueCopy = value
                end
                oldObject:set(keyToUse, valueCopy)
            elseif __TS__InstanceOf(oldObject, Set) then
                oldObject:add(keyToUse)
            end
        end
        ::__continue13::
    end
end
function mergeTable(self, oldTable, newTable, traversalDescription)
    for key, value in pairs(newTable) do
        do
            if isBrand(nil, key) then
                goto __continue22
            end
            if mergeVector(nil, oldTable, key, value) then
                goto __continue22
            end
            local valueType = type(value)
            if valueType == "table" then
                local oldValue = oldTable[key]
                local oldValueType = type(oldValue)
                if oldValueType == "table" then
                    traversalDescription = addTraversalDescription(nil, key, traversalDescription)
                    ____exports.merge(nil, oldValue, value, traversalDescription)
                end
            else
                if DEBUG then
                    log(
                        nil,
                        (("Merging key \"" .. tostring(key)) .. "\" with value: ") .. tostring(value)
                    )
                end
                oldTable[key] = value
            end
        end
        ::__continue22::
    end
end
function mergeVector(self, oldTable, key, value)
    if not isSerializedVector(nil, value) then
        return false
    end
    local serializedVector = value
    local vector = deserializeVector(nil, serializedVector)
    oldTable[key] = vector
    return true
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.features.saveDataManager.save"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local getAllSaveDataToWriteToDisk
local ____deepCopy = require("mod.node_modules.isaacscript-common.dist.functions.deepCopy")
local deepCopy = ____deepCopy.deepCopy
local SerializationType = ____deepCopy.SerializationType
local ____json = require("mod.node_modules.isaacscript-common.dist.functions.json")
local jsonEncode = ____json.jsonEncode
local ____log = require("mod.node_modules.isaacscript-common.dist.functions.log")
local log = ____log.log
function getAllSaveDataToWriteToDisk(self, saveDataMap, saveDataConditionalFuncMap)
    local allSaveData = {}
    for subscriberName, saveData in pairs(saveDataMap) do
        do
            if saveData.dontSave ~= nil then
                goto __continue4
            end
            local conditionalFunc = saveDataConditionalFuncMap:get(subscriberName)
            if conditionalFunc ~= nil then
                local shouldSave = conditionalFunc(nil)
                if not shouldSave then
                    goto __continue4
                end
            end
            local saveDataWithoutRoom = {persistent = saveData.persistent, run = saveData.run, level = saveData.level}
            local saveDataCopy = deepCopy(nil, saveDataWithoutRoom, SerializationType.SERIALIZE, subscriberName)
            allSaveData[subscriberName] = saveDataCopy
        end
        ::__continue4::
    end
    return allSaveData
end
function ____exports.saveToDisk(self, mod, saveDataMap, saveDataConditionalFuncMap)
    local allSaveData = getAllSaveDataToWriteToDisk(nil, saveDataMap, saveDataConditionalFuncMap)
    local jsonString = jsonEncode(nil, allSaveData)
    mod:SaveData(jsonString)
    log(nil, "The save data manager wrote data to the \"save#.dat\" file.")
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.features.forgottenSwitch"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local isActionTriggered, v
local ____errors = require("mod.node_modules.isaacscript-common.dist.errors")
local getUpgradeErrorMsg = ____errors.getUpgradeErrorMsg
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
function isActionTriggered(self, _entity, _inputHook, buttonAction)
    if (buttonAction == ButtonAction.ACTION_DROP) and v.run.shouldSwitch then
        v.run.shouldSwitch = false
        return true
    end
    return nil
end
local FEATURE_NAME = "Forgotten switcher"
local initialized = false
v = {run = {shouldSwitch = false}}
function ____exports.init(self, mod)
    initialized = true
    saveDataManager(nil, "forgottenSwitch", v)
    mod:AddCallback(ModCallbacks.MC_INPUT_ACTION, isActionTriggered, InputHook.IS_ACTION_TRIGGERED)
end
function ____exports.forgottenSwitch(self)
    if not initialized then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    v.run.shouldSwitch = true
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.features.runInNFrames"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local postUpdate, FEATURE_NAME, initialized, v
local ____errors = require("mod.node_modules.isaacscript-common.dist.errors")
local getUpgradeErrorMsg = ____errors.getUpgradeErrorMsg
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
function postUpdate(self)
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    local functionsToFire = {}
    local indexesToRemove = {}
    do
        local i = 0
        while i < #v.run.queuedFunctionTuples do
            local functionTuple = v.run.queuedFunctionTuples[i + 1]
            local frame, func = table.unpack(functionTuple)
            if gameFrameCount >= frame then
                __TS__ArrayPush(functionsToFire, func)
                __TS__ArrayPush(indexesToRemove, i)
            end
            i = i + 1
        end
    end
    for ____, indexToRemove in ipairs(indexesToRemove) do
        __TS__ArraySplice(v.run.queuedFunctionTuples, indexToRemove, 1)
    end
    for ____, func in ipairs(functionsToFire) do
        func(nil)
    end
end
function ____exports.runInNFrames(self, func, frames)
    if not initialized then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    local functionFireFrame = gameFrameCount + frames
    local tuple = {functionFireFrame, func}
    __TS__ArrayPush(v.run.queuedFunctionTuples, tuple)
end
FEATURE_NAME = "run in N frames"
initialized = false
v = {dontSave = true, run = {queuedFunctionTuples = {}}}
function ____exports.init(self, mod)
    initialized = true
    saveDataManager(nil, "runInNFrames", v)
    mod:AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate)
end
function ____exports.runNextFrame(self, func)
    if not initialized then
        local msg = getUpgradeErrorMsg(nil, FEATURE_NAME)
        error(msg)
    end
    ____exports.runInNFrames(nil, func, 1)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.bitwise"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.getKBitOfN(self, k, n)
    return (n >> k) & 1
end
function ____exports.getNumBitsOfN(self, n)
    local numBits = 0
    while n > 0 do
        numBits = numBits + 1
        n = n >> 1
    end
    return numBits
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.collectibles"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local COLLECTIBLE_SPRITE_LAYER
local ____util = require("mod.node_modules.isaacscript-common.dist.functions.util")
local copySet = ____util.copySet
function ____exports.getMaxCollectibleID(self)
    local itemConfig = Isaac.GetItemConfig()
    return itemConfig:GetCollectibles().Size - 1
end
function ____exports.setCollectibleSprite(self, pickup, pngPath)
    if pickup.Variant ~= PickupVariant.PICKUP_COLLECTIBLE then
        error(
            "You cannot set a collectible sprite for pickups of variant: " .. tostring(pickup.Variant)
        )
    end
    local sprite = pickup:GetSprite()
    sprite:ReplaceSpritesheet(COLLECTIBLE_SPRITE_LAYER, pngPath)
    sprite:LoadGraphics()
end
COLLECTIBLE_SPRITE_LAYER = 1
local BLIND_ITEM_PNG_PATH = "gfx/items/collectibles/questionmark.png"
local GLITCHED_ITEM_THRESHOLD = 4000000000
local COLLECTIBLE_SET = __TS__New(Set)
local function initSet(self)
    local itemConfig = Isaac.GetItemConfig()
    do
        local collectibleType = 1
        while collectibleType <= ____exports.getMaxCollectibleID(nil) do
            local itemConfigItem = itemConfig:GetCollectible(collectibleType)
            if itemConfigItem ~= nil then
                COLLECTIBLE_SET:add(collectibleType)
            end
            collectibleType = collectibleType + 1
        end
    end
end
function ____exports.changeCollectibleSubType(self, collectible, newCollectibleType)
    collectible.SubType = newCollectibleType
    local itemConfig = Isaac.GetItemConfig()
    local itemConfigItem = itemConfig:GetCollectible(newCollectibleType)
    if itemConfigItem == nil then
        error(
            "Failed to get the item config for: " .. tostring(newCollectibleType)
        )
    end
    ____exports.setCollectibleSprite(nil, collectible, itemConfigItem.GfxFileName)
end
function ____exports.collectibleHasTag(self, collectibleType, tag)
    local itemConfig = Isaac.GetItemConfig()
    local itemConfigItem = itemConfig:GetCollectible(collectibleType)
    if itemConfigItem == nil then
        return false
    end
    return itemConfigItem:HasTags(tag)
end
function ____exports.getCollectibleInitCharges(self, collectibleType)
    local itemConfig = Isaac.GetItemConfig()
    local itemConfigItem = itemConfig:GetCollectible(collectibleType)
    if itemConfigItem == nil then
        return 0
    end
    return itemConfigItem.InitCharge
end
function ____exports.getCollectibleMaxCharges(self, collectibleType)
    local itemConfig = Isaac.GetItemConfig()
    local itemConfigItem = itemConfig:GetCollectible(collectibleType)
    if itemConfigItem == nil then
        return 0
    end
    return itemConfigItem.MaxCharges
end
function ____exports.getCollectibleSet(self)
    if COLLECTIBLE_SET.size == 0 then
        initSet(nil)
    end
    return copySet(nil, COLLECTIBLE_SET)
end
function ____exports.isGlitchedCollectible(self, entity)
    return ((entity.Type == EntityType.ENTITY_PICKUP) and (entity.Variant == PickupVariant.PICKUP_COLLECTIBLE)) and (entity.SubType > GLITCHED_ITEM_THRESHOLD)
end
function ____exports.isQuestCollectible(self, collectibleType)
    return ____exports.collectibleHasTag(nil, collectibleType, 32768)
end
function ____exports.setCollectibleBlind(self, pickup)
    ____exports.setCollectibleSprite(nil, pickup, BLIND_ITEM_PNG_PATH)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.deepCopyTests"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local copiedObjectIsTable, copiedObjectHasKeyAndValueString, copiedTableHasKeyAndValueNumber, copiedTableDoesNotCoerceTypes, copiedObjectHasNoReferencesForPrimitivesForward, copiedObjectHasNoReferencesForPrimitivesBackward, copiedObjectHasNoReferencesForArray, copiedObjectHasChildObject, copiedMapIsMap, copiedMapHasValue, copiedSetIsSet, copiedSetHasValue, copiedMapHasChildMap
local ____array = require("mod.node_modules.isaacscript-common.dist.functions.array")
local arrayEquals = ____array.arrayEquals
local ____deepCopy = require("mod.node_modules.isaacscript-common.dist.functions.deepCopy")
local deepCopy = ____deepCopy.deepCopy
local ____log = require("mod.node_modules.isaacscript-common.dist.functions.log")
local log = ____log.log
function copiedObjectIsTable(self)
    local oldObject = {abc = "def"}
    local newObject = deepCopy(nil, oldObject)
    local newObjectType = type(newObject)
    if newObjectType ~= "table" then
        error("The copied object is not a table.")
    end
end
function copiedObjectHasKeyAndValueString(self)
    local keyToLookFor = "abc"
    local valueToLookFor = "def"
    local oldObject = {abc = valueToLookFor}
    local newTable = deepCopy(nil, oldObject)
    local newObject = newTable
    local value = newObject[keyToLookFor]
    if value == nil then
        error("The copied object did not have a key of: " .. keyToLookFor)
    end
    local valueType = type(value)
    if valueType ~= "string" then
        error("The copied object had a value type of: " .. valueType)
    end
    if value ~= valueToLookFor then
        error("The copied object had a value of: " .. value)
    end
end
function copiedTableHasKeyAndValueNumber(self)
    local keyToLookFor = 123
    local valueToLookFor = 456
    local oldTable = {}
    oldTable[keyToLookFor] = valueToLookFor
    local newObject = deepCopy(nil, oldTable)
    local newTable = newObject
    local value = newTable[keyToLookFor]
    if value == nil then
        error(
            "The copied object did not have a key of: " .. tostring(keyToLookFor)
        )
    end
    local valueType = type(value)
    if valueType ~= "number" then
        error("The copied object had a value type of: " .. valueType)
    end
    if value ~= valueToLookFor then
        error(
            "The copied object had a value of: " .. tostring(value)
        )
    end
end
function copiedTableDoesNotCoerceTypes(self)
    local keyToLookFor = 123
    local valueToLookFor = 456
    local oldTable = {}
    oldTable[keyToLookFor] = valueToLookFor
    local newObject = deepCopy(nil, oldTable)
    local newTable = newObject
    local keyString = tostring(keyToLookFor)
    local valueString = tostring(valueToLookFor)
    local valueFromString = newTable[keyString]
    if valueFromString ~= nil then
        error("The copied object had a string key of: " .. keyString)
    end
    local value = newTable[keyToLookFor]
    if value == valueString then
        error("The copied object had a value that incorrectly matched the string of: " .. valueString)
    end
end
function copiedObjectHasNoReferencesForPrimitivesForward(self)
    local originalStringValue = "abcdef"
    local originalNumberValue = 123
    local oldObject = {abc = originalStringValue, def = originalNumberValue}
    local newTable = deepCopy(nil, oldObject)
    local newObject = newTable
    oldObject.abc = "newValue"
    if oldObject.abc == newObject.abc then
        error("The copied object has a string reference going forward.")
    end
    oldObject.def = 456
    if oldObject.def == newObject.def then
        error("The copied object has a number reference going forward.")
    end
end
function copiedObjectHasNoReferencesForPrimitivesBackward(self)
    local originalStringValue = "abcdef"
    local originalNumberValue = 123
    local oldObject = {abc = originalStringValue, def = originalNumberValue}
    local newTable = deepCopy(nil, oldObject)
    local newObject = newTable
    newObject.abc = "newValue"
    if newObject.abc == oldObject.abc then
        error("The copied object has a string reference going backward.")
    end
    newObject.def = 456
    if newObject.def == oldObject.def then
        error("The copied object has a number reference going backward.")
    end
end
function copiedObjectHasNoReferencesForArray(self)
    local oldObject = {abc = {1, 2, 3}}
    local newTable = deepCopy(nil, oldObject)
    local newObject = newTable
    if oldObject.abc == newObject.abc then
        error("The copied object has the same point to the child array.")
    end
    if not arrayEquals(nil, oldObject.abc, newObject.abc) then
        error("The copied object does not have an equal array.")
    end
    local ____obj, ____index = oldObject.abc, 0 + 1
    ____obj[____index] = ____obj[____index] + 1
    if arrayEquals(nil, oldObject.abc, newObject.abc) then
        error("The copied object has an equal array after a modification to the old array.")
    end
    local ____obj, ____index = oldObject.abc, 0 + 1
    ____obj[____index] = ____obj[____index] - 1
    local ____obj, ____index = newObject.abc, 0 + 1
    ____obj[____index] = ____obj[____index] + 1
    if arrayEquals(nil, oldObject.abc, newObject.abc) then
        error("The copied object has an equal array after a modification to the new array.")
    end
    local ____obj, ____index = newObject.abc, 0 + 1
    ____obj[____index] = ____obj[____index] - 1
end
function copiedObjectHasChildObject(self)
    local childObjectIndex = "abc"
    local keyToLookFor = "def"
    local valueToLookFor = "ghi"
    local oldObject = {abc = {def = valueToLookFor}}
    local newTable = deepCopy(nil, oldObject)
    local newObject = newTable
    local childObject = newObject[childObjectIndex]
    if childObject == nil then
        error("Failed to find the child object at index: " .. childObjectIndex)
    end
    local childObjectType = type(childObject)
    if childObjectType ~= "table" then
        error("The copied child object was not a table.")
    end
    local value = childObject[keyToLookFor]
    if value == nil then
        error("The child object did not have a key of: " .. keyToLookFor)
    end
    local valueType = type(value)
    if valueType ~= "string" then
        error("The child object value had a type of: " .. valueType)
    end
    if value ~= valueToLookFor then
        error("The child object value was: " .. valueToLookFor)
    end
end
function copiedMapIsMap(self)
    local keyToLookFor = "abc"
    local valueToLookFor = "def"
    local oldMap = __TS__New(Map)
    oldMap:set(keyToLookFor, valueToLookFor)
    local newObject = deepCopy(nil, oldMap)
    local newMap = newObject
    local newMapType = type(newMap)
    if newMapType ~= "table" then
        error("The copied Map was not a table.")
    end
    if not __TS__InstanceOf(newMap, Map) then
        error("The copied Map was not a Map.")
    end
end
function copiedMapHasValue(self)
    local keyToLookFor = "abc"
    local valueToLookFor = "def"
    local oldMap = __TS__New(Map)
    oldMap:set(keyToLookFor, valueToLookFor)
    local newTable = deepCopy(nil, oldMap)
    local newMap = newTable
    local value = newMap:get(keyToLookFor)
    if value == nil then
        error("The copied Map did not have a key of: " .. keyToLookFor)
    end
    if value ~= valueToLookFor then
        error("The copied Map did not have a value of: " .. valueToLookFor)
    end
end
function copiedSetIsSet(self)
    local valueToLookFor = "abc"
    local oldSet = __TS__New(Set)
    oldSet:add(valueToLookFor)
    local newTable = deepCopy(nil, oldSet)
    local newSet = newTable
    local newSetType = type(newSet)
    if newSetType ~= "table" then
        error("The copied Set was not a table.")
    end
    if not __TS__InstanceOf(newSet, Set) then
        error("The copied Set was not a Map.")
    end
end
function copiedSetHasValue(self)
    local valueToLookFor = "abc"
    local oldSet = __TS__New(Set)
    oldSet:add(valueToLookFor)
    local newTable = deepCopy(nil, oldSet)
    local newSet = newTable
    local hasValue = newSet:has(valueToLookFor)
    if not hasValue then
        error("The copied Set did not have a value of: " .. valueToLookFor)
    end
end
function copiedMapHasChildMap(self)
    local childMapKey = 123
    local childMapValue = 456
    local oldChildMap = __TS__New(Map)
    oldChildMap:set(childMapKey, childMapValue)
    local keyToLookFor = "abc"
    local oldMap = __TS__New(Map)
    oldMap:set(keyToLookFor, oldChildMap)
    local newTable = deepCopy(nil, oldMap)
    local newMap = newTable
    local newChildMap = newMap:get(keyToLookFor)
    if newChildMap == nil then
        error("The copied Map did not have a child map at key: " .. keyToLookFor)
    end
    local newChildMapType = type(newChildMap)
    if newChildMapType ~= "table" then
        error("The copied child Map had a type of: " .. newChildMapType)
    end
    if not __TS__InstanceOf(newChildMap, Map) then
        error("The copied child Map was not a Map.")
    end
    local value = newChildMap:get(childMapKey)
    if value == nil then
        error(
            "The copied child Map did not have a key of: " .. tostring(childMapKey)
        )
    end
    if value ~= childMapValue then
        error(
            "The copied child Map did not have a value of: " .. tostring(childMapValue)
        )
    end
end
function ____exports.deepCopyTests(self)
    copiedObjectIsTable(nil)
    copiedObjectHasKeyAndValueString(nil)
    copiedTableHasKeyAndValueNumber(nil)
    copiedTableDoesNotCoerceTypes(nil)
    copiedObjectHasNoReferencesForPrimitivesForward(nil)
    copiedObjectHasNoReferencesForPrimitivesBackward(nil)
    copiedObjectHasNoReferencesForArray(nil)
    copiedObjectHasChildObject(nil)
    copiedMapIsMap(nil)
    copiedMapHasValue(nil)
    copiedSetIsSet(nil)
    copiedSetHasValue(nil)
    copiedMapHasChildMap(nil)
    log(nil, "All tests passed!")
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.doors"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("mod.node_modules.isaacscript-common.dist.constants")
local MAX_NUM_DOORS = ____constants.MAX_NUM_DOORS
function ____exports.isAngelRoomDoor(self, door)
    return door.TargetRoomType == RoomType.ROOM_ANGEL
end
function ____exports.isDevilRoomDoor(self, door)
    return door.TargetRoomType == RoomType.ROOM_DEVIL
end
function ____exports.isRepentanceDoor(self, door)
    return door.TargetRoomIndex == GridRooms.ROOM_SECRET_EXIT_IDX
end
function ____exports.isSecretRoomDoor(self, door)
    local sprite = door:GetSprite()
    local filename = sprite:GetFilename()
    return filename == "gfx/grid/Door_08_HoleInWall.anm2"
end
function ____exports.getDoors(self, roomType)
    local game = Game()
    local room = game:GetRoom()
    local doors = {}
    do
        local i = 0
        while i < MAX_NUM_DOORS do
            do
                local door = room:GetDoor(i)
                if door == nil then
                    goto __continue3
                end
                if roomType == nil then
                    __TS__ArrayPush(doors, door)
                elseif door:IsRoomType(roomType) then
                    __TS__ArrayPush(doors, door)
                end
            end
            ::__continue3::
            i = i + 1
        end
    end
    return doors
end
function ____exports.getAngelRoomDoor(self)
    for ____, door in ipairs(
        ____exports.getDoors(nil)
    ) do
        if ____exports.isAngelRoomDoor(nil, door) then
            return door
        end
    end
    return nil
end
function ____exports.getDevilRoomDoor(self)
    for ____, door in ipairs(
        ____exports.getDoors(nil)
    ) do
        if ____exports.isDevilRoomDoor(nil, door) then
            return door
        end
    end
    return nil
end
function ____exports.getDevilRoomOrAngelRoomDoor(self)
    for ____, door in ipairs(
        ____exports.getDoors(nil)
    ) do
        if ____exports.isDevilRoomDoor(nil, door) or ____exports.isAngelRoomDoor(nil, door) then
            return door
        end
    end
    return nil
end
function ____exports.getRepentanceDoor(self)
    for ____, door in ipairs(
        ____exports.getDoors(nil)
    ) do
        if ____exports.isRepentanceDoor(nil, door) then
            return door
        end
    end
    return nil
end
function ____exports.isHiddenSecretRoomDoor(self, door)
    local sprite = door:GetSprite()
    local animation = sprite:GetAnimation()
    return ____exports.isSecretRoomDoor(nil, door) and (animation == "Hidden")
end
function ____exports.isDoorToDownpour(self, door)
    if not ____exports.isRepentanceDoor(nil, door) then
        return false
    end
    local sprite = door:GetSprite()
    local filename = sprite:GetFilename()
    return filename == "gfx/grid/Door_Downpour.anm2"
end
function ____exports.isDoorToMausoleum(self, door)
    if not ____exports.isRepentanceDoor(nil, door) then
        return false
    end
    local sprite = door:GetSprite()
    local filename = sprite:GetFilename()
    return filename == "gfx/grid/Door_Mausoleum.anm2"
end
function ____exports.isDoorToMausoleumAscent(self, door)
    if not ____exports.isRepentanceDoor(nil, door) then
        return false
    end
    local sprite = door:GetSprite()
    local filename = sprite:GetFilename()
    return filename == "gfx/grid/Door_Mausoleum_Alt.anm2"
end
function ____exports.isDoorToMines(self, door)
    if not ____exports.isRepentanceDoor(nil, door) then
        return false
    end
    local sprite = door:GetSprite()
    local filename = sprite:GetFilename()
    return filename == "gfx/grid/Door_Mines.anm2"
end
function ____exports.isDoorToMomsHeart(self, door)
    if not ____exports.isRepentanceDoor(nil, door) then
        return false
    end
    local sprite = door:GetSprite()
    local filename = sprite:GetFilename()
    return filename == "gfx/grid/Door_MomsHeart.anm2"
end
function ____exports.openAllDoors(self)
    for ____, door in ipairs(
        ____exports.getDoors(nil)
    ) do
        door:Open()
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.entity"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
function ____exports.getBosses(self)
    local bosses = {}
    for ____, npc in ipairs(
        ____exports.getNPCs(nil)
    ) do
        if npc:IsBoss() then
            __TS__ArrayPush(bosses, npc)
        end
    end
    return bosses
end
function ____exports.getNPCs(self)
    local npcs = {}
    for ____, entity in ipairs(
        Isaac.GetRoomEntities()
    ) do
        local npc = entity:ToNPC()
        if npc ~= nil then
            __TS__ArrayPush(npcs, npc)
        end
    end
    return npcs
end
function ____exports.anyEntityCloserThan(self, entities, position, distance)
    for ____, entity in ipairs(entities) do
        if position:Distance(entity.Position) <= distance then
            return true
        end
    end
    return false
end
function ____exports.getAliveBosses(self)
    local aliveBosses = {}
    for ____, boss in ipairs(
        ____exports.getBosses(nil)
    ) do
        if not boss:IsDead() then
            __TS__ArrayPush(aliveBosses, boss)
        end
    end
    return aliveBosses
end
function ____exports.getAliveNPCs(self)
    local aliveNPCs = {}
    for ____, npc in ipairs(
        ____exports.getNPCs(nil)
    ) do
        if not npc:IsDead() then
            __TS__ArrayPush(aliveNPCs, npc)
        end
    end
    return aliveNPCs
end
function ____exports.removeEntities(self, entities)
    for ____, entity in ipairs(entities) do
        entity:Remove()
    end
end
function ____exports.removeAllMatchingEntities(self, entityType, entityVariant, entitySubType)
    if entityVariant == nil then
        entityVariant = -1
    end
    if entitySubType == nil then
        entitySubType = -1
    end
    local entities = Isaac.FindByType(entityType, entityVariant, entitySubType)
    ____exports.removeEntities(nil, entities)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.gridEntity"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
function ____exports.spawnGridEntityWithVariant(self, gridEntityType, variant, gridIndex)
    local game = Game()
    local room = game:GetRoom()
    local position = room:GetGridPosition(gridIndex)
    return Isaac.GridSpawn(gridEntityType, variant, position, true)
end
function ____exports.getGridEntities(self, ...)
    local gridEntityTypes = {...}
    local game = Game()
    local room = game:GetRoom()
    local gridSize = room:GetGridSize()
    local gridEntityTypesSet = __TS__New(Set, gridEntityTypes)
    local gridEntities = {}
    do
        local gridIndex = 0
        while gridIndex < gridSize do
            do
                local gridEntity = room:GetGridEntity(gridIndex)
                if gridEntity == nil then
                    goto __continue3
                end
                if #gridEntityTypes == 0 then
                    __TS__ArrayPush(gridEntities, gridEntity)
                else
                    local thisGridEntityType = gridEntity:GetType()
                    if gridEntityTypesSet:has(thisGridEntityType) then
                        __TS__ArrayPush(gridEntities, gridEntity)
                    end
                end
            end
            ::__continue3::
            gridIndex = gridIndex + 1
        end
    end
    return gridEntities
end
function ____exports.getSurroundingGridEntities(self, gridEntity)
    local game = Game()
    local room = game:GetRoom()
    local gridWidth = room:GetGridWidth()
    local gridIndex = gridEntity:GetGridIndex()
    local surroundingGridIndexes = {gridIndex - 1, gridIndex + 1, (gridIndex - gridWidth) - 1, gridIndex - gridWidth, (gridIndex - gridWidth) + 1, (gridIndex + gridWidth) - 1, gridIndex + gridWidth, (gridIndex + gridWidth) + 1}
    local surroundingGridEntities = {}
    for ____, surroundingGridIndex in ipairs(surroundingGridIndexes) do
        local surroundingGridEntity = room:GetGridEntity(surroundingGridIndex)
        if surroundingGridEntity ~= nil then
            __TS__ArrayPush(surroundingGridEntities, surroundingGridEntity)
        end
    end
    return surroundingGridEntities
end
function ____exports.spawnGiantPoop(self, topLeftGridIndex)
    local game = Game()
    local room = game:GetRoom()
    local gridWidth = room:GetGridWidth()
    local topRightGridIndex = topLeftGridIndex + 1
    local bottomLeftGridIndex = topLeftGridIndex + gridWidth
    local bottomRightGridIndex = bottomLeftGridIndex + 1
    ____exports.spawnGridEntityWithVariant(nil, GridEntityType.GRID_POOP, 7, topLeftGridIndex)
    ____exports.spawnGridEntityWithVariant(nil, GridEntityType.GRID_POOP, 8, topRightGridIndex)
    ____exports.spawnGridEntityWithVariant(nil, GridEntityType.GRID_POOP, 9, bottomLeftGridIndex)
    ____exports.spawnGridEntityWithVariant(nil, GridEntityType.GRID_POOP, 10, bottomRightGridIndex)
end
function ____exports.spawnGridEntity(self, gridEntityType, gridIndex)
    return ____exports.spawnGridEntityWithVariant(nil, gridEntityType, 0, gridIndex)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.input"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("mod.node_modules.isaacscript-common.dist.constants")
local MAX_NUM_INPUTS = ____constants.MAX_NUM_INPUTS
local ControllerLiteral = ControllerLiteral or ({})
ControllerLiteral.DPAD_LEFT = 0
ControllerLiteral[ControllerLiteral.DPAD_LEFT] = "DPAD_LEFT"
ControllerLiteral.DPAD_RIGHT = 1
ControllerLiteral[ControllerLiteral.DPAD_RIGHT] = "DPAD_RIGHT"
ControllerLiteral.DPAD_UP = 2
ControllerLiteral[ControllerLiteral.DPAD_UP] = "DPAD_UP"
ControllerLiteral.DPAD_DOWN = 3
ControllerLiteral[ControllerLiteral.DPAD_DOWN] = "DPAD_DOWN"
ControllerLiteral.BUTTON_A = 4
ControllerLiteral[ControllerLiteral.BUTTON_A] = "BUTTON_A"
ControllerLiteral.BUTTON_B = 5
ControllerLiteral[ControllerLiteral.BUTTON_B] = "BUTTON_B"
ControllerLiteral.BUTTON_X = 6
ControllerLiteral[ControllerLiteral.BUTTON_X] = "BUTTON_X"
ControllerLiteral.BUTTON_Y = 7
ControllerLiteral[ControllerLiteral.BUTTON_Y] = "BUTTON_Y"
ControllerLiteral.BUMPER_LEFT = 8
ControllerLiteral[ControllerLiteral.BUMPER_LEFT] = "BUMPER_LEFT"
ControllerLiteral.TRIGGER_LEFT = 9
ControllerLiteral[ControllerLiteral.TRIGGER_LEFT] = "TRIGGER_LEFT"
ControllerLiteral.STICK_LEFT = 10
ControllerLiteral[ControllerLiteral.STICK_LEFT] = "STICK_LEFT"
ControllerLiteral.BUMPER_RIGHT = 11
ControllerLiteral[ControllerLiteral.BUMPER_RIGHT] = "BUMPER_RIGHT"
ControllerLiteral.TRIGGER_RIGHT = 12
ControllerLiteral[ControllerLiteral.TRIGGER_RIGHT] = "TRIGGER_RIGHT"
ControllerLiteral.STICK_RIGHT = 13
ControllerLiteral[ControllerLiteral.STICK_RIGHT] = "STICK_RIGHT"
ControllerLiteral.BUTTON_BACK = 14
ControllerLiteral[ControllerLiteral.BUTTON_BACK] = "BUTTON_BACK"
ControllerLiteral.BUTTON_START = 15
ControllerLiteral[ControllerLiteral.BUTTON_START] = "BUTTON_START"
function ____exports.controllerToString(self, controller)
    for ____, ____value in ipairs(
        __TS__ObjectEntries(ControllerLiteral)
    ) do
        local key
        key = ____value[1]
        local controllerLiteralCode
        controllerLiteralCode = ____value[2]
        do
            if type(key) ~= "string" then
                goto __continue3
            end
            local controllerCode = controllerLiteralCode
            if controllerCode ~= controller then
                goto __continue3
            end
            local controllerName = key
            for ____, prefix in ipairs({"DPAD_", "BUTTON_", "BUMPER_", "TRIGGER_", "STICK_"}) do
                controllerName = __TS__StringReplace(controllerName, prefix, "")
            end
            return controllerName
        end
        ::__continue3::
    end
    return "unknown"
end
function ____exports.isActionPressedOnAnyInput(self, buttonAction)
    do
        local i = 0
        while i < MAX_NUM_INPUTS do
            if Input.IsActionPressed(buttonAction, i) then
                return true
            end
            i = i + 1
        end
    end
    return false
end
function ____exports.isActionTriggeredOnAnyInput(self, buttonAction)
    do
        local i = 0
        while i < MAX_NUM_INPUTS do
            if Input.IsActionTriggered(buttonAction, i) then
                return true
            end
            i = i + 1
        end
    end
    return false
end
function ____exports.isKeyboardPressed(self, key)
    return Input.IsButtonPressed(key, 0)
end
function ____exports.keyboardToString(self, keyboard)
    for keyName, keyCode in pairs(Keyboard) do
        if keyCode == keyboard then
            local withoutPrefix = __TS__StringSlice(keyName, #"KEY_")
            local withoutUnderscores = string.gsub(withoutPrefix, "_", " ")
            return withoutUnderscores
        end
    end
    return "unknown"
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.items"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.getItemName(self, collectibleOrTrinketType, trinket)
    if trinket == nil then
        trinket = false
    end
    local itemConfig = Isaac.GetItemConfig()
    local defaultName = "Unknown"
    if type(collectibleOrTrinketType) ~= "number" then
        return defaultName
    end
    local itemConfigItem = ((trinket and (function() return itemConfig:GetTrinket(collectibleOrTrinketType) end)) or (function() return itemConfig:GetCollectible(collectibleOrTrinketType) end))()
    if itemConfigItem == nil then
        return defaultName
    end
    return itemConfigItem.Name
end
function ____exports.removeItemFromItemTracker(self, collectibleType)
    local itemName = ____exports.getItemName(nil, collectibleType)
    Isaac.DebugString(
        ((("Removing voided collectible " .. tostring(collectibleType)) .. " (") .. itemName) .. ") from player 0 (Player)"
    )
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.math"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local getCircleInitialPosition
local ____util = require("mod.node_modules.isaacscript-common.dist.functions.util")
local ensureAllCases = ____util.ensureAllCases
function getCircleInitialPosition(self, direction, radius)
    repeat
        local ____switch6 = direction
        local ____cond6 = ____switch6 == Direction.NO_DIRECTION
        if ____cond6 then
            do
                return Vector.Zero
            end
        end
        ____cond6 = ____cond6 or (____switch6 == Direction.LEFT)
        if ____cond6 then
            do
                return Vector(-radius, 0)
            end
        end
        ____cond6 = ____cond6 or (____switch6 == Direction.UP)
        if ____cond6 then
            do
                return Vector(0, -radius)
            end
        end
        ____cond6 = ____cond6 or (____switch6 == Direction.RIGHT)
        if ____cond6 then
            do
                return Vector(radius, 0)
            end
        end
        ____cond6 = ____cond6 or (____switch6 == Direction.DOWN)
        if ____cond6 then
            do
                return Vector(0, radius)
            end
        end
        do
            do
                ensureAllCases(nil, direction)
                return Vector.Zero
            end
        end
    until true
end
function ____exports.getAngleDifference(self, angle1, angle2)
    local subtractedAngle = angle1 - angle2
    return ((subtractedAngle + 180) % 360) - 180
end
function ____exports.getCircleDiscretizedPoints(self, centerPos, radius, numPoints, xMultiplier, yMultiplier, initialDirection)
    if xMultiplier == nil then
        xMultiplier = 1
    end
    if yMultiplier == nil then
        yMultiplier = 1
    end
    if initialDirection == nil then
        initialDirection = Direction.UP
    end
    local initialPosition = getCircleInitialPosition(nil, initialDirection, radius)
    local positions = {}
    do
        local i = 0
        while i < numPoints do
            local rotatedPosition = initialPosition:Rotated((i * 360) / numPoints)
            rotatedPosition.X = rotatedPosition.X * xMultiplier
            rotatedPosition.Y = rotatedPosition.Y * yMultiplier
            local positionFromCenter = centerPos + rotatedPosition
            __TS__ArrayPush(positions, positionFromCenter)
            i = i + 1
        end
    end
    return positions
end
function ____exports.isEven(self, num)
    return (num & 1) == 0
end
function ____exports.isOdd(self, num)
    return (num & 1) == 1
end
function ____exports.lerp(self, a, b, pos)
    return a + ((b - a) * pos)
end
function ____exports.lerpAngleDegrees(self, aStart, aEnd, percent)
    return aStart + (____exports.getAngleDifference(nil, aStart, aEnd) * percent)
end
function ____exports.round(self, num, numDecimalPlaces)
    if numDecimalPlaces == nil then
        numDecimalPlaces = 0
    end
    local roundedNum = tonumber(
        string.format(
            ("%." .. tostring(numDecimalPlaces)) .. "f",
            num
        )
    )
    return ((roundedNum == nil) and 0) or roundedNum
end
function ____exports.tanh(self, x)
    return (math.exp(x) - math.exp(-x)) / (math.exp(x) + math.exp(-x))
end
function ____exports.sign(self, n)
    if n > 0 then
        return 1
    end
    if n < 0 then
        return -1
    end
    return 0
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.pickups"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local CHEST_PICKUP_VARIANTS = __TS__New(Set, {PickupVariant.PICKUP_CHEST, PickupVariant.PICKUP_BOMBCHEST, PickupVariant.PICKUP_SPIKEDCHEST, PickupVariant.PICKUP_ETERNALCHEST, PickupVariant.PICKUP_MIMICCHEST, PickupVariant.PICKUP_OLDCHEST, PickupVariant.PICKUP_WOODENCHEST, PickupVariant.PICKUP_MEGACHEST, PickupVariant.PICKUP_HAUNTEDCHEST, PickupVariant.PICKUP_LOCKEDCHEST, PickupVariant.PICKUP_REDCHEST, PickupVariant.PICKUP_MOMSCHEST})
function ____exports.isChest(self, pickup)
    return CHEST_PICKUP_VARIANTS:has(pickup.Variant)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.player"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local EXCLUDED_CHARACTERS
local ____HealthType = require("mod.node_modules.isaacscript-common.dist.types.HealthType")
local HealthType = ____HealthType.default
local ____PocketItemType = require("mod.node_modules.isaacscript-common.dist.types.PocketItemType")
local PocketItemType = ____PocketItemType.default
local ____bitwise = require("mod.node_modules.isaacscript-common.dist.functions.bitwise")
local getKBitOfN = ____bitwise.getKBitOfN
local getNumBitsOfN = ____bitwise.getNumBitsOfN
local ____collectibles = require("mod.node_modules.isaacscript-common.dist.functions.collectibles")
local getCollectibleSet = ____collectibles.getCollectibleSet
function ____exports.getPlayers(self, performExclusions)
    if performExclusions == nil then
        performExclusions = false
    end
    local game = Game()
    local players = {}
    do
        local i = 0
        while i < game:GetNumPlayers() do
            do
                local player = Isaac.GetPlayer(i)
                if player == nil then
                    goto __continue46
                end
                if ____exports.isChildPlayer(nil, player) then
                    goto __continue46
                end
                local character = player:GetPlayerType()
                if performExclusions and EXCLUDED_CHARACTERS:has(character) then
                    goto __continue46
                end
                __TS__ArrayPush(players, player)
            end
            ::__continue46::
            i = i + 1
        end
    end
    return players
end
function ____exports.getPlayerIndex(self, player)
    local character = player:GetPlayerType()
    local collectibleToUse = ((character == PlayerType.PLAYER_LAZARUS2_B) and CollectibleType.COLLECTIBLE_INNER_EYE) or CollectibleType.COLLECTIBLE_SAD_ONION
    local collectibleRNG = player:GetCollectibleRNG(collectibleToUse)
    local seed = collectibleRNG:GetSeed()
    return seed
end
function ____exports.isChildPlayer(self, player)
    return player.Parent ~= nil
end
EXCLUDED_CHARACTERS = __TS__New(Set, {PlayerType.PLAYER_ESAU, PlayerType.PLAYER_THESOUL_B})
function ____exports.anyPlayerCloserThan(self, position, distance)
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        if player.Position:Distance(position) <= distance then
            return true
        end
    end
    return false
end
function ____exports.anyPlayerHasCollectible(self, collectibleType)
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        if player:HasCollectible(collectibleType) then
            return true
        end
    end
    return false
end
function ____exports.anyPlayerHasTrinket(self, trinketType)
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        if player:HasTrinket(trinketType) then
            return true
        end
    end
    return false
end
function ____exports.anyPlayerIs(self, matchingCharacter)
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        local character = player:GetPlayerType()
        if character == matchingCharacter then
            return true
        end
    end
    return false
end
function ____exports.getClosestPlayer(self, position)
    local closestPlayer = nil
    local closestDistance = math.huge
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        local distance = position:Distance(player.Position)
        if distance < closestDistance then
            closestPlayer = player
            closestDistance = distance
        end
    end
    if closestPlayer == nil then
        error("Failed to find any players.")
    end
    return closestPlayer
end
function ____exports.getDeathAnimationName(self, player)
    local character = player:GetPlayerType()
    local isLostTypeCharacter = (((character == PlayerType.PLAYER_THELOST) or (character == PlayerType.PLAYER_THELOST_B)) or (character == PlayerType.PLAYER_THESOUL)) or (character == PlayerType.PLAYER_THESOUL_B)
    return (isLostTypeCharacter and "LostDeath") or "Death"
end
function ____exports.getLastHeart(self, player)
    local hearts = player:GetHearts()
    local effectiveMaxHearts = player:GetEffectiveMaxHearts()
    local soulHearts = player:GetSoulHearts()
    local blackHearts = player:GetBlackHearts()
    local eternalHearts = player:GetEternalHearts()
    local boneHearts = player:GetBoneHearts()
    local rottenHearts = player:GetRottenHearts()
    local soulHeartSlots = soulHearts / 2
    local lastHeartIndex = (boneHearts + soulHeartSlots) - 1
    local isLastHeartBone = player:IsBoneHeart(lastHeartIndex)
    if isLastHeartBone then
        local isLastContainerEmpty = hearts <= (effectiveMaxHearts - 2)
        if isLastContainerEmpty then
            return HealthType.BONE
        end
        if rottenHearts > 0 then
            return HealthType.ROTTEN
        end
        if eternalHearts > 0 then
            return HealthType.ETERNAL
        end
        return HealthType.RED
    end
    if soulHearts > 0 then
        local numBits = getNumBitsOfN(nil, blackHearts)
        local finalBit = getKBitOfN(nil, numBits - 1, blackHearts)
        local isBlack = finalBit == 1
        if isBlack then
            return HealthType.BLACK
        end
        return HealthType.SOUL
    end
    if eternalHearts > 0 then
        return HealthType.ETERNAL
    end
    if rottenHearts > 0 then
        return HealthType.ROTTEN
    end
    return HealthType.RED
end
function ____exports.getNewestPlayer(self)
    local newestPlayer = nil
    local lowestFrame = math.huge
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        if player.FrameCount < lowestFrame then
            newestPlayer = player
            lowestFrame = player.FrameCount
        end
    end
    if newestPlayer == nil then
        error("Failed to find any players.")
    end
    return newestPlayer
end
function ____exports.getOpenTrinketSlot(self, player)
    local maxTrinkets = player:GetMaxTrinkets()
    local trinket0 = player:GetTrinket(0)
    local trinket1 = player:GetTrinket(1)
    if maxTrinkets == 1 then
        return ((trinket0 == TrinketType.TRINKET_NULL) and 0) or nil
    end
    if maxTrinkets == 2 then
        if trinket0 == TrinketType.TRINKET_NULL then
            return 0
        end
        return ((trinket1 == TrinketType.TRINKET_NULL) and 1) or nil
    end
    error(
        "The player has an unknown number of trinket slots: " .. tostring(maxTrinkets)
    )
    return nil
end
function ____exports.getPlayerCloserThan(self, position, distance)
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        if player.Position:Distance(position) <= distance then
            return player
        end
    end
    return nil
end
function ____exports.getPlayerCollectibleMap(self, player)
    local collectibleSet = getCollectibleSet(nil)
    local collectibleMap = __TS__New(Map)
    for ____, collectibleType in __TS__Iterator(
        collectibleSet:values()
    ) do
        local collectibleNum = player:GetCollectibleNum(collectibleType, true)
        if collectibleNum > 0 then
            collectibleMap:set(collectibleType, collectibleNum)
        end
    end
    return collectibleMap
end
function ____exports.getPlayerFromIndex(self, playerIndex)
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        local existingPlayerIndex = ____exports.getPlayerIndex(nil, player)
        if existingPlayerIndex == playerIndex then
            return player
        end
    end
    return nil
end
function ____exports.getPlayersOfType(self, playerType)
    local players = {}
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        local character = player:GetPlayerType()
        if character == playerType then
            __TS__ArrayPush(players, player)
        end
    end
    return players
end
function ____exports.getPlayerIndexVanilla(self, playerToFind)
    local game = Game()
    local playerToFindHash = GetPtrHash(playerToFind)
    do
        local i = 0
        while i < game:GetNumPlayers() do
            do
                local player = Isaac.GetPlayer(i)
                if player == nil then
                    goto __continue55
                end
                local playerHash = GetPtrHash(player)
                if playerHash == playerToFindHash then
                    return i
                end
            end
            ::__continue55::
            i = i + 1
        end
    end
    return nil
end
function ____exports.getPlayerNumAllHearts(self, player)
    local hearts = player:GetHearts()
    local soulHearts = player:GetSoulHearts()
    local boneHearts = player:GetBoneHearts()
    local eternalHearts = player:GetEternalHearts()
    return ((hearts + soulHearts) + boneHearts) + eternalHearts
end
function ____exports.getPocketItems(self, player)
    local pocketItem = player:GetActiveItem(ActiveSlot.SLOT_POCKET)
    local hasPocketItem = pocketItem ~= CollectibleType.COLLECTIBLE_NULL
    local pocketItem2 = player:GetActiveItem(ActiveSlot.SLOT_POCKET2)
    local hasPocketItem2 = pocketItem2 ~= CollectibleType.COLLECTIBLE_NULL
    local maxPocketItems = player:GetMaxPocketItems()
    local pocketItems = {}
    local pocketItemIdentified = false
    local pocketItem2Identified = false
    do
        local slot = 0
        while slot < 4 do
            local card = player:GetCard(slot)
            local pill = player:GetPill(slot)
            if card ~= Card.CARD_NULL then
                __TS__ArrayPush(pocketItems, {type = PocketItemType.CARD, id = card})
            elseif pill ~= PillColor.PILL_NULL then
                __TS__ArrayPush(pocketItems, {type = PocketItemType.PILL, id = pill})
            elseif (hasPocketItem and (not hasPocketItem2)) and (not pocketItemIdentified) then
                pocketItemIdentified = true
                __TS__ArrayPush(pocketItems, {type = PocketItemType.ACTIVE_ITEM, id = pocketItem})
            elseif ((not hasPocketItem) and hasPocketItem2) and (not pocketItem2Identified) then
                pocketItem2Identified = true
                __TS__ArrayPush(pocketItems, {type = PocketItemType.DICE_BAG_DICE, id = pocketItem2})
            elseif hasPocketItem and hasPocketItem2 then
                __TS__ArrayPush(pocketItems, {type = PocketItemType.UNDETERMINABLE, id = 0})
            else
                __TS__ArrayPush(pocketItems, {type = PocketItemType.EMPTY, id = 0})
            end
            if (slot + 1) == maxPocketItems then
                break
            end
            slot = slot + 1
        end
    end
    return pocketItems
end
function ____exports.getTotalCharge(self, player, activeSlot)
    local activeCharge = player:GetActiveCharge(activeSlot)
    local batteryCharge = player:GetBatteryCharge(activeSlot)
    return activeCharge + batteryCharge
end
function ____exports.getTotalPlayerCollectibles(self, collectibleType)
    local numCollectibles = 0
    for ____, player in ipairs(
        ____exports.getPlayers(nil)
    ) do
        numCollectibles = numCollectibles + player:GetCollectibleNum(collectibleType)
    end
    return numCollectibles
end
function ____exports.hasLostCurse(self, player)
    local effects = player:GetEffects()
    return effects:HasNullEffect(NullItemID.ID_LOST_CURSE)
end
function ____exports.hasOpenActiveItemSlot(self, player)
    local character = player:GetPlayerType()
    if character == PlayerType.PLAYER_THESOUL_B then
        return false
    end
    local activeItemPrimary = player:GetActiveItem(ActiveSlot.SLOT_PRIMARY)
    local activeItemSecondary = player:GetActiveItem(ActiveSlot.SLOT_SECONDARY)
    local hasSchoolbag = player:HasCollectible(CollectibleType.COLLECTIBLE_SCHOOLBAG)
    if hasSchoolbag then
        return (activeItemPrimary == CollectibleType.COLLECTIBLE_NULL) or (activeItemSecondary == CollectibleType.COLLECTIBLE_NULL)
    end
    return activeItemPrimary == CollectibleType.COLLECTIBLE_NULL
end
function ____exports.hasOpenPocketItemSlot(self, player)
    local character = player:GetPlayerType()
    if character == PlayerType.PLAYER_THESOUL_B then
        return false
    end
    local pocketItems = ____exports.getPocketItems(nil, player)
    for ____, pocketItem in ipairs(pocketItems) do
        if pocketItem.type == PocketItemType.EMPTY then
            return true
        end
    end
    return false
end
function ____exports.hasOpenTrinketSlot(self, player)
    local character = player:GetPlayerType()
    if character == PlayerType.PLAYER_THESOUL_B then
        return false
    end
    local openTrinketSlot = ____exports.getOpenTrinketSlot(nil, player)
    return openTrinketSlot ~= nil
end
function ____exports.isFirstPlayer(self, player)
    return ____exports.getPlayerIndexVanilla(nil, player) == 0
end
function ____exports.isJacobOrEsau(self, player)
    local character = player:GetPlayerType()
    return (character == PlayerType.PLAYER_JACOB) or (character == PlayerType.PLAYER_ESAU)
end
function ____exports.isKeeper(self, player)
    local character = player:GetPlayerType()
    return (character == PlayerType.PLAYER_KEEPER) or (character == PlayerType.PLAYER_KEEPER_B)
end
function ____exports.isLost(self, player)
    local character = player:GetPlayerType()
    return (character == PlayerType.PLAYER_THELOST) or (character == PlayerType.PLAYER_THELOST_B)
end
function ____exports.removeCostumeCollectible(self, player, collectibleType)
    local itemConfig = Isaac.GetItemConfig()
    local itemConfigItem = itemConfig:GetCollectible(collectibleType)
    if itemConfigItem == nil then
        return
    end
    player:RemoveCostume(itemConfigItem)
end
function ____exports.removeCostumeTrinket(self, player, trinketType)
    local itemConfig = Isaac.GetItemConfig()
    local itemConfigTrinket = itemConfig:GetTrinket(trinketType)
    if itemConfigTrinket == nil then
        return
    end
    player:RemoveCostume(itemConfigTrinket)
end
function ____exports.removeDeadEyeMultiplier(self, player)
    do
        local i = 0
        while i < 100 do
            player:ClearDeadEyeCharge()
            i = i + 1
        end
    end
end
function ____exports.setBlindfold(self, player, enabled)
    local game = Game()
    local character = player:GetPlayerType()
    local challenge = Isaac.GetChallenge()
    if enabled then
        game.Challenge = Challenge.CHALLENGE_SOLAR_SYSTEM
        player:ChangePlayerType(character)
        game.Challenge = challenge
    else
        game.Challenge = Challenge.CHALLENGE_NULL
        player:ChangePlayerType(character)
        game.Challenge = challenge
        player:TryRemoveNullCostume(NullItemID.ID_BLINDFOLD)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.types.HealthType"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local HealthType = HealthType or ({})
HealthType.RED = 0
HealthType[HealthType.RED] = "RED"
HealthType.SOUL = 1
HealthType[HealthType.SOUL] = "SOUL"
HealthType.ETERNAL = 2
HealthType[HealthType.ETERNAL] = "ETERNAL"
HealthType.BLACK = 3
HealthType[HealthType.BLACK] = "BLACK"
HealthType.GOLDEN = 4
HealthType[HealthType.GOLDEN] = "GOLDEN"
HealthType.BONE = 5
HealthType[HealthType.BONE] = "BONE"
HealthType.ROTTEN = 6
HealthType[HealthType.ROTTEN] = "ROTTEN"
HealthType.MAX_HEARTS = 7
HealthType[HealthType.MAX_HEARTS] = "MAX_HEARTS"
____exports.default = HealthType
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.types.PocketItemType"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local PocketItemType = PocketItemType or ({})
PocketItemType.EMPTY = 0
PocketItemType[PocketItemType.EMPTY] = "EMPTY"
PocketItemType.CARD = 1
PocketItemType[PocketItemType.CARD] = "CARD"
PocketItemType.PILL = 2
PocketItemType[PocketItemType.PILL] = "PILL"
PocketItemType.ACTIVE_ITEM = 3
PocketItemType[PocketItemType.ACTIVE_ITEM] = "ACTIVE_ITEM"
PocketItemType.DICE_BAG_DICE = 4
PocketItemType[PocketItemType.DICE_BAG_DICE] = "DICE_BAG_DICE"
PocketItemType.UNDETERMINABLE = 5
PocketItemType[PocketItemType.UNDETERMINABLE] = "UNDETERMINABLE"
____exports.default = PocketItemType
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.revive"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getDeathAnimationName = ____player.getDeathAnimationName
local ____sprite = require("mod.node_modules.isaacscript-common.dist.functions.sprite")
local getFinalFrameOfAnimation = ____sprite.getFinalFrameOfAnimation
local ____trinkets = require("mod.node_modules.isaacscript-common.dist.functions.trinkets")
local giveTrinketsBack = ____trinkets.giveTrinketsBack
local temporarilyRemoveTrinkets = ____trinkets.temporarilyRemoveTrinkets
function ____exports.willMysteriousPaperRevive(self, player)
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    local sprite = player:GetSprite()
    local animation = getDeathAnimationName(nil, player)
    local deathAnimationFrames = getFinalFrameOfAnimation(nil, sprite, animation)
    local frameOfDeath = (gameFrameCount + deathAnimationFrames) + 1
    return (frameOfDeath % 4) == 3
end
function ____exports.willPlayerRevive(self, player)
    local trinketSituation = temporarilyRemoveTrinkets(nil, player, TrinketType.TRINKET_MYSTERIOUS_PAPER)
    local willRevive = player:WillPlayerRevive() or ((trinketSituation ~= nil) and ____exports.willMysteriousPaperRevive(nil, player))
    giveTrinketsBack(nil, player, trinketSituation)
    return willRevive
end
function ____exports.willReviveFromSpiritShackles(self, player)
    if not player:HasCollectible(CollectibleType.COLLECTIBLE_SPIRIT_SHACKLES) then
        return false
    end
    local effects = player:GetEffects()
    local spiritShacklesEnabled = not effects:HasNullEffect(NullItemID.ID_SPIRIT_SHACKLES_DISABLED)
    local playerInSoulForm = effects:HasNullEffect(NullItemID.ID_SPIRIT_SHACKLES_SOUL)
    return spiritShacklesEnabled and (not playerInSoulForm)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.sprite"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.getFinalFrameOfAnimation(self, sprite, animation)
    local currentAnimation = sprite:GetAnimation()
    local currentFrame = sprite:GetFrame()
    if (animation ~= nil) and (animation ~= currentAnimation) then
        sprite:SetAnimation(animation)
    end
    sprite:SetLastFrame()
    local finalFrame = sprite:GetFrame()
    if (animation ~= nil) and (animation ~= currentAnimation) then
        sprite:Play(currentAnimation, true)
    end
    sprite:SetFrame(currentFrame)
    return finalFrame
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.trinkets"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("mod.node_modules.isaacscript-common.dist.constants")
local GOLDEN_TRINKET_SHIFT = ____constants.GOLDEN_TRINKET_SHIFT
local ____util = require("mod.node_modules.isaacscript-common.dist.functions.util")
local copySet = ____util.copySet
function ____exports.temporarilyRemoveTrinkets(self, player, trinketType)
    if not player:HasTrinket(trinketType) then
        return nil
    end
    local trinket1 = player:GetTrinket(0)
    local trinket2 = player:GetTrinket(1)
    local numTrinkets = 0
    while player:HasTrinket(trinketType) do
        player:TryRemoveTrinket(trinketType)
        numTrinkets = numTrinkets + 1
    end
    local numSmeltedTrinkets = numTrinkets
    local trinketWasInSlot1 = (trinket1 == trinketType) or ((trinket1 + GOLDEN_TRINKET_SHIFT) == trinketType)
    if trinketWasInSlot1 then
        numSmeltedTrinkets = numSmeltedTrinkets - 1
    end
    local trinketWasInSlot2 = (trinket2 == trinketType) or ((trinket2 + GOLDEN_TRINKET_SHIFT) == trinketType)
    if trinketWasInSlot2 then
        numSmeltedTrinkets = numSmeltedTrinkets - 1
    end
    return {trinketTypeRemoved = trinketType, trinket1 = trinket1, trinket2 = trinket2, numSmeltedTrinkets = numSmeltedTrinkets}
end
function ____exports.giveTrinketsBack(self, player, trinketSituation)
    if trinketSituation == nil then
        return
    end
    local trinket1 = player:GetTrinket(0)
    local trinket2 = player:GetTrinket(1)
    if trinket1 ~= TrinketType.TRINKET_NULL then
        player:TryRemoveTrinket(trinket1)
    end
    if trinket2 ~= TrinketType.TRINKET_NULL then
        player:TryRemoveTrinket(trinket2)
    end
    do
        local i = 0
        while i < trinketSituation.numSmeltedTrinkets do
            player:AddTrinket(trinketSituation.trinketTypeRemoved, false)
            player:UseActiveItem(CollectibleType.COLLECTIBLE_SMELTER, UseFlag.USE_NOANIM)
            i = i + 1
        end
    end
    if trinketSituation.trinket1 ~= TrinketType.TRINKET_NULL then
        player:AddTrinket(trinketSituation.trinket1, false)
    end
    if trinketSituation.trinket2 ~= TrinketType.TRINKET_NULL then
        player:AddTrinket(trinketSituation.trinket2, false)
    end
end
function ____exports.getMaxTrinketID(self)
    local itemConfig = Isaac.GetItemConfig()
    return itemConfig:GetTrinkets().Size - 1
end
local TRINKET_SET = __TS__New(Set)
local function initSet(self)
    local itemConfig = Isaac.GetItemConfig()
    do
        local trinketType = 1
        while trinketType <= ____exports.getMaxTrinketID(nil) do
            local itemConfigTrinket = itemConfig:GetTrinket(trinketType)
            if itemConfigTrinket ~= nil then
                TRINKET_SET:add(trinketType)
            end
            trinketType = trinketType + 1
        end
    end
end
function ____exports.getTrinketSet(self)
    if TRINKET_SET.size == 0 then
        initSet(nil)
    end
    return copySet(nil, TRINKET_SET)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.rooms"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("mod.node_modules.isaacscript-common.dist.constants")
local GENESIS_ROOM_VARIANT = ____constants.GENESIS_ROOM_VARIANT
local MAX_ROOM_INDEX = ____constants.MAX_ROOM_INDEX
function ____exports.getRoomIndex(self)
    local game = Game()
    local level = game:GetLevel()
    local roomIndex = level:GetCurrentRoomIndex()
    if roomIndex < 0 then
        return roomIndex
    end
    local roomDesc = level:GetCurrentRoomDesc()
    return roomDesc.SafeGridIndex
end
local IT_LIVES_ROOM_VARIANTS = {1090, 1091, 1092, 1093, 1094}
local BLUE_BABY_ROOM_VARIANTS = {3390, 3391, 3392, 3393}
local LAMB_ROOM_VARIANTS = {5130}
function ____exports.changeRoom(self, roomIndex)
    local game = Game()
    local level = game:GetLevel()
    level.LeaveDoor = -1
    game:ChangeRoom(roomIndex)
end
function ____exports.getCurrentDimension(self)
    local game = Game()
    local level = game:GetLevel()
    local startingRoomIndex = level:GetStartingRoomIndex()
    local startingRoomDesc = level:GetRoomByIdx(startingRoomIndex, -1)
    local startingRoomHash = GetPtrHash(startingRoomDesc)
    do
        local dimension = 0
        while dimension <= 2 do
            local dimensionRoomDesc = level:GetRoomByIdx(startingRoomIndex, dimension)
            local dimensionRoomHash = GetPtrHash(dimensionRoomDesc)
            if dimensionRoomHash == startingRoomHash then
                return dimension
            end
            dimension = dimension + 1
        end
    end
    error(
        "Failed to get the current dimension using the starting room index of: " .. tostring(startingRoomIndex)
    )
    return 0
end
function ____exports.getRoomData(self)
    local game = Game()
    local level = game:GetLevel()
    local roomIndex = ____exports.getRoomIndex(nil)
    local roomDesc = level:GetRoomByIdx(roomIndex)
    return roomDesc.Data
end
function ____exports.getRoomDataType(self)
    local roomData = ____exports.getRoomData(nil)
    if roomData == nil then
        return -1
    end
    return roomData.Type
end
function ____exports.getRoomIndexesForType(self, roomType)
    local game = Game()
    local level = game:GetLevel()
    local roomIndexes = __TS__New(Set)
    do
        local i = 0
        while i <= MAX_ROOM_INDEX do
            local room = level:GetRoomByIdx(i)
            if ((room ~= nil) and (room.Data ~= nil)) and (room.Data.Type == roomType) then
                roomIndexes:add(room.SafeGridIndex)
            end
            i = i + 1
        end
    end
    return roomIndexes
end
function ____exports.getRoomName(self)
    local roomData = ____exports.getRoomData(nil)
    if roomData == nil then
        return "Unknown"
    end
    return roomData.Name
end
function ____exports.getRoomStageID(self)
    local roomData = ____exports.getRoomData(nil)
    if roomData == nil then
        return -1
    end
    return roomData.StageID
end
function ____exports.getRoomSubType(self)
    local roomData = ____exports.getRoomData(nil)
    if roomData == nil then
        return -1
    end
    return roomData.Subtype
end
function ____exports.getRoomVariant(self)
    local roomData = ____exports.getRoomData(nil)
    if roomData == nil then
        return -1
    end
    return roomData.Variant
end
function ____exports.gridToPos(self, x, y)
    local game = Game()
    local room = game:GetRoom()
    x = x + 1
    y = y + 1
    local gridIndex = (y * room:GetGridWidth()) + x
    return room:GetGridPosition(gridIndex)
end
function ____exports.in2x1Room(self)
    local game = Game()
    local room = game:GetRoom()
    local roomShape = room:GetRoomShape()
    return (roomShape == RoomShape.ROOMSHAPE_1x2) or (roomShape == RoomShape.ROOMSHAPE_2x1)
end
function ____exports.inAngelShop(self)
    local game = Game()
    local room = game:GetRoom()
    local roomType = room:GetType()
    local roomSubType = ____exports.getRoomSubType(nil)
    return (roomType == RoomType.ROOM_ANGEL) and (roomSubType == 1)
end
function ____exports.inBeastRoom(self)
    local roomIndex = ____exports.getRoomIndex(nil)
    local roomSubType = ____exports.getRoomSubType(nil)
    return (roomIndex == GridRooms.ROOM_DUNGEON_IDX) and (roomSubType == 4)
end
function ____exports.inBlueBabyRoom(self)
    local roomStageID = ____exports.getRoomStageID(nil)
    local roomVariant = ____exports.getRoomVariant(nil)
    return (roomStageID == 0) and __TS__ArrayIncludes(BLUE_BABY_ROOM_VARIANTS, roomVariant)
end
function ____exports.inCrawlspace(self)
    local roomIndex = ____exports.getRoomIndex(nil)
    local roomSubType = ____exports.getRoomSubType(nil)
    return (roomIndex == GridRooms.ROOM_DUNGEON_IDX) and (roomSubType ~= 4)
end
function ____exports.inDeathCertificateArea(self)
    local roomStageID = ____exports.getRoomStageID(nil)
    local roomSubType = ____exports.getRoomSubType(nil)
    return (roomStageID == 35) and ((roomSubType == 33) or (roomSubType == 33))
end
function ____exports.inDimension(self, dimension)
    return dimension == ____exports.getCurrentDimension(nil)
end
function ____exports.inLRoom(self)
    local game = Game()
    local room = game:GetRoom()
    local roomShape = room:GetRoomShape()
    return (((roomShape == RoomShape.ROOMSHAPE_LTL) or (roomShape == RoomShape.ROOMSHAPE_LTR)) or (roomShape == RoomShape.ROOMSHAPE_LBL)) or (roomShape == RoomShape.ROOMSHAPE_LBR)
end
function ____exports.inLambRoom(self)
    local roomStageID = ____exports.getRoomStageID(nil)
    local roomVariant = ____exports.getRoomVariant(nil)
    return (roomStageID == 0) and __TS__ArrayIncludes(LAMB_ROOM_VARIANTS, roomVariant)
end
function ____exports.inGenesisRoom(self)
    local game = Game()
    local room = game:GetRoom()
    local roomType = room:GetType()
    local roomVariant = ____exports.getRoomVariant(nil)
    return (roomType == RoomType.ROOM_ISAACS) or (roomVariant == GENESIS_ROOM_VARIANT)
end
function ____exports.inItLivesRoom(self)
    local roomStageID = ____exports.getRoomStageID(nil)
    local roomVariant = ____exports.getRoomVariant(nil)
    return (roomStageID == 0) and __TS__ArrayIncludes(IT_LIVES_ROOM_VARIANTS, roomVariant)
end
function ____exports.inStartingRoom(self)
    local game = Game()
    local level = game:GetLevel()
    local startingRoomIndex = level:GetStartingRoomIndex()
    local roomIndex = ____exports.getRoomIndex(nil)
    return roomIndex == startingRoomIndex
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.stage"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.onRepentanceStage(self)
    local game = Game()
    local level = game:GetLevel()
    local stageType = level:GetStageType()
    return (stageType == StageType.STAGETYPE_REPENTANCE) or (stageType == StageType.STAGETYPE_REPENTANCE_B)
end
function ____exports.getEffectiveStage(self)
    local game = Game()
    local level = game:GetLevel()
    local stage = level:GetStage()
    if ____exports.onRepentanceStage(nil) then
        return stage + 1
    end
    return stage
end
function ____exports.onCathedral(self)
    local game = Game()
    local level = game:GetLevel()
    local stage = level:GetStage()
    local stageType = level:GetStageType()
    return (stage == 10) and (stageType == 1)
end
function ____exports.onChest(self)
    local game = Game()
    local level = game:GetLevel()
    local stage = level:GetStage()
    local stageType = level:GetStageType()
    return (stage == 11) and (stageType == 1)
end
function ____exports.onDarkRoom(self)
    local game = Game()
    local level = game:GetLevel()
    local stage = level:GetStage()
    local stageType = level:GetStageType()
    return (stage == 11) and (stageType == 0)
end
function ____exports.onFinalFloor(self)
    local game = Game()
    local level = game:GetLevel()
    local stage = level:GetStage()
    return (((stage == 11) or (stage == 12)) or (stage == 13)) or ((stage == 8) and ____exports.onRepentanceStage(nil))
end
function ____exports.onSheol(self)
    local game = Game()
    local level = game:GetLevel()
    local stage = level:GetStage()
    local stageType = level:GetStageType()
    return (stage == 10) and (stageType == 0)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.tears"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.getFireDelay(self, tearsStat)
    return math.max((30 / tearsStat) - 1, -0.9999)
end
function ____exports.getTearsStat(self, fireDelay)
    return 30 / (fireDelay + 1)
end
function ____exports.addTearsStat(self, player, tearsStat)
    local existingTearsStat = ____exports.getTearsStat(nil, player.MaxFireDelay)
    local newTearsStat = existingTearsStat + tearsStat
    local newMaxFireDelay = ____exports.getFireDelay(nil, newTearsStat)
    player.MaxFireDelay = newMaxFireDelay
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.transformations"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____transformationMap = require("mod.node_modules.isaacscript-common.dist.transformationMap")
local ITEM_TO_TRANSFORMATION_MAP = ____transformationMap.ITEM_TO_TRANSFORMATION_MAP
local TRANSFORMATIONS_NOT_BASED_ON_ITEMS = ____transformationMap.TRANSFORMATIONS_NOT_BASED_ON_ITEMS
local TRANSFORMATION_TO_ITEMS_MAP = ____transformationMap.TRANSFORMATION_TO_ITEMS_MAP
local ____util = require("mod.node_modules.isaacscript-common.dist.functions.util")
local copySet = ____util.copySet
function ____exports.getPlayerNumTransformationCollectibles(self, player, playerForm)
    if TRANSFORMATIONS_NOT_BASED_ON_ITEMS:has(playerForm) then
        error(
            ("The transformation of " .. tostring(playerForm)) .. " cannot be tracked by this function."
        )
    end
    local itemsForTransformation = TRANSFORMATION_TO_ITEMS_MAP:get(playerForm)
    if itemsForTransformation == nil then
        error(
            ("The transformation of " .. tostring(playerForm)) .. " is not a valid value of the PlayerForm enum."
        )
    end
    local numCollectibles = 0
    for ____, collectibleType in __TS__Iterator(
        itemsForTransformation:values()
    ) do
        numCollectibles = numCollectibles + player:GetCollectibleNum(collectibleType)
    end
    return numCollectibles
end
function ____exports.getTransformationsForItem(self, collectibleType)
    local transformations = ITEM_TO_TRANSFORMATION_MAP:get(collectibleType)
    return ((transformations == nil) and __TS__New(Set)) or copySet(nil, transformations)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.transformationMap"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local initMaps
local ____collectibles = require("mod.node_modules.isaacscript-common.dist.functions.collectibles")
local collectibleHasTag = ____collectibles.collectibleHasTag
local getMaxCollectibleID = ____collectibles.getMaxCollectibleID
function initMaps(self)
    for ____, playerForm in __TS__Iterator(
        ____exports.TRANSFORMATION_TO_TAG_MAP:keys()
    ) do
        ____exports.TRANSFORMATION_TO_ITEMS_MAP:set(
            playerForm,
            __TS__New(Set)
        )
    end
    do
        local collectibleType = 1
        while collectibleType <= getMaxCollectibleID(nil) do
            for ____, ____value in __TS__Iterator(
                ____exports.TRANSFORMATION_TO_TAG_MAP:entries()
            ) do
                local playerForm
                playerForm = ____value[1]
                local tag
                tag = ____value[2]
                do
                    if not collectibleHasTag(nil, collectibleType, tag) then
                        goto __continue5
                    end
                    local items = ____exports.TRANSFORMATION_TO_ITEMS_MAP:get(playerForm)
                    if items == nil then
                        error(
                            "Failed to get the items for transformation: " .. tostring(playerForm)
                        )
                    end
                    items:add(collectibleType)
                    local transformations = ____exports.ITEM_TO_TRANSFORMATION_MAP:get(collectibleType)
                    if transformations == nil then
                        transformations = __TS__New(Set)
                        ____exports.ITEM_TO_TRANSFORMATION_MAP:set(collectibleType, transformations)
                    end
                    transformations:add(playerForm)
                end
                ::__continue5::
            end
            collectibleType = collectibleType + 1
        end
    end
end
____exports.TRANSFORMATION_TO_TAG_MAP = __TS__New(Map, {{PlayerForm.PLAYERFORM_GUPPY, 32}, {PlayerForm.PLAYERFORM_LORD_OF_THE_FLIES, 64}, {PlayerForm.PLAYERFORM_MUSHROOM, 256}, {PlayerForm.PLAYERFORM_ANGEL, 1024}, {PlayerForm.PLAYERFORM_BOB, 128}, {PlayerForm.PLAYERFORM_DRUGS, 2}, {PlayerForm.PLAYERFORM_MOM, 4}, {PlayerForm.PLAYERFORM_BABY, 512}, {PlayerForm.PLAYERFORM_EVIL_ANGEL, 2048}, {PlayerForm.PLAYERFORM_POOP, 4096}, {PlayerForm.PLAYERFORM_BOOK_WORM, 8192}, {PlayerForm.PLAYERFORM_SPIDERBABY, 16384}})
____exports.TRANSFORMATIONS_NOT_BASED_ON_ITEMS = __TS__New(Set, {PlayerForm.PLAYERFORM_ADULTHOOD, PlayerForm.PLAYERFORM_STOMPY, PlayerForm.PLAYERFORM_FLIGHT})
____exports.TRANSFORMATION_TO_ITEMS_MAP = __TS__New(Map)
____exports.ITEM_TO_TRANSFORMATION_MAP = __TS__New(Map)
initMaps(nil)
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.functions.ui"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local SCREEN_SIZE_BETWEEN_RENDER_SURFACES
function ____exports.getScreenBottomRightPos(self)
    local game = Game()
    local room = game:GetRoom()
    local renderSurfaceTopLeft = room:GetRenderSurfaceTopLeft()
    local doubleRenderSurfaceTopLeft = renderSurfaceTopLeft * 2
    return doubleRenderSurfaceTopLeft + SCREEN_SIZE_BETWEEN_RENDER_SURFACES
end
local GRID_ENTITIES_BETWEEN_RENDER_SURFACES = Vector(17, 11)
local GRID_ENTITY_RENDER_SIZE = Vector(26, 26)
SCREEN_SIZE_BETWEEN_RENDER_SURFACES = GRID_ENTITY_RENDER_SIZE * GRID_ENTITIES_BETWEEN_RENDER_SURFACES
function ____exports.getHUDOffsetVector(self)
    local defaultVector = Vector.Zero
    if ((ModConfigMenu == nil) or (ModConfigMenu.Config == nil)) or (ModConfigMenu.Config.General == nil) then
        return defaultVector
    end
    local hudOffset = ModConfigMenu.Config.General.HudOffset
    if hudOffset == nil then
        return defaultVector
    end
    if ((type(hudOffset) ~= "number") or (hudOffset < 1)) or (hudOffset > 10) then
        return defaultVector
    end
    local x = hudOffset * 2
    local y = hudOffset
    if y >= 4 then
        y = y + 1
    end
    if y >= 9 then
        y = y + 1
    end
    return Vector(x, y)
end
function ____exports.getScreenTopLeftPos(self)
    return Vector.Zero
end
function ____exports.getScreenTopRightPos(self)
    local bottomRight = ____exports.getScreenBottomRightPos(nil)
    return Vector(bottomRight.X, 0)
end
function ____exports.getScreenBottomLeftPos(self)
    local bottomRight = ____exports.getScreenBottomRightPos(nil)
    return Vector(0, bottomRight.Y)
end
function ____exports.getScreenCenterPos(self)
    local bottomRight = ____exports.getScreenBottomRightPos(nil)
    return bottomRight / 2
end
function ____exports.getVisibleHearts(self, player)
    local effectiveMaxHearts = player:GetEffectiveMaxHearts()
    local soulHearts = player:GetSoulHearts()
    local boneHearts = player:GetBoneHearts()
    local maxHearts = math.max(effectiveMaxHearts, boneHearts * 2)
    local visibleHearts = math.ceil((maxHearts + soulHearts) / 2)
    if visibleHearts < 1 then
        visibleHearts = 1
    end
    return visibleHearts
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.types.ModCallbacksCustom"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ModCallbacksCustom = ModCallbacksCustom or ({})
ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED = 0
ModCallbacksCustom[ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED] = "MC_POST_GAME_STARTED_REORDERED"
ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED = 1
ModCallbacksCustom[ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED] = "MC_POST_NEW_LEVEL_REORDERED"
ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED = 2
ModCallbacksCustom[ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED] = "MC_POST_NEW_ROOM_REORDERED"
ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED = 3
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED] = "MC_POST_PLAYER_INIT_REORDERED"
ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED = 4
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED] = "MC_POST_PLAYER_UPDATE_REORDERED"
ModCallbacksCustom.MC_POST_PLAYER_RENDER_REORDERED = 5
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PLAYER_RENDER_REORDERED] = "MC_POST_PLAYER_RENDER_REORDERED"
ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE = 6
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE] = "MC_POST_PLAYER_INIT_LATE"
ModCallbacksCustom.MC_POST_PICKUP_INIT_LATE = 7
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PICKUP_INIT_LATE] = "MC_POST_PICKUP_INIT_LATE"
ModCallbacksCustom.MC_POST_LASER_INIT_LATE = 8
ModCallbacksCustom[ModCallbacksCustom.MC_POST_LASER_INIT_LATE] = "MC_POST_LASER_INIT_LATE"
ModCallbacksCustom.MC_POST_PICKUP_COLLECT = 9
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PICKUP_COLLECT] = "MC_POST_PICKUP_COLLECT"
ModCallbacksCustom.MC_PRE_ITEM_PICKUP = 10
ModCallbacksCustom[ModCallbacksCustom.MC_PRE_ITEM_PICKUP] = "MC_PRE_ITEM_PICKUP"
ModCallbacksCustom.MC_POST_ITEM_PICKUP = 11
ModCallbacksCustom[ModCallbacksCustom.MC_POST_ITEM_PICKUP] = "MC_POST_ITEM_PICKUP"
ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE = 12
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE] = "MC_POST_PLAYER_CHANGE_TYPE"
ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH = 13
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH] = "MC_POST_PLAYER_CHANGE_HEALTH"
ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE = 14
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE] = "MC_POST_PLAYER_FATAL_DAMAGE"
ModCallbacksCustom.MC_PRE_CUSTOM_REVIVE = 15
ModCallbacksCustom[ModCallbacksCustom.MC_PRE_CUSTOM_REVIVE] = "MC_PRE_CUSTOM_REVIVE"
ModCallbacksCustom.MC_POST_CUSTOM_REVIVE = 16
ModCallbacksCustom[ModCallbacksCustom.MC_POST_CUSTOM_REVIVE] = "MC_POST_CUSTOM_REVIVE"
ModCallbacksCustom.MC_POST_FLIP = 17
ModCallbacksCustom[ModCallbacksCustom.MC_POST_FLIP] = "MC_POST_FLIP"
ModCallbacksCustom.MC_POST_FIRST_FLIP = 18
ModCallbacksCustom[ModCallbacksCustom.MC_POST_FIRST_FLIP] = "MC_POST_FIRST_FLIP"
ModCallbacksCustom.MC_POST_ESAU_JR = 19
ModCallbacksCustom[ModCallbacksCustom.MC_POST_ESAU_JR] = "MC_POST_ESAU_JR"
ModCallbacksCustom.MC_POST_FIRST_ESAU_JR = 20
ModCallbacksCustom[ModCallbacksCustom.MC_POST_FIRST_ESAU_JR] = "MC_POST_FIRST_ESAU_JR"
ModCallbacksCustom.MC_POST_TRANSFORMATION = 21
ModCallbacksCustom[ModCallbacksCustom.MC_POST_TRANSFORMATION] = "MC_POST_TRANSFORMATION"
ModCallbacksCustom.MC_POST_PURCHASE = 22
ModCallbacksCustom[ModCallbacksCustom.MC_POST_PURCHASE] = "MC_POST_PURCHASE"
ModCallbacksCustom.MC_POST_SACRIFICE = 23
ModCallbacksCustom[ModCallbacksCustom.MC_POST_SACRIFICE] = "MC_POST_SACRIFICE"
ModCallbacksCustom.MC_POST_CURSED_TELEPORT = 24
ModCallbacksCustom[ModCallbacksCustom.MC_POST_CURSED_TELEPORT] = "MC_POST_CURSED_TELEPORT"
ModCallbacksCustom.MC_POST_SLOT_INIT = 25
ModCallbacksCustom[ModCallbacksCustom.MC_POST_SLOT_INIT] = "MC_POST_SLOT_INIT"
ModCallbacksCustom.MC_POST_SLOT_UPDATE = 26
ModCallbacksCustom[ModCallbacksCustom.MC_POST_SLOT_UPDATE] = "MC_POST_SLOT_UPDATE"
ModCallbacksCustom.MC_POST_SLOT_RENDER = 27
ModCallbacksCustom[ModCallbacksCustom.MC_POST_SLOT_RENDER] = "MC_POST_SLOT_RENDER"
ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT = 28
ModCallbacksCustom[ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT] = "MC_POST_GRID_ENTITY_INIT"
ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE = 29
ModCallbacksCustom[ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE] = "MC_POST_GRID_ENTITY_UPDATE"
ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE = 30
ModCallbacksCustom[ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE] = "MC_POST_GRID_ENTITY_REMOVE"
____exports.default = ModCallbacksCustom
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.types.ModUpgraded"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local getCallbackName
local postCursedTeleport = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postCursedTeleport")
local postCustomRevive = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postCustomRevive")
local postEsauJr = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postEsauJr")
local postFirstEsauJr = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postFirstEsauJr")
local postFirstFlip = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postFirstFlip")
local postFlip = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postFlip")
local postGameStartedReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGameStartedReordered")
local postGridEntityInit = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGridEntityInit")
local postGridEntityRemove = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGridEntityRemove")
local postGridEntityUpdate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGridEntityUpdate")
local postItemPickup = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postItemPickup")
local postLaserInitLate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postLaserInitLate")
local postNewLevelReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postNewLevelReordered")
local postNewRoomReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postNewRoomReordered")
local postPickupCollect = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPickupCollect")
local postPickupInitLate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPickupInitLate")
local postPlayerChangeHealth = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerChangeHealth")
local postPlayerChangeType = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerChangeType")
local postPlayerFatalDamage = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerFatalDamage")
local postPlayerInitLate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerInitLate")
local postPlayerInitReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerInitReordered")
local postPlayerRenderReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerRenderReordered")
local postPlayerUpdateReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerUpdateReordered")
local postPurchase = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPurchase")
local postSacrifice = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSacrifice")
local postSlotInit = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSlotInit")
local postSlotRender = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSlotRender")
local postSlotUpdate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSlotUpdate")
local postTransformation = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postTransformation")
local preCustomRevive = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.preCustomRevive")
local preItemPickup = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.preItemPickup")
local ____log = require("mod.node_modules.isaacscript-common.dist.functions.log")
local getDebugPrependString = ____log.getDebugPrependString
local ____util = require("mod.node_modules.isaacscript-common.dist.functions.util")
local ensureAllCases = ____util.ensureAllCases
local ____ModCallbacksCustom = require("mod.node_modules.isaacscript-common.dist.types.ModCallbacksCustom")
local ModCallbacksCustom = ____ModCallbacksCustom.default
function getCallbackName(self, callbackID)
    for ____, ____value in ipairs(
        __TS__ObjectEntries(ModCallbacks)
    ) do
        local key
        key = ____value[1]
        local value
        value = ____value[2]
        if value == callbackID then
            return key
        end
    end
    return "MC_UNKNOWN"
end
____exports.default = (function()
    ____exports.default = __TS__Class()
    local ModUpgraded = ____exports.default
    ModUpgraded.name = "ModUpgraded"
    function ModUpgraded.prototype.____constructor(self, mod, verbose)
        self.Mod = mod
        self.Verbose = verbose
        self.Name = mod.Name
    end
    function ModUpgraded.prototype.AddCallback(self, callbackID, ...)
        local args = {...}
        if self.Verbose then
            local callback = args[1]
            local optionalArg = args[2]
            local callbackName = getCallbackName(nil, callbackID)
            local debugMsg = getDebugPrependString(nil, callbackName)
            local function callbackWithLogger(____, ...)
                Isaac.DebugString(debugMsg .. " - START")
                local value = callback(nil, ...)
                Isaac.DebugString(
                    (debugMsg .. " - END - ") .. tostring(value)
                )
                return value
            end
            self.Mod:AddCallback(callbackID, callbackWithLogger, optionalArg)
        else
            self.Mod:AddCallback(
                callbackID,
                __TS__Spread(args)
            )
        end
    end
    function ModUpgraded.prototype.HasData(self)
        return self.Mod:HasData()
    end
    function ModUpgraded.prototype.LoadData(self)
        return self.Mod:LoadData()
    end
    function ModUpgraded.prototype.RemoveCallback(self, callbackID, callback)
        self.Mod:RemoveCallback(callbackID, callback)
    end
    function ModUpgraded.prototype.RemoveData(self)
        self.Mod:RemoveData()
    end
    function ModUpgraded.prototype.SaveData(self, data)
        self.Mod:SaveData(data)
    end
    function ModUpgraded.prototype.AddCallbackCustom(self, callbackID, ...)
        local args = {...}
        repeat
            local ____switch14 = callbackID
            local ____cond14 = ____switch14 == ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED
            if ____cond14 then
                do
                    postGameStartedReordered:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED)
            if ____cond14 then
                do
                    postNewLevelReordered:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED)
            if ____cond14 then
                do
                    postNewRoomReordered:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED)
            if ____cond14 then
                do
                    postPlayerInitReordered:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED)
            if ____cond14 then
                do
                    postPlayerUpdateReordered:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PLAYER_RENDER_REORDERED)
            if ____cond14 then
                do
                    postPlayerRenderReordered:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE)
            if ____cond14 then
                do
                    postPlayerInitLate:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PICKUP_INIT_LATE)
            if ____cond14 then
                do
                    postPickupInitLate:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_LASER_INIT_LATE)
            if ____cond14 then
                do
                    postLaserInitLate:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PICKUP_COLLECT)
            if ____cond14 then
                do
                    postPickupCollect:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_PRE_ITEM_PICKUP)
            if ____cond14 then
                do
                    preItemPickup:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_ITEM_PICKUP)
            if ____cond14 then
                do
                    postItemPickup:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE)
            if ____cond14 then
                do
                    postPlayerChangeType:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH)
            if ____cond14 then
                do
                    postPlayerChangeHealth:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE)
            if ____cond14 then
                do
                    postPlayerFatalDamage:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_PRE_CUSTOM_REVIVE)
            if ____cond14 then
                do
                    preCustomRevive:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_CUSTOM_REVIVE)
            if ____cond14 then
                do
                    postCustomRevive:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_FLIP)
            if ____cond14 then
                do
                    postFlip:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_FIRST_FLIP)
            if ____cond14 then
                do
                    postFirstFlip:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_ESAU_JR)
            if ____cond14 then
                do
                    postEsauJr:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_FIRST_ESAU_JR)
            if ____cond14 then
                do
                    postFirstEsauJr:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_TRANSFORMATION)
            if ____cond14 then
                do
                    postTransformation:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_PURCHASE)
            if ____cond14 then
                do
                    postPurchase:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_SACRIFICE)
            if ____cond14 then
                do
                    postSacrifice:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_CURSED_TELEPORT)
            if ____cond14 then
                do
                    postCursedTeleport:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_SLOT_INIT)
            if ____cond14 then
                do
                    postSlotInit:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_SLOT_UPDATE)
            if ____cond14 then
                do
                    postSlotUpdate:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_SLOT_RENDER)
            if ____cond14 then
                do
                    postSlotRender:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT)
            if ____cond14 then
                do
                    postGridEntityInit:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE)
            if ____cond14 then
                do
                    postGridEntityUpdate:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            ____cond14 = ____cond14 or (____switch14 == ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE)
            if ____cond14 then
                do
                    postGridEntityRemove:register(
                        table.unpack(args)
                    )
                    break
                end
            end
            do
                do
                    ensureAllCases(nil, callbackID)
                    error(
                        ("The custom callback ID of \"" .. tostring(callbackID)) .. "\" is not valid."
                    )
                end
            end
        until true
    end
    return ModUpgraded
end)()
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postCursedTeleport"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil, player)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postCustomRevive"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, revivalType)
    __TS__ArrayPush(subscriptions, {callback, revivalType})
end
function ____exports.fire(self, player, revivalType)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local callbackRevivalType
        callbackRevivalType = ____value[2]
        do
            if (callbackRevivalType ~= nil) and (callbackRevivalType ~= revivalType) then
                goto __continue5
            end
            callback(nil, player, revivalType)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postEsauJr"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil, player)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postFirstEsauJr"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil, player)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postFirstFlip"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil, player)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postFlip"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil, player)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGridEntityInit"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, gridEntityType)
    __TS__ArrayPush(subscriptions, {callback, gridEntityType})
end
function ____exports.fire(self, gridEntity)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local gridEntityType
        gridEntityType = ____value[2]
        do
            if (gridEntityType ~= nil) and (gridEntityType ~= gridEntity:GetType()) then
                goto __continue5
            end
            callback(nil, gridEntity)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGridEntityRemove"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, gridEntityType)
    __TS__ArrayPush(subscriptions, {callback, gridEntityType})
end
function ____exports.fire(self, gridIndex, gridEntityType)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local callbackGridEntityType
        callbackGridEntityType = ____value[2]
        do
            if (callbackGridEntityType ~= nil) and (callbackGridEntityType ~= gridEntityType) then
                goto __continue5
            end
            callback(nil, gridIndex, gridEntityType)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGridEntityUpdate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, gridEntityType)
    __TS__ArrayPush(subscriptions, {callback, gridEntityType})
end
function ____exports.fire(self, gridEntity)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local gridEntityType
        gridEntityType = ____value[2]
        do
            if (gridEntityType ~= nil) and (gridEntityType ~= gridEntity:GetType()) then
                goto __continue5
            end
            callback(nil, gridEntity)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postItemPickup"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, itemType, itemID)
    __TS__ArrayPush(subscriptions, {callback, itemType, itemID})
end
function ____exports.fire(self, player, pickingUpItem)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local itemType
        itemType = ____value[2]
        local itemID
        itemID = ____value[3]
        do
            if (itemType ~= nil) and (itemType ~= pickingUpItem.type) then
                goto __continue5
            end
            if (itemID ~= nil) and (itemID ~= pickingUpItem.id) then
                goto __continue5
            end
            callback(nil, player, pickingUpItem)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postLaserInitLate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, laserVariant)
    __TS__ArrayPush(subscriptions, {callback, laserVariant})
end
function ____exports.fire(self, laser)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local laserVariant
        laserVariant = ____value[2]
        do
            if (laserVariant ~= nil) and (laserVariant ~= laser.Variant) then
                goto __continue5
            end
            callback(nil, laser)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPickupCollect"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, pickupVariant)
    __TS__ArrayPush(subscriptions, {callback, pickupVariant})
end
function ____exports.fire(self, pickup, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local pickupVariant
        pickupVariant = ____value[2]
        do
            if (pickupVariant ~= nil) and (pickupVariant ~= pickup.Variant) then
                goto __continue5
            end
            callback(nil, pickup, player)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPickupInitLate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, pickupVariant)
    __TS__ArrayPush(subscriptions, {callback, pickupVariant})
end
function ____exports.fire(self, pickup)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local pickupVariant
        pickupVariant = ____value[2]
        do
            if (pickupVariant ~= nil) and (pickupVariant ~= pickup.Variant) then
                goto __continue5
            end
            callback(nil, pickup)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerChangeHealth"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, playerVariant)
    __TS__ArrayPush(subscriptions, {callback, playerVariant})
end
function ____exports.fire(self, player, healthType, amount)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local playerVariant
        playerVariant = ____value[2]
        do
            if (playerVariant ~= nil) and (playerVariant ~= player.Variant) then
                goto __continue5
            end
            callback(nil, player, healthType, amount)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerChangeType"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil, player)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerFatalDamage"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, playerVariant)
    __TS__ArrayPush(subscriptions, {callback, playerVariant})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local playerVariant
        playerVariant = ____value[2]
        do
            if (playerVariant ~= nil) and (playerVariant ~= player.Variant) then
                goto __continue5
            end
            local shouldSustainDeath = callback(nil, player)
            if shouldSustainDeath ~= nil then
                return shouldSustainDeath
            end
        end
        ::__continue5::
    end
    return nil
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerInitLate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, playerVariant)
    __TS__ArrayPush(subscriptions, {callback, playerVariant})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local playerVariant
        playerVariant = ____value[2]
        do
            if (playerVariant ~= nil) and (playerVariant ~= player.Variant) then
                goto __continue5
            end
            callback(nil, player)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerInitReordered"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, playerVariant)
    __TS__ArrayPush(subscriptions, {callback, playerVariant})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local playerVariant
        playerVariant = ____value[2]
        do
            if (playerVariant ~= nil) and (playerVariant ~= player.Variant) then
                goto __continue5
            end
            callback(nil, player)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerRenderReordered"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, playerVariant)
    __TS__ArrayPush(subscriptions, {callback, playerVariant})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local playerVariant
        playerVariant = ____value[2]
        do
            if (playerVariant ~= nil) and (playerVariant ~= player.Variant) then
                goto __continue5
            end
            callback(nil, player)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerUpdateReordered"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, playerVariant)
    __TS__ArrayPush(subscriptions, {callback, playerVariant})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local playerVariant
        playerVariant = ____value[2]
        do
            if (playerVariant ~= nil) and (playerVariant ~= player.Variant) then
                goto __continue5
            end
            callback(nil, player)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPurchase"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, pickupVariant, pickupSubType)
    __TS__ArrayPush(subscriptions, {callback, pickupVariant, pickupSubType})
end
function ____exports.fire(self, player, pickupVariant, pickupSubType, pickupPrice)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil, player, pickupVariant, pickupSubType, pickupPrice)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSacrifice"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self, player, numSacrifices)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        callback(nil, player, numSacrifices)
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSlotInit"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, slotVariant)
    __TS__ArrayPush(subscriptions, {callback, slotVariant})
end
function ____exports.fire(self, slot)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local slotVariant
        slotVariant = ____value[2]
        do
            if (slotVariant ~= nil) and (slotVariant ~= slot.Variant) then
                goto __continue5
            end
            callback(nil, slot)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSlotRender"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, slotVariant)
    __TS__ArrayPush(subscriptions, {callback, slotVariant})
end
function ____exports.fire(self, slot)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local slotVariant
        slotVariant = ____value[2]
        do
            if (slotVariant ~= nil) and (slotVariant ~= slot.Variant) then
                goto __continue5
            end
            callback(nil, slot)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSlotUpdate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, slotVariant)
    __TS__ArrayPush(subscriptions, {callback, slotVariant})
end
function ____exports.fire(self, slot)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local slotVariant
        slotVariant = ____value[2]
        do
            if (slotVariant ~= nil) and (slotVariant ~= slot.Variant) then
                goto __continue5
            end
            callback(nil, slot)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postTransformation"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, playerForm)
    __TS__ArrayPush(subscriptions, {callback, playerForm})
end
function ____exports.fire(self, player, playerForm, hasForm)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local callbackPlayerForm
        callbackPlayerForm = ____value[2]
        do
            if (callbackPlayerForm ~= nil) and (callbackPlayerForm ~= playerForm) then
                goto __continue5
            end
            callback(nil, player, playerForm, hasForm)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.preCustomRevive"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback)
    __TS__ArrayPush(subscriptions, {callback})
end
function ____exports.fire(self, player)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local revivalType = callback(nil, player)
        if revivalType ~= nil then
            return revivalType
        end
    end
    return nil
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.preItemPickup"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local subscriptions = {}
function ____exports.hasSubscriptions(self)
    return #subscriptions > 0
end
function ____exports.register(self, callback, itemType, itemID)
    __TS__ArrayPush(subscriptions, {callback, itemType, itemID})
end
function ____exports.fire(self, player, pickingUpItem)
    for ____, ____value in ipairs(subscriptions) do
        local callback
        callback = ____value[1]
        local itemType
        itemType = ____value[2]
        local itemID
        itemID = ____value[3]
        do
            if (itemType ~= nil) and (itemType ~= pickingUpItem.type) then
                goto __continue5
            end
            if (itemID ~= nil) and (itemID ~= pickingUpItem.id) then
                goto __continue5
            end
            callback(nil, player, pickingUpItem)
        end
        ::__continue5::
    end
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.upgradeMod"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local initCustomCallbacks, initFeatures
local customRevive = require("mod.node_modules.isaacscript-common.dist.callbacks.customRevive")
local itemPickup = require("mod.node_modules.isaacscript-common.dist.callbacks.itemPickup")
local postCursedTeleport = require("mod.node_modules.isaacscript-common.dist.callbacks.postCursedTeleport")
local postEsauJr = require("mod.node_modules.isaacscript-common.dist.callbacks.postEsauJr")
local postFlip = require("mod.node_modules.isaacscript-common.dist.callbacks.postFlip")
local postGridEntity = require("mod.node_modules.isaacscript-common.dist.callbacks.postGridEntity")
local postLaserInitLate = require("mod.node_modules.isaacscript-common.dist.callbacks.postLaserInitLate")
local postPickupCollect = require("mod.node_modules.isaacscript-common.dist.callbacks.postPickupCollect")
local postPickupInitLate = require("mod.node_modules.isaacscript-common.dist.callbacks.postPickupInitLate")
local postPlayerChangeHealth = require("mod.node_modules.isaacscript-common.dist.callbacks.postPlayerChangeHealth")
local postPlayerChangeType = require("mod.node_modules.isaacscript-common.dist.callbacks.postPlayerChangeType")
local postPlayerFatalDamage = require("mod.node_modules.isaacscript-common.dist.callbacks.postPlayerFatalDamage")
local postPlayerInitLate = require("mod.node_modules.isaacscript-common.dist.callbacks.postPlayerInitLate")
local postPlayerReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.postPlayerReordered")
local postPurchase = require("mod.node_modules.isaacscript-common.dist.callbacks.postPurchase")
local postSacrifice = require("mod.node_modules.isaacscript-common.dist.callbacks.postSacrifice")
local postSlot = require("mod.node_modules.isaacscript-common.dist.callbacks.postSlot")
local postSlotRender = require("mod.node_modules.isaacscript-common.dist.callbacks.postSlotRender")
local postTransformation = require("mod.node_modules.isaacscript-common.dist.callbacks.postTransformation")
local reorderedCallbacks = require("mod.node_modules.isaacscript-common.dist.callbacks.reorderedCallbacks")
local disableInputs = require("mod.node_modules.isaacscript-common.dist.features.disableInputs")
local forgottenSwitch = require("mod.node_modules.isaacscript-common.dist.features.forgottenSwitch")
local runInNFrames = require("mod.node_modules.isaacscript-common.dist.features.runInNFrames")
local saveDataManager = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local ____ModUpgraded = require("mod.node_modules.isaacscript-common.dist.types.ModUpgraded")
local ModUpgraded = ____ModUpgraded.default
function initCustomCallbacks(self, mod)
    reorderedCallbacks:init(mod)
    postPlayerReordered:init(mod)
    postPlayerInitLate:init(mod)
    postPickupInitLate:init(mod)
    postLaserInitLate:init(mod)
    postPickupCollect:init(mod)
    itemPickup:init(mod)
    postPlayerChangeType:init(mod)
    postPlayerChangeHealth:init(mod)
    postPlayerFatalDamage:init(mod)
    customRevive:init(mod)
    postFlip:init(mod)
    postEsauJr:init(mod)
    postTransformation:init(mod)
    postPurchase:init(mod)
    postSacrifice:init(mod)
    postCursedTeleport:init(mod)
    postSlot:init(mod)
    postSlotRender:init(mod)
    postGridEntity:init(mod)
end
function initFeatures(self, mod)
    disableInputs:init(mod)
    forgottenSwitch:init(mod)
    runInNFrames:init(mod)
end
local initialized = false
function ____exports.upgradeMod(self, mod, verbose)
    if verbose == nil then
        verbose = false
    end
    local modUpgraded = __TS__New(ModUpgraded, mod, verbose)
    if not initialized then
        initialized = true
        saveDataManager:init(modUpgraded)
        initCustomCallbacks(nil, modUpgraded)
        initFeatures(nil, modUpgraded)
    end
    return modUpgraded
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.customRevive"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hasSubscriptions, postRender, postNewRoom, postPlayerUpdateReordered, postPlayerFatalDamage, CustomReviveState, v
local ____entity = require("mod.node_modules.isaacscript-common.dist.functions.entity")
local removeAllMatchingEntities = ____entity.removeAllMatchingEntities
local ____items = require("mod.node_modules.isaacscript-common.dist.functions.items")
local removeItemFromItemTracker = ____items.removeItemFromItemTracker
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerIndex = ____player.getPlayerIndex
local ____ModCallbacksCustom = require("mod.node_modules.isaacscript-common.dist.types.ModCallbacksCustom")
local ModCallbacksCustom = ____ModCallbacksCustom.default
local postCustomRevive = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postCustomRevive")
local preCustomRevive = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.preCustomRevive")
function hasSubscriptions(self)
    return preCustomRevive:hasSubscriptions() or postCustomRevive:hasSubscriptions()
end
function postRender(self)
    if v.run.state ~= CustomReviveState.WAITING_FOR_ITEM_ANIMATION then
        return
    end
    local sfx = SFXManager()
    sfx:Stop(SoundEffect.SOUND_1UP)
end
function postNewRoom(self)
    if v.run.state == CustomReviveState.CHANGING_ROOMS then
        v.run.state = CustomReviveState.WAITING_FOR_ITEM_ANIMATION
    elseif v.run.state == CustomReviveState.WAITING_FOR_ITEM_ANIMATION then
        v.run.state = CustomReviveState.DISABLED
        v.run.revivalType = nil
        v.run.dyingPlayerIndex = nil
    end
end
function postPlayerUpdateReordered(self, player)
    if v.run.state ~= CustomReviveState.WAITING_FOR_ITEM_ANIMATION then
        return
    end
    if v.run.dyingPlayerIndex == nil then
        return
    end
    local playerIndex = getPlayerIndex(nil, player)
    if playerIndex ~= v.run.dyingPlayerIndex then
        return
    end
    if not player:IsHoldingItem() then
        return
    end
    if v.run.revivalType ~= nil then
        postCustomRevive:fire(player, v.run.revivalType)
    end
    v.run.state = CustomReviveState.DISABLED
    v.run.revivalType = nil
    v.run.dyingPlayerIndex = nil
end
function postPlayerFatalDamage(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    local revivalType = preCustomRevive:fire(player)
    if revivalType == nil then
        return
    end
    v.run.state = CustomReviveState.CHANGING_ROOMS
    v.run.revivalType = revivalType
    v.run.dyingPlayerIndex = getPlayerIndex(nil, player)
    player:AddCollectible(CollectibleType.COLLECTIBLE_1UP, 0, false)
    removeAllMatchingEntities(nil, EntityType.ENTITY_FAMILIAR, FamiliarVariant.ONE_UP)
    removeItemFromItemTracker(nil, CollectibleType.COLLECTIBLE_1UP)
end
CustomReviveState = CustomReviveState or ({})
CustomReviveState.DISABLED = 0
CustomReviveState[CustomReviveState.DISABLED] = "DISABLED"
CustomReviveState.CHANGING_ROOMS = 1
CustomReviveState[CustomReviveState.CHANGING_ROOMS] = "CHANGING_ROOMS"
CustomReviveState.WAITING_FOR_ITEM_ANIMATION = 2
CustomReviveState[CustomReviveState.WAITING_FOR_ITEM_ANIMATION] = "WAITING_FOR_ITEM_ANIMATION"
v = {run = {state = CustomReviveState.DISABLED, revivalType = nil, dyingPlayerIndex = nil}}
function ____exports.init(self, mod)
    mod:AddCallback(ModCallbacks.MC_POST_RENDER, postRender)
    mod:AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED, postPlayerUpdateReordered)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE, postPlayerFatalDamage)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.itemPickup"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postPlayerUpdateReorderedPlayer, queueEmpty, queueNotEmpty, getPickingUpItemForPlayer, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerIndex = ____player.getPlayerIndex
local ____ModCallbacksCustom = require("mod.node_modules.isaacscript-common.dist.types.ModCallbacksCustom")
local ModCallbacksCustom = ____ModCallbacksCustom.default
local postItemPickup = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postItemPickup")
local preItemPickup = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.preItemPickup")
function hasSubscriptions(self)
    return preItemPickup:hasSubscriptions() or postItemPickup:hasSubscriptions()
end
function postPlayerUpdateReorderedPlayer(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    local pickingUpItem = getPickingUpItemForPlayer(nil, player)
    if player:IsItemQueueEmpty() then
        queueEmpty(nil, player, pickingUpItem)
    else
        queueNotEmpty(nil, player, pickingUpItem)
    end
end
function queueEmpty(self, player, pickingUpItem)
    if pickingUpItem.id ~= CollectibleType.COLLECTIBLE_NULL then
        postItemPickup:fire(player, pickingUpItem)
        pickingUpItem.id = CollectibleType.COLLECTIBLE_NULL
        pickingUpItem.type = ItemType.ITEM_NULL
    end
end
function queueNotEmpty(self, player, pickingUpItem)
    local queuedItem = player.QueuedItem.Item
    if (queuedItem ~= nil) and (queuedItem.ID ~= pickingUpItem.id) then
        pickingUpItem.id = queuedItem.ID
        pickingUpItem.type = queuedItem.Type
        preItemPickup:fire(player, pickingUpItem)
    end
end
function getPickingUpItemForPlayer(self, player)
    local index = getPlayerIndex(nil, player)
    local pickingUpItem = v.run.pickingUpItem:get(index)
    if pickingUpItem == nil then
        pickingUpItem = {id = CollectibleType.COLLECTIBLE_NULL, type = ItemType.ITEM_NULL}
        v.run.pickingUpItem:set(index, pickingUpItem)
    end
    return pickingUpItem
end
v = {
    run = {
        pickingUpItem = __TS__New(Map)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "itemPickupCallback", v, hasSubscriptions)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED, postPlayerUpdateReorderedPlayer, 0)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postCursedTeleport"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, entityTakeDmgPlayer, setDamageFrame, isPotentialNaturalTeleportFromSacrificeRoom, incrementNumSacrifices, postPlayerRenderPlayer, playerIsTeleportingFromCursedTeleport, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____flag = require("mod.node_modules.isaacscript-common.dist.functions.flag")
local hasFlag = ____flag.hasFlag
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerIndex = ____player.getPlayerIndex
local getPlayerNumAllHearts = ____player.getPlayerNumAllHearts
local postCursedTeleport = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postCursedTeleport")
function hasSubscriptions(self)
    return postCursedTeleport:hasSubscriptions()
end
function entityTakeDmgPlayer(self, tookDamage, _damageAmount, damageFlags, _damageSource, _damageCountdownFrames)
    if not hasSubscriptions(nil) then
        return
    end
    incrementNumSacrifices(nil, damageFlags)
    setDamageFrame(nil, tookDamage, damageFlags)
end
function setDamageFrame(self, tookDamage, damageFlags)
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    local player = tookDamage:ToPlayer()
    if player == nil then
        return
    end
    local playerIndex = getPlayerIndex(nil, player)
    local trackingArray = v.run.damageFrameMap:get(playerIndex)
    if trackingArray ~= nil then
        local lastDamageFrame, callbackActivatedOnThisFrame = table.unpack(trackingArray)
        if (lastDamageFrame == gameFrameCount) and callbackActivatedOnThisFrame then
            return
        end
    end
    if isPotentialNaturalTeleportFromSacrificeRoom(nil, damageFlags) then
        return
    end
    v.run.damageFrameMap:set(playerIndex, {gameFrameCount, false})
end
function isPotentialNaturalTeleportFromSacrificeRoom(self, damageFlags)
    local game = Game()
    local room = game:GetRoom()
    local roomType = room:GetType()
    local isSpikeDamage = hasFlag(nil, damageFlags, DamageFlag.DAMAGE_SPIKES)
    return ((roomType == RoomType.ROOM_SACRIFICE) and isSpikeDamage) and ((v.level.numSacrifices == 6) or (v.level.numSacrifices >= 12))
end
function incrementNumSacrifices(self, damageFlags)
    local game = Game()
    local room = game:GetRoom()
    local roomType = room:GetType()
    local isSpikeDamage = hasFlag(nil, damageFlags, DamageFlag.DAMAGE_SPIKES)
    if (roomType == RoomType.ROOM_SACRIFICE) and isSpikeDamage then
        local ____obj, ____index = v.level, "numSacrifices"
        ____obj[____index] = ____obj[____index] + 1
    end
end
function postPlayerRenderPlayer(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    local playerIndex = getPlayerIndex(nil, player)
    local trackingArray = v.run.damageFrameMap:get(playerIndex)
    if trackingArray == nil then
        return
    end
    local lastDamageFrame, callbackActivatedOnThisFrame = table.unpack(trackingArray)
    if not playerIsTeleportingFromCursedTeleport(nil, player, lastDamageFrame) then
        return
    end
    if callbackActivatedOnThisFrame then
        return
    end
    v.run.damageFrameMap:set(playerIndex, {gameFrameCount, true})
    postCursedTeleport:fire(player)
end
function playerIsTeleportingFromCursedTeleport(self, player, lastDamageFrame)
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    if gameFrameCount ~= lastDamageFrame then
        return false
    end
    local sprite = player:GetSprite()
    if (not sprite:IsPlaying("TeleportUp")) or (sprite:GetFrame() ~= 1) then
        return false
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_CURSED_EYE) then
        return true
    end
    local numHitsLeft = getPlayerNumAllHearts(nil, player)
    if player:HasTrinket(TrinketType.TRINKET_CURSED_SKULL) and (numHitsLeft == 1) then
        return true
    end
    return false
end
v = {
    run = {
        damageFrameMap = __TS__New(Map)
    },
    level = {numSacrifices = 0}
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postCursedEyeActivationCallback", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, entityTakeDmgPlayer, EntityType.ENTITY_PLAYER)
    mod:AddCallback(ModCallbacks.MC_POST_PLAYER_RENDER, postPlayerRenderPlayer, 0)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postEsauJr"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hasSubscriptions, postUpdate, getPlayerWithControllerIndex, useItemEsauJr, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayers = ____player.getPlayers
local postEsauJr = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postEsauJr")
local postFirstEsauJr = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postFirstEsauJr")
function hasSubscriptions(self)
    return postEsauJr:hasSubscriptions() or postFirstEsauJr:hasSubscriptions()
end
function postUpdate(self)
    if not hasSubscriptions(nil) then
        return
    end
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    if (v.run.usedEsauJrFrame == nil) or (gameFrameCount < (v.run.usedEsauJrFrame + 1)) then
        return
    end
    v.run.usedEsauJrFrame = nil
    if v.run.usedEsauJrControllerIndex == nil then
        return
    end
    local player = getPlayerWithControllerIndex(nil, v.run.usedEsauJrControllerIndex)
    v.run.usedEsauJrControllerIndex = nil
    if player == nil then
        return
    end
    if not v.run.usedEsauJrAtLeastOnce then
        v.run.usedEsauJrAtLeastOnce = true
        postFirstEsauJr:fire(player)
    end
    postEsauJr:fire(player)
end
function getPlayerWithControllerIndex(self, controllerIndex)
    for ____, player in ipairs(
        getPlayers(nil)
    ) do
        if player.ControllerIndex == controllerIndex then
            return player
        end
    end
    return nil
end
function useItemEsauJr(self, _collectibleType, _rng, player, _useFlags, _activeSlot, _customVarData)
    if not hasSubscriptions(nil) then
        return
    end
    local game = Game()
    local gameFrameCount = game:GetFrameCount()
    v.run.usedEsauJrFrame = gameFrameCount + 1
    v.run.usedEsauJrControllerIndex = player.ControllerIndex
end
v = {run = {usedEsauJrFrame = nil, usedEsauJrControllerIndex = nil, usedEsauJrAtLeastOnce = false}}
function ____exports.init(self, mod)
    saveDataManager(nil, "postEsauJrCallback", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate)
    mod:AddCallback(ModCallbacks.MC_USE_ITEM, useItemEsauJr, CollectibleType.COLLECTIBLE_ESAU_JR)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postFlip"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hasSubscriptions, useItemFlip, getNewLazarus, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayers = ____player.getPlayers
local postFirstFlip = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postFirstFlip")
local postFlip = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postFlip")
function hasSubscriptions(self)
    return postFlip:hasSubscriptions() or postFirstFlip:hasSubscriptions()
end
function useItemFlip(self, _collectibleType, _rng, player, _useFlags, _activeSlot, _customVarData)
    if not hasSubscriptions(nil) then
        return
    end
    local newLazarus = getNewLazarus(nil, player)
    if not v.run.usedFlipAtLeastOnce then
        v.run.usedFlipAtLeastOnce = true
        postFirstFlip:fire(newLazarus)
    end
    postFlip:fire(newLazarus)
end
function getNewLazarus(self, oldLazarus)
    local oldCharacter = oldLazarus:GetPlayerType()
    local newCharacter
    if oldCharacter == PlayerType.PLAYER_LAZARUS_B then
        newCharacter = PlayerType.PLAYER_LAZARUS2_B
    elseif oldCharacter == PlayerType.PLAYER_LAZARUS2_B then
        newCharacter = PlayerType.PLAYER_LAZARUS_B
    else
        error("Failed to determine the character in the postFlip callback.")
    end
    for ____, player in ipairs(
        getPlayers(nil)
    ) do
        local character = player:GetPlayerType()
        if (character == newCharacter) and (player.FrameCount == oldLazarus.FrameCount) then
            return player
        end
    end
    error("Failed to find the player entity for the new Lazarus.")
    return oldLazarus
end
v = {run = {usedFlipAtLeastOnce = false}}
function ____exports.init(self, mod)
    saveDataManager(nil, "postFlipCallback", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_USE_ITEM, useItemFlip, CollectibleType.COLLECTIBLE_FLIP)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postGridEntity"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postUpdate, postNewRoom, checkNewGridEntity, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____gridEntity = require("mod.node_modules.isaacscript-common.dist.functions.gridEntity")
local getGridEntities = ____gridEntity.getGridEntities
local postGridEntityInit = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGridEntityInit")
local postGridEntityRemove = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGridEntityRemove")
local postGridEntityUpdate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postGridEntityUpdate")
function hasSubscriptions(self)
    return (postGridEntityInit:hasSubscriptions() or postGridEntityUpdate:hasSubscriptions()) or postGridEntityRemove:hasSubscriptions()
end
function postUpdate(self)
    if not hasSubscriptions(nil) then
        return
    end
    local game = Game()
    local room = game:GetRoom()
    for ____, gridEntity in ipairs(
        getGridEntities(nil)
    ) do
        checkNewGridEntity(nil, gridEntity)
        postGridEntityUpdate:fire(gridEntity)
    end
    for ____, ____value in __TS__Iterator(
        v.room.initializedGridEntities:entries()
    ) do
        local gridIndex
        gridIndex = ____value[1]
        local gridEntityType
        gridEntityType = ____value[2]
        local gridEntity = room:GetGridEntity(gridIndex)
        if (gridEntity == nil) or (gridEntity:GetType() ~= gridEntityType) then
            v.room.initializedGridEntities:delete(gridIndex)
            postGridEntityRemove:fire(gridIndex, gridEntityType)
        end
    end
end
function postNewRoom(self)
    if not hasSubscriptions(nil) then
        return
    end
    for ____, gridEntity in ipairs(
        getGridEntities(nil)
    ) do
        checkNewGridEntity(nil, gridEntity)
    end
end
function checkNewGridEntity(self, gridEntity)
    local gridIndex = gridEntity:GetGridIndex()
    local gridEntityType = gridEntity:GetType()
    local storedGridEntityType = v.room.initializedGridEntities:get(gridIndex)
    if storedGridEntityType ~= gridEntityType then
        v.room.initializedGridEntities:set(gridIndex, gridEntityType)
        postGridEntityInit:fire(gridEntity)
    end
end
v = {
    room = {
        initializedGridEntities = __TS__New(Map)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postGridEntityCallback", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate)
    mod:AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postLaserInitLate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postLaserUpdate, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local postLaserInitLate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postLaserInitLate")
function hasSubscriptions(self)
    return postLaserInitLate:hasSubscriptions()
end
function postLaserUpdate(self, laser)
    if not hasSubscriptions(nil) then
        return
    end
    local index = GetPtrHash(laser)
    if not v.room.firedSet:has(index) then
        v.room.firedSet:add(index)
        postLaserInitLate:fire(laser)
    end
end
v = {
    room = {
        firedSet = __TS__New(Set)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postLaserInitLate", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_POST_LASER_UPDATE, postLaserUpdate)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postPickupCollect"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postPickupRender, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getClosestPlayer = ____player.getClosestPlayer
local postPickupCollect = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPickupCollect")
function hasSubscriptions(self)
    return postPickupCollect:hasSubscriptions()
end
function postPickupRender(self, pickup)
    if not hasSubscriptions(nil) then
        return
    end
    local sprite = pickup:GetSprite()
    local animation = sprite:GetAnimation()
    if animation ~= "Collect" then
        return
    end
    local index = GetPtrHash(pickup)
    if not v.room.firedSet:has(index) then
        v.room.firedSet:add(index)
        local player = getClosestPlayer(nil, pickup.Position)
        postPickupCollect:fire(pickup, player)
    end
end
v = {
    room = {
        firedSet = __TS__New(Set)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postPickupCollect", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_POST_PICKUP_RENDER, postPickupRender)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postPickupInitLate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postPickupUpdate, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local postPickupInitLate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPickupInitLate")
function hasSubscriptions(self)
    return postPickupInitLate:hasSubscriptions()
end
function postPickupUpdate(self, pickup)
    if not hasSubscriptions(nil) then
        return
    end
    local index = GetPtrHash(pickup)
    if not v.room.firedSet:has(index) then
        v.room.firedSet:add(index)
        postPickupInitLate:fire(pickup)
    end
end
v = {
    room = {
        firedSet = __TS__New(Set)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postPickupInitLate", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_POST_PICKUP_UPDATE, postPickupUpdate)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postPlayerChangeHealth"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postPlayerUpdateReordered, getCurrentHealthValue, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerIndex = ____player.getPlayerIndex
local ____util = require("mod.node_modules.isaacscript-common.dist.functions.util")
local ensureAllCases = ____util.ensureAllCases
local getEnumValues = ____util.getEnumValues
local ____HealthType = require("mod.node_modules.isaacscript-common.dist.types.HealthType")
local HealthType = ____HealthType.default
local ____ModCallbacksCustom = require("mod.node_modules.isaacscript-common.dist.types.ModCallbacksCustom")
local ModCallbacksCustom = ____ModCallbacksCustom.default
local postPlayerChangeHealth = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerChangeHealth")
function hasSubscriptions(self)
    return postPlayerChangeHealth:hasSubscriptions()
end
function postPlayerUpdateReordered(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    local playerIndex = getPlayerIndex(nil, player)
    local storedHealth = v.run.healthMap:get(playerIndex)
    if storedHealth == nil then
        storedHealth = __TS__New(Map)
    end
    local healthTypes = getEnumValues(nil, HealthType)
    for ____, healthType in ipairs(healthTypes) do
        local storedHealthValue = storedHealth:get(healthType)
        local currentHealthValue = getCurrentHealthValue(nil, player, healthType)
        if (storedHealthValue ~= nil) and (storedHealthValue ~= currentHealthValue) then
            local amount = currentHealthValue - storedHealthValue
            postPlayerChangeHealth:fire(player, healthType, amount)
        end
    end
end
function getCurrentHealthValue(self, player, healthType)
    repeat
        local ____switch10 = healthType
        local ____cond10 = ____switch10 == HealthType.RED
        if ____cond10 then
            do
                return player:GetHearts()
            end
        end
        ____cond10 = ____cond10 or (____switch10 == HealthType.SOUL)
        if ____cond10 then
            do
                return player:GetSoulHearts()
            end
        end
        ____cond10 = ____cond10 or (____switch10 == HealthType.ETERNAL)
        if ____cond10 then
            do
                return player:GetEternalHearts()
            end
        end
        ____cond10 = ____cond10 or (____switch10 == HealthType.BLACK)
        if ____cond10 then
            do
                return player:GetBlackHearts()
            end
        end
        ____cond10 = ____cond10 or (____switch10 == HealthType.GOLDEN)
        if ____cond10 then
            do
                return player:GetGoldenHearts()
            end
        end
        ____cond10 = ____cond10 or (____switch10 == HealthType.BONE)
        if ____cond10 then
            do
                return player:GetBoneHearts()
            end
        end
        ____cond10 = ____cond10 or (____switch10 == HealthType.ROTTEN)
        if ____cond10 then
            do
                return player:GetRottenHearts()
            end
        end
        ____cond10 = ____cond10 or (____switch10 == HealthType.MAX_HEARTS)
        if ____cond10 then
            do
                return player:GetMaxHearts()
            end
        end
        do
            do
                ensureAllCases(nil, healthType)
                return 0
            end
        end
    until true
end
v = {
    run = {
        healthMap = __TS__New(Map)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postPlayerChangeHealthCallback", v, hasSubscriptions)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED, postPlayerUpdateReordered)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postPlayerChangeType"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postPlayerUpdateReorderedPlayer, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerIndex = ____player.getPlayerIndex
local ____ModCallbacksCustom = require("mod.node_modules.isaacscript-common.dist.types.ModCallbacksCustom")
local ModCallbacksCustom = ____ModCallbacksCustom.default
local postPlayerChangeType = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerChangeType")
function hasSubscriptions(self)
    return postPlayerChangeType:hasSubscriptions()
end
function postPlayerUpdateReorderedPlayer(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    local character = player:GetPlayerType()
    local playerIndex = getPlayerIndex(nil, player)
    local storedCharacter = v.run.characterMap:get(playerIndex)
    if storedCharacter == nil then
        v.run.characterMap:set(playerIndex, character)
        return
    end
    if character ~= storedCharacter then
        v.run.characterMap:set(playerIndex, character)
        postPlayerChangeType:fire(player)
    end
end
v = {
    run = {
        characterMap = __TS__New(Map)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postPlayerChangeTypeCallback", v, hasSubscriptions)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED, postPlayerUpdateReorderedPlayer, 0)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postPlayerFatalDamage"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hasSubscriptions, entityTakeDmgPlayer, damageIsFatal
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerNumAllHearts = ____player.getPlayerNumAllHearts
local hasLostCurse = ____player.hasLostCurse
local ____revive = require("mod.node_modules.isaacscript-common.dist.functions.revive")
local willPlayerRevive = ____revive.willPlayerRevive
local postPlayerFatalDamage = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerFatalDamage")
function hasSubscriptions(self)
    return postPlayerFatalDamage:hasSubscriptions()
end
function entityTakeDmgPlayer(self, tookDamage, damageAmount, _damageFlags, _damageSource, _damageCountdownFrames)
    if not hasSubscriptions(nil) then
        return nil
    end
    local player = tookDamage:ToPlayer()
    if player == nil then
        return nil
    end
    if willPlayerRevive(nil, player) then
        return nil
    end
    if (not hasLostCurse(nil, player)) and (not damageIsFatal(nil, player, damageAmount)) then
        return nil
    end
    local shouldSustainDeath = postPlayerFatalDamage:fire(player)
    if shouldSustainDeath ~= nil then
        return shouldSustainDeath
    end
    return nil
end
function damageIsFatal(self, player, damageAmount)
    local playerNumAllHearts = getPlayerNumAllHearts(nil, player)
    if damageAmount < playerNumAllHearts then
        return false
    end
    local hearts = player:GetHearts()
    local eternalHearts = player:GetEternalHearts()
    local soulHearts = player:GetSoulHearts()
    local boneHearts = player:GetBoneHearts()
    if (((((hearts > 0) and (soulHearts > 0)) or ((hearts > 0) and (boneHearts > 0))) or ((soulHearts > 0) and (boneHearts > 0))) or ((soulHearts > 0) and (eternalHearts > 0))) or (boneHearts >= 2) then
        return false
    end
    return true
end
function ____exports.init(self, mod)
    mod:AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, entityTakeDmgPlayer, EntityType.ENTITY_PLAYER)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postPlayerInitLate"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postPlayerUpdate, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerIndex = ____player.getPlayerIndex
local postPlayerInitLate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerInitLate")
function hasSubscriptions(self)
    return postPlayerInitLate:hasSubscriptions()
end
function postPlayerUpdate(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    local playerIndex = getPlayerIndex(nil, player)
    if not v.run.firedSet:has(playerIndex) then
        v.run.firedSet:add(playerIndex)
        postPlayerInitLate:fire(player)
    end
end
v = {
    run = {
        firedSet = __TS__New(Set)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postPlayerInitLate", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, postPlayerUpdate)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postPlayerReordered"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postPlayerInit, postPlayerUpdate, postPlayerRender, postGameStarted, dequeue, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____array = require("mod.node_modules.isaacscript-common.dist.functions.array")
local arrayEmpty = ____array.arrayEmpty
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerFromIndex = ____player.getPlayerFromIndex
local getPlayerIndex = ____player.getPlayerIndex
local postPlayerInitReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerInitReordered")
local postPlayerRenderReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerRenderReordered")
local postPlayerUpdateReordered = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPlayerUpdateReordered")
function hasSubscriptions(self)
    return (postPlayerInitReordered:hasSubscriptions() or postPlayerUpdateReordered:hasSubscriptions()) or postPlayerRenderReordered:hasSubscriptions()
end
function postPlayerInit(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    if v.run.postGameStartedFiredOnThisRun then
        postPlayerInitReordered:fire(player)
    else
        local playerIndex = getPlayerIndex(nil, player)
        __TS__ArrayPush(v.run.postPlayerInitQueue, playerIndex)
    end
end
function postPlayerUpdate(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    if v.run.postGameStartedFiredOnThisRun then
        postPlayerUpdateReordered:fire(player)
    else
        local playerIndex = getPlayerIndex(nil, player)
        __TS__ArrayPush(v.run.postPlayerUpdateQueue, playerIndex)
    end
end
function postPlayerRender(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    if v.run.postGameStartedFiredOnThisRun then
        postPlayerRenderReordered:fire(player)
    else
        local playerIndex = getPlayerIndex(nil, player)
        __TS__ArrayPush(v.run.postPlayerRenderQueue, playerIndex)
    end
end
function postGameStarted(self)
    if not hasSubscriptions(nil) then
        return
    end
    v.run.postGameStartedFiredOnThisRun = true
    dequeue(nil, v.run.postPlayerInitQueue, postPlayerInitReordered.fire)
    dequeue(nil, v.run.postPlayerUpdateQueue, postPlayerUpdateReordered.fire)
    dequeue(nil, v.run.postPlayerRenderQueue, postPlayerRenderReordered.fire)
end
function dequeue(self, playerIndexes, fireFunction)
    for ____, playerIndex in ipairs(playerIndexes) do
        do
            local player = getPlayerFromIndex(nil, playerIndex)
            if player == nil then
                goto __continue19
            end
            fireFunction(nil, player)
        end
        ::__continue19::
    end
    arrayEmpty(nil, playerIndexes)
end
v = {run = {postGameStartedFiredOnThisRun = false, postPlayerInitQueue = {}, postPlayerUpdateQueue = {}, postPlayerRenderQueue = {}}}
function ____exports.init(self, mod)
    saveDataManager(nil, "postPlayerReordered", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit)
    mod:AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, postPlayerUpdate)
    mod:AddCallback(ModCallbacks.MC_POST_PLAYER_RENDER, postPlayerRender)
    mod:AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postPurchase"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postUpdate, checkPickupsPurchased, storePickupsInMap, storePlayersInMap, pickupIndexExists, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerIndex = ____player.getPlayerIndex
local getPlayers = ____player.getPlayers
local postPurchase = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postPurchase")
function hasSubscriptions(self)
    return postPurchase:hasSubscriptions()
end
function postUpdate(self)
    if not hasSubscriptions(nil) then
        return
    end
    local pickups = Isaac.FindByType(EntityType.ENTITY_PICKUP)
    local players = getPlayers(nil)
    checkPickupsPurchased(nil, pickups, players)
    storePickupsInMap(nil, pickups)
    storePlayersInMap(nil, players)
end
function checkPickupsPurchased(self, pickups, players)
    for ____, ____value in __TS__Iterator(
        v.room.pickupMap:entries()
    ) do
        local index
        index = ____value[1]
        local pickupDescription
        pickupDescription = ____value[2]
        do
            if pickupIndexExists(nil, index, pickups) then
                goto __continue7
            end
            v.room.pickupMap:delete(index)
            for ____, player in ipairs(players) do
                do
                    local playerHoldingItem = player:IsHoldingItem()
                    local playerIndex = getPlayerIndex(nil, player)
                    local playerHoldingItemLastFrame = v.room.playerHoldingItemLastFrameMap:get(playerIndex)
                    if playerHoldingItemLastFrame == nil then
                        goto __continue9
                    end
                    if (not playerHoldingItemLastFrame) and playerHoldingItem then
                        postPurchase:fire(player, pickupDescription.variant, pickupDescription.subtype, pickupDescription.price)
                        break
                    end
                end
                ::__continue9::
            end
        end
        ::__continue7::
    end
end
function storePickupsInMap(self, pickups)
    for ____, entity in ipairs(pickups) do
        do
            local pickup = entity:ToPickup()
            if (pickup == nil) or (pickup.Price == 0) then
                goto __continue13
            end
            v.room.pickupMap:set(pickup.Index, {variant = pickup.Variant, subtype = pickup.SubType, price = pickup.Price})
        end
        ::__continue13::
    end
end
function storePlayersInMap(self, players)
    for ____, player in ipairs(players) do
        local playerIndex = getPlayerIndex(nil, player)
        local holdingItem = player:IsHoldingItem()
        v.room.playerHoldingItemLastFrameMap:set(playerIndex, holdingItem)
    end
end
function pickupIndexExists(self, index, pickups)
    for ____, entity in ipairs(pickups) do
        if (entity.Index == index) and entity:Exists() then
            return true
        end
    end
    return false
end
v = {
    room = {
        pickupMap = __TS__New(Map),
        playerHoldingItemLastFrameMap = __TS__New(Map)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postPurchaseCallback", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postSacrifice"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hasSubscriptions, entityTakeDmgPlayer, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____flag = require("mod.node_modules.isaacscript-common.dist.functions.flag")
local hasFlag = ____flag.hasFlag
local postSacrifice = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSacrifice")
function hasSubscriptions(self)
    return postSacrifice:hasSubscriptions()
end
function entityTakeDmgPlayer(self, tookDamage, _damageAmount, damageFlags, _damageSource, _damageCountdownFrames)
    if not hasSubscriptions(nil) then
        return
    end
    local player = tookDamage:ToPlayer()
    if player == nil then
        return
    end
    local game = Game()
    local room = game:GetRoom()
    local roomType = room:GetType()
    local isSpikeDamage = hasFlag(nil, damageFlags, DamageFlag.DAMAGE_SPIKES)
    if (roomType == RoomType.ROOM_SACRIFICE) and isSpikeDamage then
        local ____obj, ____index = v.level, "numSacrifices"
        ____obj[____index] = ____obj[____index] + 1
        postSacrifice:fire(player, v.level.numSacrifices)
    end
end
v = {level = {numSacrifices = 0}}
function ____exports.init(self, mod)
    saveDataManager(nil, "postSacrificeCallback", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, entityTakeDmgPlayer, EntityType.ENTITY_PLAYER)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postSlot"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postUpdate, postNewRoom, checkNewEntity, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local postSlotInit = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSlotInit")
local postSlotUpdate = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSlotUpdate")
function hasSubscriptions(self)
    return postSlotInit:hasSubscriptions() or postSlotUpdate:hasSubscriptions()
end
function postUpdate(self)
    if not hasSubscriptions(nil) then
        return
    end
    local slots = Isaac.FindByType(EntityType.ENTITY_SLOT)
    for ____, slot in ipairs(slots) do
        checkNewEntity(nil, slot)
        postSlotUpdate:fire(slot)
    end
end
function postNewRoom(self)
    if not hasSubscriptions(nil) then
        return
    end
    local slots = Isaac.FindByType(EntityType.ENTITY_SLOT)
    for ____, slot in ipairs(slots) do
        checkNewEntity(nil, slot)
    end
end
function checkNewEntity(self, slot)
    local ptrHash = GetPtrHash(slot)
    if not v.room.initializedSlots:has(ptrHash) then
        v.room.initializedSlots:add(ptrHash)
        postSlotInit:fire(slot)
    end
end
v = {
    room = {
        initializedSlots = __TS__New(Set)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postSlotCallback", v, hasSubscriptions)
    mod:AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate)
    mod:AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postSlotRender"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hasSubscriptions, postRender
local postSlotRender = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postSlotRender")
function hasSubscriptions(self)
    return postSlotRender:hasSubscriptions()
end
function postRender(self)
    if not hasSubscriptions(nil) then
        return
    end
    local slots = Isaac.FindByType(EntityType.ENTITY_SLOT)
    for ____, slot in ipairs(slots) do
        postSlotRender:fire(slot)
    end
end
function ____exports.init(self, mod)
    mod:AddCallback(ModCallbacks.MC_POST_RENDER, postRender)
end
return ____exports
 end,
["mod.node_modules.isaacscript-common.dist.callbacks.postTransformation"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local hasSubscriptions, postPlayerUpdateReorderedPlayer, v
local ____main = require("mod.node_modules.isaacscript-common.dist.features.saveDataManager.main")
local saveDataManager = ____main.saveDataManager
local ____array = require("mod.node_modules.isaacscript-common.dist.functions.array")
local arrayInit = ____array.arrayInit
local ____player = require("mod.node_modules.isaacscript-common.dist.functions.player")
local getPlayerIndex = ____player.getPlayerIndex
local ____ModCallbacksCustom = require("mod.node_modules.isaacscript-common.dist.types.ModCallbacksCustom")
local ModCallbacksCustom = ____ModCallbacksCustom.default
local postTransformation = require("mod.node_modules.isaacscript-common.dist.callbacks.subscriptions.postTransformation")
function hasSubscriptions(self)
    return postTransformation:hasSubscriptions()
end
function postPlayerUpdateReorderedPlayer(self, player)
    if not hasSubscriptions(nil) then
        return
    end
    local index = getPlayerIndex(nil, player)
    local transformations = v.run.transformations:get(index)
    if transformations == nil then
        transformations = arrayInit(nil, false, PlayerForm.NUM_PLAYER_FORMS - 1)
        v.run.transformations:set(index, transformations)
    end
    do
        local playerForm = 0
        while playerForm < PlayerForm.NUM_PLAYER_FORMS do
            local hasForm = player:HasPlayerForm(playerForm)
            local storedForm = transformations[playerForm + 1]
            if hasForm ~= storedForm then
                transformations[playerForm + 1] = hasForm
                postTransformation:fire(player, playerForm, hasForm)
            end
            playerForm = playerForm + 1
        end
    end
end
v = {
    run = {
        transformations = __TS__New(Map)
    }
}
function ____exports.init(self, mod)
    saveDataManager(nil, "postTransformationCallback", v, hasSubscriptions)
    mod:AddCallbackCustom(ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED, postPlayerUpdateReorderedPlayer, 0)
end
return ____exports
 end,
["mod.src.network.struct"] = function(...) 
-- luacheck: ignore

--[[
 * Copyright (c) 2015-2020 Iryont <https://github.com/iryont/lua-struct>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
--]]

local unpack = table.unpack or _G.unpack
local math = require('math')

local function frexp(x)
  local exponent
  if x == 0.0 then
    exponent = 0
  else
    exponent = math.floor(1 + math.log(math.abs(x), 2))
  end
  return x * (2 ^ (-exponent)), exponent
end

local struct = {}

function struct:pack(format, vars)
  local stream = {}
  local endianness = true

  for i = 1, format:len() do
    local opt = format:sub(i, i)

    if opt == '<' then
      endianness = true
    elseif opt == '>' then
      endianness = false
    elseif opt:find('[bBhHiIlL]') then
      local n = opt:find('[hH]') and 2 or opt:find('[iI]') and 4 or opt:find('[lL]') and 8 or 1
      local firstElement = table.remove(vars, 1)
      local val = tonumber(firstElement)
      if val == nil then
        error("Failed to convert \"" .. firstElement .. "\" to a number.")
      end

      local bytes = {}
      for j = 1, n do
        table.insert(bytes, string.char(val % (2 ^ 8)))
        val = math.floor(val / (2 ^ 8))
      end

      if not endianness then
        table.insert(stream, string.reverse(table.concat(bytes)))
      else
        table.insert(stream, table.concat(bytes))
      end
    elseif opt:find('[fd]') then
      local firstElement = table.remove(vars, 1)
      local val = tonumber(firstElement)
      if val == nil then
        error("Failed to convert \"" .. firstElement .. "\" to a number.")
      end
      local sign = 0

      if val < 0 then
        sign = 1
        val = -val
      end

      local mantissa, exponent = frexp(val)
      if val == 0 then
        mantissa = 0
        exponent = 0
      else
        mantissa = (mantissa * 2 - 1) * 0.5 * 2.0 ^ ((opt == 'd') and 53 or 24)
        exponent = exponent + ((opt == 'd') and 1022 or 126)
      end

      local bytes = {}
      if opt == 'd' then
        val = mantissa
        for i = 1, 6 do
          table.insert(bytes, string.char(math.floor(val) % (2 ^ 8)))
          val = math.floor(val / (2 ^ 8))
        end
      else
        table.insert(bytes, string.char(math.floor(mantissa) % (2 ^ 8)))
        val = math.floor(mantissa / (2 ^ 8))
        table.insert(bytes, string.char(math.floor(val) % (2 ^ 8)))
        val = math.floor(val / (2 ^ 8))
      end

      table.insert(
        bytes,
        string.char(math.floor(exponent * ((opt == 'd') and 16 or 128) + val) % (2 ^ 8))
      )
      val = math.floor((exponent * ((opt == 'd') and 16 or 128) + val) / (2 ^ 8))
      table.insert(bytes, string.char(math.floor(sign * 128 + val) % (2 ^ 8)))
      val = math.floor((sign * 128 + val) / (2 ^ 8))

      if not endianness then
        table.insert(stream, string.reverse(table.concat(bytes)))
      else
        table.insert(stream, table.concat(bytes))
      end
    elseif opt == 's' then
      table.insert(stream, tostring(table.remove(vars, 1)))
      table.insert(stream, string.char(0))
    elseif opt == 'c' then
      local n = format:sub(i + 1):match('%d+')
      local length = tonumber(n)
      if length == nil then
        error("Failed to convert \"" .. length .. "\" to a number.")
      end

      if length > 0 then
        local str = tostring(table.remove(vars, 1))
        if length - str:len() > 0 then
          str = str .. string.rep(' ', length - str:len())
        end
        table.insert(stream, str:sub(1, length))
      end
      i = i + n:len()
    end
  end

  return table.concat(stream)
end

function struct:unpack(format, stream, pos)
  local vars = {}
  local iterator = pos or 1
  local endianness = true

  for i = 1, format:len() do
    local opt = format:sub(i, i)

    if opt == '<' then
      endianness = true
    elseif opt == '>' then
      endianness = false
    elseif opt:find('[bBhHiIlL]') then
      local n = opt:find('[hH]') and 2 or opt:find('[iI]') and 4 or opt:find('[lL]') and 8 or 1
      local signed = opt:lower() == opt

      local val = 0
      for j = 1, n do
        local byte = string.byte(stream:sub(iterator, iterator))
        if endianness then
          val = val + byte * (2 ^ ((j - 1) * 8))
        else
          val = val + byte * (2 ^ ((n - j) * 8))
        end
        iterator = iterator + 1
      end

      if signed and val >= 2 ^ (n * 8 - 1) then
        val = val - 2 ^ (n * 8)
      end

      table.insert(vars, math.floor(val))
    elseif opt:find('[fd]') then
      local n = (opt == 'd') and 8 or 4
      local x = stream:sub(iterator, iterator + n - 1)
      iterator = iterator + n

      if not endianness then
        x = string.reverse(x)
      end

      local sign = 1
      local mantissa = string.byte(x, (opt == 'd') and 7 or 3) % ((opt == 'd') and 16 or 128)
      for i = n - 2, 1, -1 do
        mantissa = mantissa * (2 ^ 8) + string.byte(x, i)
      end

      if string.byte(x, n) > 127 then
        sign = -1
      end

      local exponent = (
        (string.byte(x, n) % 128)
        * ((opt == 'd') and 16 or 2)
        + math.floor(string.byte(x, n - 1) / ((opt == 'd') and 16 or 128))
      )
      if exponent == 0 then
        table.insert(vars, 0.0)
      else
        mantissa = (mantissa * 2.0 ^ ((opt == 'd') and -52 or -23) + 1) * sign
        table.insert(vars, mantissa * 2.0 ^ (exponent - ((opt == 'd') and 1023 or 127)))
      end
    elseif opt == 's' then
      local bytes = {}
      for j = iterator, stream:len() do
        if stream:sub(j, j) == string.char(0) then
          break
        end

        table.insert(bytes, stream:sub(j, j))
      end

      local str = table.concat(bytes)
      iterator = iterator + str:len() + 1
      table.insert(vars, str)
    elseif opt == 'c' then
      local n = format:sub(i + 1):match('%d+')
      table.insert(vars, stream:sub(iterator, iterator + tonumber(n) - 1))
      iterator = iterator + tonumber(n)
      i = i + n:len()
    end
  end

  return unpack(vars)
end

return struct
 end,
["mod.src.data.map"] = function(...) 

return {
	METADATA=nil,
	{TYPE=1, VARIANT=0, SUBTYPE=0, NAME="Cafeteria", DIFFICULTY=1, WEIGHT=1, WIDTH=26, HEIGHT=14, SHAPE=8, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=-1, GRIDY=10, SLOT=4, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=14, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=-1, SLOT=5, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=14, SLOT=7, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=3, SLOT=2, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=10, SLOT=6, EXISTS=true},
	},
	{TYPE=1, VARIANT=1, SUBTYPE=0, NAME="Admin Hall", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=14, SHAPE=4, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=-1, GRIDY=10, SLOT=4, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=14, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=10, SLOT=6, EXISTS=true},
	},
	{TYPE=1, VARIANT=2, SUBTYPE=0, NAME="Admin", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=3, SUBTYPE=0, NAME="Storage", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=14, SHAPE=4, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=-1, GRIDY=10, SLOT=4, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=14, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=10, SLOT=6, EXISTS=true},
	},
	{TYPE=1, VARIANT=4, SUBTYPE=0, NAME="Medbay Hall", DIFFICULTY=1, WEIGHT=1, WIDTH=26, HEIGHT=7, SHAPE=6, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=-1, SLOT=5, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=7, SLOT=7, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=5, SUBTYPE=0, NAME="Medbay", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=6, SUBTYPE=0, NAME="Upper Engine", DIFFICULTY=1, WEIGHT=1, WIDTH=26, HEIGHT=14, SHAPE=12, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=-1, GRIDY=10, SLOT=4, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=14, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=10, SLOT=6, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=-1, SLOT=5, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=7, SLOT=7, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=7, SUBTYPE=0, NAME="Engine Hall", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=8, SUBTYPE=0, NAME="Reactor", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=9, SUBTYPE=0, NAME="Security", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=10, SUBTYPE=0, NAME="Lower Engine", DIFFICULTY=1, WEIGHT=1, WIDTH=26, HEIGHT=14, SHAPE=10, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=-1, GRIDY=10, SLOT=4, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=14, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=6, SLOT=5, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=14, SLOT=7, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=10, SLOT=6, EXISTS=true},
	},
	{TYPE=1, VARIANT=11, SUBTYPE=0, NAME="Electrical Hall", DIFFICULTY=1, WEIGHT=1, WIDTH=26, HEIGHT=7, SHAPE=6, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=-1, SLOT=5, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=7, SLOT=7, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=12, SUBTYPE=0, NAME="Electrical", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=13, SUBTYPE=0, NAME="Weapons", DIFFICULTY=1, WEIGHT=1, WIDTH=26, HEIGHT=14, SHAPE=11, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=12, GRIDY=10, SLOT=4, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=-1, SLOT=5, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=14, SLOT=7, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=3, SLOT=2, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=10, SLOT=6, EXISTS=true},
	},
	{TYPE=1, VARIANT=14, SUBTYPE=0, NAME="O2 Hall", DIFFICULTY=1, WEIGHT=1, WIDTH=26, HEIGHT=7, SHAPE=6, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=-1, SLOT=5, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=7, SLOT=7, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=15, SUBTYPE=0, NAME="O2", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=16, SUBTYPE=0, NAME="Navigation", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=17, SUBTYPE=0, NAME="Navigation Hall", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=14, SHAPE=4, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=-1, GRIDY=10, SLOT=4, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=14, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=10, SLOT=6, EXISTS=true},
	},
	{TYPE=1, VARIANT=18, SUBTYPE=0, NAME="Shields", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=14, SHAPE=4, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=-1, GRIDY=10, SLOT=4, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=14, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=10, SLOT=6, EXISTS=true},
	},
	{TYPE=1, VARIANT=19, SUBTYPE=0, NAME="Communication Hall", DIFFICULTY=1, WEIGHT=1, WIDTH=26, HEIGHT=7, SHAPE=6, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=-1, SLOT=5, EXISTS=true},
		{ISDOOR=true, GRIDX=19, GRIDY=7, SLOT=7, EXISTS=true},
		{ISDOOR=true, GRIDX=26, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=20, SUBTYPE=0, NAME="Communication", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=98, SUBTYPE=0, NAME="Task", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
	},
	{TYPE=1, VARIANT=99, SUBTYPE=0, NAME="Map", DIFFICULTY=1, WEIGHT=1, WIDTH=13, HEIGHT=7, SHAPE=1, METADATA=nil,
		{ISDOOR=true, GRIDX=-1, GRIDY=3, SLOT=0, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=-1, SLOT=1, EXISTS=true},
		{ISDOOR=true, GRIDX=6, GRIDY=7, SLOT=3, EXISTS=true},
		{ISDOOR=true, GRIDX=13, GRIDY=3, SLOT=2, EXISTS=true},
		{ISDOOR=false, GRIDX=2, GRIDY=0,
			{TYPE=199, VARIANT=40, SUBTYPE=24, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=3, GRIDY=0,
			{TYPE=199, VARIANT=40, SUBTYPE=24, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=4, GRIDY=0,
			{TYPE=199, VARIANT=40, SUBTYPE=16, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=5, GRIDY=0,
			{TYPE=199, VARIANT=40, SUBTYPE=16, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=6, GRIDY=0,
			{TYPE=199, VARIANT=40, SUBTYPE=1, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=7, GRIDY=0,
			{TYPE=199, VARIANT=40, SUBTYPE=3, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=8, GRIDY=0,
			{TYPE=199, VARIANT=40, SUBTYPE=52, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=9, GRIDY=0,
			{TYPE=199, VARIANT=40, SUBTYPE=52, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=2, GRIDY=1,
			{TYPE=199, VARIANT=40, SUBTYPE=24, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=4, GRIDY=1,
			{TYPE=199, VARIANT=40, SUBTYPE=20, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=6, GRIDY=1,
			{TYPE=199, VARIANT=40, SUBTYPE=1, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=7, GRIDY=1,
			{TYPE=199, VARIANT=40, SUBTYPE=1, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=9, GRIDY=1,
			{TYPE=199, VARIANT=40, SUBTYPE=52, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=1, GRIDY=2,
			{TYPE=199, VARIANT=40, SUBTYPE=32, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=2, GRIDY=2,
			{TYPE=199, VARIANT=40, SUBTYPE=28, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=3, GRIDY=2,
			{TYPE=199, VARIANT=40, SUBTYPE=36, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=6, GRIDY=2,
			{TYPE=199, VARIANT=40, SUBTYPE=4, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=8, GRIDY=2,
			{TYPE=199, VARIANT=40, SUBTYPE=60, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=9, GRIDY=2,
			{TYPE=199, VARIANT=40, SUBTYPE=56, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=10, GRIDY=2,
			{TYPE=199, VARIANT=40, SUBTYPE=56, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=2, GRIDY=3,
			{TYPE=199, VARIANT=40, SUBTYPE=40, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=4, GRIDY=3,
			{TYPE=199, VARIANT=40, SUBTYPE=48, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=6, GRIDY=3,
			{TYPE=199, VARIANT=40, SUBTYPE=4, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=7, GRIDY=3,
			{TYPE=199, VARIANT=40, SUBTYPE=8, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=10, GRIDY=3,
			{TYPE=199, VARIANT=40, SUBTYPE=68, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=11, GRIDY=3,
			{TYPE=199, VARIANT=40, SUBTYPE=64, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=2, GRIDY=4,
			{TYPE=199, VARIANT=40, SUBTYPE=40, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=3, GRIDY=4,
			{TYPE=199, VARIANT=40, SUBTYPE=40, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=4, GRIDY=4,
			{TYPE=199, VARIANT=40, SUBTYPE=44, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=5, GRIDY=4,
			{TYPE=199, VARIANT=40, SUBTYPE=44, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=6, GRIDY=4,
			{TYPE=199, VARIANT=40, SUBTYPE=12, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=9, GRIDY=4,
			{TYPE=199, VARIANT=40, SUBTYPE=72, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=10, GRIDY=4,
			{TYPE=199, VARIANT=40, SUBTYPE=68, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=6, GRIDY=5,
			{TYPE=199, VARIANT=40, SUBTYPE=12, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=7, GRIDY=5,
			{TYPE=199, VARIANT=40, SUBTYPE=76, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=8, GRIDY=5,
			{TYPE=199, VARIANT=40, SUBTYPE=76, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=9, GRIDY=5,
			{TYPE=199, VARIANT=40, SUBTYPE=72, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=0, GRIDY=6,
			{TYPE=199, VARIANT=41, SUBTYPE=16, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=1, GRIDY=6,
			{TYPE=199, VARIANT=40, SUBTYPE=392, WEIGHT=1, METADATA=nil},
		},
		{ISDOOR=false, GRIDX=8, GRIDY=6,
			{TYPE=199, VARIANT=40, SUBTYPE=80, WEIGHT=1, METADATA=nil},
		},
	},
} end,
["mod.src.lib.collisionObjects"] = function(...) 
local exports = {}

local collisionObjects
local gridIndexToCollisionObjects
local numCollisionObjectIds
local collisionObjectsPresent

--[[ places a collision object in the room
- Vec1: Top-left of rectangle
- Vec2: Bottom-right of rectangle
- collisionClass: CollisionClass enum (optional)
- conditions: Function(collObj, ent). Gets called on collision. Return true to allow collision (optional)
Returns the collision object which you can dynamically adjust
]]
function exports:setCollisionRect(Vec1, Vec2, collisionClass, conditions)
	numCollisionObjectIds = numCollisionObjectIds + 1
	collisionObjectsPresent = true
	local collisionObjId = numCollisionObjectIds
	local collisionObject = {
		Vec1 = {X=Vec1.X, Y=Vec1.Y}, -- saveable vector
		Vec2 = {X=Vec2.X, Y=Vec2.Y},
		Id = collisionObjId,
		CollisionClass = collisionClass or GridCollisionClass.COLLISION_SOLID,
		Conditions = conditions,
		Remove = function()
			collisionObjects[collisionObjId] = nil
		end
	}

	collisionObjects[collisionObjId] = collisionObject
	return collisionObject
end

-- collisionObjects is mapped by collisionObjId
local function getCollisionObjects()
	return collisionObjects
end

-- boolean
local function areCollisionObjectsPresent()
	return collisionObjectsPresent
end

--[[ checks if a EntityGridCollisionClass should collide with a GridCollisionClass
- eColClass: EntityGridCollisionClass enum
- gColClass: GridCollisionClass enum
- isPlayer: boolean. Special case for COLLISION_WALL_EXCEPT_PLAYER
]]
local function canCollideWithGrid(eColClass, gColClass, isPlayer)
	if gColClass == GridCollisionClass.COLLISION_PIT then
		return eColClass == EntityGridCollisionClass.GRIDCOLL_GROUND

	elseif gColClass == GridCollisionClass.COLLISION_SOLID or gColClass == GridCollisionClass.COLLISION_OBJECT then
		return eColClass == EntityGridCollisionClass.GRIDCOLL_GROUND or eColClass == EntityGridCollisionClass.GRIDCOLL_NOPITS or eColClass == EntityGridCollisionClass.GRIDCOLL_BULLET

	elseif gColClass == GridCollisionClass.COLLISION_WALL then
		return eColClass ~= EntityGridCollisionClass.GRIDCOLL_NONE

	elseif gColClass == GridCollisionClass.COLLISION_WALL_EXCEPT_PLAYER then
		return eColClass ~= EntityGridCollisionClass.GRIDCOLL_NONE and not isPlayer
	end

	return false
end

-- count of all active collisionObjects in the room
local function getNumCollisionObjects()
	local n = 0
	local collisionObjects = getCollisionObjects()
	for i=1, getNumCollisionObjectIds() do
		if collisionObjects[i] then
			n = n + 1
		end
	end

	return n
end

-- not necessarily the amount of collisionObjects in the room, as it also counts removed collision objects
local function getNumCollisionObjectIds()
	return numCollisionObjectIds
end

-- one-time operation that merges collision objects that could function as one together to improve performance
-- collision objects with collObj.DontMerge = true ignore this
local function mergeCollisionObjects()
	local collisionObjects = getCollisionObjects()
	for i=1, getNumCollisionObjectIds() do
		local collObj = collisionObjects[i]

		if collObj and not collObj.DontMerge then
			for i2=1, getNumCollisionObjectIds() do
				local collObj2 = collisionObjects[i2]
				if collObj2 and not collObj2.DontMerge and collObj.CollisionClass == collObj2.CollisionClass and collObj.Conditions == collObj2.Conditions then
					if collObj.Vec2.X == collObj2.Vec1.X and collObj.Vec1.Y == collObj2.Vec1.Y and (collObj.Vec2.Y-collObj.Vec1.Y) == (collObj2.Vec2.Y-collObj2.Vec1.Y)
					or collObj.Vec1.X == collObj2.Vec1.X and collObj.Vec2.Y == collObj2.Vec1.Y and (collObj.Vec2.X-collObj.Vec1.X) == (collObj2.Vec2.X-collObj2.Vec1.X) then

						collObj.Vec2 = collObj2.Vec2
						collObj2:Remove()
					end
				end
			end
		end
	end
end

-- a method to reconnect conditions to collisionObjects after reloading.
-- works by setting a unique field for the collObjs (eg. collObj.IsCustomPoopGrid = true),
-- which is something that can be saved and reloaded to connect the right conditions function which normally can't be saved
local function reconnectCollisionObjectConditions(conditions, hasField)
	local collisionObjects = getCollisionObjects()
	for i=1, getNumCollisionObjectIds() do
		local collObj = collisionObjects[i]
		if collObj and (not hasField or collObj[hasField]) then
			collObj.Conditions = conditions
		end
	end
end

-- assigns grid indices to all current collisionObjects to identify them by using getCollisionObjectsByGrid
local function assignGridIndicesToCollisionObjects()
	local room = Game():GetRoom()
	local collisionObjects = getCollisionObjects()
	gridIndexToCollisionObjects = {}

	for i=1, getNumCollisionObjectIds() do
		local collObj = collisionObjects[i]

		if collObj then
			local gridIndices = {}
			local size = {X=collObj.Vec2.X - collObj.Vec1.X, Y=collObj.Vec2.Y - collObj.Vec1.Y}
			for x=0, math.ceil(size.X/40) do
				for y=0, math.ceil(size.Y/40) do
					local index = room:GetGridIndex(Vector(collObj.Vec1.X + math.min(x*40, size.X), collObj.Vec1.Y + math.min(y*40, size.Y)))

					local hasIndex = false
					for _,index2 in ipairs(gridIndices) do
						if index == index2 then
							hasIndex = true
							break
						end
					end

					if not hasIndex then
						table.insert(gridIndices, index)
					end
				end
			end

			for _,index in ipairs(gridIndices) do
				gridIndexToCollisionObjects[tostring(index)] = gridIndexToCollisionObjects[tostring(index)] or {}
				table.insert(gridIndexToCollisionObjects[tostring(index)], collObj)
			end
		end
	end
end

-- only works if assignGridIndicesToCollisionObjects() is used. Not easily compatible with moving collObjs
local function getCollisionObjectsByGrid(index)
	return gridIndexToCollisionObjects[tostring(index)] or {}
end

-- whether the entity is currently colliding with a collObj
local function collidesWithCollisionObject(ent)
	return areCollisionObjectsPresent() and not not ent:GetData().CollidesWithCollisionObject
end

-- whether the entity either currently collides with a vanilla grid or a collObj
local function collidesWithGrid(ent)
	return collidesWithCollisionObject(ent) or ent:CollidesWithGrid()
end

-- checks whether the entity will collide with collObjs if it's at a certain position
local function positionCollidesWithCollisionObject(pos, ent)
	if not areCollisionObjectsPresent() then
		return false
	end

	local collisionObjects = getCollisionObjects()
	local viableCollObjects = collisionObjects
	if ent then
		viableCollObjects = {}

		for i=1, getNumCollisionObjectIds() do
			local collObj = collisionObjects[i]
			if collObj and canCollideWithGrid(ent.GridCollisionClass, collObj.CollisionClass, ent.Type == EntityType.ENTITY_PLAYER)
			and (not collObj.Conditions or collObj.Conditions(collObj, ent)) then
				table.insert(viableCollObjects, collObj)
			end
		end
	end

	for _, collObj in pairs(viableCollObjects) do
		if pos.X >= math.min(collObj.Vec1.X, collObj.Vec2.X) and pos.X <= math.max(collObj.Vec1.X, collObj.Vec2.X)
		and pos.Y >= math.min(collObj.Vec1.Y, collObj.Vec2.Y) and pos.Y <= math.max(collObj.Vec1.Y, collObj.Vec2.Y) then
			return true
		end
	end

	return false
end

-- return value 1: distance. -1 if no collision object is found
-- return value 2: nearest collObj. nil if no collision object is found
local function distanceFromNearestCollisionObject(pos)
	if not areCollisionObjectsPresent() then
		return -1, nil
	end

	local collisionObjects = getCollisionObjects()
	local distance, nearestCollObj
	for i=1, getNumCollisionObjectIds() do
		local collObj = collisionObjects[i]
		if collObj then
			local closestPoint = Vector(math.min(math.max(pos.X, collObj.Vec1.X), collObj.Vec2.X), math.min(math.max(pos.Y, collObj.Vec1.Y), collObj.Vec2.Y))
			local dist = closestPoint:Distance(pos)
			if not nearestCollObj or dist < distance then
				distance = dist
				nearestCollObj = collObj
			end
		end
	end

	if not nearestCollObj then
		return -1, nil
	else
		return distanceSquared, nearestCollObj
	end
end

local function entityGridCollisionUpdate(_, ent)
	if areCollisionObjectsPresent() then
		local data = ent:GetData()
		data.CollidesWithCollisionObject = false
		local collisionObjects = getCollisionObjects()
		local viableCollObjects = {}
		for i=1, getNumCollisionObjectIds() do
			local collObj = collisionObjects[i]
			if collObj and canCollideWithGrid(ent.GridCollisionClass, collObj.CollisionClass, ent.Type == EntityType.ENTITY_PLAYER)
			and (not collObj.Conditions or collObj.Conditions(collObj, ent)) then
				table.insert(viableCollObjects, collObj)
			end
		end

		local entIdentifier = ent.Type == EntityType.ENTITY_TEAR and "TEAR"
							or ent.Type == EntityType.ENTITY_PROJECTILE and "PROJECTILE"
							or ent.Type == EntityType.ENTITY_PLAYER and "PLAYER"
							or ent.Type == EntityType.ENTITY_PICKUP and "PICKUP"
							or ent.Type == EntityType.ENTITY_BOMBDROP and "BOMB"
							or "NPC"

		local newTargetPos = ent.Position + ent.Velocity
		local maxX, maxY, minX, minY = math.huge, math.huge, 0, 0
		for _,collObj in ipairs(viableCollObjects) do
			if ent.Type == EntityType.ENTITY_TEAR or ent.Type == EntityType.ENTITY_PROJECTILE then
				local closestPoint = ent.Position:Clamped(collObj.Vec1.X, collObj.Vec1.Y, collObj.Vec2.X, collObj.Vec2.Y)

				if ent.Position:Distance(closestPoint) < ent.Size then
					local ignoreCollision = false
					-- potential PRE_COLLISION_OBJECT callback setup, which stops collision with return false
					-- PRE_TEAR_COLLISION_COLLOBJ, PRE_PROJECTILE_COLLISION_COLLOBJ
					--[[local callbacks = StageAPI.GetCallbacks("PRE_" .. tostring(entIdentifier) .. "_COLLISION_COLLOBJ")
					for _, callback in ipairs(callbacks) do
						if (not callback.Params[1] or callback.Params[1] == ent.Variant) then
							local ret = callback.Function(ent, data, collObj)
							if ret ~= nil then ignoreCollision = not ret end
						end
					end]]

					if not ignoreCollision then
						ent:Die()
						return
					end
				end
			else
				local centerPoint = Vector(collObj.Vec1.X + collObj.Vec2.X, collObj.Vec1.Y + collObj.Vec2.Y) * 0.5
				local posDiff = ent.Position - centerPoint

				local scaledPosDiff
				if collObj.Vec2.X - collObj.Vec1.X ~= collObj.Vec2.Y - collObj.Vec1.Y then
					local coef = math.sqrt((collObj.Vec2.X - collObj.Vec1.X) / (collObj.Vec2.Y - collObj.Vec1.Y))
					scaledPosDiff = Vector(posDiff.X / coef, posDiff.Y * coef)
				else
					scaledPosDiff = posDiff
				end

				local ignoreCollision = false
				local closestPoint = ent.Position:Clamped(collObj.Vec1.X, collObj.Vec1.Y, collObj.Vec2.X, collObj.Vec2.Y)

				if ent.Position.X == closestPoint.X and ent.Position.Y == closestPoint.Y then
					-- potential PRE_COLLISION_OBJECT callback setup, which stops collision with return false
					-- PRE_PLAYER_COLLISION_COLLOBJ, PRE_PICKUP_COLLISION_COLLOBJ, PRE_BOMB_COLLISION_COLLOBJ
					--[[local callbacks = StageAPI.GetCallbacks("PRE_" .. tostring(entIdentifier) .. "_COLLISION_COLLOBJ")
					local ignoreCollision = false
					for _, callback in ipairs(callbacks) do
						if entIdentifier == "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Type) and (not callback.Params[2] or callback.Params[2] == ent.Variant)
						or entIdentifier ~= "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Variant) then
							local ret = callback.Function(ent, data, collObj)
							if ret ~= nil then ignoreCollision = not ret end
						end
					end]]

					if not ignoreCollision then
						if math.abs(scaledPosDiff.X) > math.abs(scaledPosDiff.Y)  then
							if scaledPosDiff.X > 0 then
								minX = math.min(math.max(minX, collObj.Vec2.X + ent.Size), maxX)
								ent.Position = Vector(minX, ent.Position.Y)
							else
								maxX = math.min(math.max(minX, collObj.Vec1.X - ent.Size), maxX)
								ent.Position = Vector(maxX, ent.Position.Y)
							end
						else
							if scaledPosDiff.Y > 0 then
								minY = math.min(math.max(minY, collObj.Vec2.Y + ent.Size), maxY)
								ent.Position = Vector(ent.Position.X, minY)
							else
								maxY = math.min(math.max(minY, collObj.Vec1.Y - ent.Size), maxY)
								ent.Position = Vector(ent.Position.X, maxY)
							end
						end
						newTargetPos = ent.Position + ent.Velocity
						data.CollidesWithCollisionObject = true
					end

				elseif (ent.Position - closestPoint):LengthSquared() < ent.Size ^ 2 then
					local ignoreCollision = false
					-- potential PRE_COLLISION_OBJECT callback setup, which stops collision with return false
					--PRE_PLAYER_COLLISION_COLLOBJ, PRE_PICKUP_COLLISION_COLLOBJ, PRE_BOMB_COLLISION_COLLOBJ
					--[[local callbacks = StageAPI.GetCallbacks("PRE_" .. tostring(entIdentifier) .. "_COLLISION_COLLOBJ")
					for _, callback in ipairs(callbacks) do
						if entIdentifier == "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Type) and (not callback.Params[2] or callback.Params[2] == ent.Variant)
						or entIdentifier ~= "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Variant) then
							local ret = callback.Function(ent, data, collObj)
							if ret ~= nil then ignoreCollision = not ret end
						end
					end]]

					if not ignoreCollision then
						if math.abs(scaledPosDiff.X) > math.abs(scaledPosDiff.Y)  then
							if scaledPosDiff.X > 0 then
								minX = math.min(math.max(minX, math.min(collObj.Vec2.X + ent.Size, (closestPoint + (ent.Position-closestPoint):Resized(ent.Size)).X)), maxX)
								ent.Position = Vector(minX, ent.Position.Y)
							else
								maxX = math.min(math.max(minX, math.max(collObj.Vec1.X - ent.Size, (closestPoint + (ent.Position-closestPoint):Resized(ent.Size)).X)), maxX)
								ent.Position = Vector(maxX, ent.Position.Y)
							end
						else
							if scaledPosDiff.Y > 0 then
								minY = math.min(math.max(minY, math.min(collObj.Vec2.Y + ent.Size, (closestPoint + (ent.Position-closestPoint):Resized(ent.Size)).Y)), maxY)
								ent.Position = Vector(ent.Position.X, minY)
							else
								maxY = math.min(math.max(minY, math.max(collObj.Vec1.Y - ent.Size, (closestPoint + (ent.Position-closestPoint):Resized(ent.Size)).Y)), maxY)
								ent.Position = Vector(ent.Position.X, maxY)
							end
						end
						newTargetPos = ent.Position + ent.Velocity
						data.CollidesWithCollisionObject = true
					end
				end

				if not ignoreCollision then
					local closestPointToTargetPos = Vector(math.min(math.max(newTargetPos.X, collObj.Vec1.X), collObj.Vec2.X), math.min(math.max(newTargetPos.Y, collObj.Vec1.Y), collObj.Vec2.Y))

					if (newTargetPos - closestPointToTargetPos):LengthSquared() < ent.Size ^ 2 then
						local ignoreCollision = false
						-- potential PRE_COLLISION_OBJECT callback setup, which stops collision with return false
						-- PRE_PLAYER_COLLISION_COLLOBJ, PRE_PICKUP_COLLISION_COLLOBJ, PRE_BOMB_COLLISION_COLLOBJ
						--[[local callbacks = StageAPI.GetCallbacks("PRE_" .. tostring(entIdentifier) .. "_COLLISION_COLLOBJ")
						for _, callback in ipairs(callbacks) do
							if entIdentifier == "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Type) and (not callback.Params[2] or callback.Params[2] == ent.Variant)
							or entIdentifier ~= "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Variant) then
								local ret = callback.Function(ent, data, collObj)
								if ret ~= nil then ignoreCollision = not ret end
							end
						end]]

						if not ignoreCollision then
							if math.abs(scaledPosDiff.X) > math.abs(scaledPosDiff.Y)  then
								if scaledPosDiff.X > 0 then
									minX = math.min(math.max(minX, math.min(collObj.Vec2.X + ent.Size, (closestPointToTargetPos + (newTargetPos-closestPointToTargetPos):Resized(ent.Size)).X)), maxX)
									newTargetPos = Vector(minX, newTargetPos.Y)
								else
									maxX = math.min(math.max(minX, math.max(collObj.Vec1.X - ent.Size, (closestPointToTargetPos + (newTargetPos-closestPointToTargetPos):Resized(ent.Size)).X)), maxX)
									newTargetPos = Vector(maxX, newTargetPos.Y)
								end
							else
								if scaledPosDiff.Y > 0 then
									minY = math.min(math.max(minY, math.min(collObj.Vec2.Y + ent.Size, (closestPointToTargetPos + (newTargetPos-closestPointToTargetPos):Resized(ent.Size)).Y)), maxY)
									newTargetPos = Vector(newTargetPos.X, minY)
								else
									maxY = math.min(math.max(minY, math.max(collObj.Vec1.Y - ent.Size, (closestPointToTargetPos + (newTargetPos-closestPointToTargetPos):Resized(ent.Size)).Y)), maxY)
									newTargetPos = Vector(newTargetPos.X, maxY)
								end
							end
							data.CollidesWithCollisionObject = true
						end
					end
				end
			end
		end

		ent.Velocity = newTargetPos - ent.Position
	end
end

function exports:init(mod)
	mod:AddCallback(ModCallbacks.MC_POST_NEW_ROOM, function()
		collisionObjects = {}
		gridIndexToCollisionObjects = {}
		numCollisionObjectIds = 0
		collisionObjectsPresent = false
	end)

	local entityUpdateCallbacks = {
		"MC_NPC_UPDATE",
		"MC_POST_PICKUP_UPDATE",
		"MC_POST_PLAYER_UPDATE",
		"MC_POST_BOMB_UPDATE",
		"MC_POST_TEAR_UPDATE",
		"MC_POST_PROJECTILE_UPDATE",
	}
	for _,callback in ipairs(entityUpdateCallbacks) do
		mod:AddCallback(ModCallbacks[callback], entityGridCollisionUpdate)
	end
end

return exports
 end,
}
return require("mod.src.bundleEntry", ...)
