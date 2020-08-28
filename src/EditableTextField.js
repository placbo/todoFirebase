import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";




const EditableTextField = ({value, index, updateItemTitle}) => {

    const [newValue, setNewValue] = useState(value);
    const [editMode, setEditMode] = useState(false);

    const useStyles = makeStyles({
        input: {
            height:"50px",
            border:0,
            opacity: 1,
            borderBottom: 0,
            "&:before": {
                borderBottom: 0
            }
        },
        showAsText: {
            display: editMode
                ? "none"
                : "",
        },
        showAsInputField: {
            display: editMode
                ? ""
                : "none",
        }
    });

    const classes = useStyles();
    const inputElement = useRef(null);

    const onButtonClick = () => {
        setEditMode(true);
    };

    useEffect(() => {
        inputElement.current.focus();
    }, [editMode])

    const handleChange = (event) => {
        setNewValue(event.target.value);
    };

    const handleBlur = () => {
        setEditMode(false);
        updateItemTitle(newValue,index);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEditMode(false);
            updateItemTitle(newValue,index);
        }
    }

    return (
        <>
            <span
                style={{width:"100%", backgroundColor:"pink"}}
                className={classes.showAsText}
                onClick={onButtonClick}>
                {newValue}
            </span>
            <input
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={classes.showAsInputField}
                ref={inputElement}
                defaultValue={newValue}
                onChange={handleChange}
                type="text"/>
        </>
    );

}

export default EditableTextField;
