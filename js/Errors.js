//RUBEN JUAREZ PEREZ 2DAW
"use strict";
function BaseException(message = "Default Message", fileName, lineNumber) {
  let instance = new Error(message, fileName, lineNumber);
  instance.name = "MyError";
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, BaseException);
  }
  return instance;
}

BaseException.prototype = Object.create(Error.prototype, {
  constructor: {
    value: BaseException,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
//Excepción acceso inválido a constructor
function InvalidAccessConstructorException() {
  let instance = BaseException.call(
    this,
    "Constructor can’t be called as a function."
  );
  instance.name = "InvalidAccessConstructorException";
  return instance;
}
InvalidAccessConstructorException.prototype = Object.create(
  BaseException.prototype
);
InvalidAccessConstructorException.prototype.constructor =
  InvalidAccessConstructorException;
function EmptyValueException(param) {
  let instance = BaseException.call(
    this,
    "Error: The parameter " + param + " can't be empty."
  );
  instance.name = "EmptyValueException";
  instance.param = param;
  return instance;
}
EmptyValueException.prototype = Object.create(BaseException.prototype);
EmptyValueException.prototype.constructor = EmptyValueException;
//Excepción de valor inválido
function InvalidValueException(param, value) {
  let instance = BaseException.call(
    this,
    "Error: The paramenter " +
      param +
      " has an invalid value. (" +
      param +
      ": " +
      value +
      ")"
  );
  instance.name = "InvalidValueException";
  instance.param = param;
  instance.param = value;
  return instance;
}
InvalidValueException.prototype = Object.create(BaseException.prototype);
InvalidValueException.prototype.constructor = InvalidValueException;
//Excepcion tipo objeto invalido
function InvalidTypeException(param, value) {
  let instance = BaseException.call(
    this,
    "Error: The paramenter " +
      param +
      " has an invalid type. (" +
      param +
      ": " +
      value +
      ")"
  );
  instance.name = "InvalidTypeException";
  instance.param = param;
  instance.param = value;
  return instance;
}
InvalidTypeException.prototype = Object.create(BaseException.prototype);
InvalidTypeException.prototype.constructor = InvalidTypeException;

//Excepcion instancia invalida
function InvalidInstanceException(param, value) {
  let instance = BaseException.call(
    this,
    "Error: The paramenter " +
      param +
      " has an invalid instance type. (" +
      param +
      ": " +
      "must be: " +
      value +
      ")"
  );
  instance.name = "InvalidInstanceException";
  instance.param = param;
  instance.param = value;
  return instance;
}

InvalidInstanceException.prototype = Object.create(BaseException.prototype);
InvalidInstanceException.prototype.constructor = InvalidInstanceException;

//Excepcion Index out of bounds
function IndexOutOfBoundsException() {
  let instance = BaseException.call(this, "Error: value is out of bounds.");
  instance.name = "IndexOutOfBoundsException";
  return instance;
}
IndexOutOfBoundsException.prototype = Object.create(BaseException.prototype);
IndexOutOfBoundsException.prototype.constructor = IndexOutOfBoundsException;

//Excepcion metodo inexistente
function NonExistentMethodException() {
  let instance = BaseException.call(
    this,
    "Error: The called method is not implemented"
  );
  instance.name = "NonExistentMethodException";
  return instance;
}
NonExistentMethodException.prototype = Object.create(BaseException.prototype);
NonExistentMethodException.prototype.constructor = NonExistentMethodException;

function FullListException() {
  let instance = BaseException.call(this, "Error: the list is full");
  instance.name = "FullListException";
  instance.param = param;
  return instance;
}
FullListException.prototype = Object.create(BaseException.prototype);
FullListException.prototype.constructor = FullListException;

function AbstractClassException(className) {
  let instance = BaseException.call(
    this,
    "Error: The class " + className + " is abstract."
  );
  instance.name = "AbstractClassException";
  instance.className = className;
  return instance;
}
AbstractClassException.prototype = Object.create(BaseException.prototype);
AbstractClassException.prototype.constructor = AbstractClassException;

function InvalidRegexException(param) {
  let instance = BaseException.call(
    this,
    "Error: The parameter " + param + " does not match the specified regular expression."
  );
  instance.name = "EmptyValueException";
  instance.param = param;
  return instance;
}
InvalidRegexException.prototype = Object.create(BaseException.prototype);
InvalidRegexException.prototype.constructor = InvalidRegexException;

function RepeatedArgumentException(param) {
  let instance = BaseException.call(
    this,
    "Error: The parameter " + param + " is already present inside the list."
  );
  instance.name = "EmptyValueException";
  instance.param = param;
  return instance;
}
RepeatedArgumentException.prototype = Object.create(BaseException.prototype);
RepeatedArgumentException.prototype.constructor = RepeatedArgumentException;

function NotFoundArgumentException(param) {
  let instance = BaseException.call(
    this,
    "Error: The parameter " + param + " is not present inside the list."
  );
  instance.name = "EmptyValueException";
  instance.param = param;
  return instance;
}
NotFoundArgumentException.prototype = Object.create(BaseException.prototype);
NotFoundArgumentException.prototype.constructor = NotFoundArgumentException;
