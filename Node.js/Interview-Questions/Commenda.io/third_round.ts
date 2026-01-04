// -------------------- TYPES --------------------

type Invoice = {
  stateCode: string, // e.g. TX, CA
  zipCode: number, // e.g. 94102
  totalAmount: number, // e.g. 554.87
};

type ExtendedInvoice = Invoice & {
  grossAmount: number,
  taxRate: number,
};

// -------------------- MOCK API --------------------
// (In interview, assume this is given)

async function getTaxRate(stateCode: string, zipCode: number): Promise<number> {
  // Simulating external API call
  await sleep(500);
  return Math.floor(Math.random() * 10) + 5; // 5%–15%
}

// -------------------- UTIL --------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// -------------------- CORE LOGIC --------------------

async function getExtendedInvoice(invoice: Invoice): Promise<ExtendedInvoice> {
  const { stateCode, zipCode, totalAmount } = invoice;

  const taxRate = await getTaxRate(stateCode, zipCode);

  const grossAmount = (totalAmount * 100) / (100 + taxRate);

  return {
    ...invoice,
    grossAmount,
    taxRate,
  };
}

// -------------------- RATE-LIMITED PROCESSING --------------------

async function getExtendedInvoicesLimit(
  invoices: Invoice[]
): Promise<ExtendedInvoice[]> {
  const result: ExtendedInvoice[] = [];
  const BATCH_SIZE = 2;
  const RATE_LIMIT_WINDOW_MS = 60_000;

  for (let i = 0; i < invoices.length; i += BATCH_SIZE) {
    const batch = invoices.slice(i, i + BATCH_SIZE);

    const extendedBatch = await Promise.all(
      batch.map((invoice) => getExtendedInvoice(invoice))
    );

    result.push(...extendedBatch);

    if (i + BATCH_SIZE < invoices.length) {
      await sleep(RATE_LIMIT_WINDOW_MS);
    }
  }

  return result;
}

// -------------------- SAMPLE USAGE --------------------

(async () => {
  const invoices: Invoice[] = [
    { stateCode: 'CA', zipCode: 94102, totalAmount: 120 },
    { stateCode: 'TX', zipCode: 73301, totalAmount: 200 },
    { stateCode: 'NY', zipCode: 10001, totalAmount: 350 },
    { stateCode: 'FL', zipCode: 33101, totalAmount: 180 },
  ];

  const result = await getExtendedInvoicesLimit(invoices);
  console.log(result);
})();
