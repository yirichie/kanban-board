import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiModal from '@material-ui/core/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MoveIcon from '@material-ui/icons/TrendingFlat';

import { LANE_TYPE } from 'utils/enums';

import styles from './modal.module.css';

const getModalStyle = (): any => {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

interface Props {
  onRemove: (id: string) => void;
  onClose: () => void;
  open: boolean;
  data: any;
  dbRef: any;
}

const Modal = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { dbRef, data, onRemove, open, onClose } = props;

  const [modalStyle] = React.useState<any>(getModalStyle);
  const [title, setTitle] = React.useState<string>(data.title);
  const [error, setError] = React.useState<boolean>(false);

  const handleRemove = (): void => {
    onRemove(data.id);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (title === '') {
      setError(true);
    } else {
      dbRef.child(data.id).update({ title });
      setError(false);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const renderInput = () => (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TextField
        label="Update Task"
        onChange={handleChange}
        value={title}
        error={error}
        placeholder="Feed the dog"
      />
    </form>
  );

  const handleMove = (newType: string): void => {
    dbRef.child(data.id).update({ type: newType });
    onClose();
  };

  const renderNextAction = (): JSX.Element | undefined => {
    let button;
    switch (data.type) {
      case LANE_TYPE.TO_DO:
        button = (
          <Button
            variant="contained"
            color="primary"
            startIcon={<MoveIcon />}
            onClick={() => handleMove(LANE_TYPE.IN_PROGRESS)}
          >
            In Progress
          </Button>
        );
        break;
      case LANE_TYPE.IN_PROGRESS:
        button = (
          <Button
            variant="contained"
            color="primary"
            startIcon={<MoveIcon />}
            onClick={() => handleMove(LANE_TYPE.DONE)}
          >
            Done
          </Button>
        );
        break;
      default:
        break;
    }

    return button;
  };

  return (
    <MuiModal open={open} onClose={onClose}>
      <div style={modalStyle} className={classes.paper}>
        <div className={styles.container}>{renderInput()}</div>
        <div className={styles.actionButtons}>
          {renderNextAction()}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleRemove}
          >
            Delete
          </Button>
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;
