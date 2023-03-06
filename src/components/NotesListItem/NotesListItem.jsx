import React from 'react';
import { Card, CardActions, Button, IconButton, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteListItem = ({ note, deleteNote, addNote, handleClickOpenEditDialog }) => {
    return (
        <>
            <Card variant='outlined'>
                {note.title}
                <CardActions>
                    <IconButton
                        aria-label='add to favorites'
                        onClick={() => handleClickOpenEditDialog(note)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label='share' onClick={() => deleteNote(note)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
};

export default NoteListItem;
