INSERT INTO users (name, username, password, phoneNumber) VALUES
("kevin", "kevin123","123456", "0123456789"),
("brian", "brian123","123456","0123456789"),
("bob", "bob123","123456","0123456789"),
("tim", "tim123","123456","0123456789"),
("sarah", "sarah123","123456","0123456789"),
("mike", "mike123","123456","0123456789");

INSERT INTO decks (subject, userId) VALUES
("math", 1),
("music", 2);

INSERT INTO flashcards (front, back, deckId) VALUES
("1 + 1", "2", 1),
("3 * 7", "21", 1),
("148 - 48", "100", 1),
("Mozart", "Classical", 2),
("Bach", "Classical", 2);

SELECT * FROM Users;
SELECT * FROM Reminders;
SELECT * FROM Appointments;
SELECT * FROM Decks;
SELECT * FROM Flashcards;