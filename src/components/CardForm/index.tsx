import React, { FormEvent } from 'react';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import styles from './card-form.module.css';

interface Props {
  dbRef: any;
  type: string;
}

const CardForm = (props: Props): JSX.Element => {
  const { dbRef, type } = props;

  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (value !== '') {
      dbRef.push().set({ title: value, type });
      setValue('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TextField
        label="New Task"
        onChange={handleChange}
        value={value}
        error={error}
        placeholder="Feed the dog"
      />
      <AddIcon onClick={handleSubmit} className={styles.icon} />
    </form>
  );
};

export default CardForm;
