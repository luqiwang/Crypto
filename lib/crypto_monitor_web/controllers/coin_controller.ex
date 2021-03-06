defmodule CryptoMonitorWeb.CoinController do
  use CryptoMonitorWeb, :controller

  alias CryptoMonitor.Coins
  alias CryptoMonitor.Coins.Coin

  action_fallback CryptoMonitorWeb.FallbackController

  def index(conn, _params) do
    coins = Coins.list_coins()
    render(conn, "index.json", coins: coins)
  end

  def create(conn, %{"coin" => coin_params}) do
    with {:ok, %Coin{} = coin} <- Coins.create_coin(coin_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", coin_path(conn, :show, coin))
      |> render("show.json", coin: coin)
    end
  end

  def show(conn, %{"id" => id}) do
    coin = Coins.get_coin!(id)
    render(conn, "show.json", coin: coin)
  end

  def update(conn, %{"id" => id, "coin" => coin_params}) do
    coin = Coins.get_coin!(id)

    with {:ok, %Coin{} = coin} <- Coins.update_coin(coin, coin_params) do
      render(conn, "show.json", coin: coin)
    end
  end

  def delete(conn, %{"id" => id}) do
    coin = Coins.get_coin!(id)
    with {:ok, %Coin{}} <- Coins.delete_coin(coin) do
      send_resp(conn, :no_content, "")
    end
  end
end
