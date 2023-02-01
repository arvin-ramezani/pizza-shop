import FoodItem from '@/components/foods/food-section/food-item';
import { store } from '@/redux/store';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import setup from '@/utils/tests/user-event-setup';
import { theme } from '@/utils/theme.styled';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { within } from '@testing-library/react';

const PIZZA_ITEM_DATA = {
  name: 'پیتزا ویژه',
  integredients: 'ژامبون، سوسیس ویژه، قارچ، گوشت چرخ کرده',
  likes: [],
  comments: [],
  details:
    'همه چیز به سلیقه خودتان بستگی دارد. می‌توانید با ژامبون‌های محبوبتان یک پیتزا مخصوص آماده کنید، یا اینکه برای مهمان‌های گیاهخوارتان یک پیتزای مخصوص گیاهی تهیه کنید و سبزیجات رنگارنگ را روی نان پیتزا بچینید. ما امروز طرز تهیه پیتزا مخصوص را با گوشت و ژامبون به شما آموزش می‌دهیم، اما قرار نیست شما هم دقیقا از همین مسیر بروید. برای تهیه این پیتزا هیچ چیز نمی‌تواند شما را محدود کند. کافی است یک نان پیتزای آماده را در سینی بگذارید، مواد دلخواهتان را همانطور که دوست دارید رویش بچینید و با پنیرهای محبوبتان پیتزا را بپوشانید؛ به همین سادگی یک پیتزای مخصوص خوشمزه خوشمزه خواهید داشت.',
  image: '/images/pizza-image-2.jpg',
  price: 150,
};

describe('FoodItem', () => {
  describe('FoodItem should render and show information about food properly', () => {
    test('should show name of food', () => {
      const { getByRole } = setup(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FoodItem {...PIZZA_ITEM_DATA} />
          </ThemeProvider>
        </Provider>
      );

      // For useInView() to work
      mockAllIsIntersecting(true);

      const foodName = getByRole('heading', { name: /پیتزا ویژه/i });
      expect(foodName).toBeInTheDocument();
    });

    test('should show integredients of food', () => {
      const { getByText } = setup(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FoodItem {...PIZZA_ITEM_DATA} />
          </ThemeProvider>
        </Provider>
      );

      // For useInView() to work
      mockAllIsIntersecting(true);

      const foodName = getByText(/ژامبون، سوسیس ویژه، قارچ، گوشت چرخ کرده/i);
      expect(foodName).toBeInTheDocument();
    });

    test('should show image of food', () => {
      const { getByRole } = setup(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FoodItem {...PIZZA_ITEM_DATA} />
          </ThemeProvider>
        </Provider>
      );

      // For useInView() to work
      mockAllIsIntersecting(true);

      const foodName = getByRole('img', { name: /پیتزا ویژه/i });
      expect(foodName).toBeInTheDocument();
    });

    test('should show price of food', () => {
      const { getByText } = setup(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FoodItem {...PIZZA_ITEM_DATA} />
          </ThemeProvider>
        </Provider>
      );

      // For useInView() to work
      mockAllIsIntersecting(true);

      const foodName = getByText(/150/i);
      expect(foodName).toBeInTheDocument();
    });

    test('should show "افزودن به سبد" button', () => {
      const { getByRole } = setup(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FoodItem {...PIZZA_ITEM_DATA} />
          </ThemeProvider>
        </Provider>
      );

      // For useInView() to work
      mockAllIsIntersecting(true);

      const foodName = getByRole('button', { name: /افزودن به سبد/i });
      expect(foodName).toBeInTheDocument();
    });
  });

  describe('user can add FoodItem and quantity of that to cart properly', () => {
    test('should show addQuantity and removeQuantity buttons', () => {
      const { getByRole } = setup(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FoodItem {...PIZZA_ITEM_DATA} />
          </ThemeProvider>
        </Provider>
      );

      // For useInView() to work
      mockAllIsIntersecting(true);

      const addQuantityBtn = getByRole('button', { name: /add quantity/i });
      expect(addQuantityBtn).toBeInTheDocument();

      const removeQuantityBtn = getByRole('button', {
        name: /remove quantity/i,
      });
      expect(removeQuantityBtn).toBeInTheDocument();
    });

    test('should increment quantity of FoodItem', async () => {
      const { getByRole, userEvent, getByTestId } = setup(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FoodItem {...PIZZA_ITEM_DATA} />
          </ThemeProvider>
        </Provider>
      );

      // For useInView() to work
      mockAllIsIntersecting(true);

      const quantityCounterBlock = getByTestId('quantityCounterBlock');

      let quantityText = within(quantityCounterBlock).getByText('1');
      expect(quantityText).toBeInTheDocument();

      const addQuantityBtn = getByRole('button', { name: /add quantity/i });
      expect(addQuantityBtn).toBeInTheDocument();

      await userEvent.click(addQuantityBtn);
      await userEvent.click(addQuantityBtn);

      quantityText = within(quantityCounterBlock).getByText('3');
      expect(quantityText).toBeInTheDocument();
    });
  });

  test('should not decrement less than 1 quantity', async () => {
    const { getByRole, userEvent, getByTestId } = setup(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <FoodItem {...PIZZA_ITEM_DATA} />
        </ThemeProvider>
      </Provider>
    );

    // For useInView() to work
    mockAllIsIntersecting(true);

    const quantityCounterBlock = getByTestId('quantityCounterBlock');
    let quantityText = within(quantityCounterBlock).getByText('1');
    expect(quantityText).toBeInTheDocument();

    const removeQuantityBtn = getByRole('button', { name: /remove quantity/i });
    expect(removeQuantityBtn).toBeInTheDocument();

    await userEvent.click(removeQuantityBtn);
    await userEvent.click(removeQuantityBtn);

    quantityText = within(quantityCounterBlock).getByText('1');
    expect(quantityText).toBeInTheDocument();
  });

  test('should increment and decrement quantity properly', async () => {
    const { getByRole, userEvent, getByTestId } = setup(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <FoodItem {...PIZZA_ITEM_DATA} />
        </ThemeProvider>
      </Provider>
    );

    // For useInView() to work
    mockAllIsIntersecting(true);

    const quantityCounterBlock = getByTestId('quantityCounterBlock');

    let quantityText = within(quantityCounterBlock).getByText('1');
    expect(quantityText).toBeInTheDocument();

    const addQuantityBtn = getByRole('button', { name: /add quantity/i });
    const removeQuantityBtn = getByRole('button', { name: /remove quantity/i });
    expect(addQuantityBtn).toBeInTheDocument();
    expect(removeQuantityBtn).toBeInTheDocument();

    await userEvent.click(addQuantityBtn);
    await userEvent.click(addQuantityBtn);

    quantityText = within(quantityCounterBlock).getByText('3');
    expect(quantityText.textContent).toBe('3');

    await userEvent.click(removeQuantityBtn);

    quantityText = within(quantityCounterBlock).getByText('2');
    expect(quantityText).toBeInTheDocument();
  });
});
