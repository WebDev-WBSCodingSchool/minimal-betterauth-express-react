import { useEffect, useState } from 'react';
import { Outlet, useOutletContext, useNavigate } from 'react-router';

const ProtectedLayout = () => {
  const [protectedData, setProtectedData] = useState<null | object>(null);

  const contextData = useOutletContext<OutletData>();
  const navigate = useNavigate();

  const getProtectedData = async () => {
    try {
      const res = await fetch('http://localhost:3000/protected', {
        credentials: 'include',
      });
      if (res.redirected) window.location.href = res.url;
      const d = await res.json();
      if (!res.ok) throw new Error('Fetching Data failed');
      if (!d) setProtectedData(null);
      else setProtectedData(d);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!contextData.data) navigate('/');
    else getProtectedData();
  }, [contextData.data, navigate]);

  if (!contextData.data) return null;
  return <Outlet context={{ ...contextData, protectedData }} />;
};

export default ProtectedLayout;
