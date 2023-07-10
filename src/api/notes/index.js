// Ke-04
// Ke-08
const NotesHandler = require("./handler");
const routes = require("./routes");

// Ke-04
module.exports = {
    name: 'notes',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const notesHandler = new NotesHandler(service, validator);
        server.route(routes(notesHandler));
    },
};