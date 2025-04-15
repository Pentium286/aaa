import React from 'react';
import './index.less';

export type TestingDataViewProps = {
    title: string;
    times?: number;
}

const TestingDataView : React.FC<TestingDataViewProps> = (props) => {
    const { title, times } = props;

    return (
        <div className='testingDataContent'>
            <div className='testingDataTitle'>{title}</div>
            <div className='testingDataTimes'>{times? times : '0'}
            </div>
        </div>
    );
}

export default TestingDataView;