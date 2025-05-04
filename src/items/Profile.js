import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import miaFoto from '../imgs/mypic.jpg';
import "../App.css"

function MyProfile() {
  const happyEmojis = ["｡◕‿◕｡", "q(❂‿❂)p", "(≧◡≦)", "⊂(◉‿◉)つ", "ლ(╹◡╹ლ)", "┗(＾0＾)┓", "(◕‿◕✿)", "(◡‿◡✿)", "(✿◠‿◠)", "(☆^O^☆)", "( ͡ᵔ ͜ʖ ͡°)", "(づ｡◕‿‿◕｡)づ", "(✪ ͜⊃✪)"];
  const randomEmoji = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={miaFoto} />
      <Card.Body>
        <Card.Title>Hello Heveryone!</Card.Title>
        <Card.Text>
          My name is Lorenzo Fezza, I am a Computer Engineer and this is my web-site, I made it for fun  <span style={{ color:"yellow"}}>{randomEmoji}</span>! Let's take a look on my resume.
        </Card.Text>
        <Button variant="primary">Go to my resume!</Button>
      </Card.Body>
    </Card>
  );
}

export default MyProfile;