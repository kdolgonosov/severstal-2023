import React from 'react';
// import Box from '@mui/material/Box';
import { Box, Typography, Stack } from '@mui/material';
import NotesListItem from '../NotesListItem/NotesListItem';

const NotesList = ({ notes, deleteNote, addNote, handleClickOpenEditDialog }) => {
    return (
        <Box
            sx={{
                maxWidth: '50%',
                margin: '0 auto',
            }}
        >
            <Typography variant='h1'>Заметки</Typography>
            <Stack spacing={1}>
                {notes.map((note) => (
                    <NotesListItem
                        note={note}
                        key={note.title}
                        deleteNote={deleteNote}
                        addNote={addNote}
                        handleClickOpenEditDialog={handleClickOpenEditDialog}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default NotesList;
