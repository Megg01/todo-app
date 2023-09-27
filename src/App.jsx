import PageTitle from './components/PageTitle';
import UpBar from './components/UpBar';
import TodoContainer from './components/TodoContainer';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <div className="container">
                <PageTitle />
                <div className="wrapper">
                    <UpBar />
                    <TodoContainer />
                </div>
            </div>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        fontSize: '1rem',
                    },
                }}
            />
        </>
    );
}

export default App;
