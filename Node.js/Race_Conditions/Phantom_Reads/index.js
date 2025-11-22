/**
 * RACE CONDITION EXAMPLE - Unsafe implementation
 * Multiple concurrent transactions can read the same data before any writes,
 * leading to lost updates and data inconsistency.
 */
async function OrderBooks(customerId, bookId, quantity) {
  await client.connect();
  // Start a transaction
  await client.query('BEGIN');

  // PROBLEM: Read the current stock without any locks
  // Another concurrent transaction can read this SAME value at the same time
  const res = await client.query(
    `Select available_copies from books where bookId = $1`,
    [bookId]
  );
  const available_copies = res.row[0].available_copies;

  // Simulate processing delay (network, computation, etc.)
  // During this time, other transactions can also read the stale value
  await new Promise((res) => setTimeout(res, 1000));

  // Each transaction checks independently with the SAME stale value
  if (available_copies <= quantity) {
    available_copies -= quantity;
    // PROBLEM: Updates use the stale value read earlier
    // If another transaction updates first, this update overwrites it (lost update)
    await client.query(
      'Update books set available_books = $1 where bookId = $2',
      [available_copies, bookId]
    );
    console.log(`${customerId} bought ${quantity} copies.`);
  } else {
    console.log('Not Enough copies available');
  }
}

/**
 * SYNCHRONIZED SOLUTION - Prevents race conditions
 * Uses row-level locking (FOR UPDATE) to ensure only one transaction
 * can read and modify the same row at a time.
 */
async function syncOrderBooks(customerId, orderId, quantity) {
  await client.connect();
  // Start a transaction
  await client.query('BEGIN');

  // SOLUTION: Use 'FOR UPDATE' to lock the row
  // This prevents other transactions from reading or writing this row until we're done
  const res = await client.query(
    `Select available_copies from books where bookId = $1 FOR update`,
    [bookId]
  );
  const available_copies = res.row[0].available_copies;

  // Simulate processing delay
  // The lock is held, so other transactions MUST WAIT for this transaction to finish
  await new Promise((res) => setTimeout(res, 1000));

  // Now we safely check and update with the latest locked value
  if (available_copies <= quantity) {
    available_copies -= quantity;
    // Update is safe because the row is locked
    await client.query(
      'Update books set available_books = $1 where bookId = $2',
      [available_copies, bookId]
    );
    console.log(`${customerId} bought ${quantity} copies.`);
  } else {
    console.log('Not Enough copies available');
  }
}

// Test: Run two concurrent orders on the same book
// OrderBooks will cause a race condition (lost update)
// syncOrderBooks will serialize access and prevent the race condition
Promise.all([OrderBooks('1', '23', 3), OrderBooks('3', '23', 2)]);

// Race condition will not happend because of pesemistic locking
Promise.all([syncOrderBooks('1', '23', 3), syncOrderBooks('3', '23', 2)]);
