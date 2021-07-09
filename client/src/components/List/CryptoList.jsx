import React, { Fragment } from 'react';
import { Table, Form, FormGroup, Input, Button } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const CryptoList = ({
  onSubmit,
  onInputChange,
  cryptoResult,
  onView,
  inputValue,
  isLoading,
  activeKey,
  currentPage,
}) => {
  return (
    <Fragment>
      <Table striped className='table-wrap'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Short Name</th>
            <th>$ Value</th>
            <th>last 24H</th>
            <th>Amount you own</th>
            <th>$ Value of your coin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <th colSpan={8}>
                <Skeleton />
              </th>
            </tr>
          ) : // Five-line loading skeleton
          cryptoResult && cryptoResult.length > 0 ? (
            cryptoResult.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{10 * (currentPage - 1) + index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.symbol}</td>
                  <td>{item.quote.USD.price}</td>
                  <td
                    className={
                      Math.sign(item.quote.USD.percent_change_24h) === -1
                        ? 'negative'
                        : 'positive'
                    }
                  >
                    {item.quote.USD.percent_change_24h} %
                  </td>
                  <td className='text-center'>
                    <Form onSubmit={onSubmit}>
                      <FormGroup>
                        <Input
                          key={item.id}
                          type='number'
                          placeholder='Enter user value'
                          name='inputValue'
                          value={activeKey === item.id ? inputValue : ''}
                          onChange={(e) => onInputChange(e, item.id)}
                        />
                      </FormGroup>
                      <Button
                        type='submit'
                        color='primary'
                        disabled={
                          activeKey === item.id && inputValue.length > 0
                            ? false
                            : true
                        }
                        className='mt-2'
                      >
                        Submit
                      </Button>
                    </Form>
                  </td>
                  <td>
                    $
                    {localStorage.getItem(item.id)
                      ? localStorage.getItem(item.id)
                      : 0.0}
                  </td>
                  <td className='cursor-pointer'>
                    <Button onClick={(e) => onView(e, item.id)}>
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : null}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default CryptoList;
