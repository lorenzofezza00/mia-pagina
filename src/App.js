import MyNav from "./items/Nav";
import MyProfile from "./items/Profile";
import "./App.css"

export default function MyApp() {
  return (
    <div className="App" style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
      <MyNav/>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '8rem'
      }}>
        <MyProfile />
      </div>
    </div>
  );
}