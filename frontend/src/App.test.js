import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders salutation dropdown and updates gender based on selection', () => {
  render(<App />);

  const salutationDropdown = screen.getByLabelText(/Salutation/i);

  // Select "Mr." in the dropdown
  fireEvent.change(salutationDropdown, { target: { value: 'Mr.' } });
  expect(screen.getByLabelText(/Gender/i)).toHaveFormValues({
    gender: 'Male',
  });

  // Select "Mrs." in the dropdown
  fireEvent.change(salutationDropdown, { target: { value: 'Mrs.' } });
  expect(screen.getByLabelText(/Gender/i)).toHaveFormValues({
    gender: 'Female',
  });

  // Add more test cases for other salutations and edge cases as needed
});

test('validates alphabetic characters in names', () => {
  render(<App />);

  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);

  // Enter valid alphabetic names
  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

  // Check if names are valid
  expect(firstNameInput).toHaveValue('John');
  expect(lastNameInput).toHaveValue('Doe');
});

test('validates numeric characters in employee ID', () => {
  render(<App />);

  const employeeIdInput = screen.getByLabelText(/Employee ID/i);

  // Enter valid numeric employee ID
  fireEvent.change(employeeIdInput, { target: { value: '12345' } });

  // Check if employee ID is valid
  expect(employeeIdInput).toHaveValue('12345');
});

test('ensures spaces in gross salary', () => {
  render(<App />);

  const grossSalaryInput = screen.getByLabelText(/Gross Salary/i);

  // Enter gross salary with spaces
  fireEvent.change(grossSalaryInput, { target: { value: '100 000' } });

  // Check if spaces are preserved in gross salary
  expect(grossSalaryInput).toHaveValue('100 000');
});

test('auto-completes full name based on first name and last name', () => {
  render(<App />);

  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);

  // Enter first and last names
  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

  // Check if full name is auto-completed
  expect(screen.getByLabelText(/Full Name/i)).toHaveValue('John Doe');
});

test('adds new payroll entry', () => {
  render(<App />);

  // Click "Add Payroll" button
  fireEvent.click(screen.getByText(/Add Payroll/i));

  // Check if form is cleared for a new entry
  expect(screen.getByLabelText(/First Name/i)).toHaveValue('');
  expect(screen.getByLabelText(/Last Name/i)).toHaveValue('');
  expect(screen.getByLabelText(/Salutation/i)).toHaveValue('');
  // Add more checks for other fields if needed
});

// Add more test cases for editing, deleting, and other functionalities as needed
