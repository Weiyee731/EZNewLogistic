import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const theme = useTheme();
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: theme.palette.secondary.main, color: 'white' }} {...other}>
            {children}
            {/* {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null} */}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export const BasicAlertDialog = ({ open, handleOpenClose, data }) => {
    console.log(data)

    return (
        <BootstrapDialog
            onClose={handleOpenClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleOpenClose}>
                Tracking No. {data.TrackingNumber}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Current Status: {data.StockStatus}
                    <br />
                    Parcel Height: {data.ProductDimensionHeight}
                    <br />
                    Parcel Width: {data.ProductDimensionDeep}
                    <br />
                    Parcel Length: {data.ProductDimensionWidth}
                    <br />
                    Parcel Weight: {data.ProductWeight}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' autoFocus onClick={handleOpenClose}>
                    OK
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
