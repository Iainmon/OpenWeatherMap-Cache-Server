Thread.js
=========

Javascript async the way I like it.

## Installation

  `npm install async-threading`

## Usage

    let Thread = require('async-threading');

###- Tasks

Same scope as block:

    let callEverySecond = new Thread( () => {
        console.log(callEverySecond.fireTimes + ' seconds have passed.');
    }, 1000);
    
Anonymous scope:

    let callEverySecond = new Thread( function () {
        console.log(this.fireTimes + ' seconds have passed.');
    }, 1000);
    
  * Methods for task Threads
    * `.toggle()` Sets the Thread to the opposite state.
    * `.kill()` Stops and sets the Thread to `undefined`.
  
  
  These will be called ever `1000ms` (one second).
  
  - Warning: I do not recomend doing `new Thread` without assigning it to a variable, because you will not be able to `toggle` or `kill` it.
    
###- Delayed Asynchronous Statements and Functions

Asynchronous delayed statement:

    Thread.spawn( () => {
        console.log('1 second has passed.');
    }, 1000);
    
Anonymous asynchronous delayed function:

    Thread.spawn( function () {
        console.log('1 second has passed.');
    }, 1000);

These will execute `1000ms` (one second) after they are declared

###- Asynchronous Statements and Functions

Asynchronous statement:

    Thread.do( () => {
        console.log('Code has been executed asynchronously.');
    });
    
Anonymous asynchronous function:

    Thread.do( function () {
        console.log('Code has been executed asynchronously.');
    });

These will execute immediately and asynchronously once they are called.


## Contributing

Contributors are welcome!