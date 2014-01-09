// Tests and Examples

// 1. Minimal test case. Not useful.
fn {
  [[call]]: function () { void 0; }
};

// 2. Minimal test case with name. Not useful.
fn {
  [[call]]: function self () { void 0; }
};

// 3. Test case to ensure hygiene. (We use _fn as the variable name when no name is given)
fn {
  [[call]]: function self () { void 0; },
  prop: _fn
};

// 4. A function that returns the number of times it is called.
//    Note how declarative this is.
fn {
  [[call]]: function self () {
    self.called += 1;
    return self.called;
  },

  'called': 0
};

// Here is what we would have to write otherwise:
(function () {
  var fun = function self () {
    self.called += 1;
    return self.called;
  };
  
  fun.called = 0;
  return fun;
}());

// 5. Multiple properties. Now we have a wasCalled property.
fn {
  [[call]]: function self () {
    self.called++;
    self.wasCalled = true;
  }
  
  ,'called': 0
  ,'wasCalled': false
};

// 6. Valid identifiers don't have to be in quotes.
fn {
  [[call]]: function self() {
    console.log(self.test)
  },
  test: 42,
  'foo': 'bar'
};

// 7. The name of the function is in scope over the entire fn-obj literal.
fn {
  [[call]]: function self () {
    void 0;
  },
  
  subfn: function () {
    self();
  }
};

// 8. Prefixing the function with the [[call]] property is optinal.
//    Note that the function has to be first without the [[call]] property.
fn {
  function () { void 0; }
};

// 9. Test case for a function without [[call]] with properties.
fn {
  function self (a, b) {
    return self.double(a) + self.triple(b);
  },
  double: function (n) { return n * 2; },
  triple: function (n) { return n * 3; }
}




