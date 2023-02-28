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

const Footer = () => {
  return (
    <StyledFooterWrapper>
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
            <motion.span whileHover={{ color: theme.colors.primary }}>
              <BsInstagram size="1.4rem" />
            </motion.span>
            <motion.span whileHover={{ color: theme.colors.primary }}>
              <BsTelegram size="1.4rem" />
            </motion.span>
            <motion.span whileHover={{ color: theme.colors.primary }}>
              <BsLinkedin size="1.4rem" />
            </motion.span>
            <motion.span whileHover={{ color: theme.colors.primary }}>
              <BsTwitter size="1.4rem" />
            </motion.span>
          </FooterSocialMediaBlock>
        </FooterTextBlock>
        <FooterImage>
          <FooterStyledImage
            src="/images/fast-food-footer.jpg"
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
