### Диаграмма состояний робота

Для удобства чтения я разбил диаграмму на две части
Первая часть показывает состояния в которых может находиться робот. Но так как "спагетти" читать не удобно, но возьмём в допущение, что при вопросе от клиента робот переходит к алгоритму ответа на вопрос клиента, а затем возвращается к прошлому состоянию (на диаграмме прерывания никак не показал)

Первая диаграмма:

```mermaid

stateDiagram-v2
    direction TB

    state "приветствие клиента, информация о записи" as hello
    state "вы подтверждаете запись?" as confirm_appointment
    state "хотите отменить или перенести?" as cancel_or_reschedule
    state "точно отменить?" as cancel_confirm
    state "назовите дату нового приёма" as new_date
    state "назовите время нового приёма" as new_time
    state "подтвердите перенос, точно хотите на это время?" as confirm_reschedule
    state "хорошо, сделано! у вас остались вопросы?" as more_questions
    state "спасибо, до свидания" as conversation_end

    [*] --> hello
    hello --> confirm_appointment

    confirm_appointment --> more_questions : положительный ответ
    confirm_appointment --> cancel_or_reschedule : отрицательный ответ
    confirm_appointment --> cancel_confirm : клиент просит отменить
    confirm_appointment --> new_date : клиент просит перенести

    cancel_or_reschedule --> cancel_confirm : хочет отменить
    cancel_or_reschedule --> new_date : хочет перенести
    cancel_or_reschedule --> confirm_appointment : отказался от обоих вариантов

    cancel_confirm --> more_questions : подтверждает отмену
    cancel_confirm --> confirm_appointment : не подтверждает отмену

    new_date --> new_time : назвал дату, у врача есть окна
    new_date --> new_date : в этот день приёма нет, робот сообщает это
    new_date --> confirm_appointment : не хочет переносить

    new_time --> new_time : назвал недопустимое время
    new_time --> new_date : просит другой день
    new_time --> confirm_appointment : не хочет переносить
    new_time --> confirm_reschedule

    confirm_reschedule --> more_questions : положительный ответ
    confirm_reschedule --> new_date : отрицательный ответ

    more_questions --> conversation_end : вопросов нет
    conversation_end --> [*]
```

Вторая диаграмма:

```mermaid
stateDiagram-v2
direction TB

state "текущее состояние диалога" as current_state
state "ответ на вопрос клиента" as answer
state "не расслышал, повторите" as repeat
state "кажется, не могу разобрать. передать вопрос оператору?" as offer_operator
state "передать вопрос оператору" as connect_operator
state "неверный номер" as wrong_number

[*] --> current_state

current_state --> answer : клиент задал вопрос
answer --> current_state : вернуться и повторить прерванный вопрос робота 

state answer {
    state "напомнить время приёма" as tell_appointment_date
    state "напомнить адрес клиники" as tell_clinic_address
    state "напомнить ФИО доктора" as tell_appointment_doctor
    state "не могу ответить. передать вопрос оператору?" as another_question

    [*] --> tell_appointment_date : клиент спрашивает о времени приёма
    [*] --> tell_clinic_address : клиент спрашивает адрес клиники
    [*] --> tell_appointment_doctor : клиент спрашивает, к какому доктору записан
    [*] --> another_question : клиент задаёт другой вопрос

    tell_appointment_date --> [*]
    tell_clinic_address --> [*]
    tell_appointment_doctor --> [*]
    another_question --> [*] : клиент отказывается
    another_question --> connect_operator : клиент соглашается
}

current_state --> repeat : робот не понял 1-й раз подряд
repeat --> current_state : вернуться и повторить вопрос

current_state --> offer_operator : робот не понял 2-й раз подряд
offer_operator --> connect_operator : клиент согласен
offer_operator --> current_state : клиент отказался

current_state --> connect_operator : клиент просит передать вопрос оператору
current_state --> wrong_number : ошиблись номером

connect_operator --> [*]
wrong_number --> [*]
```