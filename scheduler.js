const cron= require('node-cron');
const db= require('./db');
//Lets Schedule the task
cron.schedule('* * * * *',async()=>{
    try{
        //Select  bookings to cancel
        const[bookingsToCancel]=await db.query(`
            SELECT id,trainId FROM bookings WHERE payment_status='pending'
            AND created_at<=NOW()-INTERVAL 30 MINUTE
             AND status = 'active'
             `);
            if(bookingsToCancel.length===0){
                return;
            }
    //Cancel all the bookings of those in array bbokingsToCancel
    for(const booking of bookingsToCancel){
        await db.query(`UPDATE bookings SET status='canceled' WHERE id=?`,[booking.id]);
         await db.query(`UPDATE trains SET available_seats = available_seats+1 WHERE id=?`,[booking.trainId]);
    }
    }
    catch(error){
 console.error('Auto Cancellation:',error);
    }
});