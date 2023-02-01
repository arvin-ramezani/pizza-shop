import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 90vh;

  background: url('/images/hero-section-vertical.jpg') no-repeat top;
  background-size: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    background: url('/images/hero-section.jpg') no-repeat left;
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
  padding: 1rem 2rem;
  border-radius: 2rem;
  background: rgba(0, 0, 0, 0.4);
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

export const StyledHeader = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

export const StyledUserName = styled.p`
  font-size: 1.6rem;
  margin: 0 0 4rem 0;
`;
