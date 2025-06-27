import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';

// Mock Supabase client
jest.mock('../../SupabaseAuthentication/SupabaseClient', () => {
  return {
    __esModule: true,
    default: {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: { id: 'user-123' } },
          error: null,
        }),
      },
      from: jest.fn((table: string) => {
        const mockData: Record<string, any> = {
          user_saves: {
            select: () => ({
              eq: () => ({
                data: [{ restaurant_id: '1' }],
                error: null,
              }),
            }),
          },
          restaurants: {
            select: () => ({
              not: () => ({
                data: [
                  {
                    id: '2',
                    displayName: 'Mock Cafe',
                    formattedAddress: '123 Java St.',
                    image_url: 'mock.jpg',
                  },
                ],
                error: null,
              }),
            }),
          },
        };

        return mockData[table];
      }),
    },
  };
});

describe('HomePage', () => {
  test('renders the homepage title and fetched restaurants', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Check the static text
    expect(
      screen.getByText(/see what others have saved/i)
    ).toBeInTheDocument();

    // Wait for mock restaurant to appear
    const card = await screen.findByText(/mock cafe/i);
    expect(card).toBeInTheDocument();
  });
});