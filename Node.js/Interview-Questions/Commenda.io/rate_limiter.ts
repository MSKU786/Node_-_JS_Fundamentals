// Rate Limiter Class - Controls request rate
class RateLimiter {
  private token: number;
  private maxToken: number;
  private timer: number;
  private queue: Array<() => void> = [];

  constructor(maxToken: number, timer: number) {
    this.maxToken = maxToken;
    this.token = maxToken;
    this.timer = timer;

    setInterval(() => {
      this.token = this.maxToken;
      this.processQueue();
    }, timer);
  }

  async acquire(): Promise<void> {
    if (this.token > 0) {
      this.token--;
      return;
    }

    return new Promise((resolve) => {
      this.queue.push(resolve);
    });
  }

  private processQueue(): void {
    while (this.token > 0 && this.queue.length > 0) {
      this.token--;
      const resolvePromise = this.queue.shift();
      if (resolvePromise) {
        resolvePromise();
      }
    }
  }
}

// Types Definition
type Invoice = {
  stateCode: string; // e.g. TX, CA
  zipCode: number; // e.g. 94102
  totalAmount: number; // e.g. 554.87
};

type ExtendedInvoice = Invoice & {
  grossAmount: number;
  taxRate: number;
};

// Mock API function - In reality, this would call an actual API
async function getTaxRate(stateCode: string, zipCode: number): Promise<number> {
  // Simulate API call
  const taxRate = Math.random() * 10; // Mock tax rate between 0-10%
  return taxRate;
}

// Rate limiter instance - Allow 2 requests per minute (60000ms)
const rateLimiter = new RateLimiter(2, 60000);

/**
 * Convert Invoice to ExtendedInvoice by fetching tax rate
 * @param invoice - The invoice to process
 * @returns ExtendedInvoice with tax rate and gross amount calculated
 */
async function getExtendedInvoice(invoice: Invoice): Promise<ExtendedInvoice> {
  const { stateCode, zipCode, totalAmount } = invoice;

  // Acquire rate limiter token before making API call
  await rateLimiter.acquire();

  const taxRate = await getTaxRate(stateCode, zipCode);

  // Calculate gross amount (amount without tax)
  const grossAmount = (totalAmount * 100) / (100 + taxRate);

  const extendedInvoice: ExtendedInvoice = {
    ...invoice,
    grossAmount,
    taxRate,
  };

  return extendedInvoice;
}

/**
 * Convert multiple invoices to extended invoices in parallel
 * @param invoices - Array of invoices to process
 * @returns Array of extended invoices
 */
async function getExtendedInvoices(
  invoices: Invoice[]
): Promise<ExtendedInvoice[]> {
  const extendedInvoices = await Promise.all(
    invoices.map((invoice) => getExtendedInvoice(invoice))
  );
  return extendedInvoices;
}
