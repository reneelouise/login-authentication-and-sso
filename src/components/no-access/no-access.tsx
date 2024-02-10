import { lock } from '../../assets';
import {Container, Icon, Text} from './no-access.styles'


export const NoAccess = () => {
  return <Container>
      <Icon src={lock} alt="lock icon"/>
      <Text>Omo, you don't have access to this o</Text>
  </Container>
};
