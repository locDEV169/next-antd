/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const __prod__ = process.env.NODE_ENV === 'production';
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ultorex.org';
export const isServer = () => typeof window === 'undefined';
export const INFURA_PROJECT_ID = '8fada542a0884958a6e9b518dd85a22c';
