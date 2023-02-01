import React from 'react';

import {
  AboutusMapContainer,
  AboutusTextBlock,
  StyledAboutus,
} from '@/styles/components/aboutus-section.styled';
import Map from '../ui/map/map';

const AboutusSection = () => {
  return (
    <StyledAboutus>
      <AboutusTextBlock>
        <h2>درباره ی ما</h2>
        <p>
          مک‌دونالد (به انگلیسی: McDonald's) بزرگترین شرکت فست فود زنجیره ای
          جهان است که با بیش از ۳۷٬۸۰۰ شعبه در ۱۱۹ کشور، روزانه به ۶۴ میلیون
          مشتری سرویس می‌دهد.[۱] مک‌دونالد محصولاتی چون همبرگر، چیزبرگر، مرغ،
          سیب زمینی سرخ کرده، صبحانه، نوشابه‌ها و بسیاری موارد دیگر ارائه می‌کند
          که گاهی برپایه ذائقه یا فرهنگ محلی تغییراتی می‌کند.
        </p>
      </AboutusTextBlock>

      <AboutusMapContainer>
        <Map stableMarker />
      </AboutusMapContainer>
    </StyledAboutus>
  );
};

export default AboutusSection;
