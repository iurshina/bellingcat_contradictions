import AppDataProvider from './AppDataProvider';
import {Window} from './components/Window';
export default function App() {
  return (
      <AppDataProvider>
        <Window />
      </AppDataProvider>

  );
}
