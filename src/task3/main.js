const response = {
  success: true,
  appointments: [
    {
      id: "A-101",
      doctor: "Иванов",
      time: "10:00"
    },
    {
      id: "A-102",
      doctor: "Петров",
      time: "14:30"
    }
  ]
};

const schedule = response.appointments.map(appointment => (`${appointment.doctor} – ${appointment.time}`));

// Выведем это на экран, просто чтобы не отображать в консоли
const text = document.querySelector('.schedule');
text.innerText = JSON.stringify(schedule);