'use client';
import React from 'react';
import Axios from "axios";

interface Data {
    ip: string,
    userAgent: string,
}

interface Props {
    level: string,
    message: string,
    component: string,
}

const Log = ({level, message, component}:Props) => {
    const [data, setData] = React.useState<Data>({
        ip: 'loading...',
        userAgent: 'loading...',
    });

    React.useEffect(() => {
        const result = Axios.get('/api/ssr')
            .then((result) => {
                const newData = result.data;
                setData(newData);
            });
        if (!result) return;
    }, []);

    React.useEffect(() => {
        data.ip !== 'loading...'
        && Axios.post('/api/ssr',
            {level: level.toUpperCase(), message: message, component: component});
    }, [data, level, message, component]);

    return (
        <></>
    );
};

export default Log;

