import { render } from '@testing-library/react';
import SignUp from './SignUp';

test('testing render SignUp', () => {
  const { baseElement } = render(<SignUp />);
  expect(baseElement).toBeDefined();
});

// import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';

// import SignUp from './SignUp';

// function render (arg0: JSX.Element): { findByTitle: any; getByTestId: any; findByTestId: any; findByText: any; } {
//   throw new Error('Function not implemented.');
// }

// test('Prueba de Registro de usuario', async () => {
//   const mock = jest.fn();

//   const { findByTitle, getByTestId, findByText } = render(<SignUp />);

//   const firstName = await findByTitle('firstName');
//   const middleName = await findByTitle('middleName');
//   const lastName = await findByTitle('lastName');
//   const birthday = await findByTitle('birthday');
//   const email = await findByTitle('email');
//   const phone = await findByTitle('phone');
//   const password = await findByTitle('password');
//   const verifypassword = await findByTitle('verifypassword');

//   const button = await findByText('Continuar');
//   console.log('Empezando');
//   fireEvent.ionInput(firstName, 'Omar');
//   fireEvent.ionInput(middleName, 'Melendez');
//   fireEvent.ionInput(lastName, 'Diaz');
//   fireEvent.ionChange(birthday, '2 de enero de 2000');
//   fireEvent.ionInput(email, 'email@gmail.com');
//   fireEvent.ionInput(phone, '121212121212');
//   fireEvent.ionInput(password, 'MElendez123#');
//   fireEvent.ionInput(verifypassword, 'MElendez123#');

//   fireEvent.click(button);
//   const form = getByTestId('fromSignUp');
//   fireEvent.submit(form);
//   expect(mock).not.toHaveBeenCalled();
//   console.log('Terminando');
// });
