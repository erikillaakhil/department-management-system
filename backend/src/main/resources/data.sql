-- Seed sample departments if table is empty
INSERT IGNORE INTO departments (id, department_name, department_description) VALUES
(1, 'Software Engineering', 'Develops and maintains core software products, applications, and microservices.'),
(2, 'Human Resources', 'Manages talent acquisition, employee relations, onboarding, and payroll benefits.'),
(3, 'Product Management', 'Drives product vision, user roadmap, sprint planning, and market strategy.'),
(4, 'Marketing & Sales', 'Spearheads brand awareness, lead generation, client partnerships, and sales growth.'),
(5, 'Quality Assurance', 'Ensures software reliability, automated test coverage, and continuous delivery quality.');

-- Seed sample employees
INSERT IGNORE INTO employees (id, first_name, last_name, email, role, salary, status, hire_date, department_id) VALUES
(1, 'Sarah', 'Connor', 'sarah.connor@company.com', 'Senior Tech Lead', 125000.00, 'ACTIVE', '2022-03-15', 1),
(2, 'Alex', 'Mercer', 'alex.mercer@company.com', 'Full Stack Developer', 92000.00, 'ACTIVE', '2023-01-10', 1),
(3, 'Elena', 'Rostova', 'elena.rostova@company.com', 'HR Director', 98000.00, 'ACTIVE', '2021-06-01', 2),
(4, 'David', 'Kim', 'david.kim@company.com', 'Product Lead', 110000.00, 'ACTIVE', '2022-09-20', 3),
(5, 'Marcus', 'Vance', 'marcus.vance@company.com', 'Growth Marketing Manager', 85000.00, 'ACTIVE', '2023-05-12', 4),
(6, 'Priya', 'Sharma', 'priya.sharma@company.com', 'Senior QA Automation Engineer', 89000.00, 'ACTIVE', '2023-08-01', 5);
