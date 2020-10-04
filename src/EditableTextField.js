import React, { useRef, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const EditableTextField = ({ value, id, updateItemTitle }) => {
  const [newValue, setNewValue] = useState(value);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const useStyles = makeStyles({
    textView: {
      width: '50%',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: editMode ? 'none' : '',
    },
    inputView: {
      width: '50%',
      display: editMode ? '' : 'none',
    },
  });

  const classes = useStyles();
  let textInput = useRef(null);

  const turnOnEditMode = () => {
    setTimeout(() => {
      textInput.current.focus();
    }, 100);
    setEditMode(true);
  };

  const updateTitleIfValid = () => {
    if (newValue.length > 0) {
      setEditMode(false);
      updateItemTitle(newValue, id);
      setError(false);
      setErrorText('');
    } else {
      setError(true);
      setErrorText('Denne kan ikke være tom');
    }
  };

  return (
    <>
      <Typography variant="body1" className={classes.textView} onClick={turnOnEditMode}>
        {newValue}
      </Typography>
      <TextField
        className={classes.inputView}
        variant="standard"
        defaultValue={newValue}
        inputRef={textInput}
        required
        error={error}
        helperText={errorText}
        onKeyDown={(event) => {
          event.key === 'Enter' && updateTitleIfValid();
        }}
        onBlur={updateTitleIfValid}
        onChange={(event) => {
          setNewValue(event.target.value);
        }}
      />
    </>
  );
};

export default EditableTextField;
