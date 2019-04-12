const fs = require("fs");

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {

  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler();
      break;
  }
}

const commandLibrary = {

  "echo": function(userInput) {
        done(userInput);
  },

  "cat": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, (err, data) => {
         if (err) throw err;
         done(data);
       });
  },

  "head": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
          if (err) throw err;
          var lines = data.toString('utf8');
          var slicedLines = lines.split('\n').slice(0, 5).join('\n');
          done(slicedLines);
        });
  },

  "tail": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
          if (err) throw err;
          var lines = data.toString('utf8');
          var slicedLines = lines.split('\n').slice(-5).join('\n');
          done(slicedLines);
        })
  },

  "errorHandler": function() {
        process.stdout.write("Command not found")
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
