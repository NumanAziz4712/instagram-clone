import React from 'react';
import { getProviders, signIn as signInProvider } from 'next-auth/react';
import Header from '../../components/Header';
const signIn = ({ providers }) => {
  return (
    <>
      <Header />
      <div className='max-w-md mx-auto mt-20 flex flex-col justify-center items-center '>
        <img src='https://links.papareact.com/ocw' className='w-80' alt='' />
        <p className='text-xl mt-2 font-semibold text-gray-500'>
          Connect with the world!
        </p>
        <div className='mt-12'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className='p-3 hover:bg-blue-600 bg-blue-500 rounded-lg text-white'
                onClick={() =>
                  signInProvider(provider.id, { callbackUrl: '/' })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// get the providers from next-auth/react
// happens on server
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers: providers,
    },
  };
}

export default signIn;
