'use client';
import React from 'react';
import Axios from "axios";

interface Data {
    ip: string,
    userAgent: string,
}

const Page = () => {
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

    return (
        <main>
            <div>
                ip: {data?.ip}<br/>
                agent: {data?.userAgent}<br/>
            </div>
        </main>
    );
};

// const getServerSideProps = async () => {
//     const response = await Axios.get('http://localhost:3000/api/ssr');
//     return {
//         ip: response.data.ip,
//         userAgent: response.data.userAgent
//     }
// }


//
// const setServerSideProps = () => {
//     const response =  Axios.post('/api/ssr',
//         {
//             level: 'info',
//             message: 'message',
//             component: 'component',
//         });
//
//     const data = response.data.body;
//     return {
//         ip: data.ip,
//         userAgent: data.userAgent,
//         level: data.level,
//         message: data.message,
//         component: data.component,
//     }
// }

export default Page;
