import React from 'react'
import styles from './style/index.module.less'
import { Card, Button } from '@arco-design/web-react';
import { IconArrowLeft, IconRefresh, IconSave } from '@arco-design/web-react/icon';
import HISTORY from '../../history'

export default function BottomFloat(props) {
    const { saveTime, refresh, onSave } = props;
    const goBack = () => {
        HISTORY.goBack()
    }
    return (
        <Card className={styles.bf}>
            <div className={styles.end}>
                <div>Last Save Time:{saveTime ? saveTime : 'No operation'}</div>
                <div>
                    <Button className={styles.btn} type='primary' onClick={goBack} icon={<IconArrowLeft />}>Go Back</Button>
                    <Button className={styles.btn} type='primary' onClick={refresh} icon={<IconRefresh />}>Refresh</Button>
                    <Button className={styles.btn} type='primary' onClick={onSave} icon={< IconSave />}>Save</Button>
                </div>
            </div>
        </Card>
    )
}
