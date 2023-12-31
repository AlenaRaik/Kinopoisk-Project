import { useEffect, useState } from 'react';
import { Input } from '#ui/input/input';
import { Button } from '#ui/button';
import { setName } from './sign-up-form.slice';
import { useAppDispatch, useAppSelector } from '#hooks';
import { styled } from 'styled-components';
import { register } from '#features/auth/registration.slice';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '#features/sign-in-form/sign-in-form.slice';

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(({ signUpForm }) => signUpForm.name);

  const isCompleted = useAppSelector(({registration}) => registration.isCompleted);
  const navigate = useNavigate();

  useEffect (() => {
    if(isCompleted){
      navigate('/sign-up-confirmation')
    }
  }, [isCompleted, navigate])

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');


  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      dispatch(
        setUser({
          nameEmail: user.email,
          id: user.uid,
          token: user.refreshToken,
        })
      );
      navigate('/');
    })
    .catch(console.error);
  };

  return (
    <FormSignUp>
      <Input
        type="text"
        labelText="Name"
        value={name}
        onChange={({ currentTarget }) => dispatch(setName(currentTarget.value))}
      />
      <Input
        type="email"
        labelText="Email"
        value={email}
        onChange={({ currentTarget }) => setEmail(currentTarget.value)}
        error={email ? undefined : `Email shoudn't be empty`}
      />
      <Input
        type="password"
        labelText="Password"
        value={password}
        onChange={({ currentTarget }) => setPassword(currentTarget.value)}
      />
      <Input
        type="password"
        labelText="Confirm password"
        value={confirmedPassword}
        onChange={({ currentTarget }) =>
          setConfirmedPassword(currentTarget.value)
        }
      />
      {/* <Button variant="primary" onClick={() => dispatch(register({username:name, password}))}> */}
      <Button variant="primary" onClick={() => handleRegister()}>
        Sign Up
      </Button>
    </FormSignUp>
  );
};

const FormSignUp = styled.form`
  border: 1px solid grey;
  width: 50%;
  margin: auto;
  padding: 20px;
`;