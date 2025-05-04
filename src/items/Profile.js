import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import miaFoto from '../imgs/mypic.png';

function MyProfile() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={miaFoto} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MyProfile;