'use strict';

class BaseException extends Error{
    constructor(message = "",fileName,lineNumber) {
        super(message,fileName,lineNumber);
        this.name = 'BaseException';
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, BaseException);
        }
    }
}

export class InvalidAccessConstructorException extends BaseException{
    constructor(fileName,lineNumber) {
        super("Constructor can't be called as a function",fileName,lineNumber);
        this.name = 'InvalidAccessConstructorException';
    }
}

export class EmptyValueException extends BaseException{
    constructor(param,fileName,lineNumber) {
        super("Error: The parameter " + param + "can't be empty.",fileName,
            lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

export class InvalidValueException extends BaseException{
    constructor(param,value,fileName,lineNumber) {
        super(`Error: the parameter ${param} has an invalid value. (
        ${param}:${value})`,fileName,lineNumber);
        this.param =param;
        this.name = "EmptyValueException";
    }
}

export class AbstractClassException extends BaseException{
    constructor(className,fileName,lineNumber) {
        super(`Error: The class ${className} is abstract.`,fileName,lineNumber);
        this.className = className;
        this.name = "AbstractClassException";
    }
}

export class InvalidInstanceException extends BaseException{
    constructor(param,value,fileName,lineNumber) {
        super(`Error: The parameter ${param} has an invalid instance type. Must be: ${value}`,fileName,lineNumber);
        this.name = 'InvalidInstanceException';
        this.param = param;
    }
}

export class IndexOutOfBoundsException extends BaseException{
    constructor(fileName,lineNumber) {
        super('Error: value is out of bounds.',fileName,lineNumber);
        this.name = 'IndexOutOfBoundsException';
    }
}

export class NonExistentMethodException extends BaseException{
    constructor(fileName,lineNumber) {
        super('Error: The called method is not implemented',fileName,lineNumber);
        this.name = 'NonExistentMethodException';
    }
}

export class FullListException extends BaseException{
    constructor(fileName,lineNumber) {
        super("Error: the list is full",fileName,lineNumber);
        this.name = 'FullListException';
        this.param = param;
    }
}

export class AbstractClassException extends BaseException{
    constructor(className,fileName,lineNumber) {
        super(`Error: The class ${className} + is abstract`,fileName,lineNumber);
        this.name = 'AbstractClassException';
    }
}

export class InvalidRegexException extends BaseException{
    constructor(param,fileName,lineNumber) {
        super(`Error: the parameter ${param} does not match the specified regular expression`,fileName,lineNumber);
        this.name = 'InvalidRegexException';
        this.param = param;
    }
}

export class RepeatedArgumentException extends BaseException{
    constructor(param,fileName,lineNumber) {
        super(`Error: The parameter ${param} is already present inside the list`,fileName,lineNumber);
        this.name = 'RepeatedArgumentException';
        this.param = param;
    }
}

export class NotFoundArgumentException extends BaseException{
    constructor(param,fileName,lineNumber) {
        super(`Error: The argument ${param} is non existent`,fileName,lineNumber);
        this.name = 'NotFoundArgumentException';
        this.param = param;
    }
}


