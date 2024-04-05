import { Navbar, Welcome, Footer, Services } from './components';

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen">
        <Navbar />
        <Welcome />
      </div>
      <Services />
    </div>
  );
}

export default App;
