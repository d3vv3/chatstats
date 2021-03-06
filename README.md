# ChatStats

A **privacy oriented** tool to visualize your Whatsapp or Telegram **chat stats**.

**Demo [here](https://chatstats.devve.space).**

## Disclaimer

All the processing is done in client (**serverless** service), so your data never leaves your device.

> You can check this by opening the site, turning airplane mode on and then proceeding. It will work anyway.

## Tools

Built using [Reactjs](https://reactjs.org/) and [Chartjs](https://github.com/jerairrest/react-chartjs-2).

## Scripts

### Baremetal

- `npm start`
- `npm run-script build`

### Docker

- `docker-compose up --build chatstats`

## To Do:

- [x] Filter English and Spanish common words.
- [x] Multimedia statistics.
- [x] Get Dockerfile and docker-compose.yml ready.
- [x] Check emoji accuracy (maybe depends on client emoji font).
- [x] Unzip iPhone Whatsapp exports (it does it that way).
- [x] Removed fakepath (only real file name) from UI.
- [x] Fix for D/M/Y or M/D/Y based on device language and then trial error.
- [ ] Help section for common users.
- [ ] Print or export button to share with friends.
- [ ] Second theme (scss) with switch.
