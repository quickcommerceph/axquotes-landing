export type Instrument = {
  name: string;
  symbol: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
};

export type MarketCategory = {
  id: string;
  label: string;
  title: string;
  description: string;
  note: string;
  instruments: Instrument[];
};

export const marketCategories: MarketCategory[] = [
  {
    id: 'forex',
    label: 'Forex',
    title: 'Currency markets never stand still.',
    description: 'Trade major, minor, and emerging pairs with sharp spreads and a clear view of every move.',
    note: 'Major, minor and emerging pairs',
    instruments: [
      { name: 'Euro / US Dollar', symbol: 'EUR/USD', price: '1.0842', change: '+0.08%', direction: 'up' },
      { name: 'British Pound / US Dollar', symbol: 'GBP/USD', price: '1.2648', change: '+0.14%', direction: 'up' },
      { name: 'US Dollar / Japanese Yen', symbol: 'USD/JPY', price: '157.31', change: '−0.11%', direction: 'down' },
    ],
  },
  {
    id: 'indices',
    label: 'Indices',
    title: 'Trade the pulse of whole economies.',
    description: 'Follow the world’s leading benchmarks from one focused workspace, with the context to act quickly.',
    note: 'Global benchmark indices',
    instruments: [
      { name: 'US 500', symbol: 'US500', price: '5,421.4', change: '+0.61%', direction: 'up' },
      { name: 'Germany 40', symbol: 'DE40', price: '18,236.2', change: '−0.14%', direction: 'down' },
      { name: 'UK 100', symbol: 'UK100', price: '8,176.4', change: '+0.18%', direction: 'up' },
    ],
  },
  {
    id: 'shares',
    label: 'Shares',
    title: 'Back the businesses shaping tomorrow.',
    description: 'Move from market-wide context to individual names without losing sight of the bigger picture.',
    note: 'Leading global companies',
    instruments: [
      { name: 'Apple', symbol: 'AAPL', price: '226.49', change: '−0.24%', direction: 'down' },
      { name: 'NVIDIA', symbol: 'NVDA', price: '138.85', change: '+1.42%', direction: 'up' },
      { name: 'Tesla', symbol: 'TSLA', price: '248.98', change: '+0.83%', direction: 'up' },
    ],
  },
  {
    id: 'commodities',
    label: 'Commodities',
    title: 'The resources that move the world.',
    description: 'Access precious metals, energy, and more from the same platform you use for every other market.',
    note: 'Metals, energy and resources',
    instruments: [
      { name: 'Gold', symbol: 'XAU/USD', price: '2,326.7', change: '+0.32%', direction: 'up' },
      { name: 'Silver', symbol: 'XAG/USD', price: '29.54', change: '+0.21%', direction: 'up' },
      { name: 'US Crude Oil', symbol: 'OIL', price: '78.62', change: '−0.37%', direction: 'down' },
    ],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    title: 'Move with digital asset markets.',
    description: 'Track established and emerging cryptocurrencies in a workspace built to keep volatility readable.',
    note: 'Established and emerging assets',
    instruments: [
      { name: 'Bitcoin', symbol: 'BTC/USD', price: '64,281.8', change: '+2.18%', direction: 'up' },
      { name: 'Ethereum', symbol: 'ETH/USD', price: '3,492.4', change: '+1.31%', direction: 'up' },
      { name: 'Solana', symbol: 'SOL/USD', price: '145.72', change: '−0.48%', direction: 'down' },
    ],
  },
];

export const tickerItems = [
  { symbol: 'US 500', price: '5,421.4', change: '+0.61%', direction: 'up' as const },
  { symbol: 'Bitcoin', price: '64,281.8', change: '+2.18%', direction: 'up' as const },
  { symbol: 'EUR/USD', price: '1.0842', change: '−0.09%', direction: 'down' as const },
  { symbol: 'Gold', price: '2,326.7', change: '+0.32%', direction: 'up' as const },
  { symbol: 'Apple', price: '226.49', change: '−0.24%', direction: 'down' as const },
  { symbol: 'UK 100', price: '8,176.4', change: '+0.18%', direction: 'up' as const },
];
