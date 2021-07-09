import React, { lazy, useEffect, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import queryString from 'query-string';

import useServices from '../../services/api';
import Pagination from '../../helper/Pagination';
const { fetchCryptoList } = useServices;

//Components
const CryptoList = lazy(() => import('./CryptoList'));

//constant
const totalCount = 50;
const _limit = 10;

const CryptoTrack = (props) => {
  const {
    history,
    location: { search },
  } = props;

  // eslint-disable-next-line
  const parsedHash = queryString.parse(search);
  const { page } = parsedHash;
  const [cryptoResult, SetCryptoResult] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [currentPage, SetCurrentPage] = useState(1);
  const [inputValue, SetInputValue] = useState('');
  const [activeKey, SetActiveKey] = useState(null);

  useEffect(() => {
    getCryptoList(_limit, currentPage);
  }, []);

  useEffect(() => {
    if (page) {
      getCryptoList(_limit, parseInt(page));
      SetCurrentPage(parseInt(page));
    }
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      getCryptoList(_limit, currentPage);
    }, 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  /*
  ------------------------------
    Function to get crypto data
  ------------------------------
  */
  const getCryptoList = async (_limit, pageNo) => {
    SetIsLoading(true);
    await fetchCryptoList(_limit, pageNo)
      .then((response) => {
        SetIsLoading(false);
        SetCryptoResult(response.data);
      })
      .catch((error) => {
        console.log(error);
        SetIsLoading(false);
      });
  };

  /*
----------------------------------
	Function to manage pagination
----------------------------------
*/
  // eslint-disable-next-line
  const onPageChanged = (page) => {
    const stringified = queryString.stringify({ page: page.currentPage });
    history.push(`?${stringified}`);
  };

  /*
-----------------------------
	Function to go to view page
-----------------------------
*/

  const onView = (e, _id) => {
    history.push(`view/:id`.replace(':id', _id));
  };

  /*
  --------------------------
    For Managing the states
 ---------------------------
 */
  const onInputChange = (e, key) => {
    const {
      target: { value },
    } = e;
    SetActiveKey(key);
    SetInputValue(value);
  };

  /*
  --------------------------
    For Updating the data
 ---------------------------
 */
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(activeKey, inputValue);
      SetActiveKey(null);
      SetInputValue('');
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <Container fluid>
      <Card className='mb-1 border-0 bg-none'>
        <h1 className='text-center head'>CryptoTrack App</h1>
        <CardBody>
          {/* List Component */}
          <CryptoList
            cryptoResult={cryptoResult}
            isLoading={isLoading}
            onView={onView}
            activeKey={activeKey}
            currentPage={currentPage}
            onSubmit={onSubmit}
            inputValue={inputValue}
            onInputChange={onInputChange}
          />
          {/* Pagination Component */}
          <div className='d-flex flex-row  align-items-center justify-content-center'>
            {!isLoading && totalCount && totalCount > 0 ? (
              <Pagination
                totalRecords={totalCount}
                pageLimit={_limit}
                pageNeighbours={currentPage}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
              />
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CryptoTrack;
