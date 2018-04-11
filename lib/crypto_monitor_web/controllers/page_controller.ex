defmodule CryptoMonitorWeb.PageController do
  use CryptoMonitorWeb, :controller
  import HTTPoison
  @url "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"

  def index(conn, _params) do
    user_id = get_session(conn, :user_id)
    token = "notoken"
    if user_id do
      token = Phoenix.Token.sign(conn, "auth token", user_id)
    end
    render conn, "index.html", token: token, user_id: user_id
  end
end
