import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    IconButton,
    CardContent,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ReactComponent as CrossIcon } from '../../images/cross.svg';

const NoteListItem = ({ note, deleteNote, addNote, handleClickOpenEditDialog }) => {
    return (
        <Card
            variant='outlined'
            sx={{ maxWidth: '500px', borderRadius: '0', border: '2px solid #fff' }}
        >
            <CardHeader
                title={note.title}
                subheader={`Изменено: ` + note.date}
                color='#001e46'
                action={
                    <IconButton
                        onClick={() => deleteNote(note)}
                        sx={{ width: '50px', height: '50px', marginTop: '8px' }}
                    >
                        <CrossIcon sx={{ color: '#ff0000', width: '20px' }} />
                    </IconButton>
                }
            />
            {note.imageUrl && (
                <CardMedia
                    component='img'
                    height='250'
                    image={note.imageUrl}
                    alt='not found'
                    sx={{ objectFit: 'fill', objectPosition: 'top' }}
                />
            )}

            <CardContent sx={{ backgroundColor: '#002f6c' }}>
                <Typography variant='body2' color='#fff'>
                    {note.text}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <IconButton
                    size='large'
                    sx={{ width: '100px' }}
                    onClick={() => handleClickOpenEditDialog(note)}
                >
                    <EditIcon fontSize='large' />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default NoteListItem;
