import styled from 'styled-components';
import Image from 'next/image';

export const StyledFooterWrapper = styled.footer`
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.93) 11.2%,
    rgb(63 61 61 / 68%)
  );

  color: ${({ theme }) => theme.colors.white};
`;

export const StyledFooter = styled.div`
  padding: 1rem 2rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 2rem;
    justify-content: space-between;
    padding: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80%;
    margin: 0 auto;
  }
`;

export const FooterTextBlock = styled.div``;

export const FooterContactUsBlock = styled.div`
  & > p {
    margin: 1rem 0;
  }
`;

export const FooterSocialMediaBlock = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 2rem;
  border-radius: 1rem;

  background: ${({ theme }) => theme.backgroundColors.white};

  & > span {
    cursor: pointer;
    display: flex;
    color: ${({ theme }) => theme.colors.blue};
  }
`;

export const FooterImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  /* margin: 1rem auto 0; */
  margin: 3rem 0;
  border-radius: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 350px;
    width: 60%;
  }
`;

export const FooterStyledImage = styled(Image)`
  border-radius: 1rem;
`;
