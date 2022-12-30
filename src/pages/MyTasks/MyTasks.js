import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Container } from 'react-bootstrap';

const MyTasks = () => {
    const { data: tasks = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/tasks');
            const data = await res.json();
            return data;
        }
    })
    console.log(tasks)
    return (
        <div>
            <Container>
                <div className='task'>
                    {

                    }
                </div>
            </Container>

        </div>
    );
};

export default MyTasks;