import { useOutletContext } from 'react-router';

const ProtectedContent = () => {
  const { data, protectedData } = useOutletContext<ProtectedOutletData>();
  return (
    <div className='text-center'>
      {data && <p>Session user agent: {data.session.userAgent}</p>}
      {protectedData && <p>Top secret fetch from API: {JSON.stringify(protectedData)}</p>}
    </div>
  );
};

export default ProtectedContent;
