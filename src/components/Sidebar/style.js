import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Sidebar = styled.div`
  height: 91vh;
  position: sticky;
  top: 61px;
  background-color: #f0f0f0;
  -moz-box-shadow: 0px 0px 10px #c7c7c7;
  -webkit-box-shadow: 0px 0px 10px #c7c7c7;
  box-shadow: 0px 0px 10px #c7c7c7;
`;
export const Link = styled(RouterLink)`
  border-bottom: 1px solid #dcdcdc;
  padding: 20px 10px;
  display: block;
  color: #2c2c2c;
  margin-right: -40px;
  text-decoration: none;
  width: 100%;
`;
