import CategoryList from 'components/foods/category/category-list';
import { CATEGORIES } from 'DUMMY_DATA/foods';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme.styled';

describe('Category List', () => {
  const categoryListData = CATEGORIES;

  describe('should show Category Item Link', () => {
    beforeEach(() => {
      render(
        <ThemeProvider theme={theme}>
          <CategoryList categories={categoryListData} />
        </ThemeProvider>
      );
    });
    test('should correctly show PIZZA item', () => {
      const categoryItem = screen.getByRole('link', {
        name: /پیتزا/i,
      });
      expect(categoryItem).toBeInTheDocument();
    });

    test('should correctly show BURGER item', () => {
      const categoryItem = screen.getByRole('link', {
        name: /برگر/i,
      });
      expect(categoryItem).toBeInTheDocument();
    });

    test('should correctly show SANDWITCH item', () => {
      const categoryItem = screen.getByRole('link', {
        name: /ساندویچ/i,
      });
      expect(categoryItem).toBeInTheDocument();
    });

    test('should correctly show SALAD item', () => {
      const categoryItem = screen.getByRole('link', {
        name: /سالاد/i,
      });
      expect(categoryItem).toBeInTheDocument();
    });

    test('should correctly show PIZZA item', () => {
      const categoryItem = screen.getByRole('link', {
        name: /نوشیدنی/i,
      });
      expect(categoryItem).toBeInTheDocument();
    });
  });
});
