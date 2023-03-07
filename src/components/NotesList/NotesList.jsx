import { Stack } from '@mui/material';
import NotesListItem from '../NotesListItem/NotesListItem';

const NotesList = ({ notes, deleteNote, addNote, handleClickOpenEditDialog }) => {
    return (
        <Stack spacing={3}>
            {notes.map((note) => (
                <NotesListItem
                    note={note}
                    key={note.id}
                    deleteNote={deleteNote}
                    addNote={addNote}
                    handleClickOpenEditDialog={handleClickOpenEditDialog}
                />
            ))}
        </Stack>
    );
};

export default NotesList;
