import React from 'react';

import { db } from '../../firebase';
import { LANE_TYPE } from 'utils/enums';
import { Item } from 'components/Card';
import Lane from 'components/Lane';
import styles from './board.module.css';

interface Props {
  user: any;
}

const Board = (props: Props): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<any>({});
  const { user } = props;
  const dbRef = db.ref(`/boards/${user.uid}`);

  React.useEffect(() => {
    dbRef.on('value', (snapshot) => {
      setLoading(false);
      setData(snapshot.val());
    });
  }, []);

  if (loading) return <div />;

  const filterData = (type: string): Item[] => {
    const arr = [];
    for (let key in data) {
      if (data[key].type === type) {
        arr.push({ id: key, title: data[key].title, type: data[key].type });
      }
    }

    return arr;
  };

  return (
    <div className={styles.container}>
      <Lane
        dbRef={dbRef}
        type={LANE_TYPE.TO_DO}
        data={filterData(LANE_TYPE.TO_DO)}
      />
      <Lane
        dbRef={dbRef}
        type={LANE_TYPE.IN_PROGRESS}
        data={filterData(LANE_TYPE.IN_PROGRESS)}
      />
      <Lane
        dbRef={dbRef}
        type={LANE_TYPE.DONE}
        data={filterData(LANE_TYPE.DONE)}
      />
    </div>
  );
};

export default Board;
