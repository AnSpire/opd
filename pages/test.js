import React from 'react';

const TestPage = ({ message }) => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>{message}</p>
    </div>
  );
};

export async function getStaticProps() {
  console.log('getStaticProps called on TestPage');
  return {
    props: {
      message: 'Hello from getStaticProps',
    },
  };
}

export default TestPage;
