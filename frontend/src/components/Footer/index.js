import React from 'react';
import * as Styled from './styles';
import Container from '../Container';

const Footer = () => (
  <Styled.Footer>
    <Container>
      <Styled.Links>
        <Styled.FooterLink to="/about">About</Styled.FooterLink>
        {/* <Styled.FooterLink to="/privacy">Privacy</Styled.FooterLink> */}
        <Styled.ExternalLink href="https://forms.gle/WAjUPzCydQP6dmqK8" rel="noreferrer noopener" target="_blank">
          Feedback
        </Styled.ExternalLink>
        <Styled.ExternalLink href="https://forms.gle/jd3aWrUnh9SiDmxq6" rel="noreferrer noopener" target="_blank">
          Bug Report
        </Styled.ExternalLink>
      </Styled.Links>
      <Styled.Copyright>© 2021 sublets.nu · support@sublets.nu · Made with ❤ & ☕ in Evanston</Styled.Copyright>
    </Container>
  </Styled.Footer>
);

export default Footer;
