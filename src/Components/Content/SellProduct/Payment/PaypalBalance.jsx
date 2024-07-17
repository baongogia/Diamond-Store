import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PaypalBalance() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const clientId =
          "AZLkNVxESL0vQ1vo0g6rKXFqXrKLI1M8LyI84zp6ajewHzqTbQFdIDqetfmqYbNNUIxpxpPHoYJAkoxw";
        const secret =
          "EBIdPd8OzWtP4EyL2HIVEev45yu1pcEv8dLTQ0hGJ6YcWP_K4zUvdRJCDKqBuvdoe8KXqyKHD-3mCeM-";

        // Lấy access token
        const tokenResponse = await axios.post(
          "https://api.sandbox.paypal.com/v1/oauth2/token",
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(`${clientId}:${secret}`)}`,
            },
          }
        );

        const accessToken = tokenResponse.data.access_token;
        console.log("Access Token:", accessToken);

        // Lấy số dư
        const balanceResponse = await axios.get(
          "https://api.sandbox.paypal.com/v1/reporting/balances",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Balance Response:", balanceResponse.data);
        setBalance(balanceResponse.data);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setError(error.message);
      }
    };

    fetchBalance();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!balance) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {balance.balances.map((item, index) => (
        <div key={index}>
          <p>Available Balance: {item.available_balance.value}$</p>
        </div>
      ))}
    </div>
  );
}
