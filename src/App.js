import MyNav from "./items/Nav";
import MyProfile from "./items/Profile";
import "./App.css"

export default function MyApp() {
  return (
    <div className="foggy-background">
      <MyNav/>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '2rem'
      }}>
        <MyProfile />
      </div>
    </div>
  );
}