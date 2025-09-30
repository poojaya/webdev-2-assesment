-- Schema & seed for Charity Events
CREATE DATABASE IF NOT EXISTS charityevents_db;
USE charityevents_db;

DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS organisations;
DROP TABLE IF EXISTS categories;

CREATE TABLE organisations (
  org_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mission TEXT,
  contact_email VARCHAR(255),
  phone VARCHAR(50),
  website VARCHAR(255),
  status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE'
);

CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE events (
  event_id INT AUTO_INCREMENT PRIMARY KEY,
  org_id INT NOT NULL,
  category_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME NULL,
  city VARCHAR(100),
  venue VARCHAR(255),
  status ENUM('ACTIVE','CANCELLED','COMPLETED') DEFAULT 'ACTIVE',
  CONSTRAINT fk_events_org FOREIGN KEY (org_id) REFERENCES organisations(org_id),
  CONSTRAINT fk_events_category FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Seed
INSERT INTO organisations (name, mission, contact_email, phone, website, status) VALUES
('Charity A','Helping kids in need','contact@charitya.org','123456789','https://charitya.org','ACTIVE'),
('Charity B','Providing homeless support','home@charityb.org','987654321','https://charityb.org','ACTIVE');

INSERT INTO categories (name, description) VALUES
('Fun Run','Running events for fundraising'),
('Charity Dinner','Dinner and auction'),
('Workshop','Educational workshops');

INSERT INTO events (org_id, category_id, title, description, start_datetime, end_datetime, city, venue, status) VALUES
(1, 1, 'City 5K Fun Run', 'Annual 5K fun run for kids programs', '2025-10-05 08:00:00', '2025-10-05 11:00:00', 'Melbourne', 'Royal Park', 'ACTIVE'),
(2, 2, 'Winter Warmth Dinner', 'Gala dinner to support shelters', '2025-07-20 18:00:00', '2025-07-20 23:00:00', 'Sydney', 'Harbour Hall', 'ACTIVE');
