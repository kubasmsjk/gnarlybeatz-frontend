
﻿# gnarlybeatz-frontend

gnarlybeatz-frontend to aplikacja webowa w technologi Next.js. Stanowi ona interfejs użytkownika.
Projekt powstał w ramach pracy inżynierskiej. Aplikacja skoncentrowana jest
na sprzedaży i zarządzaniu podkładów muzycznych.

## Podstawowe funkcje aplikacji:
### Sprzedawca:
* możliwość dodawania, archiwizacji, edycji różnych podkładów muzycznych z uwzględnieniem gatunku, tempa (bmp),
* lease (wynajem podkładu z względu na wersję):
	- wersja standard - plik .mp3 (niższa jakość), zawiera tag producencki, sprzedający może dalej czerpać korzyści finansowe z podkładu muzycznego,
	- wersja delux - plik .wav (wyższa jakość), nie zawiera tagu producenckiego, sprzedający może dalej czerpać korzyści finansowe z podkładu muzycznego,
	- wersja exclusive - plik .wav (wyższa jakość), nie zawiera tagu producenckiego, stems ( rozdzielone tracki ) spakowany w winrar/zip, sprzedający nie może czerpać korzyści finansowych z podkładu muzycznego

### Użytkownik:
* możliwość tworzenia i edycji profilu użytkownika,
* możliwość przesłuchania podkładów przed zakupem,
* system płatności online,
* możliwość wyszukiwania podkładów muzycznych według gatunku, tempa(bpm),
* możliwość tworzenia i zarządzania listami ulubionych podkładów muzycznych,
* wysyłanie wiadomości przez formularz kontaktowy

### Serwer:
*	uwierzytelnianie - przy pomocy Jwt Baerer token,
*	przesyłanie plików muzycznych,
*	obsługa płatności online,
*	wysyłanie licencji w pdf poprzez e-mail

## Autor:
* Jakub Mieczkowski ([@kubasmsjk]( https://github.com/kubasmsjk))

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
