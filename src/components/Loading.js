import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading(props) {

    return (
        <Backdrop open={true}>
            <CircularProgress size={100} />
        </Backdrop>
    );
}