import React from "react";
import { Card, CardContent, Typography, Divider, Grid } from "@mui/material";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import moment from 'moment';
import { SettingsPowerRounded } from "@mui/icons-material";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import ReportIcon from '@mui/icons-material/Report';
import Button from '@mui/material/Button';

export const NotificationView = ({ title, message, type, date }) => {
    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(3),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    function BootstrapDialogTitle(props) {
        const theme = useTheme();
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#5A98B7", color: 'white' }} {...other}>
                {children}
            </DialogTitle>
        );
    }

    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    const [open, setOpen] = React.useState(false);

    const handleOpenClose = () => {
        setOpen(!open)
    }

    return (
        <div
            style={{
                borderColor: 'WHITE',
                borderStyle: 'solid',
                borderWidth: '0.5px  0.5px  0.5px 10px',
                paddingLeft: '5px',
                boxShadow: '5px 5px 5px 5px rgba(22,22,22,0.1)',
                borderRadius: '5px',
                padding: '5px',
                marginTop: "10pt",
            }}
            onClick={() => handleOpenClose()}
        >
            <div
                style={{
                    borderColor: '#5A98B7',
                    borderStyle: 'solid',
                    borderWidth: '0px  0px  0px 6px',
                    borderRadius: '3px',
                    padding: '10px',
                }}
            >
                <Grid container>
                    <Grid item xs={1} sm={1} md={1} style={{ alignItems: "center", display: "flex" }}>
                        <AnnouncementIcon style={{ color: "#5A98B7" }} />
                    </Grid>
                    <Grid item xs={11} sm={11} md={11} >
                        <Typography style={{ fontWeight: "bold", color: 'black', fontSize: "11pt" }}  >
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="lg"
            >
                <BootstrapDialogTitle id="customized-dialog-title" >
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <div dangerouslySetInnerHTML={{ __html: message }} />
                    </Typography>
                    <br />
                    <br />
                    <Grid container>
                        <Grid item xs={10} sm={10} md={10} style={{ alignItems: "center", display: "flex" }}>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} >
                            <Typography style={{ fontWeight: "bold", color: 'black', fontSize: "11pt", letterSpacing: 2 }}  >
                                雅威国际物流
                            </Typography>
                            <Typography style={{ color: 'gray', fontSize: "10pt" }}  >
                                {date}
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' autoFocus onClick={() => handleOpenClose()}>
                        了解
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}