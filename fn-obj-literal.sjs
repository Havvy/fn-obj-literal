macro obj__props {
  // Handle ident props with trailing syntax
  rule { $objname ( $prop:ident $[:] $val:expr , $rest ... )  } => {
    $objname.$prop = $val;
    obj__props $objname ($rest ...)
  }
  // Handle string props with trailing syntax
  rule { $objname ( $prop:lit $[:] $val:expr , $rest ... )  } => {
    $objname[$prop] = $val;
    obj__props $objname ($rest ...)
  }
  // Handle ident props with no syntax left
  rule { $objname ( $prop:ident $[:] $val:expr )  } => {
    $objname.$prop = $val;
  }
  // Handle string props with no syntax left
  rule { $objname ( $prop:lit $[:] $val:expr )  } => {
    $objname[$prop] = $val;
  }
  // Noop
  rule { $objname () } => { }
}

macro fn__wrapper {
  // Named functions
  rule { ( function $name ($params ...) { $body ... } ) ( $props ... ) } => {
    (function() {
      var $name = function $name ($params ...) { $body ... };
      obj__props $name ($props ...)
      return $name;
    }.call(this))
  }
  
  // Anonymous functions
  rule { ( $fn ... ) ( $props ... ) } => {
    (function () {
      var _fn = $fn ... ;
      obj__props _fn ($props ...)
      return _fn;
    }())
  }
}

macro fn {
  // Handle [[call]] property alone.
  rule { { [[call]] : $fn:expr } } => {
    fn__wrapper ($fn) ()
  }

  // Handle [[call]] property with other properties.
  rule { { [[call]] : $fn:expr , $rest ... } } => {
    fn__wrapper ($fn) ($rest ...)
  }

  // Handle no-call property w/o properties. (For completeness)
  rule { { $fn:expr } } => {
    ( $fn )
  }

  // Handle no-call property w/ properties.
  rule { { $fn:expr , $rest ... } } => {
    fn__wrapper ($fn) ($rest ...)
  }
}

export fn;