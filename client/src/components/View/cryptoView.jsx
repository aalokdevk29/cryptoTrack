import React, { Fragment } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

//Loader
import Skeleton from 'react-loading-skeleton';

const CryptoTrackViewForm = ({ cryptoData, isLoading, onBack }) => {
  const { id, name, symbol, logo, description } = cryptoData;

  return (
    <Fragment>
      <Card className='mb-1 border-0 bg-none'>
        <CardBody>
          <Row>
            {isLoading ? (
              <Skeleton count={6} />
            ) : (
              <>
                <Col xs={12} md={12} lg={12}>
                  <ul>
                    <li>
                      <div>
                        <img src={logo} alt='' />
                      </div>
                    </li>
                    <li className='mt-3'>
                      <div>
                        <span>
                          {' '}
                          <h2>
                            {name} ({symbol})
                          </h2>
                        </span>
                      </div>
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={12} lg={12}>
                  <div>
                    <h6>
                      ID : <small className='text-muted'>{id} </small>
                    </h6>
                  </div>
                  <div>
                    <h6>
                      $ Value of your coin :{' '}
                      <small className='text-muted'>
                        {' '}
                        $
                        {localStorage.getItem(id)
                          ? localStorage.getItem(id)
                          : 0.0}{' '}
                      </small>
                    </h6>
                  </div>

                  <div>
                    <h6>
                      Description :{' '}
                      <small className='text-muted'> {description}</small>
                    </h6>
                  </div>

                  <div>
                    <Button
                      onClick={() => onBack()}
                      color='primary'
                      className='back-btn'
                    >
                      Back
                    </Button>
                  </div>
                </Col>
              </>
            )}{' '}
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CryptoTrackViewForm;
