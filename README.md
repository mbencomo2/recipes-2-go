# Recipes2Go

## Purpose

Have you ever tried keeping a list of all the recipes you like? Have you ever scratched your head when wondering what groceries to buy to make all the recipes you want? Well, worry no more, Recipes2Go will solve all those problems and more!

- Easy2Use: The app doesn't get in your way, just add your recipe and we will do the rest.
- Simple2Convert: Converting betweens units of measurement is made easy, say goodbye to conversion tables.
- Ready2Go: Easily create shooping lists based on the recipes you want and the amount you want to make!

## Features

- Database Storage: Users can upload their recipes to the cloud via MongoDB and access them from anywhere
- Shopping List: Users can select what recipes they want to make and the app will create a shopping list of ingredients
- Responsive Web Design: the web app is optimized for mobile devices and scale up for larger screens
- Security: Users can log into the application with a secure account
- Accessibility: The web app passes W3C validation, WCAG validation, and accepted standards for performance
- (Stretch) PWA support: The app is PWA compliant (although I am still unsure about service worker support).

## Installation

To run a local copy of this website, clone into any folder by running the following commands:

```bash
git clone https://github.com/mbencomo2/recipes-2-go.git
cd recipes-2-go
npm i
```

To run a dev server run:

```bash
npm run dev
```

To run a production server:

```bash
npm run build
npm run start
```
