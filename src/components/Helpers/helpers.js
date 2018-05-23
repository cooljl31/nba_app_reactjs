import React from 'react';
import moment from 'moment'

const Helpers = () => {
  return (
    <div>
      lO_ol
    </div>
  );
};

const FormatDate = (date) => (
  moment(date).format(' MM-DD-YYYY')
)

export {
  Helpers,
  FormatDate
}