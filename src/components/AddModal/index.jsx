import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '../Button/index';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import FormControlUnstyled from '@mui/base/FormControlUnstyled';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"

};
export default function AddPostModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='AddModalForm'>
            <Fab size="medium" aria-label="Добавить пост" onClick={handleOpen}><AddIcon />
            </Fab>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        <h2>Добавить пост</h2>
                    </Typography>
                    <FormControlUnstyled>
                        <TextField id="tag-post" label="Ссылка на картинку" variant="outlined" style={{
                            boxSizing: `border-box`,
                            maxWidth: 400,
                            borderColor: "#c0c0c0",
                            borderRadius: "5px",
                            marginBottom: "10px"
                        }} />
                        <TextField id="title-post" label="Заголовок поста" variant="outlined" style={{
                            boxSizing: `border-box`,
                            width: 400,
                            borderColor: "#c0c0c0",
                            borderRadius: "5px",
                            marginBottom: "10px"
                        }} />
                        <TextareaAutosize id="text-post" placeholder="О чем пост?" minRows={5}
                            style={{
                                boxSizing: `border-box`,
                                maxWidth: 400,
                                minWidth: 400,
                                borderColor: "#c0c0c0",
                                borderRadius: "5px",
                                marginBottom: "5px"
                            }} />
                        <TextField id="tag-post" label="теги поста через запятую" variant="outlined"
                            style={{
                                boxSizing: `border-box`,
                                maxWidth: 400,
                                borderColor: "#c0c0c0",
                                borderRadius: "5px",
                                marginBottom: "10px"
                            }} />
                        <Button style={{
                            marginLeft: "40px"
                        }}>
                            Запостить
                        </Button>
                    </FormControlUnstyled>
                </Box>
            </Modal>
        </div>
    );
}
