//-------------------------------------------------- 2nd round -------------------------------------------------
// // id, // total amount // creation time , // last update // buyer id // seller id // write an endpoint which will basiclaly fetch all transaction for one buyer // or one seller

app.get('/v1/api/transactions', async (req, res) => {
  try {
    const { buyerId, sellerId, cursor, limit = 100 } = req.query;

    if (!buyerId && !sellerId) {
      return res.status(400).json({
        msg: 'Either buyerId or sellerId is required',
      });
    }

    if (buyerId && sellerId) {
      return res.status(400).json({
        msg: 'Only one of buyerId or sellerId is allowed',
      });
    }

    const transactions = buyerId
      ? await fetchTransactionsByBuyer(buyerId, cursor, limit)
      : await fetchTransactionsBySeller(sellerId, cursor, limit);

    res.json({
      data: transactions,
      nextCursor:
        transactions.length > 0
          ? transactions[transactions.length - 1].created_at
          : null,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
});

const fetchTransactionsBySeller = async (
  sellerId: string,
  cursor?: string,
  limit: number = 100
) => {
  const query = `
    SELECT *
    FROM transactions
    WHERE seller_id = $1
      AND ($2::timestamp IS NULL OR created_at < $2)
    ORDER BY created_at DESC
    LIMIT $3
  `;

  const values = [sellerId, cursor || null, limit];

  const { rows } = await db.query(query, values);
  return rows;
};

const fetchTransactionsByBuyer = async (
  buyerId: string,
  cursor?: string,
  limit: number = 100
) => {
  const query = `
    SELECT *
    FROM transactions
    WHERE buyer_id = $1
      AND ($2::timestamp IS NULL OR created_at < $2)
    ORDER BY created_at DESC
    LIMIT $3
  `;

  const values = [buyerId, cursor || null, limit];

  const { rows } = await db.query(query, values);
  return rows;
};
