/**
 * Search Controller
 * Handles user search functionality by name and phone number
 * Includes pagination and spam count information
 */

const { Op } = require('sequelize');
const User = require('../models/User-model');
const Contact = require('../models/Contact-model');
const SpamReport = require('../models/SpamReport-model');

/**
 * Helper function to get spam count for a phone number
 * @param {string} phoneNumber - The phone number to check
 * @returns {Promise<number>} - Number of spam reports
 */
const getSpamCount = async (phoneNumber) => {
  const count = await SpamReport.count({ where: { phoneNumber } });
  return count;
};

/**
 * Search users by name with pagination
 * Results are sorted to prioritize exact matches at the start
 * Includes spam count for each result
 */
exports.searchByName = async (req, res) => {
  const { name } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  console.log(`[SearchByName] User ${req.user.id} searching for name: ${name}`);

  try {
    if (!name) {
      console.log('[SearchByName] No search query provided');
      return res.status(400).json({
        status: 'error',
        message: 'Search query is required',
      });
    }

    // Find users with pagination
    const { count, rows: allUsers } = await User.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      limit,
      offset,
    });

    console.log(`[SearchByName] Found ${allUsers.length} users matching query`);

    // Get spam count for each user
    const results = await Promise.all(
      allUsers.map(async (u) => {
        const spam = await getSpamCount(u.phoneNumber);
        return { name: u.name, phoneNumber: u.phoneNumber, spam_count: spam };
      })
    );

    // Sort results to prioritize exact matches
    const sorted = results.sort((a, b) => {
      if (a.name.startsWith(name) && !b.name.startsWith(name)) return -1;
      if (!a.name.startsWith(name) && b.name.startsWith(name)) return 1;
      return 0;
    });

    res.status(200).json({
      status: 'success',
      data: {
        results: sorted,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
        },
      },
    });
  } catch (err) {
    console.error('[SearchByName] Error:', err.stack);
    res.status(500).json({
      status: 'error',
      message: 'Failed to search by name',
    });
  }
};

/**
 * Search users by phone number with pagination
 * Searches both registered users and contacts
 * Includes email for registered users if they are in contacts
 * Validates phone number format (must be 10 digits)
 */

exports.searchByPhone = async (req, res) => {
  const { number } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  console.log(
    `[SearchByPhone] User ${req.user.id} searching for phone number: ${number}`
  );

  try {
    if (!number) {
      console.log('[SearchByPhone] No phone number provided');
      return res.status(400).json({
        status: 'error',
        message: 'Phone number is required',
      });
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(number)) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number must be exactly 10 digits',
      });
    }

    // Search in registered users
    const registered = await User.findOne({ where: { phoneNumber: number } });

    // Search in contacts with pagination
    const { count, rows: contacts } = await Contact.findAndCountAll({
      where: { phoneNumber: number },
      limit,
      offset,
    });

    console.log(
      `[SearchByPhone] Found ${contacts.length} contacts and ${
        registered ? '1' : '0'
      } registered users`
    );

    const spam = await getSpamCount(number);
    const result = [];

    // Add registered user if found
    if (registered) {
      const inContacts = await Contact.findOne({
        where: { phoneNumber: registered.phoneNumber, UserId: req.user.id },
      });
      result.push({
        name: registered.name,
        phoneNumber: registered.phoneNumber,
        email: inContacts ? registered.email : null,
        spam_count: spam,
      });
    }

    // Add contacts
    for (const c of contacts) {
      result.push({
        name: c.name,
        phoneNumber: c.phoneNumber,
        spam_count: spam,
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        results: result,
        pagination: {
          total: count + (registered ? 1 : 0),
          page,
          limit,
          totalPages: Math.ceil((count + (registered ? 1 : 0)) / limit),
        },
      },
    });
  } catch (err) {
    console.error('[SearchByPhone] Error:', err.stack);
    res.status(500).json({
      status: 'error',
      message: 'Failed to search by phone number',
    });
  }
};
