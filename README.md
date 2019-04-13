[![Build Status][travis-svg]][travis]
[![codecov][codecov-svg]][codecov]

# renew-lib

[Renew][1] is a multi-formalism editor and simulator that provides a flexible 
modeling approach. With renew-js we want to improve the user interaction with 
the editor. To archive a multi-formalism editor and simulator we base the 
formalisms on metamodels and provide a plugin-architecture to extend
domain specific languages.

## Test your code

For each module there should be a Software test. You mainly try to test the
different components provider, behavior, commands, tools and rules. 
The test begins with a module definition and the Target
specification.
```javascript
describe('modules/{name} - {Target}', () => { /** ... */ });
```
Then you define the Test environment only with the minimum amount of 
dependencies.
```javascript
let diagram;
beforeEach(() => diagram = new Tester({ modules: [ /** ModuleName */ ] }));
```
Afterwards you can define more dependencies that should be dependency injected
and also create some shapes for a specific scenario later on. You should write
a 'it should be defined' test to be sure your module is loading properly. Then 
you begin describing the Tests for the different components like for example:
```javascript
describe('Provider', () => { /** ... */ });
```  

## License 
MIT

[1]: http://www.renew.de/
[travis]: https://travis-ci.org/renew-js/renew-lib
[travis-svg]: https://travis-ci.org/renew-js/renew-lib.svg?branch=master
[codecov]: https://codecov.io/gh/renew-js/renew-lib
[codecov-svg]: https://codecov.io/gh/renew-js/renew-lib/branch/master/graph/badge.svg
