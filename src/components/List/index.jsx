import React, { lazy, useEffect } from 'react';
import { Card, CardBody, Container } from 'reactstrap';

import useServices from '../../services/api';
const { fetchCryptoList } = useServices;

//Components
const CryptoList = lazy(() => import('./CryptoList'));

const CryptoTrack = () => {
  // const [cryptoResult, SetCryptoResult] = useState([]);

  useEffect(() => {
    getCryptoList();
  }, []);

  const getCryptoList = async () => {
    await fetchCryptoList()
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid>
      <Card className='mb-1 border-0 bg-none'>
        <h1 className='text-center text-white head'>CryptoTrack App</h1>
        <CardBody>
          <CryptoList />
        </CardBody>
      </Card>
    </Container>
  );
};

export default CryptoTrack;
