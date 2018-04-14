defmodule CryptoMonitorWeb.Router do
  use CryptoMonitorWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CryptoMonitorWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/coins/:sym", PageController, :index
    get "/monitor", PageController, :index
  end

  scope "/auth", CryptoMonitor do
    pipe_through :browser

    get "/signout", AuthController, :signout
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", CryptoMonitorWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/coins", CoinController, except: [:new, :edit]
  end
end
