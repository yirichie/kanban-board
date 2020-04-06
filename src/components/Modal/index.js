import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiModal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";

const getModalStyle = () => {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Modal = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { data, onRemove, open, onClose } = props;

  const handleRemove = () => {
    onRemove(data.id);
  };

  return (
    <MuiModal open={open} onClose={onClose}>
      <div style={modalStyle} className={classes.paper}>
        <div>
          <span>Task: {data.title}</span>
          <div>
            <DeleteIcon onClick={handleRemove} />
          </div>
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;
