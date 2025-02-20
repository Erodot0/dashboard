import { fakeCustomers, Customer } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import CustomerForm from './customer-form';

type TCustomerViewPageProps = {
  customerId: string;
};

export default async function CustomerViewPage({
  customerId
}: TCustomerViewPageProps) {
  let customer = null;
  let pageTitle = 'Create New Customer';

  if (customerId !== 'new') {
    const data = await fakeCustomers.getCustomerById(Number(customerId));
    customer = data.customer as Customer;
    if (!customer) {
      notFound();
    }
    pageTitle = `Edit Customer`;
  }

  return <CustomerForm initialData={customer} pageTitle={pageTitle} />;
}
