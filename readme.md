# Function-Object Literal Syntax

Deprecated. If you want to take ownership, file an issue.

Requires [Sweet.js](https://github.com/mozilla/sweet.js) version less than 1.0!

This macro combines the power of two powerful literals: Functions and Objects.

```javascript
var spy = fn {
    function spy () {
        spy.callCount++;
        spy.wasCalled = true;
    },

    callCount: 0,
    wasCalled: false
};

console.log(spy.wasCalled); // false
console.log(spy.callCount); // 0

spy();

console.log(spy.wasCalled); // true
console.log(spy.callCount); // 1
```

## Features

* Declarative syntax!
* Function name in scope over entire object.

## Alternative Syntax

```
var spy = fn {
    [[call]]: function spy () {
        spy.callCount++;
        spy.wasCalled = true;
    },

    callCount: 0,
    wasCalled: false
};
```

Note: The [[call]] property must be the first property.

Note: If you can think of a better unambiguous property name,
please file an issue with your suggestion.

## Tested

This code has tests in the form of `examples.sjs`.
