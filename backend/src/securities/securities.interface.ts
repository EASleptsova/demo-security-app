export interface Security {
  ticker: string;
  securityName: string;
  sector: string;
  country: string;
  trend: number;
  prices: Price[];
}

interface Price {
  date: string;
  close: string;
  volume: string;
}
