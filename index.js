import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "New_Hotel",
    password: "1234",
    port: 5432,
});
db.connect();

app.post("/Login", async (req, res) => {
    const { user_email, password } = req.body;
    try {
        const check = await db.query("SELECT * FROM Customer WHERE user_email = $1", [user_email]);

        if (check.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = check.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ error: "Incorrect password" });
        }
        res.status(200).json({ message: "Login successful!", name: user.name });
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

app.post("/", async (req, res) => {
    const { name, user_email, phone, password } = req.body;

    try {
        const check = await db.query("SELECT * FROM Customer WHERE user_email = $1", [user_email]);
        if (check.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered" });
        }

        await db.query(
            "INSERT INTO Customer (name, user_email, phone, password) VALUES ($1, $2, $3, $4)",
            [name, user_email, phone, password]
        );
        res.status(200).json({ message: "Signup successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/hotels', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM hotel");
        const rev = await db.query("SELECT hotel_id, rating FROM review")
        res.status(200).json({ hotel: result.rows, review: rev.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/hotel/:id/rooms', async (req, res) => {
    const hotelId = req.params.id;
    try {
        const allRooms = await db.query(
            "SELECT * FROM room WHERE hotel_id = $1",
            [hotelId]
        );

        const bookedRooms = await db.query(
            `SELECT r.*, hb.user_email
             FROM has_booked hb
             JOIN room r ON hb.room_id = r.room_id
             WHERE r.hotel_id = $1`,
            [hotelId]
        );

        res.status(200).json({
            allRooms: allRooms.rows,
            bookedRooms: bookedRooms.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


app.post("/Book", async (req, res) => {
    const { user_email, room_id } = req.body;
    try {
        await db.query(
            "INSERT INTO has_booked (user_email, room_id) VALUES ($1, $2)",
            [user_email, room_id]
        );
        res.status(200).json({ message: "Booked!!" });
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});


app.post("/checkout", async (req, res) => {
    const { user_email, hotel_id, room_id, review, rating } = req.body;
    try {
        // Insert or update review
        await db.query(
            `INSERT INTO review (user_email, hotel_id, review, rating)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (user_email, hotel_id) DO UPDATE SET review = $3, rating = $4`,
            [user_email, hotel_id, review, rating]
        );

        // Insert payment record
        await db.query(
            `INSERT INTO payment (user_email, room_id)
             VALUES ($1, $2)`,
            [user_email, room_id]
        );

        // Remove user from has_booked for this room
        await db.query(
            `DELETE FROM has_booked WHERE user_email = $1 AND room_id = $2`,
            [user_email, room_id]
        );

        res.status(200).json({ message: "Checkout successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
