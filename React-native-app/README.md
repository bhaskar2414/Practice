# GujaratiPulse

A Gujarati news application that delivers concise, bite-sized news from popular Gujarati news sources.

## Features

- Curated news from Divya Bhaskar and Sandesh
- Clean, card-based UI for easy reading
- Automatic refresh every 30 minutes
- Article sharing functionality
- Light and dark mode support
- News categorization

## Project Structure

The project consists of two main components:

1. **React Native Mobile App**: The frontend application built with Expo and React Native
2. **News Scraper Service**: A Node.js service that scrapes news from Gujarati websites

## Development Setup

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI

### Setting up the React Native App

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Setting up the News Scraper

```bash
# Navigate to scraper directory
cd scraper

# Install dependencies
npm install

# Start the scraper
npm start
```

## Technology Stack

- React Native
- Expo
- Node.js (for scraper)
- AsyncStorage (for data persistence)
- Cheerio (for HTML parsing)
- Axios (for HTTP requests)

## Disclaimer

This application is for educational purposes only. All news content is scraped from public sources and proper attribution is given to the original publishers.