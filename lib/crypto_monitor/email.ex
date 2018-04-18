# For fault-tolerant
defmodule CryptoMonitor.Email do
  use GenServer
  alias CryptoMonitor.Info
  alias CryptoMonitor.Coins

  def start_link do
    # registered as Email
    GenServer.start_link(__MODULE__, %{}, name: Email)
  end

  # alert_id = coin_id
  # state: :map record the last update time
  # eg., %{alert_id : 15809000, ...}
  def init(state) do
    # coinList = Info.get_coin_list()
    # state = Map.put(state, :coinList, coinList)
    # schedule_work()
    {:ok, state}
  end

  # prices: :map -> %{"BTC": %{"USD" : 7000}, ...}
  # state:
  def handle_cast({:send_email, prices}, state) do
    coins = Coins.list_coins
    new_state = coins |> Enum.reduce(state, fn(coin, acc) ->
      price = prices[coin.code]["USD"]

      # check last update time
      last_send_time = Map.get(acc, coin.id)
      # if it's the first time or the interval exceeds 1h
      if last_send_time == nil || DateTime.diff(DateTime.utc_now, last_send_time) > 3600 do
        IO.puts("*******************")
        IO.inspect(price < coin.limit_low)
        IO.puts("*******************")
        cond do
          price < coin.limit_low ->
            send_email(coin.user.email, coin.code <> " is below " <> Float.to_string(coin.limit_low, decimals: 2))
            acc = acc |> Map.put(coin.id, DateTime.utc_now)
          price > coin.limit_high ->
            send_email(coin.user.email, coin.code <> " is above " <> Float.to_string(coin.limit_high, decimals: 2))
            acc = acc |> Map.put(coin.id, DateTime.utc_now)
          true -> acc
        end
      end
      acc
    end)
    {:noreply, new_state}
  end

  # def handle_info(:work, state) do
  #   coinList = Map.get(state, :coinList)
  #   prices = Info.get_prices(coinList)
  #   check_prices(prices)
  #   schedule_work()
  #   {:noreply, state}
  # end

  # def check_prices(prices) do
  #   btc = Map.get(prices, "BTC") |> Map.get("USD")
  #   if btc > 8500 do
  #     send_email()
  #   end
  # end

  def send_email(to, text) do
    SendGrid.Email.build()
    |> SendGrid.Email.add_to(to)
    |> SendGrid.Email.put_from("no-reply@crypto.com")
    |> SendGrid.Email.put_subject("Alert From Crypto")
    |> SendGrid.Email.put_text(text)
    |> SendGrid.Mailer.send()
  end
end
