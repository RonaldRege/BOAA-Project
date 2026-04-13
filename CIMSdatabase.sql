-- Create Members table
CREATE TABLE Members (
  studentID INTEGER PRIMARY KEY,
  lastName TEXT NOT NULL,
  firstName TEXT,
  affiliation TEXT,
  isOfficer BOOLEAN
);

-- Create Credentials table
CREATE TABLE Credentials (
  studentID INTEGER PRIMARY KEY,
  userName TEXT,
  passWord TEXT,
  FOREIGN KEY (studentID) REFERENCES Members(studentID)
);

-- Create Resources table
CREATE TABLE Resources (
  resourceID INTEGER PRIMARY KEY AUTOINCREMENT,
  studentID INTEGER,
  resourceName TEXT NOT NULL,
  amount INTEGER,
  location TEXT,
  FOREIGN KEY (studentID) REFERENCES Members(studentID)
);
