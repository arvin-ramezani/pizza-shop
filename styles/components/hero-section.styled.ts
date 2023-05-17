import styled from 'styled-components';

export const Wrapper = styled.section`
  height: 90vh;
  margin-top: -3rem;
  background: url('/images/hero-section-vertical.svg') no-repeat top;
  background-size: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    background: url('/images/hero-section.svg') no-repeat left;
    background-size: cover;
  }
`;

export const Container = styled.div`
  max-width: 1300px;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;

export const TextContainer = styled.div`
  position: absolute;
  text-align: center;
  color: #fff;
  bottom: 10%;
  right: 50%;
  transform: translateX(50%);
  padding: 1rem;
  border-radius: 2rem;
  background: rgba(0, 0, 0, 0.6);
  min-width: 250px;
  height: 222px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: 40%;
    right: 30%;
  }
`;

export const StyledHeading = styled.h1`
  font-size: 2.6rem;
  font-weight: 700;
  margin: 0;
`;

export const StyledUserName = styled.p`
  font-size: 1.6rem;
  margin: 0 0 4rem 0;
`;
