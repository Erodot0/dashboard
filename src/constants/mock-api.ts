////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Customer data
export type Customer = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// Mock customer data store
export const fakeCustomers = {
  records: [] as Customer[], // Holds the list of customer objects

  // Initialize with sample data
  initialize() {
    const sampleCustomers: Customer[] = [];
    function generateRandomCustomerData(id: number): Customer {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Customers'
      ];

      return {
        id,
        name: 'John Doe', //faker.commerce.customerName(),
        description: 'heloo', //faker.commerce.customerDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-customers/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleCustomers.push(generateRandomCustomerData(i));
    }

    this.records = sampleCustomers;
  },

  // Get all customers with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let customers = [...this.records];

    // Filter customers based on selected categories
    if (categories.length > 0) {
      customers = customers.filter((customer) =>
        categories.includes(customer.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      customers = matchSorter(customers, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return customers;
  },

  // Get paginated results with optional category filtering and search
  async getCustomers({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allCustomers = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalCustomers = allCustomers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedCustomers = allCustomers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_customers: totalCustomers,
      offset,
      limit,
      customers: paginatedCustomers
    };
  },

  // Get a specific customer by its ID
  async getCustomerById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the customer by its ID
    const customer = this.records.find((customer) => customer.id === id);

    if (!customer) {
      return {
        success: false,
        message: `Customer with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Customer with ID ${id} found`,
      customer
    };
  }
};

// Initialize sample customers
fakeCustomers.initialize();
