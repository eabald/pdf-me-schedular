# Pdf-me Schedular service

## Overview

This service is responsible for triggering cron jobs and other scheduled events.

## Development

To start schedular service in development mode first of all install npm dependencies:

```bash
npm i
```

Then copy environment variables:

```bash
cp .env.example .env
```

And start service in watch mode:

```bash
npm run start:watch
```
