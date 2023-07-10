// Ke-01 
// Ke-13
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class NotesService {
    constructor() {
        this._notes = [];
    }
    // ==================== Membuat CRUD ================
    // =================== Menyimpan/ menambahkan data ke array notes =======
    addNote({ title, tags, body }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const newNote = {
            title, tags, body, id, createdAt, updatedAt,
        };
        this._notes.push(newNote);
        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return id; // Fungsi akan mengembalikan nilai id
    }
    // ====================== membaca seluruh note yang disimpan ===========
    getNotes() {
        return this._notes; // Fungsi mengembalikan semua data catatan yang ada di Array 
    }
    // ======================  membaca note yang disimpan berdasarkan id ========
    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];
        if (!note) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }
        return note;// Fungsi mengembalikan Catatan tertentu
    }
    // ======================= mengubah data catatan yang disimpan ===============
    editNoteById(id, { title, tags, body }) {
        const index = this._notes.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }
        const updatedAt = new Date().toISOString();
        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    }
    // =====  menghapus note dari array this._notes berdasarkan id yang diberikan =====
    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
        this._notes.splice(index, 1);
    }
}

module.exports = NotesService;