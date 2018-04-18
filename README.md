# CryptoMonitor

## Update Price

Every 10s the server will fetch new prices from *cryptocompare* through apis with `Info` module, which lives in a process aside from the main process.

First, it will get the `coinList`, which contains all the available coins. Then, we will select the first 20 coins per the `SortOrder` and fetch their prices. Finally, new prices will be broadcasted to the browser.

## Send Email

Email will be sent to the subscriber whenever the prices of the monitored coins lift above `limit_high` or drop down below `limit_low`. This will require checking through the `coins` table, which records the users' monitoring coins.

- Invoke

  Email Service is provided through a stand-alone process, use `GenServer.cast(Email, {:send_email, prices})` to invoke. Every time new prices are fetched, the `Info` process will invoke email sending service, ie., every 10s by far.

- State

  The state of Email process is a map `%{coinid => last_send_time}`, and current checking time is *1h (3600s)*. If the interval between last send time and now is less than 1h, email won't be sent.

## Install

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Load API Key: source .env (API keys is not on github)
  * Start Phoenix endpoint with `mix phx.server`

## Deployment

  * Google Credential Configuration

    Create credential, get `Client ID` and `Client secret`, and set corresponding env variables (can be done by scripts). Set up Ueberauth in `config.exs`, read configurations from `System.env`.

  * HTTPS Setting

    Use `certbot` to auto-configure the config file, and use `Redirect` strategy for http request (due to the callback stuff).

  * Nginx proxy Setting

    Since nginx `proxy_pass` will overwrite the request (host will be `localhost` and the port will be the running port), we need to add the line `proxy_set_header Host $host:80` to restore the origin request. Ueberauth will read *scheme*, *host* and *port* from the `Plug.Conn` struct, thus don't forget to confirm the google redirect uris containing `http://your.domain/auth/google/callback`.

## Platform

The latest Chrome

## Attribution

- Special thanks to **CryptoCompare** for providing the awesome apis.

- Special thanks to **José Valim** for solutions of scheduling works in phoenix
