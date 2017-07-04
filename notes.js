//console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    var noteString = fs.readFileSync('notes-data.json'); // Read the contents of a file and store it in noreString
    return JSON.parse(noteString); // Parse the data inside of noteString and append it to the notes array
  } catch (e) { return []; } // Safe gaurd to catch any errors inside variable e incase we encouter any
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = { // Single Note Object
    title: title, // Can just write title and body according to new ES6
    body: body
  };
  var duplicateNotes = notes.filter((note) => note.title == title);
  if (duplicateNotes == 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title != title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

var logNote = (note) => {
  debugger;
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNote,
  removeNote,
  getNote,
  getAll,
  logNote
};