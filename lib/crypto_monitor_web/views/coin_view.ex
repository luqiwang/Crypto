defmodule CryptoMonitorWeb.CoinView do
  use CryptoMonitorWeb, :view
  alias CryptoMonitorWeb.CoinView

  def render("index.json", %{coins: coins}) do
    %{data: render_many(coins, CoinView, "coin.json")}
  end

  def render("show.json", %{coin: coin}) do
    %{data: render_one(coin, CoinView, "coin.json")}
  end

  def render("coin.json", %{coin: coin}) do
    %{id: coin.id,
      code: coin.code,
      limit_low: coin.limit_low,
      limit_high: coin.limit_high
    }
  end
end
