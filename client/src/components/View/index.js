import React, { lazy, useEffect, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';

import useServices from '../../services/api';
const { fetchCryptoData } = useServices;

//Components
const CryptoTrackViewForm = lazy(() => import('./cryptoView'));

const CryptoTrackView = (props) => {
  const {
    match: { params },
    history,
  } = props;

  const [cryptoData, SetCryptoData] = useState({});
  const [isLoading, SetIsLoading] = useState(true);
  const { id } = params;

  useEffect(() => {
    getCryptoData(id);
  }, []);

  /*
  ------------------------------
    Function to get crypto data
  ------------------------------
  */
  const getCryptoData = async (_id) => {
    SetIsLoading(true);
    await fetchCryptoData(_id)
      .then((response) => {
        SetIsLoading(false);
        SetCryptoData(response.data[_id]);
      })
      .catch(() => {
        SetIsLoading(false);
      });
  };

  /*
-----------------------
    Function to back
-----------------------
  */
  const onBack = () => {
    history.goBack();
  };

  return (
    <Container fluid>
      <Card className='mb-1 border-0 bg-none'>
        <h1 className='text-center head'>CryptoTrack App</h1>
        <CardBody>
          {/* View Component */}
          <CryptoTrackViewForm
            cryptoData={cryptoData}
            isLoading={isLoading}
            onBack={onBack}
          />
        </CardBody>
      </Card>
    </Container>
  );
};

export default CryptoTrackView;
