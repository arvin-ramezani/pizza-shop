import styled from 'styled-components';
import Image from 'next/image';

export const StyledFooterWrapper = styled.footer<{ marginbottom?: string }>`
  /* background: rgb(60, 12, 10); */
  /* background: linear-gradient(
    90deg,
    rgba(60, 12, 10, 1) 0%,
    rgba(60, 12, 10, 1) 0%,
    rgba(22, 8, 8, 1) 100%
  ); */

  /* background: url('/images/fast-food-bg-pattern-2.svg'); */

  margin-bottom: ${({ marginbottom }) => (marginbottom ? marginbottom : 0)};

  color: ${({ theme }) => theme.colors.dark};
`;

export const StyledFooter = styled.div`
  padding: 1.6rem 1.2rem 0;
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
  padding: 1rem 1.4rem;
  border-radius: 1rem;

  /* background: ${({ theme }) => theme.backgroundColors.white}; */

  & > span {
    cursor: pointer;
    display: flex;
    color: ${({ theme }) => theme.colors.white};
    /* color: ${({ theme }) => theme.colors.blue}; */
  }
`;

export const FooterImage = styled.div`
  position: relative;
  width: 100%;
  height: 30vh;
  /* margin: 1rem auto 0; */
  /* margin: 3rem 0; */
  border-radius: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 65vh;
    width: 60%;
  }
`;

export const FooterStyledImage = styled(Image)`
  border-radius: 1rem;
  /* margin: 0 !important; */
`;
