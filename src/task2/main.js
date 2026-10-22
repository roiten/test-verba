const appointment = {
  patientName: 'Анна',
  doctor: 'Иванов Сергей Петрович',
  specialty: 'терапевт',
  date: '2026-10-12',
  time: '15:30',
};


const announcement = `${appointment.patientName}, вы записаны к врачу ${appointment.doctor}, ${appointment.specialty}, на ${appointment.date} в ${appointment.time}`;

// Выведем это на экран, прочто чтобы не отображать в консоли
const text = document.querySelector('.announce');
text.innerText = announcement;