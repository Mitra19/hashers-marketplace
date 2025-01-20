import {type FC} from 'react';

interface WelcomeProps {
  username: string;
}

const Welcome: FC<WelcomeProps> = ({ username }) => {
  return <h2>Welcome, {username}!</h2>;
};

export default Welcome;