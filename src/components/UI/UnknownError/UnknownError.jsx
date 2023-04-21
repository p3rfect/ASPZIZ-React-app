import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

const UnknownError = ({setShowAlert, showAlert}) => {
    const handleCloseAlert = () => {
        setShowAlert(false)
    }

    return (
        <div>
            <Dialog
                open={showAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">
                    Ошибка
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Что-то пошло не так...
                        Попробуйте еще раз через некоторое время.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlert}>Понятно</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UnknownError;