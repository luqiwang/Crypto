defmodule CryptoMonitorWeb.CoinChannel do
  use CryptoMonitorWeb, :channel
  alias CryptoMonitor.Info
  alias Phoenix.Socket

  def join("/", payload, socket) do
    coinList = Info.get_coin_list(0, 20)
    prices = Info.get_prices(coinList)
    coinMap = %{"coinList" => coinList, "prices" => prices}
    {:ok, coinMap, socket}
  end

  def handle_in("coin", payload, socket) do
      push socket, "coin", payload
      {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
