import {createRoot} from 'react-dom/client';
import App from './App';
import '@crema/services';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

 // "deploy": "npm run build && surge ./build ansarul.surge.sh",

