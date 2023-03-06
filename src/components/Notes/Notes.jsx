// import Delete from '@mui/icons-material/Delete';
import React from 'react';
import { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from '@mui/material';
import NotesList from '../NotesList/NotesList';

const Notes = () => {
    // const sample = [
    //     {
    //         title: 'testName1',
    //         text: 'testDescription1',
    //     },
    //     {
    //         title: 'testName2',
    //         text: 'testDescription2',
    //     },
    //     {
    //         title: 'testName3',
    //         text: 'testDescription3',
    //     },
    // ];
    const [notes, setNotes] = useState([]);
    const [dialogOpened, setDialogOpened] = useState(false);
    //
    const [dialogType, setDialogType] = useState('');
    //
    const [oldNote, setOldNote] = useState({});
    const [textInput, setTextInput] = useState('');
    const [titleInput, setTitleInput] = useState('Новая заметка');

    useEffect(() => {
        const cachedNotes = JSON.parse(localStorage.getItem('notes'));

        if (cachedNotes && cachedNotes.length !== 0) {
            console.log('notes', cachedNotes.length);
            setNotes(cachedNotes);
        } else {
            setNotes([
                {
                    title: 'testName1',
                    text: 'testDescription1',
                },
            ]);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);
    const handleClickOpenAddDialog = () => {
        setDialogType('add');
        setDialogOpened(true);
    };
    const handleClickOpenEditDialog = (note) => {
        setDialogType('edit');
        setOldNote(note);
        setTitleInput(note.title);
        setTextInput(note.text);
        setDialogOpened(true);
    };
    const handleCloseDialog = () => {
        setDialogOpened(false);
        //мб в другое место переместить
        setTextInput('');
        setTitleInput('Новая заметка');
    };
    const handleTextInputChange = (e) => {
        setTextInput(e.target.value);
    };
    const handleTitleInputChange = (e) => {
        setTitleInput(e.target.value);
    };

    const deleteNote = (noteToDelete) => {
        setNotes((prev) => prev.filter((note) => note.title !== noteToDelete.title));
        // localStorage.setItem('notes', JSON.stringify(notes));
    };
    const addNote = (noteToAdd) => {
        setNotes((prev) => [noteToAdd, ...prev]);
        console.log(notes);
        // localStorage.setItem('notes', JSON.stringify(notes));
    };
    return (
        <>
            <Button onClick={handleClickOpenAddDialog}>Новая заметка</Button>
            <NotesList
                notes={notes}
                deleteNote={deleteNote}
                addNote={addNote}
                handleClickOpenEditDialog={handleClickOpenEditDialog}
            />
            <Dialog open={dialogOpened} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialogType === 'add' ? 'Новая заметка' : 'Редактирование заметки'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='Заголовок'
                        fullWidth
                        variant='standard'
                        onChange={handleTitleInputChange}
                        value={titleInput}
                    />
                    <TextField
                        required={true}
                        autoFocus
                        margin='dense'
                        label='Текст заметки'
                        fullWidth
                        variant='standard'
                        multiline
                        maxRows={4}
                        onChange={handleTextInputChange}
                        value={textInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Отмена</Button>
                    <Button
                        disabled={textInput && titleInput ? false : true}
                        onClick={() => {
                            handleCloseDialog();
                            if (dialogType === 'edit') {
                                deleteNote(oldNote);
                            }
                            addNote({ title: titleInput, text: textInput });
                        }}
                    >
                        {dialogType === 'add' ? 'Создать' : 'Сохранить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Notes;
