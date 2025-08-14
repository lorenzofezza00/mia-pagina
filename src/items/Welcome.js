// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import miaFoto from '../imgs/mypic.jpg';
// import "../App.css"
// import ImmagineInterattiva from "./IntImage.js";
// import { Col, Row } from 'react-bootstrap';

// function MyProfile() {
//   const happyEmojis = ["｡◕‿◕｡", "q(❂‿❂)p", "(≧◡≦)", "⊂(◉‿◉)つ", "ლ(╹◡╹ლ)", "┗(＾0＾)┓", "(◕‿◕✿)", "(◡‿◡✿)", "(✿◠‿◠)", "(☆^O^☆)", "( ͡ᵔ ͜ʖ ͡°)", "(づ｡◕‿‿◕｡)づ", "(✪ ͜⊃✪)"];
//   const randomEmoji = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];

//   return (
//     <Card bg="dark" variant="dark" className="text-white" style={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         maxWidth: '1000px',
//         padding: '2rem',
//         borderRadius: '1.5rem',
//         boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)',
//         margin:'2rem'
//       }}>
//       <Card.Body style={{ flex: 1, paddingRight: '2rem' }}>
//         <Row className='d-flex justify-content-center align-items-center'>
//           <Col>
//             <ImmagineInterattiva miaFoto={null}/>
//           </Col>
//           <Col>
//             <Card.Title className="fw-bold fs-3" >Hello Everyone!</Card.Title>
//             <Card.Text sclassName="fw-bold fs-5">
//               My name is Lorenzo Fezza, I am a Computer Engineer and this is my web-site, I made it for fun <span style={{ color: "yellow" }}>{randomEmoji}</span>! Let's take a look on my resume.
//             </Card.Text>
//             <Button variant="primary" style={{ marginTop: '1.25rem' }}>Go to my resume!</Button>  
//           </Col>
//         </Row>
//       </Card.Body>
//     </Card>
//   );
// }

// export default MyProfile;

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import miaFoto from '../imgs/mypic.jpg';
// import randPic from '../imgs/pngegg.png'
import "../App.css"
// import ImmagineInterattiva from "./IntImage.js";
import { Col, Row } from 'react-bootstrap';

function Welcome() {
  const happyEmojis = ["｡◕‿◕｡", "q(❂‿❂)p", "(≧◡≦)", "⊂(◉‿◉)つ", "ლ(╹◡╹ლ)", "┗(＾0＾)┓", "(◕‿◕✿)", "(◡‿◡✿)", "(✿◠‿◠)", "(☆^O^☆)", "( ͡ᵔ ͜ʖ ͡°)", "(づ｡◕‿‿◕｡)づ", "(✪ ͜⊃✪)"];
  const randomEmoji = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];

  return (
    <Row className='d-flex justify-content-center align-items-center'>
      <Col
        className="d-flex justify-content-center align-items-center"
        style={{
          position: 'relative',
          width: '20vw',
          height: '20vw', // Dai una dimensione esplicita al contenitore
          overflow: 'visible',
          // border: '1px solid red' // per debug, puoi rimuoverlo
        }}
      >
      </Col>
      <Col>
        <Card.Title className="fw-bold fs-1" >Hello Everyone!</Card.Title>
        <Card.Text className="fs-5">
          My name is Lorenzo Fezza, I am a Computer Engineer and this is my web-site, I made it for fun <span style={{ color: "yellow" }}>{randomEmoji}</span>! Let's take a look on my resume.
        </Card.Text>
        <Button variant="primary" style={{ marginTop: '1.25rem' }}>Check out my resume!</Button>  
      </Col>
    </Row>
  
  );
}

export default Welcome;