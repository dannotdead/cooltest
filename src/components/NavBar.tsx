import React from 'react';
import styled from 'styled-components';

const NavBarBody = styled.div`
  margin-top: 40px;
  text-align: center;
`

const NavBarTextLogo = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 64px;
  line-height: 78px;
`

const NavBar = () => {
	return (
		<NavBarBody>
			<NavBarTextLogo>
				Only.
			</NavBarTextLogo>
		</NavBarBody>
	);
};

export default NavBar;