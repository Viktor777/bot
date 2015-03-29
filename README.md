# Gitter Calculation Bot

Bot for service Gitter, who will monitor messages in the room and respond to those that meet the format "calc ...". The result of evaluating the expression that comes after "calc". Required limited operation (), *, /, +, -.

## Usage

```
TOKEN=<API KEY> node index.js username/test
```

### Authentication

It's mandatory to provide a valid Gitter OAuth token in order to use the client. You can obtain one from [https://developer.gitter.im/apps](https://developer.gitter.im/apps).

### Example

Message from Gitter:

```
Test calc 1+1
calc 2+2
testcalc 3+3
test calc 4+4
```

Answer from bot:

```
1+1=2
2+2=4
4+4=8
```

## API

### New calculation bot

You can use other command (not "calc") or add/remove allowed operations via setting your regular expression.

#### Example

```js
var regular = /\bcommand_name\s([\d+\-]+)/, // use format bcommand_name ... with operations +, -
    calcBot = new CalcBot(token, room, regular);
```
### New bot type

You can extend module Bot like CalcBot and create new bot for Gitter.

## Run test

```
TOKEN=<API KEY> mocha test --recursive
```