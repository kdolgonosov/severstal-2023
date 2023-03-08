import { useState, useEffect } from 'react';
import {
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Divider,
    Select,
    MenuItem,
} from '@mui/material';
import NotesList from '../NotesList/NotesList';
import { nanoid } from 'nanoid';
import useDebounce from '../../hooks/useDebounce';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchByField, setSearchByField] = useState('title');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [oldNote, setOldNote] = useState({});
    const [textInput, setTextInput] = useState('');
    const [titleInput, setTitleInput] = useState('Новая заметка');
    const [urlInput, setUrlInput] = useState('');

    useEffect(() => {
        const cachedNotes = JSON.parse(localStorage.getItem('notes'));
        if (!cachedNotes || cachedNotes.length === 0) {
            setNotes([
                {
                    id: nanoid(),
                    date: getDate(),
                    title: 'Первая заметка',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
            ]);
        } else {
            setNotes(cachedNotes);
        }
    }, []);
    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes]);

    // handlers
    const handleClickOpenAddDialog = () => {
        setDialogType('add');
        setDialogOpened(true);
    };
    const handleClickOpenEditDialog = (note) => {
        setDialogType('edit');
        setOldNote(note);
        setTitleInput(note.title);
        setTextInput(note.text);
        setUrlInput(note.imageUrl);
        setDialogOpened(true);
    };
    const handleCloseDialog = () => {
        setDialogOpened(false);
        setTextInput('');
        setTitleInput('Новая заметка');
        setUrlInput('');
    };
    const handleTextInputChange = (e) => {
        setTextInput(e.target.value);
    };
    const handleTitleInputChange = (e) => {
        setTitleInput(e.target.value);
    };
    const handleUrlInputChange = (e) => {
        setUrlInput(e.target.value);
    };
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
        debouncedSearch(e.target.value);
    };
    const handleSearchByField = (e) => {
        setSearchByField(e.target.value);
        debouncedSearch(searchInput);
    };

    const deleteNote = (noteToDelete) => {
        setNotes((prev) => prev.filter((note) => note.id !== noteToDelete.id));
        localStorage.setItem(
            'notes',
            JSON.stringify(notes.filter((note) => note.id !== noteToDelete.id)),
        );
    };
    const deleteAll = () => {
        setNotes([]);
        localStorage.removeItem('notes');
    };
    const addNote = (noteToAdd) => {
        setNotes((prev) => [noteToAdd, ...prev]);
        localStorage.setItem('notes', JSON.stringify([noteToAdd, ...notes]));
        setSearchInput('');
    };
    const editNote = (noteToEdit) => {
        setNotes((prev) =>
            prev.map((note) => {
                if (note.id === noteToEdit.id) {
                    return {
                        ...note,
                        date: getDate(),
                        imageUrl: urlInput,
                        title: titleInput,
                        text: textInput,
                    };
                }
                return note;
            }),
        );
        localStorage.setItem(
            'notes',
            JSON.stringify(
                notes.map((note) => {
                    if (note.id === noteToEdit.id) {
                        return {
                            ...note,
                            date: getDate(),
                            imageUrl: urlInput,
                            title: titleInput,
                            text: textInput,
                        };
                    }
                    return note;
                }),
            ),
        );
    };

    // utils
    const getDate = () => {
        let timestamp = new Date();
        return timestamp.toLocaleString();
    };
    const search = (value) => {
        setFilteredNotes(
            notes.filter((note) =>
                note[`${searchByField}`].toLowerCase().includes(value.toLowerCase()),
            ),
        );
    };
    const debouncedSearch = useDebounce(search, 800);
    return (
        <Box
            sx={{
                backgroundColor: '#002f6c',
                minHeight: '100vh',
                maxWidth: '100%',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant='h1' sx={{ fontSize: '56px', color: '#fff' }}>
                Мои заметки
            </Typography>
            <Divider sx={{ backgroundColor: '#fff', width: '100%' }} />
            <Box
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '500px' }}
            >
                <TextField
                    variant='standard'
                    margin='dense'
                    label={'Поиск по ' + `${searchByField === 'title' ? 'заголовку' : 'тексту'}`}
                    fullWidth
                    onChange={handleSearchInputChange}
                    value={searchInput}
                    sx={{
                        maxWidth: '500px',
                        backgroundColor: '#fff',
                        borderRadius: '4px 0 0 4px',
                    }}
                ></TextField>

                <Select
                    variant='standard'
                    value={searchByField}
                    label='Параметр'
                    onChange={handleSearchByField}
                    sx={{
                        backgroundColor: '#fff',
                        height: '48px',
                        width: '200px',
                        borderRadius: '0 4px 4px 0',
                        marginTop: '4px',
                        '&hover': {
                            backgroundColor: '#fff',
                        },
                    }}
                >
                    <MenuItem value='title'>Заголовок</MenuItem>
                    <MenuItem value='text'>Текст</MenuItem>
                </Select>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Button onClick={handleClickOpenAddDialog} sx={{ color: '#fff', fontSize: '20px' }}>
                    Новая заметка
                </Button>
                <Button onClick={deleteAll} sx={{ color: '#ff0000', fontSize: '20px' }}>
                    Удалить все
                </Button>
            </Box>
            <NotesList
                notes={filteredNotes}
                deleteNote={deleteNote}
                addNote={addNote}
                handleClickOpenEditDialog={handleClickOpenEditDialog}
            />
            <Dialog open={dialogOpened} onClose={handleCloseDialog} sx={{}}>
                <DialogTitle>
                    {dialogType === 'add' ? 'Новая заметка' : 'Редактирование заметки'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        required={true}
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
                        maxRows={6}
                        onChange={handleTextInputChange}
                        value={textInput}
                    />
                    <TextField
                        margin='dense'
                        label='Ссылка на картинку'
                        fullWidth
                        variant='standard'
                        onChange={handleUrlInputChange}
                        value={urlInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Отмена</Button>
                    <Button
                        disabled={
                            !textInput ||
                            !titleInput ||
                            (textInput === oldNote.text &&
                                titleInput === oldNote.title &&
                                urlInput === oldNote.imageUrl)
                                ? true
                                : false
                        }
                        onClick={() => {
                            handleCloseDialog();
                            if (dialogType === 'edit') {
                                editNote(oldNote);
                            } else {
                                addNote({
                                    id: nanoid(),
                                    date: getDate(),
                                    imageUrl: urlInput,
                                    title: titleInput,
                                    text: textInput,
                                });
                            }
                        }}
                    >
                        {dialogType === 'add' ? 'Создать' : 'Сохранить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Notes;
