"use client"

import { useState } from "react"


export default function SMSSender() {
  const [phoneNumber1, setPhoneNumber1] = useState("")
  const [phoneNumber2, setPhoneNumber2] = useState("")
  const [message, setMessage] = useState("")

  const handleSend = async () => {
    
    if (phoneNumber1 && phoneNumber2 && message) {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({


          phoneNumber1,phoneNumber2,message
         }),
      });
      // Here you would typically integrate with an SMS sending service
      console.log("Sending SMS:", { phoneNumber1, phoneNumber2, message })
      alert("SMS sent successfully!")
    } else {
      alert("Please fill in all fields")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">SMS Sender</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="phone1">Phone Number 1</label>
          <br/>
          <input
            id="phone1"
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber1}
            onChange={(e) => setPhoneNumber1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone2">Phone Number 2</label>
          <br/>
          <input
            id="phone2"
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber2}
            onChange={(e) => setPhoneNumber2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <br/>
          <textarea
            id="message"
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>
        <button onClick={handleSend} className="w-full bg-black text-white rounded-md p-2">
          Send SMS
        </button >
      </div>
    </div>
  )
}

