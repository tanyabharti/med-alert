import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import MedicationList from "./MedicationList";
import AddMedicationForm from "./AddMedicationForm";
import Reminder from "./Reminder";
import AddReminder from "./AddReminder";
import Home from "./Home";
import "../styles/App.css";

function App() {
  const [medications, setMedications] = useState([
    { id: 1, name: "Medication A" },
    { id: 2, name: "Medication B" },
    { id: 3, name: "Medication C" },
    {id: 3, name:  "Medication D" },

  ]);

  const [reminders, setReminders] = useState([
    {
      id: 1,
      text: "Reminder A",
      time: new Date("2023-07-25T08:00:00").toISOString(),
    },
    {
      id: 2,
      text: "Reminder B",
      time: new Date("2023-07-26T12:30:00").toISOString(),
    },
    {
      id: 3,
      text: "Reminder C",
      time: new Date("2023-07-27T09:00:00").toISOString(),
    },

    {
      id: 4,
      text: "Reminder D",
      time: new Date("2023-07-27T10:00:00").toISOString(),
    },
  ]);

  const addMedication = (medicationName) => {
    const newMedication = {
      id: new Date().getTime(),
      name: medicationName,
    };
    setMedications([...medications, newMedication]);
  };

  const removeMedication = (medicationId) => {
    const updatedMedications = medications.filter(
      (medication) => medication.id !== medicationId
    );
    setMedications(updatedMedications);
  };

  const addReminder = (reminderText, reminderTime) => {
    const newReminder = {
      id: new Date().getTime(),
      text: reminderText,
      time: reminderTime,
    };
    setReminders([...reminders, newReminder]);
  };

  const removeReminder = (reminderId) => {
    const updatedReminders = reminders.filter(
      (reminder) => reminder.id !== reminderId
    );
    setReminders(updatedReminders);
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home reminders={reminders} medications={medications} />}
          />
          <Route
            path="/medications"
            element={
              <MedicationList
                medications={medications}
                removeMedication={removeMedication}
              />
            }
          />
          <Route
            path="/add-medication"
            element={<AddMedicationForm addMedication={addMedication} />}
          />
          <Route
            path="/reminders"
            element={
              <Reminder reminders={reminders} removeReminder={removeReminder} />
            }
          />
          <Route
            path="/add-reminder"
            element={<AddReminder addReminder={addReminder} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
