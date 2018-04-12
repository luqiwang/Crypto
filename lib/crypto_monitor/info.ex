# attribution: José Valim:
# https://stackoverflow.com/questions/32085258/how-can-i-schedule-code-to-run-every-few-hours-in-elixir-or-phoenix-framework
defmodule CryptoMonitor.Info do
  use GenServer
  import HTTPoison
  @url "https://www.cryptocompare.com/api/data/coinlist/"

  # https://www.cryptocompare.com/api/data/coinlist/
  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    coin = get_btc
    # IO.inspect(coin)
    broadcast(coin)
    schedule_work()
    {:ok, state}
  end

  def get_btc do
    case HTTPoison.get(@url) do
      {:ok, %{status_code: 200, body: body}} ->
        res = Poison.decode!(body)
      {:ok, %{status_code: 404}} -> IO.puts("404 NOT FOUND")
    end
  end

  def handle_info(:work, state) do
    coin = get_btc
    # IO.inspect(coin)
    broadcast(coin)
    schedule_work()
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 10 * 1000) # Every 10s
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
