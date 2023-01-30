
import { FC } from "react";
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import './assets/styles/main.scss';

const App: FC = () => (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
);

export default App;
