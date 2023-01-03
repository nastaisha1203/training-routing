import { getCustomerById } from 'fakeApi';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

export const CustomerDetails = () => {
  const location = useLocation();
  const { customerId } = useParams();
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    getCustomerById(Number(customerId)).then(setCustomers);
  }, [customerId]);

  if (!customers) {
    return;
  }
  const backLink = location.state?.from ?? '/customers';
  return (
    <main>
      <Link to={backLink}>Back to customers</Link>
      <p>id: {customers.id}</p>
      <p>Name: {customers.name}</p>
    </main>
  );
};
