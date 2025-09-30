-- schema.sql
CREATE DATABASE IF NOT EXISTS charityevents_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE charityevents_db;

-- organisations
CREATE TABLE IF NOT EXISTS organisations (
  org_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mission TEXT,
  contact_email VARCHAR(255),
  phone VARCHAR(50),
  website VARCHAR(255),
  status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE'
) ENGINE=InnoDB;

-- categories
CREATE TABLE IF NOT EXISTS categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255)
) ENGINE=InnoDB;

-- events
CREATE TABLE IF NOT EXISTS events (
  event_id INT AUTO_INCREMENT PRIMARY KEY,
  org_id INT NOT NULL,
  category_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME,
  venue VARCHAR(255),
  city VARCHAR(120),
  state VARCHAR(120),
  country VARCHAR(120),
  capacity INT,
  ticket_price DECIMAL(10,2),
  goal_amount DECIMAL(12,2) DEFAULT 0,
  raised_amount DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_ev_org FOREIGN KEY (org_id) REFERENCES organisations(org_id),
  CONSTRAINT fk_ev_cat FOREIGN KEY (category_id) REFERENCES categories(category_id)
) ENGINE=InnoDB;

-- sample data
INSERT IGNORE INTO organisations (org_id,name,mission,contact_email,phone,website,status) VALUES
(1,'Charity A','Helping kids in need','contact@charitya.org','123456789','https://charitya.org','ACTIVE'),
(2,'Charity B','Providing homeless support','home@charityb.org','987654321','https://charityb.org','ACTIVE');

INSERT IGNORE INTO categories (category_id,name,description) VALUES
(1,'Fun Run','Community races and runs'),
(2,'Charity Dinner','Formal fundraising dinners'),
(3,'Workshop','Training & workshops');

INSERT IGNORE INTO events (org_id,category_id,title,description,start_datetime,end_datetime,venue,city,state,country,capacity,ticket_price,goal_amount,raised_amount) VALUES
(1,1,'5K Spring Fun Run','Family friendly run','2025-10-20 09:00:00','2025-10-20 12:00:00','River Park','Melbourne','VIC','Australia',500,10.00,20000,4500),
(2,2,'Gala Dinner','Black tie fundraising night','2025-11-05 19:00:00','2025-11-05 23:00:00','Grand Hall','Sydney','NSW','Australia',300,120.00,50000,18000),
(1,3,'Coding for Kids','STEM workshop','2025-10-28 10:00:00','2025-10-28 16:00:00','Tech Hub','Brisbane','QLD','Australia',60,0.00,5000,700);
