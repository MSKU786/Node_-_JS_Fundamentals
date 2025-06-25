const Contact = require('../models/Contact');

exports.addContacts = async (req, res) => {
  const { contacts } = req.body; // array of {name, phone}
  try {
    const created = await Contact.bulkCreate(
      contacts.map((c) => ({ ...c, UserId: req.user.id }))
    );
    res.status(201).json({ added: created.length });
  } catch (err) {
    res.status(500).json({ message: 'Error adding contacts' });
  }
};
