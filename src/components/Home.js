// Home.js
import React from "react";
import "../styles/Home.css";
import { useEffect } from "react";

function Home({ medications, reminders }) {
  const currentTime = new Date().getTime();

  const upcomingReminders = reminders.filter(
    (reminder) => new Date(reminder.time).getTime() > currentTime
  );


  useEffect(() => {
    // Function to schedule reminders
    const scheduleReminders = () => {
      upcomingReminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.time).getTime();
        const timeUntilReminder = reminderTime - currentTime;

        // Schedule the notification if the reminder time is in the future
        if (timeUntilReminder > 0) {
          setTimeout(() => {
            
            if ("Notification" in window) {
              Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                  new Notification("Medicine Reminder", {
                    body: `Reminder: ${reminder.text}`,
                  });
                }
              });
            }
          }, timeUntilReminder);
        }
      });
    };

    // Call the scheduleReminders function when the component mounts
    scheduleReminders();
  }, [upcomingReminders,currentTime]);

  return (
    <div className="home-container">
     
      <div className="card upcoming-reminders">
        <h3>Upcoming Reminders:</h3>
        <ul className="reminders-list">
          {upcomingReminders.length === 0 ? (
            <p>No Upcoming eminders.</p>
          ) : (
            upcomingReminders.map((reminder) => (
              <li key={reminder.id}>
                <p>
                  <strong>Reminder:</strong> {reminder.text}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(reminder.time).toLocaleString()}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="card current-medications">
        <h3>Current Medications:</h3>
        <ul className="medications-list">
          {medications.map((medication) => (
            <li key={medication.id}>
              {medication.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;





