module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const SECRET_KEY = process.env.MOYASAR_SECRET_KEY;

  try {
    const { amount, description, methods } = req.body;

    const moyasarRes = await fetch("https://api.moyasar.com/v1/payment_links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(SECRET_KEY + ":").toString("base64"),
      },
      body: JSON.stringify({
        amount,
        currency: "SAR",
        description,
        callback_url: "https://qahtna0n-art.github.io/Rattibni/",
        methods,
      }),
    });

    const data = await moyasarRes.json();
    return res.status(moyasarRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
