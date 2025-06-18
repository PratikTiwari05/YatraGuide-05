const express = require('express');
const router = express.Router();
const db = require('../db');

// const bookings=[
//     { id: 1,   trainId: 101, train: 'Rajdhani Express', passenger: 'Pratik Tiwari', seat: 'S1-12' },
//     { id: 2,  trainId: 102,    train: 'Shatabdi Express', passenger: 'Aman Singh', seat: 'C2-09' }
// ];
router.get('/', async (req, res) => {
  try {
    const [bookings] = await db.query('SELECT * FROM bookings');
    res.json(bookings);
  }
  catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// router.get('/:id', (req, res) => {
//     const booking = bookings.find(b => b.id == parseInt(req.params.id));
//     if (booking) res.json(booking);
//     else res.status(404).json({ message: 'Booking not found' });
// });
router.get('/:id', async (req, res) => {
  try {
    const bid = req.params.id;
    const [results] = await db.query('SELECT * FROM bookings WHERE id=?', [bid]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(results[0]);
  }
  catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// router.post('/', (req, res) => {
//     const { trainId, train, passenger, seat } = req.body;
//     const newbookings = {
//         id: bookings.length + 1,
//         trainId,
//         train,
//         passenger,
//         seat
//     };
//     bookings.push(newbookings);
//     res.status(201).json({
//         message: `New Booking is Created `,
//         bookings: newbookings
//     });
// });

router.post('/', async (req, res) => {
  const { trainId, train, passenger, seat, payment_status = 'pending', classType } = req.body;
  const user_id = req.user?.id;

  if (!trainId || !train || !passenger || !seat || !classType) {
    return res.status(400).json({ message: 'Missing values' });
  }

  try {
    // 1️⃣ Class type to column mapping
    const classColumn = {
      SL: 'sl_seats',
      '3AC': 'ac3_seats',
      '2AC': 'ac2_seats',
      '1AC': 'ac1_seats',
    }[classType];

    if (!classColumn) {
      return res.status(400).json({ message: 'Invalid class type' });
    }

    // 2️⃣ Fetch both total and class-specific seat counts
    const [[trainDetails]] = await db.query(
      `SELECT ${classColumn}, available_seats FROM trains WHERE id = ?`,
      [trainId]
    );

    if (!trainDetails) {
      return res.status(404).json({ message: 'Train not found' });
    }

    if (trainDetails[classColumn] <= 0) {
      return res.status(400).json({ message: `No seats available in ${classType}` });
    }

    if (trainDetails.available_seats <= 0) {
      return res.status(400).json({ message: 'Train fully booked' });
    }

    // 3️⃣ Insert booking
  const [result] = await db.query(
  'INSERT INTO bookings (trainId, train, passenger, seat, user_id, payment_status, class_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
  [trainId, train, passenger, seat, user_id, payment_status, classType]
);


    // 4️⃣ Decrease class-wise and total seats
    await db.query(
      `UPDATE trains SET ${classColumn} = ${classColumn} - 1, available_seats = available_seats - 1 WHERE id = ?`,
      [trainId]
    );


    const newBooking = {
      id: result.insertId,
      trainId,
      train,
      passenger,
      seat,
      user_id,
      payment_status,
      classType,
      status: 'active',
      created_at: new Date()
    };

    res.status(201).json({
      message: 'Booking Created',
      booking: newBooking
    });

  } catch (error) {
    console.error('Error during booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.patch('/:id/pay', async (req, res) => {
  const bookingid = parseInt(req.params.id);
  if (isNaN(bookingid)) {
    return res.status(400).json({ message: 'Invalid booking ID' });
  }

  try {
    const [results] = await db.query('SELECT * FROM bookings WHERE id = ?', [bookingid]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const updateResult = await db.query(
      'UPDATE bookings SET payment_status = ? WHERE id = ?',
      ['completed', bookingid]
    );

    res.status(200).json({ message: 'Payment marked as completed' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  const bookingid = parseInt(req.params.id);
  try {
    //  Step 1: Get the trainId before deleting
    const [booking] = await db.query('SELECT trainId FROM bookings WHERE id=?', [bookingid]);
    if (booking.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    const trainId = booking[0].trainId;

    //  Step 2: Delete the booking
    const [result] = await db.query('DELETE FROM bookings WHERE id=?', [bookingid]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking id not found' });
    }

    // Step 3: Increase available seats
    await db.query('UPDATE trains SET available_seats = available_seats + 1 WHERE id = ?', [trainId]);

    res.json({ message: 'Booking deleted successfully and seat released' });
  }
  catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/user/:id', async (req, res) => {
  console.log("🔐 req.user:", req.user); // ⬅️ ye add kar

  const userId = req.user?.id;
  console.log("👤 userId:", userId);     // ⬅️ ye bhi

  try {
    const [rows] = await db.execute(`
  SELECT 
    b.id, b.seat, b.passenger, b.payment_status, b.status,
    t.name AS train
  FROM bookings b
  JOIN trains t ON b.trainId = t.id
  WHERE b.user_id = ?
`, [userId]);


    res.json(rows);
  } catch (err) {
    console.error("❌ SQL Error:", err);  // ⬅️ log actual SQL error
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});



module.exports = router;