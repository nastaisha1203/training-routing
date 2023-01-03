import { getCustomers } from 'fakeApi';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const filterParams = searchParams.get('filter') ?? '';

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  const changeFilter = e => {
    const value = e.target.value;
    setSearchParams(value !== '' ? { filter: value } : {});
  };

  const visibleCostumers = useMemo(() => {
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(filterParams.toLowerCase())
    );
  }, [customers, filterParams]);
  return (
    <main>
      <div>
        <input type="text" value={filterParams} onChange={changeFilter} />
      </div>
      {visibleCostumers.length > 0 && (
        <ul>
          {visibleCostumers.map(({ id, name }) => (
            <li key={id}>
              <Link to={`${id}`} state={{ from: location }}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
