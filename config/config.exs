# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :crypto_monitor,
  ecto_repos: [CryptoMonitor.Repo]

# Configures the endpoint
config :crypto_monitor, CryptoMonitorWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "lcpLkHkvEA4mdkyNf02RwRdoBcKc8glb+ljJ7YCDLStMhmDuolw4T4vJebSCgyyd",
  render_errors: [view: CryptoMonitorWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: CryptoMonitor.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]


config :ueberauth, Ueberauth,
  providers: [
    google: {Ueberauth.Strategy.Google, []},
    facebook: {Ueberauth.Strategy.Facebook, []}
  ]

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: System.get_env("GOOGLE_CLIENT_ID"),
  client_secret: System.get_env("GOOGLE_CLIENT_SECRET")

config :ueberauth, Ueberauth.Strategy.Facebook.OAuth,
  client_id: System.get_env("FACEBOOK_CLIENT_ID"),
  client_secret: System.get_env("FACEBOOK_CLIENT_SECRET")

config :sendgrid,
  api_key: System.get_env("SENDGRID_API_KEY")
# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
