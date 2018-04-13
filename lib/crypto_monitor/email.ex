# For fault-tolerant
defmodule CryptoMonitor.Email do
  use GenServer
  alias CryptoMonitor.Info

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    coinList = Info.get_coin_list()
    state = Map.put(state, :coinList, coinList)
    schedule_work()
    {:ok, state}
  end

  def handle_info(:work, state) do
    coinList = Map.get(state, :coinList)
    prices = Info.get_prices(coinList)
    check_prices(prices)
    schedule_work()
    {:noreply, state}
  end

  def check_prices(prices) do
    btc = Map.get(prices, "BTC") |> Map.get("USD")
    if btc > 9000 do
      send_email()
    end
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 10 * 1000) # Every 10s
  end


  defp send_email() do
    SendGrid.Email.build()
    |> SendGrid.Email.add_to("wangluqi1001@gmail.com")
    |> SendGrid.Email.put_from("no-reply@crypto.com")
    |> SendGrid.Email.put_subject("Alert From Crypto")
    |> SendGrid.Email.put_text("BTC prices is above 9000!")
    |> SendGrid.Mailer.send()
  end
end
