import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid =process.env.accountSid;
const authToken =process.env.authToken;
const client = twilio(accountSid, authToken);

export async function POST(req) {
  try {
    const body = await req.json();
    let { phoneNumber1, phoneNumber2, message } = body;

    // Validate and format phone numbers
    if (!phoneNumber1 || !phoneNumber2 || !message) {
      return NextResponse.json(
        { error: "Both phone numbers and message are required" },
        { status: 400 }
      );
    }

    const formatPhoneNumber = (number) => {
      if (!number.startsWith("+")) {
        // Add Pakistan's country code as an example
        return "+92" + number.slice(1);
      }
      return number;
    };

    phoneNumber1 = formatPhoneNumber(phoneNumber1);
    phoneNumber2 = formatPhoneNumber(phoneNumber2);

    console.log("Sending to:", phoneNumber1, phoneNumber2);

    // Sending messages to both numbers
    const sendMessage = async (to) => {
      try {
        const response = await client.messages.create({
          body: message,
          from: "whatsapp:+14155238886", // Twilio's WhatsApp sandbox number
          to: "whatsapp:" + to,
        });
        console.log("Message sent to:", to, response.sid);
        return response;
      } catch (error) {
        console.error("Error sending to:", to, error);
        throw error;  // Propagate error for the failed number
      }
    };

    const responses = await Promise.all([
      sendMessage(phoneNumber1),
      sendMessage(phoneNumber2),
    ]);

    console.log(
      "Messages sent successfully:",
      responses.map((response) => response.sid)
    );

    return NextResponse.json(
      { message: "Messages sent successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending message:", error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
        details: error.moreInfo,
      },
      { status: error.status || 500 }
    );
  }
}
