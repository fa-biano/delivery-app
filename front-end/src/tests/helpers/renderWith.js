import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function renderWithR(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

export default function renderWithRouter(
  component, { initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) { return { ...render(renderWithR(component, history)),
    history,
  };
}