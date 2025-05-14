import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import miaFoto from '../imgs/mypic.jpg';
import "../App.css"

function MyProfile() {
  const happyEmojis = ["｡◕‿◕｡", "q(❂‿❂)p", "(≧◡≦)", "⊂(◉‿◉)つ", "ლ(╹◡╹ლ)", "┗(＾0＾)┓", "(◕‿◕✿)", "(◡‿◡✿)", "(✿◠‿◠)", "(☆^O^☆)", "( ͡ᵔ ͜ʖ ͡°)", "(づ｡◕‿‿◕｡)づ", "(✪ ͜⊃✪)"];
  const randomEmoji = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];

  return (
    <Card bg="dark" variant="dark" className="text-white" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '1000px',
        padding: '2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)',
        margin:'2rem'
      }}>
      <Card.Body style={{ flex: 1, paddingRight: '2rem' }}>
        <Card.Title style={{ fontSize: '2.5rem' }}>Hello Everyone!</Card.Title>
        <Card.Text style={{ fontSize: '1.25rem' }}>
          My name is Lorenzo Fezza, I am a Computer Engineer and this is my web-site, I made it for fun <span style={{ color: "yellow" }}>{randomEmoji}</span>! Let's take a look on my resume.
        </Card.Text>
        <Button variant="primary" style={{ marginTop: '1.25rem' }}>Go to my resume!</Button>
      </Card.Body>
      <div style={{ flexShrink: 0 }}>
        <img 
          src={miaFoto} 
          alt="Lorenzo Fezza" 
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid #FFF'
          }} 
        />
      </div>
    </Card>
  );
}

export default MyProfile;