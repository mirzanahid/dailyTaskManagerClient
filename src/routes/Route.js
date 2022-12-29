import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import AddTask from '../pages/AddTask/AddTask';
import ComTasks from '../pages/ComTasks/ComTasks';
import MyTasks from '../pages/MyTasks/MyTasks';

export const router = createBrowserRouter([
      {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path: '/',
                element: <AddTask></AddTask>
            },
            {
                path: '/myTask',
                element: <MyTasks></MyTasks>
            },
            {
                path: '/cTask',
                element: <ComTasks></ComTasks>
            }
        ]
      }
])
