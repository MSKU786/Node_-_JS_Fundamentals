const SpamReport = require('../models/SpamReport');

exports.markSpam = async (req, res) => {
  const { phone } = req.body;
  try {
    await SpamReport.findOrCreate({ where: { phone, UserId: req.user.id } });
    res.json({ message: 'Marked as spam' });
  } catch (err) {
    res.status(500).json({ message: 'Error marking spam' });
  }
};
