import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

import {
  FooterContactUsBlock,
  FooterImage,
  FooterSocialMediaBlock,
  FooterStyledImage,
  FooterTextBlock,
  StyledFooter,
  StyledFooterWrapper,
} from '@/styles/components/footer.styled';
import { BsInstagram, BsLinkedin, BsTelegram, BsTwitter } from 'react-icons/bs';
import { theme } from '@/utils/theme.styled';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  console.log(router.asPath, router.pathname, 'router');

  return (
    <StyledFooterWrapper
      marginbottom={router.pathname === '/profile' ? '6rem' : '0'}
    >
      <StyledFooter>
        <FooterTextBlock>
          <FooterContactUsBlock>
            <p>
              <span>آدرس: </span>
              مازندران، بابلسر، بلوار بابلسر، خابان بابلسر سوم، پیتزا بابلسر
            </p>
            <p>
              <span>شماره تماس: </span>4567 123 0912
            </p>
          </FooterContactUsBlock>
          <FooterSocialMediaBlock>
            <motion.span whileHover={{ rotate: -360, scale: 1.4 }}>
              <BsInstagram size="1.4rem" color={theme.colors.primary} />
            </motion.span>
            <motion.span whileHover={{ rotate: -360, scale: 1.4 }}>
              <BsTelegram size="1.4rem" color={theme.colors.primary} />
            </motion.span>
            <motion.span whileHover={{ rotate: -360, scale: 1.4 }}>
              <BsLinkedin size="1.4rem" color={theme.colors.primary} />
            </motion.span>
            <motion.span whileHover={{ rotate: -360, scale: 1.4 }}>
              <BsTwitter size="1.4rem" color={theme.colors.primary} />
            </motion.span>
          </FooterSocialMediaBlock>
        </FooterTextBlock>
        <FooterImage>
          {/* <FooterStyledImage src="/images/footer.svg" alt="Fast Food" fill /> */}
          <FooterStyledImage
            src="/images/footer-image.svg"
            alt="Fast Food"
            fill
          />
          {/* <img src="/images/fast-food-footer.jpg" alt="Fast Food" /> */}
        </FooterImage>
      </StyledFooter>
    </StyledFooterWrapper>
  );
};

export default Footer;
