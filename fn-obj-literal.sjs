macro fn__props {
  // Handle ident props with trailing syntax
  rule { $fnname ( $prop:ident $[:] $val:expr , $rest ... )  } => {
    $fnname.$prop = $val;
    fn__props $fnname ($rest ...)
  }
  // Handle string props with trailing syntax
  rule { $fnname ( $prop:lit $[:] $val:expr , $rest ... )  } => {
    $fnname[$prop] = $val;
    fn__props $fnname ($rest ...)
  }
  // Handle ident props with no syntax left
  rule { $fnname ( $prop:ident $[:] $val:expr )  } => {
    $fnname.$prop = $val;
  }
  // Handle string props with no syntax left
  rule { $fnname ( $prop:lit $[:] $val:expr )  } => {
    $fnname[$prop] = $val;
  }
  // Noop
  rule { $fnname () } => { }
}

macro fn__wrapper {
  // Named functions
  rule { ( function $name ($params ...) { $body ... } ) ( $props ... ) } => {
    (function() {
      var $name = function $name ($params ...) { $body ... };
      fn__props $name ($props ...)
      return $name;
    }())
  }
  
  // Anonymous functions
  rule { ( $fn ... ) ( $props ... ) } => {
    (function () {
      var _fn = $fn ... ;
      fn__props _fn ($props ...)
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