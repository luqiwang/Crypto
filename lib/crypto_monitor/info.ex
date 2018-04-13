# attribution: José Valim:
# https://stackoverflow.com/questions/32085258/how-can-i-schedule-code-to-run-every-few-hours-in-elixir-or-phoenix-framework
defmodule CryptoMonitor.Info do
  use GenServer
  import HTTPoison
  @listurl "https://www.cryptocompare.com/api/data/coinlist/"
  @priceurl "https://min-api.cryptocompare.com/data/pricemulti?fsyms="

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    coinList = get_coin_list()
    state = Map.put(state, :coinList, coinList)
    schedule_work()
    {:ok, state}
  end

  def get_coin_list do
    case HTTPoison.get(@listurl) do
      {:ok, %{status_code: 200, body: body}} ->
        coinList = Poison.decode!(body) |> Map.get("Data")
        coinList = coinList
                  |>Map.to_list()
                  |>Enum.sort(&(String.to_integer(Map.get(elem(&1, 1), "SortOrder")) < String.to_integer(Map.get(elem(&2, 1), "SortOrder"))))
                  |>Enum.slice(0,20)
                  |>Enum.reduce(%{}, fn(x, acc) -> helper(x, acc) end);
        coinList
      {:error, %{status_code: 404}} -> IO.puts("404 NOT FOUND")
    end
  end


  def helper(x, acc) do
    {a, b} = x;
    acc = Map.put(acc, a, b)
  end

  def get_prices(coinList) do
    prices = Enum.reduce(coinList, "", fn(x, acc) -> get_symbol(x) <> " " <> acc end)
            |> String.split()
            |> Enum.chunk_every(50)
            |> Enum.map(fn(q) -> group_query(q) end)
            |> Enum.concat
            |> Enum.into(%{})
  end

  def group_query(q) do
    url = @priceurl <> Enum.join(q, ",") <> "&tsyms=USD"
    case HTTPoison.get(url) do
      {:ok, %{status_code: 200, body: body}} ->
        prices = Poison.decode!(body)
      {:error, %{status_code: 404}} -> IO.puts("404 NOT FOUND")
    end
  end

  def get_symbol(x) do
    {symbol, rest} = x
    symbol
  end

  def handle_info(:work, state) do
    coinList = Map.get(state, :coinList)
    prices = get_prices(coinList)
    coinMap = %{"coinList" => coinList, "prices" => prices}
    broadcast(coinMap)
    schedule_work()
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 10 * 1000) # Every 10s
  end

  defp broadcast(coinMap) do
    CryptoMonitorWeb.Endpoint.broadcast! "/", "coin", coinMap
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
