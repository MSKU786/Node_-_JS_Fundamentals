const Contact = require('../models/Contact');

const addContacts = async (req, res) => {
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

const addContact = async (req, res) => {
  const { contact } = req.body;
  try {
    const created = await Contact.create({
      ...contact,
      UserId: req.user.id,
    });
    res.status(201).json({ added: 1 });
  } catch (err) {
    res.status(500).json({ message: 'Eror Adding Contacts' });
  }
};

module.exports = { addContact, addContacts };
