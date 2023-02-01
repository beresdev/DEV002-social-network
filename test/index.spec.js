import { registerFirebase, createUserWithEmailAndPassword } from '../src/Firebase/FirebaseFunctions.js';
import { auth } from '../src/main.js';

//@jest-environment jsdom
jest.mock('../src/Firebase/FirebaseFunctions.js', () => ({
  auth: jest.fn(() => ({ auth: 'TEST' })),

  createUserWithEmailAndPassword: jest.fn((email, password) => {
    if (!email || !password) {
      throw new Error('ERROR');
    }

    Promise.resolve({ user: 'userCredential' });
  }),
}));

describe('registerFirebase', () => {
  const email = 'correo@gmail.com';
  const password = 'password123';
  it('debe retornar un objeto', async () => {
    await registerFirebase(auth, email, password);
    expect(createUserWithEmailAndPassword).toHaveBeenCaledWith(auth, email, password);
    // auth = getAuth();
  //  expect(typeof registerFirebase(auth, email, password)).toBe('object');
  });
});
