import { useOutletContext } from 'react-router';

const Home = () => {
  const { isPending, data } = useOutletContext<OutletData>();
  return (
    <div className='text-center'>
      {isPending && <p>Hold on, just a sec...</p>}
      {data ? (
        <>
          <h2>User Info</h2>
          <p>{data.user.name}</p>
          <p>{data.user.email}</p>
          <div className='size-20 mx-auto'>
            <img
              src={
                data.user.image ??
                'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/RickAstleyNeverGonnaGiveYouUp7InchSingleCover.jpg/250px-RickAstleyNeverGonnaGiveYouUp7InchSingleCover.jpg'
              }
              alt=''
              className='w-full h-full'
            />
          </div>
        </>
      ) : (
        <h2>Log in to see stuff</h2>
      )}
    </div>
  );
};

export default Home;
