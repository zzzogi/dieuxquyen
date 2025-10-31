import fetch from "node-fetch";

export const handler = async function (event, context) {
  // Headers for CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Get env variables (server-side only, KHÔNG expose)
  const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const SHEET_NAME = process.env.SHEET_NAME;

  // Validate env variables
  if (!GOOGLE_SHEET_ID || !GOOGLE_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Missing environment variables",
        message: "Server configuration error",
      }),
    };
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${encodeURIComponent(
      SHEET_NAME
    )}?key=${GOOGLE_API_KEY}`;

    console.log("Fetching from Google Sheets..."); // Netlify logs

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Sheets API Error:", errorData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: errorData.error.message || "Failed to fetch data",
        }),
      };
    }

    const data = await response.json();

    // Process testimonials
    const testimonials = data.values
      .slice(1)
      .filter((row) => {
        const review = row[5]; // Column D - Review status
        return review && review === "Approved"; // Chỉ lấy approved
      })
      .map((row) => ({
        timestamp: row[0] || "",
        name: row[2] || "Anonymous",
        message: row[3] || "",
        review: row[5] || "",
      }));

    console.log(`Successfully fetched ${testimonials.length} testimonials`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        testimonials,
      }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};
