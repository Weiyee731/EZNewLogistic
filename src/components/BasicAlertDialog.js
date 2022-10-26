import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import ReportIcon from '@mui/icons-material/Report';
import { Typography, Grid, } from '@mui/material';

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
        <DialogTitle sx={{ m: 0, p: 2, 
        // backgroundColor: theme.palette.secondary.main,
        backgroundColor:"#5A98B7",
         color: 'white' }} {...other}>
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
                海运敏感与违禁物品
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    <strong>敏感货</strong>
                    <br />
                    陶瓷，马桶，大理石，农药，食品，饮料,电器,情趣用品
                    <br />
                    <br />
                    <strong>违禁品</strong>
                    <br />
                    烟草，易爆易燃物体，危险物品，动物，烟草，毒品，空调冷媒，酒类，植物，充电宝, 锂电池，高压气瓶
                    <br />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={1}><ReportIcon style={{ fill: 'red' }} /></Grid>
                        <Grid item xs={11}><Typography style={{ fontWeight: "600", fontSize: "11pt" }}>若无法辨别货物类型，需先质询客服，若违规运输违禁品造成货物被海关充公，公司将不会赔偿, 需自行负上法律责任以及缴付罚款，请知悉</Typography></Grid>
                    </Grid>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' autoFocus onClick={handleOpenClose}>
                    明白
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
