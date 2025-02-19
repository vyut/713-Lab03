-- Create the events table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    petsAllowed BOOLEAN NOT NULL,
    organizer VARCHAR(255) NOT NULL
);