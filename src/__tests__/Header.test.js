import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import store from '../redux/configureStore';

describe('Tests: Header', () => {
  it('render test', () => {
    const navBar = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
      ,
    );
    expect(navBar).toMatchSnapshot();
  });
});
