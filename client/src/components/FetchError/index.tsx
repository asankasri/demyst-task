import React from "react";

type FetchErrorProps = {
  type?: string;
}

const FetchError = ({ type }: FetchErrorProps) => {
  let message = 'Could not fetch';
  if (type) {
    message = `${message} ${type}`;
  }
  return <div>{message}</div>
};

export default FetchError;
