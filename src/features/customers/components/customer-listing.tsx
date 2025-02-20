import { Customer } from '@/constants/data';
import { fakeCustomers } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as CustomerTable } from '@/components/ui/table/data-table';
import { columns } from './customer-tables/columns';

type CustomerListingPage = {};

export default async function CustomerListingPage({}: CustomerListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeCustomers.getCustomers(filters);
  const totalCustomers = data.total_customers;
  const customers: Customer[] = data.customers;

  return (
    <CustomerTable
      columns={columns}
      data={customers}
      totalItems={totalCustomers}
    />
  );
}
