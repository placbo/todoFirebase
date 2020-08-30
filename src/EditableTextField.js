import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";


const EditableTextField = ({value, id, updateItemTitle}) => {

    const [newValue, setNewValue] = useState(value);
    const [editMode, setEditMode] = useState(false);

    const useStyles = makeStyles({
        textView: {
            width: "80%",
            cursor: "pointer",
            display: editMode
                ? "none"
                : "",
        },
        inputView: {
            width: "80%",
            display: editMode
                ? ""
                : "none",
        }
    });

    const classes = useStyles();
    let textInput = useRef(null);

    const onButtonClick = () => {
        setTimeout(() => {
            textInput.current.focus();
        }, 100);
        setEditMode(true);
    };

    useEffect(() => {
    }, [editMode])

    const handleChange = (event) => {
        setNewValue(event.target.value);
    };

    const handleBlur = () => {
        setEditMode(false);
        updateItemTitle(newValue, id);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEditMode(false);
            updateItemTitle(newValue, id);
        }
    }

    return (
        <>
            <Typography variant="body1"
                        className={classes.textView}
                        onClick={onButtonClick}>
                {newValue}
            </Typography>
            <TextField className={classes.inputView}
                       variant="standard"
                       defaultValue={newValue}
                       inputRef={textInput}
                       required
                       onKeyDown={handleKeyDown}
                       onBlur={handleBlur}
                       onChange={handleChange}
            />
        </>
    );

}

export default EditableTextField;
