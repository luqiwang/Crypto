# attribution: José Valim:
# https://stackoverflow.com/questions/32085258/how-can-i-schedule-code-to-run-every-few-hours-in-elixir-or-phoenix-framework
defmodule CryptoMonitor.Info do
  use GenServer
  import HTTPoison
  @listurl "https://www.cryptocompare.com/api/data/coinlist/"
  @snapurl "https://www.cryptocompare.com/api/data/coinsnapshot/?fsym="

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    schedule_work()
    {:ok, state}
  end

  def get_btc do
    case HTTPoison.get(@listurl) do
      {:ok, %{status_code: 200, body: body}} ->
        coins = Poison.decode!(body) |> Map.get("Data") |> Enum.map(fn(x) -> clean_list(x) end)
        coinInfos = getCoinInfos(coins);
        coinInfos = Enum.sort(coinInfos, &(Map.get(&1, :PRICE)>Map.get(&2, :PRICE))) |> Enum.slice(0, 20)
        m = %{"Data" => coinInfos};
      {:error, %{status_code: 404}} -> IO.puts("404 NOT FOUND")
    end
  end

  defp getCoinInfos(coins) do
    snapshots = []
    res = Enum.reduce(coins, [], fn(x, acc) -> [snapshot(x) | acc] end)
    res = Enum.filter(res, fn(x) -> x != nil end)
  end

  defp snapshot(coin) do
    url = @snapurl <> Map.get(coin, "Symbol") <> "&tsym=USD"
    case HTTPoison.get(url) do
      {:ok, %{status_code: 200, body: body}} ->
        lsthead = Poison.decode!(body) |> Map.get("Data") |> Map.get("AggregatedData")
      {:error, %{status_code: 404}} -> nil
    end
  end

  defp clean_list(item) do
    {aa, bb} = item
    bb
  end

  def handle_info(:work, state) do
    coin = get_btc()
    broadcast(coin)
    schedule_work()
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 5 * 1000) # Every 10s
  end

  defp broadcast(coin) do
    CryptoMonitorWeb.Endpoint.broadcast! "/", "coin", coin
  end

  defp send_email() do
    SendGrid.Email.build()
    |> SendGrid.Email.add_to("wangluqi1001@gmail.com")
    |> SendGrid.Email.put_from("no-reply@crypto.com")
    |> SendGrid.Email.put_subject("Hello From Crypto")
    |> SendGrid.Email.put_text("Send by CryptoMonitor")
    |> SendGrid.Mailer.send()
  end
end
