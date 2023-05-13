import React from 'react';
import { motion } from 'framer-motion';
import { BsInstagram, BsLinkedin, BsTelegram, BsTwitter } from 'react-icons/bs';
import { useRouter } from 'next/router';

import {
  FooterContactUsBlock,
  FooterImage,
  FooterSocialMediaBlock,
  FooterStyledImage,
  FooterTextBlock,
  StyledFooter,
  StyledFooterWrapper,
} from '@/styles/components/footer.styled';
import { theme } from '@/utils/theme.styled';

const Footer = () => {
  const router = useRouter();

  return (
    <StyledFooterWrapper
      marginbottom={router.pathname.includes('profile') ? '6rem' : '0'}
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
          <FooterStyledImage
            src="/images/footer-image.svg"
            alt="Fast Food"
            fill
          />
        </FooterImage>
      </StyledFooter>
    </StyledFooterWrapper>
  );
};

export default Footer;
